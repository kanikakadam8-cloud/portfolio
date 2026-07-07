# job-agent

A self-scheduling **finder / scorer / packet-builder** for Kanika Kadam's job search —
physical **product, furniture, industrial** design & design-adjacent AI roles, **full-time,
India-focused, junior/fresher**. It finds open roles, scores them, and prepares
review-ready application packets.

**It never applies to anything.** It only finds, scores, and drafts. You review and submit
every application yourself.

> Fully isolated: everything lives in `/job-agent`. It never imports into the website,
> never affects the Vercel build/deploy. The daily automation writes to a separate git
> branch (`job-agent-data`), so your live site is never redeployed by it.

## What runs, in one shot
`profile → source (new only) → score → packets (top matches) → digest → tracker`, skipping
anything already seen.

## Run it manually (any time)
```bash
node job-agent/scripts/run-all.mjs
```
Outputs:
- `job-agent/digests/<date>.md` — today's ranked roles (open this first)
- `job-agent/packets/<company>-<role>/` — a folder per top match (résumé bullets, ATS note,
  re-enhancement note, cover draft, apply link)
- `job-agent/data/applications.csv` — the tracker

Refresh the parsed profile after editing the résumé:
```bash
node job-agent/scripts/profile-parse.mjs --force
```

## The daily schedule (GitHub Actions)
`.github/workflows/job-agent.yml` runs every day at **03:00 UTC (08:30 IST)** and on demand
from the repo's **Actions** tab. To enable:
1. Push this repo to GitHub (already your remote).
2. GitHub → **Settings → Actions → General →** allow workflows, and set **Workflow
   permissions = Read and write**.
3. It'll run on schedule; trigger a first run from **Actions → job-agent daily → Run workflow**.

Results land on the **`job-agent-data`** branch — pull it to read digests:
```bash
git fetch origin job-agent-data && git checkout job-agent-data
```
`main` (your deploy) is never modified by the cron.

## Sources & ToS (respected)
- **Automated (robots-clean):** We Work Remotely (Design RSS), Remotive (public API).
  Both are remote/software-leaning, so on-target physical-design hits are sparse — that's expected.
- **Manual paste-in** (`inbox/paste-here.md`) is the Phase-1 workhorse for physical + India roles.
  Coroflot (robots disallows bots), Behance, Internshala, Wellfound → check by hand, paste in.
- **Tier-C studios** (`data/studio-watchlist.txt`) — check these career pages each run.

Every scraper checks `robots.txt` at runtime and skips disallowed paths. LinkedIn/Indeed are
never scraped (Phase 3, sanctioned access only). See `config/sources.json` for status per source.

## Scoring (1–10)
Discipline **4** (gatekeeper; UI/UX flagged as "likely mismatch"), Seniority **2**
(full-time junior = in-band; internships/senior penalized), Skills overlap **2**,
Practical fit **2** (India/remote-India good). Bands: 9–10 apply today · 7–8 apply ·
5–6 tailor heavily · 3–4 reach · 0–2 skip. A **discipline-drift** flag fires when a role
only scores well because it's software design. Edit weights/keywords in `config/scoring.json`.

## Getting real tailoring on a packet
The daily/manual run produces deterministic packet scaffolds (zero-signup). For genuinely
tailored bullets + cover, open the digest in Claude Code and say **"upgrade the packet for
&lt;company&gt;"** — I'll rewrite them from your profile + the JD (no fabrication), using your
existing session. No API key needed.

## Phases
- **Phase 1 (built):** zero-signup sources + scorer + packets + digest + daily schedule.
- **Phase 2 (stubbed):** structured job APIs behind the same pipeline — **Adzuna (India)** first.
  See `adapters/adzuna.stub.mjs` and `adapters/README.md`. Keys go in `.env` (gitignored) +
  GitHub repo secrets.
- **Phase 3 (roadmap):** Indeed / LinkedIn via sanctioned **MCP/OAuth only — never scraping**
  (ToS + account-flag risk; that's why it's last).

## Layout
```
config/   scoring.json  sources.json
data/     profile.json  jobs.csv  applications.csv  seen.json  studio-watchlist.txt
inbox/    paste-here.md            adapters/  remotive  weworkremotely  manual  adzuna.stub
scripts/  profile-parse  source-fetch  job-score  packet-build  digest  run-all
packets/  <company>-<role>/        digests/  <date>.md          lib/ util.mjs
```
