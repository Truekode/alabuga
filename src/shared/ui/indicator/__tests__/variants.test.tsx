import { describe, expect, it } from 'vitest'
import { renderToString } from 'react-dom/server'
import {
    BooleanLight,
    BooleanSwitch,
    NumericGauge,
    NumericProgressBar,
    NumericTrendSparkline,
    NumericValueCard,
} from '..'

describe('Indicator variants', () => {
    it('BooleanLight renders with label and ON tooltip', () => {
        const html = renderToString(<BooleanLight label="Jet" value={1} keyRaw="Jet_active"/>)
        expect(html).toContain('Jet')
    })
    it('BooleanSwitch renders ON/OFF text', () => {
        const html = renderToString(<BooleanSwitch label="Jet" value={0} keyRaw="Jet_active"/>)
        expect(html).toContain('OFF')
    })
    it('NumericValueCard shows number and unit', () => {
        const html = renderToString(
            <NumericValueCard label="Amps" value={1610} unit="A" keyRaw="Base_pumps_Ia_Amps"/>
        )
        expect(html).toContain('1610')
        expect(html).toContain('A')
    })
    it('NumericProgressBar shows label and value', () => {
        const html = renderToString(
            <NumericProgressBar label="Temp" value={60} unit="°C" range={{
                min: 0,
                max: 100
            }}/>
        )
        expect(html).toContain('Temp')
    })
    it('NumericGauge renders svg gauge', () => {
        const html = renderToString(<NumericGauge label="Load" value={75} unit="%"/>)
        expect(html).toContain('<svg')
    })
    it('NumericTrendSparkline renders path', () => {
        const now = Math.floor(Date.now() / 1000)
        const html = renderToString(
            <NumericTrendSparkline
                label="Flow"
                value={12}
                unit="l/s"
                history={[
                    {
                        ts: now - 60,
                        value: 10
                    },
                    {
                        ts: now - 30,
                        value: 11
                    },
                    {
                        ts: now,
                        value: 12
                    },
                ]}
            />
        )
        expect(html).toContain('<path')
    })
})
