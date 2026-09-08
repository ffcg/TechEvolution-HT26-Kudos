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
  createdAt: string
}

export interface NewKudos {
  from: string
  to: string
  message: string
  category: KudosCategory
}

export interface Colleague {
  id: string
  name: string
  role: string
}

export type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: Error }
