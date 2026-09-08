import { beforeEach, describe, expect, it, vi } from 'vitest'
import { KudosCategory } from '../../types'
import { loadKudos, saveKudos } from '../kudosStorage'
import type { Kudos } from '../../types'

const STORAGE_KEY = 'kudos-wall.kudos'
const store = new Map<string, string>()

vi.stubGlobal('localStorage', {
  getItem: (key: string) => store.get(key) ?? null,
  setItem: (key: string, value: string) => {
    store.set(key, value)
  },
})

const createKudos = (overrides: Partial<Kudos> = {}): Kudos => ({
  id: 'k1',
  from: 'c01',
  to: 'c02',
  message: 'Tack!',
  category: KudosCategory.TEAMWORK,
  createdAt: '2026-09-07T10:00:00.000Z',
  ...overrides,
})

describe('kudos storage', () => {
  beforeEach(() => {
    store.clear()
  })

  it('kudos survive a save and load round trip', () => {
    const kudos = [createKudos()]
    saveKudos(kudos)

    expect(loadKudos()).toEqual(kudos)
  })

  it('an empty storage loads as an empty feed', () => {
    expect(loadKudos()).toEqual([])
  })

  it('unreadable storage loads as an empty feed instead of crashing', () => {
    store.set(STORAGE_KEY, 'not json at all')

    expect(loadKudos()).toEqual([])
  })

  it('malformed entries are dropped while valid ones are kept', () => {
    const valid = createKudos()
    store.set(STORAGE_KEY, JSON.stringify([valid, { hej: 'inte en kudos' }]))

    expect(loadKudos()).toEqual([valid])
  })

  it('loaded kudos are newest first even when storage is out of order', () => {
    const older = createKudos({ id: 'k1', createdAt: '2026-09-05T10:00:00.000Z' })
    const newer = createKudos({ id: 'k2', createdAt: '2026-09-07T10:00:00.000Z' })
    store.set(STORAGE_KEY, JSON.stringify([older, newer]))

    expect(loadKudos().map((k) => k.id)).toEqual(['k2', 'k1'])
  })
})
