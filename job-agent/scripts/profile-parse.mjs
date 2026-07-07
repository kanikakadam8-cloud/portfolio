// profile-parse — build data/profile.json from the repo (résumé, about, work).
// Merges parsed tags/projects over a verified base so quality is guaranteed.
// Caches: re-parses only when the résumé file changes (or --force).
import { readText, writeJSON, readJSON, p, REPO_ROOT, hashId, stripHtml, log } from '../lib/util.mjs';
import { join } from 'node:path';

const BASE = {
  name: 'Kanika Kadam',
  title: 'Product & Furniture Designer',
  seniority: 'fresher / junior (BDes graduating 2026)',
  seniorityMode: 'fulltime',
  location: 'Mumbai, India',
  geoScope: 'india',
  availability: 'Full-time from July 2026',
  targetTitles: [
    'product designer', 'furniture designer', 'industrial designer',
    'junior product designer', 'design associate', 'cmf designer',
    'furniture & product designer', 'design researcher', 'spatial designer',
    'design-adjacent AI'
  ],
  education: [{ degree: 'BDes Product Design', school: 'Somaiya School of Design', years: '2022–2026' }],
  makingSkills: ['wood lathe turning', 'laser cutting', 'CNC', '3D printing', 'Dremel detailing',
    'model making', 'prototyping', 'material exploration', 'craft'],
  software: ['Autodesk Fusion 360', 'Adobe Illustrator', 'Adobe Photoshop', 'MidJourney', 'ChatGPT'],
  softwareGaps: ['Rhino', 'KeyShot', 'SolidWorks', 'SketchUp', 'Blender', 'AutoCAD'],
  disciplines: ['Furniture & Product Design', 'Human-Centred Design', 'Prototyping & Model Making',
    'Material & Craft Exploration', 'Visual Communication', 'Packaging'],
  experience: [
    { role: 'Social Media & Marketing Manager', org: 'H2L Robotics India Pvt. Ltd.', dates: 'Jun 2026 – Present' },
    { role: 'Graphic & Product Designer', org: 'Breen Lifestyles Pvt. Ltd.', dates: 'Jan – May 2026' },
    { role: '3D Typography Design Intern', org: 'Somaiya Sports · riidl Design Studio', dates: 'Jan – Feb 2025' },
    { role: 'Woodworking Display Design', org: 'riidl Design Studio', dates: 'Nov 2024 – Jan 2025' }
  ]
};

const SOFTWARE_TERMS = ['Fusion 360', 'Illustrator', 'Photoshop', 'MidJourney', 'ChatGPT',
  'Rhino', 'KeyShot', 'SolidWorks', 'SketchUp', 'Blender', 'AutoCAD', 'CNC', '3D Printing', 'Laser'];

function parseProjects(workHtml) {
  const projects = [];
  const cards = workHtml.match(/<div class="card-front">[\s\S]*?<\/div>\s*<div class="card-back">[\s\S]*?<\/div>/g) || [];
  for (const c of cards) {
    const cat = (c.match(/class="proj-cat">([\s\S]*?)</) || [])[1];
    const title = (c.match(/class="proj-title">([\s\S]*?)</) || [])[1];
    const desc = (c.match(/class="card-back-desc">([\s\S]*?)</) || [])[1];
    if (title) projects.push({
      title: stripHtml(title), category: stripHtml(cat || ''),
      accomplishment: stripHtml(desc || '')
    });
  }
  return projects;
}

export function buildProfile({ force = false } = {}) {
  const resumeFile = join(REPO_ROOT, 'kanika-kadam-resume.html');
  const resume = readText(resumeFile);
  const resumeHash = hashId(resume || 'none');
  const existing = readJSON(p('data', 'profile.json'));
  if (!force && existing && existing.resumeHash === resumeHash) {
    log('profile: unchanged (cache hit)'); return existing;
  }

  const work = readText(join(REPO_ROOT, 'work.html'));
  const about = readText(join(REPO_ROOT, 'about.html'));
  const corpus = (resume + ' ' + about).toLowerCase();

  const foundSoftware = SOFTWARE_TERMS.filter(t => corpus.includes(t.toLowerCase()));
  const software = Array.from(new Set([...BASE.software, ...foundSoftware.filter(s =>
    !['Rhino', 'KeyShot', 'SolidWorks', 'SketchUp', 'Blender', 'AutoCAD'].includes(s))]));
  const softwareGaps = BASE.softwareGaps.filter(g => !corpus.includes(g.toLowerCase()));

  const projects = parseProjects(work);
  const profile = {
    ...BASE,
    software,
    softwareGaps,
    projects: projects.length ? projects : (existing?.projects || []),
    keywords: Array.from(new Set([
      ...BASE.makingSkills, ...software.map(s => s.toLowerCase()),
      ...BASE.disciplines.map(d => d.toLowerCase()),
      'furniture', 'product design', 'industrial design', 'material', 'craft', 'cmf', 'prototyping'
    ])),
    parsedFrom: ['kanika-kadam-resume.html', 'about.html', 'work.html'],
    parsedAt: new Date().toISOString(),
    resumeHash
  };
  writeJSON(p('data', 'profile.json'), profile);
  log(`profile: written (${projects.length} projects, ${software.length} software, gaps: ${softwareGaps.join(', ') || 'none'})`);
  return profile;
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('profile-parse.mjs')) {
  buildProfile({ force: process.argv.includes('--force') });
}
