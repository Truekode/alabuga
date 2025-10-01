import styled from 'styled-components'

const Wrap = styled.div`
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
`

const Gauge = styled.div`
  position: relative;
  width: 120px;
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

const Label = styled.span`
  color: var(--color-text);
`

interface INumericIndicatorProps {
    label: string
    value: number
    unit?: string
    tooltip?: string
    keyRaw?: string
    range?: { min: number; max: number }
}

export function NumericIndicator({
                                     label,
                                     value,
                                     unit,
                                     tooltip,
                                     keyRaw,
                                     range,
                                 }: INumericIndicatorProps) {
    const min = range?.min ?? 0
    const max = range?.max ?? 100
    const pct = ((value - min) / (max - min)) * 100
    const title = tooltip || keyRaw || `${label}${unit ? `, ${unit}` : ''}`
    return (
        <Wrap
            title={title}
            role="meter"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-label={`${label}${unit ? `, ${unit}` : ''}`}
        >
            <Gauge>
                <Fill $pct={pct}/>
            </Gauge>
            <Label>
                {label}: {value}
                {unit ? ` ${unit}` : ''}
            </Label>
        </Wrap>
    )
}
