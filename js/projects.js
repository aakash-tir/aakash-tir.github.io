/* ============ Project rendering + tabs ============ */
import { PROJECTS } from "./data/projects.js";

const grid = document.getElementById("project-grid");
// Both the desktop row and the mobile groups use these; they stay in sync.
const areaTabs = document.querySelectorAll(".project-tabs [data-area]");
const statusTabs = document.querySelectorAll(".project-tabs [data-status]");

const GITHUB_ICON =
  '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12v3.14c0 .3.21.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>';

const LOCK_ICON =
  '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>';

const STATUS_LABELS = { completed: "Completed", "in-progress": "In Progress" };

// Combined filter: a project shows only if it matches the selected area AND status.
function projectMatches(p) {
  const areaOk = currentArea === "all" || p.cats.includes(currentArea);
  const statusOk = currentStatus === "all" || p.status === currentStatus;
  return areaOk && statusOk;
}

// Projects sorted newest-first by `added` date (string YYYY-MM-DD sorts correctly).
const SORTED_PROJECTS = [...PROJECTS].sort((a, b) =>
  (b.added || "").localeCompare(a.added || "")
);

// 3 cards per page on phones, 6 on larger screens.
// Page size follows how many columns the grid currently renders:
// 1 col -> 3 per page, 2 cols -> 4, 3+ cols -> 6.
function columnCount() {
  const tracks = getComputedStyle(grid).gridTemplateColumns.split(" ").filter(Boolean);
  return Math.max(1, tracks.length);
}
function pageSize() {
  const c = columnCount();
  if (c <= 1) return 3;
  if (c === 2) return 4;
  return 6;
}
let currentArea = "all";
let currentStatus = "all";
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
  const PAGE_SIZE = pageSize();
  const items = SORTED_PROJECTS.filter((p) => projectMatches(p));
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

function activate(list, isOn) {
  list.forEach((t) => {
    const on = isOn(t);
    t.classList.toggle("active", on);
    t.setAttribute("aria-selected", String(on));
  });
}

// Area + status combine, on both the desktop row and the mobile groups.
// Active state is matched by value so both layouts stay in sync.
areaTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    currentArea = tab.dataset.area;
    activate(areaTabs, (t) => t.dataset.area === currentArea);
    currentPage = 0;
    renderProjects();
  });
});
statusTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    currentStatus = tab.dataset.status;
    activate(statusTabs, (t) => t.dataset.status === currentStatus);
    currentPage = 0;
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

// Re-paginate when crossing the mobile/desktop breakpoint (page size changes).
let lastCols = columnCount();
window.addEventListener(
  "resize",
  () => {
    const c = columnCount();
    if (c !== lastCols) {
      lastCols = c;
      currentPage = 0; // column count changed -> page size changed; re-paginate
      renderProjects();
    }
  },
  { passive: true }
);

renderProjects();
