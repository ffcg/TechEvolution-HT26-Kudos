# Session 2 — Explain

**Tuesday 10:00–12:00 · repos swap**

You have another pair's repo. They have yours. Your job is to understand their
code well enough to explain it back to them.

## How the session runs

1. **Clone and run it (15 min).** If it does not start, that is a finding —
   note it, then ask them.
2. **Read it (45 min).** Their `.ai/` files, their commit history, then the code.
   Their commits tell you the order they thought in, which is usually faster
   than reading the final state cold.
3. **Prepare (20 min).** Assemble your walkthrough.
4. **Present (rest).** You explain their app to them, with them in the room.

## What you must be able to answer

**The data model**

- What does a Kudos look like in this codebase? Why those fields?
- Where do categories live and how are they constrained?
- What is stored versus computed on the fly?

**The flow**

- Trace one kudos from clicking "send" to appearing in the feed. Every hop.
- Where does state live? What happens on refresh?
- Where is validation, and is it in one place or several?

**Their extra feature**

- What did they build, and how does it work?
- If it is a leaderboard: how is it computed? What happens on a tie?
- If it is reactions: where is the count kept, and can it get out of sync?
- If it is filtering: does it filter the data or hide the DOM?

**The brief versus the code**

- Where did they follow `.ai/` exactly? Where did they deviate, and did they say
  so anywhere?
- Did their AI tool push back on anything in the brief? Is there a trace of that
  in the code or the commits?
- What does an empty message do? What does the app look like with zero kudos?
  With two hundred?
- Pick one rule in `.ai/domain-model.md` and ask: **why is it that way?** Not
  what it does — why. See how far the answer goes.

That last question is the interesting one. Some of what is in this codebase was
decided by the pair. Some of it was handed to them. Being able to tell the two
apart, in code you did not write, is most of the skill.

## How to give feedback

You are explaining, not reviewing. Describe what the code does and why you think
it does it that way. When something surprised you, say that it surprised you —
"I expected the validation to be in the form and it was in the store" is useful.
"This is wrong" is not, and it is usually not true.

The pair listening: hold your defence until the end. Watching someone else read
your code is the most honest feedback you will get all year.

## Take notes

You will be working in this codebase after lunch.
