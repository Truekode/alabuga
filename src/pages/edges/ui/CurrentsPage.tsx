import { Link, useParams, useSearchParams } from 'react-router-dom'
import type { INormalizedCurrentItem } from '@shared/api'
import { useCurrent } from '@shared/api'

import { Grid, TwoCol } from './currents.style'
import { CurrentSidebar } from '@widgets/current-sidebar'
import { CurrentTagGroup } from '@widgets/current-tag-group'

import { EmptyState, ErrorBanner, ListSkeleton } from '@shared/ui/status'

export function CurrentsPage() {
    const {id} = useParams()
    const [params] = useSearchParams()
    const tags = params.get('tags') || ''
    const {
        data,
        isLoading,
        error
    } = useCurrent(id)

    return (
        <div>
            <h2>Текущее состояние: {id}</h2>
            <div style={{marginBottom: 12}}>
                <Link
                    to={`/edges/${encodeURIComponent(id || '')}/histories?tags=${encodeURIComponent(tags)}`}
                >
                    Перейти к истории
                </Link>
            </div>
            <TwoCol>
                <aside>
                    <CurrentSidebar tags={(data ?? []).map((d) => ({
                        key: d.key,
                        label: d.label
                    }))}/>
                </aside>
                <section>
                    {isLoading && <ListSkeleton rows={8}/>}
                    {error && <ErrorBanner message={error.message}/>}
                    {!isLoading && !error && data && (
                        <Grid>
                            {renderCurrentGroups(data, tags)}
                            {renderEmpty(tags)}
                        </Grid>
                    )}
                </section>
            </TwoCol>
        </div>
    )
}

function filterSelected(data: INormalizedCurrentItem[], tags: string): INormalizedCurrentItem[] {
    if (!tags) return data
    const set = new Set(tags.split(',').filter(Boolean))
    return data.filter((t) => set.has(t.key))
}

function renderCurrentGroups(data: INormalizedCurrentItem[], tags: string) {
    return filterSelected(data, tags).map((item) => <CurrentTagGroup key={item.key} tag={item}/>)
}

function renderEmpty(tags: string) {
    const none = !tags || tags.split(',').filter(Boolean).length === 0
    return none ? <EmptyState text="Теги не выбраны"/> : null
}
