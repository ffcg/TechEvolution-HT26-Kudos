import { useKudosStore } from './state/useKudosStore'
import KudosForm from './components/KudosForm'
import KudosFeed from './components/KudosFeed'

function App() {
  const { kudos, addKudos } = useKudosStore()

  return (
    <main>
      <h1>Evolution Lab — Kudos Wall</h1>
      <KudosForm onSend={addKudos} />
      <KudosFeed kudos={kudos} />
    </main>
  )
}

export default App
