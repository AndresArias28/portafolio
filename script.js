(function () {
  const main = document.querySelector("main[data-project-slug]");
  const homeGrid = document.querySelector("#project-grid");
  const pagePrefix = document.documentElement.dataset.assetPrefix || "";

  const escapeHtml = (value = "") => String(value).replace(/[&<>\"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '\"': "&quot;", "'": "&#039;",
  })[character]);
  const assetUrl = (path) => (path ? `${pagePrefix}${path}` : "");
  const isExternalUrl = (value) => /^https?:\/\//i.test(value || "");
  const linkAttributes = (url) => isExternalUrl(url) ? ' target="_blank" rel="noopener noreferrer"' : "";

  function renderProjectActions(project, context = "card") {
    if (context === "card") {
      const actions = [`<a class="text-link" href="${assetUrl(project.route)}">View case study <span>↗</span></a>`];
      if (project.videoUrl) actions.push(`<a class="text-link" href="${assetUrl(project.route)}#demo">Watch demo <span>↓</span></a>`);
      if (project.githubUrl) actions.push(`<a class="text-link" href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer">GitHub <span>↗</span></a>`);
      return `<div class="project-actions">${actions.join("")}</div>`;
    }
    const actions = [];
    if (project.demoUrl) actions.push(`<a class="button secondary" href="${escapeHtml(project.demoUrl)}"${linkAttributes(project.demoUrl)}>Live Demo <span>↗</span></a>`);
    if (project.videoUrl) actions.push(`<a class="button secondary" href="#demo">Watch Demo <span>↓</span></a>`);
    if (project.githubUrl) actions.push(`<a class="button secondary" href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer">GitHub <span>↗</span></a>`);
    return `<div class="case-actions">${actions.join("")}</div>`;
  }

  function renderCard(project) {
    const classes = `project-card${project.featured ? " project-featured" : ""} reveal`;
    const meta = `<div class="project-meta"><span>${escapeHtml(project.eyebrow)}</span><i class="${project.status === "Production" ? "" : "muted"}">● ${escapeHtml(project.status)}</i></div>`;
    const tags = `<div class="tag-list">${project.technologies.slice(0, 5).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>`;
    if (project.featured) return `<article class="${classes}"><div class="project-copy">${meta}<h3>${escapeHtml(project.name)}</h3><p>${escapeHtml(project.shortDescription)}</p>${tags}<ul class="evidence-list">${project.results.slice(0, 3).map((result) => `<li>${escapeHtml(result[1])}</li>`).join("")}</ul>${renderProjectActions(project)}</div><div class="project-visual punto-visual" aria-label="Punto Rojo architecture preview"><p>Tenant context</p><div class="architecture-flow"><span>Flutter app</span><b>→</b><span>REST API</span><b>→</b><span>AdonisJS</span><b>→</b><span>MySQL</span></div><small>AWS / Linux / Nginx</small></div></article>`;
    const image = project.image ? `<figure class="project-screenshot m-zoom"><img src="${assetUrl(project.image)}" alt="${escapeHtml(project.name)} project preview" loading="lazy" decoding="async" /><figcaption>Project interface preview</figcaption></figure>` : "";
    return `<article class="${classes}">${meta}${image}<h3>${escapeHtml(project.name)}</h3><p>${escapeHtml(project.shortDescription)}</p>${tags}${renderProjectActions(project)}</article>`;
  }

  function renderSnapshot(project) {
    return `<aside class="snapshot"><span>PROJECT SNAPSHOT</span><dl><div><dt>Role</dt><dd>${escapeHtml(project.role)}</dd></div><div><dt>Period</dt><dd>${escapeHtml(project.period)}</dd></div><div><dt>Stack</dt><dd>${escapeHtml(project.stackSummary)}</dd></div><div><dt>Status</dt><dd>${escapeHtml(project.status)}</dd></div></dl></aside>`;
  }

  function renderGallery(project) {
    if (!project.screenshots.length) return `<div class="empty-visual">SCREENSHOTS WITHHELD<br/>${escapeHtml(project.privacyNote || "No approved screenshots are currently configured.")}</div>`;
    return `<div class="gallery-grid">${project.screenshots.map(([path, caption], index) => `<button class="gallery-trigger m-zoom" type="button" data-gallery-index="${index}" aria-label="Open ${escapeHtml(caption)}"><img src="${assetUrl(path)}" alt="${escapeHtml(caption)}" loading="lazy" decoding="async" /><span>${escapeHtml(caption)}</span></button>`).join("")}</div>`;
  }

  function renderVideo(project) {
    if (!project.videoUrl) return "";
    return `<section id="demo" class="case-section"><h2>Video demo</h2><video class="case-video" controls preload="metadata"><source src="${assetUrl(project.videoUrl)}" type="video/mp4" />Your browser does not support the video element.</video></section>`;
  }

  function renderCaseStudy(project) {
    const heroImage = project.image ? `<img class="case-image case-hero-image" src="${assetUrl(project.image)}" alt="${escapeHtml(project.name)} project preview" fetchpriority="high" decoding="async" />` : "";
    const results = project.results.length ? `<section id="results" class="case-section"><h2>Results</h2><div class="case-evidence">${project.results.map((result) => `<article class="evidence-card"><span>${escapeHtml(result[0])}</span><strong>${escapeHtml(result[1])}</strong></article>`).join("")}</div></section>` : "";
    const privacy = project.privacyNote ? `<p class="evidence-note">${escapeHtml(project.privacyNote)}</p>` : "";
    document.title = `${project.name} — Case Study`;
    const resultsLink = project.results.length ? `<a href="#results">Results</a>` : "";
    const demoLink = project.videoUrl ? `<a href="#demo">Demo</a>` : "";
    main.innerHTML = `<a class="back-link" href="${assetUrl("#work")}">← Back to selected work</a><section class="case-hero"><div><p class="eyebrow"><span></span> ${escapeHtml(project.eyebrow)} / ${escapeHtml(project.status.toUpperCase())}</p><h1>${escapeHtml(project.name)}</h1><p class="case-intro">${escapeHtml(project.description)}</p>${renderProjectActions(project, "case")}</div>${renderSnapshot(project)}</section><div class="case-layout"><nav class="case-toc" aria-label="Case study sections"><a href="#problem">Problem</a><a href="#solution">Solution</a><a href="#features">Features</a><a href="#architecture">Architecture</a><a href="#decisions">Decisions</a>${resultsLink}<a href="#evidence">Evidence</a>${demoLink}</nav><article class="case-content"><section id="problem" class="case-section"><h2>The problem</h2><p>${escapeHtml(project.problem)}</p></section><section id="solution" class="case-section"><h2>The solution</h2><p>${escapeHtml(project.solution)}</p><h2>My responsibility</h2><p>${escapeHtml(project.role)}.</p></section><section id="features" class="case-section"><h2>What I built</h2><ul>${project.features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join("")}</ul></section><section id="architecture" class="case-section"><h2>Stack & architecture</h2><p>${escapeHtml(project.stackSummary)}. The implementation details shown here are limited to the project material currently available.</p><div class="architecture-card">${project.technologies.slice(0, 4).map((technology) => `<span>${escapeHtml(technology)}</span>`).join("")}</div></section><section id="decisions" class="case-section"><h2>Key engineering decisions</h2><div class="decision-list">${project.technicalDecisions.map(([title, body]) => `<details class="decision"><summary>${escapeHtml(title)}</summary><p>${escapeHtml(body)}</p></details>`).join("")}</div></section>${results}<section id="evidence" class="case-section"><h2>Evidence</h2>${heroImage}${privacy}${renderGallery(project)}</section>${renderVideo(project)}</article></div>`;
    bindGallery(project);
  }

  function ensureLightbox() {
    let dialog = document.querySelector("#project-lightbox");
    if (dialog) return dialog;
    dialog = document.createElement("dialog");
    dialog.id = "project-lightbox";
    dialog.className = "project-lightbox";
    dialog.innerHTML = `<button class="lightbox-close" type="button" aria-label="Close image">×</button><button class="lightbox-prev" type="button" aria-label="Previous image">←</button><figure><img alt="" /><figcaption></figcaption></figure><button class="lightbox-next" type="button" aria-label="Next image">→</button>`;
    document.body.append(dialog);
    return dialog;
  }

  function bindGallery(project) {
    const triggers = [...document.querySelectorAll(".gallery-trigger")];
    if (!triggers.length) return;
    const dialog = ensureLightbox();
    const image = dialog.querySelector("img");
    const caption = dialog.querySelector("figcaption");
    const previous = dialog.querySelector(".lightbox-prev");
    const next = dialog.querySelector(".lightbox-next");
    const close = dialog.querySelector(".lightbox-close");
    let currentIndex = 0;
    let returnFocus = null;
    const update = (index) => {
      currentIndex = (index + project.screenshots.length) % project.screenshots.length;
      const [path, text] = project.screenshots[currentIndex];
      image.src = assetUrl(path); image.alt = text; caption.textContent = text;
      previous.hidden = project.screenshots.length < 2; next.hidden = project.screenshots.length < 2;
    };
    triggers.forEach((trigger) => trigger.addEventListener("click", () => { returnFocus = trigger; update(Number(trigger.dataset.galleryIndex)); if (typeof dialog.showModal === "function") dialog.showModal(); else window.open(image.src, "_blank", "noopener,noreferrer"); }));
    previous.addEventListener("click", () => update(currentIndex - 1));
    next.addEventListener("click", () => update(currentIndex + 1));
    close.addEventListener("click", () => dialog.close());
    dialog.addEventListener("close", () => returnFocus?.focus());
    dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener("keydown", (event) => { if (event.key === "ArrowLeft") update(currentIndex - 1); if (event.key === "ArrowRight") update(currentIndex + 1); });
  }

  if (homeGrid && window.PORTFOLIO_PROJECTS) homeGrid.innerHTML = window.PORTFOLIO_PROJECTS.map(renderCard).join("");
  if (main && window.getPortfolioProject) { const project = window.getPortfolioProject(main.dataset.projectSlug); if (project) renderCaseStudy(project); }

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".site-nav");
  const canonical = document.querySelector('link[rel="canonical"]');
  if (window.PORTFOLIO_SITE_URL && canonical) canonical.href = new URL(window.location.pathname, window.PORTFOLIO_SITE_URL).href;
  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => { const isOpen = navigation.classList.toggle("is-open"); menuToggle.setAttribute("aria-expanded", String(isOpen)); menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu"); menuToggle.innerHTML = isOpen ? "Close <span>−</span>" : "Menu <span>+</span>"; });
    navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => { navigation.classList.remove("is-open"); menuToggle.setAttribute("aria-expanded", "false"); menuToggle.setAttribute("aria-label", "Open menu"); menuToggle.innerHTML = "Menu <span>+</span>"; }));
  }
  document.querySelectorAll(".name-highlight").forEach((element) => { const text = element.textContent.trim(); element.textContent = ""; element.setAttribute("aria-label", text); [...text].forEach((character, index) => { const letter = document.createElement("span"); letter.className = "letter"; letter.style.setProperty("--i", index); const top = document.createElement("span"); top.className = "char top"; top.textContent = character === " " ? "\u00A0" : character; top.setAttribute("aria-hidden", "true"); const bottom = top.cloneNode(true); bottom.className = "char bottom"; letter.append(top, bottom); element.append(letter); }); });
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) { const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: 0.12 }); reveals.forEach((element) => observer.observe(element)); } else reveals.forEach((element) => element.classList.add("is-visible"));
  document.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener("click", (event) => { const target = document.querySelector(link.getAttribute("href")); if (!target) return; event.preventDefault(); target.setAttribute("tabindex", "-1"); target.focus({ preventScroll: true }); target.scrollIntoView({ behavior: "smooth", block: "start" }); }));
})();
