import { useState } from 'react'
import { colleagues } from './kudos/colleagues'
import { KudosFeed } from './kudos/KudosFeed'
import { KudosForm } from './kudos/KudosForm'
import { useKudos } from './kudos/useKudos'

function App() {
  const { kudos, addKudos } = useKudos()
  // No auth on purpose — "the current user" is whoever is selected here,
  // see .ai/domain-model.md.
  const [currentUserId, setCurrentUserId] = useState(colleagues[0].id)

  return (
    <main className="app">
      <header className="app-header">
        <h1>Kudos Wall</h1>
        <label className="current-user">
          Du är
          <select
            value={currentUserId}
            onChange={(event) => setCurrentUserId(event.target.value)}
          >
            {colleagues.map((colleague) => (
              <option key={colleague.id} value={colleague.id}>
                {colleague.name}
              </option>
            ))}
          </select>
        </label>
      </header>
      <KudosForm currentUserId={currentUserId} onSend={addKudos} />
      <KudosFeed kudos={kudos} />
    </main>
  )
}

export default App
