import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useHistory } from '@shared/api'
import { Foot, Meta, Nav, TwoCol } from './histories.style'
import { HistorySidebar } from '@widgets/history-sidebar'
import { HistoryChart } from '@shared/ui/history-chart'
import { ChartSkeleton, EmptyState, ErrorBanner } from '@shared/ui/status'

export function HistoriesPage() {
    const {id} = useParams()
    const [params] = useSearchParams()
    const tags = params.get('tags') || ''
    const {
        data,
        isLoading,
        error
    } = useHistory(id)
    return (
        <div>
            <h2>История: {id}</h2>
            <Nav>
                <Link
                    to={`/edges/${encodeURIComponent(id || '')}/currents?tags=${encodeURIComponent(tags)}`}
                >
                    Назад к текущему состоянию
                </Link>
            </Nav>
            {isLoading && <ChartSkeleton/>}
            {error && <ErrorBanner message={error.message}/>}
            {!isLoading && !error && data && (
                <TwoCol>
                    <aside>
                        <HistorySidebar all={data.map((d) => ({
                            key: d.key,
                            label: d.key
                        }))}/>
                    </aside>
                    <section>
                        <HistoryChart
                            series={data
                                .filter((s) => !tags || tags.split(',').filter(Boolean).includes(s.key))
                                .map((s, i) => ({
                                    key: s.key,
                                    color:
                                        new URLSearchParams(location.search).get(`color:${s.key}`) ||
                                        ['#6366f1', '#10b981', '#ef4444', '#f59e0b'][i % 4],
                                    points: s.values,
                                }))}
                        />
                        {(!tags || tags.split(',').filter(Boolean).length === 0) && (
                            <div style={{marginTop: 12}}>
                                <EmptyState text="Теги не выбраны"/>
                            </div>
                        )}
                        <Foot>
                            <Meta>Выбрано: {tags || 'нет'}</Meta>
                        </Foot>
                    </section>
                </TwoCol>
            )}
        </div>
    )
}
