import styled from 'styled-components'

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: var(--space-4);
`

export const TagGroup = styled.div`
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    padding: var(--space-3) var(--space-4);
    display: grid;
    gap: var(--space-3);
`

export const TagHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    color: var(--color-text);
    font-weight: 600;
`

export const KeyText = styled.span`
    color: var(--color-muted);
    font-size: 12px;
`

export const VariantsRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
`

export const TwoCol = styled.div`
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: var(--space-4);
`

export const Nav = styled.div`
    margin-bottom: var(--space-3);
`
