/* ─────────────────────────────────────────
   AI / HUMAN MODE
   Runtime toggle. AI mode swaps each image to its
   mirror under images-ai/ (falling back to the real
   photo if the AI twin doesn't exist), swaps any
   [data-ai] text, and flips the glass skin via
   data-mode="ai" on <html>.
───────────────────────────────────────── */
/* set as early as possible to limit flash */
try { if (localStorage.getItem('kk-mode') === 'ai') document.documentElement.setAttribute('data-mode', 'ai'); } catch (e) {}

(function initAIMode() {
  const root = document.documentElement;
  const isAI = () => root.getAttribute('data-mode') === 'ai';

  /* Inject the toggle into the nav (so we don't touch 20 HTML files) */
  let btn = null;
  const nav = document.getElementById('nav');
  if (nav && !document.getElementById('mode-toggle')) {
    btn = document.createElement('button');
    btn.id = 'mode-toggle';
    btn.className = 'mode-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Toggle AI mode');
    btn.innerHTML =
      '<span class="mt-opt mt-human">Human</span>' +
      '<span class="mt-track"><span class="mt-thumb"></span></span>' +
      '<span class="mt-opt mt-ai">AI</span>';
    const cta = nav.querySelector('.nav-cta');
    nav.insertBefore(btn, cta || null);
  }

  function swapImages(ai) {
    document.querySelectorAll('img').forEach(img => {
      if (img.hasAttribute('data-noai')) return;
      if (!('human' in img.dataset)) img.dataset.human = img.getAttribute('src') || '';
      const human = img.dataset.human;
      if (!human) return;
      // Cover images stay identical in both modes — never swap them.
      if (/-cover\.[a-z0-9]+$/i.test(human)) return;
      let target = human;
      if (ai) {
        if (human.indexOf('work-experience/images/') === 0)
          target = human.replace('work-experience/images/', 'work-experience/images-ai/');
        else if (human.indexOf('images/') === 0)
          target = human.replace('images/', 'images-ai/');
        else return; // external / absolute — leave alone
      }
      if ((img.getAttribute('src') || '') === target) return;
      img.onerror = ai ? function () { this.onerror = null; this.src = human; } : null;
      img.src = target;
    });
  }

  function swapText(ai) {
    document.querySelectorAll('[data-ai]').forEach(el => {
      if (!('human' in el.dataset)) el.dataset.human = el.innerHTML;
      el.innerHTML = ai ? el.getAttribute('data-ai') : el.dataset.human;
    });
  }

  /* exposed so JS-injected content (project decks, marquee) can re-apply */
  window.applyMode = function () {
    const ai = isAI();
    swapImages(ai);
    swapText(ai);
    if (btn) btn.classList.toggle('is-ai', ai);
  };

  if (btn) btn.addEventListener('click', () => {
    if (isAI()) { root.removeAttribute('data-mode'); try { localStorage.setItem('kk-mode', 'human'); } catch (e) {} }
    else { root.setAttribute('data-mode', 'ai'); try { localStorage.setItem('kk-mode', 'ai'); } catch (e) {} }
    window.applyMode();
  });

  const run = () => setTimeout(window.applyMode, 0);
  if (document.readyState !== 'loading') run();
  else document.addEventListener('DOMContentLoaded', run);
})();

/* ─────────────────────────────────────────
   MOBILE NAV  — hamburger open/close
───────────────────────────────────────── */
(function initMobileNav() {
  const burger   = document.getElementById('nav-burger');
  const navLinks = document.getElementById('nav-links');
  if (!burger || !navLinks) return;

  function open()  {
    navLinks.classList.add('mobile-open');
    burger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    navLinks.classList.remove('mobile-open');
    burger.classList.remove('open');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', () =>
    navLinks.classList.contains('mobile-open') ? close() : open()
  );

  /* Close when any link is tapped */
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', close)
  );

  /* Close on Escape */
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();

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
    customPres: true,
    num: '01 / 09', cat: 'Product Design · Lighting', year: '2024',
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
    cover: 'images/mad-hatter-lamp/mad-hatter-lamp-cover.png',
    photos: []
  },
  compost: {
    customPres: true,
    num: '02 / 09', cat: 'Product Design · Sustainability', year: '2025',
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
    cover: 'images/wormy-compost-bin/wormy-compost-bin-cover.png',
    photos: []
  },
  furniture: {
    customPres: true,
    num: '03 / 09', cat: 'Furniture Design · Spatial', year: '2024',
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
    cover: 'images/curved-table/curved-table-cover.png',
    photos: []
  },
  packaging: {
    customPres: true,
    num: '04 / 09', cat: 'Packaging Design · Structural', year: '2025',
    title: 'Millet Packaging for a Healthier Tomorrow',
    desc: 'A resealable, stackable packaging system for millets — designed to solve the everyday frustration of plastic grain packets that can\'t be closed once opened, while letting customers mix their own grain combinations in a single pack.',
    casestudy: {
      problem: 'In India, millets are sold in plastic packets that tear open and cannot be resealed. Once open, you need extra clips or attachments just to keep the packet closed — an everyday frustration that discourages buying in quantity and adds clutter to the kitchen.',
      research: 'Observed how people actually store grains at home — folded packets, rubber bands, repurposed containers. Identified two key needs: a reliable reseal mechanism and a way to reduce the number of separate packets a household manages at once.',
      process: 'Designed a structure that opens cleanly and closes with a press-fit lid, so the packet functions like a container. The form was developed to stack and arrange neatly on a shelf. Internal partitions were added to allow two or more grain varieties to coexist in one single unit — reducing packaging material and giving the user flexibility.',
      outcome: 'A single millet pack that opens, uses, and closes — no clips needed. It stacks on shelf like modular units. The partition system means customers at a grocery store can select their own grain combination and have it packed together, or buy a pre-mixed variety pack.',
      reflection: 'This project taught me that good packaging solves a behaviour problem, not just an aesthetic one. The real brief was the rubber band on the kitchen counter.'
    },
    insight: 'the best packaging is the one you never have to think about twice',
    tags: ['Packaging Design','Structural Design','Resealable','Millet','Grain','Daily Use'],
    cover: 'images/millet-packaging/millet-packaging-cover.png',
    photos: []
  },
  toss: {
    customPres: true,
    num: '06 / 09', cat: 'Spatial Design · Installation', year: '2025',
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
    cover: 'images/toss-2025-typography/toss-2025-typography-cover.png',
    photos: [
      'images/toss-2025-typography/toss-2025-typography-01.jpeg',
      'images/toss-2025-typography/toss-2025-typography-02.jpeg',
      'images/toss-2025-typography/toss-2025-typography-03.jpeg',
      'images/toss-2025-typography/toss-2025-typography-04.jpeg',
      'images/toss-2025-typography/toss-2025-typography-05.jpeg',
      'images/toss-2025-typography/toss-2025-typography-06.jpeg',
      'images/toss-2025-typography/toss-2025-typography-07.jpeg',
      'images/toss-2025-typography/toss-2025-typography-08.jpeg',
      'images/toss-2025-typography/toss-2025-typography-09.jpg'
    ]
  },
  woodworking: {
    num: '07 / 09', cat: 'Material Exploration · Display', year: '2024',
    title: 'Woodworking Lab — riidl Studio',
    customPres: true,
    desc: 'A set of hands-on demonstration pieces made during my internship at the riidl woodworking lab — each one made on a different machine to show, at a glance, exactly what that tool can do.',
    casestudy: {
      problem: 'The woodworking lab at riidl, Somaiya needed demonstration pieces that could immediately communicate what each machine could do — to visiting clients, students, and collaborators who had never seen the equipment before.',
      research: 'I mapped each machine to its most legible output: the lathe\'s rotational symmetry, the Dremel\'s free-form carving, and the surprising patterns hidden in the cross-section of layered plywood.',
      process: 'I made each piece on the machine it was meant to demonstrate — turning balusters on the wood lathe, free-hand carving toys with the Dremel, and cutting and laminating plywood to reveal its striped edge as a pattern. Every piece was chosen so the process reads straight off the object.',
      outcome: 'A small collection of display pieces — turned spindles, carved toys, and patterned trays and coasters — now used in the lab to show its range. Clients understand what the equipment can do the moment they pick one up.',
      reflection: 'Designing to communicate a process rather than to fulfil a function is a different kind of brief — it requires making the invisible visible. This internship taught me that the best demonstration is always an object, never an explanation.'
    },
    insight: 'the best way to explain a machine\'s capabilities is to let the material speak for itself',
    tags: ['Wood','Lathe','Dremel','Plywood','Material Exploration','Display Design'],
    cover: 'images/woodworking-lab/woodworking-lab-cover.png',
    photos: [
      'images/woodworking-lab/woodworking-lab-09.jpeg',
      'images/woodworking-lab/woodworking-lab-07.jpeg',
      'images/woodworking-lab/woodworking-lab-08.jpeg',
      'images/woodworking-lab/woodworking-lab-01.jpeg',
      'images/woodworking-lab/woodworking-lab-03.jpeg',
      'images/woodworking-lab/woodworking-lab-06.jpeg',
      'images/woodworking-lab/woodworking-lab-02.jpeg',
      'images/woodworking-lab/woodworking-lab-10.jpeg',
      'images/woodworking-lab/woodworking-lab-11.jpeg'
    ]
  },
  stressball: {
    customPres: true,
    num: '08 / 09', cat: 'Product Design · Wellbeing', year: '2024',
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
    cover: 'images/interactive-stress-ball/interactive-stress-ball-cover.png',
    photos: [
      'images/interactive-stress-ball/interactive-stress-ball-01.jpeg',
      'images/interactive-stress-ball/interactive-stress-ball-02.jpeg',
      'images/interactive-stress-ball/interactive-stress-ball-03.jpeg',
      'images/interactive-stress-ball/interactive-stress-ball-04.jpeg',
      'images/interactive-stress-ball/interactive-stress-ball-05.jpeg',
      'images/interactive-stress-ball/interactive-stress-ball-06.jpeg',
      'images/interactive-stress-ball/interactive-stress-ball-07.jpeg',
      'images/interactive-stress-ball/interactive-stress-ball-08.jpeg'
    ],
    video: 'images/interactive-stress-ball/interactive-stress-ball-demo.mp4'
  },
  capstone: {
    customPres: true,
    num: '09 / 09', cat: 'Furniture Design · Capstone', year: '2025',
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
    cover: 'images/foldable-study-table/foldable-study-table-cover.png',
    photos: []
  },
  photoshop: {
    num: '05 / 09', cat: 'Graphic Design · Illustration', year: '2025',
    title: 'Graphic Design & Illustration',
    customPres: true,
    desc: 'A digital illustration of Lord Rama drawn in Adobe Photoshop — built up from reference into line art and full colour, then composed into a poster and printed as devotional bookmarks.',
    casestudy: {
      problem: 'A Photoshop assignment to illustrate Lord Rama — translating a reference image into an original digital painting, then carrying it through to a finished, printable graphic-design piece.',
      process: 'I worked from a reference image, tracing the figure into clean line art on a graphics tablet, then layering in colour and shading in Photoshop. The finished illustration was placed on a "Jai Shree Ram" poster layout and turned into bookmark designs.',
      outcome: 'A finished digital illustration, a typographic poster, and a set of printed bookmarks. The project sharpened my sense of colour, line, and composition — skills that carry straight into product and packaging design.',
      reflection: 'Working in Photoshop is a different kind of making from physical prototyping. Without the resistance of material, the quality of visual decisions alone determines the outcome — which makes it the most demanding and most instructive medium I work in.'
    },
    insight: '2D and 3D design teach each other — every flat composition is a spatial problem in disguise',
    tags: ['Photoshop', 'Digital Illustration', 'Graphic Design', 'Line Art', 'Typography', 'Print'],
    cover: 'images/graphic-design-illustration/graphic-design-illustration-cover.png',
    photos: [
      'images/graphic-design-illustration/graphic-design-illustration-final.jpeg',
      'images/graphic-design-illustration/graphic-design-illustration-poster.jpeg',
      'images/graphic-design-illustration/graphic-design-illustration-lineart.jpeg',
      'images/graphic-design-illustration/graphic-design-illustration-drawing.jpeg',
      'images/graphic-design-illustration/graphic-design-illustration-coloring.jpeg',
      'images/graphic-design-illustration/graphic-design-illustration-print-01.jpeg',
      'images/graphic-design-illustration/graphic-design-illustration-print-02.jpeg'
    ]
  }
};

/* ─────────────────────────────────────────
   VOLUNTEER DATA
───────────────────────────────────────── */
const VOLUNTEERS = {
  designvichar: {
    num: '01 / 04', cat: 'Community · Design Events', year: '2024',
    title: 'Design Vichaar',
    org: 'Frelo · Somaiya School of Design',
    role: 'Event Volunteer & Logistics Coordinator',
    duration: '2024',
    desc: 'Attended sessions by Punit Chawla, Dhisti Desai, Shanoo Bhatia, and others — helping coordinate event flow and manage real-time logistics for this design community gathering.',
    learnings: 'Design community events move fast — the invisible logistics work of setting up rooms, managing speaker transitions, and coordinating real-time is a design problem in itself. Exposure to practitioner voices outside the academic format was invaluable.',
    reflection: 'Being behind the scenes at a design event taught me that facilitation is design. How a space is arranged, how people move through it, how conversations are made to happen — these are designed outcomes, not accidents.',
    cover: 'images/volunteer/design-vichaar/design-vichaar-cover.png',
    photos: [
      'images/volunteer/design-vichaar/design-vichaar-01.jpeg',
      'images/volunteer/design-vichaar/design-vichaar-02.jpeg',
      'images/volunteer/design-vichaar/design-vichaar-03.jpeg',
      'images/volunteer/design-vichaar/design-vichaar-05.jpeg',
      'images/volunteer/design-vichaar/design-vichaar-06.jpeg',
      'images/volunteer/design-vichaar/design-vichaar-07.jpeg',
      'images/volunteer/design-vichaar/design-vichaar-08.jpeg',
      'images/volunteer/design-vichaar/design-vichaar-09.jpeg',
      'images/volunteer/design-vichaar/design-vichaar-10.jpeg'
    ]
  },
  permaculture: {
    num: '02 / 04', cat: 'Sustainability · Farming', year: '2024',
    title: 'Permaculture Design Course',
    org: 'Earthen Routes · Manasvini Tyagi',
    role: 'Course Participant',
    duration: 'Alibaug · 2024',
    desc: 'Explored raised beds, multilayer farming, soil health, and biodiversity — learning how nature-first systems thinking can inform sustainable and circular design practice.',
    learnings: 'Permaculture is systems design with living materials. Every principle — stacking functions, observing before acting, valuing edges — translates directly to product and spatial design. The course rewired how I think about waste, cycles, and material life.',
    reflection: 'Designing with nature rather than against it isn\'t a constraint — it\'s an invitation to be more creative. The most interesting design brief is one where the material itself teaches you what it wants to become.',
    cover: 'images/volunteer/permaculture/permaculture-cover.png',
    photos: [
      'images/volunteer/permaculture/permaculture-02.jpeg',
      'images/volunteer/permaculture/permaculture-03.jpeg',
      'images/volunteer/permaculture/permaculture-04.jpeg',
      'images/volunteer/permaculture/permaculture-05.jpeg',
      'images/volunteer/permaculture/permaculture-06.jpeg',
      'images/volunteer/permaculture/permaculture-07.jpeg',
      'images/volunteer/permaculture/permaculture-08.jpeg',
      'images/volunteer/permaculture/permaculture-09.jpeg',
      'images/volunteer/permaculture/permaculture-10.jpeg',
      'images/volunteer/permaculture/permaculture-11.jpeg',
      'images/volunteer/permaculture/permaculture-12.jpeg'
    ]
  },
  siif: {
    num: '03 / 04', cat: 'Festival · Workshop Design', year: '2025',
    title: 'SIIF — Design Workshop Lead',
    org: 'Somaiya Innovation & Impact Festival',
    role: 'Design Workshop Lead',
    duration: '3 Days · 2025',
    desc: 'Led the Design Workshop team at a 3-day campus festival — from curation and pitching to organising, decorating, and facilitating sessions during the event.',
    learnings: 'Running a workshop at scale means your design decisions are tested in real time by hundreds of people. Spatial layout, material choices, session pacing — everything communicates. The gap between the designed experience and the lived one is always instructive.',
    reflection: 'Leadership in a festival context is fundamentally about keeping the energy of a space alive. This role taught me to design not just objects, but atmospheres — to think about what a room feels like and how people move through it.',
    cover: 'images/volunteer/siif/siif-cover.png',
    photos: [
      'images/volunteer/siif/siif-01.jpg',
      'images/volunteer/siif/siif-02.jpg',
      'images/volunteer/siif/siif-03.jpg',
      'images/volunteer/siif/siif-04.jpg',
      'images/volunteer/siif/siif-05.jpg',
      'images/volunteer/siif/siif-07.jpg',
      'images/volunteer/siif/siif-08.jpg'
    ]
  },
  pottery: {
    num: '04 / 04', cat: 'Craft · Making', year: '2026',
    title: 'Pottery Workshop',
    org: 'Community Craft Studio',
    role: 'Workshop Participant',
    duration: '2026',
    desc: 'A hands-on pottery workshop exploring wheel-throwing and hand-building techniques — a direct encounter with material resistance and the deeply iterative nature of making.',
    learnings: 'Clay is one of the most honest materials I\'ve worked with — it responds immediately to every decision and forgives nothing. The workshop reinforced how much design understanding lives in the hands, not just the mind. Centering clay on a wheel taught me more about balance and tension than any studio brief.',
    reflection: 'Pottery is one of the oldest forms of design. Every vessel is a solution to a problem: hold, pour, store. Sitting at a wheel reminded me that before every product is a sketch, there is a material — and learning to listen to it changes how you design with everything else.',
    cover: 'images/volunteer/pottery/pottery-cover.png',
    photos: [
      'images/volunteer/pottery/pottery-01.jpeg',
      'images/volunteer/pottery/pottery-02.jpeg',
      'images/volunteer/pottery/pottery-03.jpeg',
      'images/volunteer/pottery/pottery-04.jpeg',
      'images/volunteer/pottery/pottery-05.jpeg',
      'images/volunteer/pottery/pottery-06.jpeg',
      'images/volunteer/pottery/pottery-07.jpeg',
      'images/volunteer/pottery/pottery-08.jpeg',
      'images/volunteer/pottery/pottery-09.jpeg',
      'images/volunteer/pottery/pottery-10.jpeg'
    ]
  }
};

/* ─────────────────────────────────────────
   HOME CINEMATIC CHARACTER
   Sticky left panel — character zooms out
   from face close-up (scale 2.5) to full
   body (scale 1.0) as user scrolls.
   Pose switches at scroll phase thresholds.
   Matches mrazek-tomas interaction pattern.
───────────────────────────────────────── */
(function initHomeCinematic() {
  if (document.body.dataset.page !== 'home') return;

  const charZoom  = document.getElementById('char-zoom');
  const charPara  = document.getElementById('char-para');
  const charPanel = document.getElementById('char-panel');
  const charImg   = document.getElementById('hc-main');
  const speechEl  = document.getElementById('hc-speech');
  const editorialBand = document.getElementById('editorial-band');
  if (!charZoom) return;

  const POSES = {
    front:  'images/mascot/mascot-front.png',
    side:   'images/mascot/mascot-side.png',
    back3q: 'images/mascot/mascot-back3q.png',
    back:   'images/mascot/mascot-back.png',
  };

  const SPEECH = {
    0: 'hello, welcome ✦',
    1: 'design is everywhere',
    2: 'three years of making',
    3: 'materials are my first language',
  };

  let scale       = 2.5;
  let currentPose = 'front';
  let lastPhase   = -1;
  let speechTimer = null;
  let mx = 0, px = 0, t = 0;

  /* Cubic ease-out */
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function switchPose(pose) {
    if (pose === currentPose) return;
    currentPose = pose;
    charImg.style.opacity = '0';
    setTimeout(() => {
      charImg.src = POSES[pose];
      const done = () => { charImg.style.opacity = '1'; };
      charImg.onload  = done;
      charImg.onerror = done;
    }, 280);
  }

  function showSpeech(text) {
    if (!speechEl) return;
    speechEl.textContent = text;
    speechEl.classList.remove('visible');
    if (speechTimer) clearTimeout(speechTimer);
    setTimeout(() => speechEl.classList.add('visible'), 500);
    speechTimer = setTimeout(() => speechEl.classList.remove('visible'), 3500);
  }

  /* Scroll-driven zoom + phase-based pose switching */
  function onScroll() {
    const cinematic = document.getElementById('home-cinematic');
    if (!cinematic) return;

    const totalScroll = cinematic.offsetHeight - window.innerHeight;
    const progress    = totalScroll > 0
      ? Math.min(Math.max(window.scrollY / totalScroll, 0), 1)
      : 0;

    /* Zoom: stays zoomed-in as a background on desktop (2.4 → 1.6).
       On mobile the mascot sits in a small sticky banner, so use a
       gentler range (2.2 → 1.0) that keeps the whole figure in frame. */
    const zoomP  = Math.min(progress / 0.42, 1);
    const mobile = window.innerWidth <= 620;
    scale = mobile
      ? 2.2 - (1.2 * easeOut(zoomP))
      : 2.4 - (0.8 * easeOut(zoomP));

    /* Phase thresholds → pose + speech */
    const phase = progress < 0.15 ? 0
                : progress < 0.52 ? 1
                : progress < 0.76 ? 2
                : 3;

    if (phase !== lastPhase) {
      lastPhase = phase;
      const poses = ['front', 'front', 'front', 'front'];
      switchPose(poses[phase]);
      showSpeech(SPEECH[phase]);
    }

    /* Fade char-panel out in the last 24% of cinematic scroll */
    if (charPanel) {
      if (progress > 0.76) {
        const fadeP = Math.min((progress - 0.76) / 0.24, 1);
        charPanel.style.opacity = String(1 - fadeP);
      } else {
        charPanel.style.opacity = '1';
      }
    }

    /* As the mascot vanishes, slide the editorial quote to screen center */
    if (editorialBand) {
      editorialBand.classList.toggle('is-centered', progress > 0.8);
    }
  }

  /* Measure the exact shift needed to centre the quote in the viewport.
     Reads the inner's natural (untransformed) centre, then sets --quote-shift. */
  function measureQuoteShift() {
    if (!editorialBand) return;
    const inner = editorialBand.querySelector('.editorial-inner');
    if (!inner) return;
    const prevTransition = inner.style.transition;
    const prevTransform  = inner.style.transform;
    inner.style.transition = 'none';
    inner.style.transform  = 'none';                 // measure natural position
    const rect = inner.getBoundingClientRect();
    const naturalCenter = rect.left + rect.width / 2;
    const shift = Math.round(window.innerWidth / 2 - naturalCenter);
    inner.style.transform  = prevTransform;          // restore (class controls it)
    void inner.offsetWidth;                           // flush before re-enabling transition
    inner.style.transition = prevTransition;
    editorialBand.style.setProperty('--quote-shift', shift + 'px');
  }
  measureQuoteShift();
  window.addEventListener('load', measureQuoteShift);
  window.addEventListener('resize', measureQuoteShift);

  /* Mouse parallax — drives charPara horizontal offset */
  document.addEventListener('mousemove', e => {
    mx = (e.clientX / window.innerWidth - 0.5) * 2;
  }, { passive: true });

  /* RAF: apply parallax + idle float */
  (function tick() {
    t  += 0.008;
    px += (mx - px) * 0.04;

    /* Parallax on outer wrapper (screen-space, unaffected by zoom) */
    if (charPara) charPara.style.transform = `translateX(${px * 5}px)`;

    /* Zoom + idle float on zoom wrapper */
    if (charZoom) {
      const isHero = scale > 1.6;
      const idleY  = isHero ? Math.sin(t * Math.PI) * (scale - 1) * 8 : 0;
      charZoom.style.transform = `scale(${scale}) translateY(${idleY}px)`;
    }

    requestAnimationFrame(tick);
  })();

  window.addEventListener('scroll', onScroll, { passive: true });

  /* Boot */
  onScroll();
  showSpeech(SPEECH[0]);
})();

/* ─────────────────────────────────────────
   FEATURED GALLERY  (index.html)
   Horizontal drag-to-scroll + staggered
   card reveal when section enters viewport.
───────────────────────────────────────── */
(function initDisciplines() {
  if (document.body.dataset.page !== 'home') return;
  const track = document.getElementById('disc-track');
  if (!track) return;

  const DISC = [
    { n: '01', name: 'Product Design', subs: [
      { t: 'Mad Hatter Lamp',         s: 'Lighting',       href: 'work-experience/mad-hatter-lamp.html',          img: 'work-experience/images/mad-hatter-lamp/mad-hatter-lamp-cover.png' },
      { t: 'Interactive Stress Ball', s: 'Wellbeing',      href: 'work-experience/interactive-stress-ball.html',  img: 'work-experience/images/interactive-stress-ball/interactive-stress-ball-cover.png' },
      { t: 'Wormy — Compost Bin',     s: 'Sustainability', href: 'work-experience/wormy-compost-bin.html',        img: 'work-experience/images/wormy-compost-bin/wormy-compost-bin-cover.png' },
    ]},
    { n: '02', name: 'Furniture Design', subs: [
      { t: 'Curved Table',         s: 'Spatial',  href: 'work-experience/curved-table.html',         img: 'work-experience/images/curved-table/curved-table-cover.png' },
      { t: 'Foldable Study Table', s: 'Capstone', href: 'work-experience/foldable-study-table.html', img: 'work-experience/images/foldable-study-table/foldable-study-table-cover.png' },
    ]},
    { n: '03', name: 'Spatial & Installation', subs: [
      { t: 'TOSS 2025 — 3D Typography', s: 'Installation', href: 'work-experience/toss-2025-typography.html', img: 'work-experience/images/toss-2025-typography/toss-2025-typography-cover.png' },
    ]},
    { n: '04', name: 'Graphic & Packaging', subs: [
      { t: 'Graphic Design & Illustration', s: 'Illustration', href: 'work-experience/graphic-design-illustration.html', img: 'work-experience/images/graphic-design-illustration/graphic-design-illustration-cover.png' },
      { t: 'Millet Packaging',              s: 'Identity',     href: 'work-experience/millet-packaging.html',            img: 'work-experience/images/millet-packaging/millet-packaging-cover.png' },
    ]},
    { n: '05', name: 'Material & Craft', subs: [
      { t: 'Woodworking Lab — riidl', s: 'Display', href: 'work-experience/woodworking-lab.html', img: 'work-experience/images/woodworking-lab/woodworking-lab-cover.png' },
    ]},
  ];

  const cardHTML = d => `
    <div class="disc-card">
      <div class="disc-head">
        <span class="disc-num">${d.n}</span>
        <h3 class="disc-name">${d.name}</h3>
        <span class="disc-count">${d.subs.length} project${d.subs.length > 1 ? 's' : ''}</span>
      </div>
      <div class="disc-subs">
        ${d.subs.map(p => `
          <a class="disc-sub" href="${p.href}">
            <span class="disc-sub-img"><img src="${p.img}" alt="${p.t}" loading="lazy" onerror="this.parentElement.style.background='var(--border)'"/></span>
            <span class="disc-sub-text"><span class="disc-sub-cat">${p.s}</span><span class="disc-sub-title">${p.t}</span></span>
          </a>`).join('')}
      </div>
    </div>`;

  const set = DISC.map(cardHTML).join('');
  track.innerHTML = set + set; // duplicate set → seamless CSS marquee loop
})();

/* ─────────────────────────────────────────
   WORK FILTERS  (work.html)
   Discipline derived from each card's .proj-cat
───────────────────────────────────────── */
(function initWorkFilters() {
  if (document.body.dataset.page !== 'work') return;
  const chips = document.querySelectorAll('.wf-chip');
  const cards = document.querySelectorAll('.project-grid .project-card');
  if (!chips.length || !cards.length) return;

  const discOf = card => {
    const cat = card.querySelector('.proj-cat');
    return cat ? cat.textContent.trim().split(/[\s·]+/)[0].toLowerCase() : '';
  };

  chips.forEach(chip => chip.addEventListener('click', () => {
    const f = chip.dataset.filter;
    const allowed = f.split(',');
    chips.forEach(c => c.classList.toggle('is-active', c === chip));
    cards.forEach(card => {
      const show = f === 'all' || allowed.includes(discOf(card));
      card.style.display = show ? '' : 'none';
    });
  }));
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
    front:  'images/mascot/mascot-front.png',
    side:   'images/mascot/mascot-side.png',
    back3q: 'images/mascot/mascot-back3q.png',
    back:   'images/mascot/mascot-back.png',
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
    front:  'images/mascot/mascot-front.png',
    side:   'images/mascot/mascot-side.png',
    back3q: 'images/mascot/mascot-back3q.png',
    back:   'images/mascot/mascot-back.png',
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
   BURST PARTICLES  (fire from card on click)
───────────────────────────────────────── */
function spawnBurst(cardEl) {
  const rect = cardEl.getBoundingClientRect();
  const cx = rect.left + rect.width  * 0.5;
  const cy = rect.top  + rect.height * 0.42; // aim toward image area
  const glyphs = ['✦', '◆', '○', '×', '—', '✧', '·', '◇'];
  const count  = 10;
  for (let i = 0; i < count; i++) {
    const el  = document.createElement('span');
    el.className = 'modal-burst';
    el.textContent = glyphs[i % glyphs.length];
    const angle = (i / count) * 360 + Math.random() * 18;
    const dist  = 55 + Math.random() * 70;
    const dx    = Math.cos(angle * Math.PI / 180) * dist;
    const dy    = Math.sin(angle * Math.PI / 180) * dist;
    const size  = (0.55 + Math.random() * 0.65).toFixed(2);
    el.style.cssText = `left:${cx}px;top:${cy}px;font-size:${size}rem;transform:translate(-50%,-50%)`;
    document.body.appendChild(el);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0.2)`;
      el.style.opacity   = '0';
    }));
    setTimeout(() => el.remove(), 850);
  }
}

/* ─────────────────────────────────────────
   PHOTO COLLAGE BUILDER
   1=full  2=side-by-side  3=large+2stacked
   4=2x2 grid  5+=feature+strip
───────────────────────────────────────── */
function makeCollage(photos) {
  if (!photos || !photos.length) return '';
  const esc = s => s.replace(/'/g, "\\'");
  const img = s => `<img src="${s}" alt="" loading="lazy" onclick="openLB(this.src)"/>`;
  const n = photos.length;
  if (n === 1) return `<div class="pc pc-1">${img(photos[0])}</div>`;
  if (n === 2) return `<div class="pc pc-2">${photos.map(img).join('')}</div>`;
  if (n === 3) return `<div class="pc pc-3">${photos.map(img).join('')}</div>`;
  if (n === 4) return `<div class="pc pc-4">${photos.map(img).join('')}</div>`;
  return `<div class="pc pc-n"><img class="pc-feat" src="${photos[0]}" alt="" loading="lazy" onclick="openLB(this.src)"/><div class="pc-strip">${photos.slice(1).map(img).join('')}</div></div>`;
}
/* ─────────────────────────────────────────
   CURVED TABLE CUSTOM PRESENTATION BUILDER
───────────────────────────────────────── */
function buildFurniturePresentation(p) {
  const esc = s => s.replace(/'/g, "\\'");
  const i = (src, alt) => `<img src="${src}" alt="${alt||''}" loading="lazy" onclick="openLB(this.src)"/>`;
  const base  = 'images/curved-table/';

  // Assets
  const render  = base + 'curved-table-render.png';
  const sk1     = base + 'curved-table-sketch.png';   // measurement sketch (bg removed)
  const sk2     = base + 'curved-table-sketch.png';
  const pt1     = base + 'curved-table-prototype-01.jpeg';
  const pt2     = base + 'curved-table-prototype-02.jpeg';
  const pt3     = base + 'curved-table-prototype-03.jpeg';
  const pt4     = base + 'curved-table-prototype-04.jpeg';
  // Process photos in chronological order
  const p1 = base + 'curved-table-process-01.jpg';  // drilling curved panel
  const p2 = base + 'curved-table-process-02.jpg';  // drilling edge
  const p3 = base + 'curved-table-process-03.jpg';  // curved formers
  const p4 = base + 'curved-table-process-04.jpg';  // raw structure assembled
  const p5 = base + 'curved-table-process-05.jpg';  // laminating surface
  const p6 = base + 'curved-table-process-06.jpg';  // top view post-laminate
  const p7 = base + 'curved-table-process-07.jpg';  // front view complete
  const p8 = base + 'curved-table-process-08.jpg';  // front slider visible
  let h = '';

  // ── CARD 1: INTRO — title + desc left | clean render right ──
  h += `<div class="pcard pcard-intro pres-r">
    <div class="pcard-intro-body">
      <div class="pcard-intro-text">
        <span class="pcard-eyebrow">03 / 09 &nbsp;&middot;&nbsp; Furniture Design &middot; Spatial</span>
        <h2 class="pcard-title">Curved Table with Storage and Relaxation Space</h2>
        <p class="pcard-desc">A furniture piece that does more than hold things &mdash; it carves out a space for the body to rest, think, and retreat within a single object.</p>
      </div>
      <div class="pcard-intro-foot"><span class="pcard-year">2024</span></div>
    </div>
    <div class="pcard-intro-img">${i(render, 'Curved Table render')}</div>
  </div>`;

  // ── CARD 2: BRIEF — goal + user needs text only ──
  h += `<div class="pcard pcard-sec pres-r">
    <div class="pcard-sec-text">
      <span class="pcard-label">Brief</span>
      <h3 class="pcard-sec-h">The Goal</h3>
      <p class="pcard-body">To create furniture that is practical, comfortable, and looks good &mdash; fitting well into modern homes. The design integrates a curved tabletop with a leg relaxation alcove below, questioning the boundary between work surface and personal space.</p>
    </div>
    <div class="pcard-sec-text" style="border-left:1px solid rgba(68,50,35,0.1)">
      <span class="pcard-label">User Needs</span>
      <div class="pcard-needs-list">
        <div class="pcard-need"><strong>Storage</strong><span>Help people keep their things organised and reduce mess.</span></div>
        <div class="pcard-need"><strong>Comfort</strong><span>Easy to use and convenient for daily activities.</span></div>
        <div class="pcard-need"><strong>Looks</strong><span>Stylish with a unique curved tabletop &mdash; modern and elegant, fitting different home interiors.</span></div>
        <div class="pcard-need"><strong>Durability</strong><span>Strong and long-lasting, made from good materials.</span></div>
        <div class="pcard-need"><strong>Versatility</strong><span>Useful for working, relaxing, or storing items.</span></div>
      </div>
    </div>
  </div>`;

  // ── PROCESS SCATTER 1: Early making — drilling curved panels ──
  h += `<div class="pcard pcard-sec pres-r">
    <div class="pc pc-2 pc--fill">${i(p1)}${i(p2)}</div>
    <div class="pcard-sec-text">
      <span class="pcard-label">Making</span>
      <h3 class="pcard-sec-h">Bending &amp; Forming</h3>
      <p class="pcard-body">The curved tabletop required bending thin plywood sheets around a form and fixing them in place while wet &mdash; a technique that needed several attempts to get the radius right without cracking the grain.</p>
    </div>
  </div>`;

  // ── CARD 3: TARGET AUDIENCE ──
  h += `<div class="pcard pcard-audience pres-r">
    <span class="pcard-label">Target Audience</span>
    <div class="pcard-audience-grid">
      <div class="pcard-aud-item">
        <h4>Working Professionals</h4>
        <p>Individuals looking for a comfortable, stylish desk for home offices or workspaces who need practical storage solutions for work essentials.</p>
      </div>
      <div class="pcard-aud-item">
        <h4>Students</h4>
        <p>Those who need an ergonomic desk for studying, writing, or computer use. The storage keeps books, supplies, and gadgets organised in one place.</p>
      </div>
      <div class="pcard-aud-item">
        <h4>Minimalist Enthusiasts</h4>
        <p>People who prefer sleek, space-saving furniture that complements modern interiors without adding visual clutter.</p>
      </div>
    </div>
  </div>`;

  // ── CARD 4: PROTOTYPE — 3 cardboard model photos ──
  h += `<div class="pcard pcard-sec pcard-sec--flip pres-r">
    <div class="pc pc-3" style="align-self:stretch">${i(pt1)}${i(pt2)}${i(pt3)}</div>
    <div class="pcard-sec-text">
      <span class="pcard-label">Prototype</span>
      <h3 class="pcard-sec-h">First Physical Model</h3>
      <p class="pcard-body">A compact cardboard prototype with an inbuilt laptop stand for better ergonomics, a half-slider in the middle for added functionality, and side storage compartments for efficient organisation.</p>
      <p class="pcard-body" style="margin-top:1rem">The model allowed testing of proportions, ergonomic reach, and the structural behaviour of the curved form before committing to full-scale fabrication in plywood.</p>
    </div>
  </div>`;

  // ── CARD 4b: SKETCH top + 2 process photos bottom ──
  h += `<div class="pcard pres-r">
    <div class="pc pc-stack">
      <div class="pc-stack-top"><img src="${pt4}" alt="Prototype sketch" onclick="openLB(this.src)"/></div>
      <div class="pc-stack-bottom">${i(p3)}${i(p4)}</div>
    </div>
  </div>`;

  // ── CARD 5: SKETCHES & CONCEPT + MEASUREMENTS (combined) ──
  h += `<div class="pcard pcard-sec pres-r">
    <div class="pcard-sec-text">
      <span class="pcard-label">Sketches &amp; Concept</span>
      <h3 class="pcard-sec-h">Form &amp; Dimensions</h3>
      <p class="pcard-body">Ergonomic considerations drove the form: the curved tabletop follows the natural arc of the arm, while the space beneath creates a dedicated leg relaxation zone.</p>
      <p class="pcard-body" style="margin-top:1rem">The two defining features: a <strong>curved tabletop</strong> for comfort and a <strong>leg relaxation alcove</strong> that turns under-desk space into intentional design.</p>
      <ul class="pcard-cad-list" style="margin-top:1.4rem">
        <li>Width: <strong>3 ft</strong></li>
        <li>Depth: <strong>1.5 ft</strong></li>
        <li>Height: <strong>2 ft</strong></li>
        <li>Side storage: <strong>1.25 ft &times; 1 ft 10 in</strong></li>
        <li>Curved top thickness: <strong>7 in</strong></li>
      </ul>
    </div>
    <div class="pc pc--sketch pc--sketch-single" style="align-self:stretch">${i(sk1, 'Front measurement sketch')}</div>
  </div>`;

  // ── CARD 6: TECHNICAL DETAILS — text only ──
  h += `<div class="pcard pcard-tech-mat pres-r">
    <div class="pcard-tech-col">
      <div class="pcard-tech-text">
        <span class="pcard-label">Technical Details</span>
        <ul class="pcard-cad-list">
          <li><strong>Joinery:</strong> Screws, glue, L Bihari hinges, and curved plywood techniques</li>
          <li><strong>Hardware:</strong> Drawer channels for the sliding shelf</li>
          <li><strong>Structure:</strong> Load-bearing design &mdash; no visible hardware on exterior faces</li>
        </ul>
      </div>
    </div>
    <div class="pcard-tech-col pcard-tech-col--right">
      <div class="pcard-tech-text">
        <span class="pcard-label">Materials &amp; Manufacturing</span>
        <ul class="pcard-cad-list">
          <li><strong>Material:</strong> Plywood for structural durability, laminate for surface aesthetics</li>
          <li><strong>Why not lightweight:</strong> Sturdiness for daily use was the priority</li>
          <li><strong>Process:</strong> Manual cutting, assembly, and finishing &mdash; hands-on throughout</li>
        </ul>
      </div>
    </div>
  </div>`;

  // ── PROCESS SCATTER 3: Laminating + post-laminate top view ──
  h += `<div class="pcard pcard-sec pcard-sec--flip pres-r">
    <div class="pc pc-2 pc--fill">${i(p5)}${i(p6)}</div>
    <div class="pcard-sec-text">
      <span class="pcard-label">Surface Treatment</span>
      <h3 class="pcard-sec-h">Laminating &amp; Finishing</h3>
      <p class="pcard-body">Laminate sheets were applied over the plywood surface for durability and a clean aesthetic. The curved edge required careful trimming to follow the radius without lifting or bubbling at the edges.</p>
    </div>
  </div>`;

  // ── CARD 7: CAD MODELS — Fusion 360 text + renders ──
  h += `<div class="pcard pcard-outcome pres-r">
    <span class="pcard-label">CAD Models &amp; Renders</span>
    <h3 class="pcard-sec-h" style="margin-bottom:0.8rem">Modelled in Autodesk Fusion 360</h3>
    <p class="pcard-brief-body">The final form was fully modelled in <strong>Autodesk Fusion 360</strong> before fabrication began. The 3D model confirmed the proportions, the curvature of the tabletop, the internal shelf spacing, and the slider mechanism clearances before any wood was cut.</p>
  </div>`;
  h += `<div class="pcard pres-r"><div class="pc-cad">${i(base + 'curved-table-cad-01.png')}${i(base + 'curved-table-cad-02.png')}${i(base + 'curved-table-cad-03.png')}</div></div>`;

  // ── PROCESS SCATTER 4: Completed table in workshop ──
  h += `<div class="pcard pres-r">${makeCollage([p7, p8])}</div>`;

  // ── CARD 8: FINAL PRODUCT — finished photos (equal 3-up grid) ──
  h += `<div class="pcard pcard-slide-full pres-r">
    <span class="pcard-label pcard-label--pad">Final Product</span>
    <div class="pc-final">${i(base + 'curved-table-final-01.jpeg')}${i(base + 'curved-table-final-02.jpeg')}${i(base + 'curved-table-final-03.jpeg')}</div>
  </div>`;

  // ── QUOTE ──
  h += `<div class="pcard pcard-quote pres-r">
    <blockquote>&ldquo;furniture is the smallest architecture &mdash; it shapes how we inhabit a room&rdquo;</blockquote>
  </div>`;

  // ── END ──
  h += `<div class="pcard pcard-end pres-r">
    <p class="pcard-reflection">Furniture design at its most interesting operates at the scale of the body and the room simultaneously. This piece taught me to think about furniture as the smallest architecture.</p>
    <div class="pcard-tags">
      ${['Furniture Design','Ergonomics','Curved Plywood','Autodesk Fusion 360','Spatial Design','Wood','Fabrication'].map(t=>`<span class="pcard-tag">${t}</span>`).join('')}
    </div>
  </div>`;

  return h;
}
/* ─────────────────────────────────────────
   CAPSTONE CUSTOM PRESENTATION BUILDER
───────────────────────────────────────── */
function buildCapstonePresentation(p) {
  const esc = s => s.replace(/'/g, "\\'");
  const img = (src, alt) => `<img src="${src}" alt="${alt || ''}" loading="lazy" onclick="openLB(this.src)"/>`;
  const base = 'images/foldable-study-table/';
  const ph   = base;
  const cad  = base;
  let h = '';

  // 1. INTRO
  h += `<div class="pcard pcard-intro pres-r">
    <div class="pcard-intro-body">
      <div class="pcard-intro-text">
        <span class="pcard-eyebrow">09 / 09 &nbsp;&middot;&nbsp; Furniture Design &middot; Capstone</span>
        <h2 class="pcard-title">Foldable Study Table for Children in Compact Homes</h2>
        <p class="pcard-desc">A human-centred capstone project addressing how children study in small urban homes &mdash; balancing spatial constraints with ergonomics through deep research and a fully fabricated prototype.</p>
        <div class="pcard-brief">
          <span class="pcard-label">The Brief</span>
          <p class="pcard-brief-body">In Mumbai&rsquo;s compact 1&ndash;2 BHK apartments, children rarely have a dedicated study space. The shared kitchen table is impermanent and not scaled to a child&rsquo;s body &mdash; resulting in poor posture, disrupted focus, and no ownership over the act of studying.</p>
        </div>
      </div>
      <div class="pcard-intro-foot">
        <span class="pcard-year">2025</span>
      </div>
    </div>
    <div class="pcard-intro-img pcard-intro-img--lg">${img(ph + 'foldable-study-table-fab-04.jpg', 'The folded study table carried like a briefcase')}</div>
  </div>`;

  // 2. CONTEXT & USER RESEARCH (text)
  h += `<div class="pcard pcard-outcome pres-r">
    <span class="pcard-label">Research</span>
    <h3 class="pcard-sec-h" style="margin:0.4rem 0 0.9rem">Wood Furniture in the Indian Home</h3>
    <p class="pcard-brief-body">Research started with mapping traditional Indian furniture archetypes &mdash; Sandook, Almari, Jaali Cabinets, and storage units with built-in mechanisms. These revealed how Indian households have always valued furniture that does dual duty: store, divide, and display.</p>
    <p class="pcard-brief-body" style="margin-top:1rem">Field visits across 8 families in Ghatkopar, Kurla, and Chembur (1&ndash;2 BHK homes) confirmed the target user: the <strong>low to middle income group</strong>, for whom furniture must be functional and space-efficient above all else.</p>
    <div class="pcard-tag-row" style="margin-top:1.3rem">
      <span class="pcard-tag">Function</span><span class="pcard-tag">Multi-use</span><span class="pcard-tag">Compact</span><span class="pcard-tag">Affordable</span>
    </div>
  </div>`;

  // 3. REQUIREMENTS
  h += `<div class="pcard pcard-reqs pres-r">
    <span class="pcard-label">List of Requirements</span>
    <div class="pcard-reqs-grid">
      ${[
        ['Compact',          'Folds to one-third its size when not in use'],
        ['Multifunctional',  'Does more than one job at a time'],
        ['Affordable',       'Cost-effective &mdash; target range ₹4,000&ndash;5,000'],
        ['Ergonomic',        'Comfortable posture; 8&ndash;10 users confirm positive feedback'],
        ['Lightweight',      'Max 12&ndash;18 kg; one person can lift and carry'],
        ['Portable',         'Age 12+ can carry independently when folded'],
        ['Durable',          'Lasts at least 4&ndash;5 years; does not loosen or break easily'],
        ['Repairable',       'Parts easily replaceable; 6&ndash;8 users confirm repairability'],
        ['Safe',             'No sharp edges; pinch-free mechanism throughout operation'],
        ['Sustainable',      'Eco-friendly material; life cycle assessment planned'],
      ].map(([t, d]) => `<div class="pcard-req-item"><strong>${t}</strong><span>${d}</span></div>`).join('')}
    </div>
  </div>`;

  // 4a. IDEATION — Mind Map (text + board photo) + full-width mind map
  h += `<div class="pcard pcard-sec pcard-sec--flip pres-r" style="grid-template-columns:1.85fr 1fr; min-height:82vh;">
    <div class="pc pc-1 pc--fill">${img(ph + 'foldable-study-table-final-04.jpeg', 'Building the mind map board')}</div>
    <div class="pcard-sec-text">
      <span class="pcard-label">Ideation</span>
      <h3 class="pcard-sec-h">The Mind Map</h3>
      <p class="pcard-body">The design space was opened through a mind map covering folding mechanism, workspace, book storage, wall mounting, charging port, modular add-ons, cup holder, laptop stand, and integrated lighting.</p>
    </div>
  </div>`;

  // 4b. MORPHOLOGICAL CHART — chart beside its text
  h += `<div class="pcard pcard-sec pcard-sec--flip pres-r">
    <div class="pc-doc">${img(ph + 'foldable-study-table-morph-01.png', 'Morphological chart')}</div>
    <div class="pcard-sec-text">
      <span class="pcard-label">Morphological Chart</span>
      <h3 class="pcard-sec-h">Mapping Every Parameter</h3>
      <p class="pcard-body">A full morphological chart mapped every parameter &mdash; table-top surface, mechanism type, leg structure, storage form, locking system, portability, lighting, accessories, and joinery &mdash; before the strongest combinations were pulled into three concepts.</p>
    </div>
  </div>`;

  // 5. THREE CONCEPTS
  h += `<div class="pcard pcard-concepts pres-r">
    <span class="pcard-label">Concept Generation</span>
    <div class="pcard-concepts-grid">
      <div class="pcard-concept">
        <span class="pcard-concept-num">01</span>
        <h4>Flip Fold Study Table</h4>
        <p>Top splits and flips out using a hinge mechanism with hydraulic support. Detachable legs slot into the table top. Storage inside the body. Hook-lock system when in use. Folds flat with built-in leg slots.</p>
      </div>
      <div class="pcard-concept pcard-concept--selected">
        <span class="pcard-concept-num">02</span>
        <h4>Split Fold Study Table <em>Selected</em></h4>
        <p>Table top splits in two and folds inward &mdash; legs fold upward simultaneously. Slim storage drawer under the surface. Gyro cup holder integrated on top. Most compact when folded, simplest for a child to operate.</p>
      </div>
      <div class="pcard-concept">
        <span class="pcard-concept-num">03</span>
        <h4>Untitled Study Table</h4>
        <p>Legs and top fold inside the table like a book; opens outward when in use. LED strip lighting. Gyro cup holder. Compact flat form but more complex folding action for a young child.</p>
      </div>
    </div>
  </div>`;

  // 6. CONCEPT SELECTION (text) + full-width chart
  h += `<div class="pcard pcard-outcome pres-r">
    <span class="pcard-label">Concept Selection</span>
    <h3 class="pcard-sec-h" style="margin:0.4rem 0 0.9rem">Weighted Criteria &mdash; Concept 2 Chosen</h3>
    <p class="pcard-brief-body">All three concepts were scored against weighted design criteria: Compactness (20%), Repairability (15%), Cost (15%), Ergonomics (10%), Aesthetics (10%), Durability (10%), Safety (10%), Multifunctionality (10%).</p>
    <p class="pcard-brief-body" style="margin-top:1rem">Concept 2 &mdash; the Split Fold &mdash; scored highest. Its simultaneous top-and-leg fold achieved the greatest space reduction, used the fewest mechanical parts, and was the most intuitive for a child to operate independently.</p>
  </div>`;

  // 7. CAD DEVELOPMENT — Fusion 360 (text) + full-width renders
  h += `<div class="pcard pcard-outcome pres-r">
    <span class="pcard-label">CAD Development</span>
    <h3 class="pcard-sec-h" style="margin:0.4rem 0 0.9rem">Modelled in Autodesk Fusion 360</h3>
    <p class="pcard-brief-body">The final form was developed as a full parametric model in <strong>Autodesk Fusion 360</strong>. Every joint, hinge point, and panel thickness was modelled and checked for clearance before any cutting began. The split-fold mechanism was animated and simulated to confirm the folding motion worked without pinch points or binding.</p>
    <ul class="pcard-cad-list" style="margin-top:1.2rem">
      <li>Software: <strong>Autodesk Fusion 360</strong></li>
      <li>Table surface height: <strong>52 cm</strong> (correct for children aged 6&ndash;12)</li>
      <li>Folded depth: <strong>under 15 cm</strong></li>
      <li>Material: <strong>Birch plywood</strong> with steel hinge inserts</li>
      <li>Weight: <strong>under 14 kg</strong></li>
      <li>Joinery: wooden dowels + screws and bolts</li>
    </ul>
  </div>`;
  h += `<div class="pcard pres-r"><div class="pc-fit" style="grid-template-columns:0.946fr 1.087fr">${img(cad + 'foldable-study-table-render-white.png', 'Fusion 360 render')}${img(cad + 'foldable-study-table-render-4.png', 'Fusion 360 render')}</div></div>`;

  // 8. MAKING — Cut & Shaped (sander)
  h += `<div class="pcard pcard-sec pres-r">
    <div class="pcard-sec-text">
      <span class="pcard-label">Making · Fabrication</span>
      <h3 class="pcard-sec-h">Cut &amp; Shaped by Hand</h3>
      <p class="pcard-body">Panels were first <strong>CNC-cut</strong> from birch plywood to exact dimensions straight from the Fusion 360 model.</p>
      <p class="pcard-body" style="margin-top:1rem">I then <strong>shaped and smoothed every edge by hand on the sander</strong> until the surfaces were clean and ready to assemble.</p>
    </div>
    <div class="pc pc-2 pc--fill">${img(ph + 'foldable-study-table-ideation-01.jpg', 'CNC-cutting the panels')}${img(ph + 'foldable-study-table-final-01.jpeg', 'Hand sanding the panels')}</div>
  </div>`;

  // 8b. MAKING — Assembled by Hand (assembly + screwdriver)
  h += `<div class="pcard pcard-sec pcard-sec--flip pres-r">
    <div class="pc pc-1 pc--fill">${img(ph + 'foldable-study-table-test-02.jpeg', 'Driving the hinge screws')}</div>
    <div class="pcard-sec-text">
      <span class="pcard-label">Making · Assembly</span>
      <h3 class="pcard-sec-h">Assembled by Hand</h3>
      <p class="pcard-body">The body was <strong>assembled with screws and the slide-bolt hinge using a screwdriver</strong> &mdash; fitting the storage compartments and the fold mechanism together piece by piece.</p>
    </div>
  </div>`;

  // 8b. TESTING THE RAW BUILD
  h += `<div class="pcard pcard-sec pcard-sec--flip pres-r">
    <div class="pc pc-1 pc--fill">${img(ph + 'foldable-study-table-test-01.jpeg', 'Checking the fold and fit of the raw table')}</div>
    <div class="pcard-sec-text">
      <span class="pcard-label">Making · Raw Build</span>
      <h3 class="pcard-sec-h">Testing the Raw Table</h3>
      <p class="pcard-body">With the raw table standing, I checked the fold and the fit against the drawings &mdash; opening, closing, and packing it down to make sure everything moved cleanly before any finishing.</p>
    </div>
  </div>`;

  // 8c. FINISHING — painting
  h += `<div class="pcard pcard-sec pres-r">
    <div class="pcard-sec-text">
      <span class="pcard-label">Making · Finishing</span>
      <h3 class="pcard-sec-h">Painting the Surface</h3>
      <p class="pcard-body">Once the raw build was confirmed, I spray-painted the whole piece in a warm brown for a clean, durable, child-safe finish &mdash; coating the panels and the storage compartments evenly.</p>
    </div>
    <div class="pc-vstack">
      <div class="pc-vstack-top">${img(ph + 'foldable-study-table-morph-02.jpg')}</div>
      <div class="pc-vstack-bottom">${img(ph + 'foldable-study-table-morph-03.jpg')}${img(ph + 'foldable-study-table-morph-04.jpg')}</div>
    </div>
  </div>`;

  // 10. FINAL PRODUCT (end of the deck)
  h += `<div class="pcard pcard-slide-full pres-r">
    <span class="pcard-label pcard-label--pad">Final Product</span>
    <div class="pc-doc">${img(ph + '32374fe5-268e-47ae-bd43-167369929219.jpg', 'Finished foldable study table')}${img(ph + 'foldable-study-table-final-05.jpg', 'Finished table, open')}</div>
  </div>`;
  h += `<div class="pcard pres-r"><div class="pc pc-2">${img(ph + 'foldable-study-table-fab-03.jpg')}${img(ph + 'foldable-study-table-fab-08.jpg')}</div></div>`;
  h += `<div class="pcard pres-r"><div class="pc pc-2">${img(ph + 'foldable-study-table-fab-06.jpg')}${img(ph + 'foldable-study-table-fab-07.jpg')}</div></div>`;

  // 11. OUTCOME
  h += `<div class="pcard pcard-outcome pres-r">
    <span class="pcard-label">Outcome</span>
    <p class="pcard-brief-body">A freestanding fold-flat study table scaled for children aged 6&ndash;12. Folds to under 15 cm depth for wall storage. Surface height 52 cm &mdash; correct for a sitting child. All materials non-toxic and child-safe. Three children aged 7&ndash;11 were able to set up and pack down independently within two minutes.</p>
  </div>`;

  // 11. QUOTE
  h += `<div class="pcard pcard-quote pres-r">
    <blockquote>&ldquo;every fold mechanism is a decision that touches the user directly &mdash; nothing is neutral in furniture&rdquo;</blockquote>
  </div>`;

  // 12. END
  h += `<div class="pcard pcard-end pres-r">
    <p class="pcard-reflection">Designing for children is designing for autonomy &mdash; the child&rsquo;s ability to own and operate their own space is the whole point. Every complexity in the fold mechanism was weighed against whether a 7-year-old could navigate it alone.</p>
    <div class="pcard-tags">
      ${['Furniture Design','Human-Centred Design','Capstone 2025','Prototyping','Wood','Autodesk Fusion 360','Research'].map(t => `<span class="pcard-tag">${t}</span>`).join('')}
    </div>
  </div>`;

  return h;
}

/* ─────────────────────────────────────────
   MAD HATTER LAMP CUSTOM BUILDER
───────────────────────────────────────── */
function buildLampPresentation(p) {
  const esc = s => s.replace(/'/g, "\\'");
  const i = (src, alt) => `<img src="${src}" alt="${alt || ''}" loading="lazy" onclick="openLB(this.src)"/>`;
  const b = 'images/mad-hatter-lamp/';
  const hero     = b + 'mad-hatter-lamp-hero.png';
  const paper    = b + 'mad-hatter-lamp-paper-01.jpeg';
  const card1    = b + 'mad-hatter-lamp-cardboard-01.jpeg'; // structure
  const card2    = b + 'mad-hatter-lamp-cardboard-02.jpeg'; // papier-mache
  const card3    = b + 'mad-hatter-lamp-cardboard-03.jpeg'; // green on head
  const card5    = b + 'mad-hatter-lamp-cardboard-05.jpeg'; // decorated cardboard
  const acr1     = b + 'mad-hatter-lamp-acrylic-01.jpeg';   // small acrylic on head
  const acr2     = b + 'mad-hatter-lamp-acrylic-02.jpeg';   // small acrylic lit
  const build1   = b + 'mad-hatter-lamp-build-01.jpeg';     // bare acrylic
  const build2   = b + 'mad-hatter-lamp-build-02.jpeg';     // bare acrylic w/ brim
  const fin2     = b + 'mad-hatter-lamp-final.jpg';        // final product, lit — feathers, band & clock
  let h = '';

  // 1. INTRO — text + bg-removed hero
  h += `<div class="pcard pcard-intro pres-r">
    <div class="pcard-intro-body">
      <div class="pcard-intro-text">
        <span class="pcard-eyebrow">01 / 09 &nbsp;&middot;&nbsp; Product Design &middot; Lighting</span>
        <h2 class="pcard-title">Mad Hatter Lamp</h2>
        <p class="pcard-desc">An unconventional lamp inspired by the whimsy of Alice in Wonderland's Mad Hatter &mdash; an exploration of theatrical form, light diffusion, and material play through iterative prototyping.</p>
        <div class="pcard-brief">
          <span class="pcard-label">The Brief</span>
          <p class="pcard-brief-body">Most lamps are designed to disappear into a room. The brief was the opposite: design a lamp that becomes a conversation piece &mdash; one that carries personality and narrative without sacrificing the quality of the light it produces.</p>
        </div>
      </div>
      <div class="pcard-intro-foot"><span class="pcard-year">2024</span></div>
    </div>
    <div class="pcard-intro-img-col">
      <div class="pcard-intro-img">${i(hero, 'Mad Hatter Lamp')}</div>
    </div>
  </div>`;

  // 2. CONCEPT
  h += `<div class="pcard pcard-outcome pres-r">
    <span class="pcard-label">Concept</span>
    <h3 class="pcard-sec-h" style="margin-bottom:0.8rem">A Top Hat that Glows</h3>
    <p class="pcard-brief-body">Drawing from theatrical lighting and the visual language of Lewis Carroll's illustrations, the top hat became the primary shade element &mdash; its tapered form chosen for how it diffuses a warm, theatrical pool of light. Reaching that form, however, meant working through three very different materials.</p>
  </div>`;

  // 3. PROTOTYPE — PAPER (failed)
  h += `<div class="pcard pcard-sec pres-r">
    <div class="pcard-sec-text">
      <span class="pcard-label">Prototype 01 &middot; Paper</span>
      <h3 class="pcard-sec-h">Starting with Paper</h3>
      <p class="pcard-body">I began with a quick paper prototype &mdash; strips of paper formed over a balloon to test the hat's silhouette. It collapsed and held no structure, so the paper route was abandoned almost immediately.</p>
    </div>
    <div class="pc pc-1 pc--fill">${i(paper, 'Paper prototype')}</div>
  </div>`;

  // 4. PROTOTYPE — CARDBOARD
  h += `<div class="pcard pcard-sec pcard-sec--flip pres-r">
    <div class="pc pc-2 pc--fill">${i(card1)}${i(card2)}</div>
    <div class="pcard-sec-text">
      <span class="pcard-label">Prototype 02 &middot; Cardboard</span>
      <h3 class="pcard-sec-h">Building it in Cardboard</h3>
      <p class="pcard-body">Next I moved to cardboard &mdash; cutting and taping a sturdier hat structure, then layering it with papier-m&acirc;ch&eacute; to smooth the form. This held its shape and let me test proportion at full scale.</p>
    </div>
  </div>`;
  h += `<div class="pcard pres-r"><div class="pc-duo">${i(card5)}${i(card3)}</div></div>`;

  // 5. PROTOTYPE — ACRYLIC (small scale)
  h += `<div class="pcard pcard-sec pres-r">
    <div class="pcard-sec-text">
      <span class="pcard-label">Prototype 03 &middot; Acrylic</span>
      <h3 class="pcard-sec-h">A Small-Scale Acrylic Test</h3>
      <p class="pcard-body">With the form resolved, I made a small-scaled acrylic prototype to test translucency and how the material would carry light. The glow through the acrylic confirmed the direction &mdash; so I jumped into building the full-size final piece.</p>
    </div>
    <div class="pc pc-2 pc--fill">${i(acr1)}${i(acr2)}</div>
  </div>`;

  // 6. FINAL — build form
  h += `<div class="pcard pcard-sec pcard-sec--flip pres-r">
    <div class="pc pc-2 pc--fill">${i(build1)}${i(build2)}</div>
    <div class="pcard-sec-text">
      <span class="pcard-label">Final Product</span>
      <h3 class="pcard-sec-h">The Full-Scale Acrylic Hat</h3>
      <p class="pcard-body">The final shade was built as a large translucent acrylic top hat with a wide brim base. Its layered walls diffuse the light evenly, glowing in any colour driven through the LED set inside.</p>
      <p class="pcard-body" style="margin-top:1rem">The top couldn't be 3D printed in one piece &mdash; the closed top required tree supports that ruined the translucency and surface. So the top plate was printed separately and then bonded onto the body, keeping the walls clean and clear.</p>
    </div>
  </div>`;

  // 7. FINAL — decorated & lit
  h += `<div class="pcard pcard-slide-full pres-r">
    <span class="pcard-label pcard-label--pad">Final Product &middot; Styled</span>
    <div class="pc-screen">${i(fin2, 'Final lamp, lit')}</div>
  </div>`;

  // 8. OUTCOME
  h += `<div class="pcard pcard-outcome pres-r">
    <span class="pcard-label">Outcome</span>
    <p class="pcard-brief-body">A statement table lamp built around a layered top-hat acrylic shade, dressed with feathers, a leather-and-pearl band, and a hanging clock. It throws a warm, theatrically diffused light and sits exactly at the boundary between product and prop.</p>
  </div>`;

  // 9. QUOTE
  h += `<div class="pcard pcard-quote pres-r">
    <blockquote>&ldquo;form follows feeling, not just function &mdash; some designs need a little madness&rdquo;</blockquote>
  </div>`;

  // 10. END
  h += `<div class="pcard pcard-end pres-r">
    <p class="pcard-reflection">Absurdist reference in design only works when every functional decision is made seriously. The whimsy comes from the concept &mdash; not from abandoning craft.</p>
    <div class="pcard-tags">
      ${['Product Design','Lighting','Concept Design','Prototyping','Material Exploration','Acrylic'].map(t=>`<span class="pcard-tag">${t}</span>`).join('')}
    </div>
  </div>`;

  return h;
}

/* ─────────────────────────────────────────
   WORMY COMPOST BIN CUSTOM BUILDER
───────────────────────────────────────── */
function buildCompostPresentation(p) {
  const esc = s => s.replace(/'/g, "\\'");
  const i = (src, alt) => `<img src="${src}" alt="${alt || ''}" loading="lazy" onclick="openLB(this.src)"/>`;
  const b = 'images/wormy-compost-bin/';
  const cover    = b + 'wormy-compost-bin-cover.png';
  const diagram  = b + 'wormy-compost-bin-diagram.png';
  const make1    = b + 'wormy-compost-bin-making-01.jpeg';
  const make2    = b + 'wormy-compost-bin-making-02.jpeg';
  const mech     = b + 'wormy-compost-bin-mechanism-01.jpeg';
  const worms    = b + 'wormy-compost-bin-worms-01.jpeg';
  const fin      = b + 'wormy-compost-bin-final.jpeg';
  let h = '';

  // 1. INTRO
  h += `<div class="pcard pcard-intro pres-r">
    <div class="pcard-intro-body">
      <div class="pcard-intro-text">
        <span class="pcard-eyebrow">02 / 09 &nbsp;&middot;&nbsp; Product Design &middot; Sustainability</span>
        <h2 class="pcard-title">Wormy &mdash; Compost Bin</h2>
        <p class="pcard-desc">A home vermicompost bin made to be easy to use, friendly, and nice to look at &mdash; so turning food waste into compost feels simple, not gross.</p>
        <div class="pcard-brief">
          <span class="pcard-label">The Brief</span>
          <p class="pcard-brief-body">Vermicomposting works well, but it scares people off. Most bins are ugly, too plain, and hard to keep in a small home. So even people who want to compost often don't &mdash; it just feels unpleasant.</p>
        </div>
      </div>
      <div class="pcard-intro-foot"><span class="pcard-year">2025</span></div>
    </div>
    <div class="pcard-intro-img-col">
      <div class="pcard-intro-img">${i(cover, 'Wormy Compost Bin')}</div>
    </div>
  </div>`;

  // 2. SYSTEM — diagram
  h += `<div class="pcard pcard-sec pres-r">
    <div class="pcard-sec-text">
      <span class="pcard-label">The System</span>
      <h3 class="pcard-sec-h">Three Stacked Parts</h3>
      <p class="pcard-body">The bin has three parts stacked on top of each other. Wet food waste goes in the top, under a worm blanket. A revolving plate lets it drop into the middle, where the worms eat it and make compost. The bottom part collects the worm tea &mdash; a liquid plant food &mdash; which you can pour out from a small tap.</p>
    </div>
    <div class="pc-nocrop pc-nocrop--1" style="padding:1.5rem;align-items:center;">${i(diagram, 'Compost system diagram')}</div>
  </div>`;

  // 3. RESEARCH
  h += `<div class="pcard pcard-outcome pres-r">
    <span class="pcard-label">Research</span>
    <p class="pcard-brief-body">We talked to people living in Mumbai flats about how they deal with kitchen waste and why they don't compost. We also looked at what worms need &mdash; some moisture, fresh air, and darkness &mdash; and at other bins on the market. The problem was never how well they worked. It was that using them felt gross and hard.</p>
  </div>`;

  // 4. MAKING — process
  h += `<div class="pcard pcard-sec pcard-sec--flip pres-r">
    <div class="pc pc-2 pc--fill">${i(make1)}${i(make2)}</div>
    <div class="pcard-sec-text">
      <span class="pcard-label">Making</span>
      <h3 class="pcard-sec-h">Made from Stacked Containers</h3>
      <p class="pcard-body">We built the model from clear plastic containers stacked on top of each other. Each one was wrapped in jute and coir rope to make it look warm and natural instead of like plastic. The parts were glued and sealed by hand so the whole stack feels like one nice object.</p>
    </div>
  </div>`;

  // 5. MECHANISM + WORMS
  h += `<div class="pcard pcard-sec pres-r">
    <div class="pcard-sec-text">
      <span class="pcard-label">Mechanism</span>
      <h3 class="pcard-sec-h">The Revolving Plate</h3>
      <p class="pcard-body">A revolving plate sits between the top and middle parts. When you turn it, the older waste drops down to the worms while fresh food stays on top. Small coir blocks keep the moisture right, and the worms do their work in the layer below.</p>
    </div>
    <div class="pc pc-2 pc--fill">${i(mech)}${i(worms)}</div>
  </div>`;

  // 6. FINAL PROTOTYPE
  h += `<div class="pcard pcard-slide-full pres-r">
    <span class="pcard-label pcard-label--pad">Final Prototype</span>
    <div class="pc-screen">${i(fin, 'Final compost bin prototype')}</div>
  </div>`;

  // 7. OUTCOME
  h += `<div class="pcard pcard-outcome pres-r">
    <span class="pcard-label">Outcome</span>
    <p class="pcard-brief-body">A stacked vermicompost bin with separate parts for feeding, composting, and collecting worm tea. The soft, jute-wrapped shape makes it feel friendly &mdash; turning a chore people avoid into a nice object that fits easily in a home or balcony garden.</p>
  </div>`;

  // 8. QUOTE
  h += `<div class="pcard pcard-quote pres-r">
    <blockquote>&ldquo;good sustainability design isn't about sacrifice &mdash; it's making the right choice feel like the easy choice&rdquo;</blockquote>
  </div>`;

  // 9. END
  h += `<div class="pcard pcard-end pres-r">
    <p class="pcard-reflection">Eco-friendly products fail when they ask too much of people. This project was about making each step easier until composting felt like a normal part of the day &mdash; not a hard thing you force yourself to do.</p>
    <div class="pcard-tags">
      ${['Product Design','Sustainability','Home','Circular Design','Vermicomposting'].map(t=>`<span class="pcard-tag">${t}</span>`).join('')}
    </div>
  </div>`;

  return h;
}

/* ─────────────────────────────────────────
   MILLET PACKAGING CUSTOM BUILDER
───────────────────────────────────────── */
function buildPackagingPresentation(p) {
  const esc = s => s.replace(/'/g, "\\'");
  const i = (src, alt) => `<img src="${src}" alt="${alt || ''}" loading="lazy" onclick="openLB(this.src)"/>`;
  const b = 'images/millet-packaging/';
  const front = b + 'millet-packaging-front.jpeg';
  const side  = b + 'millet-packaging-side.jpeg';
  const open1 = b + 'millet-packaging-open-01.jpeg';
  const open2 = b + 'millet-packaging-open-02.jpeg';
  let h = '';

  // 1. INTRO
  h += `<div class="pcard pcard-intro pres-r">
    <div class="pcard-intro-body">
      <div class="pcard-intro-text">
        <span class="pcard-eyebrow">04 / 09 &nbsp;&middot;&nbsp; Packaging Design &middot; Structural</span>
        <h2 class="pcard-title">Millet Packaging for a Healthier Tomorrow</h2>
        <p class="pcard-desc">A resealable, stackable pack for millets &mdash; you can open it, use the millets, and close the lid again when you don't need it. No clips, no extra attachments.</p>
        <div class="pcard-brief">
          <span class="pcard-label">The Brief</span>
          <p class="pcard-brief-body">In India, millets come in plastic packets. Once you tear a packet open, you can't close it again &mdash; you need a clip or some other attachment to keep it shut. I wanted to fix that small, everyday problem.</p>
        </div>
      </div>
      <div class="pcard-intro-foot"><span class="pcard-year">2025</span></div>
    </div>
    <div class="pcard-intro-img-col">
      <div class="pcard-intro-img">${i(front, 'Millet packaging')}</div>
    </div>
  </div>`;

  // 2. STRUCTURE — open / use / close (initial prototype)
  h += `<div class="pcard pcard-sec pcard-sec--flip pres-r">
    <div class="pc pc-2 pc--fill">${i(open2)}${i(open1)}</div>
    <div class="pcard-sec-text">
      <span class="pcard-label">Initial Prototype</span>
      <h3 class="pcard-sec-h">Open, Use, Close</h3>
      <p class="pcard-body">This was my initial prototype. I shaped it so you can open the top, take out the millets you need, and close the lid back when you're done &mdash; so the pack stays shut on its own, without any clip.</p>
      <p class="pcard-body" style="margin-top:1rem">I chose this shape on purpose: the packs can be arranged and stacked together neatly on a shelf, so they take up less space and look tidy.</p>
    </div>
  </div>`;

  // 3. PARTITIONS — two grains in one pack
  h += `<div class="pcard pcard-sec pres-r">
    <div class="pcard-sec-text">
      <span class="pcard-label">Partitions</span>
      <h3 class="pcard-sec-h">Two Grains in One Pack</h3>
      <p class="pcard-body">Later I thought &mdash; instead of keeping just one type of grain in a packet, why not keep two or more grains in a single pack? So I added partitions inside to separate them, which you can see through the windows.</p>
      <p class="pcard-body" style="margin-top:1rem">It also opens up a nice use at the grocery shop: people can pick their own combination of millets and have them packed together in one single pack.</p>
    </div>
    <div class="pc pc-2 pc--fill">${i(front)}${i(side)}</div>
  </div>`;

  // 4. OUTCOME
  h += `<div class="pcard pcard-outcome pres-r">
    <span class="pcard-label">Outcome</span>
    <p class="pcard-brief-body">A single millet pack that opens, lets you use the grain, and closes again &mdash; no clips needed. It stacks neatly on a shelf, and the partitions inside mean one pack can hold a mix of millets, or a combination a customer picks at the shop.</p>
  </div>`;

  // 6. QUOTE
  h += `<div class="pcard pcard-quote pres-r">
    <blockquote>&ldquo;the best packaging is the one you never have to think about twice&rdquo;</blockquote>
  </div>`;

  // 7. END
  h += `<div class="pcard pcard-end pres-r">
    <p class="pcard-reflection">This project showed me that good packaging solves a behaviour problem, not just how it looks. The real problem was the clip on the kitchen shelf.</p>
    <div class="pcard-tags">
      ${['Packaging Design','Structural Design','Resealable','Millet','Grain','Daily Use'].map(t=>`<span class="pcard-tag">${t}</span>`).join('')}
    </div>
  </div>`;

  return h;
}

/* ─────────────────────────────────────────
   TOSS 2025 TYPOGRAPHY CUSTOM BUILDER
───────────────────────────────────────── */
function buildTossPresentation(p) {
  const esc = s => s.replace(/'/g, "\\'");
  const i = (src, alt) => `<img src="${src}" alt="${alt || ''}" loading="lazy" onclick="openLB(this.src)"/>`;
  const b = 'images/toss-2025-typography/';
  const hero  = b + 'toss-2025-typography-01.jpeg'; // letters + ball on field (dusk)
  const night = b + 'toss-2025-typography-09.jpg';  // night with fog
  const posing= b + '6e33281a-417a-4f4f-ad54-fae56f2f7f86.jpg'; // Kanika posing
  const team1 = b + 'toss-2025-typography-03.jpeg'; // team at sunset with letters
  const team2 = b + 'toss-2025-typography-02.jpeg'; // team with tennis ball
  const proc1 = b + 'toss-2025-typography-05.jpeg'; // workshop, raw letters
  const proc2 = b + 'toss-2025-typography-06.jpeg'; // building the S
  const proc3 = b + 'toss-2025-typography-08.jpeg'; // blue paint on hands
  let h = '';

  // 1. INTRO — enlarged hero
  h += `<div class="pcard pcard-intro pres-r">
    <div class="pcard-intro-body">
      <div class="pcard-intro-text">
        <span class="pcard-eyebrow">06 / 09 &nbsp;&middot;&nbsp; Spatial Design &middot; Installation</span>
        <h2 class="pcard-title">TOSS 2025 &mdash; 3D Illuminated Typography</h2>
        <p class="pcard-desc">For a dynamic cricket-themed event, the TOSS 3D letters were designed as a striking decor element. Crafted with precision using plywood and flexible ply, they added a visually appealing, immersive experience for everyone at the event.</p>
        <div class="pcard-brief">
          <span class="pcard-label">The Brief</span>
          <p class="pcard-brief-body">TOSS 2025 needed a bold physical centrepiece for the university's sports event &mdash; big enough to read across the ground, photograph well, and stand securely outdoors, built entirely with university workshop resources.</p>
        </div>
      </div>
      <div class="pcard-intro-foot"><span class="pcard-year">2025</span></div>
    </div>
    <div class="pcard-intro-img pcard-intro-img--lg">${i(hero, 'TOSS letters on the field')}</div>
  </div>`;

  // 2. MATERIALS + CHALLENGES
  h += `<div class="pcard pcard-tech-mat pres-r">
    <div class="pcard-tech-col">
      <div class="pcard-tech-text">
        <span class="pcard-label">Materials &amp; Construction</span>
        <ul class="pcard-cad-list">
          <li><strong>Plywood</strong> &mdash; durability and a strong base structure</li>
          <li><strong>Flexible Ply</strong> &mdash; seamless curved sections and a refined finish</li>
          <li><strong>Paint</strong> &mdash; vibrant colour and a polished final look</li>
          <li><strong>Brushes</strong> &mdash; even paint and smooth detailing</li>
        </ul>
      </div>
    </div>
    <div class="pcard-tech-col pcard-tech-col--right">
      <div class="pcard-tech-text">
        <span class="pcard-label">Challenges &amp; Solutions</span>
        <ul class="pcard-cad-list">
          <li><strong>Curved Sections</strong> &mdash; flexible ply created smooth edges without compromising the structure</li>
          <li><strong>Structural Stability</strong> &mdash; a reinforced base and hidden supports kept the letters upright and secure</li>
        </ul>
      </div>
    </div>
  </div>`;

  // 3. PROCESS
  h += `<div class="pcard pcard-sec pcard-sec--flip pres-r">
    <div class="pc-vstack">
      <div class="pc-vstack-top">${i(proc1)}</div>
      <div class="pc-vstack-bottom">${i(proc2)}${i(proc3)}</div>
    </div>
    <div class="pcard-sec-text">
      <span class="pcard-label">Process</span>
      <h3 class="pcard-sec-h">Built by Hand in the Workshop</h3>
      <p class="pcard-body">Each letter started as a plywood base for strength, with flexible ply bent around the curves to keep the edges smooth. Once the shapes were solid, we sanded them down and hand-painted them with brushes for a clean, vibrant finish.</p>
      <p class="pcard-body" style="margin-top:1rem">Every letter was built and finished by hand in the university workshop &mdash; paint-stained fingers and all.</p>
    </div>
  </div>`;

  // 3. FINISHED PRODUCT
  h += `<div class="pcard pcard-sec pres-r">
    <div class="pcard-sec-text">
      <span class="pcard-label">Finished &amp; Installed</span>
      <h3 class="pcard-sec-h">On the Ground at TOSS</h3>
      <p class="pcard-body">Installed on the sports ground with the giant Somaiya tennis ball, the letters became a key branding and decor feature &mdash; readable from across the ground and one of the most photographed spots at the event.</p>
    </div>
    <div class="pc pc-1 pc--fill">${i(night)}</div>
  </div>`;
  h += `<div class="pcard pres-r">
    <div class="pc-vstack pc-vstack--auto">
      <div class="pc-vstack-top ai-hide">${i(posing)}</div>
      <div class="pc-vstack-bottom">${i(team1)}${i(team2)}</div>
    </div>
  </div>`;

  // 4. OUTCOME
  h += `<div class="pcard pcard-outcome pres-r">
    <span class="pcard-label">Outcome</span>
    <p class="pcard-brief-body">The finished 3D letters successfully added an engaging visual element to the event. They served as a key branding and decor feature &mdash; enhancing the overall ambiance and providing an excellent backdrop for event photography.</p>
  </div>`;

  // 5. QUOTE
  h += `<div class="pcard pcard-quote pres-r">
    <blockquote>&ldquo;scale changes everything &mdash; a letter at six feet is a completely different design problem&rdquo;</blockquote>
  </div>`;

  // 6. END
  h += `<div class="pcard pcard-end pres-r">
    <p class="pcard-reflection">Scale changes everything. A letter at this size behaves completely differently from a letterform on a screen &mdash; every curve and edge becomes a structural decision. This was the most direct link I've found between design thinking and physical making.</p>
    <div class="pcard-tags">
      ${['Spatial Design','Installation','Plywood','Flexible Ply','Hand-painted','Typography','Fabrication'].map(t=>`<span class="pcard-tag">${t}</span>`).join('')}
    </div>
  </div>`;

  return h;
}

/* ─────────────────────────────────────────
   INTERACTIVE STRESS BALL CUSTOM BUILDER
───────────────────────────────────────── */
function buildStressballPresentation(p) {
  const esc = s => s.replace(/'/g, "\\'");
  const i = (src, alt) => `<img src="${src}" alt="${alt || ''}" loading="lazy" onclick="openLB(this.src)"/>`;
  const base = 'images/interactive-stress-ball/';
  const elec1 = base + 'interactive-stress-ball-01.jpeg';  // components laid out
  const foam1 = base + 'interactive-stress-ball-03.jpeg';  // foam ball — battery + motor
  const elec2 = base + 'interactive-stress-ball-04.jpeg';  // battery + full build
  const foam2 = base + 'interactive-stress-ball-05.jpeg';  // foam ball — full electronics
  const board1 = base + 'interactive-stress-ball-06.jpeg'; // whiteboard — soothing sound circuit
  const board2 = base + 'interactive-stress-ball-07.jpeg'; // whiteboard — A/B/C concept board
  const cover  = base + 'interactive-stress-ball-cover.png';
  let h = '';

  // 1. INTRO — text + big build image (no thumbnails)
  h += `<div class="pcard pcard-intro pres-r">
    <div class="pcard-intro-body">
      <div class="pcard-intro-text">
        <span class="pcard-eyebrow">08 / 09 &nbsp;&middot;&nbsp; Product Design &middot; Wellbeing</span>
        <h2 class="pcard-title">Interactive Stress Ball</h2>
        <p class="pcard-desc">A sensor-integrated stress relief tool that responds to pressure with soothing sounds and gentle vibration &mdash; designed for teachers, professionals, and parents carrying invisible daily loads.</p>
        <div class="pcard-brief">
          <span class="pcard-label">The Brief</span>
          <p class="pcard-brief-body">Stress among working adults &mdash; especially teachers and parents &mdash; rarely has a physical outlet. Existing stress toys are passive, uninspiring, and feel juvenile. People in high-stress roles need something dignified and genuinely responsive.</p>
        </div>
      </div>
      <div class="pcard-intro-foot"><span class="pcard-year">2024</span></div>
    </div>
    <div class="pcard-intro-img-col">
      <div class="pcard-intro-img">${i(elec1, 'Stress ball electronics')}</div>
    </div>
  </div>`;

  // 2. BRAINSTORMING — whiteboard sketches
  h += `<div class="pcard pcard-sec pres-r">
    <div class="pcard-sec-text">
      <span class="pcard-label">Brainstorming</span>
      <h3 class="pcard-sec-h">Three Concept Directions</h3>
      <p class="pcard-body">User interviews with teachers and design professionals showed that physical tactility alone wasn't enough &mdash; sensory feedback through sound and vibration mattered far more for genuine stress relief.</p>
      <p class="pcard-body" style="margin-top:1rem">That insight shaped three concept directions, mapped out on the board: <strong>A</strong> &mdash; a normal squeeze ball, <strong>B</strong> &mdash; one with vibration feedback driven by a flex sensor, and <strong>C</strong> &mdash; one that plays a soothing sound on press, built around an MP3 module, speaker, and rechargeable cell.</p>
    </div>
    <div class="pc pc-2 pc--fill">${i(board2, 'Concept brainstorm board')}${i(board1, 'Soothing sound circuit sketch')}</div>
  </div>`;

  // 3. PROTOTYPING — foam ball builds
  h += `<div class="pcard pcard-sec pcard-sec--flip pres-r">
    <div class="pc pc-2 pc--fill">${i(foam1, 'Foam ball build')}${i(foam2, 'Foam ball with electronics')}</div>
    <div class="pcard-sec-text">
      <span class="pcard-label">Prototyping</span>
      <h3 class="pcard-sec-h">Building Inside the Ball</h3>
      <p class="pcard-body">The electronics were fitted inside a soft foam core: a coin cell and vibration motor in the early build, then the full sound build with a speaker, MP3 module, and pressure switch packed into the ball so it stays squeezable.</p>
      <p class="pcard-body" style="margin-top:1rem">Iterating through material hardnesses tuned the grip feel, while routing the wiring around the foam kept the form soft and natural in the hand.</p>
    </div>
  </div>`;

  // 4. ELECTRONICS / BUILD detail
  h += `<div class="pcard pcard-sec pres-r">
    <div class="pcard-sec-text">
      <span class="pcard-label">The Build</span>
      <h3 class="pcard-sec-h">Sound &amp; Vibration on Press</h3>
      <p class="pcard-body">Pressure on the ball triggers a microcontroller that plays ambient sound samples &mdash; rain, resonant chimes &mdash; alongside a gentle vibration motor at set pressure thresholds. A Type-C rechargeable cell keeps it desk-friendly.</p>
    </div>
    <div class="pc pc-1 pc--fill">${i(elec2, 'Full electronics build')}</div>
  </div>`;

  // 5. OUTCOME
  h += `<div class="pcard pcard-outcome pres-r">
    <span class="pcard-label">Outcome</span>
    <p class="pcard-brief-body">A soft-body stress ball with embedded pressure sensors that responds to squeeze with ambient audio and gentle vibration. Tested with teachers over two weeks &mdash; all reported using it during high-stress moments. The form is calm and professional, appropriate for a desk context.</p>
  </div>`;

  // 6. VIDEO
  if (p.video) {
    h += `<div class="pcard pcard-video pres-r">
      <span class="pcard-label">Demo</span>
      <video class="pcard-vid-el" src="${base}interactive-stress-ball-demo.mp4" controls playsinline muted></video>
    </div>`;
  }

  // 7. QUOTE
  h += `<div class="pcard pcard-quote pres-r">
    <blockquote>&ldquo;the most human products are the ones that respond &mdash; not just react&rdquo;</blockquote>
  </div>`;

  // 8. END
  h += `<div class="pcard pcard-end pres-r">
    <p class="pcard-reflection">The most human products respond to you rather than just reacting. The difference between reaction and response is intelligence &mdash; and even a minimal embedded system can carry that distinction through to the user experience.</p>
    <div class="pcard-tags">
      ${['Product Design','Wellbeing','Interaction Design','Sensors','User Research','Embedded'].map(t=>`<span class="pcard-tag">${t}</span>`).join('')}
    </div>
  </div>`;

  return h;
}

function buildPhotoshopPresentation(p) {
  const esc = s => s.replace(/'/g, "\\'");
  const i = (src, alt) => `<img src="${src}" alt="${alt || ''}" loading="lazy" onclick="openLB(this.src)"/>`;
  const base = 'images/graphic-design-illustration/';
  const finalArt = base + 'graphic-design-illustration-final.jpeg';    // clean final illustration on white
  const poster   = base + 'graphic-design-illustration-poster.jpeg';   // orange "Jai Shree Ram" poster
  const lineart  = base + 'graphic-design-illustration-lineart.jpeg';  // reference + line art on screen
  const drawing  = base + 'graphic-design-illustration-drawing.jpeg';  // drawing on graphics tablet
  const coloring = base + 'graphic-design-illustration-coloring.jpeg'; // colouring at the laptop
  const print1   = base + 'graphic-design-illustration-print-01.jpeg'; // printed bookmarks stacked
  const print2   = base + 'graphic-design-illustration-print-02.jpeg'; // bookmark styled on paper
  let h = '';

  // 1. INTRO — text + final illustration (contained, fully visible)
  h += `<div class="pcard pcard-intro pres-r">
    <div class="pcard-intro-body">
      <div class="pcard-intro-text">
        <span class="pcard-eyebrow">05 / 09 &nbsp;&middot;&nbsp; Graphic Design &middot; Illustration</span>
        <h2 class="pcard-title">Graphic Design &amp; Illustration</h2>
        <p class="pcard-desc">A digital illustration of Lord Rama, drawn in Adobe Photoshop &mdash; built up from reference into clean line art and full colour, then composed into a poster and printed as devotional bookmarks.</p>
        <div class="pcard-brief">
          <span class="pcard-label">The Brief</span>
          <p class="pcard-brief-body">A Photoshop assignment to illustrate Lord Rama: translate a reference image into an original digital painting, then carry it all the way through to a finished, printable graphic-design piece.</p>
        </div>
      </div>
      <div class="pcard-intro-foot"><span class="pcard-year">2025</span></div>
    </div>
    <div class="pcard-intro-img-col">
      <div class="pcard-intro-img pcard-intro-img--lg">${i(finalArt, 'Final digital illustration of Lord Rama')}</div>
    </div>
  </div>`;

  // 2. PROCESS — reference to line art
  h += `<div class="pcard pcard-sec pres-r">
    <div class="pcard-sec-text">
      <span class="pcard-label">Process &middot; Line Art</span>
      <h3 class="pcard-sec-h">From Reference to Line Art</h3>
      <p class="pcard-body">I started from a reference image of Lord Rama, kept open beside my canvas in Photoshop. Working on a graphics tablet, I traced the figure into clean <strong>line art</strong> &mdash; locking in the pose, the bow, and the fall of the hair before any colour went down.</p>
    </div>
    <div class="pc pc-1 pc--fill">${i(lineart, 'Reference image beside the line art in Photoshop')}</div>
  </div>`;

  // 3. PROCESS — drawing & colouring
  h += `<div class="pcard pcard-sec pcard-sec--flip pres-r">
    <div class="pc pc-2 pc--fill">${i(drawing, 'Drawing the line art on a graphics tablet')}${i(coloring, 'Building up colour and shading at the laptop')}</div>
    <div class="pcard-sec-text">
      <span class="pcard-label">Process &middot; Colour</span>
      <h3 class="pcard-sec-h">Drawing &amp; Colouring</h3>
      <p class="pcard-body">Every line was drawn by hand with the stylus, then layered with colour and shading &mdash; the blue skin, the saffron robe, the beads and the weathered bow &mdash; built up gradually until the figure had depth and weight.</p>
      <p class="pcard-body" style="margin-top:1rem">Knowing when to stop mattered as much as the rendering: leaving the background clean kept all the attention on the figure.</p>
    </div>
  </div>`;

  // 4. FINAL APPLICATION — poster (contained, fully visible)
  h += `<div class="pcard pcard-outcome pres-r">
    <span class="pcard-label">The Composition</span>
    <h3 class="pcard-sec-h" style="margin:0.4rem 0 0.9rem">Composed into a Poster</h3>
    <p class="pcard-brief-body">The finished illustration was set on a warm saffron gradient with a hand-placed &ldquo;&#2332;&#2351; &#2358;&#2381;&#2352;&#2368; &#2352;&#2366;&#2350;&rdquo; headline &mdash; balancing the typography against the figure to read as a complete, shareable poster.</p>
  </div>`;
  h += `<div class="pcard pres-r"><div class="pc-screen">${i(poster, 'Jai Shree Ram poster composition')}</div></div>`;

  // 5. FINAL APPLICATION — printed bookmarks
  h += `<div class="pcard pcard-sec pres-r">
    <div class="pcard-sec-text">
      <span class="pcard-label">In Print</span>
      <h3 class="pcard-sec-h">Printed as Bookmarks</h3>
      <p class="pcard-body">The artwork was laid out as a tall bookmark with a repeated &ldquo;&#2332;&#2351; &#2332;&#2351; &#2358;&#2381;&#2352;&#2368; &#2352;&#2366;&#2350;&rdquo; pattern and printed &mdash; a small devotional keepsake taking the digital piece off the screen and into the hand.</p>
    </div>
    <div class="pc pc-2 pc--fill">${i(print1, 'Printed Jai Shree Ram bookmarks')}${i(print2, 'Bookmark styled on handmade paper')}</div>
  </div>`;

  // 6. OUTCOME
  h += `<div class="pcard pcard-outcome pres-r">
    <span class="pcard-label">Outcome</span>
    <p class="pcard-brief-body">A finished digital illustration, a typographic poster, and a set of printed bookmarks &mdash; one piece of art carried all the way from reference to a tangible, printed object. The project sharpened my feel for colour, line, and composition, skills that carry straight into product and packaging design.</p>
  </div>`;

  // 7. QUOTE
  h += `<div class="pcard pcard-quote pres-r">
    <blockquote>&ldquo;every flat composition is a spatial problem in disguise&rdquo;</blockquote>
  </div>`;

  // 8. END
  h += `<div class="pcard pcard-end pres-r">
    <p class="pcard-reflection">Working in Photoshop is a different kind of making from physical prototyping. Without the resistance of material, the quality of the visual decisions alone determines the outcome &mdash; which makes it the most demanding and most instructive medium I work in.</p>
    <div class="pcard-tags">
      ${['Photoshop','Digital Illustration','Graphic Design','Line Art','Typography','Print'].map(t=>`<span class="pcard-tag">${t}</span>`).join('')}
    </div>
  </div>`;

  return h;
}

function buildWoodworkingPresentation(p) {
  const esc = s => s.replace(/'/g, "\\'");
  const i = (src, alt) => `<img src="${src}" alt="${alt || ''}" loading="lazy" onclick="openLB(this.src)"/>`;
  const base = 'images/woodworking-lab/';
  const spindles  = base + 'woodworking-lab-09.jpeg';  // four finished turned spindles
  const lathe1    = base + 'woodworking-lab-07.jpeg';  // lathe turning — wide action
  const lathe2    = base + 'woodworking-lab-08.jpeg';  // lathe turning — close action
  const dremelAct = base + 'woodworking-lab-01.jpeg';  // carving with the Dremel
  const car       = base + 'woodworking-lab-03.jpeg';  // carved wooden car
  const dino      = base + 'woodworking-lab-06.jpeg';  // carved wooden dinosaur
  const plyRaw    = base + 'woodworking-lab-02.jpeg';  // herringbone tray + coaster, raw on bench
  const plyTray   = base + 'woodworking-lab-10.jpeg';  // finished varnished tray + coaster
  const plyCoast  = base + 'woodworking-lab-11.jpeg';  // round coaster — cross-grain pattern
  let h = '';

  // 1. INTRO — text + finished turned spindles (contained, fully visible)
  h += `<div class="pcard pcard-intro pres-r">
    <div class="pcard-intro-body">
      <div class="pcard-intro-text">
        <span class="pcard-eyebrow">07 / 09 &nbsp;&middot;&nbsp; Material Exploration &middot; Display</span>
        <h2 class="pcard-title">Woodworking Lab &mdash; riidl Studio</h2>
        <p class="pcard-desc">A set of hands-on demonstration pieces made during my internship at the riidl woodworking lab &mdash; each one made on a different machine to show, at a glance, exactly what that tool can do.</p>
        <div class="pcard-brief">
          <span class="pcard-label">The Brief</span>
          <p class="pcard-brief-body">The lab needed pieces that could instantly communicate what each machine could do &mdash; to visiting clients and students who had never seen the equipment before. The answer wasn&rsquo;t a poster; it was an object you could pick up.</p>
        </div>
      </div>
      <div class="pcard-intro-foot"><span class="pcard-year">2024</span></div>
    </div>
    <div class="pcard-intro-img-col">
      <div class="pcard-intro-img pcard-intro-img--lg">${i(spindles, 'Lathe-turned spindles')}</div>
    </div>
  </div>`;

  // 2. THE LATHE — turning action
  h += `<div class="pcard pcard-sec pres-r">
    <div class="pcard-sec-text">
      <span class="pcard-label">The Lathe</span>
      <h3 class="pcard-sec-h">Turning Forms on the Wood Lathe</h3>
      <p class="pcard-body">The lathe spins a block of wood while a chisel shapes it &mdash; so everything it makes is <strong>perfectly symmetrical around its axis</strong>. I turned a series of balusters, each with a different profile of beads, coves, and tapers, to show the range of forms a single machine can produce.</p>
      <p class="pcard-body" style="margin-top:1rem">It&rsquo;s the most direct way to feel how the tool, the speed, and the angle of the chisel translate straight into form.</p>
    </div>
    <div class="pc pc-2 pc--fill">${i(lathe1, 'Turning a baluster on the lathe')}${i(lathe2, 'Refining the spindle profile')}</div>
  </div>`;

  // 3. THE DREMEL — freehand carving (action big + two finished pieces)
  h += `<div class="pcard pcard-sec pcard-sec--flip pres-r">
    <div class="pc pc-vstack" style="align-self:stretch">
      <div class="pc-vstack-top"><img src="${dino}" alt="Hand-carved wooden dinosaur" loading="lazy" style="object-position:center bottom;" onclick="openLB(this.src)"/></div>
      <div class="pc-vstack-bottom">${i(car, 'Hand-carved wooden car')}${i(dremelAct, 'Carving with the Dremel tool')}</div>
    </div>
    <div class="pcard-sec-text">
      <span class="pcard-label">The Dremel</span>
      <h3 class="pcard-sec-h">Freehand Carving Small Forms</h3>
      <p class="pcard-body">Where the lathe is all symmetry, the Dremel is all freedom. Holding the piece in one hand and the rotary tool in the other, I carved small toy forms &mdash; a little car and a dinosaur &mdash; entirely by hand.</p>
      <p class="pcard-body" style="margin-top:1rem">These pieces show the opposite end of the lab&rsquo;s range: <strong>free-form, sculptural shapes</strong> that no fixed machine could cut.</p>
    </div>
  </div>`;

  // 4. LAYERED PLYWOOD — pattern from the edge (raw + finished + detail)
  h += `<div class="pcard pcard-sec pres-r">
    <div class="pcard-sec-text">
      <span class="pcard-label">Layered Plywood</span>
      <h3 class="pcard-sec-h">Pattern from the Edge</h3>
      <p class="pcard-body">Plywood is made of thin layers glued together &mdash; and when you cut and re-lay those layers, the striped <strong>cross-section becomes the pattern</strong>. I cut and laminated offcuts into herringbone and parquet arrangements, then built them into small trays and coasters.</p>
      <p class="pcard-body" style="margin-top:1rem">Sanded and varnished, the everyday material turns into something that looks deliberately designed &mdash; a quiet demonstration of how much is hiding inside a sheet of ply.</p>
    </div>
    <div class="pc pc-3" style="align-self:stretch">${i(plyTray, 'Finished herringbone plywood tray')}${i(plyRaw, 'Raw tray and coaster on the bench')}${i(plyCoast, 'Cross-grain plywood coaster')}</div>
  </div>`;

  // 5. OUTCOME
  h += `<div class="pcard pcard-outcome pres-r">
    <span class="pcard-label">Outcome</span>
    <p class="pcard-brief-body">A small collection of demonstration pieces &mdash; turned spindles, carved toys, and patterned trays and coasters &mdash; now used in the lab to show its range. Each one was made on the machine it represents, so clients understand what the equipment can do the moment they pick one up.</p>
  </div>`;

  // 6. QUOTE
  h += `<div class="pcard pcard-quote pres-r">
    <blockquote>&ldquo;the best demonstration is always an object, never an explanation&rdquo;</blockquote>
  </div>`;

  // 7. END
  h += `<div class="pcard pcard-end pres-r">
    <p class="pcard-reflection">Designing to communicate a process rather than to fulfil a function is a different kind of brief &mdash; it asks you to make the invisible visible. The most convincing way to explain a machine is to hand someone something it made.</p>
    <div class="pcard-tags">
      ${['Wood','Lathe','Dremel','Plywood','Material Exploration','Display Design'].map(t=>`<span class="pcard-tag">${t}</span>`).join('')}
    </div>
  </div>`;

  return h;
}

/* ─────────────────────────────────────────
   PRESENTATION BUILDER  (work.html)
   Constructs scrollable case-study scenes
───────────────────────────────────────── */
function buildPresentation(p) {
  const photos = p.photos || [];
  const cs = p.casestudy || {};
  const esc = s => s.replace(/'/g, "\\'");
  let used = 0;
  const next = () => photos[used] ? photos[used++] : null;
  const take = n => { const a = []; while (a.length < n && photos[used]) a.push(photos[used++]); return a; };
  let h = '';

  // ── CARD 1: INTRO — text left | main image right ──
  const mainPhoto = next();
  const thumbs = take(2);
  h += `<div class="pcard pcard-intro pres-r">
    <div class="pcard-intro-body">
      <div class="pcard-intro-text">
        <span class="pcard-eyebrow">${p.num} &nbsp;·&nbsp; ${p.cat}</span>
        <h2 class="pcard-title">${p.title}</h2>
        <p class="pcard-desc">${p.desc}</p>
        ${cs.problem ? `<div class="pcard-brief">
          <span class="pcard-label">The Brief</span>
          <p class="pcard-brief-body">${cs.problem}</p>
        </div>` : ''}
      </div>
      <div class="pcard-intro-foot">
        <span class="pcard-year">${p.year}</span>
      </div>
    </div>
    <div class="pcard-intro-img-col">
      <div class="pcard-intro-img">
        ${mainPhoto ? `<img src="${mainPhoto}" alt="${p.title}" loading="eager"/>` : ''}
      </div>
      ${thumbs.length ? `<div class="pcard-thumbs">
        ${thumbs.map(s => `<img src="${s}" alt="" loading="lazy" onclick="openLB(this.src)"/>`).join('')}
      </div>` : ''}
    </div>
  </div>`;


  // ── CARD 2: RESEARCH — text left | collage right ──
  if (cs.research) {
    const rp = take(3);
    h += `<div class="pcard pcard-sec pres-r">
      <div class="pcard-sec-text">
        <span class="pcard-label">Research</span>
        <p class="pcard-body">${cs.research}</p>
      </div>
      ${makeCollage(rp)}
    </div>`;
  }

  // ── CARD 3: PROCESS — collage left | text right ──
  if (cs.process) {
    const pp = take(4);
    h += `<div class="pcard pcard-sec pcard-sec--flip pres-r">
      ${makeCollage(pp)}
      <div class="pcard-sec-text">
        <span class="pcard-label">Design Process</span>
        <p class="pcard-body">${cs.process}</p>
      </div>
    </div>`;
  }

  // ── CARD 4: GALLERY — remaining photos as collage ──
  const rem = photos.slice(used);
  if (rem.length > 0) {
    h += `<div class="pcard pres-r">${makeCollage(rem)}</div>`;
  }

  // ── VIDEO ──
  if (p.video) {
    h += `<div class="pcard pcard-video pres-r">
      <span class="pcard-label">Demo</span>
      <video class="pcard-vid-el" src="${p.video}" controls playsinline muted></video>
    </div>`;
  }

  // ── CARD 6: OUTCOME ──
  if (cs.outcome) {
    h += `<div class="pcard pcard-outcome pres-r">
      <span class="pcard-label">Outcome</span>
      <p class="pcard-brief-body">${cs.outcome}</p>
    </div>`;
  }

  // ── CARD 7: QUOTE ──
  if (p.insight) {
    h += `<div class="pcard pcard-quote pres-r">
      <blockquote>&ldquo;${p.insight}&rdquo;</blockquote>
    </div>`;
  }

  // ── CARD 8: END — reflection + tags ──
  h += `<div class="pcard pcard-end pres-r">
    ${cs.reflection ? `<p class="pcard-reflection">${cs.reflection}</p>` : ''}
    <div class="pcard-tags">
      ${(p.tags || []).map(t => `<span class="pcard-tag">${t}</span>`).join('')}
    </div>
  </div>`;

  return h;
}

function initPresReveal(content) {
  const els = content.querySelectorAll('.pres-r');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('pv'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.04, root: null });
  els.forEach(el => obs.observe(el));
}

/* ─────────────────────────────────────────
   INLINE CASE STUDY  (work.html)
───────────────────────────────────────── */
function openProject(id, cardEl) {
  const p = PROJECTS[id];
  const cs = document.getElementById('project-cs');
  if (!p || !cs) return;

  // Brief burst + flip, then settle
  if (cardEl) {
    spawnBurst(cardEl);
    cardEl.classList.add('launching');
    setTimeout(() => cardEl.classList.remove('launching'), 380);
  }

  document.getElementById('cs-num').textContent = p.num;

  const content = document.getElementById('cs-content');
  const builders = { furniture: buildFurniturePresentation, capstone: buildCapstonePresentation, stressball: buildStressballPresentation, lamp: buildLampPresentation, compost: buildCompostPresentation, packaging: buildPackagingPresentation, toss: buildTossPresentation, photoshop: buildPhotoshopPresentation, woodworking: buildWoodworkingPresentation };
  const builder = Object.keys(builders).find(k => PROJECTS[k] === p);
  content.innerHTML = builder ? builders[builder](p) : buildPresentation(p);

  cs.classList.add('open');

  // Scroll to case study
  setTimeout(() => cs.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);

  requestAnimationFrame(() => { initPresReveal(content); if (window.applyMode) window.applyMode(); });
}

function closeProjectCS() {
  const cs = document.getElementById('project-cs');
  if (!cs) return;
  // Pause any playing video
  const v = cs.querySelector('.pres-video');
  if (v) { v.pause(); v.currentTime = 0; }
  cs.classList.remove('open');
  document.getElementById('work-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* Keep closeModal for experience.html vol-modal compatibility */
function closeModal() {
  const modal = document.getElementById('modal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('cs-close')?.addEventListener('click', closeProjectCS);
  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  document.getElementById('modal-bg')?.addEventListener('click', closeModal);
});

/* ─────────────────────────────────────────
   STANDALONE PROJECT PAGE
   A dedicated HTML page (e.g. curved-table.html)
   carries <main id="cs-content" data-project="furniture">.
   Render the same presentation builder into it.
───────────────────────────────────────── */
(function initStandaloneProject() {
  const content = document.getElementById('cs-content');
  const id = content?.getAttribute('data-project');
  if (!content || !id) return;
  const p = PROJECTS[id];
  if (!p) return;

  const builders = { furniture: buildFurniturePresentation, capstone: buildCapstonePresentation, stressball: buildStressballPresentation, lamp: buildLampPresentation, compost: buildCompostPresentation, packaging: buildPackagingPresentation, toss: buildTossPresentation, photoshop: buildPhotoshopPresentation, woodworking: buildWoodworkingPresentation };
  const builder = Object.keys(builders).find(k => PROJECTS[k] === p);
  content.innerHTML = builder ? builders[builder](p) : buildPresentation(p);

  const numEl = document.getElementById('cs-num');
  if (numEl) numEl.textContent = p.num;

  requestAnimationFrame(() => { initPresReveal(content); if (window.applyMode) window.applyMode(); });
})();

/* ─────────────────────────────────────────
   STANDALONE VOLUNTEER PAGE
   A dedicated HTML page carries
   <main id="vol-page" data-volunteer="permaculture">.
   Renders the volunteer story centered — no cover image.
───────────────────────────────────────── */
(function initStandaloneVolunteer() {
  const el = document.getElementById('vol-page');
  const id = el?.getAttribute('data-volunteer');
  if (!el || !id) return;
  const v = VOLUNTEERS[id];
  if (!v) return;

  const esc = s => String(s).replace(/'/g, "\\'");
  const photos = (v.photos && v.photos.length)
    ? `<div class="vp-photos">${v.photos.map(s =>
        `<img src="${s}" alt="" loading="lazy" onclick="openLB(this.src)" onerror="this.style.display='none'"/>`
      ).join('')}</div>`
    : '';

  el.innerHTML = `
    <div class="vp-inner">
      <a href="beyond-the-studio.html" class="vp-back">← Beyond the Studio</a>
      <span class="vp-num">${v.num}</span>
      <span class="vp-cat">${v.cat}</span>
      <h1 class="vp-title">${v.title}</h1>
      <div class="vp-meta">
        <div><span class="vp-meta-lbl">Organisation</span><span class="vp-meta-val">${v.org}</span></div>
        <div><span class="vp-meta-lbl">Role</span><span class="vp-meta-val">${v.role}</span></div>
        <div><span class="vp-meta-lbl">Duration</span><span class="vp-meta-val">${v.duration}</span></div>
      </div>
      <p class="vp-desc">${v.desc}</p>
      <div class="cs-row"><span class="cs-label">Learnings</span><p class="cs-body">${v.learnings}</p></div>
      <div class="cs-row"><span class="cs-label">Reflection</span><p class="cs-body">${v.reflection}</p></div>
      ${photos}
    </div>`;

  document.title = v.title + ' — Kanika Kadam';
})();

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
  else if (document.getElementById('vol-modal')?.classList.contains('open')) closeVolModal();
  else if (document.getElementById('project-cs')?.classList.contains('open')) closeProjectCS();
  else closeModal();
});

/* ─────────────────────────────────────────
   VOLUNTEER MODAL
───────────────────────────────────────── */
let _activeVolCard = null;

function openVolunteer(id, cardEl) {
  const v = VOLUNTEERS[id];
  const volModal = document.getElementById('vol-modal');
  if (!v || !volModal) return;

  if (cardEl) {
    _activeVolCard = cardEl;
    spawnBurst(cardEl);
    cardEl.classList.add('launching');
  }

  document.getElementById('vm-num').textContent      = v.num;
  document.getElementById('vm-cat').textContent      = v.cat;
  document.getElementById('vm-title').textContent    = v.title;
  document.getElementById('vm-org').textContent      = v.org;
  document.getElementById('vm-role').textContent     = v.role;
  document.getElementById('vm-duration').textContent = v.duration;
  document.getElementById('vm-desc').textContent     = v.desc;

  // Cover in left column
  const coverSec = document.getElementById('vm-cover-section');
  coverSec.innerHTML = v.cover
    ? `<img class="modal-cover-img" src="${v.cover}" alt="${v.title}" onerror="this.parentElement.innerHTML='<div class=\'modal-cover-ph\'><span>No Image</span></div>'"/>`
    : '<div class="modal-cover-ph"><span>Volunteer</span></div>';
  const vmCoverCat   = document.getElementById('vm-cover-cat');
  const vmCoverTitle = document.getElementById('vm-cover-title');
  if (vmCoverCat)   vmCoverCat.textContent   = v.cat;
  if (vmCoverTitle) vmCoverTitle.textContent = v.title;

  document.getElementById('vm-learnings-section').innerHTML = `
    <div class="cs-row"><span class="cs-label">Learnings</span><p class="cs-body">${v.learnings}</p></div>
    <div class="cs-row"><span class="cs-label">Reflection</span><p class="cs-body">${v.reflection}</p></div>
  `;

  const photosSec  = document.getElementById('vm-photos-section');
  const photosGrid = document.getElementById('vm-photos');
  if (v.photos && v.photos.length) {
    photosGrid.innerHTML = v.photos.map(src =>
      `<img src="${src}" alt="" loading="lazy" onclick="openLB(this.src)" onerror="this.style.display='none'"/>`
    ).join('');
    photosSec.style.display = '';
  } else {
    photosSec.style.display = 'none';
  }

  const col = document.getElementById('vol-modal-content-col');
  if (col) col.scrollTop = 0;

  volModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeVolModal() {
  document.getElementById('vol-modal')?.classList.remove('open');
  document.body.style.overflow = '';
  if (_activeVolCard) {
    _activeVolCard.classList.remove('launching');
    _activeVolCard = null;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('vol-modal-close')?.addEventListener('click', closeVolModal);
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
  const glow = Object.assign(document.createElement('div'), { className: 'cursor-glow' });
  document.body.append(glow, dot); // glow behind dot

  let mx = -300, my = -300, gx = -300, gy = -300;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px,${my}px)`;
  });

  (function lerp() {
    gx += (mx - gx) * 0.09;
    gy += (my - gy) * 0.09;
    glow.style.transform = `translate(${gx}px,${gy}px)`;
    requestAnimationFrame(lerp);
  })();

  document.addEventListener('mouseover', e => {
    const hit = e.target.closest('a,button,[onclick],.project-card,.feat-card,.cl,.nav-cta,.sticky');
    document.body.classList.toggle('cur-link', !!hit);
  });

  document.addEventListener('mousedown', () => document.body.classList.add('cur-click'));
  document.addEventListener('mouseup',   () => document.body.classList.remove('cur-click'));

  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; glow.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = '';  glow.style.opacity = '';  });
})();

/* ─────────────────────────────────────────
   TOUCH FLIP CARDS
   First tap flips to show back; second tap
   fires the existing onclick (open modal).
   Tap outside any card to un-flip.
───────────────────────────────────────── */
(function initTouchFlip() {
  if (!('ontouchstart' in window)) return;

  const cards = document.querySelectorAll('.project-card, .vol-card');
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('click', function(e) {
      if (this.classList.contains('tapped')) return; /* let onclick fire */
      e.preventDefault();
      e.stopPropagation();
      /* un-flip any other open card */
      cards.forEach(c => { if (c !== this) c.classList.remove('tapped'); });
      this.classList.add('tapped');
    }, { capture: true });
  });

  /* Tap outside → un-flip all */
  document.addEventListener('click', e => {
    if (!e.target.closest('.project-card, .vol-card')) {
      cards.forEach(c => c.classList.remove('tapped'));
    }
  });
})();

