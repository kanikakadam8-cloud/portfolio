// We Work Remotely — Design RSS feed (robots-allowed). Dependency-free XML parse.
import { fetchText, robotsAllowed, stripHtml, log } from '../lib/util.mjs';

const pick = (xml, tag) => {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  if (!m) return '';
  return m[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
};

export default async function fetchWWR(cfg) {
  const url = cfg.url || 'https://weworkremotely.com/categories/remote-design-jobs.rss';
  if (!(await robotsAllowed(url))) { log('wwr: robots.txt disallows — skipping'); return []; }
  let xml;
  try { xml = await fetchText(url); }
  catch (e) { log('wwr: fetch failed —', e.message); return []; }

  const items = xml.match(/<item>[\s\S]*?<\/item>/gi) || [];
  return items.map(item => {
    const rawTitle = stripHtml(pick(item, 'title'));      // "Company: Role"
    const [company, ...rest] = rawTitle.split(/:\s/);
    const role = rest.join(': ') || rawTitle;
    return {
      source: 'weworkremotely',
      company: rest.length ? company.trim() : '',
      role: role.trim(),
      location: stripHtml(pick(item, 'region')) || 'Remote',
      url: pick(item, 'link'),
      description: stripHtml(pick(item, 'description')).slice(0, 4000),
      posted: new Date(pick(item, 'pubDate') || Date.now()).toISOString().slice(0, 10)
    };
  }).filter(j => j.role && j.url);
}
