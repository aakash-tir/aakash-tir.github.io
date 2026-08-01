# Aakash Tirathdas — Portfolio

Interactive single-page portfolio. Static site: vanilla HTML/CSS/JS, no build step.

**Live:** https://aakash-tir.github.io/

## Run locally

```bash
python -m http.server 8765
# then open http://localhost:8765
```

## Structure

Vanilla HTML/CSS/JS, no build step. Source is split by concern.

- `index.html` — all sections (hero, about, timeline, projects, certifications, contact)
- `css/` — one stylesheet per concern, linked in cascade order:
  `tokens · base · nav · hero · about · timeline · projects · certifications · contact · animations · responsive`
  (theme tokens live in `css/tokens.css`; `responsive.css` ends with the reduced-motion block and stays last)
- `js/` — native ES modules loaded via `<script type="module">`:
  - `main.js` — entry point; imports one module per feature
  - `config.js` — shared `prefers-reduced-motion` flag
  - `data/projects.js` — the `PROJECTS` list (add a project = add one object here)
  - `data/certifications.js` — the `CERTIFICATIONS` list + topic labels (add a cert = add one object here)
  - `projects.js`, `certifications.js`, `typing.js`, `reveal.js`, `nav.js`, `particles.js`, `skydiver.js`, `clock.js`, `mobile-nav.js`, `timeline.js` — one feature each

## Deploy

Hosted on GitHub Pages from `main` (root). `.nojekyll` disables Jekyll so all files publish as-is.
