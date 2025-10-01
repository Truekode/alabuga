import { describe, expect, it } from 'vitest'
import { BooleanIndicator } from '../ui/BooleanIndicator'
import { NumericIndicator } from '../ui/NumericIndicator'
import { renderToString } from 'react-dom/server'

describe('BooleanIndicator', () => {
    it('renders OFF (green) when value=0', () => {
        const html = renderToString(<BooleanIndicator label="Test" value={false} keyRaw="K"/>)
        expect(html).toContain('OFF')
    })

    it('renders ON (red) when value=1', () => {
        const html = renderToString(<BooleanIndicator label="Test" value={true} keyRaw="K"/>)
        expect(html).toContain('ON')
    })
})

describe('NumericIndicator', () => {
    it('shows value and unit', () => {
        const html = renderToString(
            <NumericIndicator label="Amps" value={1610} unit="A" keyRaw="Base_pumps_Ia_Amps"/>
        )
        expect(html).toContain('Amps')
        expect(html).toContain('1610')
        expect(html).toContain('A')
    })
})
