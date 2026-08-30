const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');
const canonical = document.querySelector('link[rel="canonical"]');

document.querySelectorAll(".name-highlight").forEach((el) => {
  const text = el.textContent.trim();
  el.textContent = "";
  el.setAttribute("aria-label", text);

  [...text].forEach((ch, i) => {
    const letter = document.createElement("span");
    letter.className = "letter";
    letter.style.setProperty("--i", i);

    const top = document.createElement("span");
    top.className = "char top";
    top.textContent = ch === " " ? "\u00A0" : ch;
    top.setAttribute("aria-hidden", "true");

    const bottom = top.cloneNode(true);
    bottom.className = "char bottom";

    letter.append(top, bottom);
    el.append(letter);
  });
});

if (window.PORTFOLIO_SITE_URL && canonical) canonical.href = new URL(window.location.pathname, window.PORTFOLIO_SITE_URL).href;
if (menuToggle && navigation) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    menuToggle.innerHTML = isOpen ? 'Close <span>−</span>' : 'Menu <span>+</span>';
  });
  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    navigation.classList.remove('is-open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.setAttribute('aria-label', 'Open menu'); menuToggle.innerHTML = 'Menu <span>+</span>';
  }));
}
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: 0.12 });
  reveals.forEach((element) => observer.observe(element));
} else { reveals.forEach((element) => element.classList.add('is-visible')); }
document.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener('click', (event) => {
  const target = document.querySelector(link.getAttribute('href')); if (!target) return;
  event.preventDefault(); target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}));
