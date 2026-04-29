# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-04-28)

**Core value:** Every slide must both show the output AND make it obvious what Tailwind code produces it — so the audience leaves with a mental model they can immediately apply.
**Current focus:** Phase 2 — Slide 2: What Is Tailwind

## Current Position

Phase: 2 of 7 (Slide 2 — What Is Tailwind)
Plan: 0 of 1 in current phase
Status: Ready to execute — Phase 2 planned (1 plan, 1 wave)
Last activity: 2026-04-29 — Phase 2 planned (02-01-PLAN.md created, verification passed)

Progress: [███░░░░░░░] 14%

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

### Pending Todos

None yet.

### Blockers/Concerns

- Phase 5: Shiki dual-theme CSS injection with `@custom-variant dark` should be prototyped early — selector specificity with `html.dark .shiki` is untested against this project's setup
- Phase 4: Static side-by-side responsive cards vs. constrained-container approach — final design decision should be validated with a quick prototype before full build

## Deferred Items

| Category | Item | Status | Deferred At |
|----------|------|--------|-------------|
| v2 | Container queries demo (@container) | Deferred | Init |
| v2 | peer-checked radio button bonus slide | Deferred | Init |
| v2 | shiki-magic-move animated code transitions | Deferred | Init |

## Session Continuity

Last session: 2026-04-29
Stopped at: Phase 1 complete. CodeCallout RSC created and verified. Advancing to Phase 2.
Resume file: none
