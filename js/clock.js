/* ============ Background clock (Experience & Education) ============ */
// Hands rotate with scroll position (counter-clockwise down / clockwise up),
// and the whole clock travels from the section's top to its bottom as you scroll.
import { prefersReducedMotion } from "./config.js";

(function () {
  const wrap = document.querySelector(".clock-bg");
  const clock = wrap && wrap.querySelector("svg");
  const sec = document.getElementById("timeline");
  if (!wrap || !clock || !sec || prefersReducedMotion) return;
  const minute = clock.querySelector(".clock-minute");
  const hour = clock.querySelector(".clock-hour");

  const DEG_PER_PX = 0.75; // minute-hand speed relative to scroll (fast)
  let ticking = false;

  function update() {
    ticking = false;

    // Travel: keep the clock viewport-centered but clamped inside the section,
    // so it sits at the top when the section arrives and rides down to the bottom.
    const rect = sec.getBoundingClientRect();
    const clockH = wrap.offsetHeight;
    const vh = window.innerHeight;
    let topVp = vh / 2 - clockH / 2;
    const minTop = rect.top; // pinned to section top
    const maxTop = rect.bottom - clockH; // pinned to section bottom
    topVp = Math.max(minTop, Math.min(maxTop, topVp));
    const travel = topVp - rect.top; // how far the clock has moved within the section
    wrap.style.transform = `translateY(${travel}px)`;

    // Rotate the hands based on the clock's travel — so they turn only while the
    // clock is actually moving, and stay still while it's pinned top/bottom.
    const a = travel * DEG_PER_PX;
    if (minute) minute.setAttribute("transform", `rotate(${-a} 100 100)`);
    if (hour) hour.setAttribute("transform", `rotate(${-a / 12} 100 100)`);
  }

  window.addEventListener(
    "scroll",
    () => {
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
