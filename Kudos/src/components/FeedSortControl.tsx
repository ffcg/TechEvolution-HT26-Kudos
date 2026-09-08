import type { ChangeEvent } from 'react'
import type { FeedSortMode, RoleOf } from '../domain/feedSort'

interface FeedSortControlProps {
  sortMode: FeedSortMode
  onChange: (mode: FeedSortMode) => void
}

function FeedSortControl({ sortMode, onChange }: FeedSortControlProps) {
  function handleModeChange(event: ChangeEvent<HTMLSelectElement>) {
    if (event.target.value === 'newest') {
      onChange({ kind: 'newest' })
    } else {
      onChange({ kind: 'role', roleOf: 'to' })
    }
  }

  function handleRoleOfChange(event: ChangeEvent<HTMLSelectElement>) {
    onChange({ kind: 'role', roleOf: event.target.value as RoleOf })
  }

  return (
    <div>
      <label>
        Sort by
        <select value={sortMode.kind} onChange={handleModeChange}>
          <option value="newest">Newest</option>
          <option value="role">Role</option>
        </select>
      </label>

      {sortMode.kind === 'role' && (
        <label>
          Role of
          <select value={sortMode.roleOf} onChange={handleRoleOfChange}>
            <option value="to">Recipient</option>
            <option value="from">Sender</option>
          </select>
        </label>
      )}
    </div>
  )
}

export default FeedSortControl
