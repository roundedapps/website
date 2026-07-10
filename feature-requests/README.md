# Feature Requests — Roundedapps Website

This folder holds change requests for the website, written by the marketing/strategy side (cowork sessions) for the engineering side (Claude Code, or Rodo working directly) to implement.

## Workflow

1. **Strategy session** (Rodo + cowork Claude) produces a feature request as a markdown file in this folder.
2. **Rodo reviews** the request, edits or approves.
3. **Claude Code** (or Rodo) reads the .md, implements the changes, opens a PR.
4. **Acceptance criteria** in the .md are the merge gate.
5. **Status** in the .md is updated as the work progresses.

## Naming

`NNN-short-slug.md`

- `NNN` — 3-digit sequence number (001, 002, …)
- `short-slug` — kebab-case description (e.g. `homepage-positioning-as-second-life`)

## Required sections

Every feature request file should contain:

- **Date / Source / Status / Owner** header block
- **Context** — why this matters, the strategic frame
- **Goal** — what the change accomplishes in user terms
- **Files likely to touch** — specific paths (Claude Code can discover more)
- **Detailed changes** — section by section, with exact copy where possible
- **Copy options** — where there are choices, list 2–3 with a recommendation
- **Acceptance criteria** — how we know it's done
- **Out of scope** — what this request is NOT doing
- **References** — links to source-of-truth docs (ONBOARDING.md, essays, etc.)

## Status values

- **Open** — written, awaiting Rodo's approval
- **Approved** — Rodo signed off, ready for implementation
- **In Progress** — Claude Code is implementing
- **In Review** — PR open, awaiting merge
- **Done** — merged
- **Abandoned** — decided not to do

## Source-of-truth docs (referenced by most requests)

- `/Accessbox/ONBOARDING.md` — product brief and campaign positioning (Section 10)
- `/Accessbox-Launch-Campaign-Plan.docx` — 6-week launch runway
- `/founder-essay-v1.md` (and later v2, v3) — first-person founder essay
