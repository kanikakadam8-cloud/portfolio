// Remotive — sanctioned public JSON API (no key). Remote-heavy, design category.
import { fetchJSON, stripHtml, log } from '../lib/util.mjs';

export default async function fetchRemotive(cfg) {
  const url = cfg.url || 'https://remotive.com/api/remote-jobs?category=design&limit=50';
  let data;
  try { data = await fetchJSON(url); }
  catch (e) { log('remotive: fetch failed —', e.message); return []; }
  const jobs = data.jobs || [];
  return jobs.map(j => ({
    source: 'remotive',
    company: j.company_name || '',
    role: j.title || '',
    location: j.candidate_required_location || 'Remote',
    url: j.url || '',
    description: stripHtml(j.description || '').slice(0, 4000),
    posted: (j.publication_date || '').slice(0, 10)
  })).filter(j => j.role && j.url);
}
