# .ai — shared context

These files describe the problem, not the solution. They exist so that you,
your team, the team you present to tomorrow, and every AI tool any of you
point at this codebase all start from the same understanding.

They are plain Markdown on purpose. No tool-specific format, no frontmatter, no
lock-in — Claude Code, Copilot, Cursor, Windsurf, a chat window with the file
pasted in, or a human reading them on a train all work equally well.

## What is here

| File | Read it when |
| --- | --- |
| `domain-model.md` | Before you write a single line. This is the entity everything hangs off. |
| `architecture.md` | When deciding where code goes and how state flows. |
| `conventions.md` | When naming things, structuring files, or writing commits. |
| `workflow.md` | Before each of the three sessions. Explains what each one is really testing. |

## How to use them with your AI tool

Most tools pick up context better when you point at it explicitly rather than
hoping it reads the repo. Something like:

> Read `.ai/domain-model.md` and `.ai/architecture.md` before you propose
> anything. Follow the conventions in `.ai/conventions.md`.

Some tools have a native way to always include context — a `CLAUDE.md`,
`.cursorrules`, `.github/copilot-instructions.md`, a project settings pane. If
yours does, make that file one line long and have it point here. Do not copy
the content: two copies drift apart within the hour, and then nobody knows
which one is true.

## Keep them alive

**These are living documents.** When you make a decision that contradicts what
is written here, change what is written here. An outdated context file is worse
than no context file, because it lies confidently to the next person and to
their AI tool.

That applies especially on Tuesday. Before you present, the first honest
question is: does `.ai/` still describe this code? When you get new requirements
in the afternoon, updating `.ai/` is part of implementing them, not paperwork
you do afterwards.
