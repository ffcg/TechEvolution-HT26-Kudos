import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { colleagues } from '../infrastructure/colleagues'
import { CATEGORIES, canSendKudos, MAX_MESSAGE_LENGTH } from '../domain/kudos'
import type { Category } from '../domain/kudos'

interface KudosFormProps {
  onSend: (input: { from: string; to: string; message: string; category: Category }) => void
}

function KudosForm({ onSend }: KudosFormProps) {
  const [from, setFrom] = useState(colleagues[0]?.id ?? '')
  const [to, setTo] = useState(colleagues[1]?.id ?? colleagues[0]?.id ?? '')
  const [message, setMessage] = useState('')
  const [category, setCategory] = useState<Category>(CATEGORIES[0])

  // Self-kudos are disallowed, so "To" never offers whoever is "From".
  const recipientOptions = colleagues.filter((colleague) => colleague.id !== from)
  const canSend = canSendKudos(from, to, message)

  function handleFromChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextFrom = event.target.value
    setFrom(nextFrom)

    if (nextFrom === to) {
      const fallback = colleagues.find((colleague) => colleague.id !== nextFrom)
      if (fallback) setTo(fallback.id)
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!canSend) return

    onSend({ from, to, message, category })
    setMessage('')
  }

  return (
    <form className="card kudos-form" onSubmit={handleSubmit}>
      <h2>Send a kudos</h2>

      <div className="field-row">
        <label className="field">
          <span className="field-label">From</span>
          <select value={from} onChange={handleFromChange}>
            {colleagues.map((colleague) => (
              <option key={colleague.id} value={colleague.id}>
                {colleague.name}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="field-label">To</span>
          <select value={to} onChange={(event) => setTo(event.target.value)}>
            {recipientOptions.map((colleague) => (
              <option key={colleague.id} value={colleague.id}>
                {colleague.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="field">
        <span className="field-label">Category</span>
        <select value={category} onChange={(event) => setCategory(event.target.value as Category)}>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span className="field-label">Message</span>
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          maxLength={MAX_MESSAGE_LENGTH}
          placeholder="Say what they did and why it mattered..."
        />
        <span className="char-counter">
          {message.length}/{MAX_MESSAGE_LENGTH}
        </span>
      </label>

      <button type="submit" className="btn-primary" disabled={!canSend}>
        Send kudos
      </button>
    </form>
  )
}

export default KudosForm
