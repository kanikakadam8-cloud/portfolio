# Setup — Phase 2 (Adzuna) + the private Job Dashboard

Two things went live: an automated **India job source (Adzuna)** so you stop copy-pasting,
and a **private web dashboard** at a hidden URL with a passcode.

---

## A. The Dashboard (already built — nothing to install)

**URL:** `https://kanikakadam.vercel.app/jobs`
**Passcode:** `KANIABHI`

- Hidden: `noindex`, blocked in `robots.txt`, not in the sitemap, not linked anywhere.
- It reads the day's ranked jobs, lets you **search / filter (on-target ≥7, hide UI-UX drift, by source)**,
  and each card has an **Apply ↗** button and a **Packet** link.
- It always shows the latest run — no redeploy needed (it fetches the data from the
  `job-agent-data` branch live).

> ⚠️ Honest note: the passcode is a light gate, not real security — the underlying job list
> is technically fetchable if someone knows the exact data URL. It only holds job *listings*
> (public info) + scores. Your cover drafts stay in the packet folders, not on the dashboard.
> If you ever want true privacy, move `/job-agent` to a **private** repo and I'll switch the
> dashboard to a password-protected host — just ask.

**First time:** it shows "No data yet" until one workflow run has produced data (do step B4 or
just run the daily workflow once).

---

## B. Phase 2 — Adzuna (YOUR STEPS)

This is what only you can do (it needs your own free key).

**B1. Get a free Adzuna key (2 min)**
1. Go to **https://developer.adzuna.com** → **Sign up** (free).
2. After verifying, open your dashboard there → you'll see an **Application ID** and
   **Application Key**. Copy both.

**B2. Add them as GitHub repo secrets (so the daily cron can use them)**
1. Go to: `https://github.com/kanikakadam8-cloud/portfolio/settings/secrets/actions`
2. **New repository secret** → Name: `ADZUNA_APP_ID` → Value: *(your App ID)* → Add.
3. **New repository secret** again → Name: `ADZUNA_APP_KEY` → Value: *(your App Key)* → Add.

**B3. (Optional) Run it on your own computer too**
Create a file `job-agent/.env` (it's gitignored, never uploaded):
```
ADZUNA_APP_ID=your_id_here
ADZUNA_APP_KEY=your_key_here
```
Then locally: `node job-agent/scripts/run-all.mjs`

**B4. Trigger a run**
GitHub → **Actions → job-agent daily → Run workflow**. Done — Adzuna India roles now flow in
automatically every morning, no pasting.

---

## What I already did (MY END)

- ✅ Built the Adzuna adapter (`adapters/adzuna.mjs`) — queries India for *product designer,
  furniture designer, industrial designer, design engineer, CMF designer*. It's **enabled but
  safely no-ops until your keys exist**, so nothing breaks in the meantime.
- ✅ Built the dashboard (`/jobs.html`) with the passcode gate and live data fetch.
- ✅ Added a `jobs.json` generator to the pipeline + wired the workflow to publish it.
- ✅ Config: `noindex` + `robots.txt` block + CSP allowance for the data fetch; kept it out of the sitemap.
- ✅ The manual paste-in inbox still works exactly as before — belt and braces.

## Ongoing
Once Adzuna is on, your loop shrinks to: **open `/jobs` each morning → filter to on-target ≥7 →
open a packet → tell me "upgrade the packet for &lt;company&gt;" → apply.** No GitHub browsing,
no copy-paste.
