// digest — write digests/{date}.md (ranked) and update data/applications.csv.
import { readText, writeText, parseCSV, toCSV, p, today, slug, log } from '../lib/util.mjs';

const APP_COLS = ['job_id', 'company', 'role', 'source', 'fit_score', 'discipline_flag', 'status', 'date_found', 'apply_link'];

export function writeDigest(scored, packetRels = [], freshCount = null) {
  const date = today();
  const packetSet = new Set(packetRels);
  const ranked = [...scored].sort((a, b) => b.score - a.score);
  const top = ranked.slice(0, 15);

  const line = (j) => {
    const rel = `packets/${slug(j.company || 'company')}-${slug(j.role)}`;
    const hasPacket = packetSet.has(rel);
    const drift = j.flags?.some(f => /drift|mismatch/i.test(f)) ? ' ⚠️' : '';
    return `| ${j.score}/10 | ${j.band} | ${j.company || '—'} | ${j.role}${drift} | ${j.location || '—'} | ${j.source} | ${hasPacket ? `[packet](../${rel}/00-SUMMARY.md)` : '—'} | ${j.url ? `[apply](${j.url})` : '—'} |`;
  };

  const md =
`# Job digest — ${date}

**${scored.length}** roles ranked${freshCount != null ? ` · **${freshCount}** new this run` : ''} · **${packetRels.length}** packets.
Physical product / furniture / industrial design & design-adjacent AI, full-time, India-focused.
Nothing here is applied — review the packets and submit manually.

| Fit | Band | Company | Role | Location | Source | Packet | Apply |
|----:|------|---------|------|----------|--------|--------|-------|
${top.map(line).join('\n') || '| — | — | (no new roles) | | | | | |'}

${ranked.some(j => j.flags?.some(f => /drift|mismatch/i.test(f)))
  ? `\n> ⚠️ = discipline-drift / likely UI-UX mismatch — high score but probably the wrong career. Don't let the search drift there.\n` : ''}
### Reminder: also check these manually (robots-blocked / gated)
Coroflot · Behance · Internshala · Wellfound — and your studio watchlist
(\`data/studio-watchlist.txt\`). Paste anything good into \`inbox/paste-here.md\` and re-run.
`;
  writeText(p('digests', `${date}.md`), md);

  // ── tracker ──
  const existing = parseCSV(readText(p('data', 'applications.csv')));
  const byId = new Map(existing.map(r => [r.job_id, r]));
  for (const j of scored) {
    const rel = `packets/${slug(j.company || 'company')}-${slug(j.role)}`;
    const row = {
      job_id: j.id, company: j.company, role: j.role, source: j.source,
      fit_score: j.score, discipline_flag: (j.flags || []).join('; '),
      status: packetSet.has(rel) ? 'packet-ready' : 'found',
      date_found: j.first_seen || today(), apply_link: j.url || ''
    };
    if (!byId.has(j.id)) byId.set(j.id, row);
  }
  writeText(p('data', 'applications.csv'), toCSV([...byId.values()], APP_COLS));
  log(`digest: digests/${date}.md · tracker: ${byId.size} rows`);
  return p('digests', `${date}.md`);
}
