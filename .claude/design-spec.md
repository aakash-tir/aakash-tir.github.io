# Design Spec

## Visual language
- **Theme:** dark, modern developer aesthetic. Near-black background, one accent color (teal/cyan `--accent`), soft glows.
- **Typography:** system font stack for speed; large bold headings, generous line-height for body.
- **Tokens:** all colors/spacing as CSS custom properties in `:root` in `css/tokens.css` (`--bg`, `--surface`, `--text`, `--muted`, `--accent`).
- **Responsive:** mobile-first; timeline collapses to single column, nav collapses to compact bar under 720px.

## Page structure (single scrolling page)

### 0. Sticky nav
Logo/name left, section links right. Gains a background + shadow after scrolling past hero. Active section link highlighted via IntersectionObserver.

### 1. Hero / Introduction (`#home`)
- Full-viewport, animated particle canvas background (subtle connecting-dots network).
- Greeting, name in accent gradient, typing-effect line cycling roles ("CS Student @ UBC Okanagan", "AI & Computer Vision Tinkerer", …).
- Two CTAs: "See my work" → projects, "Get in touch" → contact. Scroll-down indicator.

### 2. About (`#about`)
- Two-column: intro paragraphs left, quick-facts card right (education, standing, focus, location, GitHub/LinkedIn). Recruiter stat strip above (grad year, standing, roles, focus).
- Skill chips (Python, Java, JavaScript, SQL, PyTorch, React, pandas/NumPy, AWS, Docker, Deep Learning, LLM/RAG, Git).

### 3. Timeline (`#timeline`)
- Vertical center line, alternating left/right cards (single column on mobile).
- Covers education + jobs, newest first. Each entry: date badge, title, org, 1–2 line description.
- Entries animate in from their side on scroll. Jobs are TEMP placeholders until owner supplies.

### 4. Projects (`#projects`)
- Two combined pill filters: **area** (All / AI & ML / Data / Software) and **status** (All / Completed / In Progress). Desktop shows both in one row; mobile splits them into two stacked scrollable groups that stay in sync.
- Card grid (auto-fill, min 300px). Each card: language tag, status badge, title, description, tech chips, and either a GitHub link or a "Private" lock. Hover: lift + accent border.
- Paginated (3/4/6 cards per page depending on column count), newest-first by `added` date.
- Data lives in `js/data/projects.js` (`PROJECTS`) so adding a project = adding one object; rendering/filtering/pagination is in `js/projects.js`.

### 5. Contact (`#contact`)
- Short pitch line + big email CTA button, icon links (GitHub, LinkedIn placeholder).
- No form/backend in v1 — `mailto:` only. Footer with © year (auto).

## Motion rules
- Scroll reveals: `.reveal` class + IntersectionObserver, fade-up ~0.6s ease, small stagger via `--delay`.
- Everything gated behind `prefers-reduced-motion: reduce` — reduce to simple fades or none.
- Particle canvas pauses when hero is off-screen (perf) and respects reduced motion.

## Performance / a11y
- No external JS/CSS dependencies; no web fonts in v1.
- Semantic landmarks (`header/main/section/footer`), skip-to-content link, alt text, focus-visible styles.
- Lighthouse targets: 90+ across the board.
