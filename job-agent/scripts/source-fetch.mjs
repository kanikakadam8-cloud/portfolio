// source-fetch — run enabled adapters, normalize, dedupe, append to data/jobs.csv.
// Returns ONLY the jobs newly seen this run.
import { readJSON, writeJSON, readText, writeText, p, hashId, toCSV, parseCSV, today, log } from '../lib/util.mjs';

const COLS = ['id', 'source', 'company', 'role', 'location', 'url', 'posted', 'first_seen', 'description'];

export async function sourceFetch() {
  const { sources } = readJSON(p('config', 'sources.json'), { sources: [] });
  const enabled = sources.filter(s => s.enabled && s.adapter);
  const seen = readJSON(p('data', 'seen.json'), { ids: {} });
  const existing = parseCSV(readText(p('data', 'jobs.csv')));
  const known = new Set(existing.map(j => j.id));

  const collected = [];
  for (const src of enabled) {
    try {
      const mod = await import(`../adapters/${src.adapter}`);
      const jobs = await mod.default(src);
      log(`${src.id}: ${jobs.length} listings`);
      collected.push(...jobs);
    } catch (e) { log(`${src.id}: ERROR ${e.message}`); }
  }

  const fresh = [];
  for (const j of collected) {
    const id = hashId(`${j.url || ''}|${j.company}|${j.role}`);
    if (known.has(id) || seen.ids[id]) continue;
    known.add(id);
    const row = { id, first_seen: today(), ...j };
    fresh.push(row);
    seen.ids[id] = today();
  }

  if (fresh.length) {
    const all = existing.concat(fresh.map(r => Object.fromEntries(COLS.map(c => [c, r[c] ?? '']))));
    writeText(p('data', 'jobs.csv'), toCSV(all, COLS));
    writeJSON(p('data', 'seen.json'), seen);
  }
  log(`new this run: ${fresh.length}`);
  return fresh;
}

if (process.argv[1]?.endsWith('source-fetch.mjs')) sourceFetch();
