export const KudosCategory = {
  TEAMWORK: 'TEAMWORK',
  EXTRA_MILE: 'EXTRA_MILE',
  MENTORSHIP: 'MENTORSHIP',
  CRAFT: 'CRAFT',
  CUSTOMER_IMPACT: 'CUSTOMER_IMPACT',
} as const

export type KudosCategory = (typeof KudosCategory)[keyof typeof KudosCategory]

export interface Kudos {
  id: string
  from: string
  to: string
  message: string
  category: KudosCategory
  createdAt: string // ISO 8601, UTC
}

export interface Colleague {
  id: string
  name: string
  role: string
}

export type Result<T, E extends Error = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E }
