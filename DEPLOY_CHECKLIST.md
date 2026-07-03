# Deployment Checklist — root user site

Target: **https://aakash-tir.github.io/** — ✅ LIVE

## Pre-flight (site readiness)
- [x] `index.html` exists at the repo root
- [x] All asset paths are relative (no leading `/`) so they resolve at the root domain
- [x] `.nojekyll` present (skips Jekyll processing)
- [x] Page renders with no JavaScript console errors
- [x] In-page navigation and links work; portrait + résumé PDF exist and are git-tracked

## Deploy
- [x] Repo is public
- [x] Repo renamed to `aakash-tir.github.io` (required for the root URL)
- [x] Local `origin` remote updated to the new name
- [x] GitHub Pages enabled — source: `main` branch, `/` root
- [x] Latest `main` pushed

## Post-deploy
- [x] Live URL returns HTTP 200
- [x] CSS, JS, portrait image, and résumé PDF all load over HTTPS (200, no 404s)
- [x] Live render verified by screenshot — no console/request errors

## Known / deferred (not blockers)
- LinkedIn now links to a real profile; résumé and photo are real.
- Nothing outstanding for the deploy itself.
