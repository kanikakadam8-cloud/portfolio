// run-all — the one-shot daily pipeline.
// profile → source (new only) → score → packets (top matches) → digest → tracker.
import { buildProfile } from './profile-parse.mjs';
import { sourceFetch } from './source-fetch.mjs';
import { scoreAll } from './job-score.mjs';
import { buildPackets } from './packet-build.mjs';
import { writeDigest } from './digest.mjs';
import { writeDashboard } from './dashboard.mjs';
import { log, parseCSV, readText, p } from '../lib/util.mjs';

async function main() {
  log('── run start', new Date().toISOString(), '──');
  const profile = buildProfile();
  const fresh = await sourceFetch();
  // score the FULL known list (not just today's new) so the digest is always useful
  const allJobs = parseCSV(readText(p('data', 'jobs.csv')));
  const scored = scoreAll(allJobs, profile);
  const packets = buildPackets(scored, profile, { min: 5, limit: 12 });
  writeDigest(scored, packets, fresh.length);
  writeDashboard(scored, packets, fresh.length);

  const top = scored.slice(0, 10);
  log(`── done · ${scored.length} ranked · ${fresh.length} new · ${packets.length} packets · top:`);
  top.forEach(j => log(`   ${j.score}/10 [${j.band}] ${j.company || '—'} — ${j.role}`));
  if (!fresh.length) log('   (no new roles — paste some into inbox/paste-here.md and re-run)');
}
main().catch(e => { console.error('[job-agent] FATAL', e); process.exit(1); });
