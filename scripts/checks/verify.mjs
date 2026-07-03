// Publish-readiness checks — zero external dependencies (Node built-ins only).
// Run locally:  node scripts/checks/verify.mjs
// Fails (exit 1) if any referenced local asset is missing, or if any
// <!-- TEMP --> placeholder is still present (not up to publish standard).

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const rel = (p) => p.slice(root.length + 1).replaceAll("\\", "/");
const errors = [];

if (!existsSync(join(root, "index.html"))) {
  errors.push("index.html is missing at the repo root");
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === ".git" || name === "node_modules") continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const isExternal = (u) => /^(https?:|mailto:|tel:|data:|#|\/\/)/.test(u);
const refRe = /(?:src|href)\s*=\s*"([^"]+)"/g;

const htmlFiles = existsSync(join(root, "index.html"))
  ? walk(root).filter((f) => f.endsWith(".html"))
  : [];

for (const hf of htmlFiles) {
  const html = readFileSync(hf, "utf8");

  // 1. Asset integrity: every local src/href must resolve to a real file.
  let m;
  while ((m = refRe.exec(html)) !== null) {
    const raw = m[1];
    if (isExternal(raw)) continue;
    const ref = raw.split("#")[0].split("?")[0].trim();
    if (!ref) continue;
    if (!existsSync(join(dirname(hf), ref))) {
      errors.push(`${rel(hf)}: referenced file not found -> ${ref}`);
    }
  }

  // 2. Publish standard: no leftover placeholders.
  if (/<!--\s*TEMP\s*-->/i.test(html)) {
    errors.push(`${rel(hf)}: contains a <!-- TEMP --> placeholder (not publish-ready)`);
  }
}

if (errors.length) {
  console.error("✖ Publish checks FAILED:");
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}
console.log("✔ Publish checks passed: asset integrity OK, no TEMP placeholders.");
