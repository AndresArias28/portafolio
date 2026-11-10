# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

Static, multi-page portfolio site for Andrés Santiago Arias (Full Stack Developer).
Stack: **plain HTML, CSS and vanilla JavaScript only** — no build step, no framework,
no bundler, no package manager. Open `index.html` directly or serve the folder with
any static file server.

Key files:
- `index.html` — single-page home (hero, proof strip, work, profile, experience, contact).
- `styles.css` — the entire design system (tokens, components, responsive rules).
- `script.js` — nav toggle, reveal-on-scroll, lightbox, misc interactions.
- `projects.js` — renders the project cards into `#project-grid`.
- `site-config.js` — small site-wide config values.
- `work/<project>/` — one case-study page per project (`circus-cinema`, `healthu`,
  `legalflow`, `punto-rojo`, `sigeva`), each reusing the same `styles.css` and the
  `.case-*` component classes.
- `assets/` — images (hero art, project screenshots, audio), plus `assets/motion/`,
  `assets/moments/` and `assets/icons/` (vendored from the `design-taste-frontend`
  skill — see Motion, moments and real tool icons below).

There is no CSS preprocessor and no CSS-in-JS: everything lives in `styles.css` as
custom properties + plain selectors. Keep it that way — don't introduce Sass, Tailwind,
or a component framework without being asked.

## Design system

### Color palette

All colors are defined as custom properties in `styles.css:1-15` (`:root`). This is a
**dark, cyan-accented engineering/console aesthetic** — not a generic SaaS palette.

| Token | Value | Role |
|---|---|---|
| `--bg` | `#070b14` | Page background (near-black navy) |
| `--panel` | `#0d1524` | Raised surface (unused directly in most components — see note) |
| `--panel-2` | `#101b2e` | Secondary surface |
| `--line` | `rgba(153, 180, 224, 0.17)` | Default hairline border, dividers |
| `--line-strong` | `rgba(105, 221, 255, 0.42)` | Emphasized border (hover/focus states) |
| `--text` | `#f1f6ff` | Primary text (near-white, cool tint) |
| `--muted` | `#9aa9c1` | Secondary text (body copy, descriptions) |
| `--faint` | `#60708b` | Tertiary text (labels, captions, meta) |
| `--cyan` | `#58dcff` | Primary accent — links, emphasis, active states, primary buttons |
| `--purple` | `#ff4fd1` | Secondary accent (electric magenta, not violet) — gradient pair with cyan, "b" emphasis in console copy |
| `--green` | `#70e9ae` | Status/success accent (status dot, "ACTIVE", checkmarks) |
| `--orange` | `#ffb86b` | Warning/note accent (`.evidence-note` left border only) |
| `--max` | `1180px` | Max content width |
| `--ink` | `var(--text)` | Alias for the `word-highlight` moment (expects `--ink`/`--accent`/`--bg` names) |
| `--accent` | `var(--cyan)` | Same alias purpose as `--ink`, used by vendored moment CSS |

Notes:
- `--panel` / `--panel-2` are declared but barely used; most surfaces are built ad hoc
  with low-opacity white overlays instead (`#ffffff03`, `#ffffff04`, `#ffffff05`,
  `#ffffff0a`) or one-off dark hexes (`#07111d`, `#0a101d`, `#0d192b`, `#0c1422`,
  `#111b2e`). Treat these overlay values as the real "surface" system, not the panel
  tokens.
- Several colors are hardcoded with their own opacity suffix instead of reusing the
  token (`#58dcff...`, `#a58cff...` appear directly in ~15 places for borders/glows/
  gradients). When adding new UI, prefer `var(--cyan)` / `var(--purple)` and only
  hardcode an opacity variant when matching an existing one-off (e.g. glow halos,
  radial gradients).
- One outlier: `.name-highlight .char.bottom` uses `#1F5FA8`, a blue not in the palette
  (part of the flip-animation letter effect). Not a token — leave it as a deliberate
  one-off unless asked to unify it.
- `--purple` was originally `#a58cff` (lavender/violet). It was changed to electric
  magenta `#ff4fd1` during a creative restyle pass, since violet/lavender is explicitly
  banned by the installed `design-taste-frontend` skill. Every derived hex (not just
  `var(--purple)` usages) was updated too — see `.legal-visual`/`.visual-lines` in
  `styles.css` for the hardcoded `#ff4fd1xx` opacity variants.
- Body background is a radial gradient (`#182e5980` → transparent) over `--bg`, not a
  flat fill — this is the "glow" behind the hero.
- No light theme / `prefers-color-scheme` support exists. The site is dark-only by
  design.

### Typography

- **Body/UI font**: `Inter`, falling back to `ui-sans-serif, system-ui, -apple-system,
  BlinkMacSystemFont, "Segoe UI", sans-serif` (`styles.css:29-36`). Loaded via system
  font stack / whatever is already on the page — **no `@font-face` or Google Fonts
  `<link>` exists in `index.html`**, so Inter only renders if the visitor's OS/browser
  already has it; otherwise it silently falls back to the system sans-serif. There is
  no explicit font loading step to replicate elsewhere.
- **Monospace font**: `ui-monospace, SFMono-Regular, Menlo, monospace` — used
  extensively for anything "technical-looking": eyebrows/labels, nav `header-link`,
  console body, tags, stats (`proof-strip strong`), timestamps, snapshot labels,
  architecture-flow chips, footer. This is a deliberate dual-font system: **Inter for
  prose, monospace for data/labels/UI chrome.**
- **Scale**: no `rem`/`clamp()`-based type scale tokens — sizes are hardcoded per
  selector in `px`, with `clamp()` used only for the large responsive headings:
  - Hero `h1`: `clamp(48px, 6vw, 82px)`, `line-height: 0.96`, `letter-spacing: -0.065em`
  - Section `h2`: `clamp(33px, 4vw, 53px)`, `letter-spacing: -0.055em`
  - Contact `h2`: `clamp(35px, 4.7vw, 64px)`
  - Case-study `h1`: `clamp(47px, 6vw, 77px)`
  - Body/lede text: `18px` / `line-height: 1.7`
  - Secondary/meta text: `11–14px`, often monospace, often `text-transform: uppercase`
    with `letter-spacing` around `0.08–0.2em`
- Negative letter-spacing (`-0.04em` to `-0.065em`) is used consistently on large
  display headings; positive letter-spacing (`0.04em`–`0.2em`) on small uppercase
  monospace labels. This contrast is a core part of the look — keep it when adding
  headings.
- `em` inside headings is repurposed (not italic) as the cyan→purple gradient-text
  accent (`styles.css:187-193`, `.accent`). Don't use `<em>` for literal emphasis in
  body copy here; it's a styling hook.

### Layout conventions

- Max content width `1180px` (`--max`), centered via `.section-shell` at `width:
  min(var(--max), 90%)`.
- Border radius is small and consistent: `6–9px` for cards/buttons, `11–14px` for
  larger panels (hero console, contact card), never fully round except `.status-dot`
  and `.health-ring`.
- One hairline border color (`--line`) used everywhere for separation; `--line-strong`
  only on hover/focus/active.
- Responsive breakpoints: `800px` (tablet/mobile layout collapse) and `460px` (small
  phone grid collapse). No breakpoint between 800 and max width — the grid is fluid
  via `minmax()`/`clamp()` up to 800px.
- `.reveal` / `.reveal.is-visible` is the scroll-reveal pattern (driven by `script.js`,
  an IntersectionObserver most likely) — respects `prefers-reduced-motion: reduce`
  (`styles.css:1302-1315`), which also disables smooth scroll and card/button
  transitions. Preserve this when adding new animated elements.

### Motion, moments and real tool icons

A creative restyle pass added small, self-contained pieces vendored from the installed
`design-taste-frontend` skill (`.agents/skills/design-taste-frontend` or `.claude/skills/...`).
These are plain static files, not a build dependency — they only need to be served over
HTTP (never opened via `file://`), since they're loaded as ES modules.

- `assets/motion/motion.css` + `motion.js` — unmodified copies from the skill. Linked/
  loaded on every page that wants the effects (currently `index.html` only). Provides:
  - The hero's one-time entrance (`.hero[data-enter]`, triggered by the inline
    `m-enter`/`m-enter-done` script in `<head>` plus `motion.js`'s `enter()`). Needs
    `data-enter` on the hero `<section>`, an `id` on the `<h1>` for `aria-labelledby`,
    and `data-enter-media` on the background art element.
  - The `.m-zoom` utility (1.02–1.03 image zoom inside an `overflow:clip` wrapper on
    hover) — applied via `script.js` to `.project-screenshot` figures and
    `.gallery-trigger` buttons (`renderCard`/`renderGallery`), not hardcoded in HTML.
  - Its own `:root` timing tokens (`--m-in`, `--m-out`, `--m-press`, `--m-ease`, etc.)
    are reused directly by hand-written hover rules in `styles.css` for `.button` and
    `.capability-card` (real project classes — `motion.css`'s own `.btn`/`.card` rules
    don't match anything in this markup and are inert by design, not a bug).
- `assets/moments/` — the loader (`moments.js`, `lib.js`) plus one moment,
  `word-highlight/` (`moment.js`, `moment.css`), unmodified copies. Mounted on the
  contact section's lead `<p data-moment="word-highlight">` — words light up word-by-word
  as the statement crosses the middle of the screen. Relies on the `--ink`/`--accent`
  aliases in `styles.css`'s `:root` (see palette table) to pick up the project's real
  colours instead of the skill's own default token names. The skill's rule is **one
  moment per short page** — don't add a second without removing this one.
- `assets/icons/*.svg` — real, full-colour product/brand marks fetched once via the
  skill's `scripts/icons.mjs scan index.html --out assets/icons --colour` (requires
  network access; re-run only if new `data-icon="..."` tags are added). `icons-credits.json`
  in that folder has the per-icon license/attribution data; the footer's `.icon-credit`
  line is the required one-line credit. `.tool-icon`/`.tool-pill`/`.tool-row` in
  `styles.css` are the display classes. A tool with no real public mark (e.g. `JPA`,
  `REST APIs`, `Configuration`) stays plain text inside a `.tool-pill`, no `<img>`.

When adding a new tool/tag to the hero console or capability grid, check first with
`node .agents/skills/design-taste-frontend/scripts/icons.mjs find "<name>"` whether a
real mark exists before deciding between an icon and plain text.

## Working in this repo

- Keep everything inside `styles.css`; don't split into multiple stylesheets or add a
  CSS framework.
- Reuse existing custom properties (`var(--cyan)`, `var(--muted)`, etc.) rather than
  introducing new raw hex values, unless matching an existing one-off overlay pattern
  documented above.
- New case-study pages under `work/` should reuse `.case-*` classes already defined in
  `styles.css` rather than inventing new ones.
- No test suite, linter, or build command is configured — verify changes by opening the
  HTML file(s) directly in a browser.
