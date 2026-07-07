// packet-build — for each top match, write a review-ready packet folder.
// Deterministic (no LLM, zero-signup). When you review in Claude Code, ask me
// to "upgrade the packets" and I'll rewrite bullets + cover with real tailoring.
import { readJSON, writeText, p, slug, today, log } from '../lib/util.mjs';

const VOCAB = [
  'product design', 'furniture', 'industrial design', 'cmf', 'material', 'craft', 'woodwork',
  'prototyping', 'model making', 'fusion 360', 'solidworks', 'rhino', 'keyshot', 'sketchup',
  'illustrator', 'photoshop', 'cnc', 'laser', '3d printing', 'lathe', 'rendering', 'sketching',
  'packaging', 'concept', 'design research', 'user research', 'sustainability', 'manufacturing'
];
const jdKeywords = (text) => { const t = text.toLowerCase(); return VOCAB.filter(k => t.includes(k)); };

export function buildPacket(job, profile) {
  const rel = `packets/${slug(job.company || 'company')}-${slug(job.role)}`;
  const jd = jdKeywords(`${job.role} ${job.description}`);
  const haveKw = jd.filter(k => (profile.keywords || []).some(pk => pk.includes(k) || k.includes(pk)));
  const missKw = jd.filter(k => !haveKw.includes(k));
  const gapSoftware = (profile.softwareGaps || []).map(g => g.toLowerCase()).filter(g => jd.includes(g));

  const before = jd.length ? Math.round(100 * haveKw.length / jd.length) : 0;
  const truthfulAdds = missKw.filter(k => !gapSoftware.includes(k)).length;
  const after = jd.length ? Math.round(100 * Math.min(jd.length, haveKw.length + truthfulAdds) / jd.length) : 0;

  const ranked = (profile.projects || []).map(pr => {
    const blob = `${pr.title} ${pr.category} ${pr.accomplishment}`.toLowerCase();
    return { ...pr, overlap: jd.filter(k => blob.includes(k)).length };
  }).sort((a, b) => b.overlap - a.overlap).slice(0, 4);

  writeText(p(rel, '00-SUMMARY.md'),
`# ${job.role} — ${job.company || 'Unknown company'}
**Fit ${job.score}/10 · ${job.band}** · source: ${job.source} · found ${today()}
${job.location ? `Location: ${job.location}` : ''}

Why: ${job.rationale}
${job.flags?.length ? `\nFlags:\n${job.flags.map(f => `- ${f}`).join('\n')}` : ''}

Apply link: ${job.url || '(paste from source)'}

> DO NOT auto-apply. Review these files, then submit yourself.
`);

  writeText(p(rel, '01-resume-bullets.md'),
`# Tailored résumé bullets — ${job.company}
Real accomplishments only (no fabrication). Weave in the JD's own words where truthful.

${ranked.map(pr => `- **${pr.title}** — ${pr.accomplishment}`).join('\n') || '- (no projects parsed)'}

### JD language to mirror (only where genuinely true)
${(haveKw.length ? haveKw : jd).map(k => `- ${k}`).join('\n') || '- (none detected)'}

> Ask me in Claude Code to "upgrade this packet" and I'll rewrite these into
> role-specific bullets that mirror the JD without inventing anything.
`);

  writeText(p(rel, '02-ats-note.md'),
`# ATS keyword match — ${job.company}
- **Before: ~${before}%** of this JD's keywords already appear in your profile.
- **After: ~${after}%** if you add the truthful missing ones below.

## Present in your profile
${haveKw.map(k => `- ${k}`).join('\n') || '- (none)'}

## Missing (add ONLY if true)
${missKw.map(k => `- ${k}${gapSoftware.includes(k) ? '  ⚠️ software gap — see enhancement note' : ''}`).join('\n') || '- (none)'}

## Keyword-stuffing warning
Do not list a tool you can't use. ${gapSoftware.length
  ? `This role expects: **${gapSoftware.join(', ')}** — which your résumé does not list. Address it honestly (see enhancement note), don't fake it.`
  : 'No obvious gap-software demands detected.'}
`);

  const gapLine = gapSoftware.length
    ? `\n## ⚠️ Software gap for THIS role\nThe JD expects **${gapSoftware.join(', ')}**. You show Fusion 360 + Adobe. Options: (a) note transferable CAD (Fusion → ${gapSoftware[0]}) + an upskilling line, (b) do a 1–2 day crash tutorial and add one small render/model to the portfolio before applying, (c) skip if it's a hard requirement.\n`
    : '';

  writeText(p(rel, '03-enhancement-note.md'),
`# Profile re-enhancement for ${job.company} — ${job.role}

## Reframe for this role
- Lead with the most relevant projects: ${ranked.slice(0, 2).map(r => r.title).join(', ') || '—'}.
- Mirror this JD's framing: ${(job.matched?.onTarget || []).join(', ') || jd.slice(0, 3).join(', ') || '—'}.
${gapLine}
## Portfolio nudge
- Surface your ${(profile.makingSkills || []).slice(0, 3).join(', ')} work up top — it's your differentiator vs. software-only "product designers".
- If this leans CMF/material, foreground the material & craft projects.

> Guidance, not fabrication. Update the résumé/portfolio, then re-run.
`);

  writeText(p(rel, '04-cover-note.md'),
`# Cover note (draft) — ${job.company}

Hi ${job.company || 'team'},

I'm Kanika Kadam, a product & furniture designer (BDes, Somaiya School of Design, 2026),
available full-time from July 2026 and based in Mumbai. I design by making — ${(profile.makingSkills || []).slice(0, 3).join(', ')} —
and your ${job.role} role stood out because ${(job.matched?.onTarget || jd).slice(0, 2).join(' and ') || 'it fits my focus on physical product & furniture design'}.

A quick highlight: ${ranked[0]?.accomplishment || 'my capstone foldable study table and curved-table furniture work.'}

I'd love to bring this hands-on, material-first practice to your team.

— Kanika · kanikakadam.vercel.app

> Draft. Ask me to "upgrade this packet" for a tailored version before you send.
`);

  writeText(p(rel, 'link.txt'), (job.url || '') + '\n');
  log(`packet: ${rel.split('/').pop()} (${job.score}/10)`);
  return rel;
}

export function buildPackets(scored, profile, { min = 5, limit = 12 } = {}) {
  const picks = scored.filter(j => j.score >= min).slice(0, limit);
  return picks.map(j => buildPacket(j, profile)); // return the packet rel paths
}
