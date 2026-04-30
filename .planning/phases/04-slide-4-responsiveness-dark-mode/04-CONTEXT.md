# Phase 4: Slide 4 — Responsiveness & Dark Mode - Context

**Gathered:** 2026-04-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the "Responsiveness & Dark Mode" slide page — replacing the stub at `src/app/responsiveness-dark-mode/page.tsx` with two full-width stacked sections:

1. **Responsive layout demo (S4-01)**: An interactive tabs island (Mobile / Tablet / Desktop) where clicking switches a constrained container between three layout states — stacked → side-by-side → three-column. Profile cards are the demo content. A CodeCallout below the demo updates to show the active breakpoint classes.

2. **Dark mode demo (S4-02 + S4-03)**: A rich info card (RSC) with 6+ dark: prefixed utility classes across named zones (bg, text, border, badge, button). Full-width card on top, two CodeCallouts below: one multi-line chip with all dark: pairs, and a second separate chip (labeled "STACKED VARIANTS") showing the `dark:md:hover:` classes on a button embedded in the card.

Nothing else is added in this phase — no new shared components beyond these two demo pieces, no animations, no third standalone section.

</domain>

<decisions>
## Implementation Decisions

### Responsive Layout Demo (S4-01)
- **D-01:** Interactive tabs (Mobile / Tablet / Desktop) — a `"use client"` island using `useState` for the active tab. Clicking switches the layout class on a constrained container. This is the only client island in this phase; page.tsx stays RSC.
- **D-02:** Profile cards as demo content — avatar circle placeholder + name + role text. Three cards that reflow between stacked (single column) / side-by-side (two-column flex row) / three-column (grid) based on active tab.
- **D-03:** CodeCallout below the demo, updated per active tab — shows the current layout class string (e.g., `flex flex-col` → `flex flex-row` → `grid grid-cols-3`). Uses the single-source const pattern: the same string drives both the container element and the CodeCallout.

### Dark Mode Demo (S4-02)
- **D-04:** Rich info card — one card with multiple named zones each carrying a `dark:` class: header background, body background, title text color, body text color, border, badge, and an action button. Pure RSC — ThemeToggle drives `.dark` on `<html>`, no additional state needed in the card.
- **D-05:** Single multi-line CodeCallout showing all 6+ `dark:` prefix-value pairs on separate lines. Leverages the existing `whitespace-pre-wrap` behavior on `CodeCallout`.
- **D-06:** Layout within the dark mode section: full-width info card on top, CodeCallouts stacked below it (card on top, callouts below — not a side-by-side split).

### Stacked Variants (S4-03)
- **D-07:** A button inside the dark mode info card carries the `dark:md:hover:` stacked classes. Not a separate third section — the stacked variants teaching moment is embedded in the dark mode demo.
- **D-08:** A second separate CodeCallout below the dark: callout (labeled with a small overline "STACKED VARIANTS") showing only the stacked variant classes. Visually distinct from the main dark: chip above it.

### Page Section Layout
- **D-09:** Full-width stacked sections — same pattern as Phase 3. Two `<section>` blocks separated by a `<div className="mt-16 3xl:mt-24" />` spacer. Responsive demo section on top (primary), dark mode section below.

### Claude's Discretion
- Exact 6+ `dark:` class choices on the info card (which color utilities, which zones, exact values)
- Profile card placeholder content (names, roles, avatar styling)
- Whether tab buttons include a breakpoint label hint (e.g., "Mobile" vs. "Mobile (default)")
- Exact `3xl:` escalation values for text, spacing, button sizes, and card padding
- Section heading style (overline label vs. h2) — match Phase 3 h2 pattern
- Border/shadow styling on the info card in light and dark mode

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase Requirements
- `.planning/REQUIREMENTS.md` §Slide 4 — Requirements S4-01, S4-02, S4-03 (the three success criteria for this phase)
- `.planning/ROADMAP.md` §Phase 4 — Goal, success criteria, dependencies, and UI hint

### Architecture & Conventions
- `CLAUDE.md` §Interactive demo patterns — single-source callout pattern, RSC default, leaf-node client island rule, no dynamic class interpolation
- `CLAUDE.md` §Tailwind v4 specifics — `@custom-variant dark` is the ONLY dark mode mechanism; no `prefers-color-scheme`
- `CLAUDE.md` §Adding a new slide — steps for registering in home nav (already registered — verify title/tagline)

### Existing Code (read before implementing)
- `src/app/responsiveness-dark-mode/page.tsx` — Current stub; the file being replaced
- `src/components/SlideLayout.tsx` — Shared wrapper providing nav bar, back link, slide number badge, and h1
- `src/components/CodeCallout.tsx` — RSC component; single `classes: string` prop; already supports `whitespace-pre-wrap` for multi-line
- `src/lib/utils.ts` — `cn()` utility; available in the responsive island for conditional layout class switching
- `src/app/globals.css` — `@custom-variant dark`, `@theme` breakpoints (3xl = 1920px, 4xl = 2560px)
- `src/app/utility-classes/page.tsx` — Phase 3 stacked sections pattern (two `<section>` + spacer div)
- `src/components/CardBuilder.tsx` — Reference for how a client island manages tab/step state via `useState` + static lookup object
- `src/app/what-is-tailwind/page.tsx` — Phase 2 overline label convention (`text-xs font-semibold tracking-widest uppercase`)
- `src/app/page.tsx` — Home page `slides` array; verify `responsiveness-dark-mode` entry exists

### Prior Phase Context
- `.planning/phases/03-slide-3-core-utility-classes/03-CONTEXT.md` — Phase 3 layout decisions, overline pattern, stacked sections spacer convention
- `.planning/phases/02-slide-2-what-is-tailwind/02-CONTEXT.md` — Phase 2 two-column pattern and single-source callout convention

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/CodeCallout.tsx` — `<CodeCallout classes={CLASSES_CONST} />`. Single `classes: string` prop. Supports `whitespace-pre-wrap` for multi-line dark: class lists. Use for: (1) per-tab breakpoint callout in the responsive island, (2) multi-line dark: callout, (3) stacked variants callout.
- `src/lib/utils.ts` — `cn(...inputs)` — available in the responsive island for composing layout classes per active tab.
- `src/components/SlideLayout.tsx` — Wraps all slide content. Provides nav bar, h1 title.
- `src/components/CardBuilder.tsx` — Reference for client island with step/tab state. Pattern: `const LAYOUTS = { mobile: '...', tablet: '...', desktop: '...' }` — all complete static strings.

### Established Patterns
- **Static lookup maps**: `const LAYOUT_CLASSES: Record<Tab, string> = { mobile: 'flex flex-col gap-4', tablet: 'flex flex-row gap-4', desktop: 'grid grid-cols-3 gap-4' }` — all complete static strings, no dynamic interpolation.
- **Single-source const**: Extract each layout/class string as a named const (or map entry) used by both the container element and `<CodeCallout>`.
- **Dark mode**: `dark:` prefix via `@custom-variant dark`. ThemeToggle already applies `.dark` to `<html>` — no new mechanism or state needed.
- **TV scale**: `3xl:` escalations on all text sizes, spacing, and interactive element sizing.
- **Stacked sections**: Two `<section>` blocks with `<div className="mt-16 3xl:mt-24" />` spacer between them (Phase 3 pattern).
- **Overline labels**: `text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400` above each section (established Phase 2–3).
- **Color palette**: `slate-50`/`slate-950` backgrounds, `cyan-500` accents, `slate-200`/`slate-800` borders, `slate-900`/`white` text.

### Integration Points
- `src/app/responsiveness-dark-mode/page.tsx` — Replace stub. Import `SlideLayout`, new `ResponsiveDemo` client island, and inline RSC markup for the dark mode section (or a new `DarkModeCard` RSC component).
- New client island: `src/components/ResponsiveDemo.tsx` — handles `activeTab` state, renders tab buttons, profile cards, and per-tab CodeCallout.
- `src/app/page.tsx` — `responsiveness-dark-mode` route is already in the slides array; verify entry title and tagline are accurate.

</code_context>

<specifics>
## Specific Ideas

- The responsive demo: tab buttons on top → profile card container below → CodeCallout strip at the bottom of the demo area. Tab buttons visually highlight the active tab (e.g., `bg-cyan-500 text-white` active, `bg-slate-100 dark:bg-slate-800 text-slate-600` inactive).
- The dark mode section CodeCallout layout: first chip shows all 6+ dark: class pairs on separate lines; below it, a second chip for the stacked variants with a small "STACKED VARIANTS" overline between them.
- The `dark:md:hover:` button is embedded within the info card (action button zone) — it uses stacked classes like `dark:md:hover:bg-sky-600 dark:md:hover:text-white`.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 4-Slide 4 — Responsiveness & Dark Mode*
*Context gathered: 2026-04-30*
