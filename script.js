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

// ═══════════════════════════════════════
// EXAM PREP — Tab switching
// ═══════════════════════════════════════
const tabs = document.querySelectorAll('.exam-tab');
const panels = document.querySelectorAll('.exam-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const target = document.getElementById('panel-' + tab.dataset.panel);
    if (target) target.classList.add('active');
    updateProgress();
  });
});

// ═══════════════════════════════════════
// EXAM PREP — Accordion Q&A
// ═══════════════════════════════════════
document.querySelectorAll('.eq-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const card = trigger.closest('.eq-card');
    const isOpen = card.classList.contains('open');

    // Optionally close siblings in same panel for focus
    // card.closest('.exam-panel').querySelectorAll('.eq-card.open').forEach(c => {
    //   if (c !== card) c.classList.remove('open');
    // });

    card.classList.toggle('open', !isOpen);
    updateProgress();
  });
});

// ═══════════════════════════════════════
// EXAM PREP — Progress tracker
// ═══════════════════════════════════════
function updateProgress() {
  const activePanel = document.querySelector('.exam-panel.active');
  if (!activePanel) return;

  const total = activePanel.querySelectorAll('.eq-card').length;
  const done  = activePanel.querySelectorAll('.eq-card.open').length;

  const labelDone  = document.querySelector('.prog-done');
  const labelTotal = document.querySelector('.prog-total');
  const fill       = document.querySelector('.exam-progress-fill');

  if (labelDone)  labelDone.textContent  = done;
  if (labelTotal) labelTotal.textContent = total;
  if (fill)       fill.style.width = total > 0 ? (done / total * 100) + '%' : '0%';
}

// Init progress on load
document.addEventListener('DOMContentLoaded', updateProgress);
