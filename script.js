/* =========================================================
   Viraj Takone — Portfolio Interactions
   ========================================================= */

(function () {
  const html = document.documentElement;
  const icon = document.getElementById('themeIcon');

  function applyTheme(theme) {
    if (theme === 'light') {
      html.classList.add('light');
      if (icon) icon.textContent = '☀️';
    } else {
      html.classList.remove('light');
      if (icon) icon.textContent = '🌙';
    }
    try { localStorage.setItem('vt-theme', theme); } catch (e) {}
  }

  window.toggleTheme = function () {
    applyTheme(html.classList.contains('light') ? 'dark' : 'light');
  };

  let savedTheme = 'light';
  try { savedTheme = localStorage.getItem('vt-theme') || 'light'; } catch (e) {}
  applyTheme(savedTheme);

  // ── TECH LOGOS FOR SKILL TAGS & TECH PILLS ──
  const ICON_MAP = {
    'java': 'devicon-java-plain colored',
    'javascript': 'devicon-javascript-plain colored',
    'typescript': 'devicon-typescript-plain colored',
    'python': 'devicon-python-plain colored',
    'c++': 'devicon-cplusplus-plain colored',
    'sql': 'fa-solid fa-database icon-generic',
    'react.js': 'devicon-react-original colored',
    'html': 'devicon-html5-plain colored',
    'css': 'devicon-css3-plain colored',
    'scss': 'devicon-sass-original colored',
    'es6': 'fa-brands fa-js icon-generic',
    'tailwind css': 'devicon-tailwindcss-plain colored',
    'figma': 'devicon-figma-plain colored',
    'spring boot': 'devicon-spring-plain colored',
    'node.js': 'devicon-nodejs-plain colored',
    'express.js': 'devicon-express-original',
    'fastapi': 'devicon-fastapi-plain colored',
    'fastmcp': 'fa-solid fa-server icon-generic',
    'rest apis': 'fa-solid fa-plug icon-generic',
    'junit': 'fa-solid fa-vial icon-generic',
    'mockito': 'fa-solid fa-vial-circle-check icon-generic',
    'vitest': 'devicon-vitest-plain colored',
    'jest': 'devicon-jest-plain colored',
    'llms': 'fa-solid fa-brain icon-generic',
    'rag': 'fa-solid fa-diagram-project icon-generic',
    'vector dbs': 'fa-solid fa-cube icon-generic',
    'vector db': 'fa-solid fa-cube icon-generic',
    'mcp': 'fa-solid fa-network-wired icon-generic',
    'ai agent/skill customization': 'fa-solid fa-robot icon-generic',
    'git': 'devicon-git-plain colored',
    'gitlab': 'devicon-gitlab-plain colored',
    'ci/cd': 'fa-solid fa-arrows-rotate icon-generic',
    'docker': 'devicon-docker-plain colored',
    'jenkins': 'devicon-jenkins-line colored',
    'terraform': 'devicon-terraform-plain colored',
    'mongodb': 'devicon-mongodb-plain colored',
    'data structures & algorithms': 'fa-solid fa-sitemap icon-generic',
    'operating systems': 'fa-solid fa-microchip icon-generic',
    'dbms': 'fa-solid fa-database icon-generic',
    'aws': 'devicon-amazonwebservices-plain-wordmark colored',
    'gitlab api': 'devicon-gitlab-plain colored',
    'gitlab mcp': 'fa-solid fa-network-wired icon-generic',
    'nexusiq': 'fa-solid fa-shield-halved icon-generic',
    'sonarqube': 'devicon-sonarqube-plain colored',
    'fortify': 'fa-solid fa-shield-halved icon-generic',
    'socket.io': 'fa-solid fa-bolt icon-generic',
    'webrtc': 'fa-solid fa-video icon-generic',
    'data analysis': 'fa-solid fa-chart-line icon-generic',
    'financial apis': 'fa-solid fa-coins icon-generic'
  };

  function iconFor(label) {
    const key = label.trim().toLowerCase();
    return ICON_MAP[key] || 'fa-solid fa-code icon-generic';
  }

  document.querySelectorAll('.skill-tag, .tech-pill').forEach((tag) => {
    const label = tag.textContent;
    const cls = iconFor(label);
    const icon = document.createElement('i');
    cls.split(' ').forEach((c) => icon.classList.add(c));
    tag.textContent = '';
    tag.appendChild(icon);
    const span = document.createElement('span');
    span.textContent = label;
    tag.appendChild(span);
  });

  // ── STAGGERED POP-IN FOR SKILL TAGS ──
  document.querySelectorAll('.skill-group').forEach((group) => {
    const tags = group.querySelectorAll('.skill-tag');
    tags.forEach((t, i) => { t.style.setProperty('--tag-delay', (i * 0.05) + 's'); });
  });
  const tagPopObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-tag').forEach((t) => t.classList.add('tag-pop'));
        tagPopObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.skill-group').forEach((g) => tagPopObserver.observe(g));


  // ── SHINE SWEEP ELEMENTS ──
  document.querySelectorAll('.proj-card, .exp-card, .edu-card, .skill-group').forEach((card) => {
    const shine = document.createElement('span');
    shine.className = 'shine-sweep';
    card.appendChild(shine);
  });

  // ── MOBILE MENU ──
  window.toggleMenu = function () {
    const m = document.getElementById('mobileMenu');
    const t = document.querySelector('.nav-toggle');
    m.classList.toggle('open');
    if (t) t.classList.toggle('open');
  };

  // ── SCROLL PROGRESS BAR ──
  const progress = document.getElementById('scrollProgress');
  function updateProgress() {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    if (progress) progress.style.width = (isFinite(scrolled) ? scrolled : 0) + '%';
  }
  document.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // ── CURSOR GLOW ──
  const glow = document.getElementById('cursorGlow');
  if (glow && window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('mousemove', (e) => {
      document.documentElement.style.setProperty('--cursor-x', e.clientX + 'px');
      document.documentElement.style.setProperty('--cursor-y', e.clientY + 'px');
    }, { passive: true });
  }

  // ── ACTIVE NAV LINK ON SCROLL ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
  function updateActiveNav() {
    let current = '';
    sections.forEach((sec) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) current = sec.getAttribute('id');
    });
    navLinks.forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }
  document.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // ── SCROLL-TRIGGERED REVEALS (with stagger) ──
  const revealTargets = document.querySelectorAll(
    '.exp-card, .edu-card, .proj-card, .skill-group, .ach-item, .profile-link, .section-title, .section-line, .section-label'
  );
  revealTargets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.setProperty('--reveal-delay', (i % 6) * 0.07 + 's');
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealTargets.forEach((el) => observer.observe(el));

  // ── MAGNETIC BUTTONS ──
  const magnets = document.querySelectorAll('.magnetic');
  magnets.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.18}px, ${y * 0.35}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0,0)';
    });
  });

  // ── PROJECT CARD TILT ──
  const tiltCards = document.querySelectorAll('.proj-card');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `rotateY(${px * 6}deg) rotateX(${-py * 6}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateY(0) rotateX(0) translateY(0)';
    });
  });

  // ── PRELOADER ──
  const preloader = document.getElementById('preloader');
  function finishPreload() {
    document.body.classList.remove('pre-lock');
    if (preloader) {
      preloader.classList.add('done');
      setTimeout(() => { preloader.style.display = 'none'; }, 950);
    }
  }
  if (preloader) {
    if (document.readyState === 'complete') {
      setTimeout(finishPreload, 700);
    } else {
      window.addEventListener('load', () => setTimeout(finishPreload, 500));
    }
    // safety net so the page is never stuck hidden
    setTimeout(finishPreload, 3200);
  } else {
    document.body.classList.remove('pre-lock');
  }

  // ── CUSTOM CURSOR (dot + trailing ring) ──
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  const hasHover = window.matchMedia('(hover: hover)').matches;
  if (hasHover && cursorDot && cursorRing) {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      cursorDot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    }, { passive: true });

    function ringLoop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      cursorRing.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(ringLoop);
    }
    ringLoop();

    document.addEventListener('mousedown', () => cursorRing.classList.add('cursor-down'));
    document.addEventListener('mouseup', () => cursorRing.classList.remove('cursor-down'));

    const hoverTargets = 'a, button, .theme-toggle, .nav-toggle, .skill-tag, .proj-card, .exp-card, .edu-card, .profile-link, .ach-item';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverTargets)) cursorRing.classList.add('cursor-hover');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverTargets)) cursorRing.classList.remove('cursor-hover');
    });
  } else {
    if (cursorDot) cursorDot.style.display = 'none';
    if (cursorRing) cursorRing.style.display = 'none';
  }

  // ── NAV HIDE ON SCROLL DOWN / SHOW ON SCROLL UP ──
  const navEl = document.querySelector('nav');
  let lastScrollY = window.scrollY;
  function handleNavVisibility() {
    const y = window.scrollY;
    if (navEl) {
      if (y > lastScrollY && y > 140) {
        navEl.classList.add('nav-hidden');
      } else {
        navEl.classList.remove('nav-hidden');
      }
    }
    lastScrollY = y;
  }
  document.addEventListener('scroll', handleNavVisibility, { passive: true });

  // ── SCROLL PARALLAX LAYERS ──
  const parallaxEls = Array.from(document.querySelectorAll('[data-parallax]'));
  function updateParallax() {
    const y = window.scrollY;
    parallaxEls.forEach((el) => {
      const speed = parseFloat(el.getAttribute('data-parallax')) || 0.2;
      el.style.transform = `translate3d(0, ${y * speed * -0.4}px, 0)`;
    });
  }
  if (parallaxEls.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.addEventListener('scroll', () => requestAnimationFrame(updateParallax), { passive: true });
    updateParallax();
  }

  // ── KINETIC MARQUEE BANNERS (scroll-scrubbed) ──
  const kineticTracks = [
    document.getElementById('kineticTrack1'),
    document.getElementById('kineticTrack2')
  ].filter(Boolean);
  function updateKinetic() {
    const y = window.scrollY;
    kineticTracks.forEach((track, i) => {
      const dir = i % 2 === 0 ? -1 : 1;
      const offset = (y * 0.12 * dir) % (track.scrollWidth / 2 || 1);
      track.style.transform = `translateX(${offset}px)`;
    });
  }
  if (kineticTracks.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.addEventListener('scroll', () => requestAnimationFrame(updateKinetic), { passive: true });
    updateKinetic();
  }

  // ── KINETIC SPLIT TEXT ON SECTION TITLES ──
  function splitIntoChars(el) {
    const words = el.textContent.split(' ');
    el.textContent = '';
    el.classList.add('split-text');
    words.forEach((word, wi) => {
      word.split('').forEach((ch, ci) => {
        const span = document.createElement('span');
        span.className = 'split-char';
        span.textContent = ch;
        span.style.transitionDelay = ((wi * 4 + ci) * 0.018) + 's';
        el.appendChild(span);
      });
      if (wi < words.length - 1) {
        const space = document.createElement('span');
        space.className = 'split-char';
        space.innerHTML = '&nbsp;';
        el.appendChild(space);
      }
    });
  }
  const splitTargets = document.querySelectorAll('.section-title');
  splitTargets.forEach(splitIntoChars);
  const splitObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        splitObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  splitTargets.forEach((el) => splitObserver.observe(el));

  // ── COUNT-UP STATS ──
  const countEls = document.querySelectorAll('[data-count]');
  function animateCount(el) {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const valEl = el.querySelector('.count-val') || el;
    const duration = 1100;
    const start = performance.now();
    function frame(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      valEl.textContent = Math.round(eased * target);
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animateCount(e.target);
        countObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  countEls.forEach((el) => countObserver.observe(el));

  // ── BUTTON RIPPLE ──
  document.querySelectorAll('.btn-primary, .btn-outline').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const r = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(r.width, r.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - r.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - r.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  // ── TYPEWRITER ROLE TEXT ──
  const roleEl = document.getElementById('typedRole');
  if (roleEl) {
    const roles = ['Full Stack Developer', 'Software Developer', 'AI Tooling Engineer'];
    let roleIdx = 0, charIdx = 0, deleting = false;
    const textSpan = document.createElement('span');
    const cursorSpan = document.createElement('span');
    cursorSpan.className = 'type-cursor';
    cursorSpan.innerHTML = '&nbsp;';
    roleEl.textContent = '';
    roleEl.appendChild(textSpan);
    roleEl.appendChild(cursorSpan);

    function tick() {
      const current = roles[roleIdx];
      if (!deleting) {
        charIdx++;
        textSpan.textContent = current.slice(0, charIdx);
        if (charIdx === current.length) {
          deleting = true;
          setTimeout(tick, 1600);
          return;
        }
      } else {
        charIdx--;
        textSpan.textContent = current.slice(0, charIdx);
        if (charIdx === 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
        }
      }
      setTimeout(tick, deleting ? 40 : 70);
    }
    setTimeout(tick, 500);
  }
})();