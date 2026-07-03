# Portfolio Page — Project Instructions

Interactive single-page portfolio for Aakash Tirathdas. Static site: vanilla HTML/CSS/JS, no build step, deployable to GitHub Pages as-is.

## Key docs (read before making changes)
- `.claude/project-context.md` — goals, audience, content inventory (GitHub data, project list)
- `.claude/design-spec.md` — section-by-section layout, visual language, animation spec
- `.claude/progress.md` — build phases and current status; update it when finishing a phase

## Conventions
- **Merging to `main` publishes to production.** Never merge unless all CI checks pass and the change is up to publish standard — see `.claude/rules/merge-to-main.md`.
- Files: `index.html`, `css/style.css`, `js/main.js`. Keep this three-file structure; no frameworks or npm unless the owner asks.
- Theme tokens live as CSS custom properties in `:root` at the top of `style.css` — change colors there, not inline.
- All scroll animations go through the `.reveal` + IntersectionObserver pattern in `main.js`.
- Placeholder content is marked with `<!-- TEMP -->` comments in HTML — replace with real content when the owner provides it, and remove the marker.
- Respect `prefers-reduced-motion` for any new animation.

## Owner facts
- Name: Aakash Tirathdas · GitHub: `aakash-tir` · Email: aakashtirathdas@gmail.com
- CS student at UBC Okanagan (COSC 499 capstone in progress).
