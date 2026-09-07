import type { Kudos } from '../domain/kudos'
import { resolveColleagueName } from '../infrastructure/colleagues'

interface KudosCardProps {
  kudos: Kudos
}

function KudosCard({ kudos }: KudosCardProps) {
  const senderName = resolveColleagueName(kudos.from)
  const recipientName = resolveColleagueName(kudos.to)
  const sentAt = new Date(kudos.createdAt).toLocaleString()

  return (
    <li>
      <p>
        <strong>{senderName}</strong> &rarr; <strong>{recipientName}</strong>
      </p>
      <p>{kudos.message}</p>
      <p>
        {kudos.category} &middot; {sentAt}
      </p>
    </li>
  )
}

export default KudosCard
