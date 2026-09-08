import type { Kudos } from '../domain/kudos'
import type { Colleague } from '../infrastructure/colleagues'
import type { FeedSortMode } from '../domain/feedSort'
import { sortKudosForDisplay } from '../domain/feedSort'
import EmptyFeed from './EmptyFeed'
import KudosCard from './KudosCard'

interface KudosFeedProps {
  kudos: Kudos[]
  colleagues: Colleague[]
  sortMode: FeedSortMode
}

function KudosFeed({ kudos, colleagues, sortMode }: KudosFeedProps) {
  return (
    <section className="card kudos-feed">
      <h2>Feed</h2>
      {kudos.length === 0 ? (
        <EmptyFeed />
      ) : (
        <ul>
          {sortKudosForDisplay(kudos, colleagues, sortMode).map((item) => (
            <KudosCard key={item.id} kudos={item} />
          ))}
        </ul>
      )}
    </section>
  )
}

export default KudosFeed
