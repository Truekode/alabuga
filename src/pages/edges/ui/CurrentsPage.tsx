import { useParams, useSearchParams, Link } from 'react-router-dom'
import { useCurrent, useHistory } from '@shared/api'
import {
    BooleanIndicator,
    NumericIndicator,
    BooleanLight,
    BooleanSwitch,
    NumericValueCard,
    NumericProgressBar,
    NumericGauge,
    NumericTrendSparkline,
} from '@shared/ui/indicator'
import { Grid, TagGroup, TagHeader, KeyText, VariantsRow, TwoCol } from './currents.style'
import { TagSidebar } from '@widgets/tag-sidebar'
import { ListSkeleton, ErrorBanner, EmptyState } from '@shared/ui/status'

export function CurrentsPage() {
    const {id} = useParams()
    const [params] = useSearchParams()
    const tags = params.get('tags') || ''
    const {
        data,
        isLoading,
        error
    } = useCurrent(id)
    const history = useHistory(id)
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
                    <TagSidebar all={(data ?? []).map((d) => ({
                        key: d.key,
                        label: d.label
                    }))}/>
                </aside>
                <section>
                    {isLoading && <ListSkeleton rows={8}/>}
                    {error && <ErrorBanner message={error.message}/>}
                    {!isLoading && !error && data && (
                        <Grid>
                            {data.map((item) => {
                                const isSelected = !tags || tags.split(',').filter(Boolean).includes(item.key)
                                if (!isSelected) return null
                                if (item.type === 'boolean') {
                                    return (
                                        <TagGroup key={item.key}>
                                            <TagHeader>
                                                <span>{item.label}</span>
                                                <KeyText>{item.key}</KeyText>
                                            </TagHeader>
                                            <VariantsRow>
                                                <BooleanLight label={item.label} value={item.value} keyRaw={item.key}/>
                                                <BooleanSwitch label={item.label} value={item.value} keyRaw={item.key}/>
                                                <BooleanIndicator
                                                    label={item.label}
                                                    value={item.value === 1}
                                                    tooltip={item.key}
                                                />
                                            </VariantsRow>
                                        </TagGroup>
                                    )
                                }
                                const histSeries = history.data?.find((s) => s.key === item.key)
                                return (
                                    <TagGroup key={item.key}>
                                        <TagHeader>
                                            <span>{item.label}</span>
                                            <KeyText>{item.key}</KeyText>
                                        </TagHeader>
                                        <VariantsRow>
                                            <NumericValueCard
                                                label={item.label}
                                                value={item.value}
                                                unit={item.unit}
                                                keyRaw={item.key}
                                            />
                                            <NumericProgressBar
                                                label={item.label}
                                                value={item.value}
                                                unit={item.unit}
                                                keyRaw={item.key}
                                            />
                                            <NumericGauge
                                                label={item.label}
                                                value={item.value}
                                                unit={item.unit}
                                                keyRaw={item.key}
                                            />
                                            <NumericTrendSparkline
                                                label={item.label}
                                                value={item.value}
                                                unit={item.unit}
                                                keyRaw={item.key}
                                                history={histSeries?.values}
                                            />
                                            <NumericIndicator
                                                label={item.label}
                                                value={item.value}
                                                unit={item.unit}
                                                tooltip={item.key}
                                            />
                                        </VariantsRow>
                                    </TagGroup>
                                )
                            })}
                            {(!tags || tags.split(',').filter(Boolean).length === 0) && (
                                <EmptyState text="Теги не выбраны"/>
                            )}
                        </Grid>
                    )}
                </section>
            </TwoCol>
        </div>
    )
}
