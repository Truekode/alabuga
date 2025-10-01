import styled from 'styled-components'

const Wrap = styled.div`
    padding: var(--space-4);
    color: var(--color-muted);
    text-align: center;
    border: 1px dashed var(--color-border);
    border-radius: var(--radius-md);
`

export function EmptyState({text}: { text: string }) {
    return <Wrap>{text}</Wrap>
}
