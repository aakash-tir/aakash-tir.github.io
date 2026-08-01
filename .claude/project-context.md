# Project Context

## Goal
Build an interactive, attention-holding portfolio page that markets Aakash Tirathdas well to recruiters and collaborators. First pass is a general page; the owner will iterate on it with direct instructions afterward.

## Audience
Primary: tech recruiters and hiring managers skimming for 30–60 seconds. Secondary: classmates/collaborators checking out his work. The page must communicate skills fast and reward scrolling.

## Tech decision
Vanilla HTML/CSS/JS static site.
- **Why:** zero build step, free GitHub Pages hosting, fast load, easy for the owner to edit. A framework adds nothing at this scale.
- Higgsfield (image/video generation) is available but **deferred** — CSS-driven visuals (particle canvas, gradients) carry the first version. Revisit for a hero image or project thumbnails once the owner has seen the base page.

## Content inventory

### Owner
- Aakash Tirathdas — CS graduate (Class of 2026), UBC Okanagan; Data Science minor, First Class Standing
- GitHub: [aakash-tir](https://github.com/aakash-tir) · Email: aakashtirathdas@gmail.com
- GitHub bio: "Just a chill guy trying to code his way through life."

### Projects
Source of truth is `js/data/projects.js` (`PROJECTS`); this table mirrors it. Each project has an area (`ai-ml` / `data` / `software`), a status, and an `added` date (newest shown first).

**In progress**
| Project | Language | Notes |
|---|---|---|
| Newsletter Capture — AI Audio Briefing | Python · Google Cloud | Gmail newsletters → Claude-summarized script → TTS audio briefing on Google Drive; serverless (Cloud Functions + Firestore), 346-test suite. Private repo. |
| Sinhala Learning App | React · Capacitor | Offline Sinhala-learning app; Android APK + iOS/web PWA. Private repo. |
| Sign App — Learn ASL by Camera | React · TensorFlow.js | On-device ASL recognition (MediaPipe + TF.js), cross-platform PWA. Private repo. |
| Glimpse — Desktop Weather App | TypeScript · Electron | Always-on Windows 11 weather app; Open-Meteo + NOAA space-weather. Private repo. |

**Completed**
| Project | Language | Notes |
|---|---|---|
| [Blume — Resume & Portfolio Generator](https://github.com/COSC-499-W2025/capstone-project-team-6) | Python · React | COSC 499 capstone (team of 6); folder-traversal / project-identification module. |
| [Jersey Number Recognition](https://github.com/carsonbennett1/Jersey-Number-Recognition-Project) | Python · PyTorch | COSC 419B computer-vision pipeline; 86.71% → 88.52% accuracy. |
| [US Flight Delay Analysis](https://github.com/ubco-W2022T2-data301/project-group-group05) | pandas · Tableau | DATA 301 analysis of US flight delays (2019–2021). |
| [Game of the Amazons AI Bot](https://github.com/maddysam356/COSC-322-Project) | Java | COSC 322 Minimax + alpha-beta game agent. |

### Certifications
Source of truth is `js/data/certifications.js` (`CERTIFICATIONS`); this list mirrors it. Pinned certs are always visible; unpinned ones sit behind "Show all", grouped by topic.

| Certification | Issuer | Status | Pinned |
|---|---|---|---|
| PL-300: Microsoft Power BI Data Analyst | Microsoft | In progress (expected 2026) — preparing via DataCamp's Data Analyst in Power BI track | Yes |
| Introduction to Power BI | DataCamp | Earned Jul 2026 | No |
| Data Preparation in Power BI | DataCamp | Earned Jul 2026 | No |
| Data Visualization in Power BI | DataCamp | Earned Jul 2026 | No |
| Introduction to DAX in Power BI | DataCamp | Earned Jul 2026 | No |
| Case Study: Analyzing Customer Churn in Power BI | DataCamp | Earned Jul 2026 | No |
| Introduction to Apache Airflow in Python | DataCamp | Earned Jul 2026 | No |

All DataCamp entries link to their statement-of-accomplishment verify pages.

### Content status
All sections now hold real, owner-approved content — no `<!-- TEMP -->` placeholders remain (enforced by the publish-readiness check). About-me, timeline (3 roles + BSc + A-Levels), project descriptions, and contact (email, phone, LinkedIn, résumé PDF) are all final.
