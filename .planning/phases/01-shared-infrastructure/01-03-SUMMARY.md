---
phase: 01-shared-infrastructure
plan: 03
subsystem: ui
tags: [react, tailwind, next.js, rsc, typescript, clsx, tailwind-merge]

# Dependency graph
requires:
  - phase: 01-shared-infrastructure/plan-01
    provides: clsx@2.1.1 and tailwind-merge@3.5.0 installed as runtime dependencies

provides:
  - "cn() named export at src/lib/utils.ts — clsx + tailwind-merge wrapper for conditional class composition"
  - "CodeCallout default export at src/components/CodeCallout.tsx — RSC chip rendering Tailwind class strings adjacent to demo output"

affects:
  - all Phase 2-6 slide pages (every slide imports CodeCallout and cn())

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Readonly<Props> pattern on all RSC components (no 'use client', typed props)"
    - "Static class string literal for Tailwind purger safety (never template literals)"
    - "3xl: breakpoint escalations mandatory on all demo-adjacent display components"
    - "Named export for utilities (cn), default export for components (CodeCallout)"

key-files:
  created:
    - src/lib/utils.ts
    - src/components/CodeCallout.tsx
  modified: []

key-decisions:
  - "CodeCallout class string is a single complete static literal — no cn() call, no template interpolation — Tailwind purger requires this"
  - "CodeCallout has exactly one prop (classes: string), fixed appearance with no variants (D-05, D-06)"
  - "CodeCallout is RSC (no 'use client') — pure display component with no browser APIs"
  - "cn() is a named export at src/lib/utils.ts — not a default export, consistent with utilities pattern"
  - "3xl: escalations included on CodeCallout chip (text-base, px-4, py-2, rounded-xl) for TV readability at 1920px"

patterns-established:
  - "Readonly<Props>: wrap all RSC component props interfaces in Readonly<> (established by NavCard.tsx and CodeCallout.tsx)"
  - "Static-literal classes: chip/callout class strings must be single complete static literals in source — not composed at runtime"
  - "3xl: required: all demo components must include 3xl: escalations per CLAUDE.md"

requirements-completed:
  - INFRA-01
  - INFRA-02

# Metrics
duration: 10min
completed: 2026-04-29
---

# Phase 1 Plan 03: cn() Utility and CodeCallout RSC Summary

**RSC chip component (CodeCallout) and clsx+tailwind-merge utility (cn) — shared primitives for all Phase 2-6 slide pages**

## Performance

- **Duration:** ~10 min
- **Started:** 2026-04-29T18:00:00Z
- **Completed:** 2026-04-29T18:12:20Z
- **Tasks:** 2 (Task 1 was pre-completed in commit 8aa09ee; Task 2 completed this session)
- **Files modified:** 1 new file (CodeCallout.tsx)

## Accomplishments
- CodeCallout RSC chip renders a Tailwind class string in a TV-legible inline chip (font-mono, dark: variants, 3xl: escalations)
- cn() utility at src/lib/utils.ts enables conditional class composition via clsx + tailwind-merge (pre-existing, commit 8aa09ee)
- Both primitives are importable by all Phase 2-6 slide pages: `import CodeCallout from "@/components/CodeCallout"` and `import { cn } from "@/lib/utils"`
- yarn build and yarn lint both pass with no errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Create cn() utility at src/lib/utils.ts** - `8aa09ee` (feat) — rescued from prior interrupted worktree
2. **Task 2: Create CodeCallout RSC at src/components/CodeCallout.tsx** - `17098c3` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified
- `src/lib/utils.ts` - cn() named export: clsx + tailwind-merge wrapper, variadic ClassValue[] signature
- `src/components/CodeCallout.tsx` - RSC chip component: single classes: string prop, Readonly<CodeCalloutProps>, static class string with full dark: and 3xl: coverage

## Decisions Made
- CodeCallout class string is a single complete static literal — Tailwind purger cannot detect dynamically constructed strings; no cn() call used in the chip itself
- Readonly<CodeCalloutProps> wrapping follows the pattern established in NavCard.tsx
- No "use client" directive — pure RSC; no useState, refs, or browser APIs needed

## Deviations from Plan

None - plan executed exactly as written.

The worktree required `yarn install --ignore-engines` to resolve clsx and tailwind-merge imports before `yarn build` could run (the worktree had no node_modules). This is an expected worktree setup step, not a plan deviation.

## Issues Encountered
- Worktree had no node_modules; ran `yarn install --ignore-engines` to install dependencies before build verification. Build passed cleanly after install.

## Known Stubs

None — CodeCallout renders its `classes` prop as text content directly. No hardcoded empty values or placeholder text.

## Threat Flags

None — no new network endpoints, auth paths, file access patterns, or trust boundary crossings introduced. CodeCallout renders its prop as a React text child (XSS-safe by React default). Threat register items T-01-04 and T-01-05 accepted per plan's threat model.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Both shared primitives are in place; Phase 2-6 slide pages can import CodeCallout and cn() immediately
- No blockers

---
*Phase: 01-shared-infrastructure*
*Completed: 2026-04-29*
