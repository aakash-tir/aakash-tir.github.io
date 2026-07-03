/* ============================================================
   Portfolio interactivity: particles, typing effect, scroll
   reveals, project tabs, nav state.
   ============================================================ */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ============ Project data ============ */
// Add a project = add one object here.
// cats:   any of "ai-ml" | "data" | "software" (area filter tabs).
// status: "completed" | "in-progress" (shown as a badge + status filter tabs).
// added:  YYYY-MM-DD you added it to the site. Newest is shown first — set a
//         later date than the others (e.g. today) and it jumps to the top.
const PROJECTS = [
  {
    title: "Sinhala Learning App",
    cats: ["software"],
    status: "in-progress",
    added: "2026-07-02",
    lang: "React · Capacitor",
    desc:
      "A free phone app that takes a complete beginner to conversational, literate Sinhala across four skills — listening, speaking, reading, and writing. One React + TypeScript codebase ships as a native Android APK (Capacitor) and an installable iPhone/web PWA, fully offline with bundled TTS audio and a 3-tier speech-recognition fallback so speaking practice never blocks progress. Features a lesson player with XP and streaks plus eight exercise types; Unit 0 delivers 5 lessons across 46 exercises.",
    tech: ["React", "TypeScript", "Capacitor", "PWA"],
    // Private repository — no public link.
  },
  {
    title: "Sign App — Learn ASL by Camera",
    cats: ["ai-ml", "software"],
    status: "in-progress",
    added: "2026-07-01",
    lang: "React · TensorFlow.js",
    desc:
      "A cross-platform PWA that teaches American Sign Language by watching you sign through the camera and giving instant, fully on-device feedback — no video ever leaves the device. MediaPipe extracts hand and pose landmarks and a TensorFlow.js classifier recognizes 24 fingerspelling letters plus 103 dynamic signs (honest cross-validated top-1 ≈ 0.69 across 114 classes). The single React + TypeScript codebase runs offline on Windows, Android, iOS, and Linux, with typo-tolerant sign search and a 57-sentence practice section.",
    tech: ["React", "MediaPipe", "TensorFlow.js", "PWA"],
    // Private repository — no public link.
  },
  {
    title: "Glimpse — Desktop Weather App",
    cats: ["software"],
    status: "in-progress",
    added: "2026-06-30",
    lang: "TypeScript · Electron",
    desc:
      "A lightweight always-on-desktop weather app for Windows 11: a small floating icon shows the current condition and expands into a card of cube-flipping slides — hourly, 7-day, current conditions, moon phase, and rare celestial events like auroras and meteor showers. Built with Electron, React, and TypeScript, pulling live data from Open-Meteo, NOAA space-weather (Kp/aurora), and SunCalc, with graceful offline handling. Structured across 11 milestones (M0–M10) with a Vitest + Playwright test suite.",
    tech: ["Electron", "React", "TypeScript", "Open-Meteo API"],
    // Private repository — no public link.
  },
  {
    title: "Blume — Resume & Portfolio Generator",
    cats: ["software", "ai-ml"],
    status: "completed",
    added: "2026-05-01",
    lang: "Python · React",
    desc:
      "COSC 499 capstone (team of 6). A web app that ingests a user's code repositories and generates tailored resumes and portfolios. I built the folder-traversal / project-identification module — a combined DFS/BFS with a heuristic evaluator to detect project roots in arbitrary archives — and wired the React frontend to the Python analysis backend end to end.",
    tech: ["Python", "React", "Algorithms", "Full-Stack"],
    url: "https://github.com/COSC-499-W2025/capstone-project-team-6",
  },
  {
    title: "Jersey Number Recognition",
    cats: ["ai-ml"],
    status: "completed",
    added: "2026-01-15",
    lang: "Python · PyTorch",
    desc:
      "Deep-learning pipeline (COSC 419B) that reads player jersey numbers from image tracklets. Improved baseline accuracy from 86.71% to 88.52% by tuning classification thresholds and adding Gaussian-noise and motion-blur augmentation; evaluated auxiliary STR heads and reverted to the leaner, better-performing config.",
    tech: ["Python", "PyTorch", "Computer Vision"],
    url: "https://github.com/carsonbennett1/Jersey-Number-Recognition-Project",
  },
  {
    title: "US Flight Delay Analysis",
    cats: ["data"],
    status: "completed",
    added: "2023-04-01",
    lang: "Python · Tableau",
    desc:
      "DATA 301 project analyzing US domestic flight delays (2019–2021) to surface carrier- and route-level patterns. Built in Jupyter with pandas, Seaborn, and Matplotlib, with findings presented through Tableau dashboards.",
    tech: ["pandas", "Seaborn", "Tableau", "Jupyter"],
    url: "https://github.com/ubco-W2022T2-data301/project-group-group05",
  },
  {
    title: "Game of the Amazons AI Bot",
    cats: ["ai-ml", "software"],
    status: "completed",
    added: "2024-12-01",
    lang: "Java",
    desc:
      "COSC 322 game-playing agent for the two-player abstract strategy game Amazons. Implemented Minimax with alpha-beta pruning and custom board-evaluation heuristics, integrated with the course Java library and game server to compete against other student bots.",
    tech: ["Java", "Minimax", "Game AI"],
    url: "https://github.com/maddysam356/COSC-322-Project",
  },
];

/* ============ Project rendering + tabs ============ */
const grid = document.getElementById("project-grid");
const tabs = document.querySelectorAll(".tab");

const GITHUB_ICON =
  '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12v3.14c0 .3.21.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>';

const LOCK_ICON =
  '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>';

const STATUS_LABELS = { completed: "Completed", "in-progress": "In Progress" };
const STATUS_FILTERS = ["completed", "in-progress"];

function projectMatches(p, filter) {
  if (filter === "all") return true;
  if (STATUS_FILTERS.includes(filter)) return p.status === filter;
  return p.cats.includes(filter);
}

// Projects sorted newest-first by `added` date (string YYYY-MM-DD sorts correctly).
const SORTED_PROJECTS = [...PROJECTS].sort((a, b) =>
  (b.added || "").localeCompare(a.added || "")
);

const PAGE_SIZE = 6;
let currentFilter = "all";
let currentPage = 0;

const pagination = document.getElementById("project-pagination");
const prevBtn = document.getElementById("page-prev");
const nextBtn = document.getElementById("page-next");
const pageIndicator = document.getElementById("page-indicator");

function cardHTML(p, i) {
  const statusLabel = STATUS_LABELS[p.status] || "";
  return `
      <article class="project-card" style="animation-delay: ${i * 0.08}s">
        <div class="project-card-top">
          <div class="project-meta">
            <span class="project-lang">${p.lang}</span>
            <span class="project-status status-${p.status}"><span class="status-dot" aria-hidden="true"></span>${statusLabel}</span>
          </div>
          ${
            p.url
              ? `<a class="project-link" href="${p.url}" target="_blank" rel="noopener" aria-label="View ${p.title} on GitHub">${GITHUB_ICON}</a>`
              : `<span class="project-private" title="Private repository">${LOCK_ICON} Private</span>`
          }
        </div>
        <h3>${p.title}</h3>
        <p class="desc">${p.desc}</p>
        <ul class="project-tech">${p.tech.map((t) => `<li>${t}</li>`).join("")}</ul>
      </article>`;
}

function renderProjects() {
  const items = SORTED_PROJECTS.filter((p) => projectMatches(p, currentFilter));
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  if (currentPage > totalPages - 1) currentPage = totalPages - 1;
  if (currentPage < 0) currentPage = 0;

  if (items.length === 0) {
    grid.innerHTML = '<p class="project-empty">Nothing here yet — check back soon!</p>';
  } else {
    const start = currentPage * PAGE_SIZE;
    grid.innerHTML = items
      .slice(start, start + PAGE_SIZE)
      .map((p, i) => cardHTML(p, i))
      .join("");
  }

  // Pagination controls: only shown when a filter has more than one page.
  if (totalPages <= 1) {
    pagination.hidden = true;
  } else {
    pagination.hidden = false;
    pageIndicator.textContent = `${currentPage + 1} / ${totalPages}`;
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === totalPages - 1;
  }
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => {
      t.classList.toggle("active", t === tab);
      t.setAttribute("aria-selected", String(t === tab));
    });
    currentFilter = tab.dataset.filter;
    currentPage = 0; // reset to first page when the filter changes
    renderProjects();
  });
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    renderProjects();
  }
});
nextBtn.addEventListener("click", () => {
  currentPage++;
  renderProjects();
});

renderProjects();

/* ============ Typing effect ============ */
const TYPED_LINES = [
  "New-Grad Software Engineer",
  "ML & LLM Systems",
  "Computer Vision Researcher",
  "CS Grad · Data Science Minor",
];

const typedEl = document.getElementById("typed-text");

if (prefersReducedMotion) {
  typedEl.textContent = TYPED_LINES[0];
} else {
  let lineIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function typeTick() {
    const line = TYPED_LINES[lineIdx];
    charIdx += deleting ? -1 : 1;
    typedEl.textContent = line.slice(0, charIdx);

    let delay = deleting ? 40 : 85;
    if (!deleting && charIdx === line.length) {
      delay = 2000; // pause at full line
      deleting = true;
    } else if (deleting && charIdx === 0) {
      deleting = false;
      lineIdx = (lineIdx + 1) % TYPED_LINES.length;
      delay = 400;
    }
    setTimeout(typeTick, delay);
  }
  typeTick();
}

/* ============ Scroll reveal ============ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ============ Nav: scrolled state + active link ============ */
const nav = document.getElementById("nav");

window.addEventListener(
  "scroll",
  () => nav.classList.toggle("scrolled", window.scrollY > 40),
  { passive: true }
);

const navLinks = document.querySelectorAll(".nav-links a[href^='#']");
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) =>
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`)
      );
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

document.querySelectorAll("main section[id]").forEach((s) => sectionObserver.observe(s));

/* ============ Particle canvas ============ */
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");
let particles = [];
let animId = null;

function sizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

function initParticles() {
  sizeCanvas();
  const count = Math.min(90, Math.floor((canvas.width * canvas.height) / 16000));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 1.8 + 0.6,
  }));
}

const LINK_DIST = 130;

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(45, 212, 191, 0.55)";
    ctx.fill();
  }

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.hypot(dx, dy);
      if (dist < LINK_DIST) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(45, 212, 191, ${0.14 * (1 - dist / LINK_DIST)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  animId = requestAnimationFrame(drawParticles);
}

if (!prefersReducedMotion) {
  initParticles();

  // Pause the animation when the hero is off-screen.
  const heroObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && animId === null) {
      animId = requestAnimationFrame(drawParticles);
    } else if (!entry.isIntersecting && animId !== null) {
      cancelAnimationFrame(animId);
      animId = null;
    }
  });
  heroObserver.observe(document.querySelector(".hero"));

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initParticles, 150);
  });
}

/* ============ Footer year ============ */
document.getElementById("year").textContent = new Date().getFullYear();
