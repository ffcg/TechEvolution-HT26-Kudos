import type { Kudos } from './kudos'
import type { Colleague } from '../infrastructure/colleagues'

export const NEEDS_KUDOS_THRESHOLD_DAYS = 7

export interface ColleagueKudosStatus {
  colleague: Colleague
  lastReceivedAt: string | null
  daysSinceLastKudos: number
}

function daysSince(date: Date, now: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24
  return (now.getTime() - date.getTime()) / msPerDay
}

export function getColleaguesNeedingKudos(
  colleagues: Colleague[],
  kudos: Kudos[],
  now: Date = new Date(),
): ColleagueKudosStatus[] {
  const statuses = colleagues.map((colleague) => {
    // kudos is already newest-first (see useKudosStore), so the first
    // match is the most recent one — no extra sorting needed here.
    const mostRecent = kudos.find((item) => item.to === colleague.id)
    const lastReceivedAt = mostRecent?.createdAt ?? null
    // Never having received a kudos is treated as the extreme case of
    // "not in the last N days," not a separate category.
    const daysSinceLastKudos = lastReceivedAt
      ? daysSince(new Date(lastReceivedAt), now)
      : Infinity

    return { colleague, lastReceivedAt, daysSinceLastKudos }
  })

  return statuses
    .filter((status) => status.daysSinceLastKudos >= NEEDS_KUDOS_THRESHOLD_DAYS)
    .sort((a, b) => b.daysSinceLastKudos - a.daysSinceLastKudos)
}
