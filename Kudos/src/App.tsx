import { useKudosStore } from './state/useKudosStore'
import { colleagues } from './infrastructure/colleagues'
import KudosForm from './components/KudosForm'
import KudosFeed from './components/KudosFeed'
import NeedsKudosSection from './components/NeedsKudosSection'

function App() {
  const { kudos, addKudos } = useKudosStore()

  return (
    <main>
      <h1>Evolution Lab — Kudos Wall</h1>
      <KudosForm onSend={addKudos} />
      <KudosFeed kudos={kudos} />
      <NeedsKudosSection colleagues={colleagues} kudos={kudos} />
    </main>
  )
}

export default App
