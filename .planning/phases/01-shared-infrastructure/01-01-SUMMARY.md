---
phase: 01-shared-infrastructure
plan: "01"
subsystem: infra
tags: [clsx, tailwind-merge, motion, shiki, shiki-magic-move, yarn, dependencies]

# Dependency graph
requires: []
provides:
  - clsx@2.1.1 runtime dependency for cn() utility
  - tailwind-merge@3.5.0 runtime dependency for cn() utility (v3 for Tailwind v4 compatibility)
  - motion@12.38.0 runtime dependency for animation demos in later phases
  - shiki@4.0.2 runtime dependency for syntax highlighting in Slide 5
  - shiki-magic-move@1.3.0 runtime dependency installed now for v2 use
affects:
  - 01-02 (cn() utility and CodeCallout require clsx and tailwind-merge)
  - all slide phases (motion, shiki available without re-running install)

# Tech tracking
tech-stack:
  added:
    - clsx@2.1.1
    - tailwind-merge@3.5.0
    - motion@12.38.0
    - shiki@4.0.2
    - shiki-magic-move@1.3.0
  patterns:
    - Single install pass for all roadmap packages in Phase 1 (D-11)
    - Runtime dependencies in "dependencies" (not devDependencies) for production code paths

key-files:
  created: []
  modified:
    - package.json
    - yarn.lock

key-decisions:
  - "tailwind-merge pinned to ^3 (v2 is Tailwind v3 only; this project uses Tailwind v4)"
  - "motion package (not framer-motion); imported as motion/react in later phases"
  - "shiki-magic-move installed now even though v2-deferred for usage (D-14)"
  - "All five packages installed in single yarn add pass (D-11)"

patterns-established:
  - "Runtime deps in dependencies not devDependencies: all five packages used in production code paths across slides"

requirements-completed:
  - INFRA-02

# Metrics
duration: 2min
completed: 2026-04-29
---

# Phase 1 Plan 01: Install Shared Runtime Libraries Summary

**Five runtime dependencies installed via single yarn add: clsx@2.1.1, tailwind-merge@3.5.0 (Tailwind v4 compatible), motion@12.38.0, shiki@4.0.2, shiki-magic-move@1.3.0**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-29T13:54:36Z
- **Completed:** 2026-04-29T13:56:33Z
- **Tasks:** 1 of 1
- **Files modified:** 2

## Accomplishments
- All five packages added to `"dependencies"` (runtime, not devDependencies) in a single `yarn add` pass
- tailwind-merge v3 installed — v2 is incompatible with Tailwind v4, v3 is required for this project
- motion package installed (not framer-motion) — correct package name per D-13; imports as `"motion/react"`
- `yarn install --check-files` exits 0 with no peer-dep errors (only a pre-existing vite peer warning unrelated to these packages)
- `yarn dev` confirms app boots ("Ready in 300ms") with no module resolution errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Install shared runtime libraries via yarn add** - `616a341` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified
- `package.json` - Added clsx, tailwind-merge, motion, shiki, shiki-magic-move to dependencies
- `yarn.lock` - Locked dependency tree updated with 45 new entries

## Decisions Made
- Followed all plan decisions exactly: D-11 (single install pass), D-12 (tailwind-merge v3), D-13 (motion not framer-motion), D-14 (shiki-magic-move installed now for completeness)

## Deviations from Plan

None - plan executed exactly as written.

The Node engine mismatch (Node 21 in shell vs required Node 22) was handled by sourcing nvm and switching to the correct version before running yarn add. This is an environment issue, not a code deviation.

## Issues Encountered
- Shell was running Node 21.7.3 instead of the required Node 22 — sourced nvm and switched to v22.22.2 before running `yarn add`. Install completed successfully on Node 22.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Plan 02 (cn() utility + CodeCallout RSC) can now proceed: `clsx` and `tailwind-merge@^3` are resolvable
- Plan 03 (globals.css dark mode fix) is independent of this plan and can run in wave 1 in parallel
- All later slide phases have `motion` and `shiki` available without further installs
- No blockers

---
*Phase: 01-shared-infrastructure*
*Completed: 2026-04-29*

## Self-Check: PASSED

- FOUND: 01-01-SUMMARY.md
- FOUND: commit 616a341 (feat: install shared runtime libraries)
- FOUND: clsx in package.json dependencies
- FOUND: tailwind-merge v3 in package.json dependencies
- FOUND: motion in package.json dependencies
- FOUND: shiki in package.json dependencies
- FOUND: shiki-magic-move in package.json dependencies
