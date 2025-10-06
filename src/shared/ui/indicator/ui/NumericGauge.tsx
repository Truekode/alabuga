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

const ValueText = styled.div`
    color: var(--color-text);
    font-weight: 600;
`
const LabelText = styled.div`
    color: var(--color-muted);
    font-size: 12px;
`

export function NumericGauge({
                                 label,
                                 value,
                                 unit,
                                 range,
                                 keyRaw,
                                 orientation = 'left',
                             }: {
    label: string
    value: number
    unit?: string
    range?: { min: number; max: number }
    keyRaw?: string
    orientation?: 'top' | 'bottom' | 'left' | 'right'
}) {
    const min = range?.min ?? 0
    const max = range?.max ?? 100
    const clamp01 = (n: number) => Math.max(0, Math.min(1, n))
    const pct = clamp01((value - min) / Math.max(1e-9, max - min))
    const [startDeg, endDeg] = (() => {
        switch (orientation) {
            case 'bottom':
                return [60, 300]
            case 'left':
                return [150, 390]
            case 'right':
                return [-30, 210]
            case 'top':
            default:
                return [-120, 120]
        }
    })()
    const currDeg = startDeg + pct * (endDeg - startDeg)

    const stroke = 12
    const pad = stroke
    const r = 80
    const cx = r + pad
    const cy = r + pad
    const w = cx + r + pad
    const h = cy + r + pad

    const toRad = (deg: number) => (deg * Math.PI) / 180
    const polar = (deg: number) => ({
        x: cx + r * Math.cos(toRad(deg)),
        y: cy + r * Math.sin(toRad(deg)),
    })
    const arcPath = (a1: number, a2: number) => {
        const p1 = polar(a1)
        const p2 = polar(a2)
        const largeArc = Math.abs(a2 - a1) > 180 ? 1 : 0
        const sweep = a2 > a1 ? 1 : 0
        return `M ${p1.x} ${p1.y} A ${r} ${r} 0 ${largeArc} ${sweep} ${p2.x} ${p2.y}`
    }
    const needleLen = r - 16
    const needle = {
        x: cx + needleLen * Math.cos(toRad(currDeg)),
        y: cy + needleLen * Math.sin(toRad(currDeg)),
    }
    return (
        <Card title={keyRaw || label}>
            <svg
                viewBox={`0 0 ${w} ${h}`}
                preserveAspectRatio="xMidYMid meet"
                style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                }}
            >
                <path
                    d={arcPath(startDeg, endDeg)}
                    stroke="var(--color-border)"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    fill="none"
                />
                <path
                    d={arcPath(startDeg, currDeg)}
                    stroke="var(--color-primary)"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    fill="none"
                />
                <circle cx={cx} cy={cy} r={stroke / 2} fill="var(--color-border)"/>
                <line
                    x1={cx}
                    y1={cy}
                    x2={needle.x}
                    y2={needle.y}
                    stroke="var(--color-primary)"
                    strokeWidth={stroke * 0.35}
                    strokeLinecap="round"
                />
            </svg>
            <ValueText>
                {value}
                {unit ? ` ${unit}` : ''}
            </ValueText>
            <LabelText>{label}</LabelText>
        </Card>
    )
}
