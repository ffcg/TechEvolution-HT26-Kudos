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
  localStorage.setItem(STORAGE_KEY, JSON.stringify(kudos))
}
