import type { Colleague } from '../infrastructure/colleagues'
import type { Kudos } from '../domain/kudos'
import { getColleaguesNeedingKudos, NEEDS_KUDOS_THRESHOLD_DAYS } from '../domain/needsKudos'

interface NeedsKudosSectionProps {
  colleagues: Colleague[]
  kudos: Kudos[]
}

function NeedsKudosSection({ colleagues, kudos }: NeedsKudosSectionProps) {
  const statuses = getColleaguesNeedingKudos(colleagues, kudos)

  return (
    <section className="card needs-kudos">
      <h2>Needs Kudos</h2>
      {statuses.length === 0 ? (
        <p className="empty-feed">Everyone has received a kudos in the last {NEEDS_KUDOS_THRESHOLD_DAYS} days.</p>
      ) : (
        <ul>
          {statuses.map(({ colleague, lastReceivedAt, daysSinceLastKudos }) => (
            <li key={colleague.id} className="needs-kudos-row">
              <span>
                <strong>{colleague.name}</strong> <span className="role-tag">{colleague.role}</span>
              </span>
              <span className="kudos-card-time">
                {lastReceivedAt
                  ? `last kudos ${Math.floor(daysSinceLastKudos)} day${Math.floor(daysSinceLastKudos) === 1 ? '' : 's'} ago`
                  : 'never received a kudos'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default NeedsKudosSection
