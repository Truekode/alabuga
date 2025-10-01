import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { getColorForKey } from '@shared/colors/palette'

interface IHistorySidebarProps {
    all: Array<{ key: string; label: string }>
}

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
`

const Row = styled.label`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-2);
`

export function HistorySidebar({all}: IHistorySidebarProps) {
    const [params, setParams] = useSearchParams()
    const selected = useMemo(() => (params.get('tags') || '').split(',').filter(Boolean), [params])

    useEffect(() => {
        if (!params.get('tags')) {
            const next = new URLSearchParams(params)
            next.set('tags', '')
            setParams(next, {replace: true})
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function toggle(key: string) {
        const set = new Set(selected)
        if (set.has(key)) set.delete(key)
        else set.add(key)
        const next = new URLSearchParams(params)
        next.set('tags', Array.from(set).join(','))
        setParams(next, {replace: false})
    }

    function setColor(key: string, color: string) {
        const next = new URLSearchParams(params)
        next.set(`color:${key}`, color)
        setParams(next, {replace: false})
    }

    return (
        <Wrap>
            {all.map((t) => {
                const initial = getColorForKey(t.key)
                const colorParam = params.get(`color:${t.key}`) || initial
                return (
                    <Row key={t.key}>
            <span style={{
                display: 'inline-flex',
                gap: 8,
                alignItems: 'center'
            }}>
              <input
                  type="checkbox"
                  checked={selected.includes(t.key)}
                  onChange={() => toggle(t.key)}
              />
              <span>{t.label}</span>
            </span>
                        <input
                            type="color"
                            value={colorParam}
                            onChange={(e) => setColor(t.key, e.target.value)}
                        />
                    </Row>
                )
            })}
        </Wrap>
    )
}
