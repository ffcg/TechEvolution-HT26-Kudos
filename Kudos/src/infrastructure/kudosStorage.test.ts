import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Kudos } from '../domain/kudos'
import { loadKudos, saveKudos } from './kudosStorage'

// localStorage crosses a system boundary (the browser), so it's mocked here
// rather than exercised for real — see conventions.md "Testing".
class MemoryStorage implements Storage {
  private store = new Map<string, string>()

  get length() {
    return this.store.size
  }

  getItem(key: string) {
    return this.store.has(key) ? this.store.get(key)! : null
  }

  setItem(key: string, value: string) {
    this.store.set(key, value)
  }

  removeItem(key: string) {
    this.store.delete(key)
  }

  clear() {
    this.store.clear()
  }

  key(index: number) {
    return Array.from(this.store.keys())[index] ?? null
  }
}

beforeEach(() => {
  vi.stubGlobal('localStorage', new MemoryStorage())
})

const sampleKudos: Kudos[] = [
  { id: 'k1', from: 'c01', to: 'c02', message: 'thanks', category: 'CRAFT', createdAt: '2026-01-01T00:00:00.000Z' },
]

describe('loadKudos', () => {
  it('returns an empty list when nothing has been saved', () => {
    expect(loadKudos()).toEqual([])
  })

  it('returns an empty list when the stored value is corrupt', () => {
    localStorage.setItem('kudos-wall:kudos', 'not valid json')

    expect(loadKudos()).toEqual([])
  })

  it('returns what was previously saved', () => {
    saveKudos(sampleKudos)

    expect(loadKudos()).toEqual(sampleKudos)
  })
})

describe('saveKudos', () => {
  it('does not throw when the underlying storage write fails', () => {
    vi.spyOn(localStorage, 'setItem').mockImplementation(() => {
      throw new DOMException('Quota exceeded', 'QuotaExceededError')
    })
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => saveKudos(sampleKudos)).not.toThrow()
    expect(consoleError).toHaveBeenCalled()
  })
})
