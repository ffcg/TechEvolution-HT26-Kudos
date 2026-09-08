import { useState } from 'react'
import { loadKudos, saveKudos } from '../utils/kudosStorage'
import { validateNewKudos } from '../utils/validation'
import type { Kudos, NewKudos, Result } from '../types'

interface KudosStore {
  kudos: Kudos[]
  addKudos: (input: NewKudos) => Result<Kudos>
}

export const useKudos = (): KudosStore => {
  const [kudos, setKudos] = useState<Kudos[]>(loadKudos)

  const addKudos = (input: NewKudos): Result<Kudos> => {
    const validated = validateNewKudos(input)
    if (!validated.ok) return validated

    const created: Kudos = {
      id: crypto.randomUUID(),
      ...validated.value,
      createdAt: new Date().toISOString(),
    }

    const next = [created, ...kudos]
    setKudos(next)
    saveKudos(next)

    return { ok: true, value: created }
  }

  return { kudos, addKudos }
}
