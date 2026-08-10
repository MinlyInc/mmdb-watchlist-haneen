# mmdb-watchlist

A tiny library for keeping a list of films you mean to watch. No framework, no database, no server. Four functions and their tests.

It exists so you can practise the pull request cycle on something small enough to read in full.

## Getting started

```bash
npm install
npm test
```

## The API

| Function | What it does |
|---|---|
| `add(list, item)` | Puts a film on the list. Adding one that is already there is ignored. |
| `remove(list, id)` | Takes a film off. Removing one that is not there is harmless. |
| `markWatched(list, id)` | Marks a film watched. |
| `unwatched(list)` | The films still to watch, best rated first. |
| `stats(list)` | A summary: how many, how long, and the average rating. |

Every function returns a **new** list rather than changing the one you passed in.

## Scripts

| | |
|---|---|
| `npm test` | Run the tests once |
| `npm run test:watch` | Run them on every save |
| `npm run typecheck` | Check types without building |
| `npm run format:check` | Check formatting |
| `npm run format` | Fix formatting |

CI runs the last three on every pull request.
