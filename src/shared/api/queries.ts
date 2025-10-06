import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { getEnv } from '@shared/config/env'
import type { TEdges } from './schemas'
import { validateCurrent, validateEdges, validateHistory } from './schemas'
import type { INormalizedCurrentItem, INormalizedHistorySeries } from './normalize'
import { normalizeCurrent, normalizeHistory } from './normalize'
import type { IAppError } from './error'

async function fetchJson<T>(
    path: string,
    params?: Record<string, string | number | boolean | undefined>,
    signal?: AbortSignal
): Promise<T> {
    const {VITE_API_URL} = getEnv()
    const isDev = import.meta.env.DEV
    const base = isDev ? '' : VITE_API_URL
    const url = new URL(path, base || window.location.origin)
    if (params) {
        for (const [k, v] of Object.entries(params)) {
            if (v === undefined) continue
            url.searchParams.set(k, String(v))
        }
    }
    const res = await fetch(url.toString(), {
        headers: {'Content-Type': 'application/json'},
        signal,
    })
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

export function useEdges() {
    const ready = useMountReady()
    return useQuery<TEdges, IAppError>({
        queryKey: ['edges'],
        queryFn: async ({signal}) =>
            validateEdges(await fetchJson<unknown>('/api/edges', undefined, signal)),
        retry: 1,
        staleTime: 300_000,
        refetchOnWindowFocus: false,
        enabled: ready,
    })
}

export function useCurrent(edgeId: string | undefined) {
    const ready = useMountReady()
    return useQuery<INormalizedCurrentItem[], IAppError>({
        queryKey: ['current', edgeId],
        enabled: !!edgeId && ready,
        queryFn: async ({signal}) => {
            const controller = new AbortController()
            const onAbort = () => controller.abort()
            if (signal) {
                if (signal.aborted) controller.abort()
                else signal.addEventListener('abort', onAbort, {once: true})
            }
            const timeout = setTimeout(() => controller.abort(), 10_000)
            try {
                const data = await fetchJson<unknown>('/api/current', {edge: edgeId!}, controller.signal)
                return normalizeCurrent(validateCurrent(data))
            } finally {
                clearTimeout(timeout)
                controller.abort()
                if (signal) signal.removeEventListener('abort', onAbort)
            }
        },
        retry: 1,
        staleTime: 0,
        refetchInterval: 1_000,
        refetchIntervalInBackground: true,
    })
}

export function useHistory(edgeId: string | undefined, options?: { enabled?: boolean }) {
    const ready = useMountReady()
    return useQuery<INormalizedHistorySeries[], IAppError>({
        queryKey: ['history', edgeId],
        enabled: !!edgeId && (options?.enabled ?? true) && ready,
        queryFn: async ({signal}) => {
            const controller = new AbortController()
            const onAbort = () => controller.abort()
            if (signal) {
                if (signal.aborted) controller.abort()
                else signal.addEventListener('abort', onAbort, {once: true})
            }
            const timeout = setTimeout(() => controller.abort(), 15_000)
            try {
                const data = await fetchJson<unknown>('/api/history', {edge: edgeId!}, controller.signal)
                return normalizeHistory(validateHistory(data))
            } finally {
                clearTimeout(timeout)
                controller.abort()
                if (signal) signal.removeEventListener('abort', onAbort)
            }
        },
        retry: 1,
        staleTime: 0,
        refetchInterval: 1_000,
        refetchIntervalInBackground: true,
    })
}

function useMountReady(): boolean {
    const [ready, setReady] = useState(false)
    useEffect(() => {
        setReady(true)
    }, [])
    return ready
}
