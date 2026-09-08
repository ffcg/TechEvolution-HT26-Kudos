import { describe, expect, it } from 'vitest'
import type { Kudos } from './kudos'
import type { Colleague } from '../infrastructure/colleagues'
import { sortKudosForDisplay } from './feedSort'

const engineer: Colleague = { id: 'c01', name: 'Alice', role: 'Engineer' }
const designer: Colleague = { id: 'c02', name: 'Bob', role: 'Designer' }
const colleagues = [engineer, designer]

function kudosTo(id: string, colleagueId: string, createdAt: string): Kudos {
  return { id, from: 'someone', to: colleagueId, message: 'thanks', category: 'CRAFT', createdAt }
}

describe('sortKudosForDisplay', () => {
  it('leaves the list untouched in newest mode', () => {
    const kudos = [kudosTo('a', engineer.id, '2026-01-03'), kudosTo('b', designer.id, '2026-01-01')]

    expect(sortKudosForDisplay(kudos, colleagues, { kind: 'newest' })).toBe(kudos)
  })

  it('groups by the recipient role, alphabetically, in role mode', () => {
    const kudos = [kudosTo('a', engineer.id, '2026-01-03'), kudosTo('b', designer.id, '2026-01-01')]

    const result = sortKudosForDisplay(kudos, colleagues, { kind: 'role' })

    // Designer sorts before Engineer alphabetically
    expect(result.map((item) => item.id)).toEqual(['b', 'a'])
  })

  it('keeps kudos within the same role group in their original (newest-first) order', () => {
    const kudos = [
      kudosTo('newest', engineer.id, '2026-01-03'),
      kudosTo('oldest', engineer.id, '2026-01-01'),
    ]

    const result = sortKudosForDisplay(kudos, colleagues, { kind: 'role' })

    expect(result.map((item) => item.id)).toEqual(['newest', 'oldest'])
  })

  it('falls back to "Unknown role" for a colleague no longer in the list', () => {
    const kudos = [kudosTo('a', 'deleted-colleague', '2026-01-01')]

    expect(() => sortKudosForDisplay(kudos, colleagues, { kind: 'role' })).not.toThrow()
  })
})
