# 001 — Homepage positioning: from "introducing" to "second life"

**Date:** 2026-05-19
**Source:** Cowork strategy session with Rodo, May 19 2026
**Status:** Done
**Owner:** Rodo (review) / Claude Code (implement)
**Priority:** High — blocks launch readiness

---

## Context

The Accessbox launch positioning has shifted based on a deeper founder conversation captured in `Accessbox/ONBOARDING.md` Section 10. The campaign now leads with the fact that Accessbox is a **second life** of an app the founder shipped in 2013 — not a brand-new product.

In the password manager category, "brand new" is a *negative* trust signal. Users do not want to hand their entire credential vault to a company that launched last month. A 13-year-old app, rewritten by the same indie developer who built the original, is a fundamentally stronger trust position.

The current website does not reflect this positioning. The hero copy uses the word *"Introducing"*, which signals "new product, no history" — exactly the wrong frame.

A separate consequence: there are fewer than 30 known returning users who emailed `support@roundedapps.com` after iOS 26 broke the original Accessbox. The site currently has no acknowledgement for them. They will visit the site and find nothing that says "we know you, you're home."

This request fixes both gaps.

## Goal

Reposition the homepage so that:

1. The hero communicates **"a second life,"** not **"introducing."**
2. There is a dedicated **"Welcome back"** section for returning users of the original Accessbox, explaining why it's a new App Store listing (and not an update), and what they should know about migrating.
3. A subtle link to the founder story essay sets up the longer narrative (the essay itself lives in a separate request — see Out of Scope).

## Files likely to touch

- `src/lib/site.ts` — `siteConfig.description` currently reads *"Quality apps made with care. Introducing Accessbox — Passwords made for humans."* This drives meta/OG description and may also drive on-page copy.
- `src/app/page.tsx` — homepage component.
- `src/components/site/` — hero, About/Tribute, and any returning-user section components. Component names to be discovered by Claude Code.

## Detailed changes

### Change 1 — Hero copy

The hero should no longer use the word "Introducing." It should communicate that Accessbox is a **return**, not a **launch**.

**Recommended copy (Option A — preferred):**

> **Headline:** Accessbox
> **Subhead:** A second life for the password manager I shipped in 2013.
> **Supporting line:** Strong passwords. Memorable ones. iPhone and Mac.
> **CTAs:** *Download on the App Store* / *Read the story →* (the second CTA will be wired to the `/story` page once it exists — for now, link to `/accessbox` or omit if not ready)

**Alternative copy (Option B — softer):**

> **Headline:** Accessbox is back.
> **Subhead:** The password manager I built for my wife in 2013, rewritten for modern iPhone and Mac.
> **Supporting line:** Strong passwords. Memorable ones. Built by the same indie developer.

**Alternative copy (Option C — minimal change):**

> Keep the existing headline, replace only the word "Introducing" with "A second life for" — i.e. *"A second life for Accessbox — Passwords made for humans."* Smallest possible diff if a fuller rework is deferred.

**Implementer note:** I recommend Option A. If the visual hierarchy needs adjustment (the subhead is longer than the current one), use a slightly smaller font for the subhead — but do not break the existing typography system.

### Change 2 — Update `siteConfig.description` in `src/lib/site.ts`

The current description string (*"Quality apps made with care. Introducing Accessbox — Passwords made for humans."*) feeds OG meta and search snippets. It needs to match the new positioning.

**Replace with:**

> *Accessbox is a second life for the password manager Rodolfo Vasquez shipped in 2013. Rewritten ground-up for modern iPhone and Mac. Strong passwords, memorable ones.*

This is one sentence longer than the original, but reads cleanly as a meta description (under 200 characters is the standard target — check length and trim if needed).

### Change 3 — Add a "Welcome back" section to the homepage

A new section, sized similarly to other homepage sections (not full-bleed, not a banner — a normal content block). Should appear **below the hero** and **above** the existing feature highlights / Accessbox intro section.

**Section heading:** *Used the original Accessbox? Welcome back.*

**Section body (draft copy — refine for the existing typographic voice):**

> If you wrote to me last year when the old Accessbox stopped working, this is what I built next. It's a new app — new App Store listing, new download — not an update to the original. I made that choice on purpose: many of you are still running the 2013 version on older phones where it works, and I wasn't willing to push an "update" that broke things for you again.
>
> Your old data lived in iCloud Keychain under a CoreData model that iOS 26 no longer supports. We tried to recover it; we couldn't. I'm sorry about that. The new Accessbox starts fresh.
>
> The memorable password generator is still here. The card-based vault is still here. The reason I built this in the first place — to help my wife stop hating password resets — is still here.
>
> Thank you for not forgetting about it. **[Download Accessbox →]**

**Implementer note:** This block could live as its own component (`ReturningUserSection.tsx`) or be slotted into the `AboutTribute` area if that section is being repurposed. Use Claude Code judgment on the right home. Either way, the *content* above must appear on the homepage, not buried on a sub-page.

### Change 4 — "Read the story" link

A small, secondary CTA somewhere prominent (could be in the hero, could be at the end of the Welcome Back section). Links to `/story` — which doesn't exist yet. Until that page is built, the link can either:

- Point to a placeholder anchor on the homepage
- Be omitted from this PR and added when the `/story` page is built (see Out of Scope)

**Recommended:** omit the link in this PR. We'll add it in the `/story` page request.

## Copy options summary

| Element | Recommended | Alternatives |
|---|---|---|
| Hero | Option A ("A second life for...") | B (softer) or C (minimal) |
| Meta description | New "second life" version | Keep existing |
| Returning-user section | Yes, on homepage | Defer to sub-page (not recommended) |
| Story link | Defer until /story exists | Add placeholder |

## Acceptance criteria

- [ ] Word "Introducing" no longer appears anywhere on the homepage.
- [ ] Hero communicates "second life" or "back," not "launch" or "introducing."
- [ ] A new "Welcome back" section exists on the homepage, above the existing feature highlights.
- [ ] `siteConfig.description` in `src/lib/site.ts` is updated to match the new positioning.
- [ ] OG/meta tags reflect the new description (verify with `npm run build` and check `out/index.html`).
- [ ] The site still builds without errors (`npm run build`).
- [ ] Lighthouse / accessibility scores are not regressed.
- [ ] Visual hierarchy is preserved — the new section blends with the existing typographic system, not as a slapped-on block.

## Out of scope

- The dedicated `/story` page hosting the founder essay. This is a separate request (will be filed once `founder-essay-v1.md` is finalized as v2 or later).
- Updates to the `/accessbox` features page (Localization fix, Trust signals, etc.). Those are separate requests.
- Translation of new copy to Spanish or Portuguese (Brazil) — to be filed as request 002 (or whatever number) once English copy is locked.
- Hero image / screenshot updates — leave existing imagery for now.

## References

- `Accessbox/ONBOARDING.md` — Section 1 (taglines), Section 2 (founder story), Section 10 (campaign positioning + calls made)
- `founder-essay-v1.md` — the source narrative this homepage points to
- `Accessbox-Launch-Campaign-Plan.docx` — Week 1–2 deliverables include website updates

---

*Once implemented, update Status to "In Review" and link the PR here. Once merged, update to "Done" and add the PR URL.*
