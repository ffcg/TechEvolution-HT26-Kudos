import type { ChangeEvent } from 'react'
import type { FeedSortMode } from '../domain/feedSort'

interface FeedSortControlProps {
  sortMode: FeedSortMode
  onChange: (mode: FeedSortMode) => void
}

function FeedSortControl({ sortMode, onChange }: FeedSortControlProps) {
  function handleModeChange(event: ChangeEvent<HTMLSelectElement>) {
    onChange(event.target.value === 'newest' ? { kind: 'newest' } : { kind: 'role' })
  }

  return (
    <div className="feed-sort-control">
      <label className="field field-inline">
        <span className="field-label">Sort by</span>
        <select value={sortMode.kind} onChange={handleModeChange}>
          <option value="newest">Newest</option>
          <option value="role">Recipient's role</option>
        </select>
      </label>
    </div>
  )
}

export default FeedSortControl
