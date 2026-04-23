// WDS Compactor & Baler Solutions — main.js

// ── Sticky header shadow on scroll ──
(function () {
  const header = document.getElementById('site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 12);
  }, { passive: true });
})();

// ── Mobile menu toggle ──
(function () {
  const toggle = document.getElementById('menuToggle');
  const nav    = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  function openMenu() {
    nav.classList.add('nav-open');
    toggle.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    nav.classList.remove('nav-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    nav.classList.contains('nav-open') ? closeMenu() : openMenu();
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      closeMenu();
    }
  });

  // Mobile dropdown accordions
  document.querySelectorAll('.has-dropdown > a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });
})();

// ── Contact form (demo — shows success message) ──
function handleFormSubmit(e) {
  e.preventDefault();
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const btn     = form.querySelector('[type="submit"]');

  btn.disabled    = true;
  btn.textContent = 'Sending…';

  // Simulate async submit
  setTimeout(() => {
    form.reset();
    btn.style.display     = 'none';
    success.style.display = 'flex';
  }, 900);
}

// ── Smooth reveal on scroll ──
(function () {
  const els = document.querySelectorAll(
    '.card, .process-step, .trust-item, .service-feature-card, .product-item'
  );
  if (!('IntersectionObserver' in window)) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
    io.observe(el);
  });

  document.addEventListener('animationend', () => {}, { once: true });

  // Revealed class resets
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .revealed { opacity: 1 !important; transform: translateY(0) !important; }
    </style>
  `);
})();
