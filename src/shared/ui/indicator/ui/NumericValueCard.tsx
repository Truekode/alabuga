import styled from 'styled-components'

const Card = styled.div`
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  padding: var(--space-3) var(--space-4);
  display: flex;
  justify-content: space-between;
  align-items: baseline;
    flex-direction: column;
`

const Label = styled.div`
  color: var(--color-muted);
  font-size: 12px;
`

const Value = styled.div`
  color: var(--color-text);
  font-size: 18px;
  font-weight: 600;
`

export function NumericValueCard({
                                     label,
                                     value,
                                     unit,
                                     keyRaw,
                                 }: {
    label: string
    value: number
    unit?: string
    keyRaw?: string
}) {
    return (
        <Card title={keyRaw || label}>
            <Label>{label}</Label>
            <Value>
                {value}
                {unit ? ` ${unit}` : ''}
            </Value>
        </Card>
    )
}
