import colleaguesData from '../../data/colleagues.json'

export interface Colleague {
  id: string
  name: string
  role: string
}

export const colleagues: Colleague[] = colleaguesData

export function resolveColleagueName(id: string): string {
  const colleague = colleagues.find((candidate) => candidate.id === id)
  // A referenced colleague can be missing if the list changes after a kudos
  // was sent — the kudos stays as-is (immutable), the UI falls back instead.
  return colleague ? colleague.name : 'Unknown colleague'
}
