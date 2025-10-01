import { useEdges } from '@shared/api'

import { EmptyState, ErrorBanner, ListSkeleton } from '@shared/ui/status'
import { Actions, ButtonLink, Card, Grid, Title, Wrap } from './edges.style'

export function EdgesPage() {
    const {
        data,
        isLoading,
        error
    } = useEdges()
    if (isLoading) return <ListSkeleton rows={6}/>
    if (error) return <ErrorBanner message={error.message}/>
    if (!data || data.length === 0) return <EmptyState text="Нет данных"/>

    const items = (data ?? []).map((id) => ({
        id,
        linkCurrents: `/edges/${encodeURIComponent(id)}/currents`,
        linkHistories: `/edges/${encodeURIComponent(id)}/histories`,
    }))

    return (
        <Wrap>
            <Title>Объекты</Title>
            <Grid>
                {items.map((it) => (
                    <Card key={it.id}>
                        <Title>{it.id}</Title>
                        <Actions>
                            <ButtonLink to={it.linkCurrents}>Currents</ButtonLink>
                            <ButtonLink to={it.linkHistories}>Histories</ButtonLink>
                        </Actions>
                    </Card>
                ))}
            </Grid>
        </Wrap>
    )
}
