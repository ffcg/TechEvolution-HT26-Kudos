import type { Kudos } from './kudos'
import type { Colleague } from '../infrastructure/colleagues'

export type RoleOf = 'from' | 'to'

export type FeedSortMode = { kind: 'newest' } | { kind: 'role'; roleOf: RoleOf }

export const DEFAULT_FEED_SORT_MODE: FeedSortMode = { kind: 'newest' }

function resolveRole(colleagues: Colleague[], colleagueId: string): string {
  return colleagues.find((colleague) => colleague.id === colleagueId)?.role ?? 'Unknown role'
}

export function sortKudosForDisplay(
  kudos: Kudos[],
  colleagues: Colleague[],
  mode: FeedSortMode,
): Kudos[] {
  if (mode.kind === 'newest') {
    return kudos
  }

  // Array.prototype.sort is stable, so kudos within the same role group
  // stay newest-first, since the input is already ordered that way.
  return [...kudos].sort((a, b) => {
    const roleA = resolveRole(colleagues, a[mode.roleOf])
    const roleB = resolveRole(colleagues, b[mode.roleOf])
    return roleA.localeCompare(roleB)
  })
}
