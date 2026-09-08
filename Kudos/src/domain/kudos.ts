export type Category =
  | 'TEAMWORK'
  | 'EXTRA_MILE'
  | 'MENTORSHIP'
  | 'CRAFT'
  | 'CUSTOMER_IMPACT'

export const CATEGORIES: Category[] = [
  'TEAMWORK',
  'EXTRA_MILE',
  'MENTORSHIP',
  'CRAFT',
  'CUSTOMER_IMPACT',
]

export interface Kudos {
  id: string
  from: string
  to: string
  message: string
  category: Category
  createdAt: string
}

export const MAX_MESSAGE_LENGTH = 200

export function isValidMessage(message: string): boolean {
  const trimmed = message.trim()
  return trimmed.length > 0 && trimmed.length <= MAX_MESSAGE_LENGTH
}

// Self-kudos are disallowed — a kudos lifts up a colleague, not yourself.
export function canSendKudos(from: string, to: string, message: string): boolean {
  return from !== to && isValidMessage(message)
}

export function createKudos(input: {
  from: string
  to: string
  message: string
  category: Category
}): Kudos {
  return {
    id: crypto.randomUUID(),
    from: input.from,
    to: input.to,
    message: input.message.trim(),
    category: input.category,
    createdAt: new Date().toISOString(),
  }
}
