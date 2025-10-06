import styled, { keyframes } from 'styled-components'

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

const Center = styled.div<{ $center?: boolean }>`
    display: ${({$center}) => ($center ? 'grid' : 'inline-grid')};
    place-items: center;
    width: 100%;
    min-height: ${({$center}) => ($center ? '160px' : 'auto')};
`

const Ring = styled.div<{ $size: number }>`
    width: ${({$size}) => `${$size}px`};
    height: ${({$size}) => `${$size}px`};
    border-radius: 50%;
    border: 3px solid var(--color-primary-weak);
    border-top-color: var(--color-primary);
    animation: ${spin} 0.9s linear infinite;
`

export function Spinner({
                            size = 28,
                            center
                        }: { size?: number; center?: boolean }) {
    return (
        <Center $center={center} aria-live="polite" aria-busy="true">
            <Ring $size={size} role="status"/>
        </Center>
    )
}
