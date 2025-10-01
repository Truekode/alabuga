import { useEdges } from '@shared/api'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'

const EdgeButton = styled.button<{ $active: boolean }>`
    text-align: left;
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-sm);
    border: 1px solid var(--color-border);
    background: ${({$active}) => ($active ? 'var(--color-primary-weak)' : 'transparent')};
    color: var(--color-text);
    cursor: pointer;
    transition: background 0.15s ease;

    &:hover {
        background: rgba(99, 102, 241, 0.1);
    }
`

export function EdgeSidebar() {
    const {
        data,
        isLoading,
        error
    } = useEdges()
    const [params, setParams] = useSearchParams()
    const navigate = useNavigate()
    const selected = params.get('edge') || ''

    if (isLoading) return <div>Загрузка объектов...</div>
    if (error) return <div style={{color: 'red'}}>{error.message}</div>
    if (!data || data.length === 0) return <div>Нет объектов</div>

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8
        }}>
            {data.map((edge) => (
                <EdgeButton
                    key={edge}
                    $active={selected === edge}
                    onClick={() => {
                        const next = new URLSearchParams(params)
                        next.set('edge', edge)
                        setParams(next, {replace: false})
                        navigate(`/edges/${encodeURIComponent(edge)}/currents`)
                    }}
                >
                    {edge}
                </EdgeButton>
            ))}
        </div>
    )
}
