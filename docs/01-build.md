# Session 1 — Build

**Monday 14:30–16:30 · in pairs**

Build a Kudos Wall. Read `.ai/domain-model.md` first — the entity is the whole
app.

## MVP (everyone builds this)

1. **Send a kudos.** A form with: pick a recipient from the mock colleague list,
   write a message, choose a category. Sending clears the form. The recipient
   list includes the current user — self-kudos are part of the product, see
   `.ai/domain-model.md`.
2. **See the feed.** All kudos, newest first, each showing who sent it, who got
   it, the message, the category and when.

That is it. If both work and you can demo them, you have passed the MVP bar.

## Extra feature — pick exactly one

Choose one. Not two. **Coordinate with the other pairs so you all pick something
different** — tomorrow you inherit each other's code, and it is much more
interesting if it does something yours did not.

- **Reactions.** A 👏 counter on each kudos. Clicking adds one. Keep it simple —
  a single number on the kudos, no need to track who clapped. It is applause,
  not a vote.
- **Filtering.** Filter the feed by recipient, sender, or category.
- **Leaderboard.** Who has received the most kudos. Read it off the
  `kudosReceived` totals rather than counting the feed — see
  `.ai/architecture.md`.
- **Something you thought of.** Clear it with a facilitator first — the bar is
  that it fits in the time and touches the data model.

## Setting up

The repo is empty by design. Pick your stack, scaffold it into `src/`, and add
the run instructions to the README. Use `data/colleagues.json` for the colleague
list — it is the same for every pair, which makes tomorrow's comparisons fair.

## Done means

- [ ] It runs from a clean clone, following your own README
- [ ] MVP works: you can send a kudos and see it in the feed
- [ ] Your one extra feature works
- [ ] `.ai/` still describes the code you actually wrote
- [ ] The README says what stack you chose and how to start it
- [ ] The product rules in `domain-model.md` are implemented as written
- [ ] The open questions in `domain-model.md` have answers you can defend
- [ ] Committed and pushed

## Two hours goes fast

Get the MVP working end to end before you make anything look good. A working ugly
feed beats a beautiful form that does not submit. You can always spend the last
twenty minutes on polish; you cannot spend the last twenty minutes on the feed.
