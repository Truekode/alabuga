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

const Dot = styled.span<{ $active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: ${({$active}) => ($active ? 'var(--color-critical)' : 'var(--color-success)')};
  box-shadow: 0 0 0 1px var(--color-border) inset;
`

const Label = styled.span`
  color: var(--color-text);
`

const State = styled.span<{ $active: boolean }>`
  color: ${({$active}) => ($active ? 'var(--color-critical)' : 'var(--color-success)')};
  font-weight: 600;
`

interface IBooleanIndicatorProps {
  label: string
  value: boolean
  tooltip?: string
  keyRaw?: string
}

export function BooleanIndicator({
                                   label,
                                   value,
                                   tooltip,
                                   keyRaw
                                 }: IBooleanIndicatorProps) {
  const title = tooltip || keyRaw || label
  return (
      <Wrap
          title={title}
          role="switch"
          aria-checked={value}
          aria-label={`${label}: ${value ? 'ON' : 'OFF'}`}
      >
        <Dot $active={value}/>
        <Label>{label}</Label>
        <State $active={value}>{value ? 'ON' : 'OFF'}</State>
      </Wrap>
  )
}
