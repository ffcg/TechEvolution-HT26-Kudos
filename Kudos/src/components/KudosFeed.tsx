import { Fragment } from 'react'
import type { Kudos } from '../domain/kudos'
import type { Colleague } from '../infrastructure/colleagues'
import { resolveColleagueRole } from '../infrastructure/colleagues'
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
  const sortedKudos = sortKudosForDisplay(kudos, colleagues, sortMode)
  const groupByRole = sortMode.kind === 'role'
  let previousRole: string | null = null

  return (
    <section className="card kudos-feed">
      <h2>Feed</h2>
      {kudos.length === 0 ? (
        <EmptyFeed />
      ) : (
        <ul>
          {sortedKudos.map((item) => {
            const role = resolveColleagueRole(item.to)
            const startsNewGroup = groupByRole && role !== previousRole
            previousRole = role

            return (
              <Fragment key={item.id}>
                {startsNewGroup && (
                  <li className="role-heading">
                    <h3>{role}</h3>
                  </li>
                )}
                <KudosCard kudos={item} />
              </Fragment>
            )
          })}
        </ul>
      )}
    </section>
  )
}

export default KudosFeed
