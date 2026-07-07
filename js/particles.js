/* ============ Particle canvas ============ */
import { prefersReducedMotion } from "./config.js";

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
