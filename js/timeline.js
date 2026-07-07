/* ============ Timeline expand/collapse (mobile) ============ */
// The toggle button is only visible on mobile (CSS), where each card is
// collapsed to date/title/org until expanded to reveal the description.
document.querySelectorAll(".timeline-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".timeline-card");
    if (!card) return;
    const expanded = card.classList.toggle("expanded");
    btn.setAttribute("aria-expanded", String(expanded));
    btn.setAttribute("aria-label", expanded ? "Hide details" : "Show details");
  });
});
