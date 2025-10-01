import { useQuery } from '@tanstack/react-query'
import { getEnv } from '@shared/config/env'
import type { TEdges } from './schemas'
import { validateCurrent, validateEdges, validateHistory } from './schemas'
import type { INormalizedCurrentItem, INormalizedHistorySeries } from './normalize'
import { normalizeCurrent, normalizeHistory } from './normalize'
import type { IAppError } from './error'

async function fetchJson<T>(
    path: string,
    params?: Record<string, string | number | boolean | undefined>
): Promise<T> {
    const {VITE_API_URL} = getEnv()
    const url = new URL(path, VITE_API_URL)
    if (params) {
        for (const [k, v] of Object.entries(params)) {
            if (v === undefined) continue
            url.searchParams.set(k, String(v))
        }
    }
    const res = await fetch(url.toString(), {headers: {'Content-Type': 'application/json'}})
    const data = await res.json().catch(() => undefined)
    if (!res.ok) {
        const appError: IAppError = {
            message:
                data && typeof data === 'object' && 'message' in (data as Record<string, unknown>)
                    ? String((data as Record<string, unknown>).message)
                    : res.statusText || 'Request failed',
            status: res.status,
            data,
        }
        throw appError
    }
    return data as T
}

const isDev = import.meta.env.DEV

export function useEdges() {
    return useQuery<TEdges, IAppError>({
        queryKey: ['edges'],
        queryFn: async () =>
            isDev
                ? validateEdges(['emulator', 'test', 'real'])
                : validateEdges(await fetchJson<unknown>('/api/edges')),
        retry: isDev ? 0 : 1,
        staleTime: isDev ? 0 : 30_000,
    })
}

export function useCurrent(edgeId: string | undefined) {
    return useQuery<INormalizedCurrentItem[], IAppError>({
        queryKey: ['current', edgeId],
        enabled: !!edgeId,
        queryFn: async () => {
            const controller = new AbortController()
            const timeout = setTimeout(() => controller.abort(), 10_000)
            if (isDev) {
                const mock = {
                    Pump1_Wref_spm: 10,
                    Pump1_Wfbk_spm: 8,
                    Jet_active: 1,
                    Base_pumps_Ia_Amps: 1610,
                } as const
                clearTimeout(timeout)
                return normalizeCurrent(validateCurrent(mock as unknown))
            }
            try {
                const data = await fetchJson<unknown>('/api/current', {edge: edgeId!})
                return normalizeCurrent(validateCurrent(data))
            } finally {
                clearTimeout(timeout)
                controller.abort()
            }
        },
        retry: isDev ? 0 : 1,
        staleTime: isDev ? 0 : 15_000,
    })
}

export function useHistory(edgeId: string | undefined) {
    return useQuery<INormalizedHistorySeries[], IAppError>({
        queryKey: ['history', edgeId],
        enabled: !!edgeId,
        queryFn: async () => {
            const controller = new AbortController()
            const timeout = setTimeout(() => controller.abort(), 15_000)
            if (isDev) {
                const now = Math.floor(Date.now() / 1000)
                const mock = {
                    Pump1_Wref_spm: [
                        {
                            ts: now - 120,
                            value: 9
                        },
                        {
                            ts: now - 60,
                            value: 10
                        },
                        {
                            ts: now,
                            value: 11
                        },
                    ],
                    Pump1_Wfbk_spm: [
                        {
                            ts: now - 120,
                            value: 7
                        },
                        {
                            ts: now - 60,
                            value: 8
                        },
                        {
                            ts: now,
                            value: 9
                        },
                    ],
                    Jet_active: [
                        {
                            ts: now - 120,
                            value: 0
                        },
                        {
                            ts: now - 60,
                            value: 1
                        },
                        {
                            ts: now,
                            value: 1
                        },
                    ],
                }
                clearTimeout(timeout)
                return normalizeHistory(validateHistory(mock as unknown))
            }
            try {
                const data = await fetchJson<unknown>('/api/history', {edge: edgeId!})
                return normalizeHistory(validateHistory(data))
            } finally {
                clearTimeout(timeout)
                controller.abort()
            }
        },
        retry: isDev ? 0 : 1,
        staleTime: isDev ? 0 : 60_000,
    })
}
