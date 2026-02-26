// Scroll reveal animation
const revealElements = document.querySelectorAll(
  '.clo-card, .fn-card, .inv-item, .risk-card, .en-card, .app-card, ' +
  '.pipe-step, .compare-card, .defect-item, .kpi-card, .method-step, ' +
  '.classify-block, .info-banner, .why-cards'
);

revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, (Array.from(revealElements).indexOf(entry.target) % 6) * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => observer.observe(el));

// Smooth active nav pill highlight
const sections = document.querySelectorAll('section[id]');
const pills = document.querySelectorAll('.pill');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 200) {
      current = section.getAttribute('id');
    }
  });
  pills.forEach(pill => {
    pill.style.background = pill.getAttribute('href') === `#${current}` ? '#2d2d3a' : '';
    pill.style.color = pill.getAttribute('href') === `#${current}` ? '#fff' : '';
  });
});

// ── Q&A Accordion ──
document.querySelectorAll('.qa-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.qa-item');
    const answer = item.querySelector('.qa-a');
    const isOpen = btn.classList.contains('open');

    // Close all others
    document.querySelectorAll('.qa-q.open').forEach(b => {
      b.classList.remove('open');
      b.closest('.qa-item').querySelector('.qa-a').classList.remove('open');
    });

    // Toggle this one
    if (!isOpen) {
      btn.classList.add('open');
      answer.classList.add('open');
      // Smooth scroll into view
      setTimeout(() => item.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
    }
  });
});
