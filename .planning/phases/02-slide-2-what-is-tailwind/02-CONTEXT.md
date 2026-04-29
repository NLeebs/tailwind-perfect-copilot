# Phase 2: Slide 2 — What Is Tailwind - Context

**Gathered:** 2026-04-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the "What Is Tailwind?" slide page — replacing the stub at `src/app/what-is-tailwind/page.tsx` with two live demos that make the utility-first philosophy immediately legible to an audience with no prior Tailwind experience:

1. **Button comparison**: A semantic `.btn` button vs. a Tailwind-utilities button, visually identical, with CodeCallout annotations and a click-to-reveal of the `.btn` CSS definition.
2. **"Classes as documentation" card**: A styled div whose class list is displayed as an inline CodeCallout, showing that reading the classes tells you everything about the element.

Nothing else is added in this phase — no hover states beyond the reveal interaction, no animations, no new shared components.

</domain>

<decisions>
## Implementation Decisions

### Page Layout
- **D-01:** Two-column side-by-side layout — button comparison section on the left, documentation card section on the right. Both sections visible simultaneously without scrolling.
- **D-02:** Each column has a small section label (h2 or overline text) above it — "Semantic CSS" (left) and "Utility-First Tailwind" (right) — to frame each demo for the audience.
- **D-03:** One-line caption per section below the label. Brief teaching prompt (e.g. "The class name hides the implementation." / "Every style is visible inline."). No other `<p>` text.

### Button Comparison Demo
- **D-04:** The semantic `.btn` button's CSS definition is hidden by default. Clicking the semantic button itself toggles its CSS definition visible inline below it — a teaching beat that reveals what the class is hiding.
- **D-05:** The revealed `.btn` CSS appears as a plain CodeCallout chip — same monospace chip style as all other callouts on the slide.
- **D-06:** The Tailwind button's class list is shown as a CodeCallout below it (always visible, no toggle needed). The contrast between "click to reveal" vs. "always visible" reinforces the transparency story.
- **D-07:** Both buttons are visually identical in their default state — same background color, padding, rounded corners, font weight. Identical output is the whole point.
- **D-08:** No hover states on either button. Hover interaction is covered in Phase 6 (Conditional Styling) — this slide focuses on class-list transparency, not interactivity.
- **D-09:** The `.btn` definition in the `<style>` block on the page (or inside the client island) must match the visual output of the Tailwind button — verified by the "visually identical" success criterion.
- **D-10:** The toggle state (`showCss: boolean`) lives in a leaf-node `"use client"` island component (`ButtonComparison` or similar). The `page.tsx` stays RSC.

### Documentation Card Demo
- **D-11:** Simple styled div — a card with a heading and body text. Approximately 8–10 Tailwind classes covering: background, padding, border, shadow, rounded corners, text color, font size, font weight. Enough to tell the "classes are documentation" story without overwhelming the callout.
- **D-12:** CodeCallout appears below the card (standard stacking convention per Phase 1 patterns).
- **D-13:** The card itself is a pure RSC — no interactivity needed.
- **D-14:** Single-source const convention: class string extracted as a named `const`, passed to both the card element and `<CodeCallout classes={CARD_CLASSES} />`.

### Claude's Discretion
- Exact Tailwind classes for the button (color, padding, rounded, font) — must match the `.btn` CSS visually.
- Exact card heading/body text content.
- Caption text wording for each section label.
- Whether the two-column layout uses `flex` or `grid`.
- Exact `3xl:` escalation values for text and spacing.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase Requirements
- `.planning/REQUIREMENTS.md` §Slide 2 — Requirements S2-01 and S2-02 (the two demos for this phase)
- `.planning/ROADMAP.md` §Phase 2 — Success criteria, dependencies, and UI hint

### Architecture & Conventions
- `CLAUDE.md` §Interactive demo patterns — single-source callout pattern, RSC default, leaf-node client island rule, no dynamic class interpolation
- `CLAUDE.md` §Tailwind v4 specifics — config in `globals.css`, `@custom-variant dark` is the ONLY dark mode mechanism
- `CLAUDE.md` §Adding a new slide — steps to add a new slide page

### Existing Code (read before implementing)
- `src/app/what-is-tailwind/page.tsx` — Current stub; this is the file being replaced
- `src/components/SlideLayout.tsx` — Shared wrapper that every slide uses; new slide content wraps in `<SlideLayout number="02" title="What is Tailwind?">`
- `src/components/CodeCallout.tsx` — The RSC component built in Phase 1; use it for all class callouts
- `src/lib/utils.ts` — `cn()` utility; available if needed for conditional classes in the client island
- `src/app/globals.css` — `@custom-variant dark`, `@theme` breakpoints; dark mode works via `.dark` class on `<html>`
- `src/app/history-of-css/page.tsx` — Reference pattern for an RSC slide page importing a client island
- `src/components/CssTimeline.tsx` — Reference pattern for a `"use client"` island with internal state

### Prior Phase Context
- `.planning/phases/01-shared-infrastructure/01-CONTEXT.md` — CodeCallout API, cn() utility, dark mode decisions from Phase 1

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/CodeCallout.tsx` — `<CodeCallout classes={CLASSES_CONST} />`. Single `classes: string` prop. No other required props. Renders a monospace chip below demo elements.
- `src/lib/utils.ts` — `cn(...inputs: ClassValue[]): string`. Available for the client island if conditional class logic is needed.
- `src/components/SlideLayout.tsx` — Wraps all slide content. Provides nav bar, back link, slide number badge, and `<h1>` title. Page just passes `number="02"` and `title="What is Tailwind?"` and its content as children.
- `src/app/history-of-css/page.tsx` + `src/components/CssTimeline.tsx` — The established pattern: RSC page imports a `"use client"` island, island handles all interaction.

### Established Patterns
- **Single-source callout**: `const BTN_CLASSES = "bg-sky-500 ..."; return <button className={BTN_CLASSES}> ... </button><CodeCallout classes={BTN_CLASSES} />` — prevents callout drift.
- **Leaf-node client island**: Add `"use client"` to the island component (`ButtonComparison.tsx`), not to `page.tsx`. The page stays RSC and imports the island.
- **No dynamic class interpolation**: All class strings are complete static literals. Use a conditional to pick between two full strings, never template literals.
- **Dark mode**: `dark:` prefix works via `@custom-variant dark (&:where(.dark, .dark *))`. ThemeToggle applies `.dark` to `<html>`. Both demos must have correct `dark:` variants.
- **TV scale**: `3xl:` (1920px) escalations required on all text sizes and spacing. `4xl:` (2560px) available for extreme scale.
- **Color palette**: `slate-50`/`slate-950` backgrounds, `cyan-500`/`cyan-600`/`cyan-400` accents, `slate-200`/`slate-800` borders, `slate-900`/`white` primary text.

### Integration Points
- `src/app/what-is-tailwind/page.tsx` — Replace the stub. Import `SlideLayout`, `CodeCallout`, and the new `ButtonComparison` client island.
- New client island: `src/components/ButtonComparison.tsx` (or similar) — handles the `showCss` toggle state for the semantic button CSS reveal.
- If the documentation card is purely RSC, it can live inline in `page.tsx` or as a separate RSC component — no client boundary needed.

</code_context>

<specifics>
## Specific Ideas

- The button comparison's teaching moment: clicking the `.btn` button reveals its CSS as a CodeCallout — the audience experiences the "black box" before the reveal, which is the core of the utility-first argument.
- The documentation card class string should be legible at TV scale when rendered in the CodeCallout chip. ~8–10 classes is the upper bound before the chip wraps heavily.
- The two-column layout should feel balanced — both columns roughly equal height. If the button comparison section is taller due to the reveal toggle, padding may need tuning.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 2-Slide 2 — What Is Tailwind*
*Context gathered: 2026-04-29*
