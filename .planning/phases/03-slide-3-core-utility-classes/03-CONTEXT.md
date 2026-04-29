# Phase 3: Slide 3 — Core Utility Classes - Context

**Gathered:** 2026-04-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the "Core Utility Classes" slide page — replacing the stub at `src/app/utility-classes/page.tsx` with two live demos:

1. **Progressive card builder**: A card that evolves through 6 steps (layout → spacing → typography → color → borders → flexbox) with a step indicator + Prev/Next navigation. The card visually improves at each step; only the newly added classes appear in the CodeCallout.

2. **Flex vs. grid comparison**: Two containers side-by-side with identical numbered-box children, with CodeCallout annotations showing `flex flex-row gap-4` vs. `grid grid-cols-3 gap-4`.

Nothing else is added in this phase — no additional interactive states, no animations, no new shared components.

</domain>

<decisions>
## Implementation Decisions

### Two-Demo Arrangement
- **D-01:** Stacked vertically — card builder section on top (full width, primary demo), flex vs. grid comparison section below (secondary demo). Both sections visible by scrolling; card builder gets the prominent position.
- **D-02:** Within the card builder section: card on the left, CodeCallout on the right (two-column split using `grid grid-cols-2`). Consistent with the Phase 2 two-column pattern. The step navigator spans full width above the two-column area.

### Card Builder Navigation
- **D-03:** Step indicator + Prev/Next arrows. A row of 6 numbered nodes (1–6) above the card/callout area; clicking any node jumps to that step. `◄` and `►` buttons flank the step row for linear forward/back navigation.
- **D-04:** Each step node shows its number and a category label below: `1 Layout`, `2 Spacing`, `3 Typo`, `4 Color`, `5 Borders`, `6 Flex`. Active node is visually highlighted; inactive nodes are muted.
- **D-05:** Demo opens at step 1 (Layout) — the bare card with only positioning/sizing classes. Audience builds up from nothing.

### Callout Strategy
- **D-06:** Callout shows only the newly added classes at the current step — exactly as S3-01 specifies. Clean and focused. The card itself shows the cumulative visual result; no second "all so far" chip needed.
- **D-07:** Flex/grid children are simple numbered colored boxes (1, 2, 3 with a background color). Keeps the audience focused on layout behavior, not box content.

### Carrying Forward from Phase 2
- **D-08:** Single-source const pattern — each step's "new classes" string is extracted as a named const and passed to both the element and `<CodeCallout classes={STEP_N_CLASSES} />`.
- **D-09:** Lookup-table map for active step state — `const STEPS: StepConfig[] = [{ label: "Layout", classes: "...", newClasses: "..." }, ...]`. No dynamic class interpolation anywhere.
- **D-10:** Leaf-node "use client" island for the card builder (needs `useState` for active step). The flex/grid comparison is pure RSC — no interaction needed.

### Claude's Discretion
- Exact Tailwind class strings at each of the 6 card steps (layout, spacing, typography, color, borders, flexbox)
- Card content text (heading and body copy)
- Color choices for the numbered boxes in the flex/grid demo
- Whether the two sections are separated by a `<hr>` or a gap/padding divider
- Exact `3xl:` escalation values for text, spacing, and node sizing
- Whether Prev/Next arrows disable at step boundaries or wrap around

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase Requirements
- `.planning/REQUIREMENTS.md` §Slide 3 — Requirements S3-01 and S3-02 (the two demos for this phase)
- `.planning/ROADMAP.md` §Phase 3 — Success criteria, dependencies, and UI hint

### Architecture & Conventions
- `CLAUDE.md` §Interactive demo patterns — single-source callout pattern, RSC default, leaf-node client island rule, no dynamic class interpolation
- `CLAUDE.md` §Tailwind v4 specifics — config in `globals.css`, `@custom-variant dark` is the ONLY dark mode mechanism
- `CLAUDE.md` §Adding a new slide — steps for adding a slide page and registering it in the home nav

### Existing Code (read before implementing)
- `src/app/utility-classes/page.tsx` — Current stub; the file being replaced
- `src/components/SlideLayout.tsx` — Shared wrapper; new slide content wraps in `<SlideLayout number="03" title="Tailwind Utility Classes">`
- `src/components/CodeCallout.tsx` — RSC component built in Phase 1; use for all class callouts
- `src/lib/utils.ts` — `cn()` utility; available for conditional classes in the client island
- `src/app/globals.css` — `@custom-variant dark`, `@theme` breakpoints; dark mode via `.dark` class on `<html>`
- `src/app/history-of-css/page.tsx` — Reference pattern: RSC slide page importing a client island
- `src/components/CssTimeline.tsx` — Reference pattern: `"use client"` island with internal state and step-like progression
- `src/app/what-is-tailwind/page.tsx` — Reference pattern from Phase 2: two-column RSC slide page
- `src/app/page.tsx` — Home page `slides` array; new slide must be registered here

### Prior Phase Context
- `.planning/phases/02-slide-2-what-is-tailwind/02-CONTEXT.md` — Two-column layout pattern, single-source callout convention, dark mode patterns from Phase 2

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/CodeCallout.tsx` — `<CodeCallout classes={CLASSES_CONST} />`. Single `classes: string` prop. Renders a monospace chip. Use for each step's new-classes callout AND for the flex/grid callouts.
- `src/lib/utils.ts` — `cn(...inputs)` — available in the card builder island for any conditional class logic.
- `src/components/SlideLayout.tsx` — Wraps all slide content. Provides nav bar, back link, slide number badge, and `<h1>` title.
- `src/components/CssTimeline.tsx` — Reference for `"use client"` island with accordion/step state. The card builder island will be structurally similar (active step in `useState`, step data in a static array).

### Established Patterns
- **Step data in static array**: Define step config as `const STEPS = [{ label, newClasses, allClasses }, ...]` — all class strings are complete static literals, enabling a clean lookup.
- **Lookup-table maps**: The card at each step should apply `STEPS[activeStep].allClasses` to the card element (so it renders cumulatively) and pass `STEPS[activeStep].newClasses` to `<CodeCallout>`.
- **Single-source callout**: Extract each step's `newClasses` as a named const (or array entry) used by both the element and CodeCallout — prevents drift.
- **Dark mode**: `dark:` prefix via `@custom-variant dark`. Both the card and box children need `dark:` variants for background, text, and border classes.
- **TV scale**: `3xl:` (1920px) escalations on all text sizes, spacing, and the step indicator nodes.
- **Color palette**: `slate-50`/`slate-950` backgrounds, `cyan-500` accents, `slate-200`/`slate-800` borders, `slate-900`/`white` text.

### Integration Points
- `src/app/utility-classes/page.tsx` — Replace the stub. Import `SlideLayout`, `CodeCallout`, the new `CardBuilder` client island, and a new `FlexGridComparison` RSC component (or inline RSC).
- New client island: `src/components/CardBuilder.tsx` — handles `activeStep` state, renders the card and step navigator.
- New RSC: `src/components/FlexGridComparison.tsx` (or inline in page) — renders two static containers with CodeCallout annotations.
- `src/app/page.tsx` — The `utility-classes` route is already in the slides array (stub page exists); verify the entry and update the title/tagline if needed.

</code_context>

<specifics>
## Specific Ideas

- The step indicator visual: active node highlighted (e.g., `bg-cyan-500 text-white`), inactive nodes muted (e.g., `bg-slate-200 dark:bg-slate-700 text-slate-500`). Label below each node in `text-xs`.
- The Prev/Next arrow buttons should disable (or visually dim) at step 1 and step 6 boundaries respectively — prevents confusion at the edges.
- The flex/grid comparison section follows the Phase 2 overline convention: small `text-xs uppercase tracking-widest` label above each container (`FLEX` and `GRID`), then the container below.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 3-Slide 3 — Core Utility Classes*
*Context gathered: 2026-04-29*
