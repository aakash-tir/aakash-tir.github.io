/* ============ Shared config ============ */
// Single source of truth for the reduced-motion preference. Every animated
// feature imports this and bails out (or renders a static fallback) when true.
export const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
