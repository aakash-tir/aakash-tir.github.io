/* ============ Mobile nav marquee ============ */
// On phones the middle links (About/Experience/Projects/Résumé) auto-loop
// horizontally. Touching/scrolling pauses on the current spot for 5s, then the
// loop resumes. The logo and Contact stay pinned (handled in CSS).
import { prefersReducedMotion } from "./config.js";

(function () {
  const list = document.querySelector(".nav-links");
  if (!list) return;
  const mql = window.matchMedia("(max-width: 500px)");

  const SPEED = 0.2; // px per frame
  let rafId = null;
  let paused = false;
  let resumeTimer = null;
  let clones = [];
  let loopWidth = 0;
  let pos = 0; // our own float position (scrollLeft rounds to whole px on read)

  function step() {
    if (!paused && loopWidth > 0) {
      pos += SPEED;
      if (pos >= loopWidth) pos -= loopWidth;
      list.scrollLeft = pos;
    }
    rafId = requestAnimationFrame(step);
  }

  function pauseInteract() {
    paused = true;
    if (resumeTimer) clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => {
      paused = false;
      pos = list.scrollLeft; // resume from wherever the user left it
    }, 5000); // hold on the scrolled-to spot for 5s, then resume
  }

  const INTERACTION_EVENTS = ["pointerdown", "touchstart", "touchmove", "wheel"];

  function enable() {
    if (rafId !== null) return; // already running
    if (prefersReducedMotion) return; // leave it manually scrollable, no loop
    loopWidth = list.scrollWidth;
    if (loopWidth <= list.clientWidth + 4) {
      loopWidth = 0;
      return; // links already fit — no marquee or clones needed
    }
    // Duplicate the items so the scroll can wrap seamlessly.
    Array.from(list.children).forEach((li) => {
      const c = li.cloneNode(true);
      c.setAttribute("aria-hidden", "true");
      c.classList.add("nav-clone");
      list.appendChild(c);
      clones.push(c);
    });
    INTERACTION_EVENTS.forEach((ev) =>
      list.addEventListener(ev, pauseInteract, { passive: true })
    );
    pos = list.scrollLeft;
    if (!prefersReducedMotion) rafId = requestAnimationFrame(step);
  }

  function disable() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    if (resumeTimer) {
      clearTimeout(resumeTimer);
      resumeTimer = null;
    }
    paused = false;
    INTERACTION_EVENTS.forEach((ev) => list.removeEventListener(ev, pauseInteract));
    clones.forEach((c) => c.remove());
    clones = [];
    list.scrollLeft = 0;
  }

  function apply() {
    if (mql.matches) enable();
    else disable();
  }

  mql.addEventListener("change", apply);
  apply();
})();
