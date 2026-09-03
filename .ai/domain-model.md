# Domain model

The whole app is one entity. Everything else — the feed, the filters, the
leaderboard, the reactions — is a view over a list of these.

## Kudos

A Kudos is a short, public, positive message from one colleague to another,
tagged with a category.

| Field | Meaning | Notes |
| --- | --- | --- |
| `id` | Unique identifier | Generate it, do not derive it from content |
| `from` | Who sent it | A colleague id, see `data/colleagues.json` |
| `to` | Who receives it | A colleague id |
| `message` | The actual shoutout | Short. Decide a max length and enforce it |
| `category` | What kind of praise this is | One of a fixed set, see below |
| `createdAt` | When it was sent | Display string, see below |

Illustrative shape — translate it into whatever your stack uses:

```
Kudos {
  id:        string
  from:      string   // colleague id
  to:        string   // colleague id
  message:   string
  category:  Category
  createdAt: string   // "2 Sep 14:32"
}
```

**On `createdAt`:** store it as the string you want to show on the card. The feed
is the hottest path in the app and re-formatting a date on every card on every
render is wasted work. Format once, when the kudos is created, and the feed just
prints it.

## Categories

Start with these. They are deliberately values-shaped rather than generic —
swap them for your own team's values if you would rather.

- `TEAMWORK` — made the team better, not just the ticket
- `EXTRA_MILE` — went beyond what anyone asked for
- `MENTORSHIP` — made someone else more capable
- `CRAFT` — quality of the work itself
- `CUSTOMER_IMPACT` — the client felt the difference

A category is a closed set, not free text. That matters: it is what makes
filtering and grouping possible later without string-matching on user input.

## People

Colleagues are **mock data**, not an entity you manage. There is no sign-up, no
login and no profile. `data/colleagues.json` holds the list, every pair uses the
same one, and "the current user" is whoever is selected in the UI.

Do not build user management. It is not the exercise, and it will eat your two
hours.

## Product rules

These come from the brief. Build them as specified.

**Self-kudos are a feature, not a bug.** People — junior colleagues especially —
under-report their own wins. The wall lets you post a kudos to yourself, and it
appears in the feed like any other. Do not block it, and do not treat it as a
special case.

**A kudos is immutable once sent.** No editing. Whatever else you build, sending
is a one-way door.

**The feed is newest first.** Always.

**No limit on how many kudos one person can send.** Generosity is the point.

## Still open — decide and write your answer down

- Can `message` be empty? Whitespace only? Two thousand characters?
- What does the feed show when it is empty?
- Does anything survive a page refresh, or is it gone?
- If a kudos references a colleague who is no longer in the list, what then?

There is no single right answer to any of these. There is a wrong answer, which
is "we never thought about it" — because tomorrow morning somebody is going to
ask you.

## Deliberately out of scope

Authentication. A backend. A database. Notifications. Editing a sent kudos.
Comment threads. Rich text. Image uploads. If you find yourself building any of
these, you have drifted.
