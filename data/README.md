# data

Mock data for the lab. Every team uses the same list, so the apps stay
comparable across the room.

## colleagues.json

Ten fictional colleagues. Each has an `id`, a `name` and a `role`.

`id` is the stable reference — a Kudos stores `from` and `to` as colleague ids,
never as names. Names change, ids do not, and storing the name means every
kudos carries a stale copy of it.

There is no user account model here and there does not need to be one. "The
current user" is whichever colleague is selected in your UI.

If you build a leaderboard, add a `kudosReceived` number to each colleague and
keep it up to date as kudos are sent — see `.ai/architecture.md`.

Add or edit entries if you like, but keep the shape.
