import type { Result } from './types'

export const KUDOS_MESSAGE_MAX_LENGTH = 280

// The single place the message rule lives — used by both the form and the
// store, so it cannot be bypassed. See .ai/domain-model.md.
export const validateKudosMessage = (message: string): Result<string> => {
  const trimmed = message.trim()

  // Error messages are user-facing, so they are Swedish like the rest of
  // the UI — code and domain vocabulary stay English.
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
