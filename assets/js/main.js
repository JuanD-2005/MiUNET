/**
 * main.js — MiUNET
 * Carga los partials de cada tab, luego maneja navegación y animaciones.
 */

const TABS = ['principal', 'seguimiento', 'glosario', 'actividades', 'evaluacion', 'final'];
const app       = document.getElementById('app');
const nav       = document.getElementById('main-nav');
const hamburger = document.getElementById('hamburger');

/* ── 1. Carga todos los partials en paralelo ─── */
async function loadTabs() {
  const fetches = TABS.map(id =>
    fetch(`tabs/${id}.html`).then(r => r.text())
  );
  const htmls = await Promise.all(fetches);
  app.innerHTML = htmls.join('\n');
}

/* ── 2. Navegación ──────────────────────────── */
function switchTab(tabId) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('tab-' + tabId).classList.add('active');

  document.querySelectorAll('nav button[data-tab]').forEach(b => b.classList.remove('active'));
  document.querySelector(`nav button[data-tab="${tabId}"]`).classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
  nav.classList.remove('open');
  animateBars();
}

/* ── 3. Animar barras del tab visible ────────── */
function animateBars() {
  document.querySelectorAll('.tab-panel.active .bar-fill, .tab-panel.active .progress-fill')
    .forEach(el => {
      const target = el.dataset.width || el.style.width;
      if (!target) return;
      el.dataset.width = target;
      el.style.width = '0';
      requestAnimationFrame(() => setTimeout(() => { el.style.width = target; }, 80));
    });
}

/* ── 4. Hamburger ───────────────────────────── */
hamburger.addEventListener('click', () => nav.classList.toggle('open'));

/* ── 5. Registrar botones de nav ────────────── */
function bindNav() {
  document.querySelectorAll('nav button[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
}

/* ── 6. Animación de entrada (tab principal) ── */
function staggerCards() {
  document.querySelectorAll('#tab-principal .card').forEach((c, i) => {
    c.style.opacity   = '0';
    c.style.transform = 'translateY(20px)';
    setTimeout(() => {
      c.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      c.style.opacity    = '1';
      c.style.transform  = 'translateY(0)';
    }, i * 60);
  });
}

/* ── Init ───────────────────────────────────── */
(async () => {
  await loadTabs();
  bindNav();
  switchTab('principal');
  staggerCards();
})();

/* Exponer switchTab globalmente (usado en botones inline del HTML) */
window.switchTab = switchTab;
