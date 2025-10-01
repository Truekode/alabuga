import styled from 'styled-components'

const Card = styled.div`
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    padding: var(--space-3) var(--space-4);
    display: grid;
    gap: var(--space-2);
    justify-items: center;
`

export function NumericGauge({
                                 label,
                                 value,
                                 unit,
                                 range,
                                 keyRaw,
                             }: {
    label: string
    value: number
    unit?: string
    range?: { min: number; max: number }
    keyRaw?: string
}) {
    const min = range?.min ?? 0
    const max = range?.max ?? 100
    const pct = Math.max(0, Math.min(1, (value - min) / (max - min)))
    const angle = -120 + pct * 240
    const w = 140
    const h = 80
    const cx = w / 2
    const cy = h
    const r = 70
    const x = cx + r * Math.cos((angle * Math.PI) / 180)
    const y = cy + r * Math.sin((angle * Math.PI) / 180)
    return (
        <Card title={keyRaw || label}>
            <svg width={w} height={h + 10}>
                <path
                    d={`M 10 ${h} A ${r} ${r} 0 0 1 ${w - 10} ${h}`}
                    stroke="var(--color-border)"
                    strokeWidth={6}
                    fill="none"
                />
                <line x1={cx} y1={cy} x2={x} y2={y} stroke="var(--color-primary)" strokeWidth={4}/>
            </svg>
            <div style={{
                color: 'var(--color-text)',
                fontWeight: 600
            }}>
                {label}: {value}
                {unit ? ` ${unit}` : ''}
            </div>
        </Card>
    )
}
