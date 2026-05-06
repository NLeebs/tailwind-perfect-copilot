# Phase 8: Slide 2 Rework - Context

**Gathered:** 2026-05-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Rebuild the "What Is Tailwind" slide page (`src/app/what-is-tailwind/page.tsx`) by adding a full-width philosophy intro banner at the top, a 3-card problem row above the demo, and rearranging the demo grid so the semantic and utility stories each own a column — with the naming-problem card living in the semantic (left) column.

No new routes, no new shared infrastructure components. Changes are confined to `src/app/what-is-tailwind/page.tsx` and two new leaf-node components (`SemanticButton.tsx`, `UtilityButton.tsx`) that replace the existing `ButtonComparison.tsx`.

</domain>

<decisions>
## Implementation Decisions

### Page Structure & Scroll (S2-01–S2-04)
- **D-01:** The slide scrolls freely — no viewport-fit constraint. All four content sections (intro, problem cards, demo grid, naming card) use natural spacing. Consistent with Phase 6's section-spacer pattern (`mt-16 3xl:mt-24` between sections).
- **D-02:** Philosophy intro is a full-width banner section — a prominent heading with 1–2 sentences below it defining "utility-first CSS framework" and the core concept (style in markup, composable primitives). Rendered before the problem cards.
- **D-03:** Section separators are spacing-only (`mt-12 3xl:mt-20` or `mt-16 3xl:mt-24`). No border dividers between sections.

### Problem Cards (S2-02)
- **D-04:** 3 problem cards — all three problems included: context-switching (HTML↔CSS), naming things is hard, CSS bloat.
- **D-05:** Problem cards use a `grid grid-cols-3` layout (one card per column). Follows the same grid convention as the demo section below it.
- **D-06:** Each card: heading + 1–2 body lines of text. No icons or emoji. Minimal, consistent with the existing text-card style on the slide.

### Demo Column Split (S2-03)
- **D-07:** `ButtonComparison.tsx` is replaced by two separate components:
  - `src/components/SemanticButton.tsx` — left column, semantic CSS story
  - `src/components/UtilityButton.tsx` — right column, utility-first story
- **D-08:** No click-to-reveal interaction. The `.btn` CSS definition is always visible below the semantic button (no `useState` toggle). Teaching beat is preserved by always showing it, not by hiding it behind a click.
- **D-09:** `SemanticButton.tsx` keeps `"use client"` directive even though no `useState` is needed — explicit user choice to keep the island boundary.

### Demo Column Narrative
- **D-10:** Left column = full semantic CSS story: semantic button → `.btn` CSS CodeCallout → naming card (S2-04).
- **D-11:** Right column = full Tailwind story: utility button → Tailwind class CodeCallout → existing Tailwind card → Tailwind card CodeCallout.
- **D-12:** Column overlines follow the established Phase 2 pattern (`text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400`):
  - Left: "Semantic CSS"
  - Right: "Utility-First Tailwind"

### Naming Card (S2-04)
- **D-13:** Naming card sits in the **left column**, below the semantic button + `.btn` CodeCallout. Left column = semantic CSS narrative end-to-end.
- **D-14:** Teaching frame: "the names you still have to invent." The card overline or heading frames it as the class names a dev would need to coin for this same card component (`With Semantic CSS` or similar framing). CodeCallout shows `.card-header {}`, `.card-title {}`, `.card-highlighted {}`.
- **D-15:** Naming card has a visible card shell (border, background, padding) matching the Tailwind card on the right — same `CARD_CLASSES` const or equivalent. Both columns have a real-looking card at the bottom, reinforcing the "same component, two approaches" story.
- **D-16:** Single-source const for the naming card's class string so the CodeCallout never drifts from the rendered card.

### Claude's Discretion
- Exact heading text for the philosophy intro section
- Body text for each of the 3 problem cards (must be TV-legible — 1–2 tight sentences per card)
- Column caption text (1 short line below each overline, matching the current Phase 2 captions)
- Naming card heading/body text and overline label wording
- Exact `mt-*` and `3xl:mt-*` spacer values between sections
- Whether `UtilityButton.tsx` is a pure RSC or also has `"use client"` (no state needed — RSC preferred per conventions)
- `3xl:` escalation values for problem card text, intro heading, and card padding

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase Requirements
- `.planning/REQUIREMENTS.md` §Slide 2 Rework — Requirements S2-01, S2-02, S2-03, S2-04
- `.planning/ROADMAP.md` §Phase 8 — Goal, 4 success criteria, dependencies

### Architecture & Conventions
- `CLAUDE.md` §Interactive demo patterns — single-source callout, RSC default, leaf-node client island rule, no dynamic class interpolation
- `CLAUDE.md` §Tailwind v4 specifics — `@custom-variant dark`, `@theme` breakpoints (`3xl` = 1920px, `4xl` = 2560px); all demo components must include `3xl:` escalations
- `CLAUDE.md` §Adding a new slide — steps for adding/modifying slide pages

### Existing Code to Read Before Implementing
- `src/app/what-is-tailwind/page.tsx` — File being reworked; current two-column layout and CARD_CLASSES const
- `src/components/ButtonComparison.tsx` — Component being replaced; extract TAILWIND_BTN_CLASSES and BTN_CSS_DEFINITION constants for reuse
- `src/components/SlideLayout.tsx` — Shared wrapper; page keeps `<SlideLayout number="02" title="What is Tailwind?">`
- `src/components/CodeCallout.tsx` — RSC component used for all class callouts; `<CodeCallout classes={CLASSES_CONST} />`
- `src/app/globals.css` — `@custom-variant dark` (ONLY dark mode mechanism), `@theme` breakpoints

### Prior Phase Context (carried-forward decisions)
- `.planning/phases/02-slide-2-what-is-tailwind/02-CONTEXT.md` — Original Slide 2 decisions; two-column grid, overline style, single-source const
- `.planning/phases/06-slide-6-conditional-styling/06-CONTEXT.md` — Section-spacer pattern (`mt-16 3xl:mt-24`)
- `.planning/phases/07-tv-readability-quality-pass/07-CONTEXT.md` — 3xl: escalation ratios; TV audit decisions

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `CARD_CLASSES` const in `src/app/what-is-tailwind/page.tsx` — The existing card class string; reuse for the naming card shell so both columns share the same visual card style.
- `TAILWIND_BTN_CLASSES` const in `src/components/ButtonComparison.tsx` — Move to `UtilityButton.tsx`.
- `BTN_CSS_DEFINITION` const in `src/components/ButtonComparison.tsx` — Move to `SemanticButton.tsx`.
- `src/components/CodeCallout.tsx` — Single `classes: string` prop. Used as-is.
- `src/lib/utils.ts` — `cn()` available if needed (unlikely for this phase's RSC-heavy content).

### Established Patterns
- **Two-column grid:** `grid grid-cols-2 gap-6 3xl:gap-12` — established Phase 2, carry forward for the demo section.
- **Three-column grid:** `grid grid-cols-3 gap-6 3xl:gap-12` — use for problem cards (same gap convention).
- **Overline labels:** `text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base` — established Phase 2; keep for column overlines.
- **Section spacers:** `mt-16 3xl:mt-24` between sections (Phase 6 pattern).
- **Single-source const:** `const FOO = "..."; <el className={FOO}><CodeCallout classes={FOO} />` — prevents callout drift.
- **Leaf-node client islands:** `"use client"` on the island component only; `page.tsx` stays RSC.
- **No dynamic class interpolation:** All class strings are complete static literals.
- **Dark mode:** `dark:` prefix via `@custom-variant dark (&:where(.dark, .dark *))` — every card, text, and border needs `dark:` variants.

### Integration Points
- `src/app/what-is-tailwind/page.tsx` — Full rewrite. Import `SlideLayout`, `CodeCallout`, `SemanticButton`, `UtilityButton`.
- `src/components/SemanticButton.tsx` — New file. `"use client"` (per D-09). Renders semantic button + always-visible `.btn` CSS CodeCallout.
- `src/components/UtilityButton.tsx` — New file. RSC (no state). Renders utility button + CodeCallout.
- `src/components/ButtonComparison.tsx` — Delete or leave; no longer imported anywhere after the rework.

</code_context>

<specifics>
## Specific Ideas

- The naming card should mirror the Tailwind card visually (same card shell style) so the audience can see the same component rendered with both approaches side-by-side at the bottom of each column.
- Philosophy intro heading could be something like "What is Tailwind CSS?" with the "utility-first CSS framework" phrase prominent — but exact wording is Claude's discretion.
- Problem card topics are fixed: context-switching (jumping between HTML and CSS files), naming things is hard (inventing class names for every element), CSS bloat (global styles that accumulate). Body text = Claude's discretion.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 8-Slide 2 Rework*
*Context gathered: 2026-05-06*
