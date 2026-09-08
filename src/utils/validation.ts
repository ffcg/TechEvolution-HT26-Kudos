import { KUDOS_MESSAGE_MAX_LENGTH } from '../constants'
import type { NewKudos, Result } from '../types'

export const validateKudosMessage = (message: string): Result<string> => {
  const trimmed = message.trim()

  if (trimmed.length === 0) {
    return { ok: false, error: new Error('Meddelandet får inte vara tomt.') }
  }
  if (trimmed.length > KUDOS_MESSAGE_MAX_LENGTH) {
    return {
      ok: false,
      error: new Error(
        `Meddelandet får vara högst ${KUDOS_MESSAGE_MAX_LENGTH} tecken.`,
      ),
    }
  }

  return { ok: true, value: trimmed }
}

export const validateNewKudos = (input: NewKudos): Result<NewKudos> => {
  if (!input.from) {
    return { ok: false, error: new Error('Välj vem du är.') }
  }
  if (!input.to) {
    return { ok: false, error: new Error('Välj en mottagare.') }
  }

  const message = validateKudosMessage(input.message)
  if (!message.ok) return message

  return { ok: true, value: { ...input, message: message.value } }
}
