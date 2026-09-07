import { KudosCategory } from './types'
import type { Kudos } from './types'

const STORAGE_KEY = 'kudos-wall.kudos'

const isKudos = (value: unknown): value is Kudos => {
  if (typeof value !== 'object' || value === null) return false
  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.from === 'string' &&
    typeof candidate.to === 'string' &&
    typeof candidate.message === 'string' &&
    typeof candidate.createdAt === 'string' &&
    Object.values(KudosCategory).includes(candidate.category as KudosCategory)
  )
}

// Stored data is untrusted — anyone can edit localStorage, so every entry is
// validated and anything malformed is dropped rather than crashing the feed.
export const loadKudos = (): Kudos[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    // Re-sort on load: the store inserts newest-first, but hand-edited
    // storage must not be able to break the "always newest first" rule.
    return parsed
      .filter(isKudos)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  } catch {
    return []
  }
}

export const saveKudos = (kudos: Kudos[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(kudos))
  } catch (error) {
    // Quota or private mode — the app still works, only persistence is lost.
    console.warn('Could not persist kudos to localStorage', error)
  }
}
