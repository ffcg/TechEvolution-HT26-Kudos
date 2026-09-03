# Evolution Lab — Kudos Wall

A two-day lab for Tech Evo. You build a small app, you hand it over, you inherit
someone else's, and then you change it under pressure. Same as real consulting,
compressed into a day and a half.

**The case:** a Kudos Wall. People send short shoutouts to colleagues — "thanks
for staying late with the deploy", "great pairing session". One entity, one
screen, no backend.

## Getting started

```
git clone <repo-url>
cd evolution-lab-kudos
```

This repo is deliberately empty. There is no framework, no build tool and no
starter code — you and your pair decide the stack and scaffold it into `src/`.
What you get instead is a shared understanding of the problem, written down in
`.ai/` and `docs/`.

Read these two first:

1. `docs/01-build.md` — what Monday's session asks of you
2. `.ai/domain-model.md` — what a Kudos actually is

## The schedule

| When | Session | What happens |
| --- | --- | --- |
| Monday 14:30–16:30 | **Build** | You and your pair build the MVP, plus one extra feature you pick yourselves |
| Tuesday 10:00–12:00 | **Explain** | You inherit another pair's code and explain it back to them |
| Tuesday 13:00–14:30 | **Improve** | New requirements arrive in a sealed envelope. You implement them in the code you inherited |

Last 10 minutes of Tuesday: everyone sends a real kudos to someone in the room,
using the app they built. That is the actual demo.

## Ground rules

- **Use your AI tools.** All of them, however you like. That is the point of the
  lab, not a shortcut around it.
- **You own what you ship.** On Tuesday you have to explain code you did not
  write. On Tuesday afternoon someone has to explain yours. Write accordingly.
- **Commit often, with real messages.** The person inheriting your repo reads
  your history before they read your code.
- **`.ai/` is the brief.** Treat it the way you would treat a customer's
  requirements: read it, build what it says, and raise anything you disagree
  with out loud rather than quietly working around it.
- **Keep the scope small.** One entity. Two hours. Ship something that works
  over something that is half-finished but clever.

## Repo layout

```
.ai/          Context files for you and your AI tools. Read first, keep updated.
docs/         One file per session — what you are asked to do and how you are assessed.
data/         Mock data. The colleague list lives here so every pair has the same names.
src/          Your application. Empty on purpose.
```
