import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { colleagues } from '../utils/colleagues'
import { KUDOS_CATEGORY_LABELS, KUDOS_MESSAGE_MAX_LENGTH } from '../constants'
import { KudosCategory } from '../types'
import type { Kudos, NewKudos, Result } from '../types'

interface KudosFormProps {
  currentUserId: string
  onSend: (input: NewKudos) => Result<Kudos>
}

export const KudosForm = ({ currentUserId, onSend }: KudosFormProps) => {
  const [to, setTo] = useState('')
  const [message, setMessage] = useState('')
  const [category, setCategory] = useState<KudosCategory>(
    KudosCategory.TEAMWORK,
  )
  const [error, setError] = useState('')

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    const result = onSend({ from: currentUserId, to, message, category })
    if (!result.ok) {
      setError(result.error.message)
      return
    }

    setTo('')
    setMessage('')
    setCategory(KudosCategory.TEAMWORK)
    setError('')
  }

  return (
    <form className="kudos-form" onSubmit={handleSubmit}>
      <label>
        Till
        <select value={to} onChange={(event) => setTo(event.target.value)}>
          <option value="">Välj kollega…</option>
          {colleagues.map((colleague) => (
            <option key={colleague.id} value={colleague.id}>
              {colleague.name}
              {colleague.id === currentUserId ? ' (du)' : ''}
            </option>
          ))}
        </select>
      </label>
      <label>
        Meddelande
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          maxLength={KUDOS_MESSAGE_MAX_LENGTH}
          rows={3}
          placeholder="Vad vill du lyfta fram?"
        />
      </label>
      <label>
        Kategori
        <select
          value={category}
          onChange={(event) =>
            setCategory(event.target.value as KudosCategory)
          }
        >
          {Object.values(KudosCategory).map((value) => (
            <option key={value} value={value}>
              {KUDOS_CATEGORY_LABELS[value]}
            </option>
          ))}
        </select>
      </label>
      {error && (
        <p className="kudos-form-error" role="alert">
          {error}
        </p>
      )}
      <button type="submit">Skicka kudos</button>
    </form>
  )
}
