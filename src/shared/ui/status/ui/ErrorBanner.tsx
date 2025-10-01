import styled from 'styled-components'

const Wrap = styled.div`
    border: 1px solid #ef4444;
    background: rgba(239, 68, 68, 0.08);
    color: #fecaca;
    padding: var(--space-3);
    border-radius: var(--radius-sm);
    display: flex;
    justify-content: space-between;
    gap: var(--space-3);
`

export function ErrorBanner({
                                message,
                                onRetry
                            }: { message: string; onRetry?: () => void }) {
    return (
        <Wrap>
            <div>{message}</div>
            {onRetry && (
                <button onClick={onRetry} style={{
                    borderRadius: 6,
                    padding: '6px 10px'
                }}>
                    Повторить
                </button>
            )}
        </Wrap>
    )
}
