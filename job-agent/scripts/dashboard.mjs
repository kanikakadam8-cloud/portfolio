// dashboard — write job-agent/dashboard/jobs.json (consumed by /jobs.html).
import { writeJSON, p, slug, today } from '../lib/util.mjs';

export function writeDashboard(scored, packetRels = [], freshCount = null) {
  const packetSet = new Set(packetRels);
  const ranked = [...scored].sort((a, b) => b.score - a.score);
  const jobs = ranked.map(j => {
    const rel = `packets/${slug(j.company || 'company')}-${slug(j.role)}`;
    return {
      id: j.id, company: j.company || '', role: j.role || '',
      location: j.location || '', source: j.source || '',
      score: j.score, band: j.band, disc: j.disc,
      flags: j.flags || [], rationale: j.rationale || '',
      url: j.url || '', posted: j.posted || j.first_seen || '',
      packet: packetSet.has(rel) ? rel : ''
    };
  });
  writeJSON(p('dashboard', 'jobs.json'), {
    generated: new Date().toISOString(),
    date: today(),
    repo: 'kanikakadam8-cloud/portfolio',
    dataBranch: 'job-agent-data',
    counts: {
      ranked: jobs.length,
      new: freshCount,
      packets: packetRels.length,
      onTarget: jobs.filter(j => j.score >= 7).length
    },
    jobs
  });
}
