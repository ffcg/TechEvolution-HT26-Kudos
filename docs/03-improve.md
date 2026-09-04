# Session 3 — Improve

**Tuesday 13:00–14:30 · in your own code**

You're back in the app you built and explained this morning. Your facilitator
hands out an envelope with new requirements — you do not get to see them in
advance, and different groups may get different ones.

Ninety minutes. Real conditions: a deadline that does not move, and
requirements from someone who was not in the room when you made your original
calls — including some of your own, from yesterday.

## Before anyone touches the code (10 min, no exceptions)

Open the envelope as a group.

1. Read the requirement out loud, in full, once.
2. Name anything ambiguous, or anything that conflicts with what's already in
   the code (check against `.ai/domain-model.md`).
3. Agree on one interpretation and where it belongs in the code. Write the
   interpretation down — it's what you update `.ai/` with later.

## How to work

**Find the one place in the code where the requirement belongs**, using the
interpretation you just agreed on. You spent the morning building a map of this
codebase — use it.

**Change the domain rule, not the symptom.** If the requirement is a rule about
kudos, it belongs where the rules live, not in the click handler that happened to
be nearest.

**Commit per requirement**, with a message that says what you did.

**Update `.ai/` as you go.** If your change contradicts what is written there,
fix the file in the same commit. Leaving it stale is how a codebase starts
lying.

**If something in the envelope is ambiguous, decide and write it down.** Do not
stall waiting for clarification. Real requirements are ambiguous and shipping
with a stated assumption beats shipping nothing.

## If you get stuck

Ask the team you were paired with this morning — they've now heard your app
explained once and may spot something you're too close to see. Or ask a
facilitator.

## Done means

- [ ] The requirements from the envelope are implemented
- [ ] Nothing that worked this morning is broken now
- [ ] `.ai/` matches the code
- [ ] Commits explain what changed and why
- [ ] You can say, in one sentence, what the requirement actually meant and
      why you read it that way
- [ ] Pushed

## The last ten minutes

We use the app. For real. Everyone sends a genuine kudos to someone in the room,
through the thing you built.

Two days ago this was an exercise. Make it something you would actually want to
keep using.
