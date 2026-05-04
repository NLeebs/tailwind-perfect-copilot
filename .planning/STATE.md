# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-04-28)

**Core value:** Every slide must both show the output AND make it obvious what Tailwind code produces it — so the audience leaves with a mental model they can immediately apply.
**Current focus:** Phase 6 — Slide 6: Conditional Styling (Phase 5 complete)

## Current Position

Phase: 6 of 7 (Slide 6 — Conditional Styling)
Plan: 0 of TBD in current phase
Status: Phase 5 complete. Phase 6 not yet planned.
Last activity: 2026-04-30 — Phase 5 complete (Shiki foundation, globals.css additions, three-section slide page)

Progress: [█████████░] 71%

## Performance Metrics

**Velocity:**
- Total plans completed: 0
- Average duration: -
- Total execution time: 0 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| - | - | - | - |

**Recent Trend:**
- Last 5 plans: -
- Trend: -

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Phase 1: Remove `prefers-color-scheme` media query from globals.css — `@custom-variant dark` is the single dark mode source of truth
- Phase 1: `tailwind-merge` must be v3 (v2 is Tailwind v3 only); import from `"motion/react"` not `"framer-motion"`
- All phases: No dynamic class string interpolation — use lookup-table maps with complete class strings everywhere
- All phases: Every interactive demo is a leaf-node "use client" island; page.tsx stays RSC
- Phase 2: Single-source const pattern — extract className string as a named const so both the element and its CodeCallout use the same value (prevents drift)
- Phase 2: Two-column grid with labeled overlines established as the slide layout pattern: `grid grid-cols-2 gap-6 3xl:gap-12` with `text-xs uppercase tracking-widest` overlines

### Pending Todos

None yet.

### Blockers/Concerns

- Phase 5: Shiki dual-theme CSS injection with `@custom-variant dark` should be prototyped early — selector specificity with `html.dark .shiki` is untested against this project's setup
- Phase 4: Resolved — interactive tabs approach chosen (discuss-phase D-01); constrained container with LAYOUT_CLASSES map drives tab → layout switching

## Deferred Items

| Category | Item | Status | Deferred At |
|----------|------|--------|-------------|
| v2 | Container queries demo (@container) | Deferred | Init |
| v2 | peer-checked radio button bonus slide | Deferred | Init |
| v2 | shiki-magic-move animated code transitions | Deferred | Init |

## Session Continuity

Last session: 2026-05-04
Stopped at: Phase 6 context gathered — 3 sections, three-panel comparison, static cn() merge, standalone data-active island. Ready for planning.
Resume file: .planning/phases/06-slide-6-conditional-styling/06-CONTEXT.md
