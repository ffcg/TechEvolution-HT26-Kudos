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

- ~~Can `message` be empty? Whitespace only? Very long?~~ Resolved — see Decisions.
- ~~What does the feed show when it's empty?~~ Resolved — see Decisions.
- ~~Does anything survive a page refresh — and if so, how?~~ Resolved — see Decisions.
- ~~If a kudos references a colleague no longer in the list, what happens?~~ Resolved — see Decisions.
- ~~Where does validation live, and is it in one place or several?~~ Resolved — see Decisions.
- ~~How do you keep things fast as the feed grows — recompute on every render,
  or keep a running total somewhere?~~ Resolved — see Decisions.

## Deliberately out of scope

Authentication. A backend. A database. Notifications. Editing a sent kudos.
Comment threads. Rich text. Image uploads. If you're building any of these,
you've drifted.

## Decisions

Short entries as you build — not documentation, just the call and the reason:

- We chose ___ because ___.
- We chose to cap `message` at 200 characters so people actually read them, while still leaving room to write a bit longer when the moment calls for it.
- We chose to show a small call-to-action prompting people to post a kudos when the feed is empty, to increase the chance people actually send kudos to each other.
- We chose to persist kudos to localStorage because losing the feed on refresh or restart felt broken — kudos shouldn't disappear.
- We chose to keep a kudos unchanged even if a colleague it references is later removed from the list — deleting or hiding it would be the same as editing history, which breaks immutability. The UI falls back to an "Unknown colleague" label when the id can't be resolved.
- We chose to put validation in a single domain-layer function rather than in the form, because the rules (no empty message, max 200 chars) are product rules, not UI details — keeping them in one place means they can't be bypassed by any entry point and can be unit tested in isolation.
- We chose to maintain newest-first order by always prepending new kudos to the list, rather than sorting on render, for simplicity and so we can't forget to sort.
