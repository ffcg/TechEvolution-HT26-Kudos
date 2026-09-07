import { useState } from 'react'
import type { FormEvent } from 'react'
import { colleagues } from './colleagues'
import { KUDOS_CATEGORY_LABELS } from './labels'
import { KUDOS_MESSAGE_MAX_LENGTH } from './validation'
import { KudosCategory } from './types'
import type { NewKudos } from './useKudos'
import type { Kudos, Result } from './types'

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!to) {
      setError('Välj en mottagare.')
      return
    }

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
