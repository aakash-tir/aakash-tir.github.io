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

## Phase 3 — Polish (later)
- [ ] Consider Higgsfield-generated hero/project imagery
- [ ] Deploy to GitHub Pages (blocked: private repo + Free plan can't host Pages — needs public repo or GitHub Pro)
- [ ] OG/meta tags + favicon
- [ ] Lighthouse audit

## Deployment
- Repo: https://github.com/aakash-tir/portfolio-page (**private**)
- Owner chose private-with-no-live-URL (2026-07-02). View locally on port 8765.
- To publish later: make repo public (free Pages at aakash-tir.github.io/portfolio-page) or upgrade to GitHub Pro. Re-add a deploy workflow or use Settings → Pages → deploy from branch.

## Log
- 2026-07-02: v1 built (all Phase 1 items). Placeholders marked `<!-- TEMP -->` in HTML.
- 2026-07-02: Pushed to private GitHub repo. Pages deploy deferred per owner (Free plan can't serve private Pages).
- 2026-07-02: Made repo public, renamed to `aakash-tir.github.io`, deployed live at https://aakash-tir.github.io/ (verified all assets 200).
- 2026-07-02: Added CI gate (`.github/workflows/ci.yml`) + merge policy (`.claude/rules/merge-to-main.md`). Checks: JS syntax, publish readiness (asset integrity + no TEMP), html-validate, stylelint. Branch protection requires them before merging to main.
- 2026-07-02: Phase 2 content pass — filled all sections from resume, new-grad SWE/ML positioning, added stats/résumé/LinkedIn/phone, project category filter. All TEMP markers removed.
