import type { Kudos } from '../domain/kudos'
import { resolveColleagueName, resolveColleagueRole } from '../infrastructure/colleagues'

interface KudosCardProps {
  kudos: Kudos
}

function KudosCard({ kudos }: KudosCardProps) {
  const senderName = resolveColleagueName(kudos.from)
  const recipientName = resolveColleagueName(kudos.to)
  const recipientRole = resolveColleagueRole(kudos.to)
  const sentAt = new Date(kudos.createdAt).toLocaleString()

  return (
    <li className="kudos-card">
      <p className="kudos-card-people">
        <strong>{senderName}</strong> <span aria-hidden="true">&rarr;</span> <strong>{recipientName}</strong>{' '}
        <span className="role-tag">{recipientRole}</span>
      </p>
      <p className="kudos-card-message">{kudos.message}</p>
      <p className="kudos-card-meta">
        <span className="category-badge">{kudos.category}</span>
        <span className="kudos-card-time">{sentAt}</span>
      </p>
    </li>
  )
}

export default KudosCard
