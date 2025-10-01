export interface IEnv {
    VITE_API_URL: string
    VITE_APP_NAME: string
    VITE_PORT: number
}

function ensureString(name: string, value: unknown): string {
    if (typeof value !== 'string' || value.trim().length === 0) {
        throw new Error(`[env] Missing required env var: ${name}`)
    }
    return value
}

function ensureNumber(name: string, value: unknown, fallback?: number): number {
    if (value == null || value === '') {
        if (fallback != null) return fallback
        throw new Error(`[env] Missing required numeric env var: ${name}`)
    }
    const n = Number(value)
    if (Number.isNaN(n)) {
        if (fallback != null) return fallback
        throw new Error(`[env] Invalid number for env var: ${name}`)
    }
    return n
}

export function getEnv(): IEnv {
    const {
        VITE_API_URL,
        VITE_APP_NAME,
        VITE_PORT
    } = import.meta.env as Record<string, unknown>
    return {
        VITE_API_URL: ensureString('VITE_API_URL', VITE_API_URL),
        VITE_APP_NAME: ensureString('VITE_APP_NAME', VITE_APP_NAME),
        VITE_PORT: ensureNumber('VITE_PORT', VITE_PORT, 5173),
    }
}
