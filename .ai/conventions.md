# Conventions

Deliberately thin. These exist so that a stranger can read your repo in ten
minutes tomorrow morning, not to impose a house style.

## Naming

- Use the domain words from `domain-model.md`: a `Kudos` is a Kudos, not a
  `Message`, `Post`, `Item` or `Entry`. If the code and the docs use different
  words for the same thing, you will spend Tuesday translating.
- Keep the domain vocabulary in English even if you discuss it in Swedish.
- Booleans read as questions: `isAnonymous`, `canSend`, `hasReacted`.
- Functions that compute say so: `getTopReceivers`, `countReactions`.

## Files

- One component per file, named after the component.
- No file over ~200 lines. If one grows past that, it is doing two jobs.

## Commits

Small, and in the imperative: `add category filter to feed`,
`show self-kudos in the feed`. You'll be walking another team through this
history tomorrow — a wall of `wip`, `fix`, `asdf` tells them nothing and it
will show in the Explain session.

Commit whenever something works. Do not save it all for one commit at 16:29.

## Comments

Comment the **why**, never the what. `// sorted descending so newest is first`
is noise. `// self-kudos allowed on purpose — see domain-model.md` is gold, and
it is the exact kind of thing you will be asked about tomorrow.

## Working with the brief

`.ai/` is your requirements. It is what the customer asked for, written down.
Build what it says — if you disagree with something in it, that is a
conversation to have, not a decision to make silently at 15:40.

Your AI tool has opinions about how things should be built. Sometimes strong
ones. When a tool's suggestion conflicts with the brief, the brief wins for
today's build. Make a note of where that happened; it is worth talking about.

## AI-generated code

Same bar as anything else. If you cannot explain a line, it does not go in —
because on Tuesday morning somebody will point at it and ask. Reading what your
tool produced before you accept it is the cheapest possible insurance.
