/* ============ Certifications: pinned grid + grouped "Show all" ============ */
import { CERTIFICATIONS, TOPICS } from "./data/certifications.js";

const grid = document.getElementById("cert-grid");
const more = document.getElementById("cert-more");
const toggle = document.getElementById("cert-toggle");

const STATUS = {
  earned: { cls: "earned", label: "Earned" },
  "in-progress": { cls: "in-progress", label: "In Progress" },
};

function cardHTML(c, i) {
  const status = STATUS[c.status] || STATUS.earned;
  const title = c.url
    ? `<a href="${c.url}" target="_blank" rel="noopener">${c.name}</a>`
    : c.name;
  return `
      <article class="cert-card" style="animation-delay: ${i * 0.08}s">
        <div class="cert-card-top">
          <span class="cert-issuer">${c.issuer}</span>
          <span class="cert-status ${status.cls}"><span class="cert-dot" aria-hidden="true"></span>${status.label}</span>
        </div>
        <h3>${title}</h3>
        ${c.note ? `<p class="cert-note">${c.note}</p>` : ""}
        <div class="cert-foot">
          <ul class="cert-topics" aria-label="Topics">${(c.topics || [])
            .map((t) => `<li>${TOPICS[t] || t}</li>`)
            .join("")}</ul>
          <span class="cert-date">${c.date}</span>
        </div>
      </article>`;
}

const pinned = CERTIFICATIONS.filter((c) => c.pinned);
const rest = CERTIFICATIONS.filter((c) => !c.pinned);

// With nothing pinned, show everything up front rather than an empty grid.
grid.innerHTML = (pinned.length ? pinned : CERTIFICATIONS)
  .map((c, i) => cardHTML(c, i))
  .join("");

// "Show all" reveals the unpinned certs grouped by their first topic.
if (pinned.length && rest.length) {
  const groups = new Map();
  rest.forEach((c) => {
    const key = (c.topics || [])[0] || "other";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(c);
  });

  more.innerHTML = [...groups.entries()]
    .map(
      ([key, certs]) => `
      <div class="cert-group">
        <h3 class="cert-group-title">${TOPICS[key] || "Other"}</h3>
        <div class="cert-grid">${certs.map((c, i) => cardHTML(c, i)).join("")}</div>
      </div>`
    )
    .join("");

  toggle.hidden = false;
  toggle.textContent = `Show all (${CERTIFICATIONS.length})`;
  toggle.addEventListener("click", () => {
    const open = more.hidden;
    more.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Show pinned only" : `Show all (${CERTIFICATIONS.length})`;
  });
}
