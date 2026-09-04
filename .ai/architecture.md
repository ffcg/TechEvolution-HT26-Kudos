# Architecture

## The shape of it

```
  [ Send form ]                [ Feed ]
        |                         ^
        |  add(kudos)             |  read(kudos[])
        v                         |
   +---------------------------------+
   |        kudos store (state)      |
   +---------------------------------+
                    |
                    v
        [ persistence: none | localStorage ]
```

One source of truth for the kudos themselves: a list. The form appends to it,
the feed reads it.

## Decisions already made

**No backend.** State lives in memory. If you want it to survive a refresh, use
`localStorage` — that is the ceiling, not a stepping stone toward a server.

**Stack is yours.** Any language, any framework, any styling approach, or none.
The lab is about how you reason and how you hand over, not about which router you
picked. Scaffold into `src/` and note what you chose in the README — you'll
want the reminder tomorrow.

**Validation lives in the form.** That is where the user is, that is where the
error message has to appear, and that is where you already have every field in
hand. Keep the store dumb: it takes a kudos and stores it. A store that
second-guesses its callers is a store you have to fight later.

**Totals are kept, not counted.** Walking the whole feed to work out how many
kudos someone has received is O(n) every time anything renders, and the feed only
grows. Keep a `kudosReceived` number on each colleague and increment it when a
kudos is sent. Same principle for reaction counts: the number lives on the kudos
and goes up when someone clicks.

## Suggested structure inside src/

A sketch, not a rule. Adapt it to whatever your framework expects.

```
src/
  domain/       the Kudos type, categories
  state/        the store: read, add, and whatever else you need
  components/   form, feed, kudos card, plus your extra feature
  data/         loading the mock colleague list
```

## Where the pain will be

Predicting this is half the value of writing an architecture doc.

- **Prop drilling.** The current user, the colleague list and the kudos list are
  all needed several levels down. Decide early how they get there.
- **Re-render churn.** The feed grows; every append re-renders all of it unless
  you key the list properly.
- **Naming drift.** Half the code says `kudo`, half says `kudos`, one file says
  `shoutout`. Pick one and enforce it.
- **The current user as an implicit assumption.** Hardcode it and every feature
  about "me" breaks.
