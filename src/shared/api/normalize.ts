import type { THistoryResponse, TRawCurrent } from './schemas'

export type TTagType = 'boolean' | 'numeric'

export interface INormalizedCurrentItem {
    key: string
    label: string
    type: TTagType
    value: number
    unit?: string
}

export interface INormalizedHistorySeries {
    key: string
    type: TTagType
    unit?: string
    values: Array<{ ts: number; value: number }>
}

const UNIT_TOKENS: Record<string, string> = {
    degc: '°C',
    c: '°C',
    spm: 'spm',
    rpm: 'RPM',
    hz: 'Hz',
    percent: '%',
    '%': '%',
    bar: 'bar',
    pa: 'Pa',
    v: 'V',
    a: 'A',
    w: 'W',
    kw: 'kW',
    mw: 'MW',
    amps: 'A',
}

function splitKeyTokens(key: string): string[] {
    return key
        .replace(/[\[\]]/g, ' ')
        .replace(/[._]/g, ' ')
        .split(/\s+/)
        .filter(Boolean)
}

export function inferType(value: number): TTagType {
    return value === 0 || value === 1 ? 'boolean' : 'numeric'
}

export function deriveUnitFromKey(key: string): string | undefined {
    const tokens = splitKeyTokens(key).map((t) => t.toLowerCase())
    const last = tokens[tokens.length - 1]
    if (last && UNIT_TOKENS[last]) return UNIT_TOKENS[last]
    for (const t of tokens) {
        if (UNIT_TOKENS[t]) return UNIT_TOKENS[t]
    }
    return undefined
}

export function toLabelFromKey(key: string): string {
    const tokens = splitKeyTokens(key)
    return tokens.join(' ')
}

export function normalizeCurrent(raw: TRawCurrent): INormalizedCurrentItem[] {
    const items: INormalizedCurrentItem[] = []
    for (const [key, value] of Object.entries(raw)) {
        const type = inferType(value)
        const unit = deriveUnitFromKey(key)
        const label = toLabelFromKey(key)
        items.push({
            key,
            label,
            type,
            value,
            unit
        })
    }
    items.sort((a, b) => a.key.localeCompare(b.key))
    return items
}

export function normalizeHistory(raw: THistoryResponse): INormalizedHistorySeries[] {
    const series: INormalizedHistorySeries[] = []
    for (const [key, values] of Object.entries(raw)) {
        const unit = deriveUnitFromKey(key)
        const type = values.every((p) => p.value === 0 || p.value === 1) ? 'boolean' : 'numeric'
        series.push({
            key,
            type,
            unit,
            values
        })
    }
    series.sort((a, b) => a.key.localeCompare(b.key))
    return series
}
