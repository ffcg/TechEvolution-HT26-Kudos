import { useCallback, useState } from 'react'
import type { Category, Kudos } from '../domain/kudos'
import { createKudos, isValidMessage } from '../domain/kudos'
import { loadKudos, saveKudos } from '../infrastructure/kudosStorage'

interface AddKudosInput {
  from: string
  to: string
  message: string
  category: Category
}

export function useKudosStore() {
  const [kudos, setKudos] = useState<Kudos[]>(() => loadKudos())

  const addKudos = useCallback((input: AddKudosInput) => {
    // Enforced here, not just in the form, so this is the one entry point
    // that can never be bypassed — see domain-model.md "Where does
    // validation live".
    if (!isValidMessage(input.message)) return

    setKudos((current) => {
      // Prepend so the list is always newest-first by construction —
      // no sorting needed on render or on load.
      const next = [createKudos(input), ...current]
      saveKudos(next)
      return next
    })
  }, [])

  return { kudos, addKudos }
}
