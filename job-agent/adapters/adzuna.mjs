// Adzuna (India) — PHASE 2. Sanctioned public API.
// Needs a free key: https://developer.adzuna.com  → App ID + App Key.
// Put them in job-agent/.env (local) AND as GitHub repo secrets (cron):
//   ADZUNA_APP_ID, ADZUNA_APP_KEY
// Returns [] silently if the key is missing, so it's safe to leave enabled.
import { fetchJSON, stripHtml, log } from '../lib/util.mjs';

const QUERIES = [
  'product designer', 'furniture designer', 'industrial designer',
  'design engineer product', 'cmf designer'
];

export default async function fetchAdzuna(cfg) {
  const id = process.env.ADZUNA_APP_ID, key = process.env.ADZUNA_APP_KEY;
  if (!id || !key) { log('adzuna: no key set — skipping (add ADZUNA_APP_ID/KEY to enable Phase 2)'); return []; }

  const out = [];
  for (const what of QUERIES) {
    const url = `https://api.adzuna.com/v1/api/jobs/in/search/1`
      + `?app_id=${encodeURIComponent(id)}&app_key=${encodeURIComponent(key)}`
      + `&results_per_page=50&what=${encodeURIComponent(what)}`
      + `&content-type=application/json`;
    try {
      const data = await fetchJSON(url);
      for (const j of (data.results || [])) {
        out.push({
          source: 'adzuna',
          company: j.company?.display_name || '',
          role: j.title ? stripHtml(j.title) : '',
          location: j.location?.display_name || 'India',
          url: j.redirect_url || '',
          description: stripHtml(j.description || '').slice(0, 4000),
          posted: (j.created || '').slice(0, 10)
        });
      }
      log(`adzuna "${what}": ${data.results?.length || 0}`);
    } catch (e) { log(`adzuna "${what}": ERROR ${e.message}`); }
  }
  return out.filter(j => j.role && j.url);
}
