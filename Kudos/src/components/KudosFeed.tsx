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
  if (kudos.length === 0) {
    return <EmptyFeed />
  }

  const sortedKudos = sortKudosForDisplay(kudos, colleagues, sortMode)

  return (
    <ul>
      {sortedKudos.map((item) => (
        <KudosCard key={item.id} kudos={item} />
      ))}
    </ul>
  )
}

export default KudosFeed
