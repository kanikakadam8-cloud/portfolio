# Adapters — how sourcing works

Every adapter is a small ES module with a **default async function** that returns an
array of jobs in ONE normalized shape:

```js
{ source, company, role, location, url, description, posted } // posted = "YYYY-MM-DD"
```

The pipeline (`scripts/source-fetch.mjs`) loads only the adapters whose source is
`"enabled": true` in `config/sources.json`, calls each, then dedupes + normalizes
into `data/jobs.csv`. This is the "clean adapter interface" — adding a source is
drop-in and needs **no changes to scoring or packet-building**.

## Current adapters
| File | Type | Notes |
|---|---|---|
| `remotive.mjs` | api | Public JSON API, no key. Remote/design. |
| `weworkremotely.mjs` | rss | Robots-allowed Design RSS feed. Checks robots.txt at runtime. |
| `manual.mjs` | manual | Reads `inbox/paste-here.md` — the workhorse for physical/India roles. |
| `adzuna.mjs` | api | **Phase 2.** Needs a free key. Reference impl included. |

## Adding a new adapter (Phase 2/3)
1. Create `adapters/<id>.mjs` exporting `default async function(cfg) { ... }`.
2. Return the normalized shape above.
3. If it **scrapes HTML**, call `robotsAllowed(url)` from `../lib/util.mjs` first and
   bail if it returns false. If it's an official **API/feed**, that's already sanctioned.
4. Add an entry to `config/sources.json` with `"adapter": "<id>.mjs"` and `"enabled": true`.

Never add a scraper for a source whose robots.txt disallows generic bots
(e.g. Coroflot) or whose ToS forbids scraping (LinkedIn, Indeed, Internshala) —
those stay `manual` (paste-in) or wait for sanctioned MCP/OAuth access (Phase 3).
