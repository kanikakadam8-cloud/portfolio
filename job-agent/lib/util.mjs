// Shared helpers for the job-agent pipeline. Zero external deps (Node 18+).
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { createHash } from 'node:crypto';

// ── paths (everything resolves relative to /job-agent, never the site) ──
export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const p = (...parts) => join(ROOT, ...parts);
export const REPO_ROOT = resolve(ROOT, '..');

export function ensureDir(dir) { if (!existsSync(dir)) mkdirSync(dir, { recursive: true }); }

// ── io ──
export function readJSON(file, fallback = null) {
  try { return JSON.parse(readFileSync(file, 'utf8')); } catch { return fallback; }
}
export function writeJSON(file, obj) {
  ensureDir(dirname(file));
  writeFileSync(file, JSON.stringify(obj, null, 2) + '\n');
}
export function readText(file, fallback = '') {
  try { return readFileSync(file, 'utf8'); } catch { return fallback; }
}
export function writeText(file, text) { ensureDir(dirname(file)); writeFileSync(file, text); }
export function listDir(dir) { try { return readdirSync(dir); } catch { return []; } }

// ── csv (minimal, quote-safe) ──
const csvCell = (v) => {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
};
export function toCSV(rows, columns) {
  const head = columns.join(',');
  const body = rows.map(r => columns.map(c => csvCell(r[c])).join(',')).join('\n');
  return head + '\n' + body + (body ? '\n' : '');
}
export function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter(l => l.length);
  if (!lines.length) return [];
  const cols = splitCSVLine(lines[0]);
  return lines.slice(1).map(line => {
    const cells = splitCSVLine(line);
    return Object.fromEntries(cols.map((c, i) => [c, cells[i] ?? '']));
  });
}
function splitCSVLine(line) {
  const out = []; let cur = ''; let q = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (q) {
      if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++; }
      else if (ch === '"') q = false;
      else cur += ch;
    } else if (ch === '"') q = true;
    else if (ch === ',') { out.push(cur); cur = ''; }
    else cur += ch;
  }
  out.push(cur);
  return out;
}

// ── misc ──
export function hashId(...parts) {
  return createHash('sha1').update(parts.join('|')).digest('hex').slice(0, 12);
}
export function today() { return new Date().toISOString().slice(0, 10); }
export function slug(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'x';
}
export function stripHtml(html) {
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&mdash;/g, '—')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ').trim();
}
export const UA = 'kanika-job-agent/1.0 (personal job search; +https://kanikakadam.vercel.app)';

export async function fetchText(url, { timeout = 15000 } = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeout);
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept': '*/*' }, signal: ctrl.signal });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return await res.text();
  } finally { clearTimeout(t); }
}
export async function fetchJSON(url, opts) { return JSON.parse(await fetchText(url, opts)); }

// ── robots.txt gate (simple, conservative: if unsure, block) ──
const robotsCache = new Map();
export async function robotsAllowed(url) {
  let u; try { u = new URL(url); } catch { return false; }
  const origin = u.origin;
  if (!robotsCache.has(origin)) {
    let rules = { disallow: [] };
    try {
      const txt = await fetchText(origin + '/robots.txt', { timeout: 8000 });
      rules = parseRobots(txt);
    } catch { rules = { disallow: [], fetchFailed: true }; }
    robotsCache.set(origin, rules);
  }
  const rules = robotsCache.get(origin);
  if (rules.blanketDisallow) return false;             // Disallow: / for *
  const path = u.pathname;
  return !rules.disallow.some(d => d && path.startsWith(d));
}
function parseRobots(txt) {
  // Only interpret the `User-agent: *` group (conservative).
  const lines = txt.split(/\r?\n/).map(l => l.replace(/#.*/, '').trim());
  let inStar = false; const disallow = []; let blanket = false;
  for (const line of lines) {
    const m = line.match(/^([A-Za-z-]+):\s*(.*)$/); if (!m) continue;
    const key = m[1].toLowerCase(); const val = m[2].trim();
    if (key === 'user-agent') inStar = (val === '*');
    else if (inStar && key === 'disallow') {
      if (val === '/') blanket = true;
      else if (val) disallow.push(val);
    }
  }
  return { disallow, blanketDisallow: blanket };
}

export function log(...a) { console.log('[job-agent]', ...a); }
