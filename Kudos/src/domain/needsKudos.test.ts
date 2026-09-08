import { describe, expect, it } from 'vitest'
import type { Kudos } from './kudos'
import type { Colleague } from '../infrastructure/colleagues'
import { getColleaguesNeedingKudos, NEEDS_KUDOS_THRESHOLD_DAYS } from './needsKudos'

const NOW = new Date('2026-01-15T00:00:00.000Z')

const alice: Colleague = { id: 'c01', name: 'Alice', role: 'Engineer' }
const bob: Colleague = { id: 'c02', name: 'Bob', role: 'Designer' }

function daysAgo(days: number): string {
  return new Date(NOW.getTime() - days * 24 * 60 * 60 * 1000).toISOString()
}

function kudosTo(colleagueId: string, createdAt: string): Kudos {
  return { id: 'k', from: 'someone', to: colleagueId, message: 'thanks', category: 'CRAFT', createdAt }
}

describe('getColleaguesNeedingKudos', () => {
  it('includes a colleague who has never received a kudos', () => {
    const [status] = getColleaguesNeedingKudos([alice], [], NOW)

    expect(status.lastReceivedAt).toBeNull()
    expect(status.daysSinceLastKudos).toBe(Infinity)
  })

  it('excludes a colleague who received a kudos within the threshold', () => {
    const kudos = [kudosTo(alice.id, daysAgo(3))]

    expect(getColleaguesNeedingKudos([alice], kudos, NOW)).toEqual([])
  })

  it('includes a colleague right at the threshold boundary', () => {
    const kudos = [kudosTo(alice.id, daysAgo(NEEDS_KUDOS_THRESHOLD_DAYS))]

    expect(getColleaguesNeedingKudos([alice], kudos, NOW)).toHaveLength(1)
  })

  it('includes a colleague whose last kudos was long ago', () => {
    const kudos = [kudosTo(alice.id, daysAgo(30))]

    expect(getColleaguesNeedingKudos([alice], kudos, NOW)).toHaveLength(1)
  })

  it('orders results longest-since-last-kudos first, never-received at the very top', () => {
    const kudos = [kudosTo(bob.id, daysAgo(10))]

    const result = getColleaguesNeedingKudos([alice, bob], kudos, NOW)

    expect(result.map((status) => status.colleague.id)).toEqual([alice.id, bob.id])
  })

  it('treats the first matching kudos as the most recent, trusting newest-first input', () => {
    const kudos = [kudosTo(alice.id, daysAgo(10)), kudosTo(alice.id, daysAgo(1))]

    const [status] = getColleaguesNeedingKudos([alice], kudos, NOW)

    expect(status.daysSinceLastKudos).toBe(10)
  })
})
