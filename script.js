/* ─────────────────────────────────────────
   PROJECT DATA
───────────────────────────────────────── */
const PROJECTS = {
  lamp: {
    num: '01 / 08', cat: 'Product Design · Lighting', year: '2024',
    title: 'Mad Hatter Lamp',
    desc: 'An unconventional lamp design inspired by the whimsy and surrealism of Alice in Wonderland\'s Mad Hatter. An exploration of form, light diffusion, and material play through iterative prototyping — where function and theatricality coexist.',
    insight: 'form follows feeling, not just function — some designs need a little madness',
    tags: ['Product Design','Lighting','Concept Design','Prototyping','Material Exploration'],
    cover: 'images/projects/Lamp Design/Mad hatter behance ppt/1.png',
    slides: Array.from({length:11},(_,i)=>`images/projects/Lamp Design/Mad hatter behance ppt/${i+1}.png`),
    photos: ['images/projects/Lamp Design/Prototype.jpeg']
  },
  compost: {
    num: '02 / 08', cat: 'Product Design · Sustainability', year: '2025',
    title: 'Wormy — Compost Bin',
    desc: 'A home vermicomposting system designed to make worm farming intuitive, practical, and beautiful. The project balances the functional requirements of worm welfare with aesthetic considerations for integration into everyday domestic environments.',
    insight: 'good sustainability design isn\'t about sacrifice — it\'s making the right choice feel like the easy choice',
    tags: ['Product Design','Sustainability','Home','Circular Design','Vermicomposting'],
    cover: 'images/projects/Wormy compost bin/Extacted file/1.png',
    slides: Array.from({length:9},(_,i)=>`images/projects/Wormy compost bin/Extacted file/${i+1}.png`),
    photos: [
      'images/projects/Wormy compost bin/Photos/kanika wormy compost bin illustration-01.jpg',
      'images/projects/Wormy compost bin/Photos/WhatsApp Image 2025-03-19 at 5.09.10 PM.jpeg'
    ]
  },
  furniture: {
    num: '03 / 08', cat: 'Furniture Design · Spatial', year: '2024',
    title: 'Curved Table with Relaxation Space',
    desc: 'An exploration of organic curved forms in furniture design. This piece integrates a relaxation corner into a functional table, questioning the boundary between furniture and architectural space.',
    insight: 'furniture is the smallest architecture — it shapes how we inhabit a room',
    tags: ['Furniture Design','Organic Form','Ergonomics','Wood','Spatial Design'],
    cover: 'images/projects/Furniture design/Curved table with relaxation space/extracted pdf/1.png',
    slides: Array.from({length:12},(_,i)=>`images/projects/Furniture design/Curved table with relaxation space/extracted pdf/${i+1}.png`),
    photos: []
  },
  packaging: {
    num: '04 / 08', cat: 'Packaging Design · Identity', year: '2025',
    title: 'Millet Packaging for a Healthier Tomorrow',
    desc: 'A packaging system for grain millet that communicates health, tradition, and sustainability. Designed to reconnect modern consumers with indigenous grain culture through thoughtful visual storytelling.',
    insight: 'packaging is a promise — the first conversation a product has with the person who picks it up',
    tags: ['Packaging Design','Sustainability','Identity','Grain','Indigenous Culture'],
    cover: 'images/projects/Grain milet Packaging/Photos/WhatsApp Image 2025-06-25 at 2.13.13 PM.jpeg',
    slides: [],
    photos: [
      'images/projects/Grain milet Packaging/Photos/WhatsApp Image 2025-06-25 at 2.13.12 PM.jpeg',
      'images/projects/Grain milet Packaging/Photos/WhatsApp Image 2025-06-25 at 2.13.13 PM.jpeg',
      'images/projects/Grain milet Packaging/Photos/WhatsApp Image 2025-06-25 at 2.13.13 PM (1).jpeg',
      'images/projects/Grain milet Packaging/Photos/WhatsApp Image 2025-06-25 at 2.13.13 PM (2).jpeg',
      'images/projects/Grain milet Packaging/Photos/WhatsApp Image 2025-06-25 at 2.13.14 PM.jpeg',
      'images/projects/Grain milet Packaging/Photos/WhatsApp Image 2025-06-25 at 2.13.14 PM (1).jpeg'
    ]
  },
  toss: {
    num: '05 / 08', cat: 'Spatial Design · Installation', year: '2025',
    title: 'TOSS 2025 — 3D Illuminated Typography',
    desc: 'Large-scale illuminated 3D letter installations for Somaiya Vidyavihar University\'s annual cricket event. Fully end-to-end: logo-traced in Illustrator, dimensioned in Fusion 360, CNC-cut from flexible ply, bent, assembled, and painted on-site.',
    insight: 'scale changes everything — a letter at 6 feet is a completely different design problem',
    tags: ['Spatial Design','Installation','CNC Cutting','Fabrication','Typography','Fusion 360'],
    cover: 'images/projects/toss/behance/1.png',
    slides: Array.from({length:6},(_,i)=>`images/projects/toss/behance/${i+1}.png`),
    photos: [1,3,4,5,6,7,8,9].map(n=>`images/projects/toss/Photos/${String(n).padStart(2,'0')}.jpeg`)
  },
  woodworking: {
    num: '06 / 08', cat: 'Material Exploration · Display', year: '2024',
    title: 'Woodworking Lab — riidl Studio',
    desc: 'A collection of demonstration pieces created to communicate the woodworking lab\'s full range of capabilities to clients. Each piece deliberately maps a specific machine process — lathe, laser, Dremel — to a tangible, legible design outcome.',
    insight: 'the best way to explain a machine\'s capabilities is to let the material speak for itself',
    tags: ['Wood','Lathe','Laser Cutting','Dremel','Material Exploration','Display Design'],
    cover: 'images/projects/woodworking/Photos/01.jpeg',
    slides: Array.from({length:7},(_,i)=>`images/projects/woodworking/behance/${i+1}.png`),
    photos: Array.from({length:11},(_,i)=>`images/projects/woodworking/Photos/${String(i+1).padStart(2,'0')}.jpeg`)
  },
  stressball: {
    num: '07 / 08', cat: 'Product Design · Wellbeing', year: '2024',
    title: 'Interactive Stress Ball',
    desc: 'A sensor-integrated stress relief tool that responds to pressure with soothing sounds and gentle vibrations. Designed through research and user feedback for teachers, professionals, and parents who carry invisible loads every day.',
    insight: 'the most human products are the ones that respond — not just react',
    tags: ['Product Design','Wellbeing','Interaction Design','Sensors','User Research'],
    cover: 'images/projects/stress-ball/behance/1.png',
    slides: Array.from({length:16},(_,i)=>`images/projects/stress-ball/behance/${i+1}.png`),
    photos: [],
    video: 'images/projects/stress-ball/demo.mp4'
  },
  capstone: {
    num: '08 / 08', cat: 'Furniture Design · Capstone', year: '2025',
    title: 'Foldable Study Table for Children in Compact Homes',
    desc: 'A human-centred design project addressing how children study in small urban homes. Balancing spatial constraints with ergonomics through deep research, iterative ideation, and a fully fabricated prototype.',
    insight: 'every fold mechanism is a decision that touches the user directly — nothing is neutral in furniture',
    tags: ['Furniture Design','Human-Centred Design','Capstone 2025','Prototyping','Wood','Research'],
    cover: null, slides: [], photos: []
  }
};

/* ─────────────────────────────────────────
   COMPANION MASCOT — state machine
   Speech bubbles change as user scrolls
   through different sections/pages.
───────────────────────────────────────── */
const COMPANION_STATES = {
  hero:    { cls: 'st-hero',    msg: 'Hi! Let\'s explore ✦' },
  work:    { cls: 'st-work',    msg: 'eight projects this way →' },
  about:   { cls: 'st-about',   msg: 'nice to meet you!' },
  exp:     { cls: 'st-exp',     msg: 'learning by making' },
  contact: { cls: 'st-contact', msg: 'say hello 👋' },
  default: { cls: 'st-hero',   msg: 'scroll to explore' }
};

function setCompanionState(key) {
  const comp = document.getElementById('mascot-companion');
  const bubble = document.getElementById('companion-bubble');
  if (!comp || !bubble) return;

  const state = COMPANION_STATES[key] || COMPANION_STATES.default;

  // Remove all state classes
  Object.values(COMPANION_STATES).forEach(s => comp.classList.remove(s.cls));
  comp.classList.add(state.cls);
  bubble.textContent = state.msg;

  // Flash bubble briefly to signal state change
  comp.classList.add('show-bubble');
  setTimeout(() => comp.classList.remove('show-bubble'), 2200);
}

/* ─────────────────────────────────────────
   NAV scroll state + active link
───────────────────────────────────────── */
(function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const isHome = document.body.dataset.page === 'home';
  if (!isHome) nav.classList.add('solid');

  const bar = document.getElementById('progress');

  window.addEventListener('scroll', () => {
    if (isHome) nav.classList.toggle('scrolled', window.scrollY > 60);
    if (bar) {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
      bar.style.width = Math.min(pct, 100) + '%';
    }
  }, { passive: true });

  const page = document.body.dataset.page || '';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    const match = href.replace('.html','').replace('index','home');
    if (match === page) a.classList.add('active');
  });
})();

/* ─────────────────────────────────────────
   SCROLL REVEAL — all reveal classes
───────────────────────────────────────── */
(function initReveal() {
  const sel = '.rv, .rv-img, .rv-clip, .rv-left, .rv-right, .sec-rule, .line-reveal';
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -32px 0px' });
  document.querySelectorAll(sel).forEach(el => obs.observe(el));
})();

/* ─────────────────────────────────────────
   SECTION TRACKING — side dots + companion
───────────────────────────────────────── */
(function initSectionTracking() {
  const sections = document.querySelectorAll('section[id], div[id].page-hdr, #hero');
  const dots = document.querySelectorAll('.sdot');
  const companion = document.getElementById('mascot-companion');

  // Map section ids to companion states
  const sectionStateMap = {
    'hero': 'hero', 'featured': 'work', 'home-about': 'about',
    'work-grid': 'work', 'about-section': 'about', 'skills': 'about',
    'experience-section': 'exp', 'vol': 'exp', 'contact-section': 'contact'
  };

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      const id = e.target.id;
      if (!e.isIntersecting) return;

      // Update companion state
      const stateKey = sectionStateMap[id];
      if (stateKey) setCompanionState(stateKey);

      // Show/hide companion (hide during hero, show after)
      if (companion) {
        if (id === 'hero') {
          companion.classList.remove('visible');
        } else {
          companion.classList.add('visible');
        }
      }

      // Update side dots
      dots.forEach(d => {
        d.classList.toggle('active', d.dataset.section === id);
      });
    });
  }, { threshold: 0.35 });

  sections.forEach(s => obs.observe(s));

  // Side dot click scrolling
  dots.forEach(d => {
    d.addEventListener('click', () => {
      const target = document.getElementById(d.dataset.section);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();

/* ─────────────────────────────────────────
   HERO PHOTO + MASCOT PARALLAX
───────────────────────────────────────── */
(function initParallax() {
  const photo = document.querySelector('.hero-photo');
  const heroM = document.querySelector('.hero-mascot-circle');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const h = window.innerHeight;
        if (y < h) {
          if (photo) photo.style.transform = `translateY(${y * 0.09}px)`;
          if (heroM) {
            const pct = y / h;
            heroM.style.opacity = Math.max(0, 1 - pct * 2.5).toString();
          }
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ─────────────────────────────────────────
   MODAL
───────────────────────────────────────── */
function openProject(id) {
  const p = PROJECTS[id];
  const modal = document.getElementById('modal');
  if (!p || !modal) return;

  document.getElementById('m-num').textContent     = p.num;
  document.getElementById('m-cat').textContent     = p.cat;
  document.getElementById('m-title').textContent   = p.title;
  document.getElementById('m-desc').textContent    = p.desc;
  document.getElementById('m-insight').textContent = `"${p.insight}"`;
  document.getElementById('m-tags').innerHTML = p.tags.map(t=>`<span class="m-tag">${t}</span>`).join('');

  const coverSec = document.getElementById('m-cover-section');
  coverSec.innerHTML = p.cover
    ? `<img src="${p.cover}" alt="${p.title}" style="width:100%;display:block;" loading="lazy"/>`
    : `<div style="background:#EDE0D0;aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;"><span style="font-size:0.6rem;font-family:var(--sans);letter-spacing:0.26em;text-transform:uppercase;color:var(--border);">Coming Soon</span></div>`;

  const sSec = document.getElementById('m-slides-section');
  if (p.slides?.length) {
    document.getElementById('m-slides').innerHTML = p.slides.map(s=>`<img src="${s}" loading="lazy" alt=""/>`).join('');
    sSec.style.display = '';
  } else { sSec.style.display = 'none'; }

  const vSec = document.getElementById('m-video-section');
  if (p.video) { document.getElementById('m-video').src = p.video; vSec.style.display = ''; }
  else { vSec.style.display = 'none'; }

  const phSec = document.getElementById('m-photos-section');
  if (p.photos?.length) {
    document.getElementById('m-photos').innerHTML = p.photos.map(s=>
      `<img src="${s}" loading="lazy" alt="" onclick="openLB('${s.replace(/'/g,"\\'")}')" />`
    ).join('');
    phSec.style.display = '';
  } else { phSec.style.display = 'none'; }

  document.getElementById('modal-panel').scrollTop = 0;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('modal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
  const v = document.getElementById('m-video');
  if (v) { v.pause(); v.currentTime = 0; }
}

document.getElementById?.('modal-close')?.addEventListener('click', closeModal);
document.getElementById?.('modal-bg')?.addEventListener('click', closeModal);

document.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.getElementById('modal-close');
  const bg = document.getElementById('modal-bg');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (bg) bg.addEventListener('click', closeModal);
});

/* ─────────────────────────────────────────
   LIGHTBOX
───────────────────────────────────────── */
function openLB(src) {
  document.getElementById('lb-img').src = src;
  document.getElementById('lb').classList.add('open');
}
function closeLB() {
  document.getElementById('lb').classList.remove('open');
  document.getElementById('lb-img').src = '';
}
document.addEventListener('DOMContentLoaded', () => {
  const lb  = document.getElementById('lb');
  const lbx = document.getElementById('lb-x');
  if (!lb) return;
  if (lbx) lbx.addEventListener('click', closeLB);
  lb.addEventListener('click', e => { if (e.target === lb) closeLB(); });
});

/* ─────────────────────────────────────────
   KEYBOARD
───────────────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (document.getElementById('lb')?.classList.contains('open')) closeLB();
  else closeModal();
});

/* ─────────────────────────────────────────
   HASH AUTO-OPEN  (work.html#toss etc.)
───────────────────────────────────────── */
window.addEventListener('load', () => {
  const hash = window.location.hash.slice(1);
  if (hash && PROJECTS[hash] && document.getElementById('modal')) {
    setTimeout(() => openProject(hash), 350);
  }
});

/* ─────────────────────────────────────────
   PAGE TRANSITION — set companion initial
   state based on current page
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  const pageStateMap = {
    home: 'hero', work: 'work', about: 'about',
    experience: 'exp', contact: 'contact'
  };
  const initState = pageStateMap[page] || 'default';

  // On non-home pages, show companion immediately
  const companion = document.getElementById('mascot-companion');
  if (companion && page !== 'home') {
    setTimeout(() => {
      companion.classList.add('visible');
      setCompanionState(initState);
    }, 800);
  }
});
