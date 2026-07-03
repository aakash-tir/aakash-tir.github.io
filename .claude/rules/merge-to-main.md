# Rule: `main` is the published branch — protect it

`main` deploys straight to production (**https://aakash-tir.github.io/**) on every
push. Therefore **nothing lands on `main` unless every check passes and the change
is up to publish standard.** Do the work on a feature branch, open a PR into `main`,
let CI go green, then merge.

## Required checks (must all pass before merge)

These run in GitHub Actions on every PR to `main` (`.github/workflows/ci.yml`,
job **`checks`**). They also run locally — run them before opening a PR:

| Check | Command | What it guards |
|---|---|---|
| JS syntax | `for f in js/*.js; do node --check "$f"; done` | No broken/unparseable JavaScript |
| Publish readiness | `node scripts/checks/verify.mjs` | Every local `src`/`href` asset exists (no 404s live); no leftover `<!-- TEMP -->` placeholders |
| HTML validation | `npx --yes html-validate@8 index.html` | Well-formed markup, valid attributes, required attrs (alt, lang, …) |
| CSS lint | `npx --yes stylelint@16 "css/**/*.css"` | No invalid hex/units/properties, duplicate selectors, unspaced calc, etc. |

Config lives in `.htmlvalidate.json` and `.stylelintrc.json`. The rule sets are
tuned to catch real breakage, not stylistic preference.

## "Up to publish standard" — the bar for merging

- All required checks green.
- No `<!-- TEMP -->` placeholder content anywhere (enforced by the publish-readiness check).
- Every referenced image / résumé / asset is committed and resolves (enforced).
- Manually verified: the affected change renders correctly (serve locally on port
  **8765**, or screenshot) with **no console errors**.

## Enforcement

Branch protection on `main` requires the `checks` status to pass before a PR can
merge. To adjust or inspect:

```bash
gh api repos/aakash-tir/aakash-tir.github.io/branches/main/protection
```

## Note on tooling vs. the site

`html-validate` / `stylelint` run **only in CI** via `npx` — they are dev/CI tools,
not runtime dependencies. The site itself stays vanilla HTML/CSS/JS with no build
step and no `node_modules`, per the project conventions.

## Adding a new check

Add a step to the `checks` job in `.github/workflows/ci.yml`, prove it passes on
current `main`, and document it in the table above.
