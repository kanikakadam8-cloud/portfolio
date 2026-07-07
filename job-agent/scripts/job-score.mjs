// job-score — score a job 1–10 against the rubric in config/scoring.json.
import { readJSON, p, log } from '../lib/util.mjs';

const has = (text, list) => list.filter(k => text.includes(k));

export function scoreJob(job, profile, cfg) {
  const text = `${job.role} ${job.description} ${job.location}`.toLowerCase();
  const title = ` ${job.role.toLowerCase()} `;
  const flags = [];

  // ── Discipline (gatekeeper, 0–4) — title-weighted, needs a real signal ──
  const d = cfg.discipline;
  const strongInTitle = has(title, d.strong).length;
  const strongAnywhere = has(text, d.strong);
  const onTarget = has(text, d.onTarget);
  const adjacent = has(text, d.adjacent), aiAdj = has(text, d.aiAdjacent), mismatch = has(text, d.mismatch);
  const generic = has(text, d.generic);
  const anyDesignWord = /\bdesign(er|ers|ing|)\b/.test(text);
  let disc;
  if (strongInTitle) disc = 4;                                   // "Furniture Designer" in the title
  else if (strongAnywhere.length || onTarget.length) disc = 3;   // on-target, just not in the title
  else if ((adjacent.length || aiAdj.length) && !mismatch.length) disc = 3;
  else if (adjacent.length || aiAdj.length) disc = 2;
  else if (mismatch.length) { disc = 1; flags.push('likely mismatch (UI/UX or software design)'); }
  else if (generic.length && anyDesignWord) disc = 1;           // only generic words → weak
  else { disc = 0; flags.push('not a physical-design role'); }
  if (aiAdj.length) flags.push('design-adjacent AI');
  const onTargetForRationale = strongAnywhere.concat(onTarget);

  // ── Seniority (0–2), full-time-only mode ──
  const s = cfg.seniority;
  const isJunior = has(text, s.junior).length, isIntern = has(text, s.internship).length,
        isSenior = has(text, s.senior).length;
  let sen;
  if (isSenior && !isJunior) { sen = 0; flags.push('stretch (senior/3+ yr)'); }
  else if (isIntern && !isJunior) { sen = 0; flags.push('internship (out of scope — full-time only)'); }
  else if (isJunior) sen = 2;
  else sen = 1; // unspecified

  // ── Skills overlap (0–2) ──
  const sk = cfg.skills;
  const haveHits = has(text, sk.have), gapHits = has(text, sk.gap);
  const skills = haveHits.length >= 3 ? 2 : haveHits.length ? 1 : 0;
  if (gapHits.length) flags.push(`requires software you don't list: ${gapHits.join(', ')}`);

  // ── Practical fit (0–2) — India-focused (+ India-remote) ──
  const pr = cfg.practical;
  const reloc = has(text, pr.relocation), blocked = has(text, pr.blocked);
  const indiaHit = /\b(mumbai|india|bengaluru|bangalore|pune|delhi|gurgaon|noida|hyderabad|chennai|kolkata|ahmedabad)\b/.test(text);
  const remoteHit = /\b(remote|hybrid|work from home)\b/.test(text);
  let prac;
  if (blocked.length) { prac = 0; flags.push(`geo-blocked: ${blocked.join(', ')}`); }
  else if (indiaHit) prac = 2;
  else if (remoteHit) { prac = 1; flags.push('remote — confirm India-eligible'); }
  else if (reloc.length) { prac = 1; flags.push('relocation required'); }
  else { prac = 1; flags.push('location unclear'); }
  if (/immediate joiner|join immediately|immediate start/.test(text)) {
    prac = Math.max(0, prac - 1); flags.push('immediate-joiner (you graduate 2026)');
  }

  const score = disc + sen + skills + prac;

  // discipline-drift warning: scores decently ONLY because it's software design
  if (disc <= 1 && mismatch.length && (sen + skills + prac) >= 5)
    flags.push('DISCIPLINE DRIFT — high only via UI/UX, likely wrong career');

  const band = score >= cfg.bands.applyToday ? 'apply today'
    : score >= cfg.bands.apply ? 'apply'
    : score >= cfg.bands.tailor ? 'tailor heavily'
    : score >= cfg.bands.reach ? 'reach only' : 'skip';

  const rationale = `disc ${disc}/4, sen ${sen}/2, skills ${skills}/2, practical ${prac}/2`
    + (onTargetForRationale.length ? ` · on-target: ${onTargetForRationale.slice(0, 2).join(', ')}` : '')
    + (flags.length ? ` · ${flags[0]}` : '');

  return { score, band, disc, sen, skills, prac, flags, rationale,
    matched: { onTarget: onTargetForRationale, adjacent: adjacent.concat(aiAdj), haveHits, gapHits } };
}

export function scoreAll(jobs, profile) {
  const cfg = readJSON(p('config', 'scoring.json'));
  return jobs.map(j => ({ ...j, ...scoreJob(j, profile, cfg) }))
    .sort((a, b) => b.score - a.score);
}

if (process.argv[1]?.endsWith('job-score.mjs')) {
  const { parseCSV, readText } = await import('../lib/util.mjs');
  const profile = readJSON(p('data', 'profile.json'), {});
  const jobs = parseCSV(readText(p('data', 'jobs.csv')));
  for (const j of scoreAll(jobs, profile).slice(0, 10))
    log(`${j.score}/10 [${j.band}] ${j.company} — ${j.role} :: ${j.rationale}`);
}
