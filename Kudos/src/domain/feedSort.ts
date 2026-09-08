import type { Kudos } from './kudos'
import type { Colleague } from '../infrastructure/colleagues'

export type FeedSortMode = { kind: 'newest' } | { kind: 'role' }

export const DEFAULT_FEED_SORT_MODE: FeedSortMode = { kind: 'newest' }

// Kept local and parameterized (not imported from infrastructure) so the
// domain layer stays framework/infra-free and testable with plain data —
// see architecture.md "Why the layers".
function resolveRecipientRole(colleagues: Colleague[], kudos: Kudos): string {
  return colleagues.find((colleague) => colleague.id === kudos.to)?.role ?? 'Unknown role'
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
    const roleA = resolveRecipientRole(colleagues, a)
    const roleB = resolveRecipientRole(colleagues, b)
    return roleA.localeCompare(roleB)
  })
}
