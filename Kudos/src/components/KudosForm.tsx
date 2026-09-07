import { useState } from 'react'
import type { FormEvent } from 'react'
import { colleagues } from '../infrastructure/colleagues'
import { CATEGORIES, isValidMessage, MAX_MESSAGE_LENGTH } from '../domain/kudos'
import type { Category } from '../domain/kudos'

interface KudosFormProps {
  onSend: (input: { from: string; to: string; message: string; category: Category }) => void
}

function KudosForm({ onSend }: KudosFormProps) {
  const [from, setFrom] = useState(colleagues[0]?.id ?? '')
  const [to, setTo] = useState(colleagues[0]?.id ?? '')
  const [message, setMessage] = useState('')
  const [category, setCategory] = useState<Category>(CATEGORIES[0])

  const canSend = isValidMessage(message)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!canSend) return

    onSend({ from, to, message, category })
    setMessage('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        From
        <select value={from} onChange={(event) => setFrom(event.target.value)}>
          {colleagues.map((colleague) => (
            <option key={colleague.id} value={colleague.id}>
              {colleague.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        To
        <select value={to} onChange={(event) => setTo(event.target.value)}>
          {colleagues.map((colleague) => (
            <option key={colleague.id} value={colleague.id}>
              {colleague.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Category
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value as Category)}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>

      <label>
        Message
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          maxLength={MAX_MESSAGE_LENGTH}
        />
      </label>

      <button type="submit" disabled={!canSend}>
        Send kudos
      </button>
    </form>
  )
}

export default KudosForm
