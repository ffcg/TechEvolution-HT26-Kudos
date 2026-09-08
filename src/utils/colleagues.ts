import colleaguesData from '../../data/colleagues.json'
import type { Colleague } from '../types'

export const colleagues: Colleague[] = colleaguesData

export const FORMER_COLLEAGUE_LABEL = 'Tidigare kollega'

export const getColleagueName = (id: string): string =>
  colleagues.find((colleague) => colleague.id === id)?.name ??
  FORMER_COLLEAGUE_LABEL
