import { KeyText, TagGroup, TagHeader, VariantsRow } from '@pages/edges/ui/currents.style'
import {
    BooleanIndicator,
    BooleanLight,
    BooleanSwitch,
    NumericGauge,
    NumericIndicator,
    NumericProgressBar,
    NumericValueCard,
} from '@shared/ui/indicator'
import type { INormalizedCurrentItem } from '@shared/api'

export function CurrentTagGroup({tag}: { tag: INormalizedCurrentItem }) {
    if (tag.type === 'boolean') {
        const isOn = tag.value === 1
        return (
            <TagGroup>
                <TagHeader>
                    <span>{tag.label}</span>
                    <KeyText>{tag.key}</KeyText>
                </TagHeader>
                <VariantsRow>
                    <BooleanLight label={tag.label} value={tag.value} keyRaw={tag.key}/>
                    <BooleanSwitch label={tag.label} value={tag.value} keyRaw={tag.key}/>
                    <BooleanIndicator label={tag.label} value={isOn} tooltip={tag.key}/>
                </VariantsRow>
            </TagGroup>
        )
    }

    return (
        <TagGroup>
            <TagHeader>
                <span>{tag.label}</span>
                <KeyText>{tag.key}</KeyText>
            </TagHeader>
            <VariantsRow>
                <NumericValueCard label={tag.label} value={tag.value} unit={tag.unit} keyRaw={tag.key}/>
                <NumericProgressBar label={tag.label} value={tag.value} unit={tag.unit} keyRaw={tag.key}/>
                <NumericGauge label={tag.label} value={tag.value} unit={tag.unit} keyRaw={tag.key}/>
                <NumericIndicator label={tag.label} value={tag.value} unit={tag.unit} tooltip={tag.key}/>
            </VariantsRow>
        </TagGroup>
    )
}
