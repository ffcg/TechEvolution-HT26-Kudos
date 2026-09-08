import { describe, expect, it } from 'vitest'
import { createKudos, isValidMessage, MAX_MESSAGE_LENGTH } from './kudos'

describe('isValidMessage', () => {
  it('rejects an empty message', () => {
    expect(isValidMessage('')).toBe(false)
  })

  it('rejects a whitespace-only message', () => {
    expect(isValidMessage('   \n\t ')).toBe(false)
  })

  it('accepts a normal message', () => {
    expect(isValidMessage('Great work on the deploy!')).toBe(true)
  })

  it(`accepts a message exactly ${MAX_MESSAGE_LENGTH} characters long`, () => {
    expect(isValidMessage('a'.repeat(MAX_MESSAGE_LENGTH))).toBe(true)
  })

  it(`rejects a message longer than ${MAX_MESSAGE_LENGTH} characters`, () => {
    expect(isValidMessage('a'.repeat(MAX_MESSAGE_LENGTH + 1))).toBe(false)
  })
})

describe('createKudos', () => {
  it('trims the message', () => {
    const kudos = createKudos({ from: 'c01', to: 'c02', message: '  nice work  ', category: 'CRAFT' })

    expect(kudos.message).toBe('nice work')
  })

  it('carries over from, to and category unchanged', () => {
    const kudos = createKudos({ from: 'c01', to: 'c02', message: 'thanks', category: 'MENTORSHIP' })

    expect(kudos.from).toBe('c01')
    expect(kudos.to).toBe('c02')
    expect(kudos.category).toBe('MENTORSHIP')
  })

  it('generates a unique id rather than deriving one from content', () => {
    const first = createKudos({ from: 'c01', to: 'c02', message: 'same message', category: 'CRAFT' })
    const second = createKudos({ from: 'c01', to: 'c02', message: 'same message', category: 'CRAFT' })

    expect(first.id).not.toBe(second.id)
  })

  it('stamps createdAt as a valid ISO date string', () => {
    const kudos = createKudos({ from: 'c01', to: 'c02', message: 'thanks', category: 'CRAFT' })

    expect(new Date(kudos.createdAt).toISOString()).toBe(kudos.createdAt)
  })
})
