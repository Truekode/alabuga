export const DEFAULT_PALETTE = ['#6366f1', '#10b981', '#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6']

export function getColorForKey(key: string): string {
    let hash = 0
    for (let i = 0; i < key.length; i += 1) {
        hash = (hash << 5) - hash + key.charCodeAt(i)
        hash |= 0
    }
    const idx = Math.abs(hash) % DEFAULT_PALETTE.length
    return DEFAULT_PALETTE[idx]
}
