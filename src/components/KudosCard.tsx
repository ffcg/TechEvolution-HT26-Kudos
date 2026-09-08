import { getColleagueName } from '../utils/colleagues'
import { KUDOS_CATEGORY_LABELS } from '../constants'
import type { Kudos } from '../types'

const createdAtFormat = new Intl.DateTimeFormat('sv-SE', {
  dateStyle: 'short',
  timeStyle: 'short',
})

const formatCreatedAt = (createdAt: string): string => {
  const date = new Date(createdAt)
  return Number.isNaN(date.getTime()) ? '' : createdAtFormat.format(date)
}

interface KudosCardProps {
  kudos: Kudos
}

export const KudosCard = ({ kudos }: KudosCardProps) => (
  <article className="kudos-card">
    <header className="kudos-card-header">
      <span>
        <strong>{getColleagueName(kudos.from)}</strong>
        {' → '}
        <strong>{getColleagueName(kudos.to)}</strong>
      </span>
      <span className="kudos-card-category">
        {KUDOS_CATEGORY_LABELS[kudos.category]}
      </span>
    </header>
    <p className="kudos-card-message">{kudos.message}</p>
    <time className="kudos-card-time" dateTime={kudos.createdAt}>
      {formatCreatedAt(kudos.createdAt)}
    </time>
  </article>
)
