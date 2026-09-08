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
    <section>
      <h2>Needs Kudos</h2>
      {statuses.length === 0 ? (
        <p>Everyone has received a kudos in the last {NEEDS_KUDOS_THRESHOLD_DAYS} days.</p>
      ) : (
        <ul>
          {statuses.map(({ colleague, lastReceivedAt }) => (
            <li key={colleague.id}>
              <strong>{colleague.name}</strong> ({colleague.role}) &mdash;{' '}
              {lastReceivedAt
                ? `last kudos ${new Date(lastReceivedAt).toLocaleDateString()}`
                : 'never received a kudos'}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default NeedsKudosSection
