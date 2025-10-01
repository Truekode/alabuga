import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`

const Item = styled.div`
  height: 20px;
  border-radius: var(--radius-sm);
  background: linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.2s infinite;
`

export function ListSkeleton({rows = 6}: { rows?: number }) {
    return (
        <div style={{
            display: 'grid',
            gap: 8
        }}>
            {Array.from({length: rows}).map((_, i) => (
                <Item key={i}/>
            ))}
        </div>
    )
}
