# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-05-06)

**Core value:** Every slide must both show the output AND make it obvious what Tailwind code produces it — so the audience leaves with a mental model they can immediately apply.
**Current focus:** v1.1 — Phase 8: Slide 2 Rework (ready to plan)

## Current Position

Milestone: v1.1 — Extended Demos + Slide 2 Rework
Phase: 8 of 10 (Slide 2 Rework)
Plan: —
Status: Ready to plan
Last activity: 2026-05-06 — v1.1 roadmap defined (Phases 8–10)

Progress: [          ] 0%

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

- All phases: No dynamic class string interpolation — use lookup-table maps with complete class strings everywhere
- All phases: Every interactive demo is a leaf-node "use client" island; page.tsx stays RSC
- Phase 2: Single-source const pattern — extract className string as a named const so both the element and its CodeCallout use the same value (prevents drift)
- Phase 2: Two-column grid with labeled overlines established as the slide layout pattern: `grid grid-cols-2 gap-6 3xl:gap-12` with `text-xs uppercase tracking-widest` overlines
- Quick task 260506-q01: MilestoneItem type established for inline hyperlinks in CssTimeline — HIST-01 extends this pattern

### Pending Todos

None yet.

### Blockers/Concerns

- Phase 10 (EXT-03): shiki-magic-move is installed but unwired — prototype the MagicMove component against Slide 5's ShikiBlock early to validate the animation API before committing to both slides.

## Deferred Items

| Category | Item | Status | Deferred At |
|----------|------|--------|-------------|
| v2 | Full shiki-magic-move coverage across all slides | Deferred | v1.1 scope |
| v2 | Presenter mode / speaker notes | Deferred | Init |
| v2 | Keyboard slide-to-slide navigation | Deferred | Init |

## Session Continuity

Last session: 2026-05-06
Stopped at: v1.1 roadmap written — Phases 8, 9, 10 defined
Resume file: None — run /gsd-plan-phase 8 to start
