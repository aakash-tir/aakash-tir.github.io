/* ============ Project data ============ */
// Add a project = add one object here.
// cats:   any of "ai-ml" | "data" | "software" (area filter tabs).
// status: "completed" | "in-progress" (shown as a badge + status filter tabs).
// added:  YYYY-MM-DD you added it to the site. Newest is shown first — set a
//         later date than the others (e.g. today) and it jumps to the top.
// short:  the one-line hook shown on the collapsed card. Keep it to a single
//         sentence (~15 words) — cards are clamped to 2 lines, so a longer one
//         is silently truncated. This is the only copy most visitors read.
// desc:   the full write-up, revealed when the card is clicked and expands.
export const PROJECTS = [
  {
    title: "Nova — Always-On AI Assistant",
    cats: ["ai-ml", "software"],
    status: "in-progress",
    added: "2026-11-17",
    lang: "Python · React",
    short:
      "My always-on AI assistant: triages my inbox 24/7 and does the work I hand it.",
    desc:
      "A personal assistant that runs around the clock on my desktop and that I talk to through Slack, a web dashboard, or Siri on my phone. A free local model (Qwen via Ollama) triages every new email, event and message as it arrives; real work goes to a Claude Opus orchestrator (Claude Agent SDK) that dispatches Sonnet and local-Qwen subagents for research, planning and job hunting, and asks for my approval before anything risky. It manages my calendar, tasks, habits, sleep and goals, and connects to my other apps (Skillbook, Movie Tracker) over MCP so I can just tell it what to log. FastAPI backend, React dashboard, Docker, full CI with Playwright end-to-end tests.",
    tech: ["Python", "FastAPI", "Claude Agent SDK", "Ollama", "React", "MCP"],
    // Private repository — no public link.
  },
  {
    title: "Skillbook — Skill Practice Journal",
    cats: ["ai-ml", "software"],
    status: "completed",
    added: "2026-11-17",
    lang: "React · Supabase",
    short:
      "One book per skill: log practice as pages, get AI progress summaries.",
    desc:
      "A journal for skill progression that I use daily: each skill is its own book, each practice session a page you can flip back through like a real book. Tracks streaks and totals, and Claude writes weekly and monthly summaries of how a skill is coming along (batched through the Message Batches API to keep it cheap). Offline-first with IndexedDB (Dexie) and its own outbox sync to Supabase (Postgres + RLS, Auth, Storage, Edge Functions), installable as a PWA on phone and desktop, and exposed as an OAuth-protected MCP server so my assistant can log sessions for me.",
    tech: ["React", "TypeScript", "Supabase", "Anthropic API", "PWA"],
    // Private repository — no public link.
  },
  {
    title: "Movie Tracker",
    cats: ["software"],
    status: "completed",
    added: "2026-11-17",
    lang: "Flutter · Supabase",
    short:
      "Tracks every movie and show I watch, synced across phone and desktop.",
    desc:
      "A cross-platform tracker for movies and TV that I use every day on my phone and PC. One Flutter codebase for Windows, Android and iOS: library statuses, 1–10 ratings, per-episode TV progress, TMDB search through a Cloudflare Worker proxy, and \"For You\" recommendations seeded from my rated history. Offline-first on a local SQLite database (drift) with Supabase cloud sync and last-write-wins merging, Letterboxd import and RSS sync, and a remote MCP server with OAuth sign-in so AI agents can read and update the library.",
    tech: ["Flutter", "Dart", "Supabase", "SQLite", "MCP"],
    // Private repository — no public link.
  },
  {
    title: "Double A PDFs — Local PDF Editor",
    cats: ["software"],
    status: "completed",
    added: "2026-11-17",
    lang: "Python · React",
    short:
      "A free desktop PDF editor that never uploads your files anywhere.",
    desc:
      "A PDF editor for Windows that does what Acrobat charges a subscription for, entirely on your own machine: edit, sign, redact, OCR and convert, with no account, no network and no telemetry. A Python engine built on PyMuPDF does the PDF work behind a React + pdf.js interface in a native desktop window, with optional Tesseract OCR and LibreOffice/Chromium conversions. Ships with a one-command installer, and the editing engine also runs as an MCP server so AI agents can work on PDFs directly.",
    tech: ["Python", "PyMuPDF", "React", "TypeScript", "MCP"],
    // Private repository — no public link.
  },
  {
    title: "Newsletter Capture — AI Audio Briefing",
    cats: ["ai-ml", "software"],
    status: "in-progress",
    added: "2026-07-30",
    lang: "Python · Google Cloud",
    short:
      "Turns an inbox of newsletters into one narrated audio briefing each morning.",
    desc:
      "An automated daily pipeline that turns a Gmail inbox full of newsletters into a single narrated audio briefing. Claude (via the Anthropic SDK) detects, deduplicates, categorizes, and summarizes newsletters into a conversational script, then a three-engine text-to-speech chain (OpenAI → Google Cloud TTS → gTTS) renders an MP3 delivered to Google Drive. Runs serverless on Google Cloud Functions with Firestore, backed by a 346-test suite. The public repo is a self-hostable version anyone can deploy to their own Google Cloud project.",
    tech: ["Python", "Anthropic API", "Google Cloud", "Firestore"],
    // Public, self-hostable source. The production repo stays private.
    url: "https://github.com/aakash-tir/newsletter-audio-digest",
  },
  {
    title: "Sign App — Learn ASL by Camera",
    cats: ["ai-ml", "software"],
    status: "in-progress",
    added: "2026-07-01",
    lang: "React · ONNX Runtime Web",
    short:
      "Teaches sign language by watching you sign through the camera, on-device.",
    desc:
      "A cross-platform PWA that teaches American Sign Language by watching you sign through the camera and giving instant, fully on-device feedback — no video ever leaves the device. MediaPipe extracts hand and pose landmarks; a small MLP and an ONNX sequence model (trained in Python with scikit-learn and PyTorch) recognize 24 fingerspelling letters plus 103 dynamic signs (honest cross-validated top-1 ≈ 0.69 across 114 classes). The single React + TypeScript codebase runs offline on Windows, Android, iOS, and Linux, with typo-tolerant sign search and a 57-sentence practice section.",
    tech: ["React", "MediaPipe", "ONNX Runtime Web", "PyTorch", "PWA"],
    url: "https://github.com/aakash-tir/sign-app-public",
  },
  {
    title: "Glimpse — Desktop Weather App",
    cats: ["software"],
    status: "completed",
    added: "2026-06-30",
    lang: "TypeScript · Electron",
    short:
      "A floating desktop icon that expands into a full weather panel.",
    desc:
      "A tiny always-visible desktop weather app for Windows 11: a 64×64 floating icon shows the current condition and expands into a small window of cube-flipping slides — hourly, 7-day, current conditions, moon phase, severe weather alerts, and celestial events like auroras, meteor showers, and eclipses. No taskbar entry, no tray, no browser tab — the icon is the app. Built with Electron, React, and TypeScript on free keyless APIs (Open-Meteo, NOAA space weather, Environment Canada), with graceful offline handling. Shipped as a Windows installer across 12 milestones, with 1,031 CI-gated tests.",
    tech: ["Electron", "React", "TypeScript", "Open-Meteo API"],
    url: "https://github.com/aakash-tir/glimpse",
  },
  {
    title: "Blume — Resume & Portfolio Generator",
    cats: ["software", "ai-ml"],
    status: "completed",
    added: "2026-05-01",
    lang: "Python · React",
    short:
      "Turns your code repositories into tailored resumes and portfolios.",
    desc:
      "COSC 499 capstone (team of 6). A web app that ingests a user's code repositories and generates tailored resumes and portfolios. I built the folder-traversal / project-identification module — a combined DFS/BFS with a heuristic evaluator to detect project roots in arbitrary archives — and wired the React frontend to the Python analysis backend end to end.",
    tech: ["Python", "React", "Algorithms", "Full-Stack"],
    url: "https://github.com/COSC-499-W2025/capstone-project-team-6",
  },
  {
    title: "Jersey Number Recognition",
    cats: ["ai-ml"],
    status: "completed",
    added: "2026-01-15",
    lang: "Python · PyTorch",
    short:
      "Reads player jersey numbers from noisy sports-video tracklets.",
    desc:
      "Deep-learning pipeline (COSC 419B) that reads player jersey numbers from image tracklets. Improved baseline accuracy from 86.71% to 88.52% by tuning classification thresholds and adding Gaussian-noise and motion-blur augmentation; evaluated auxiliary STR heads and reverted to the leaner, better-performing config.",
    tech: ["Python", "PyTorch", "Computer Vision"],
    url: "https://github.com/carsonbennett1/Jersey-Number-Recognition-Project",
  },
  {
    title: "US Flight Delay Analysis",
    cats: ["data"],
    status: "completed",
    added: "2023-04-01",
    lang: "Python · Tableau",
    short:
      "Three years of US flight delays, mined for carrier and route patterns.",
    desc:
      "DATA 301 project analyzing US domestic flight delays (2019–2021) to surface carrier- and route-level patterns. Built in Jupyter with pandas, Seaborn, and Matplotlib, with findings presented through Tableau dashboards.",
    tech: ["pandas", "Seaborn", "Tableau", "Jupyter"],
    url: "https://github.com/ubco-W2022T2-data301/project-group-group05",
  },
  {
    title: "Game of the Amazons AI Bot",
    cats: ["ai-ml", "software"],
    status: "completed",
    added: "2024-12-01",
    lang: "Java",
    short:
      "A Minimax agent that plays the strategy game Amazons against other bots.",
    desc:
      "COSC 322 game-playing agent for the two-player abstract strategy game Amazons. Implemented Minimax with alpha-beta pruning and custom board-evaluation heuristics, integrated with the course Java library and game server to compete against other student bots.",
    tech: ["Java", "Minimax", "Game AI"],
    url: "https://github.com/maddysam356/COSC-322-Project",
  },
];
