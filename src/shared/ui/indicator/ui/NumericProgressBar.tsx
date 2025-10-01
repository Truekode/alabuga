import styled from 'styled-components'

const Wrap = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: var(--space-2);
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: var(--space-2) var(--space-3);
  background: var(--color-surface);
`

const Bar = styled.div`
  position: relative;
  height: 8px;
  background: rgba(99, 102, 241, 0.15);
  border-radius: 999px;
  overflow: hidden;
`

const Fill = styled.div<{ $pct: number }>`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: ${({$pct}) => Math.max(0, Math.min(100, $pct))}%;
  background: var(--color-primary);
`

const Value = styled.div`
  color: var(--color-text);
  font-weight: 600;
`

export function NumericProgressBar({
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
    const pct = ((value - min) / (max - min)) * 100
    return (
        <Wrap title={keyRaw || label}>
            <Bar>
                <Fill $pct={pct}/>
            </Bar>
            <Value>
                {label}: {value}
                {unit ? ` ${unit}` : ''}
            </Value>
        </Wrap>
    )
}
