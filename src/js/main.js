// ARQTEGA — interactions
// Vanilla JS, no framework. IIFE keeps scope clean.

(() => {
  'use strict';

  const WA_PHONE = '527757511053'; // 52 + 1 775 751 1053

  /* ---------------- Project data ---------------- */
  // Order per project: cover, render, maqueta PA, maqueta PB, plano PA, plano PB
  // Project 1 uses real brand assets; 2 and 3 use placehold.co branded tones.
  const PROJECTS = [
    {
      id: 0,
      name: 'Casa Regional Mexicana',
      cover: '/src/brand_assets/proyecto1-maqueta-pa.jpeg',
      slides: [
        {
          src: '/src/brand_assets/proyecto1-render.jpeg',
          title: 'Render exterior',
          desc: 'Vista exterior principal. Fachada con bóveda de ladrillo, integración a patio y lenguaje regional contemporáneo.',
        },
        {
          src: '/src/brand_assets/proyecto1-render-int.jpeg',
          title: 'Render interior',
          desc: 'Interior de la sala-comedor con doble altura, viguería de madera y bóveda catalana. Luz cálida controlada.',
        },
        {
          src: '/src/brand_assets/proyecto1-maqueta-pa.jpeg',
          title: 'Maqueta digital · Planta Alta',
          desc: 'Axonométrica de planta alta. Tres recámaras, dos baños y terraza posterior con vista al patio.',
        },
        {
          src: '/src/brand_assets/proyecto1-maqueta-pb.jpeg',
          title: 'Maqueta digital · Planta Baja',
          desc: 'Axonométrica de planta baja. Vestíbulo, sala-comedor, cocina, estudio y baño de visitas.',
        },
        {
          src: '/src/brand_assets/proyecto1-plano-pa.jpeg',
          title: 'Plano ejecutivo · Planta Alta',
          desc: 'Plano 2D de planta alta con cotas, niveles y referencias estructurales.',
        },
        {
          src: '/src/brand_assets/proyecto1-plano-pb.jpeg',
          title: 'Plano ejecutivo · Planta Baja',
          desc: 'Plano 2D de planta baja con ejes, dimensiones y cuadro de áreas.',
        },
      ],
    },
    {
      id: 1,
      name: 'Residencia Minimalista',
      cover: 'https://placehold.co/1600x1000/2A2520/D4A574?text=Proyecto+02&font=playfair',
      slides: [
        { src: 'https://placehold.co/1600x1000/2A2520/D4A574?text=Render+02-1&font=playfair', title: 'Render exterior', desc: 'Composición de volúmenes puros con paleta monocromática y planos de luz cenital.' },
        { src: 'https://placehold.co/1600x1000/2A2520/D4A574?text=Render+02-2&font=playfair', title: 'Render interior', desc: 'Sala con doble altura, materiales cálidos y control lumínico estricto.' },
        { src: 'https://placehold.co/1600x1000/2A2520/D4A574?text=Maqueta+02-PA&font=playfair', title: 'Maqueta digital · PA', desc: 'Axonométrica de planta alta. Recámara principal con vestidor y terraza privada.' },
        { src: 'https://placehold.co/1600x1000/2A2520/D4A574?text=Maqueta+02-PB&font=playfair', title: 'Maqueta digital · PB', desc: 'Axonométrica de planta baja. Espacios sociales integrados a jardín.' },
        { src: 'https://placehold.co/1600x1000/2A2520/D4A574?text=Plano+02-PA&font=playfair', title: 'Plano ejecutivo · PA', desc: 'Plano 2D de planta alta con cotas y cuadro de áreas.' },
        { src: 'https://placehold.co/1600x1000/2A2520/D4A574?text=Plano+02-PB&font=playfair', title: 'Plano ejecutivo · PB', desc: 'Plano 2D de planta baja con ejes estructurales y niveles.' },
      ],
    },
    {
      id: 2,
      name: 'Local Comercial',
      cover: 'https://placehold.co/1600x1000/2A2520/D4A574?text=Proyecto+03&font=playfair',
      slides: [
        { src: 'https://placehold.co/1600x1000/2A2520/D4A574?text=Render+03-1&font=playfair', title: 'Render exterior', desc: 'Fachada activa con doble altura y criterios de eficiencia energética.' },
        { src: 'https://placehold.co/1600x1000/2A2520/D4A574?text=Render+03-2&font=playfair', title: 'Render interior', desc: 'Planta libre flexible con mezzanine y núcleo de servicios.' },
        { src: 'https://placehold.co/1600x1000/2A2520/D4A574?text=Maqueta+03-PA&font=playfair', title: 'Maqueta digital · PA', desc: 'Axonométrica de mezzanine con zona de exposición y oficinas.' },
        { src: 'https://placehold.co/1600x1000/2A2520/D4A574?text=Maqueta+03-PB&font=playfair', title: 'Maqueta digital · PB', desc: 'Axonométrica de planta baja con acceso principal y área de venta.' },
        { src: 'https://placehold.co/1600x1000/2A2520/D4A574?text=Plano+03-PA&font=playfair', title: 'Plano ejecutivo · PA', desc: 'Plano 2D de mezzanine con instalación eléctrica y datos.' },
        { src: 'https://placehold.co/1600x1000/2A2520/D4A574?text=Plano+03-PB&font=playfair', title: 'Plano ejecutivo · PB', desc: 'Plano 2D de planta baja con layout, instalaciones y acabados.' },
      ],
    },
  ];

  /* ---------------- Mobile menu ---------------- */
  const menuBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('icon-open');
  const iconClose = document.getElementById('icon-close');
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('.mobile-link') : [];

  function closeMenu() {
    if (!mobileMenu || mobileMenu.classList.contains('hidden')) return;
    mobileMenu.classList.add('hidden');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Abrir menú');
    iconOpen.classList.remove('hidden');
    iconClose.classList.add('hidden');
    document.body.classList.remove('no-scroll');
  }
  function openMenu() {
    mobileMenu.classList.remove('hidden');
    mobileMenu.setAttribute('aria-hidden', 'false');
    menuBtn.setAttribute('aria-expanded', 'true');
    menuBtn.setAttribute('aria-label', 'Cerrar menú');
    iconOpen.classList.add('hidden');
    iconClose.classList.remove('hidden');
    document.body.classList.add('no-scroll');
  }

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      if (mobileMenu.classList.contains('hidden')) openMenu();
      else closeMenu();
    });
    mobileLinks.forEach((a) => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) closeMenu();
    });
  }

  /* ---------------- Nav scroll state (transparent → solid) ---------------- */
  const nav = document.getElementById('nav');
  function updateNav() {
    if (!nav) return;
    if (window.scrollY > 80) {
      nav.classList.add('bg-bg/90', 'backdrop-blur-md', 'border-b', 'border-line');
      nav.classList.remove('bg-transparent');
    } else {
      nav.classList.remove('bg-bg/90', 'backdrop-blur-md', 'border-b', 'border-line');
      nav.classList.add('bg-transparent');
    }
  }
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  /* ---------------- Scroll-reveal ---------------- */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------------- Lightbox ---------------- */
  const dlg = document.getElementById('lightbox');
  const lbImage = document.getElementById('lb-image');
  const lbProject = document.getElementById('lb-project');
  const lbTitle = document.getElementById('lb-title');
  const lbDesc = document.getElementById('lb-desc');
  const lbCounter = document.getElementById('lb-counter');
  const btnClose = dlg && dlg.querySelector('[data-lb-close]');
  const btnPrev = dlg && dlg.querySelector('[data-lb-prev]');
  const btnNext = dlg && dlg.querySelector('[data-lb-next]');
  const waFloat = document.getElementById('wa-float');

  let lbProjectIndex = 0;
  let lbSlideIndex = 0;
  let lastFocused = null;

  function renderSlide() {
    const project = PROJECTS[lbProjectIndex];
    const slide = project.slides[lbSlideIndex];
    lbImage.src = slide.src;
    lbImage.alt = `${project.name} — ${slide.title}`;
    lbProject.textContent = project.name;
    lbTitle.textContent = slide.title;
    lbDesc.textContent = slide.desc;
    lbCounter.textContent = `${lbSlideIndex + 1} / ${project.slides.length}`;
  }

  function openLightbox(projectIndex) {
    if (!dlg) return;
    lbProjectIndex = projectIndex;
    lbSlideIndex = 0;
    renderSlide();
    lastFocused = document.activeElement;
    if (typeof dlg.showModal === 'function') dlg.showModal();
    else dlg.setAttribute('open', '');
    document.body.classList.add('no-scroll');
    if (waFloat) waFloat.style.opacity = '0';
    if (waFloat) waFloat.style.pointerEvents = 'none';
    btnClose.focus();
  }

  function closeLightbox() {
    if (!dlg) return;
    if (typeof dlg.close === 'function' && dlg.open) dlg.close();
    else dlg.removeAttribute('open');
    document.body.classList.remove('no-scroll');
    if (waFloat) { waFloat.style.opacity = ''; waFloat.style.pointerEvents = ''; }
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  function nextSlide() {
    const len = PROJECTS[lbProjectIndex].slides.length;
    lbSlideIndex = (lbSlideIndex + 1) % len;
    renderSlide();
  }
  function prevSlide() {
    const len = PROJECTS[lbProjectIndex].slides.length;
    lbSlideIndex = (lbSlideIndex - 1 + len) % len;
    renderSlide();
  }

  document.querySelectorAll('.portfolio-card').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-project'), 10);
      openLightbox(idx);
    });
  });

  if (btnClose) btnClose.addEventListener('click', closeLightbox);
  if (btnNext) btnNext.addEventListener('click', nextSlide);
  if (btnPrev) btnPrev.addEventListener('click', prevSlide);

  // Keyboard nav + Esc + click-outside-image closes
  if (dlg) {
    dlg.addEventListener('click', (e) => {
      // close when clicking on backdrop area (not on figure / image / buttons)
      if (e.target === dlg) closeLightbox();
    });
    dlg.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); nextSlide(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); prevSlide(); }
      else if (e.key === 'Escape') { e.preventDefault(); closeLightbox(); }
    });
  }

  /* ---------------- Cotizador → WhatsApp ---------------- */
  const cotForm = document.getElementById('cotizador-form');
  if (cotForm) {
    cotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const tipo = document.getElementById('tipo').value;
      const m2 = document.getElementById('m2').value;
      if (!tipo || !m2) return;
      const msg = `Hola ARQTEGA, me interesa cotizar un proyecto.\n\nTipo: ${tipo}\nm² aproximados: ${m2}`;
      const url = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank', 'noopener');
    });
  }

})();