import { describe, expect, it } from 'vitest'
import { validateEdges } from '@shared/api'

describe('validateEdges', () => {
    it('accepts array of strings', () => {
        expect(validateEdges(['a', 'b'])).toEqual(['a', 'b'])
    })

    it('throws on invalid input', () => {
        expect(() => validateEdges(['a', 1 as unknown as string])).toThrow()
    })
})
