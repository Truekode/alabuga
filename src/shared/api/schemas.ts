export type TEdgeList = string[]
export type TEdgeId = string
export type TRawCurrent = Record<string, number>

export interface IHistoryPoint {
    ts: number
    value: number
}

export type THistoryResponse = Record<string, IHistoryPoint[]>

export type TEdges = TEdgeList
export type TCurrent = TRawCurrent

export function validateEdges(data: unknown): TEdgeList {
    if (!Array.isArray(data)) throw new Error('Invalid edges: not an array')
    for (const item of data) {
        if (typeof item !== 'string') throw new Error('Invalid edges: non-string item')
    }
    return data as TEdgeList
}

export function validateCurrent(data: unknown): TRawCurrent {
    if (data == null || typeof data !== 'object' || Array.isArray(data)) {
        throw new Error('Invalid current: not an object')
    }
    const result: Record<string, number> = {}
    for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
        if (typeof value !== 'number') throw new Error(`Invalid current value for key ${key}`)
        result[key] = value
    }
    return result
}

export function validateHistory(data: unknown): THistoryResponse {
    if (data == null || typeof data !== 'object' || Array.isArray(data)) {
        throw new Error('Invalid history: not an object')
    }
    const result: Record<string, IHistoryPoint[]> = {}
    for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
        if (!Array.isArray(value)) throw new Error(`Invalid history list for key ${key}`)
        const points: IHistoryPoint[] = []
        for (const item of value) {
            if (
                item == null ||
                typeof item !== 'object' ||
                Array.isArray(item) ||
                typeof (item as Record<string, unknown>).ts !== 'number' ||
                typeof (item as Record<string, unknown>).value !== 'number'
            ) {
                throw new Error(`Invalid history point for key ${key}`)
            }
            const {
                ts,
                value: v
            } = item as { ts: number; value: number }
            points.push({
                ts,
                value: v
            })
        }
        result[key] = points
    }
    return result
}
