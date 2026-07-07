// Manual paste-in — the Phase-1 workhorse. Read inbox/paste-here.md.
// Format: blocks separated by a line of "---". Each block:
//   ### Company — Role         (or "Company | Role")
//   url: https://...
//   location: Mumbai
//   <everything else = description>
import { readText, p, stripHtml } from '../lib/util.mjs';

export default async function fetchManual() {
  const raw = readText(p('inbox', 'paste-here.md'));
  // take everything AFTER the LAST start-marker (prose may mention the marker earlier)
  const parts = raw.split(/<!--\s*BEGIN-JOBS\s*-->/i);
  const body = parts.length > 1 ? parts[parts.length - 1] : raw;
  const blocks = body.split(/^\s*---\s*$/m).map(b => b.trim()).filter(Boolean);
  const jobs = [];
  for (const block of blocks) {
    if (/^<!--/.test(block) || block.length < 12) continue;
    const lines = block.split(/\r?\n/);
    let company = '', role = '', url = '', location = '';
    const descLines = [];
    for (let line of lines) {
      const h = line.match(/^#{0,3}\s*(.+?)\s*(?:—|\||-{1,2}|:)\s*(.+)$/);
      const kv = line.match(/^\s*(url|link|location|company|role)\s*:\s*(.+)$/i);
      if (kv) {
        const k = kv[1].toLowerCase(), v = kv[2].trim();
        if (k === 'url' || k === 'link') url = v;
        else if (k === 'location') location = v;
        else if (k === 'company') company = v;
        else if (k === 'role') role = v;
      } else if (!role && h && /^#/.test(line)) {
        company = h[1].trim(); role = h[2].trim();
      } else if (!role && !company && line.trim() && !/^#/.test(line)) {
        role = line.trim(); // bare first line → treat as role
      } else {
        descLines.push(line);
      }
    }
    if (!role) continue;
    jobs.push({
      source: 'manual',
      company, role,
      location: location || 'India',
      url: url || '',
      description: stripHtml(descLines.join(' ')).slice(0, 4000),
      posted: new Date().toISOString().slice(0, 10)
    });
  }
  return jobs;
}
