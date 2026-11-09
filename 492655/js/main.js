// Menu mobile
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
}));

// Ombre de l'en-tête au défilement
const header = document.getElementById('header');
addEventListener('scroll', () => header.classList.toggle('is-scrolled', scrollY > 40), { passive: true });

// Apparition des blocs
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Lien actif selon la section visible
const links = [...nav.querySelectorAll('a[href^="#"]')];
const spy = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting) return;
  links.forEach(l => l.classList.toggle('is-current', l.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
links.forEach(l => { const s = document.querySelector(l.getAttribute('href')); if (s) spy.observe(s); });

// Filtre des vins
const filters = document.querySelectorAll('.filter');
const wines = document.querySelectorAll('.wine');
filters.forEach(btn => btn.addEventListener('click', () => {
  filters.forEach(b => { b.classList.toggle('is-active', b === btn); b.setAttribute('aria-selected', b === btn); });
  const f = btn.dataset.filter;
  wines.forEach(w => {
    w.hidden = f !== 'all' && w.dataset.cat !== f;
    if (!w.hidden) w.classList.add('is-visible');
  });
}));

// Visionneuse photo
const lb = document.getElementById('lightbox');
const lbImg = lb.querySelector('img');
document.querySelectorAll('[data-full]').forEach(btn => btn.addEventListener('click', () => {
  lbImg.src = btn.dataset.full;
  lbImg.alt = btn.querySelector('img').alt;
  lb.hidden = false;
}));
const closeLb = () => { lb.hidden = true; lbImg.src = ''; };
lb.addEventListener('click', e => { if (e.target !== lbImg) closeLb(); });
addEventListener('keydown', e => { if (e.key === 'Escape' && !lb.hidden) closeLb(); });

document.getElementById('year').textContent = new Date().getFullYear();
