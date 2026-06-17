/* ─────────────────────────────────────────
   THEME TOGGLE  (light ↔ dark)
   Reads/writes localStorage key 'kk-theme'.
   FOUC prevention: each HTML <head> also has
   an inline script that applies stored theme
   before first paint.
───────────────────────────────────────── */
(function initTheme() {
  const root = document.documentElement;
  const btn  = document.getElementById('theme-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) {
      root.removeAttribute('data-theme');
      localStorage.setItem('kk-theme', 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('kk-theme', 'dark');
    }
  });
})();

/* ─────────────────────────────────────────
   PROJECT DATA
   cover  — hero image shown on card + modal (real photo or render)
   photos — actual project photos for Process & Photography section
   casestudy — written case study content (problem → reflection)
   slides array removed; presentation images not used as project images
───────────────────────────────────────── */
const PROJECTS = {
  lamp: {
    num: '01 / 08', cat: 'Product Design · Lighting', year: '2024',
    title: 'Mad Hatter Lamp',
    desc: 'An unconventional lamp design inspired by the whimsy of Alice in Wonderland\'s Mad Hatter — an exploration of theatrical form, light diffusion, and material play through iterative prototyping.',
    casestudy: {
      problem: 'Most lamps are designed to disappear into a room. The brief was the opposite: design a lamp that becomes a conversation piece — one that carries personality and narrative without sacrificing the quality of the light it produces.',
      research: 'Studied theatrical lighting, the visual language of Lewis Carroll\'s original illustrations, and unconventional lamp forms across Studio Job and Ingo Maurer. Mapped the relationship between lampshade geometry and the quality of light spread.',
      process: 'Began with rapid form sketches exploring the top hat as the primary shade element. Material-tested acetate, paper, and layered composites for translucency. Multiple scale models refined the proportion between brim, body, and pendant cord before arriving at final form.',
      outcome: 'A pendant lamp using a layered top-hat form as the shade, with translucent material panels that create a warm, theatrically diffused pool of light. The design sits at the boundary between product and prop.',
      reflection: 'Absurdist reference in design only works when every functional decision is made seriously. The whimsy comes from the concept — not from abandoning craft.'
    },
    insight: 'form follows feeling, not just function — some designs need a little madness',
    tags: ['Product Design','Lighting','Concept Design','Prototyping','Material Exploration'],
    cover: 'images/projects/Lamp Design/COVER PHOTO/ChatGPT Image Jun 17, 2026, 06_40_32 PM.png',
    photos: Array.from({length:10},(_,i)=>`images/projects/Lamp Design/Mad hatter behance ppt/${i+2}.png`)
  },
  compost: {
    num: '02 / 08', cat: 'Product Design · Sustainability', year: '2025',
    title: 'Wormy — Compost Bin',
    desc: 'A home vermicomposting system designed to make worm farming intuitive, approachable, and beautiful — balancing the functional needs of worm welfare with an aesthetic that invites everyday use.',
    casestudy: {
      problem: 'Vermicomposting is effective but intimidating. Existing products are ugly, utilitarian, and difficult to integrate into small urban homes. Most people who want to compost still don\'t, because the experience feels unpleasant.',
      research: 'Interviewed flat dwellers in Mumbai about kitchen waste habits and composting barriers. Studied worm biology, optimal bin conditions (moisture, aeration, darkness), and existing products including Hungry Bin and Can-O-Worms.',
      process: 'Explored stackable modular forms, ventilation channel geometries, and extraction mechanisms. Made functional cardboard mock-ups and tested with substrate samples. A character-like visual language emerged from humanising the form to reduce "gross" associations.',
      outcome: 'A stackable bin with distinct feeding, composting, and worm collection chambers. The rounded, character-shaped form encourages relationship with the system. Materials: recycled polypropylene with a matte texture referencing earthenware.',
      reflection: 'Sustainability products fail when they ask too much of the user. This project was about reducing friction at every step until composting felt like a natural part of daily life — not an act of sacrifice.'
    },
    insight: 'good sustainability design isn\'t about sacrifice — it\'s making the right choice feel like the easy choice',
    tags: ['Product Design','Sustainability','Home','Circular Design','Vermicomposting'],
    cover: 'images/projects/Wormy compost bin/COVER PHOTO/ChatGPT Image Jun 17, 2026, 06_51_48 PM.png',
    photos: [
      'images/projects/Wormy compost bin/Photos/kanika wormy compost bin illustration-01.jpg',
      'images/projects/Wormy compost bin/Photos/WhatsApp Image 2025-03-19 at 5.09.10 PM.jpeg'
    ]
  },
  furniture: {
    num: '03 / 08', cat: 'Furniture Design · Spatial', year: '2024',
    title: 'Curved Table with Relaxation Space',
    desc: 'An exploration of organic form in furniture design — a table that integrates a contemplative alcove, questioning the boundary between functional surface and habitable space.',
    casestudy: {
      problem: 'Modern tables are purely instrumental: they serve productivity but not presence. The brief asked whether a single piece of furniture could create both a working surface and a place to simply be still.',
      research: 'Studied biomorphic forms in furniture (Aalto, Saarinen, Ditzel), Japanese engawa spaces, and how curved geometry influences how the body orients itself in a room. Analysed ergonomic posture for both focused work and rest.',
      process: 'Developed through a series of physical scale models in cardboard and foam. The curve radius was iterated until the alcove felt genuinely sheltering without closing off the table\'s function. Structural load-path resolved at 1:5 scale before full-size model.',
      outcome: 'A solid wood table where the working surface cantilevers over a curved alcove large enough to sit within. The form creates two distinct atmospheres in one object: the open, lit table plane for focus; the enclosed curve below for retreat.',
      reflection: 'Furniture design at its most interesting operates at the scale of the body and the room simultaneously. This piece taught me to think about furniture as the smallest architecture.'
    },
    insight: 'furniture is the smallest architecture — it shapes how we inhabit a room',
    tags: ['Furniture Design','Organic Form','Ergonomics','Wood','Spatial Design'],
    cover: 'images/projects/Furniture design/Curved table with relaxation space/cover photo/ChatGPT Image Jun 17, 2026, 06_48_13 PM.png',
    photos: Array.from({length:11},(_,i)=>`images/projects/Furniture design/Curved table with relaxation space/extracted pdf/${i+2}.png`)
  },
  packaging: {
    num: '04 / 08', cat: 'Packaging Design · Identity', year: '2025',
    title: 'Millet Packaging for a Healthier Tomorrow',
    desc: 'A packaging system for grain millet that communicates health, tradition, and sustainability — reconnecting modern consumers with indigenous grain culture through thoughtful visual storytelling.',
    casestudy: {
      problem: 'Millet is nutritionally superior to most common grains, widely grown across India, and deeply rooted in regional food culture — yet supermarket shelves treat it as a niche health product with generic, forgettable packaging.',
      research: 'Researched millet\'s agricultural history across Deccan and Sahyadri farming communities. Surveyed health food consumers in Mumbai on packaging preferences and audited existing grain packaging for visual language and material choices.',
      process: 'Explored earthy colour palettes drawn from the grain\'s own tones — terracotta, warm ochre, field green. Developed botanical hand-drawn motifs referencing the millet plant\'s distinctive feathery head. Typography balanced Devanagari and Latin scripts to honour dual linguistic identity.',
      outcome: 'A packaging system in kraft board and deep terracotta that positions millet as aspirational health food without losing its agricultural honesty. Each variety has a distinct botanical illustration within a unified structural and colour system.',
      reflection: 'Packaging design is a form of cultural translation. This project asked me to hold two registers at once — the contemporary health consumer and the grain\'s centuries of Indian agricultural heritage — and find the visual language that could speak to both.'
    },
    insight: 'packaging is a promise — the first conversation a product has with the person who picks it up',
    tags: ['Packaging Design','Sustainability','Identity','Grain','Indigenous Culture'],
    cover: 'images/projects/Grain milet Packaging/Photos/WhatsApp Image 2025-06-25 at 2.13.13 PM.jpeg',
    photos: [
      'images/projects/Grain milet Packaging/Photos/WhatsApp Image 2025-05-23 at 11.26.39 PM.jpeg',
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
    desc: 'Large-scale illuminated 3D letter installations for Somaiya Vidyavihar University\'s annual sports event — fully end-to-end from Illustrator to CNC fabrication to on-ground installation.',
    casestudy: {
      problem: 'TOSS 2025 needed a physical identity anchor — large enough to read across the sports ground, photograph well at night, and survive outdoor installation. The constraint: build it entirely with university workshop resources.',
      research: 'Studied dimensional typography in events, wayfinding installations, and festival signage. Mapped the CNC bed size to determine maximum letter dimensions. Tested flexible ply\'s bending radius at different kerf spacings to understand the minimum achievable curve.',
      process: 'Logo traced in Adobe Illustrator and dimensioned in Fusion 360. Letters CNC-cut from flexible plywood in sections, kerf-bent into form, assembled with internal timber ribs for rigidity, surface-finished on-site. LED strips routed through the interior cavity for illumination.',
      outcome: 'Six illuminated letters standing approximately 1.5m tall, installed at Somaiya Vidyavihar University for TOSS 2025. Visible from the grandstand and widely photographed across the event.',
      reflection: 'Scale changes everything. A letter at 1.5 metres behaves completely differently from a letterform on screen — every curve and terminal becomes a structural decision. This was the most direct link I\'ve found between design thinking and physical making.'
    },
    insight: 'scale changes everything — a letter at 6 feet is a completely different design problem',
    tags: ['Spatial Design','Installation','CNC Cutting','Fabrication','Typography','Fusion 360'],
    cover: 'images/projects/toss/cover photo/ChatGPT Image Jun 17, 2026, 08_08_55 PM.png',
    photos: [
      'images/projects/toss/Photos/01.jpeg',
      'images/projects/toss/Photos/03.jpeg',
      'images/projects/toss/Photos/04.jpeg',
      'images/projects/toss/Photos/05.jpeg',
      'images/projects/toss/Photos/06.jpeg',
      'images/projects/toss/Photos/07.jpeg',
      'images/projects/toss/Photos/08.jpeg',
      'images/projects/toss/Photos/09.jpeg',
      'images/projects/toss/Photos/7d3b199f-383c-4121-a3fb-d35e5933c1e5.jpg'
    ]
  },
  woodworking: {
    num: '06 / 08', cat: 'Material Exploration · Display', year: '2024',
    title: 'Woodworking Lab — riidl Studio',
    desc: 'A collection of demonstration pieces created to communicate the woodworking lab\'s full range of capabilities to clients — each piece a direct, legible expression of one machine process.',
    casestudy: {
      problem: 'The woodworking lab at riidl, Somaiya needed demonstration pieces that could immediately communicate what each machine could do — to visiting clients, students, and collaborators who had never seen the equipment before.',
      research: 'Mapped each machine\'s characteristic output: the lathe\'s rotational symmetry, the laser\'s precision etching, the Dremel\'s free-form carving, the scroll saw\'s intricate profiles. Researched display design in museum contexts for how objects carry their own explanations.',
      process: 'Each piece was designed with legibility of process as the primary brief. The lathe-turned bowl celebrates form through rotation. The laser panel showcases depth and tonal control on timber surface. The Dremel piece shows flowing freehand marks. Materials selected for grain visibility and surface response to each tool.',
      outcome: 'A permanent collection of display pieces now exhibited in the riidl woodworking lab. Clients immediately understand the lab\'s range on arrival. The pieces have since been photographed for the studio\'s capability portfolio.',
      reflection: 'Designing to communicate a process rather than to fulfil a function is a different kind of brief — it requires making the invisible visible. This internship taught me that the best demonstration is always an object, never an explanation.'
    },
    insight: 'the best way to explain a machine\'s capabilities is to let the material speak for itself',
    tags: ['Wood','Lathe','Laser Cutting','Dremel','Material Exploration','Display Design'],
    cover: 'images/projects/woodworking/wood working/ChatGPT Image Jun 17, 2026, 08_16_48 PM.png',
    photos: Array.from({length:11},(_,i)=>`images/projects/woodworking/Photos/${String(i+1).padStart(2,'0')}.jpeg`)
  },
  stressball: {
    num: '07 / 08', cat: 'Product Design · Wellbeing', year: '2024',
    title: 'Interactive Stress Ball',
    desc: 'A sensor-integrated stress relief tool that responds to pressure with soothing sounds and gentle vibration — designed for teachers, professionals, and parents carrying invisible daily loads.',
    casestudy: {
      problem: 'Stress among working adults — especially teachers and parents — rarely has a physical outlet. Existing stress toys are passive, uninspiring, and feel juvenile. People in high-stress roles need something dignified and genuinely responsive.',
      research: 'Conducted user interviews with teachers and design professionals about stress management habits. Found that physical tactility combined with sensory feedback (sound, vibration) is significantly more effective than physical manipulation alone. Studied haptic interaction design and ambient sound therapy.',
      process: 'Iterated through material hardnesses for optimal grip feel. Embedded pressure sensors connected to a microcontroller trigger ambient sound samples (rain, resonant chimes) and a small vibration motor at set pressure thresholds. Shell developed through multiple shore-hardness silicone tests before arriving at final form.',
      outcome: 'A soft-body stress ball with embedded pressure sensors that responds to squeeze with ambient audio and gentle vibration. Tested with teachers over two weeks — all reported using it during high-stress moments. Form is calm and professional, appropriate for a desk context.',
      reflection: 'The most human products respond to you rather than just reacting. The difference between reaction and response is intelligence — and even a minimal embedded system can carry that distinction through to the user experience.'
    },
    insight: 'the most human products are the ones that respond — not just react',
    tags: ['Product Design','Wellbeing','Interaction Design','Sensors','User Research'],
    cover: 'images/projects/stress-ball/cover photo/ChatGPT Image Jun 17, 2026, 10_42_46 PM.png',
    photos: [
      'images/projects/stress-ball/photos/WhatsApp Image 2025-09-02 at 9.23.56 PM.jpeg',
      'images/projects/stress-ball/photos/WhatsApp Image 2025-09-02 at 9.23.56 PM (1).jpeg',
      'images/projects/stress-ball/photos/WhatsApp Image 2025-09-02 at 9.28.14 PM.jpeg',
      'images/projects/stress-ball/photos/WhatsApp Image 2025-09-02 at 9.28.14 PM (1).jpeg',
      'images/projects/stress-ball/photos/WhatsApp Image 2025-09-02 at 9.28.14 PM (2).jpeg',
      'images/projects/stress-ball/photos/WhatsApp Image 2025-09-02 at 9.28.15 PM.jpeg',
      'images/projects/stress-ball/photos/WhatsApp Image 2025-09-02 at 9.28.15 PM (1).jpeg',
      'images/projects/stress-ball/photos/WhatsApp Image 2025-09-02 at 9.35.24 PM.jpeg'
    ],
    video: 'images/projects/stress-ball/demo.mp4'
  },
  capstone: {
    num: '08 / 08', cat: 'Furniture Design · Capstone', year: '2025',
    title: 'Foldable Study Table for Children in Compact Homes',
    desc: 'A human-centred capstone project addressing how children study in small urban homes — balancing spatial constraints with ergonomics through deep research and a fully fabricated prototype.',
    casestudy: {
      problem: 'In Mumbai\'s compact 1-2 BHK apartments, children rarely have a dedicated study space. The kitchen table is shared, impermanent, and not scaled to a child\'s body — resulting in poor posture, disrupted focus, and no ownership over the act of studying.',
      research: 'Visited eight families across Ghatkopar, Kurla, and Chembur in 1-2 BHK homes. Mapped children\'s study behaviour through observation and parent interviews. Three critical needs emerged: height-correct ergonomics for ages 6-12, independence of setup and storage, and a footprint that disappears when not in use.',
      process: 'Explored five folding mechanism categories: wall-mounted fold-down, suitcase-form self-contained, leg-folding with fixed surface, nested leg-and-panel, and rack-and-pinion height-adjust. Built 1:5 cardboard models of each. Final form selected for independent child operation. Full-scale prototype fabricated in birch ply with steel hinge and locking mechanism.',
      outcome: 'A freestanding fold-flat table scaled for children aged 6-12. Folds to under 15cm depth for wall storage. Surface height correct for a sitting child at 52cm. All materials non-toxic and child-safe. Three children aged 7-11 were able to set up and pack down independently within two minutes.',
      reflection: 'Designing for children is designing for autonomy — the child\'s ability to own and operate their own space is the whole point. Every complexity in the fold mechanism was weighed against whether a 7-year-old could navigate it alone.'
    },
    insight: 'every fold mechanism is a decision that touches the user directly — nothing is neutral in furniture',
    tags: ['Furniture Design','Human-Centred Design','Capstone 2025','Prototyping','Wood','Research'],
    cover: 'images/projects/Furniture design/FOLDABLE STUDY TABLE/cover photo/ChatGPT Image Jun 17, 2026, 08_41_17 PM.png',
    photos: [
      'images/projects/Furniture design/FOLDABLE STUDY TABLE/Cad model/capstone jury final render white.png',
      'images/projects/Furniture design/FOLDABLE STUDY TABLE/pHOTOS/WhatsApp Image 2025-12-18 at 1.15.33 AM.jpeg',
      'images/projects/Furniture design/FOLDABLE STUDY TABLE/pHOTOS/WhatsApp Image 2025-12-18 at 1.15.33 AM (1).jpeg',
      'images/projects/Furniture design/FOLDABLE STUDY TABLE/pHOTOS/WhatsApp Image 2025-12-18 at 1.15.33 AM (2).jpeg',
      'images/projects/Furniture design/FOLDABLE STUDY TABLE/pHOTOS/WhatsApp Image 2025-12-18 at 1.15.34 AM.jpeg',
      'images/projects/Furniture design/FOLDABLE STUDY TABLE/pHOTOS/20251222_154024.jpg',
      'images/projects/Furniture design/FOLDABLE STUDY TABLE/pHOTOS/20251222_154103.jpg',
      'images/projects/Furniture design/FOLDABLE STUDY TABLE/pHOTOS/20251222_154142.jpg',
      'images/projects/Furniture design/FOLDABLE STUDY TABLE/pHOTOS/20251222_154230.jpg',
      'images/projects/Furniture design/FOLDABLE STUDY TABLE/pHOTOS/IMG_20251217_215601726.jpg',
      'images/projects/Furniture design/FOLDABLE STUDY TABLE/pHOTOS/IMG_20251217_215606199.jpg',
      'images/projects/Furniture design/FOLDABLE STUDY TABLE/pHOTOS/IMG_20251218_135308391.jpg',
      'images/projects/Furniture design/FOLDABLE STUDY TABLE/pHOTOS/IMG_20251218_135313507.jpg'
    ]
  }
};

/* ─────────────────────────────────────────
   HOME SPLIT CHARACTER
   Sticky left-panel character on index.html.
   Swaps pose + speech as right-panel sections
   enter view — mirrors Mrazek Tomas pattern.
───────────────────────────────────────── */
(function initHomeSplit() {
  if (document.body.dataset.page !== 'home') return;

  const charImg  = document.getElementById('home-char');
  const speechEl = document.getElementById('home-speech');
  if (!charImg) return;

  const POSES = {
    front:  'images/mascot/mascot png/main/ChatGPT_Image_Jun_16__2026__06_00_11_PM-removebg-preview.png',
    side:   'images/mascot/mascot png/another angles and poses/ChatGPT Image Jun 16, 2026, 11_39_28 PM.png',
    back3q: 'images/mascot/mascot png/another angles and poses/ChatGPT Image Jun 16, 2026, 11_51_18 PM.png',
    back:   'images/mascot/mascot png/another angles and poses/ChatGPT Image Jun 16, 2026, 11_53_06 PM.png',
  };

  let currentFlip = false;
  let speechTimer = null;
  let mx = 0, px = 0;

  function applyTransform() {
    const f = currentFlip ? -1 : 1;
    charImg.style.transform = `scaleX(${f}) translateX(${px * 6 * f}px)`;
  }

  function switchChar(pose, speech, flip) {
    currentFlip = !!flip;
    const src = POSES[pose];
    if (!src) return;
    charImg.style.opacity = '0';
    setTimeout(() => {
      charImg.src = src;
      const done = () => { charImg.style.opacity = '1'; };
      charImg.onload = done; charImg.onerror = done;
    }, 280);
    if (speechEl && speech) {
      if (speechTimer) clearTimeout(speechTimer);
      speechEl.textContent = speech;
      setTimeout(() => speechEl.classList.add('visible'), 700);
      speechTimer = setTimeout(() => speechEl.classList.remove('visible'), 3400);
    }
  }

  /* Mouse parallax — character subtly tracks cursor */
  document.addEventListener('mousemove', e => {
    mx = (e.clientX / window.innerWidth - 0.5) * 2;
  }, { passive: true });
  (function tick() {
    px += (mx - px) * 0.055;
    applyTransform();
    requestAnimationFrame(tick);
  })();

  /* Section observer — swap character on section entry */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const pose   = e.target.dataset.char   || 'front';
      const speech = e.target.dataset.speech || '';
      const flip   = e.target.dataset.flip === 'true';
      switchChar(pose, speech, flip);
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.home-split-right section[id]').forEach(s => obs.observe(s));

  /* Initial state */
  setTimeout(() => switchChar('front', 'hello, welcome ✦', false), 450);
})();

/* ─────────────────────────────────────────
   STORY SPLIT CHARACTER  (inner pages)
   Mirrors home-split but for work, about,
   experience pages. Character stays in the
   sticky left panel for the full page scroll.
   Pose switches as story-right sections enter.
───────────────────────────────────────── */
(function initStorySplit() {
  const charImg  = document.getElementById('story-char');
  const speechEl = document.getElementById('story-speech');
  if (!charImg) return;

  const POSES = {
    front:  'images/mascot/mascot png/main/ChatGPT_Image_Jun_16__2026__06_00_11_PM-removebg-preview.png',
    side:   'images/mascot/mascot png/another angles and poses/ChatGPT Image Jun 16, 2026, 11_39_28 PM.png',
    back3q: 'images/mascot/mascot png/another angles and poses/ChatGPT Image Jun 16, 2026, 11_51_18 PM.png',
    back:   'images/mascot/mascot png/another angles and poses/ChatGPT Image Jun 16, 2026, 11_53_06 PM.png',
  };

  let currentPose = null;
  let currentFlip = false;
  let speechTimer = null;
  let mx = 0, px = 0;

  function applyTransform() {
    const f = currentFlip ? -1 : 1;
    charImg.style.transform = `scaleX(${f}) translateX(${px * 5 * f}px)`;
  }

  function showSpeech(text) {
    if (!speechEl || !text) return;
    if (speechTimer) clearTimeout(speechTimer);
    speechEl.textContent = text;
    setTimeout(() => speechEl.classList.add('visible'), 600);
    speechTimer = setTimeout(() => speechEl.classList.remove('visible'), 3400);
  }

  function switchChar(pose, speech, flip) {
    const newFlip = !!flip;
    if (pose === currentPose && newFlip === currentFlip) {
      if (speech) showSpeech(speech);
      return;
    }
    currentPose = pose;
    currentFlip = newFlip;

    const src = POSES[pose] || POSES.front;
    charImg.style.opacity = '0';
    setTimeout(() => {
      charImg.src = src;
      const done = () => { charImg.style.opacity = '1'; };
      charImg.onload  = done;
      charImg.onerror = done;
    }, 280);

    if (speech) showSpeech(speech);
  }

  /* Subtle mouse parallax — character tracks cursor */
  document.addEventListener('mousemove', e => {
    mx = (e.clientX / window.innerWidth - 0.5) * 2;
  }, { passive: true });
  (function tick() { px += (mx - px) * 0.055; applyTransform(); requestAnimationFrame(tick); })();

  /* IntersectionObserver — swap pose as story-right sections scroll into view.
     Falls back to any [data-char] element on pages without .story-right (contact). */
  const scope = document.querySelector('.story-right') ? '.story-right [data-char]' : '[data-char]';
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const pose   = e.target.dataset.char   || 'front';
      const speech = e.target.dataset.speech || '';
      const flip   = e.target.dataset.flip   === 'true';
      switchChar(pose, speech, flip);
    });
  }, { threshold: 0.25 });

  document.querySelectorAll(scope).forEach(el => obs.observe(el));

  /* Fire initial pose from first data-char element on load */
  const first = document.querySelector(scope);
  if (first) {
    const pose   = first.dataset.char   || 'front';
    const flip   = first.dataset.flip   === 'true';
    const speech = first.dataset.speech || '';
    setTimeout(() => switchChar(pose, speech, flip), 350);
  }
})();

/* ─────────────────────────────────────────
   SCENE CHARACTER SYSTEM
   Legacy system — kept for compatibility.
   Returns early: no .scene-char elements exist.
───────────────────────────────────────── */
(function initSceneChars() {
  const POSES = {
    front:  'images/mascot/mascot png/main/ChatGPT_Image_Jun_16__2026__06_00_11_PM-removebg-preview.png',
    side:   'images/mascot/mascot png/another angles and poses/ChatGPT Image Jun 16, 2026, 11_39_28 PM.png',
    back3q: 'images/mascot/mascot png/another angles and poses/ChatGPT Image Jun 16, 2026, 11_51_18 PM.png',
    back:   'images/mascot/mascot png/another angles and poses/ChatGPT Image Jun 16, 2026, 11_53_06 PM.png',
  };

  const chars = document.querySelectorAll('.scene-char');
  if (!chars.length) return;

  /* ── 1. MOUSE PARALLAX ──
     Each character shifts slightly toward the cursor.
     Max 10px horizontal, 6px vertical. Lerped for smoothness. */
  let mx = 0, my = 0, px = 0, py = 0;
  document.addEventListener('mousemove', e => {
    mx = (e.clientX / window.innerWidth  - 0.5) * 2; // -1 → 1
    my = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  (function parallaxTick() {
    px += (mx - px) * 0.055;
    py += (my - py) * 0.055;
    chars.forEach(c => {
      // Base transform is scaleX flip; add parallax on top via CSS var approach
      const img = c.querySelector('img');
      const flip = c.dataset.flip === 'true' ? -1 : 1;
      if (img) img.style.transform = `scaleX(${flip}) translate(${px * 5 * flip}px, ${py * 4}px)`;
    });
    requestAnimationFrame(parallaxTick);
  })();

  /* ── 2. POSE SWITCHING ──
     Swap the src on section enter with a cross-fade. */
  function applyPose(charEl) {
    const imgEl    = charEl.querySelector('img');
    const poseName = charEl.dataset.pose  || 'front';
    const flip     = charEl.dataset.flip === 'true';
    const src      = POSES[poseName];
    if (!imgEl || !src) return;

    imgEl.style.opacity = '0';
    setTimeout(() => {
      imgEl.src = src;
      // flip is handled in the parallax tick, but set initial state
      imgEl.dataset.flip = flip ? 'true' : 'false';
      const resolve = () => { imgEl.style.opacity = '1'; };
      imgEl.onload  = resolve;
      imgEl.onerror = resolve;
    }, 300);
  }

  /* ── 3. SECTION ENTRY — pose + speech ── */
  const sectionObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const charEl = e.target.querySelector(':scope > .scene-char[data-pose]');
      if (!charEl) return;

      applyPose(charEl);

      // Show speech briefly
      setTimeout(() => charEl.classList.add('speech-on'),    700);
      setTimeout(() => charEl.classList.remove('speech-on'), 3400);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('section[id]').forEach(s => sectionObs.observe(s));

  /* ── 4. INITIAL POSE for characters already in viewport ── */
  setTimeout(() => {
    chars.forEach(charEl => {
      const r = charEl.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        applyPose(charEl);
        setTimeout(() => charEl.classList.add('speech-on'),    1300);
        setTimeout(() => charEl.classList.remove('speech-on'), 4000);
      }
    });
  }, 500);
})();

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
   SECTION TRACKING — side dots only
───────────────────────────────────────── */
(function initSectionTracking() {
  const dots = document.querySelectorAll('.sdot');
  if (!dots.length) return;

  const sections = document.querySelectorAll('section[id], #hero');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      dots.forEach(d => d.classList.toggle('active', d.dataset.section === e.target.id));
    });
  }, { threshold: 0.35 });

  sections.forEach(s => obs.observe(s));

  dots.forEach(d => {
    d.addEventListener('click', () => {
      const target = document.getElementById(d.dataset.section);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
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
  if (p.cover) {
    coverSec.innerHTML = `<img class="modal-cover-img" src="${p.cover}" alt="${p.title}" onerror="this.parentElement.innerHTML='<div class=\'modal-cover-ph\'><span>Cover</span></div>'"/>`;
  } else {
    coverSec.innerHTML = '';
  }

  // Case study sections
  const csSec = document.getElementById('m-case-study');
  if (p.casestudy) {
    const items = [
      { label: 'Problem Statement', key: 'problem' },
      { label: 'Research',          key: 'research' },
      { label: 'Design Process',    key: 'process'  },
      { label: 'Final Outcome',     key: 'outcome'  },
      { label: 'Reflection',        key: 'reflection'}
    ];
    csSec.innerHTML = items
      .filter(item => p.casestudy[item.key])
      .map(item => `<div class="cs-row"><span class="cs-label">${item.label}</span><p class="cs-body">${p.casestudy[item.key]}</p></div>`)
      .join('');
  } else {
    csSec.innerHTML = '';
  }

  // Photos — actual project photographs
  const phSec = document.getElementById('m-photos-section');
  if (p.photos?.length) {
    document.getElementById('m-photos').innerHTML = p.photos.map(s=>
      `<img src="${s}" loading="lazy" alt="" onclick="openLB('${s.replace(/'/g,"\\'")}')" />`
    ).join('');
    phSec.style.display = '';
  } else { phSec.style.display = 'none'; }

  // Video
  const vSec = document.getElementById('m-video-section');
  if (p.video) { document.getElementById('m-video').src = p.video; vSec.style.display = ''; }
  else { vSec.style.display = 'none'; }

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
   CUSTOM CURSOR  — dot + lagging ring
───────────────────────────────────────── */
(function initCursor() {
  if (!window.matchMedia('(hover: hover)').matches) return;

  const dot  = Object.assign(document.createElement('div'), { className: 'cursor-dot' });
  const ring = Object.assign(document.createElement('div'), { className: 'cursor-ring' });
  document.body.append(dot, ring);

  let mx = -200, my = -200, rx = -200, ry = -200;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px,${my}px)`;
  });

  (function lerp() {
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    ring.style.transform = `translate(${rx}px,${ry}px)`;
    requestAnimationFrame(lerp);
  })();

  // Interactive state via delegation
  document.addEventListener('mouseover', e => {
    const hit = e.target.closest('a,button,[onclick],.project-card,.feat-card,.cl,.nav-cta,.sticky');
    document.body.classList.toggle('cur-link', !!hit);
  });

  document.addEventListener('mousedown', () => document.body.classList.add('cur-click'));
  document.addEventListener('mouseup',   () => document.body.classList.remove('cur-click'));

  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = '';  ring.style.opacity = '';  });
})();

