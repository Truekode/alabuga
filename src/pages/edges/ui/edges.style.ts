import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Wrap = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-4);
`

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: var(--space-4);
`

export const Card = styled.div`
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    padding: var(--space-4);
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
`

export const Title = styled.div`
    font-weight: 600;
    color: var(--color-text);
`

export const Actions = styled.div`
    display: flex;
    gap: var(--space-2);
`

export const ButtonLink = styled(Link)`
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-sm);
    border: 1px solid var(--color-border);
    color: var(--color-text);
    text-decoration: none;
    background: rgba(99, 102, 241, 0.08);

    &:hover {
        background: rgba(99, 102, 241, 0.16);
    }
`
