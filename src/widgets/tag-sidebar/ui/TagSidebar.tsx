import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'

interface ITagSidebarProps {
    all: Array<{ key: string; label: string }>
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
`

export function TagSidebar({all}: ITagSidebarProps) {
    const [params, setParams] = useSearchParams()
    const selected = useMemo(() => (params.get('tags') || '').split(',').filter(Boolean), [params])

    useEffect(() => {
        if (!params.get('tags')) {
            const next = new URLSearchParams(params)
            next.set('tags', '')
            setParams(next, {replace: true})
        }
    }, [])

    function toggle(key: string) {
        const set = new Set(selected)
        if (set.has(key)) set.delete(key)
        else set.add(key)
        const next = new URLSearchParams(params)
        next.set('tags', Array.from(set).join(','))
        setParams(next, {replace: false})
    }

    return (
        <Wrap>
            {all.map((t) => (
                <label key={t.key} style={{
                    display: 'flex',
                    gap: 8,
                    alignItems: 'center'
                }}>
                    <input
                        type="checkbox"
                        checked={selected.includes(t.key)}
                        onChange={() => toggle(t.key)}
                    />
                    <span>{t.label}</span>
                </label>
            ))}
        </Wrap>
    )
}
