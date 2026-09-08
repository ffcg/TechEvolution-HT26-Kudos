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

- **Can `message` be empty? Whitespace only? Very long?** No empty or
  whitespace-only messages, and a 200 character cap — so people actually
  read them, while still leaving room to write a bit longer when the moment
  calls for it.
- **What does the feed show when it's empty?** A small call-to-action
  prompting people to post a kudos, to increase the chance people actually
  send kudos to each other.
- **Does anything survive a page refresh — and if so, how?** Yes — kudos
  persist to localStorage, because losing the feed on refresh or restart
  felt broken; kudos shouldn't disappear.
- **If a kudos references a colleague no longer in the list, what
  happens?** The kudos stays unchanged — deleting or hiding it would be the
  same as editing history, which breaks immutability. The UI falls back to
  an "Unknown colleague" label when the id can't be resolved.
- **Where does validation live, and is it in one place or several?** One
  place — a single domain-layer function, not the form. The rules (no empty
  message, max 200 chars) are product rules, not UI details; keeping them
  in one place means they can't be bypassed by any entry point and can be
  unit tested in isolation.
- **How do you keep things fast as the feed grows — recompute on every
  render, or keep a running total somewhere?** Neither — newest-first order
  is maintained by always prepending new kudos to the list, rather than
  sorting on render, for simplicity and so we can't forget to sort.

## Deliberately out of scope

Authentication. A backend. A database. Notifications. Editing a sent kudos.
Comment threads. Rich text. Image uploads. If you're building any of these,
you've drifted.

## Extra features

Built after the MVP, once it worked end to end. Not required — see
`docs/01-build.md`.

- **"Needs Kudos" section.** A section below the feed listing colleagues
  who haven't received a kudos in the last 7 days. A colleague who has
  never received one at all still counts — "never" is just the extreme
  case of "not in the last 7 days," not a separate category. Ordered
  longest-since-last-kudos first, so colleagues who've never received one
  sort at the very top.

## Decisions

Short entries as you build — not documentation, just the call and the
reason. Answers to "Still open" questions live under that section instead;
this is for other calls made along the way.

- We chose ___ because ___.
