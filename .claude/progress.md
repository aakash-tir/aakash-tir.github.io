# Progress

## Phase 1 — Foundation (v1 general page)
- [x] Fetch GitHub pinned projects (2026-07-02)
- [x] Improved plan split into `.claude/` docs
- [x] `index.html` — all five sections scaffolded with content
- [x] `css/style.css` — theme tokens, layout, responsive, animations
- [x] `js/main.js` — particles, typing effect, reveals, project tabs, nav state
- [x] Smoke-test in browser

## Phase 2 — Owner iteration
- [x] Real about-me text (new-grad SWE/ML framing, from resume)
- [x] Real timeline: 3 roles (RA×2, CodeGen intern) + BSc + A-Levels
- [x] Real project descriptions (Blume, Jersey, Flight Delay, Amazons)
- [x] LinkedIn wired, resume PDF download added, phone in contact
- [x] Added recruiter stat strip; projects filter by area (AI&ML/Data/Software)
- [ ] Feedback pass on look & feel (awaiting owner)

## Phase 3 — Deploy & polish
- [x] Deployed to GitHub Pages — live at https://aakash-tir.github.io/ (2026-07-02)
- [x] OG/meta tags added
- [x] Mobile/responsive fixes (nav marquee, timeline collapse, project filter/pagination across breakpoints)
- [ ] Consider Higgsfield-generated hero/project imagery
- [ ] Favicon
- [ ] Lighthouse audit

## Phase 4 — Codebase restructure
- [x] Split `js/main.js` into native ES modules (entry point + one module per feature; data in `js/data/projects.js`) (2026-07-07)
- [x] Split `css/style.css` into 10 per-concern files linked in cascade order (2026-07-07)
- [x] Verified in-browser (no console errors, all features working) and live after deploy

## Deployment
- Repo: https://github.com/aakash-tir/aakash-tir.github.io (**public**)
- Live: https://aakash-tir.github.io/ — GitHub Pages, source `main` branch `/` root. `.nojekyll` publishes all files as-is.
- `main` is branch-protected: PR + green CI (`checks` job) required before merge. View locally on port 8765.

## Log
- 2026-07-02: v1 built (all Phase 1 items). Placeholders marked `<!-- TEMP -->` in HTML.
- 2026-07-02: Pushed to private GitHub repo. Pages deploy deferred per owner (Free plan can't serve private Pages).
- 2026-07-02: Made repo public, renamed to `aakash-tir.github.io`, deployed live at https://aakash-tir.github.io/ (verified all assets 200).
- 2026-07-02: Added CI gate (`.github/workflows/ci.yml`) + merge policy (`.claude/rules/merge-to-main.md`). Checks: JS syntax, publish readiness (asset integrity + no TEMP), html-validate, stylelint. Branch protection requires them before merging to main.
- 2026-07-02: Phase 2 content pass — filled all sections from resume, new-grad SWE/ML positioning, added stats/résumé/LinkedIn/phone, project category filter. All TEMP markers removed.
- 2026-07-06: Mobile fixes — nav marquee, collapsible experience/education cards, project filter + pagination fixes across desktop/half-screen/mobile. Reworded About intro.
- 2026-07-07: Restructured CSS (1 file → 10) and JS (1 file → ES modules) with no build step. Verified live. Removed stale `plan.md`; refreshed all `.claude/` docs + README to match.
