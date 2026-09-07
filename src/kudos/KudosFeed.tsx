import { KudosCard } from './KudosCard'
import type { Kudos } from './types'

interface KudosFeedProps {
  kudos: Kudos[]
}

export const KudosFeed = ({ kudos }: KudosFeedProps) => {
  if (kudos.length === 0) {
    return (
      <p className="kudos-feed-empty">
        Inga kudos ännu — bli först med att skicka en shoutout till en kollega!
      </p>
    )
  }

  return (
    <section className="kudos-feed" aria-label="Kudos-flöde">
      {kudos.map((item) => (
        <KudosCard key={item.id} kudos={item} />
      ))}
    </section>
  )
}
