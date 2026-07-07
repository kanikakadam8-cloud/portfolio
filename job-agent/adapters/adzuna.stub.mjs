// ── PHASE 2 STUB — Adzuna (India) ──────────────────────────────────────────
// Do NOT enable yet. When you're ready for real automated India coverage:
//   1. Get a free key: https://developer.adzuna.com  (App ID + App Key)
//   2. Put them in job-agent/.env  (already gitignored):
//        ADZUNA_APP_ID=xxxx
//        ADZUNA_APP_KEY=xxxx
//      (and add the same as GitHub Actions repo secrets for the cron)
//   3. Set "enabled": true for the adzuna source in config/sources.json
//   4. Implement the fetch below and delete the throw.
//
// Endpoint (country code 'in' = India):
//   https://api.adzuna.com/v1/api/jobs/in/search/1
//     ?app_id=ID&app_key=KEY&results_per_page=50
//     &what=product%20designer&where=mumbai&category=design-jobs
//
// Return the SAME normalized shape every adapter returns:
//   { source, company, role, location, url, description, posted }
import { fetchJSON, stripHtml, log } from '../lib/util.mjs';

export default async function fetchAdzuna(cfg) {
  const id = process.env.ADZUNA_APP_ID, key = process.env.ADZUNA_APP_KEY;
  if (!id || !key) { log('adzuna: no key set — skipping (Phase 2)'); return []; }

  // Reference implementation (uncomment to use once keys exist):
  // const queries = ['product designer', 'furniture designer', 'industrial designer'];
  // const out = [];
  // for (const what of queries) {
  //   const url = `https://api.adzuna.com/v1/api/jobs/in/search/1`
  //     + `?app_id=${id}&app_key=${key}&results_per_page=50`
  //     + `&what=${encodeURIComponent(what)}&category=design-jobs`;
  //   const data = await fetchJSON(url);
  //   for (const j of (data.results || [])) out.push({
  //     source: 'adzuna', company: j.company?.display_name || '', role: j.title || '',
  //     location: j.location?.display_name || 'India', url: j.redirect_url || '',
  //     description: stripHtml(j.description || '').slice(0, 4000),
  //     posted: (j.created || '').slice(0, 10)
  //   });
  // }
  // return out;

  return [];
}
