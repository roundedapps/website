# 002 — Founder story page (`/story`)

**Date:** 2026-05-24
**Source:** Cowork session with Rodo, May 24 2026
**Status:** Done
**Owner:** Rodo (review) / Claude Code (implement)
**Priority:** Medium — launch campaign asset; completes the founder-story link deferred from FR 001.

---

## Context

Feature request 001 repositioned the homepage around the idea that Accessbox is a *second life* of an app first shipped in 2013, not a brand-new product. That request deliberately **deferred one piece**: the "Read the story" link to a dedicated `/story` page that did not yet exist (see 001, Change 4 — *"omit the link in this PR. We'll add it in the `/story` page request"*). This is that request.

The founder essay is now final. It lives at the repository root as **`founder-essay-v4.md`** — a ~1,200-word first-person essay by Rodolfo Vasquez telling the origin of Accessbox: an app built for his wife in 2013, frozen for over a decade, broken outright by iOS 26, then rebuilt from the ground up. It is the long-form narrative the homepage's "second life" positioning gestures at but has no room to tell.

Why this matters: in the password-manager category, trust is the whole game, and trust comes from history and from a real, accountable person behind the product. The homepage *claims* "second life" in a few lines. The `/story` page is where that claim is actually *earned* — at length, in the founder's own voice. It is also the page returning users will want to read, and the natural destination for the essay when it is shared on social channels.

## Goal

Ship a dedicated `/story` page that:

1. Hosts the **full founder essay**, verbatim, in a comfortable long-form reading layout consistent with the rest of the site.
2. Activates the **"Read the story" link** that FR 001 deferred — wired from the homepage hero, plus a footer entry.
3. Ends on a real **call to action** (try the beta), not a dead end.
4. Carries its own **page metadata** (title, description, social/OG tags) so it reads well when shared.

## Source content — read this carefully

The essay text is the file **`founder-essay-v4.md`**, located at the **repository root**, one level above the `website/` project (i.e. `../founder-essay-v4.md` relative to this site repo).

**Use that exact file. Do NOT use any of these:**

- `founder-essay-v4 copy.md` — a working copy that still contains an internal "Notes for Rodo" editing block at the bottom. That block must never reach the website.
- `founder-essay-v1.md`, `founder-essay-v2.md`, `founder-essay-v3.md` — earlier drafts.

`founder-essay-v4.md` is the clean, final text: an H1 title, a one-line italic byline, body paragraphs, several `---` rules, and a closing italic paragraph. Reproduce it faithfully — no rewriting, no trimming, no reordering. (The one permitted content adjustment is the closing line — see Change 4.)

## Files likely to touch

- `src/app/story/page.mdx` *(new)* — the page itself. (`.tsx` is acceptable if it matches the privacy/terms pattern better — see Change 1.)
- `src/components/site/Hero.tsx` — wire the deferred "Read the story →" CTA.
- `src/components/site/Footer.tsx` — add a "Story" link.
- `src/components/site/NavBar.tsx` — optional nav entry (see Copy options).
- `src/lib/site.ts` — if routes/nav links are configured centrally, register `/story` there.
- `src/mdx-components.tsx` and/or the root `mdx-components.tsx` — only if long-form prose needs a styling tweak.

Claude Code should discover exact component internals; the paths above are the starting set.

## Detailed changes

### Change 1 — Create the `/story` page

Add a new route at `/story`. The existing content pages `src/app/privacy/page.mdx` and `src/app/terms/page.mdx` are `.mdx`; **follow that pattern** — `src/app/story/page.mdx` — unless a `.tsx` page reusing the same content layout is demonstrably cleaner. Whatever wrapper/layout privacy and terms use for header, footer, and page chrome, reuse it here so `/story` is visually part of the site.

Place the full text of `founder-essay-v4.md` as the page content:

- The essay's `#` H1 becomes the page heading.
- The italic byline line sits directly beneath the title, visually subdued.
- The `---` rules render as subtle section dividers — a hairline rule or generous whitespace, matching the site's tone. Do not use a heavy black line.
- Preserve all italic emphasis.

### Change 2 — Long-form reading layout

This page is ~1,200 words of continuous prose. It needs to be comfortable to read:

- Constrain the text column to a readable measure (~65–72 characters per line); do not run prose the full page width.
- Generous line-height and paragraph spacing.
- Use the site's existing type system and colors — this should feel like the same website, just a reading page.
- Fully responsive; verify on a narrow mobile viewport.

### Change 3 — Activate the "Read the story" link (deferred from FR 001)

FR 001, Change 4, deferred the hero's "Read the story →" secondary CTA to this request. Add it now:

- A secondary CTA in `Hero.tsx` linking to `/story`, styled as the secondary action beside the primary "Download" CTA.
- A "Story" link in the `Footer`.
- Nav entry: optional — see Copy options.

### Change 4 — Closing call to action on `/story`

The essay's final italic paragraph currently ends: *"…The beta is open now at roundedapps.com."* On the `/story` page — which **is** roundedapps.com — that URL self-reference is circular and should be adapted.

After the essay text, add a simple CTA block: a short line plus a button to the TestFlight beta. See Copy options for exact wording. The closing italic line should be adjusted so it no longer points the reader to the site they are already on.

### Change 5 — Page metadata

Give `/story` its own metadata (Next.js `export const metadata`, which works from an `.mdx` page):

- **Title tag** — see Copy options.
- **Meta description** — a ~150-character hook drawn from the essay's opening.
- **OG / Twitter tags** — title, description, and an image (reuse the site's default OG image; a dedicated image is out of scope here).

## Copy options

### Page `<title>` (browser tab / search result)

| Option | Value |
|---|---|
| A (recommended) | `The Accessbox Story` |
| B | `A password manager I built for my wife — Accessbox` |
| C | Reuse the essay's own title verbatim |

### Closing CTA wording (Change 4)

**Recommended:**

> *That's the story. Accessbox is in open beta now — built around passwords a human can actually remember.*
>
> **[ Join the beta ]**

The button links to the TestFlight URL already in `site.ts` (`appConfig.accessbox.testFlightUrl`).

**Alternative (minimal):** keep the essay's closing italic paragraph but delete the words "at roundedapps.com," then place the existing primary download button beneath it.

### Nav entry

| Option | Behavior |
|---|---|
| A (recommended) | No top-nav entry. `/story` is discovered from the homepage hero and the footer. A founder essay is a "pull," not a utility page. |
| B | Add "Story" to the top nav alongside the existing items. |

## Acceptance criteria

- [ ] `/story` route exists and renders the full founder essay.
- [ ] The page text matches `founder-essay-v4.md` **exactly** — no editing / "Notes for Rodo" block, no draft version, no rewrites (closing line per Change 4 excepted).
- [ ] The essay reads in a comfortable long-form layout (constrained measure, site typography), responsive on mobile.
- [ ] The homepage hero's "Read the story" CTA (deferred in FR 001) now links to `/story`.
- [ ] The footer contains a "Story" link.
- [ ] `/story` has its own `<title>`, meta description, and OG/Twitter tags.
- [ ] The page ends with a working CTA to the beta; no copy on the page tells the reader to visit "roundedapps.com" (the page they are already on).
- [ ] Site builds without errors (`npm run build`) and `/story` is present in `out/`.
- [ ] Lighthouse / accessibility scores are not regressed.

## Out of scope

- The **AI-builder essay** (`ai-builder-essay-v1.md`) and any page for it — a separate future request.
- **Translations** of the essay into Spanish or Portuguese (Brazil) — separate request once the English page is locked.
- Homepage layout / positioning changes — completed in FR 001.
- A blog or article index. `/story` is a single standalone page, not the first post of a blog.
- A dedicated OG image for the page — reuse the site default for now.

## References

- `founder-essay-v4.md` *(repository root)* — source-of-truth essay text. **Not** `founder-essay-v4 copy.md`.
- `feature-requests/001-homepage-positioning-as-second-life.md` — Change 4 deferred the story link to this request.
- `Accessbox/ONBOARDING.md` — Section 2 (founder story), Section 10 (campaign positioning).
- `Accessbox-Launch-Campaign-Plan.docx` — website updates in the launch runway.

---

*Once implemented, update Status to "In Review" and link the PR here. Once merged, update to "Done" and add the PR URL.*
