const doc = document.documentElement;
const progressBar = document.getElementById('scrollProgress');
const cursorGlow = document.getElementById('cursorGlow');
const navLinksWrap = document.getElementById('navLinks');
const menuToggle = document.getElementById('menuToggle');
const typedLine = document.getElementById('typedLine');
const navWrap = document.querySelector('.nav-wrap');
const backToTopBtn = document.getElementById('backToTopBtn');
const introLoader = document.getElementById('introLoader');
const loaderBar = document.getElementById('loaderBar');
const loaderPercent = document.getElementById('loaderPercent');

const navLinks = [...document.querySelectorAll('.nav-links a')];
const sections = [...document.querySelectorAll('section[id], section[data-section]')];
const revealItems = [...document.querySelectorAll('.reveal')];
const parallaxItems = [...document.querySelectorAll('[data-parallax]')];
const tiltCards = [...document.querySelectorAll('.tilt-card')];
const magneticItems = [...document.querySelectorAll('.magnetic')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;

function setScrollProgress() {
  if (!progressBar) return;
  const maxScroll = doc.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  progressBar.style.width = `${Math.min(progress, 100)}%`;
}

function setActiveNav() {
  let current = '';

  sections.forEach(section => {
    const id = section.getAttribute('id');
    if (!id) return;

    const top = section.offsetTop - 140;
    const bottom = top + section.offsetHeight;

    if (window.scrollY >= top && window.scrollY < bottom) {
      current = id;
    }
  });

  navLinks.forEach(link => {
    const target = link.getAttribute('href').replace('#', '');
    link.classList.toggle('active', current === target);
  });
}

function setNavState() {
  if (!navWrap) return;
  navWrap.classList.toggle('scrolled', window.scrollY > 18);
}

function setBackToTopState() {
  if (!backToTopBtn) return;
  backToTopBtn.classList.toggle('visible', window.scrollY > 360);
}

function initReveal() {
  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 60, 240)}ms`;
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach(item => observer.observe(item));
}

function initTyping() {
  if (!typedLine) return;

  const phrases = [
    '> chaining IDOR with weak object-level auth ... done',
    '> validating exploit reliability across session states ... done',
    '> generating remediation-ready security notes ... done'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    const currentPhrase = phrases[phraseIndex];

    if (!deleting) {
      charIndex += 1;
      typedLine.textContent = currentPhrase.slice(0, charIndex);
      if (charIndex === currentPhrase.length) {
        deleting = true;
        setTimeout(tick, 1300);
        return;
      }
    } else {
      charIndex -= 1;
      typedLine.textContent = currentPhrase.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    const speed = deleting ? 22 : 30;
    setTimeout(tick, speed);
  };

  tick();
}

function initCursorGlow() {
  if (!finePointer || reducedMotion || !cursorGlow) {
    cursorGlow.style.display = 'none';
    return;
  }

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;

  window.addEventListener('mousemove', event => {
    targetX = event.clientX;
    targetY = event.clientY;
  });

  const animate = () => {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;
    cursorGlow.style.left = `${currentX}px`;
    cursorGlow.style.top = `${currentY}px`;
    requestAnimationFrame(animate);
  };

  animate();
}

function initParallax() {
  if (!finePointer || reducedMotion) return;

  window.addEventListener('mousemove', event => {
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;

    parallaxItems.forEach(item => {
      const depth = Number(item.dataset.parallax || 0);
      const moveX = x * depth;
      const moveY = y * depth;
      item.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });
  });
}

function initTiltCards() {
  if (!finePointer || reducedMotion) return;

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', event => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * 8;
      const rotateX = (0.5 - py) * 8;
      card.style.setProperty('--mx', `${px * 100}%`);
      card.style.setProperty('--my', `${py * 100}%`);
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
      card.style.setProperty('--mx', '50%');
      card.style.setProperty('--my', '50%');
    });
  });
}

function initMagnetic() {
  if (!finePointer || reducedMotion) return;

  magneticItems.forEach(item => {
    item.addEventListener('mousemove', event => {
      const rect = item.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      item.style.transform = `translate3d(${x * 0.12}px, ${y * 0.12}px, 0)`;
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translate3d(0, 0, 0)';
    });
  });
}

function initMenu() {
  if (!menuToggle || !navLinksWrap) return;

  menuToggle.addEventListener('click', () => {
    navLinksWrap.classList.toggle('open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => navLinksWrap.classList.remove('open'));
  });
}

function initScrollHandlers() {
  window.addEventListener('scroll', () => {
    setScrollProgress();
    setActiveNav();
    setNavState();
    setBackToTopState();
  });
}

function initBackToTop() {
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  });
}

function runIntroLoader() {
  if (!introLoader) return Promise.resolve();

  const duration = reducedMotion ? 320 : 1700;
  const startedAt = performance.now();

  return new Promise(resolve => {
    const tick = now => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const percent = Math.round(progress * 100);

      if (loaderBar) {
        loaderBar.style.transform = `scaleX(${progress})`;
      }

      if (loaderPercent) {
        loaderPercent.textContent = `${percent}%`;
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
        return;
      }

      introLoader.classList.add('done');
      document.body.classList.remove('is-loading');
      document.body.classList.add('is-ready');

      setTimeout(() => {
        introLoader.remove();
        resolve();
      }, reducedMotion ? 80 : 580);
    };

    requestAnimationFrame(tick);
  });
}

function bootPortfolio() {
  setScrollProgress();
  setActiveNav();
  setNavState();
  setBackToTopState();
  initReveal();
  initTyping();
  initCursorGlow();
  initParallax();
  initTiltCards();
  initMagnetic();
  initBackToTop();
  initMenu();
  initScrollHandlers();
}

window.addEventListener('load', async () => {
  await runIntroLoader();
  bootPortfolio();
});
