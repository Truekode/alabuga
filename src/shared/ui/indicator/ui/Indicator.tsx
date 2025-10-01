import { BooleanIndicator } from './BooleanIndicator'
import { NumericIndicator } from './NumericIndicator'

type TTag = {
    key: string
    label: string
    type: 'boolean' | 'numeric'
    value: number
    unit?: string
}

export function Indicator({tag}: { tag: TTag }) {
    if (tag.type === 'boolean') {
        return (
            <BooleanIndicator
                label={tag.label}
                value={tag.value === 1}
                keyRaw={tag.key}
                tooltip={tag.key}
            />
        )
    }
    return (
        <NumericIndicator
            label={tag.label}
            value={tag.value}
            unit={tag.unit}
            keyRaw={tag.key}
            tooltip={tag.key}
        />
    )
}
