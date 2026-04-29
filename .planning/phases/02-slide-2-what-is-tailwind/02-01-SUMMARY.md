---
phase: 02-slide-2-what-is-tailwind
plan: 01
subsystem: ui
tags: [react, tailwindcss, nextjs, client-island, rsc]

requires:
  - phase: 01-shared-infrastructure
    provides: CodeCallout RSC component, SlideLayout wrapper, ThemeToggle, cn() utility

provides:
  - ButtonComparison "use client" island with semantic vs utility button comparison and showCss toggle
  - WhatIsTailwind RSC page with two-column layout, CARD_CLASSES single-source pattern

affects:
  - all subsequent slides — establishes two-column layout + labeled overline + CodeCallout pattern

tech-stack:
  added: []
  patterns: [single-source const for both element className and CodeCallout, leaf-node use-client island, RSC page with no use-client]

key-files:
  created:
    - src/components/ButtonComparison.tsx
  modified:
    - src/app/what-is-tailwind/page.tsx

key-decisions:
  - "Semantic button toggles BTN_CSS_DEFINITION CodeCallout on click; Tailwind button CodeCallout is always visible — makes the asymmetry between hidden vs transparent styles immediately legible"
  - "CARD_CLASSES const passed to both <div className> and <CodeCallout classes> — single-source pattern prevents drift"
  - "No hover styles on either button per D-08 to keep the visual comparison clean"

patterns-established:
  - "Single-source const: extract className string as a named const so both the element and its CodeCallout use the same value"
  - "Leaf-node island: ButtonComparison.tsx is the only 'use client' component; page.tsx stays RSC"
  - "Two-column grid with overline labels: grid grid-cols-2 gap-6 3xl:gap-12 with text-xs uppercase tracking-widest overlines"

requirements-completed:
  - S2-01
  - S2-02

duration: 15min
completed: 2026-04-29
---

# Phase 02: What Is Tailwind Summary

**Semantic vs utility button comparison island and two-column RSC slide page teaching utility-first transparency**

## Performance

- **Duration:** 15 min
- **Started:** 2026-04-29T00:00:00Z
- **Completed:** 2026-04-29T00:15:00Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Created `ButtonComparison.tsx` — "use client" island with `showCss` toggle; semantic `.btn` button reveals CSS definition on click; Tailwind button always shows its class string via CodeCallout
- Replaced `what-is-tailwind/page.tsx` stub with two-column RSC layout: left column (Semantic CSS + ButtonComparison island), right column (Utility-First Tailwind + CARD_CLASSES demo + CodeCallout)
- Build passes cleanly (`yarn build` exit 0); all 3xl: escalations present; dark mode variants applied throughout

## Task Commits

1. **Task 1+2: ButtonComparison island and page.tsx two-column layout** — `32164b4` (feat)

## Files Created/Modified
- `src/components/ButtonComparison.tsx` — "use client" island; manages showCss boolean; renders both buttons with CodeCallouts using single-source consts
- `src/app/what-is-tailwind/page.tsx` — RSC page; two-column grid; CARD_CLASSES const used for both card element and CodeCallout

## Decisions Made
- Used a single commit for both files since they are tightly coupled (page imports island directly)
- Followed the plan spec exactly — no deviations

## Deviations from Plan

**One pre-existing issue resolved:** `clsx` and `tailwind-merge` packages were in `package.json` but not installed (node_modules incomplete), causing `yarn build` to fail. Fixed by running `yarn install` with Node 22 (required per .nvmrc). This was a pre-existing environment issue, not introduced by this plan.

---

**Total deviations:** 0 from plan spec (1 environment fix unrelated to plan scope)
**Impact on plan:** None — plan executed exactly as specified.

## Issues Encountered
- Node version mismatch (v21 active vs v22 required by .nvmrc) caused `yarn install` to fail. Resolved by switching to Node 22 via nvm before installing.

## Next Phase Readiness
- Slide 2 is complete and production-built
- Two-column + overline + CodeCallout pattern is now established for subsequent slides
- No blockers

---
*Phase: 02-slide-2-what-is-tailwind*
*Completed: 2026-04-29*
