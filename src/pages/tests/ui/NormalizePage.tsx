import { useEffect, useState } from 'react'
import { normalizeCurrent, validateCurrent } from '@shared/api'

export function NormalizePage() {
    const [log, setLog] = useState<string[]>([])
    const [passed, setPassed] = useState<number>(0)
    const [failed, setFailed] = useState<number>(0)

    useEffect(() => {
        const lines: string[] = []
        let ok = 0
        let bad = 0

        function assert(cond: boolean, msg: string) {
            if (cond) {
                ok += 1
                lines.push(`✅ ${msg}`)
            } else {
                bad += 1
                lines.push(`❌ ${msg}`)
            }
        }

        const input = {
            TagA: 0,
            TagB: 1,
            TagC: 123
        }
        const normalized = normalizeCurrent(validateCurrent(input))

        const a = normalized.find((n) => n.key === 'TagA')
        const b = normalized.find((n) => n.key === 'TagB')
        const c = normalized.find((n) => n.key === 'TagC')

        assert(!!a, 'TagA exists')
        assert(!!b, 'TagB exists')
        assert(!!c, 'TagC exists')
        assert(a?.type === 'boolean' && a.value === 0, 'TagA boolean type, value 0')
        assert(b?.type === 'boolean' && b.value === 1, 'TagB boolean type, value 1')
        assert(c?.type === 'numeric' && c.value === 123, 'TagC numeric type, value 123')

        setPassed(ok)
        setFailed(bad)
        setLog(lines)
    }, [])

    return (
        <div>
            <h2>Normalize Tests</h2>
            <div style={{marginBottom: 12}}>
                Result: {passed} passed, {failed} failed
            </div>
            <pre>{log.join('\n')}</pre>
        </div>
    )
}
