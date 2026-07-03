# Deployment Checklist — root user site

Target: **https://aakash-tir.github.io/**

## Pre-flight (site readiness)
- [ ] `index.html` exists at the repo root
- [ ] All asset paths are relative (no leading `/`) so they resolve at the root domain
- [ ] `.nojekyll` present (skips Jekyll processing)
- [ ] Page renders with no JavaScript console errors
- [ ] In-page navigation and links work

## Deploy
- [ ] Repo is public
- [ ] Repo renamed to `aakash-tir.github.io` (required for the root URL)
- [ ] Local `origin` remote updated to the new name
- [ ] GitHub Pages enabled — source: `main` branch, `/` root
- [ ] Latest `main` pushed

## Post-deploy
- [ ] Live URL returns HTTP 200
- [ ] CSS and JS load over HTTPS (no mixed-content / 404s)

## Known / deferred (not blockers)
- Placeholder `<!-- TEMP -->` text still in About, Timeline, and two project descriptions.
- LinkedIn icon is a placeholder link.
