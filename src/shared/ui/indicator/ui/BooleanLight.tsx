import styled from 'styled-components'

const Wrap = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
`

const Lamp = styled.div<{ $on: boolean }>`
    width: 16px;
    height: 16px;
    border-radius: 999px;
    background: ${({$on}) => ($on ? '#ef4444' : '#10b981')};
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.05) inset;
`

const Label = styled.div`
    font-size: 12px;
    color: var(--color-text);
`

export function BooleanLight({
                                 label,
                                 value,
                                 keyRaw,
                             }: {
    label: string
    value: number
    keyRaw?: string
}) {
    return (
        <Wrap title={keyRaw || label} aria-label={`${label}: ${value ? 'ON' : 'OFF'}`}>
            <Lamp $on={value === 1}/>
            <Label>{label}</Label>
        </Wrap>
    )
}
