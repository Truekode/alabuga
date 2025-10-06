import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useHistory } from '@shared/api'
import { Nav, TwoCol } from './histories.style'
import { HistorySidebar } from '@widgets/history-sidebar'
import { ChartSkeleton, ErrorBanner } from '@shared/ui/status'
import { HistoryPanel } from '@widgets/history-panel'

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
                        <HistorySidebar
                            all={data.map((d) => ({
                                key: d.key,
                                label: d.key,
                            }))}
                        />
                    </aside>
                    <section>
                        <HistoryPanel data={data} tags={tags}/>
                    </section>
                </TwoCol>
            )}
        </div>
    )
}
