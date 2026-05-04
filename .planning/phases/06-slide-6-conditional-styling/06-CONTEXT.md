# Phase 6: Slide 6 — Conditional Styling - Context

**Gathered:** 2026-05-04
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the "Conditional Styling" slide page — replacing the stub at `src/app/conditional-styling/page.tsx` with three full-width stacked sections demonstrating four distinct conditional-class mechanisms:

1. **Three-panel comparison (S6-01)**: A `grid grid-cols-3` section showing three self-contained panels side by side — (1) pure CSS hover variants (`hover:bg-sky-50`), (2) `group-hover:` driving multiple children simultaneously, and (3) React `useState` + `cn()` explicit toggle. Each panel has its own demo card and a CodeCallout directly beneath it showing the relevant class string.

2. **cn() merge + peer-invalid (S6-02 + S6-03)**: A two-column section where the left column shows the cn() merging demo (static: a colored swatch + CodeCallout showing `cn('bg-red-500', 'bg-blue-500')` → `'bg-blue-500'`) and the right column shows a `peer-invalid` form validation demo (email input with `peer`, sibling paragraph with `invisible peer-invalid:visible text-red-500` — no JavaScript required).

3. **data-active attribute toggle (S6-04)**: A two-column section with a standalone client island on the left (a card whose appearance is driven by a `data-active` attribute toggled by a button), and a CodeCallout on the right showing `data-active:bg-purple-600` plus a label explaining the headless UI pattern.

Nothing else is added in this phase — no new shared components, no new routes.

</domain>

<decisions>
## Implementation Decisions

### Section Layout
- **D-01:** Three stacked sections separated by `<div className="mt-16 3xl:mt-24" />` spacers — matching the Phase 3/4/5 pattern.
  - Section 1: Three-panel comparison (S6-01)
  - Section 2: cn() merge + peer-invalid side by side (S6-02 + S6-03)
  - Section 3: data-active toggle (S6-04)

### Three-Panel Comparison (S6-01)
- **D-02:** `grid grid-cols-3` layout with self-contained panels. Each panel is a vertical stack: overline label on top → demo card → CodeCallout beneath it. The three panels are in a single client island since the React state panel requires `useState`.
- **D-03:** Panel overline labels: "CSS VARIANTS" / "GROUP VARIANTS" / "REACT STATE" — using the established `text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400` overline style.
- **D-04:** Each panel's CodeCallout shows only the classes specific to that mechanism:
  - Panel 1: `hover:bg-sky-50 dark:hover:bg-slate-700` (CSS hover variant — no JS)
  - Panel 2: `group-hover:scale-105 group-hover:shadow-lg` (multiple children driven by parent group)
  - Panel 3: the cn() call string for the active/inactive toggle (exact strings: Claude's discretion)

### cn() Merge Demo (S6-02)
- **D-05:** Static two-column layout within Section 2's left column:
  - Colored swatch showing the final merged result (blue wins)
  - CodeCallout showing `cn('bg-red-500', 'bg-blue-500')` → `'bg-blue-500'`
  - Small label: "Later class wins — tailwind-merge resolves the conflict"
- **D-06:** Pure RSC — no client island needed for this demo.

### peer-invalid Form Demo (S6-03)
- **D-07:** Email input with `peer` class. Sibling paragraph with `invisible peer-invalid:visible text-red-500` — activates with no JavaScript when the browser's native email validation fires. Pure RSC — no `"use client"` needed.
- **D-08:** CodeCallout below the form showing both `peer` (on the input) and `peer-invalid:visible` (on the sibling) as a two-line callout using the existing `whitespace-pre-wrap` behavior.

### data-active Island (S6-04)
- **D-09:** Standalone `"use client"` island (`DataActiveDemo.tsx`) in Section 3.
  - Left column: a card element whose `data-active` attribute is toggled by React state (`useState`). The card uses `data-active:bg-purple-600 data-active:text-white` classes driven solely by the attribute (no conditional class logic — the Tailwind variant handles it). A "Toggle Active" button below the card sets `data-active=""` / removes the attribute.
  - Right column: CodeCallout showing `data-active:bg-purple-600` + `data-active:text-white`, with a small label: "Headless UI libraries (Radix, Headless UI) use data-* attributes to drive styles without class toggling."
- **D-10:** Attribute toggling approach: `<div data-active={isActive ? "" : undefined}>` — this adds `data-active` when true and removes it when false, matching how CSS attribute selectors work (`[data-active]`).

### Client Islands
- **D-11:** Two client islands total:
  - `src/components/ConditionalPanels.tsx` — the full three-panel Section 1 (CSS hover / group-hover / React state). React state panel requires `useState`; wrapping all three panels keeps the DOM structure clean and the comparison visually coherent.
  - `src/components/DataActiveDemo.tsx` — standalone Section 3 island.
- **D-12:** Section 2 (cn() merge + peer-invalid) is pure RSC — no client island needed.

### Claude's Discretion
- Exact demo card content (placeholder text/icons in the three panels — keep minimal and consistent)
- Exact cn() class strings for the React state panel in S6-01 (e.g., `cn('rounded-xl p-6 transition', isActive && 'bg-blue-500 text-white')`)
- `data-active` Tailwind variant syntax — confirm whether `data-[active]:` or `data-active:` is the correct Tailwind v4 form (researcher should verify)
- Exact `3xl:` escalation values for text, spacing, panel padding, and card sizes
- Border/shadow styling on demo cards in light and dark mode

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase Requirements
- `.planning/REQUIREMENTS.md` §Slide 6 — Requirements S6-01, S6-02, S6-03, S6-04 (four success criteria for this phase)
- `.planning/ROADMAP.md` §Phase 6 — Goal, success criteria, dependencies, and UI hint

### Architecture & Conventions
- `CLAUDE.md` §Interactive demo patterns — single-source callout pattern, RSC default, leaf-node client island rule, no dynamic class interpolation
- `CLAUDE.md` §Tailwind v4 specifics — `@custom-variant dark` is the ONLY dark mode mechanism; `@theme` blocks; no `prefers-color-scheme`
- `CLAUDE.md` §Adding a new slide — steps for registering in home nav (already registered — verify title/tagline)

### Existing Code (read before implementing)
- `src/app/conditional-styling/page.tsx` — Current stub; the file being replaced
- `src/components/SlideLayout.tsx` — Shared wrapper providing nav bar, back link, slide number badge, and h1
- `src/components/CodeCallout.tsx` — RSC component; single `classes: string` prop; supports `whitespace-pre-wrap` for multi-line
- `src/lib/utils.ts` — `cn()` utility; used in ConditionalPanels island for the React state panel
- `src/app/globals.css` — `@custom-variant dark`; `@theme` breakpoints (3xl = 1920px); check whether a `data-active` custom variant exists or needs to be added
- `src/components/CardBuilder.tsx` — Reference for client island with state + lookup-table map pattern
- `src/components/ResponsiveDemo.tsx` — Reference for tab-state client island structure
- `src/app/what-is-tailwind/page.tsx` — Phase 2 two-column grid pattern and overline convention
- `src/app/utility-classes/page.tsx` — Phase 3 stacked sections pattern
- `src/app/page.tsx` — Home page `slides` array; verify `conditional-styling` entry title/tagline

### Prior Phase Context
- `.planning/phases/05-slide-5-customizing-tailwind/05-CONTEXT.md` — Phase 5 section layout, Shiki patterns, overline convention
- `.planning/phases/04-slide-4-responsiveness-dark-mode/04-CONTEXT.md` — Phase 4 dark mode patterns, multi-line CodeCallout, stacked callout rows

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/CodeCallout.tsx` — `<CodeCallout classes={STRING_CONST} />`. Single `classes: string` prop. Supports multi-line with `whitespace-pre-wrap`. Use for: per-panel class callouts (S6-01), peer-invalid pair callout (S6-03), data-active callout (S6-04).
- `src/lib/utils.ts` — `cn(...inputs)` — use in `ConditionalPanels.tsx` for the React state panel class composition.
- `src/components/SlideLayout.tsx` — Wraps all slide content.
- `src/components/CardBuilder.tsx` / `ResponsiveDemo.tsx` — Reference patterns for client islands with state + lookup-table.

### Established Patterns
- **Static lookup maps**: All class string variations keyed by state value — complete static strings, no dynamic interpolation.
- **Single-source const**: Named const used by both the element and its `CodeCallout` to prevent drift.
- **Two-column layout**: `grid grid-cols-2 gap-6 3xl:gap-12` — established Phase 2 pattern. Used in Section 2 (cn() merge + peer-invalid side by side) and Section 3 (data-active demo + callout).
- **Three-column layout**: `grid grid-cols-3 gap-6 3xl:gap-8` — like FlexGridComparison. Used in Section 1.
- **Stacked sections**: `<section>` blocks with `<div className="mt-16 3xl:mt-24" />` spacer.
- **Overline labels**: `text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400`.
- **TV scale**: `3xl:` escalations on all text, spacing, element sizes.
- **Color palette**: `slate-50`/`slate-950` backgrounds, `cyan-500` accents, `slate-200`/`slate-800` borders.
- **Dark mode**: `dark:` prefix via `@custom-variant dark`. No `prefers-color-scheme`.
- **Leaf-node client islands**: `"use client"` only on the island component file, never on `page.tsx`.

### Integration Points
- `src/app/conditional-styling/page.tsx` — Replace stub. Import `SlideLayout`, `ConditionalPanels` island, `CodeCallout`, `DataActiveDemo` island. RSC page — no `"use client"`.
- New island: `src/components/ConditionalPanels.tsx` — three-panel Section 1 (`"use client"`).
- New island: `src/components/DataActiveDemo.tsx` — Section 3 data-active toggle (`"use client"`).
- `src/app/globals.css` — Researcher should verify whether `data-active:` works as a Tailwind v4 data-attribute variant out of the box, or if a `@custom-variant` needs to be added.
- `src/app/page.tsx` — Verify `conditional-styling` entry in `slides` array has correct title/tagline.

</code_context>

<specifics>
## Specific Ideas

- **Three-panel cards**: Keep them visually identical in structure so the mechanism difference is obvious. All three panels use the same card shell — the only thing that changes is HOW the active state is applied (CSS hover, group class on parent, React state).
- **group-hover panel**: Parent wrapper has `group` class; children inside carry `group-hover:scale-105`, `group-hover:shadow-lg`, etc. — demonstrating that the parent triggers children without any JS.
- **peer-invalid**: The email input should have a placeholder like `"you@example.com"` so the audience understands the context. Type something that isn't an email to see the sibling message appear.
- **data-active**: The card label should say something like "Status: Inactive" → "Status: Active" to make the toggle obvious without explaining it verbally.
- **cn() merge label**: Small paragraph below the CodeCallout: "tailwind-merge resolves conflicting utility classes — the last applicable class wins."

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 6-Slide 6 — Conditional Styling*
*Context gathered: 2026-05-04*
