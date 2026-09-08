import { useState } from 'react'
import { useKudosStore } from './state/useKudosStore'
import { colleagues } from './infrastructure/colleagues'
import { DEFAULT_FEED_SORT_MODE } from './domain/feedSort'
import type { FeedSortMode } from './domain/feedSort'
import KudosForm from './components/KudosForm'
import KudosFeed from './components/KudosFeed'
import FeedSortControl from './components/FeedSortControl'
import NeedsKudosSection from './components/NeedsKudosSection'

function App() {
  const { kudos, addKudos } = useKudosStore()
  const [sortMode, setSortMode] = useState<FeedSortMode>(DEFAULT_FEED_SORT_MODE)

  return (
    <>
      <header className="app-header">
        <h1>Kudos Wall</h1>
        <p>Short, public shoutouts between colleagues.</p>
      </header>
      <main className="app-content">
        <KudosForm onSend={addKudos} />
        <FeedSortControl sortMode={sortMode} onChange={setSortMode} />
        <KudosFeed kudos={kudos} colleagues={colleagues} sortMode={sortMode} />
        <NeedsKudosSection colleagues={colleagues} kudos={kudos} />
      </main>
    </>
  )
}

export default App
