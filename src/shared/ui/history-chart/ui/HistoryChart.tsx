import styled from 'styled-components'
import { getColorForKey } from '@shared/colors/palette'

interface IPoint {
    ts: number
    value: number
}

interface ISeries {
    key: string
    color?: string
    points: IPoint[]
}

const Wrap = styled.div`
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  padding: var(--space-4);

  & svg {
    width: 100%;
  }
`

const Legend = styled.div`
  display: flex;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
  flex-wrap: wrap;
`

const LegendItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 12px;
  color: var(--color-text);
`

export function HistoryChart({series}: { series: ISeries[] }) {
    const width = 800
    const height = 260
    const padLeft = 40
    const padBottom = 24

    const allPoints = series.flatMap((s) => s.points)
    if (allPoints.length === 0) return <Wrap/>
    const minT = Math.min(...allPoints.map((p) => p.ts))
    const maxT = Math.max(...allPoints.map((p) => p.ts))
    const minV = Math.min(...allPoints.map((p) => p.value))
    const maxV = Math.max(...allPoints.map((p) => p.value))
    const rangeT = maxT - minT || 1
    const rangeV = maxV - minV || 1

    function mapX(ts: number) {
        return padLeft + ((ts - minT) / rangeT) * (width - padLeft - 8)
    }

    function mapY(v: number) {
        return 8 + (1 - (v - minV) / rangeV) * (height - padBottom - 16)
    }

    return (
        <Wrap>
            <Legend>
                {series.map((s) => (
                    <LegendItem key={s.key}>
            <span
                style={{
                    width: 10,
                    height: 10,
                    background: s.color || getColorForKey(s.key),
                    borderRadius: 2,
                }}
            />
                        {s.key}
                    </LegendItem>
                ))}
            </Legend>
            <svg width={width} height={height}>
                <rect x={0} y={0} width={width} height={height} fill="rgba(99,102,241,0.06)" rx={8}/>
                <line
                    x1={padLeft}
                    y1={8}
                    x2={padLeft}
                    y2={height - padBottom}
                    stroke="var(--color-border)"
                />
                <line
                    x1={padLeft}
                    y1={height - padBottom}
                    x2={width - 8}
                    y2={height - padBottom}
                    stroke="var(--color-border)"
                />
                {Array.from({length: 5}).map((_, i) => {
                    const t = i / 4
                    const v = minV + t * rangeV
                    const y = mapY(v)
                    return (
                        <g key={`ytick-${i}`}>
                            <line x1={padLeft - 4} y1={y} x2={padLeft} y2={y} stroke="var(--color-border)"/>
                            <text
                                x={padLeft - 8}
                                y={y + 4}
                                fill="var(--color-muted)"
                                fontSize={10}
                                textAnchor="end"
                            >
                                {v.toFixed(0)}
                            </text>
                        </g>
                    )
                })}
                {Array.from({length: 6}).map((_, i) => {
                    const t = i / 5
                    const ts = Math.round(minT + t * rangeT)
                    const x = mapX(ts)
                    const label = new Date(ts * 1000).toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit',
                    })
                    return (
                        <g key={`xtick-${i}`}>
                            <line
                                x1={x}
                                y1={height - padBottom}
                                x2={x}
                                y2={height - padBottom + 4}
                                stroke="var(--color-border)"
                            />
                            <text
                                x={x}
                                y={height - padBottom + 14}
                                fill="var(--color-muted)"
                                fontSize={10}
                                textAnchor="middle"
                            >
                                {label}
                            </text>
                        </g>
                    )
                })}
                {series.map((s) => {
                    const d = s.points
                        .map(
                            (p, i) =>
                                `${i === 0 ? 'M' : 'L'} ${mapX(p.ts).toFixed(1)} ${mapY(p.value).toFixed(1)}`
                        )
                        .join(' ')
                    return (
                        <path
                            key={s.key}
                            d={d}
                            fill="none"
                            stroke={s.color || getColorForKey(s.key)}
                            strokeWidth={2}
                        />
                    )
                })}
            </svg>
        </Wrap>
    )
}
