import { useCallback, useEffect, useState } from 'react'
import { loadKudos, saveKudos } from '../services/storage'
import { validateKudosMessage } from '../domain/validation'
import type { Kudos, KudosCategory, Result } from '../domain/types'

export interface NewKudos {
  from: string
  to: string
  message: string
  category: KudosCategory
}

interface KudosStore {
  kudos: Kudos[]
  addKudos: (input: NewKudos) => Result<Kudos>
}

// The single source of truth for the kudos list: the form writes through
// addKudos, the feed reads kudos — see .ai/architecture.md.
export const useKudos = (): KudosStore => {
  const [kudos, setKudos] = useState<Kudos[]>(loadKudos)

  useEffect(() => {
    saveKudos(kudos)
  }, [kudos])

  const addKudos = useCallback((input: NewKudos): Result<Kudos> => {
    const validated = validateKudosMessage(input.message)
    if (!validated.ok) return validated

    const created: Kudos = {
      id: crypto.randomUUID(),
      from: input.from,
      to: input.to,
      message: validated.value,
      category: input.category,
      createdAt: new Date().toISOString(),
    }

    setKudos((current) => [created, ...current])
    return { ok: true, value: created }
  }, [])

  return { kudos, addKudos }
}
