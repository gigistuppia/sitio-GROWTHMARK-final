/* ============================================
   GROWTHMARK — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================
     LOADING SCREEN
     ============================================ */
  const loadingScreen = document.getElementById('loading-screen');
  const loadingBar    = document.querySelector('.loading-bar');
  const loadingPct    = document.querySelector('.loading-pct');
  let pct = 0;
  const ticker = setInterval(() => {
    pct += Math.random() * 18;
    if (pct >= 100) { pct = 100; clearInterval(ticker); }
    loadingBar.style.width = pct + '%';
    loadingPct.textContent = Math.floor(pct) + '%';
    if (pct === 100) {
      setTimeout(() => {
        loadingScreen.classList.add('exit');
        document.body.style.overflow = '';
      }, 400);
    }
  }, 80);
  document.body.style.overflow = 'hidden';

  /* ============================================
     CUSTOM CURSOR
     ============================================ */
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (dot && ring && window.matchMedia('(pointer: fine)').matches) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    document.addEventListener('mousedown', () => ring.classList.add('click'));
    document.addEventListener('mouseup',   () => ring.classList.remove('click'));

    const hoverEls = document.querySelectorAll('a, button, .proj-card, .filter-btn, .slider-btn, .slider-dot');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });

    const lerp = (a, b, n) => (1 - n) * a + n * b;
    (function animate() {
      rx = lerp(rx, mx, 0.15);
      ry = lerp(ry, my, 0.15);
      dot.style.left  = mx + 'px';
      dot.style.top   = my + 'px';
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animate);
    })();
  }

  /* ============================================
     NAVBAR SCROLL
     ============================================ */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ============================================
     MOBILE MENU
     ============================================ */
  const hamburger  = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ============================================
     HERO LIGHT TRAILS — Parallax
     ============================================ */
  const heroSection = document.getElementById('hero');
  const parallaxLayers = document.querySelectorAll('.trails-parallax');

  if (heroSection && parallaxLayers.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let mx = 0.5, my = 0.5, cx2 = 0.5, cy2 = 0.5;

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      mx = (e.clientX - rect.left) / rect.width;
      my = (e.clientY - rect.top) / rect.height;
    }, { passive: true });

    heroSection.addEventListener('mouseleave', () => { mx = 0.5; my = 0.5; });

    const depths = Array.from(parallaxLayers, function(l) { return parseFloat(l.dataset.depth) || 0; });

    (function tickTrails() {
      cx2 += (mx - cx2) * 0.03;
      cy2 += (my - cy2) * 0.03;
      var ox = (cx2 - 0.5) * 2;
      var oy = (cy2 - 0.5) * 2;
      for (var i = 0; i < parallaxLayers.length; i++) {
        var d = depths[i];
        parallaxLayers[i].style.transform = 'translate(' + (-ox * 18 * d) + 'px,' + (-oy * 12 * d) + 'px)';
      }
      requestAnimationFrame(tickTrails);
    })();
  }

  /* ============================================
     SCROLL REVEAL
     ============================================ */
  const reveals = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => revealObs.observe(el));

  /* ============================================
     STATS COUNTER
     ============================================ */
  const counters = document.querySelectorAll('[data-count]');
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const dur    = 1800;
      const start  = performance.now();
      const easeOut = t => 1 - Math.pow(1 - t, 3);
      (function tick(now) {
        const elapsed = Math.min(now - start, dur);
        const val = Math.floor(easeOut(elapsed / dur) * target);
        el.textContent = val + suffix;
        if (elapsed < dur) requestAnimationFrame(tick);
        else el.textContent = target + suffix;
      })(start);
      countObs.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(el => countObs.observe(el));

  /* ============================================
     PROCESS LINE ANIMATION
     ============================================ */
  const timelineFill  = document.querySelector('.tl-fill');
  const timelineSteps = document.querySelectorAll('.tl-step');
  if (timelineFill) {
    const procObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        timelineFill.style.width = '75%';
        timelineSteps.forEach((s, i) => {
          setTimeout(() => {
            const circle = s.querySelector('.tl-circle');
            if (circle) {
              circle.style.borderColor = '#7B2FFF';
              circle.style.background  = '#7B2FFF';
              circle.style.color       = '#fff';
              circle.style.boxShadow   = '0 0 28px rgba(123,47,255,0.5)';
            }
          }, i * 380);
        });
        procObs.disconnect();
      }
    }, { threshold: 0.3 });
    procObs.observe(document.getElementById('process'));
  }

  /* ============================================
     PORTFOLIO FILTERS
     ============================================ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projCards  = document.querySelectorAll('.proj-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      projCards.forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
      // Re-apply asymmetric grid after filter
      reapplyGrid();
    });
  });

  function reapplyGrid() {
    const visible = [...projCards].filter(c => !c.classList.contains('hidden'));
    visible.forEach((c, i) => {
      c.style.gridColumn = '';
      c.style.gridRow = '';
    });
    if (visible.length > 0 && window.innerWidth > 900) {
      visible[0].style.gridColumn = 'span 2';
      if (visible[3]) visible[3].style.gridColumn = 'span 2';
    }
  }

  /* ============================================
     3D TILT ON PORTFOLIO CARDS
     ============================================ */
  projCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      const tiltX  = dy * -8;
      const tiltY  = dx *  8;
      card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
      card.style.transition = 'transform 0.5s var(--ease)';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });

  /* ============================================
     TESTIMONIALS SLIDER
     ============================================ */
  const track    = document.querySelector('.testimonials-track');
  const cards    = document.querySelectorAll('.testimonial-card');
  const dots     = document.querySelectorAll('.slider-dot');
  const prevBtn  = document.querySelector('.slider-btn.prev');
  const nextBtn  = document.querySelector('.slider-btn.next');
  let current    = 0;
  let autoInterval;

  if (track && cards.length) {
    function goToSlide(idx) {
      current = (idx + cards.length) % cards.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }
    function startAuto() { autoInterval = setInterval(() => goToSlide(current + 1), 5000); }
    function stopAuto()  { clearInterval(autoInterval); }
    if (nextBtn) nextBtn.addEventListener('click',  () => { goToSlide(current + 1); stopAuto(); startAuto(); });
    if (prevBtn) prevBtn.addEventListener('click',  () => { goToSlide(current - 1); stopAuto(); startAuto(); });
    dots.forEach((d, i) => d.addEventListener('click', () => { goToSlide(i); stopAuto(); startAuto(); }));
    track.addEventListener('mouseenter', stopAuto);
    track.addEventListener('mouseleave', startAuto);
    goToSlide(0);
    startAuto();
  }

  /* ============================================
     CONTACT FORM
     ============================================ */
  const form = document.getElementById('contact-form');
  if (form) {
    const submitBtn  = form.querySelector('.btn-submit');
    const submitText = form.querySelector('.btn-submit-text');
    const formSuccess = document.querySelector('.form-success');

    function validateField(input) {
      const group = input.closest('.form-group');
      if (!group) return true;
      const val = input.value.trim();
      let valid = true;
      if (input.required && !val) valid = false;
      if (input.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) valid = false;
      group.classList.toggle('error', !valid);
      return valid;
    }

    form.querySelectorAll('input, select, textarea').forEach(el => {
      el.addEventListener('blur',  () => validateField(el));
      el.addEventListener('input', () => validateField(el));
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      let allValid = true;
      form.querySelectorAll('input[required], select[required], textarea[required]').forEach(el => {
        if (!validateField(el)) allValid = false;
      });
      if (!allValid) return;

      submitBtn.classList.add('loading');
      submitText.textContent = 'Enviando';
      submitBtn.disabled = true;

      setTimeout(() => {
        form.style.display = 'none';
        formSuccess.classList.add('show');
      }, 1800);
    });
  }

  /* ============================================
     SMOOTH SCROLL NAV LINKS
     ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ============================================
     RIPPLE EFFECT ON ALL BUTTONS
     ============================================ */
  document.querySelectorAll(
    '.btn-primary, .btn-outline, .nav-cta, .cta-btn, .btn-submit, .filter-btn, .slider-btn, .mobile-cta, .nav-links a'
  ).forEach(btn => {
    btn.addEventListener('click', function(e) {
      const r = document.createElement('span');
      r.classList.add('ripple-effect');
      const rect = btn.getBoundingClientRect();
      r.style.left = (e.clientX - rect.left) + 'px';
      r.style.top  = (e.clientY - rect.top)  + 'px';
      btn.appendChild(r);
      setTimeout(() => r.remove(), 650);
    });
  });

  /* ============================================
     SCROLL PROGRESS BAR
     ============================================ */
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = (docH > 0 ? (window.scrollY / docH) * 100 : 0) + '%';
    }, { passive: true });
  }


  /* ============================================
     AURORA BLOB 3 TRACKS MOUSE
     ============================================ */
  const ab3 = document.querySelector('.ab3');
  if (ab3) {
    let tx = window.innerWidth / 2, ty = window.innerHeight / 2;
    let cx = tx, cy = ty;
    document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; }, { passive: true });
    (function trackAurora() {
      cx += (tx - cx) * 0.018;
      cy += (ty - cy) * 0.018;
      ab3.style.left      = (cx - 225) + 'px';
      ab3.style.top       = (cy - 225) + 'px';
      ab3.style.transform = 'none';
      ab3.style.animation = 'none';
      requestAnimationFrame(trackAurora);
    })();
  }

  /* END */
});
