# Rule: keep the docs in sync with every code change

**Any change to the code or project setup must update the docs in the same change (same branch / same PR).** Docs are part of "up to publish standard" — a PR that changes behaviour or structure but leaves the docs stale is not ready to merge. Never split a code change and its doc update across two PRs.

## What counts as a change that needs a doc update

If a change touches any of these, update the matching doc **before** opening the PR:

| You changed… | Update… |
|---|---|
| File/folder structure, where something lives, add/remove a source file | `README.md` (Structure), `.claude/CLAUDE.md` (Conventions), `.claude/design-spec.md` (the "where it lives" notes) |
| A section's layout, visual language, motion, or interaction behaviour | `.claude/design-spec.md` |
| Project content: projects, timeline, about, contact, skills | `.claude/project-context.md` (content inventory) and `js/data/projects.js` if it's a project |
| Goals, audience, tech decisions, or scope | `.claude/project-context.md` |
| Finished a build phase, deployed, or shipped something notable | `.claude/progress.md` (tick the item + add a dated Log line) |
| A CI check, the merge policy, or branch protection | `.github/workflows/ci.yml` **and** `.claude/rules/merge-to-main.md` (keep the documented command identical to the workflow) |
| Owner facts (name, school, status, contact) | `.claude/CLAUDE.md` (Owner facts) and `.claude/project-context.md` (Owner) |

If a change genuinely touches none of the above (e.g. a pure bug fix with no structural or behavioural change worth recording), no doc edit is required — but say so explicitly in the PR description rather than leaving it silent.

## Conventions for the updates

- **Dates are absolute** in `progress.md` (e.g. `2026-07-07`), newest last in the Log.
- Keep docs describing **current reality**, not history — move superseded details into the `progress.md` Log rather than leaving contradictions in the body.
- When two docs state the same fact (e.g. a command, the owner's status), change **both** so they never disagree.
- Don't document a file's contents that the code already makes obvious; document the *why* and the *where*.

## Checklist before opening a PR

- [ ] Every doc row above that applies to this change is updated.
- [ ] `progress.md` has a dated Log line if anything shippable changed.
- [ ] No doc contradicts another or the code.
