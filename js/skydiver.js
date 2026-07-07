/* ============ Scroll skydiver ============ */
// A stick figure that skydives down the right side as you scroll: hangs from a
// plane at the top, freefalls, deploys a parachute ~halfway (Projects), lands and
// waves at the footer — and flies up like Superman when you scroll upward.
import { prefersReducedMotion } from "./config.js";

(function () {
  const sky = document.getElementById("skydiver");
  if (!sky) return;
  if (prefersReducedMotion) {
    sky.style.display = "none";
    return;
  }

  const TOP_VH = 10; // vertical start (below the nav)
  const BOT_VH = 86; // vertical end (at the footer)
  const projectsEl = document.getElementById("projects");
  const footerEl = document.querySelector(".footer");
  const GROUND_VH = 8.8; // distance from the figure's top to its feet, in vh

  let lastY = window.scrollY;
  let dir = 1; // 1 = down, -1 = up
  let ticking = false;

  const clamp = (n) => Math.min(1, Math.max(0, n));

  function update() {
    ticking = false;
    const scrollY = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? clamp(scrollY / max) : 0;

    // Vertical travel tracks scroll progress.
    let y = TOP_VH + (BOT_VH - TOP_VH) * p;
    // Never let the figure's feet cross the footer's top border.
    if (footerEl) {
      const footerTopVh =
        (footerEl.getBoundingClientRect().top / window.innerHeight) * 100;
      const maxY = footerTopVh - GROUND_VH;
      if (y > maxY) y = maxY;
    }
    sky.style.transform = `translateY(${y}vh)`;

    // Parachute deploys exactly when the Projects section reaches the top.
    let paraThresh = 0.5;
    if (projectsEl && max > 0) {
      const projectsTop = projectsEl.getBoundingClientRect().top + scrollY;
      paraThresh = clamp(projectsTop / max);
    }

    // Pose selection.
    let phase;
    if (dir < 0 && p > 0.02) phase = "superman"; // scrolling up
    else if (p < 0.01) phase = "plane"; // only at the very top
    else if (p < paraThresh) phase = "freefall";
    else if (p < 0.98) phase = "parachute";
    else phase = "land"; // ground + wave at the very bottom

    if (sky.dataset.phase !== phase) sky.dataset.phase = phase;
  }

  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      if (y !== lastY) {
        dir = y > lastY ? 1 : -1;
        lastY = y;
      }
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );

  window.addEventListener(
    "resize",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );

  update();
})();
