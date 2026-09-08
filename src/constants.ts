import type { KudosCategory } from './types'

export const KUDOS_MESSAGE_MAX_LENGTH = 200

export const KUDOS_CATEGORY_LABELS: Record<KudosCategory, string> = {
  TEAMWORK: 'Samarbete',
  EXTRA_MILE: 'Extra milen',
  MENTORSHIP: 'Mentorskap',
  CRAFT: 'Hantverk',
  CUSTOMER_IMPACT: 'Kundnytta',
}
