# Aakash Tirathdas — Portfolio

Interactive single-page portfolio. Static site: vanilla HTML/CSS/JS, no build step.

**Live:** https://aakash-tir.github.io/

## Run locally

```bash
python -m http.server 8765
# then open http://localhost:8765
```

## Structure

- `index.html` — all sections (hero, about, timeline, projects, contact)
- `css/style.css` — theme tokens + layout + animations
- `js/main.js` — particles, typing effect, scroll reveals, project tabs

## Deploy

Hosted on GitHub Pages from `main` (root). `.nojekyll` disables Jekyll so all files publish as-is.
