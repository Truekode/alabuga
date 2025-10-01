import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
    0% {
        background-position: -300px 0;
    }
    100% {
        background-position: calc(300px + 100%) 0;
    }
`

const Box = styled.div`
    height: 260px;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    background: linear-gradient(90deg, #111827 25%, #1f2937 50%, #111827 75%);
    background-size: 300px 100%;
    animation: ${shimmer} 1.2s infinite;
`

export function ChartSkeleton() {
    return <Box/>
}
