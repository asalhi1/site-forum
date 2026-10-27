'use strict';
document.documentElement.classList.add('js');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');
const mobileViewport = window.matchMedia('(max-width: 1050px)');
function setMenu(open, returnFocus = false) {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
  if (returnFocus) menuButton.focus();
}
menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
navigation?.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link) return;
  const wasOpen = menuButton?.getAttribute('aria-expanded') === 'true';
  setMenu(false);
  // Keep keyboard focus out of the collapsed menu after local navigation.
  if (wasOpen) {
    const href = link.getAttribute('href');
    const destination = href.startsWith('#') && document.getElementById(href.slice(1));
    if (destination) {
      destination.setAttribute('tabindex', '-1');
      destination.focus({ preventScroll: true });
      destination.addEventListener('blur', () => destination.removeAttribute('tabindex'), { once: true });
    }
  }
});
document.addEventListener('keydown', event => {
  if (menuButton?.getAttribute('aria-expanded') !== 'true') return;
  if (event.key === 'Escape') setMenu(false, true);
  if (event.key === 'Tab') {
    const items = [menuButton, ...navigation.querySelectorAll('a')];
    const first = items[0], last = items.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) setMenu(false); });
mobileViewport.addEventListener('change', () => setMenu(false));
// Follow the current section without changing browser history.
if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      links.forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-15% 0px -65% 0px' });
  links.forEach(link => { const section = document.getElementById(link.hash.slice(1)); if (section) observer.observe(section); });
}
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
function enter(element, distance = 12, duration = 450) {
  if (!element || motionPreference.matches || !element.animate) return;
  element.getAnimations().forEach(animation => animation.cancel());
  element.animate([
    { opacity: 0, transform: `translateY(${distance}px)` },
    { opacity: 1, transform: 'translateY(0)' }
  ], { duration, easing: 'cubic-bezier(.2,.7,.2,1)' });
}
// Respect a preference change even while a transition is running.
motionPreference.addEventListener('change', event => {
  if (event.matches) document.getAnimations().forEach(animation => animation.cancel());
});

const quoteButtons = [...document.querySelectorAll('.quote-selector')];
const quoteSlides = [...document.querySelectorAll('.quote-slide')];
const quoteCurrent = document.querySelector('#quote-current');
let currentQuote = 0;
function showQuote(index) {
  if (!quoteSlides.length) return;
  const next = (index + quoteSlides.length) % quoteSlides.length;
  if (next === currentQuote) return;
  currentQuote = next;
  quoteSlides.forEach((slide, i) => { slide.hidden = i !== next; });
  quoteButtons.forEach((control, i) => control.setAttribute('aria-pressed', String(i === next)));
  if (quoteCurrent) quoteCurrent.textContent = String(next + 1).padStart(2, '0');
  enter(quoteSlides[next]);
}
quoteButtons.forEach((button, index) => button.addEventListener('click', () => showQuote(index)));
document.querySelector('.quote-prev')?.addEventListener('click', () => showQuote(currentQuote - 1));
document.querySelector('.quote-next')?.addEventListener('click', () => showQuote(currentQuote + 1));
document.querySelector('.quote-selectors')?.addEventListener('keydown', event => {
  const index = quoteButtons.indexOf(event.target);
  if (index < 0) return;
  let next;
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % quoteButtons.length;
  else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + quoteButtons.length) % quoteButtons.length;
  else if (event.key === 'Home') next = 0;
  else if (event.key === 'End') next = quoteButtons.length - 1;
  else return;
  event.preventDefault();
  showQuote(next);
  quoteButtons[next].focus();
});

// Content is visible by default, including without JavaScript. Each entrance runs once.
if ('IntersectionObserver' in window) {
  const reveals = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      enter(entry.target, 16, 600);
      reveals.unobserve(entry.target);
    });
  }, { threshold: .12 });
  document.querySelectorAll('.section-heading, .intro-grid, .testimonial-layout, .contact-card, .history-intro, .history-timeline li, .school-grid, .school-pillars')
    .forEach(element => reveals.observe(element));
}

const archiveSearch = document.querySelector('#archive-search');
const archiveItems = [...document.querySelectorAll('.archive-item')];
const archiveCount = document.querySelector('#archive-count');
const archiveEmpty = document.querySelector('#archive-empty');
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('fr');
archiveSearch?.addEventListener('input', () => {
  const query = normalize(archiveSearch.value.trim());
  let count = 0;
  archiveItems.forEach(item => { item.hidden = !normalize(item.textContent).includes(query); if (!item.hidden) count += 1; });
  archiveCount.textContent = `${count} publication${count > 1 ? 's' : ''}`;
  archiveEmpty.hidden = count > 0;
});
