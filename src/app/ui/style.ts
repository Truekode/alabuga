import styled from 'styled-components'

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

export const Header = styled.header`
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface);
  font-weight: 600;
`

export const Body = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
`

export const Aside = styled.aside`
  width: 280px;
  border-right: 1px solid var(--color-border);
  padding: var(--space-3);
  overflow: auto;
  background: #0f172a;
`

export const Main = styled.main`
  flex: 1;
  padding: var(--space-4);
  overflow: auto;
`
