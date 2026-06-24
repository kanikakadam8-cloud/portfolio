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
    photos: Array.from({length:10},(_,i)=>`images/mad-hatter-lamp/mad-hatter-lamp-${String(i+1).padStart(2,'0')}.png`)
  },
  compost: {
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
    photos: [
      'images/wormy-compost-bin/wormy-compost-bin-01.jpg',
      'images/wormy-compost-bin/wormy-compost-bin-02.jpeg'
    ]
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
    photos: [
      'images/millet-packaging/millet-packaging-01.png',
      'images/millet-packaging/millet-packaging-02.png',
      'images/millet-packaging/millet-packaging-03.png',
      'images/millet-packaging/millet-packaging-04.png'
    ]
  },
  toss: {
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
    cover: 'images/woodworking-lab/woodworking-lab-cover.png',
    photos: Array.from({length:11},(_,i)=>`images/woodworking-lab/woodworking-lab-${String(i+1).padStart(2,'0')}.jpeg`)
  },
  stressball: {
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
    desc: 'A collection of digital illustration and graphic design work in Adobe Photoshop — character portraits, poster compositions, and visual storytelling exploring colour, form, and typography.',
    casestudy: {
      problem: 'Developing a parallel practice in 2D digital art alongside physical product design — exploring how visual communication and image-making inform and sharpen three-dimensional design thinking.',
      process: 'Character illustrations built from life reference and imagination, developed through layered brushwork in Photoshop. Poster compositions explore typographic hierarchy and image-text relationships. Each piece was an exercise in restraint: knowing when to add and when to leave space.',
      outcome: 'A series of illustrated works including character portraits and graphic design compositions. Working regularly in 2D has sharpened my understanding of colour relationships, negative space, and visual balance — skills that transfer directly into product and packaging design.',
      reflection: 'Working in Photoshop is a different kind of making from physical prototyping. Without the resistance of material, the quality of visual decisions alone determines the outcome — which makes it the most demanding and most instructive medium I work in.'
    },
    insight: '2D and 3D design teach each other — every flat composition is a spatial problem in disguise',
    tags: ['Photoshop', 'Illustration', 'Graphic Design', 'Digital Art', 'Character Design', 'Typography'],
    cover: 'images/graphic-design-illustration/graphic-design-illustration-cover.png',
    photos: [
      'images/graphic-design-illustration/graphic-design-illustration-01.jpg',
      'images/graphic-design-illustration/graphic-design-illustration-02.png',
      'images/graphic-design-illustration/graphic-design-illustration-03.png',
      'images/graphic-design-illustration/graphic-design-illustration-04.jpeg'
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

    /* Zoom: 0 → 42% of scroll = scale 2.5 → 1.0 */
    const zoomP = Math.min(progress / 0.42, 1);
    scale       = 2.5 - (1.5 * easeOut(zoomP));

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
  }

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
(function initFeatDrag() {
  if (document.body.dataset.page !== 'home') return;
  const outer = document.getElementById('feat-track-outer');
  if (!outer) return;

  /* Drag-to-scroll */
  let isDown = false, startX = 0, scrollLeft = 0;
  outer.addEventListener('mousedown', e => {
    isDown = true;
    outer.classList.add('is-grabbing');
    startX     = e.pageX - outer.offsetLeft;
    scrollLeft = outer.scrollLeft;
  });
  const endDrag = () => { isDown = false; outer.classList.remove('is-grabbing'); };
  outer.addEventListener('mouseleave', endDrag);
  outer.addEventListener('mouseup',    endDrag);
  outer.addEventListener('mousemove',  e => {
    if (!isDown) return;
    e.preventDefault();
    outer.scrollLeft = scrollLeft - (e.pageX - outer.offsetLeft - startX) * 1.5;
  });

  /* Card reveal — trigger all when section enters viewport */
  const section = document.getElementById('featured');
  if (!section) return;
  const cards = section.querySelectorAll('.feat-full-card');
  let revealed = false;
  const obs = new IntersectionObserver(entries => {
    if (revealed || !entries[0].isIntersecting) return;
    revealed = true;
    cards.forEach(c => c.classList.add('in'));
    obs.disconnect();
  }, { threshold: 0.15 });
  obs.observe(section);
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
  const img = s => `<img src="${s}" alt="" loading="lazy" onclick="openLB('${esc(s)}')"/>`;
  const n = photos.length;
  if (n === 1) return `<div class="pc pc-1">${img(photos[0])}</div>`;
  if (n === 2) return `<div class="pc pc-2">${photos.map(img).join('')}</div>`;
  if (n === 3) return `<div class="pc pc-3">${photos.map(img).join('')}</div>`;
  if (n === 4) return `<div class="pc pc-4">${photos.map(img).join('')}</div>`;
  return `<div class="pc pc-n"><img class="pc-feat" src="${photos[0]}" alt="" loading="lazy" onclick="openLB('${esc(photos[0])}')"/><div class="pc-strip">${photos.slice(1).map(img).join('')}</div></div>`;
}
/* ─────────────────────────────────────────
   CURVED TABLE CUSTOM PRESENTATION BUILDER
───────────────────────────────────────── */
function buildFurniturePresentation(p) {
  const esc = s => s.replace(/'/g, "\\'");
  const i = (src, alt) => `<img src="${src}" alt="${alt||''}" loading="lazy" onclick="openLB('${esc(src)}')"/>`;
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
      <div class="pc-stack-top"><img src="${pt4}" alt="Prototype sketch" onclick="openLB('${pt4.replace(/'/g,"\\'")}')"/></div>
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

  // ── CARD 7: CAD MODELS — Fusion 360, no image (user will provide renders) ──
  h += `<div class="pcard pcard-outcome pres-r">
    <span class="pcard-label">CAD Models &amp; Renders</span>
    <h3 class="pcard-sec-h" style="margin-bottom:0.8rem">Modelled in Autodesk Fusion 360</h3>
    <p class="pcard-brief-body">The final form was fully modelled in <strong>Autodesk Fusion 360</strong> before fabrication began. The 3D model confirmed the proportions, the curvature of the tabletop, the internal shelf spacing, and the slider mechanism clearances before any wood was cut.</p>
  </div>`;

  // ── PROCESS SCATTER 4: Completed table in workshop ──
  h += `<div class="pcard pres-r">${makeCollage([p7, p8])}</div>`;

  // ── CARD 8: FINAL PRODUCT — slide 11 (3 in-use photos) ──
  h += `<div class="pcard pcard-slide-full pres-r">
    <span class="pcard-label pcard-label--pad">Final Product</span>
    <div class="pcard-slide-full-img">${i(base + 'curved-table-final.png', 'Final product in use')}</div>
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
  const img = (src, alt) => `<img src="${src}" alt="${alt || ''}" loading="lazy" onclick="openLB('${esc(src)}')"/>`;
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
    <div class="pcard-intro-img">${img(cad + 'foldable-study-table-render-white.png', 'Foldable Study Table CAD')}</div>
  </div>`;

  // 2. CONTEXT & USER RESEARCH
  h += `<div class="pcard pcard-sec pres-r">
    <div class="pcard-sec-text">
      <span class="pcard-label">Research</span>
      <h3 class="pcard-sec-h">Wood Furniture in the Indian Home</h3>
      <p class="pcard-body">Research started with mapping traditional Indian furniture archetypes &mdash; Sandook, Almari, Jaali Cabinets, and storage units with built-in mechanisms. These revealed how Indian households have always valued furniture that does dual duty: store, divide, and display.</p>
      <p class="pcard-body" style="margin-top:1rem">Field visits across 8 families in Ghatkopar, Kurla, and Chembur (1&ndash;2 BHK homes) confirmed the target user: the <strong>low to middle income group</strong>, for whom furniture must be functional + space-efficient above all else.</p>
      <div class="pcard-tag-row">
        <span class="pcard-tag">Function</span><span class="pcard-tag">Multi-use</span><span class="pcard-tag">Compact</span><span class="pcard-tag">Affordable</span>
      </div>
    </div>
    <div class="pc pc-2 pc--fill">${img(ph + 'foldable-study-table-research-01.png')}${img(ph + 'foldable-study-table-research-02.png')}</div>
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

  // 4. IDEATION — mind map + morphological chart intro
  h += `<div class="pcard pcard-sec pcard-sec--flip pres-r">
    <div class="pc pc-2 pc--fill">${img(ph + 'foldable-study-table-ideation-01.jpg')}${img(ph + 'foldable-study-table-ideation-02.jpg')}</div>
    <div class="pcard-sec-text">
      <span class="pcard-label">Ideation</span>
      <h3 class="pcard-sec-h">From Mind Map to Morphological Chart</h3>
      <p class="pcard-body">The study table&rsquo;s design space was opened through a mind map covering: folding mechanism, workspace, book storage, wall mounting, charging port, modular add-ons, coffee mug holder, laptop stand, and integrated lighting.</p>
      <p class="pcard-body" style="margin-top:1rem">A full morphological chart then mapped every parameter &mdash; table top surface, mechanism type, leg structure, storage form, locking system, portability, lighting, accessories, joinery &mdash; before the most promising combinations were pulled into three concepts.</p>
    </div>
  </div>`;

  // 5. MORPHOLOGICAL CHART detail photo
  h += `<div class="pcard pres-r">${makeCollage([ph + 'foldable-study-table-morph-01.png', ph + 'foldable-study-table-morph-02.jpg', ph + 'foldable-study-table-morph-03.jpg', ph + 'foldable-study-table-morph-04.jpg'])}</div>`;

  // 6. THREE CONCEPTS
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

  // 7. CONCEPT SELECTION
  h += `<div class="pcard pcard-sec pres-r">
    <div class="pcard-sec-text">
      <span class="pcard-label">Concept Selection</span>
      <h3 class="pcard-sec-h">Weighted Criteria &mdash; Concept 2 Chosen</h3>
      <p class="pcard-body">All three concepts were evaluated against weighted design criteria: Compactness (20%), Repairability (15%), Cost (15%), Ergonomics (10%), Aesthetics (10%), Durability (10%), Safety (10%), Multifunctionality (10%).</p>
      <p class="pcard-body" style="margin-top:1rem">Concept 2 &mdash; the Split Fold &mdash; scored highest. Its simultaneous top-and-leg fold achieved the greatest space reduction, used the fewest mechanical parts (lower failure rate, lower cost), and was the most intuitive for a child to operate independently.</p>
    </div>
    <div class="pc pc-2 pc--fill">${img(ph + 'foldable-study-table-selection-01.jpg')}${img(ph + 'foldable-study-table-selection-02.jpg')}</div>
  </div>`;

  // 8. CAD DEVELOPMENT — Fusion 360
  h += `<div class="pcard pcard-cad pres-r">
    <div class="pcard-cad-col">
      <span class="pcard-label">CAD Development</span>
      <h3 class="pcard-sec-h">Modelled in Autodesk Fusion 360</h3>
      <p class="pcard-body">The final form was developed as a full parametric model in <strong>Autodesk Fusion 360</strong>. Every joint, hinge point, and panel thickness was modelled and checked for clearance before any cutting began. The split-fold mechanism was animated and simulated within Fusion 360 to confirm the folding motion worked without pinch points or binding.</p>
      <ul class="pcard-cad-list">
        <li>Software: <strong>Autodesk Fusion 360</strong></li>
        <li>Table surface height: <strong>52 cm</strong> (correct for children aged 6&ndash;12)</li>
        <li>Folded depth: <strong>under 15 cm</strong></li>
        <li>Material: <strong>Birch plywood</strong> with steel hinge inserts</li>
        <li>Weight: <strong>under 14 kg</strong></li>
        <li>Joinery: wooden dowels + screws and bolts</li>
      </ul>
    </div>
    <div class="pcard-cad-renders">
      ${img(cad + 'foldable-study-table-render-4.png',    'Fusion 360 render')}
      ${img(cad + 'foldable-study-table-render-white.png', 'Fusion 360 render white')}
    </div>
  </div>`;

  // 9. FABRICATION — scattered images
  h += `<div class="pcard pcard-sec pcard-sec--flip pres-r">
    <div class="pc pc-3" style="align-self:stretch">${img(ph + 'foldable-study-table-fab-01.jpg')}${img(ph + 'foldable-study-table-fab-02.jpg')}${img(ph + 'foldable-study-table-fab-03.jpg')}</div>
    <div class="pcard-sec-text">
      <span class="pcard-label">Fabrication</span>
      <h3 class="pcard-sec-h">From Digital to Physical</h3>
      <p class="pcard-body">Panels were cut from birch plywood, sanded, and fitted with the steel hinge and slide-bolt locking mechanism drawn from the Fusion 360 model. Each component was test-fitted before final assembly to verify the fold clearances matched the simulation.</p>
    </div>
  </div>`;

  h += `<div class="pcard pres-r">${makeCollage([
    ph + 'foldable-study-table-fab-04.jpg',
    ph + 'foldable-study-table-fab-05.jpg',
    ph + 'foldable-study-table-fab-06.jpg',
    ph + 'foldable-study-table-fab-07.jpg',
    ph + 'foldable-study-table-fab-08.jpg',
  ])}</div>`;

  h += `<div class="pcard pcard-sec pres-r">
    <div class="pcard-sec-text">
      <span class="pcard-label">Assembly &amp; User Testing</span>
      <h3 class="pcard-sec-h">Child-Tested Setup</h3>
      <p class="pcard-body">Three children aged 7&ndash;11 were asked to set up and pack down the table independently. All three completed the process within two minutes &mdash; confirming the fold mechanism was intuitive enough for the target age group without adult assistance.</p>
    </div>
    <div class="pc pc-2 pc--fill">${img(ph + 'foldable-study-table-test-01.jpeg')}${img(ph + 'foldable-study-table-test-02.jpeg')}</div>
  </div>`;

  h += `<div class="pcard pres-r">${makeCollage([
    ph + 'foldable-study-table-final-01.jpeg',
    ph + 'foldable-study-table-final-02.jpeg',
    ph + 'foldable-study-table-final-03.jpeg',
    ph + 'foldable-study-table-final-04.jpeg',
    ph + 'foldable-study-table-final-05.png',
  ])}</div>`;

  // 10. OUTCOME
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
        ${thumbs.length ? `<div class="pcard-thumbs">
          ${thumbs.map(s => `<img src="${s}" alt="" loading="lazy" onclick="openLB('${esc(s)}')"/>`).join('')}
        </div>` : ''}
        <span class="pcard-year">${p.year}</span>
      </div>
    </div>
    <div class="pcard-intro-img">
      ${mainPhoto ? `<img src="${mainPhoto}" alt="${p.title}" loading="eager"/>` : ''}
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
  const builders = { furniture: buildFurniturePresentation, capstone: buildCapstonePresentation };
  const builder = Object.keys(builders).find(k => PROJECTS[k] === p);
  content.innerHTML = builder ? builders[builder](p) : buildPresentation(p);

  cs.classList.add('open');

  // Scroll to case study
  setTimeout(() => cs.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);

  requestAnimationFrame(() => { initPresReveal(content); });
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

  const builders = { furniture: buildFurniturePresentation, capstone: buildCapstonePresentation };
  const builder = Object.keys(builders).find(k => PROJECTS[k] === p);
  content.innerHTML = builder ? builders[builder](p) : buildPresentation(p);

  const numEl = document.getElementById('cs-num');
  if (numEl) numEl.textContent = p.num;

  requestAnimationFrame(() => initPresReveal(content));
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
      `<img src="${src}" alt="" loading="lazy" onclick="openLB('${src}')" onerror="this.style.display='none'"/>`
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

