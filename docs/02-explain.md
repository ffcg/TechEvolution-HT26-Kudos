# Session 2 — Explain

**Tuesday 10:00–12:00 · in your Build group · paired with another team**

You keep your own repo. Your facilitator pairs you with another team. You
walk them through your app; they walk you through theirs.

## How the session runs

1. **Revisit your own repo (20 min).** Your `.ai/` files, your commit history,
   your code — with a few hours' distance. Does `.ai/` still describe what you
   actually built? Fix it now if not.
2. **Prepare (15 min).** Split the four topics below across the group, one
   person per topic minimum.
3. **Present (20 min: ~15 to present, ~5 for questions).** Walk the other team
   through your app. They ask, you answer.
4. **Swap roles.** The other team presents, you ask.

## What you must be able to answer

**The data model**

- What does a Kudos look like in this codebase? Why those fields?
- Where do categories live and how are they constrained?
- What is stored versus computed on the fly?

**The flow**

- Trace one kudos from clicking "send" to appearing in the feed. Every hop.
- Where does state live? What happens on refresh?
- Where is validation, and is it in one place or several?

**Your extra feature**

- What did you build, and how does it work?
- If it is a leaderboard: how is it computed? What happens on a tie?
- If it is reactions: where is the count kept, and can it get out of sync?
- If it is filtering: does it filter the data or hide the DOM?

**The brief versus the code**

- Where did you follow `.ai/` exactly? Where did you deviate, and did you say
  so anywhere?
- Did your AI tool push back on anything in the brief? Is there a trace of that
  in the code or the commits?
- What does an empty message do? What does the app look like with zero kudos?
  With two hundred?
- Pick one rule in `.ai/domain-model.md` and ask: **why is it that way?** Not
  what it does — why. See how far the answer goes.
- Find your answers to the "still open" questions from `domain-model.md`. Would
  you decide differently now, with a few hours' distance? Why or why not?

That last question is the interesting one. Some of what is in this codebase was
a decision your group made. Some of it just happened because nobody thought
about it. Being able to tell the two apart, in your own code, is most of the
skill.

## How to give feedback

You're the audience for the other team's decisions, not their reviewer. When
something surprises you, say that it surprised you — "I expected the
validation to be in the form and it's in the store" is useful. "This is
wrong" is not, and it is usually not true.

The team presenting: hold your defence until questions are done. Explaining
your own choices out loud, to people who did not make them with you, is the
most honest feedback you will get all year.

## Take notes

You will be working in this codebase after lunch.
