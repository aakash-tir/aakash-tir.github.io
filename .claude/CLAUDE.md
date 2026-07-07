# Portfolio Page — Project Instructions

Interactive single-page portfolio for Aakash Tirathdas. Static site: vanilla HTML/CSS/JS, no build step, deployable to GitHub Pages as-is.

## Key docs (read before making changes)
- `.claude/project-context.md` — goals, audience, content inventory (GitHub data, project list)
- `.claude/design-spec.md` — section-by-section layout, visual language, animation spec
- `.claude/progress.md` — build phases and current status; update it when finishing a phase

## Conventions
- **Merging to `main` publishes to production.** Never merge unless all CI checks pass and the change is up to publish standard — see `.claude/rules/merge-to-main.md`.
- **Keep docs in sync with every code change**, in the same PR — see `.claude/rules/update-docs-after-changes.md`.
- Vanilla HTML/CSS/JS, no build step; no frameworks or npm unless the owner asks. Source is split by concern:
  - `index.html` — all sections (hero, about, timeline, projects, contact).
  - `css/` — one file per concern, linked from `<head>` in cascade order: `tokens · base · nav · hero · about · timeline · projects · contact · animations · responsive`. Load order **is** the cascade; keep `responsive.css` (which ends with the `prefers-reduced-motion` block) last.
  - `js/` — native ES modules. `main.js` is a thin entry point that imports one module per feature (`projects`, `typing`, `reveal`, `nav`, `particles`, `skydiver`, `clock`, `mobile-nav`, `timeline`); `config.js` holds the shared reduced-motion flag; `data/projects.js` holds the project list. Loaded via `<script type="module">`.
- Theme tokens live as CSS custom properties in `:root` in `css/tokens.css` — change colors there, not inline.
- All scroll animations go through the `.reveal` + IntersectionObserver pattern in `js/reveal.js`.
- Project cards are data-driven: add a project = add one object to `PROJECTS` in `js/data/projects.js`.
- Placeholder content is marked with `<!-- TEMP -->` comments in HTML — replace with real content when the owner provides it, and remove the marker.
- Respect `prefers-reduced-motion` for any new animation.

## Owner facts
- Name: Aakash Tirathdas · GitHub: `aakash-tir` · Email: aakashtirathdas@gmail.com
- CS graduate (Class of 2026) from UBC Okanagan; Data Science minor, First Class Standing. COSC 499 capstone (Blume) completed.
