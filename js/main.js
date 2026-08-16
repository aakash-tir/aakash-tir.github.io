/* ============================================================
   Portfolio interactivity — entry point.

   Each feature lives in its own module and self-initializes on
   import (querying the DOM, wiring events). This file just pulls
   them in, in the original load order, then does the one trivial
   bit of glue that doesn't warrant its own module.

   Modules:
     config.js        shared reduced-motion flag
     data/projects.js the PROJECTS content list
     data/certifications.js the CERTIFICATIONS content list + topics
     projects.js      project grid: rendering, filter tabs, pagination
     project-expand.js  card click -> morph to centre, click again -> back
     certifications.js certification cards: pinned grid + grouped "Show all"
     typing.js        hero typing/erasing headline
     reveal.js        scroll-reveal IntersectionObserver
     nav.js           nav scrolled state + active-link highlighting
     particles.js     hero particle-network canvas
     skydiver.js      scroll-driven skydiver figure
     clock.js         Experience & Education background clock
     mobile-nav.js    phone nav auto-loop marquee
     timeline.js      timeline card expand/collapse (mobile)
   ============================================================ */

import "./projects.js";
import "./certifications.js";
import "./typing.js";
import "./reveal.js";
import "./nav.js";
import "./particles.js";
import "./skydiver.js";
import "./clock.js";
import "./mobile-nav.js";
import "./timeline.js";

/* ============ Footer year ============ */
document.getElementById("year").textContent = new Date().getFullYear();
