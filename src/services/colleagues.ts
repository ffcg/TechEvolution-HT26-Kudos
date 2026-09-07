import colleaguesData from '../../data/colleagues.json'
import type { Colleague } from '../domain/types'

// Same mock list for every team — see data/README.md.
export const colleagues: Colleague[] = colleaguesData

// Kudos are immutable, so one referencing a removed colleague stays in the
// feed — see .ai/domain-model.md.
export const FORMER_COLLEAGUE_LABEL = 'Tidigare kollega'

export const getColleagueName = (id: string): string =>
  colleagues.find((colleague) => colleague.id === id)?.name ??
  FORMER_COLLEAGUE_LABEL
