# Rules

Working agreements for this project, on top of `conventions.md` and
`domain-model.md`. These apply to how we work, not what the app does.

- **Do as little as possible, stay within scope.** Build exactly what was
  asked, nothing more. If a change would expand scope beyond what was
  asked, stop and ask first — don't decide it silently.
- **Verify in the browser before calling anything done.** Not "should
  work" — actually run the golden path and the edge cases in the running
  app.
- **Never run git commands that change repo state** (commit, push, add,
  etc). Give the exact command instead, and let the person run it.
- **Keep commits small and scoped to one thing.** Don't mix unrelated
  changes into the same commit.
- **Flag new external dependencies before adding them** — even small ones,
  like a font link — so it's a decision, not a surprise.
- **If something in `domain-model.md` looks wrong or incomplete, say so
  out loud.** Don't quietly work around it.
