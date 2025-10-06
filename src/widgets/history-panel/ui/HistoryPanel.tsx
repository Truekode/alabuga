import { Meta } from '@pages/edges/ui/histories.style'
import { HistoryChart } from '@shared/ui/history-chart'
import { EmptyState } from '@shared/ui/status'
import type { INormalizedHistorySeries } from '@shared/api'

function filterByTags(data: INormalizedHistorySeries[], tags: string): INormalizedHistorySeries[] {
    if (!tags) return data
    const set = new Set(tags.split(',').filter(Boolean))
    return data.filter((s) => set.has(s.key))
}

function mapSeriesWithColor(
    data: INormalizedHistorySeries[]
): Array<{ key: string; color?: string; points: { ts: number; value: number }[] }> {
    const params = new URLSearchParams(window.location.search)
    return data.map((s) => ({
        key: s.key,
        color: params.get(`color:${s.key}`) || undefined,
        points: s.values,
    }))
}

export function HistoryPanel({
                                 data,
                                 tags
                             }: { data: INormalizedHistorySeries[]; tags: string }) {
    const filtered = filterByTags(data, tags)
    const series = mapSeriesWithColor(filtered)
    const noTags = !tags || tags.split(',').filter(Boolean).length === 0

    return (
        <div>
            <HistoryChart series={series}/>
            {noTags && (
                <div style={{marginTop: 12}}>
                    <EmptyState text="Теги не выбраны"/>
                </div>
            )}
            <div style={{marginTop: 12}}>
                <Meta>Выбрано: {tags || 'нет'}</Meta>
            </div>
        </div>
    )
}
