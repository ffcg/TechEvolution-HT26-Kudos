# Domain model

Required reading before you write a line of code — see `docs/01-build.md`.

Living document. When you decide something — especially answers to "Still
open" below — write it here. An outdated file lies to the next reader and to
their AI tool.

## The entity

The whole app is one entity. A Kudos is a short, public, positive message
from one colleague to another, tagged with a category.

| Field | Meaning | Notes |
| --- | --- | --- |
| `id` | Unique identifier | Generate it, don't derive it from content |
| `from` | Who sent it | A colleague id, see `data/colleagues.json` |
| `to` | Who receives it | A colleague id |
| `message` | The shoutout | Short — decide a max length and enforce it |
| `category` | What kind of praise | One of a fixed set, see below |
| `createdAt` | When it was sent | Store and display however you decide |

## Categories

A closed set, not free text:

- `TEAMWORK` — made the team better, not just the ticket
- `EXTRA_MILE` — went beyond what anyone asked for
- `MENTORSHIP` — made someone else more capable
- `CRAFT` — quality of the work itself
- `CUSTOMER_IMPACT` — the client felt the difference

## People

Mock data only — `data/colleagues.json`, same list for every team. No
sign-up, no login, no profile. "The current user" is whoever is selected in
the UI. Don't build user management.

## Product rules

From the brief. Build them as specified.

- **Self-kudos are a feature, not a bug.** People under-report their own
  wins. Posting a kudos to yourself is allowed, and it appears like any other. No need to bring this up, the developers are aware of it.
- **A kudos is immutable once sent.** No editing.
- **The feed is newest first.** Always.
- **No limit on how many kudos one person can send.**

## Still open — yours to decide

There's no single right answer to any of these. There is a wrong answer:
"we never thought about it." Write your answer and reason here as you settle
each one, or log it under Decisions below.

- Can `message` be empty? Whitespace only? Very long?
  — **No.** 1–280 characters, trimmed before validation and storage.
- What does the feed show when it's empty?
  — **A prompt** encouraging you to post the first kudos to a colleague.
- Does anything survive a page refresh — and if so, how?
  — **Yes, via localStorage.** Losing the feed on refresh felt broken.
- If a kudos references a colleague no longer in the list, what happens?
  — **The kudos stays**, shown with "Tidigare kollega" as fallback name.
- Where does validation live, and is it in one place or several?
  — **One place:** a function in the domain layer (`src/domain/validation.ts`),
  used by both the form and the store.
- How do you keep things fast as the feed grows — recompute on every render,
  or keep a running total somewhere?
  — **Recompute on every render.** At localStorage scale (hundreds of kudos)
  a running total is premature optimization and a second copy of the truth
  that can drift. The store keeps the list newest-first at insert, so the
  feed never sorts per render. If derived data ever gets noticeable
  (e.g. a leaderboard), `useMemo` over the list — still derived, no
  architecture change.

## Deliberately out of scope

Authentication. A backend. A database. Notifications. Editing a sent kudos.
Comment threads. Rich text. Image uploads. If you're building any of these,
you've drifted.

## Decisions

Short entries as you build — not documentation, just the call and the reason:

- We chose to limit `message` to 1–280 trimmed characters because a kudos is
  a shoutout, not an essay — and an empty or whitespace-only one says nothing.
- We chose localStorage persistence because losing the feed on refresh felt
  broken.
- We chose to keep kudos for removed colleagues (fallback name "Tidigare
  kollega") because kudos are immutable — the feed should not change just
  because the mock list did.
- We chose a Swedish UI (labels, error messages) while code, comments and
  domain vocabulary stay English, per .ai/conventions.md.
- We chose to put validation in one domain-layer function used by both the
  form and the store, so the rule cannot be bypassed and lives in one place.
