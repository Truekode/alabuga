export interface IAppError {
    message: string
    status?: number
    data?: unknown
}

export function toAppError(err: unknown): IAppError {
    if (typeof err === 'object' && err !== null) {
        const maybe = err as { message?: unknown; status?: number; data?: unknown }
        const message = typeof maybe.message === 'string' ? maybe.message : String(err)
        return {
            message,
            status: maybe.status,
            data: maybe.data
        }
    }
    return {message: String(err)}
}
