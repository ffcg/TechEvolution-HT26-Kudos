import type { Kudos } from '../domain/kudos'
import EmptyFeed from './EmptyFeed'
import KudosCard from './KudosCard'

interface KudosFeedProps {
  kudos: Kudos[]
}

function KudosFeed({ kudos }: KudosFeedProps) {
  if (kudos.length === 0) {
    return <EmptyFeed />
  }

  return (
    <ul>
      {kudos.map((item) => (
        <KudosCard key={item.id} kudos={item} />
      ))}
    </ul>
  )
}

export default KudosFeed
