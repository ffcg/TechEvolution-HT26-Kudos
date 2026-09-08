# Conventions

Point your AI tool at this file when naming things, structuring files, or
writing commits — not required reading upfront.

## Naming

- Use the domain words from `.ai/domain-model.md`: a `Kudos` is a Kudos, not
  a `Message`, `Post`, `Item` or `Entry`.
- Keep the domain vocabulary in English even if you discuss it in Swedish.
- Booleans read as questions: `isAnonymous`, `canSend`, `hasReacted`.
- Functions that compute say so: `getTopReceivers`, `countReactions`.

## Files

- One component per file, named after the component.
- No file over ~200 lines. If one grows past that, it is doing two jobs.

## Commits

Small, and in the imperative: `add category filter to feed`,
`show self-kudos in the feed`. You'll be walking another team through this
history tomorrow — a wall of `wip`, `fix`, `asdf` tells them nothing.

Commit whenever something works. Don't save it all for one commit at 16:29.

## Comments

Comment the **why**, never the what. `// sorted descending so newest is
first` is noise. `// self-kudos allowed on purpose — see domain-model.md` is
gold.

## Testing

- **Vitest**, colocated: `foo.ts` is tested by `foo.test.ts` next to it, not
  in a separate `__tests__` tree. Colocation means the test is visible right
  next to the file in the tree, moves with it on a rename, and makes it
  obvious at a glance which files have no test — a mirrored `__tests__`
  structure hides all three.
- **Unit test the domain layer** (`src/domain/`) and anything at a system
  boundary (`src/infrastructure/`, e.g. localStorage). Skip component and
  hook tests for now — the logic that matters is already covered by testing
  the pure functions underneath it, and UI behaviour is checked by hand in
  the browser as you build.
- **Mock only what crosses a system boundary.** `localStorage` is mocked in
  `kudosStorage.test.ts`; domain functions take plain data in and out, so
  they need no mocking at all.
- Name tests by what they verify, not by method name: `rejects a
  whitespace-only message`, not `test isValidMessage`.
- `npm test` runs the suite once; `npm run test:watch` reruns on change.

## Working with the brief

`.ai/domain-model.md` is your requirements. Build what it says — if you
disagree with something in it, that is a conversation to have, not a
decision to make silently.

## AI-generated code

Same bar as anything else. If you cannot explain a line, it does not go in —
because tomorrow somebody will point at it and ask.
