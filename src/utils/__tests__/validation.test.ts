import { describe, expect, it } from 'vitest'
import { KUDOS_MESSAGE_MAX_LENGTH } from '../../constants'
import { KudosCategory } from '../../types'
import { validateNewKudos } from '../validation'
import type { NewKudos } from '../../types'

const createInput = (overrides: Partial<NewKudos> = {}): NewKudos => ({
  from: 'c01',
  to: 'c02',
  message: 'Tack för hjälpen!',
  category: KudosCategory.TEAMWORK,
  ...overrides,
})

describe('validating a new kudos', () => {
  it('a valid kudos passes with its message trimmed', () => {
    const result = validateNewKudos(createInput({ message: '  Tack!  ' }))

    expect(result.ok).toBe(true)
    if (result.ok) expect(result.value.message).toBe('Tack!')
  })

  it('a kudos without a recipient is invalid', () => {
    const result = validateNewKudos(createInput({ to: '' }))

    expect(result.ok).toBe(false)
  })

  it('a kudos without a sender is invalid', () => {
    const result = validateNewKudos(createInput({ from: '' }))

    expect(result.ok).toBe(false)
  })

  it('an empty message is invalid', () => {
    const result = validateNewKudos(createInput({ message: '' }))

    expect(result.ok).toBe(false)
  })

  it('a whitespace-only message is invalid', () => {
    const result = validateNewKudos(createInput({ message: '   \n\t ' }))

    expect(result.ok).toBe(false)
  })

  it('a message at the maximum length is valid', () => {
    const message = 'a'.repeat(KUDOS_MESSAGE_MAX_LENGTH)
    const result = validateNewKudos(createInput({ message }))

    expect(result.ok).toBe(true)
  })

  it('a message longer than the maximum length is invalid', () => {
    const message = 'a'.repeat(KUDOS_MESSAGE_MAX_LENGTH + 1)
    const result = validateNewKudos(createInput({ message }))

    expect(result.ok).toBe(false)
  })
})
