import type { KudosCategory } from './types'

// The UI is Swedish; code and the domain vocabulary stay English,
// see .ai/conventions.md.
export const KUDOS_CATEGORY_LABELS: Record<KudosCategory, string> = {
  TEAMWORK: 'Samarbete',
  EXTRA_MILE: 'Extra milen',
  MENTORSHIP: 'Mentorskap',
  CRAFT: 'Hantverk',
  CUSTOMER_IMPACT: 'Kundnytta',
}
