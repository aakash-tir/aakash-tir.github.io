/* ============ Typing effect ============ */
import { prefersReducedMotion } from "./config.js";

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
