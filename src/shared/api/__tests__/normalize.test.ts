import { describe, expect, it } from 'vitest'
import { inferType, normalizeCurrent } from '@shared/api'

describe('normalizeCurrent & inferType', () => {
    it('classifies boolean and numeric correctly', () => {
        const input = {
            A: 0,
            B: 1,
            C: 123
        }
        const out = normalizeCurrent(input)
        const a = out.find((i) => i.key === 'A')!
        const b = out.find((i) => i.key === 'B')!
        const c = out.find((i) => i.key === 'C')!
        expect(a.type).toBe('boolean')
        expect(b.type).toBe('boolean')
        expect(c.type).toBe('numeric')
        expect(inferType(0)).toBe('boolean')
        expect(inferType(1)).toBe('boolean')
        expect(inferType(2)).toBe('numeric')
    })
})
