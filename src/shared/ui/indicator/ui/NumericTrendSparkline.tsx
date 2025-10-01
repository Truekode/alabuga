import styled from 'styled-components'

const Card = styled.div`
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  padding: var(--space-3) var(--space-4);
  display: grid;
  gap: var(--space-2);
`

export function NumericTrendSparkline({
                                          label,
                                          value,
                                          unit,
                                          history,
                                          keyRaw,
                                      }: {
    label: string
    value: number
    unit?: string
    history?: Array<{ ts: number; value: number }>
    keyRaw?: string
}) {
    const width = 140
    const height = 40
    const points = (history ?? []).slice(-24)
    const minV = points.length ? Math.min(...points.map((p) => p.value)) : 0
    const maxV = points.length ? Math.max(...points.map((p) => p.value)) : 1
    const minT = points.length ? Math.min(...points.map((p) => p.ts)) : 0
    const maxT = points.length ? Math.max(...points.map((p) => p.ts)) : 1
    const rv = maxV - minV || 1
    const rt = maxT - minT || 1
    const path = points
        .map((p, i) => {
            const x = ((p.ts - minT) / rt) * width
            const y = height - ((p.value - minV) / rv) * height
            return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
        })
        .join(' ')
    return (
        <Card title={keyRaw || label}>
            <div style={{
                color: 'var(--color-text)',
                fontWeight: 600
            }}>
                {label}: {value}
                {unit ? ` ${unit}` : ''}
            </div>
            <svg width={width} height={height}>
                <path d={path} stroke="var(--color-primary)" strokeWidth={2} fill="none"/>
            </svg>
        </Card>
    )
}
