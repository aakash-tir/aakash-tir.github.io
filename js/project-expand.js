/* ============ Project card expand/collapse ============ */
// Collapsed cards show only the one-line `short` hook, so the grid stays a
// scannable set of equal tiles. Clicking a card lifts it out of the grid and
// animates it to the centre of the viewport at full size, where the long
// `desc` is readable; clicking again (or the backdrop, or Escape) sends it
// back to exactly the slot it came from.
//
// The motion is a first/last geometry animation: measure the card in the grid,
// pin it there with `position: fixed`, measure where it wants to end up, then
// transition top/left/width/height between the two. Animating real geometry
// rather than a `scale()` keeps the text crisp instead of stretching it.
//
// While a card is out of the grid a placeholder holds its slot open, so the
// rest of the layout never reflows — and on collapse we re-measure that
// placeholder, which is why returning works even if the page scrolled or
// resized in the meantime.
import { prefersReducedMotion } from "./config.js";

// Keep in sync with the .project-card.is-morphing transition in css/projects.css.
const MORPH_MS = 420;
const MAX_WIDTH = 680; // px — comfortable reading measure for the long copy
const VIEWPORT_FILL = { width: 0.92, height: 0.86 };

let card = null; // the currently expanded card, or null
let placeholder = null; // holds its slot in the grid
let backdrop = null;
let timer = 0;

export const isExpanded = () => card !== null;

/* ---- geometry ---- */

// Where the card should end up: centred, capped to a readable width and to the
// viewport height. Measured with the card already expanded and fixed, so the
// height we read is the height the full description actually needs.
function centredRect() {
  const vw = document.documentElement.clientWidth;
  const vh = document.documentElement.clientHeight;
  const width = Math.min(MAX_WIDTH, vw * VIEWPORT_FILL.width);

  const before = { width: card.style.width, height: card.style.height };
  card.style.width = `${width}px`;
  card.style.height = "auto";
  const natural = card.offsetHeight; // forced sync layout — no paint in between
  card.style.width = before.width;
  card.style.height = before.height;

  const height = Math.min(natural, vh * VIEWPORT_FILL.height);
  return {
    width,
    height,
    left: (vw - width) / 2,
    top: (vh - height) / 2,
  };
}

function applyRect(rect) {
  card.style.top = `${rect.top}px`;
  card.style.left = `${rect.left}px`;
  card.style.width = `${rect.width}px`;
  card.style.height = `${rect.height}px`;
}

/* ---- lifecycle ---- */

function expand(target) {
  const first = target.getBoundingClientRect();
  card = target;
  clearTimeout(timer);

  // Freeze the card-in animation before the move below: re-parenting a node
  // restarts CSS animations, and a replaying `cardIn` would fight the morph
  // with its own transform.
  card.classList.add("is-static");

  placeholder = document.createElement("div");
  placeholder.className = "project-placeholder";
  placeholder.style.height = `${first.height}px`;
  card.after(placeholder);
  // `.project-grid` is a `.reveal`, and its `transform: translateY(0)` makes it
  // a containing block for fixed-position children — a card left inside it
  // would centre against the grid instead of the viewport. Lifting it to
  // <body> keeps `position: fixed` meaning what it says, whatever ancestors
  // gain transforms later.
  document.body.appendChild(card);

  backdrop = document.createElement("div");
  backdrop.className = "project-backdrop";
  backdrop.addEventListener("click", collapse);
  document.body.appendChild(backdrop);

  // Expanded styles + full copy go on first, so the end geometry we measure
  // below accounts for the taller content.
  card.classList.add("is-expanded");
  card.style.position = "fixed";
  card.style.margin = "0";
  applyRect(first);

  const last = centredRect();
  setExpandedState(true);

  if (prefersReducedMotion) {
    applyRect(last);
    backdrop.classList.add("is-visible");
    finishExpand();
    return;
  }

  void card.offsetWidth; // commit the start geometry before transitioning
  card.classList.add("is-morphing");
  requestAnimationFrame(() => {
    if (!card) return;
    backdrop.classList.add("is-visible");
    applyRect(last);
    timer = setTimeout(finishExpand, MORPH_MS);
  });
}

// Once the growth is done, drop the fixed height so the card can follow its
// own content if the viewport changes, and let long copy scroll inside it.
function finishExpand() {
  if (!card) return;
  card.classList.remove("is-morphing");
  card.classList.add("is-open");
}

function collapse() {
  if (!card) return;
  const leaving = card;
  const back = placeholder.getBoundingClientRect();
  clearTimeout(timer);

  // Pin the geometry it currently occupies before touching the content —
  // `.is-open` lets the height float, and swapping back to the short copy
  // would otherwise collapse it instantly instead of animating.
  const current = leaving.getBoundingClientRect();
  applyRect(current);
  leaving.classList.remove("is-open");
  setExpandedState(false);

  if (prefersReducedMotion) {
    cleanup(leaving);
    return;
  }

  void leaving.offsetWidth;
  leaving.classList.add("is-morphing");
  requestAnimationFrame(() => {
    backdrop?.classList.remove("is-visible");
    leaving.style.top = `${back.top}px`;
    leaving.style.left = `${back.left}px`;
    leaving.style.width = `${back.width}px`;
    leaving.style.height = `${back.height}px`;
    timer = setTimeout(() => cleanup(leaving), MORPH_MS);
  });

  card = null; // stop further clicks from re-entering while it flies home
}

// Drop every inline style and class the animation added, putting the card
// back under the grid's control.
function cleanup(leaving) {
  clearTimeout(timer);
  leaving.classList.remove("is-expanded", "is-morphing", "is-open");
  leaving.removeAttribute("style");
  leaving.removeAttribute("role");
  leaving.removeAttribute("aria-modal");
  leaving.removeAttribute("aria-label");
  // Back into the exact slot the placeholder has been holding open.
  placeholder?.before(leaving);
  placeholder?.remove();
  backdrop?.remove();
  placeholder = null;
  backdrop = null;
  card = null;
}

// Tear everything down with no animation — used when the grid is about to be
// re-rendered (filter / pagination / resize), which would orphan the card.
export function collapseNow() {
  if (!card) return;
  const leaving = card;
  setExpandedState(false);
  cleanup(leaving);
}

/* ---- state shared by the button, ARIA and the toggle label ---- */

function setExpandedState(open) {
  const target = card;
  if (!target) return;
  const btn = target.querySelector(".project-expand");
  if (btn) {
    btn.setAttribute("aria-expanded", String(open));
    btn.querySelector(".project-expand-label").textContent = open
      ? "Close"
      : "Details";
  }
  if (open) {
    // A centred panel over a backdrop is a dialog for anyone using a screen
    // reader, even though it is a grid card the rest of the time.
    target.setAttribute("role", "dialog");
    target.setAttribute("aria-modal", "true");
    const heading = target.querySelector("h3");
    if (heading) target.setAttribute("aria-label", heading.textContent);
    btn?.focus({ preventScroll: true });
  }
}

/* ---- wiring ---- */

export function initProjectExpand() {
  // Delegated from the document, not the grid: an expanded card lives in
  // <body> for the duration, so a grid-scoped listener would never see the
  // click that closes it.
  document.addEventListener("click", (e) => {
    // The GitHub link is its own action — never let it toggle the card.
    if (e.target.closest("a")) return;
    const hit = e.target.closest(".project-card");
    if (!hit) return;
    if (card === hit) collapse();
    else if (!card) expand(hit);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && card) collapse();
  });

  // A resize invalidates both the centred geometry and the slot we'd fly back
  // to, so re-centre instantly rather than animating to a stale rect.
  window.addEventListener(
    "resize",
    () => {
      if (!card) return;
      card.classList.remove("is-morphing");
      applyRect(centredRect());
    },
    { passive: true }
  );
}
