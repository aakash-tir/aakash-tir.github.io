/* ============ Project data ============ */
// Add a project = add one object here.
// cats:   any of "ai-ml" | "data" | "software" (area filter tabs).
// status: "completed" | "in-progress" (shown as a badge + status filter tabs).
// added:  YYYY-MM-DD you added it to the site. Newest is shown first — set a
//         later date than the others (e.g. today) and it jumps to the top.
export const PROJECTS = [
  {
    title: "Newsletter Capture — AI Audio Briefing",
    cats: ["ai-ml", "software"],
    status: "in-progress",
    added: "2026-07-30",
    lang: "Python · Google Cloud",
    desc:
      "An automated daily pipeline that turns a Gmail inbox full of newsletters into a single narrated audio briefing. Claude (via the Anthropic SDK) detects, deduplicates, categorizes, and summarizes newsletters into a conversational script, then a three-engine text-to-speech chain (OpenAI → Google Cloud TTS → gTTS) renders an MP3 delivered to Google Drive. Runs serverless on Google Cloud Functions with Firestore and powers a public subscriber service with topic-personalized audio and per-subscriber send times — backed by a 346-test suite.",
    tech: ["Python", "Anthropic API", "Google Cloud", "Firestore"],
    // Private repository — no public link.
  },
  {
    title: "Sinhala Learning App",
    cats: ["software"],
    status: "in-progress",
    added: "2026-07-02",
    lang: "React · Capacitor",
    desc:
      "A free phone app that takes a complete beginner to conversational, literate Sinhala across four skills — listening, speaking, reading, and writing. One React + TypeScript codebase ships as a native Android APK (Capacitor) and an installable iPhone/web PWA, fully offline with bundled TTS audio and a 3-tier speech-recognition fallback so speaking practice never blocks progress. Features a lesson player with XP and streaks plus eight exercise types; Unit 0 delivers 5 lessons across 46 exercises.",
    tech: ["React", "TypeScript", "Capacitor", "PWA"],
    // Private repository — no public link.
  },
  {
    title: "Sign App — Learn ASL by Camera",
    cats: ["ai-ml", "software"],
    status: "in-progress",
    added: "2026-07-01",
    lang: "React · TensorFlow.js",
    desc:
      "A cross-platform PWA that teaches American Sign Language by watching you sign through the camera and giving instant, fully on-device feedback — no video ever leaves the device. MediaPipe extracts hand and pose landmarks and a TensorFlow.js classifier recognizes 24 fingerspelling letters plus 103 dynamic signs (honest cross-validated top-1 ≈ 0.69 across 114 classes). The single React + TypeScript codebase runs offline on Windows, Android, iOS, and Linux, with typo-tolerant sign search and a 57-sentence practice section.",
    tech: ["React", "MediaPipe", "TensorFlow.js", "PWA"],
    // Private repository — no public link.
  },
  {
    title: "Glimpse — Desktop Weather App",
    cats: ["software"],
    status: "completed",
    added: "2026-06-30",
    lang: "TypeScript · Electron",
    desc:
      "A tiny always-visible desktop weather app for Windows 11: a 64×64 floating icon shows the current condition and expands into a small square window of cube-flipping slides — hourly, 7-day, current conditions, moon phase, severe weather alerts, and celestial events like auroras, meteor showers, and eclipses. No taskbar entry, no tray, no browser tab — the icon is the app. Built with Electron, React, and TypeScript on free keyless APIs (Open-Meteo, NOAA space-weather Kp, Environment Canada alerts, SunCalc), with an 8-step onboarding tutorial, cached-location fallback, and graceful offline handling. Shipped across 12 milestones (M0–M11) as an NSIS installer, with 1,031 automated tests (1,002 Vitest + 29 Playwright) gated by CI on every push. Source is public under MIT.",
    tech: ["Electron", "React", "TypeScript", "Open-Meteo API"],
    url: "https://github.com/aakash-tir/glimpse",
  },
  {
    title: "Blume — Resume & Portfolio Generator",
    cats: ["software", "ai-ml"],
    status: "completed",
    added: "2026-05-01",
    lang: "Python · React",
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
    desc:
      "COSC 322 game-playing agent for the two-player abstract strategy game Amazons. Implemented Minimax with alpha-beta pruning and custom board-evaluation heuristics, integrated with the course Java library and game server to compete against other student bots.",
    tech: ["Java", "Minimax", "Game AI"],
    url: "https://github.com/maddysam356/COSC-322-Project",
  },
];
