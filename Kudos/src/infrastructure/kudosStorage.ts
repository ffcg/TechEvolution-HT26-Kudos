import type { Kudos } from '../domain/kudos'

const STORAGE_KEY = 'kudos-wall:kudos'

export function loadKudos(): Kudos[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []

  try {
    return JSON.parse(raw) as Kudos[]
  } catch {
    return []
  }
}

export function saveKudos(kudos: Kudos[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(kudos))
  } catch (error) {
    // Storage can be full or unavailable (e.g. some private-browsing
    // modes) — don't let that crash the app, but don't hide it either.
    console.error('Failed to save kudos to localStorage', error)
  }
}
