import styled from 'styled-components'

const Wrap = styled.label`
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-surface);
`

const Track = styled.span<{ $on: boolean }>`
    position: relative;
    width: 42px;
    height: 22px;
    border-radius: 999px;
    background: ${({$on}) => ($on ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)')};
    border: 1px solid var(--color-border);
    flex-shrink: 0;

    &::after {
        content: '';
        position: absolute;
        top: 1px;
        left: ${({$on}) => ($on ? '22px' : '1px')};
        width: 18px;
        height: 18px;
        border-radius: 999px;
        background: ${({$on}) => ($on ? '#ef4444' : '#10b981')};
        transition: left 0.15s ease;
    }
`

const Label = styled.span`
    color: var(--color-text);
    font-weight: 600;
`

export function BooleanSwitch({
                                  label,
                                  value,
                                  keyRaw,
                              }: {
    label: string
    value: number
    keyRaw?: string
}) {
    const on = value === 1
    return (
        <Wrap title={keyRaw || label} aria-label={`${label}: ${on ? 'ON' : 'OFF'}`}>
            <Track $on={on}/>
            <Label>{on ? 'ON' : 'OFF'}</Label>
        </Wrap>
    )
}
