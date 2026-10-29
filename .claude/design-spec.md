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
- Card grid (auto-fill, min 300px). Each card: language tag, status badge, title, **one-line hook**, tech chips, a "Details" toggle, and either a GitHub link or a "Private" lock. Hover: lift + accent border.
- **Collapsed by default.** Cards show only the `short` hook, clamped to two lines, so every card in a row is the same compact height and the grid stays scannable — nobody is handed a wall of text they didn't ask for. The full `desc` is in the DOM the whole time but not laid out until the card opens.
- **Click to expand.** Clicking a card (or its Details button, or pressing Enter on it) lifts it out of the grid and animates it to the centre of the viewport at reading width (min of 680px / 92vw), where the full description shows. Clicking it again, clicking the backdrop, or pressing Escape sends it back to exactly the slot it came from. One card open at a time.
  - The motion animates real geometry (top/left/width/height) between the card's grid rect and its centred rect, not a `scale()`, so text never stretches. A hidden placeholder holds the slot open so the rest of the grid never reflows; the return animation re-measures that placeholder, so it lands correctly even after scrolling or resizing.
  - While open the card is moved to `<body>`: `.project-grid` is a `.reveal`, and its `transform` would otherwise make it the containing block for `position: fixed`, centring the card against the grid instead of the viewport.
  - Open state is a dialog for assistive tech (`role="dialog"`, `aria-modal`, focus moved to the toggle); the backdrop makes it modal to the pointer, so the filters and pagination are unreachable until it closes.
  - Under `prefers-reduced-motion` the card still opens and centres — it just arrives instantly, with no morph, backdrop fade, or chevron rotation.
- Paginated (3/4/6 cards per page depending on column count), newest-first by `added` date. Changing filter or page closes an open card first, so it can't be orphaned by the re-render.
- **Paging keeps you in the section.** A page with fewer cards is shorter, and the browser's scroll anchoring used to compensate by scrolling *past* Projects into Certifications. The grid opts out with `overflow-anchor: none`, and after a page change `keepGridInView()` scrolls the filter row back under the nav — but only when the tabs aren't already clear of it and the last card isn't already above the fold, so paging a short list doesn't twitch the page. The scroll target is an `offsetTop` chain (absolute, layout-only) rather than `getBoundingClientRect + scrollY`, which reads stale while the browser is still re-clamping the scroll against the shorter document; the check itself is deferred one frame for the same reason.
- Data lives in `js/data/projects.js` (`PROJECTS`) so adding a project = adding one object — with both a `short` hook and the full `desc`. Rendering/filtering/pagination is in `js/projects.js`; the expand/collapse choreography is in `js/project-expand.js`.

### 5. Certifications (`#certifications`)
- Pinned certs render in a card grid (same auto-fill layout as projects). Each card: issuer pill, status badge (Earned = accent / In Progress = amber pulse), name (linked when a verify `url` exists), optional note, topic chips, date label.
- Unpinned certs sit behind a "Show all (N)" toggle, grouped under uppercase topic headings; the toggle is hidden while there are no unpinned certs. No filter UI — grouping does the topical organization.
- Data lives in `js/data/certifications.js` (`CERTIFICATIONS` + `TOPICS`) so adding a cert = adding one object; rendering/toggle is in `js/certifications.js`.
- In-progress credentials are shown honestly (e.g. "PL-300 — Expected 2026" with a prep note), never as earned.

### 6. Contact (`#contact`)
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
