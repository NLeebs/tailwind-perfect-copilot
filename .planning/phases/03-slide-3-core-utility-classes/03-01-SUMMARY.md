---
phase: 03-slide-3-core-utility-classes
plan: "01"
subsystem: components
tags: [client-island, interactive-demo, tailwind, step-navigator, tdd]
dependency_graph:
  requires:
    - src/components/CodeCallout.tsx
    - src/lib/utils.ts
  provides:
    - src/components/CardBuilder.tsx
  affects:
    - src/app/utility-classes/page.tsx (to be wired in plan 03-03)
tech_stack:
  added: []
  patterns:
    - STEPS lookup-table array with allClasses/newClasses static literals
    - cn() conditional class composition for step node active/inactive states
    - Leaf-node "use client" island pattern
key_files:
  created:
    - src/components/CardBuilder.tsx
    - src/test/components/CardBuilder.test.tsx
  modified: []
decisions:
  - "STEPS array with cumulative allClasses and delta newClasses matches UI-SPEC table exactly"
  - "Prev/Next buttons use disabled prop + opacity-40 cursor-not-allowed pointer-events-none for boundary enforcement"
  - "Step node buttons wrapped in outer button for label+number, inner span for styled circle per UI-SPEC"
metrics:
  duration: "2m 9s"
  completed: "2026-04-30"
  tasks_completed: 1
  tasks_total: 1
---

# Phase 03 Plan 01: CardBuilder Client Island Summary

**One-liner:** `"use client"` CardBuilder island with 6-step STEPS lookup table driving cumulative card className and delta CodeCallout via static string literals.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 (RED) | Add failing tests for CardBuilder | 89d5fe0 | src/test/components/CardBuilder.test.tsx |
| 1 (GREEN) | Implement CardBuilder client island | f10a4c3 | src/components/CardBuilder.tsx |

## What Was Built

`src/components/CardBuilder.tsx` — a React `"use client"` island that implements the progressive card-building demo for the Core Utility Classes slide.

Key implementation details:
- `StepConfig` interface with `label`, `newClasses`, `allClasses` fields
- `const STEPS: StepConfig[]` array with 6 entries: Layout, Spacing, Typo, Color, Borders, Flex
- All 6 step entries use complete static string literals exactly matching the UI-SPEC table — no template literals, no string concatenation
- `useState(0)` for `activeStep` (zero-indexed, opens at Layout)
- Step navigator: full-width row with Prev button, 6 clickable numbered nodes with category labels, Next button
- `STEPS[activeStep].allClasses` drives the demo card element className (cumulative)
- `STEPS[activeStep].newClasses` passed to `<CodeCallout>` (delta only)
- Prev disabled (`disabled` prop + `opacity-40 cursor-not-allowed pointer-events-none`) at step 0
- Next disabled at step 5 (STEPS.length - 1)
- `cn()` used for conditional step node active/inactive styling
- All surfaces have `dark:` variants; all text/spacing/nodes have `3xl:` escalations

## TDD Gate Compliance

- RED gate: commit `89d5fe0` — `test(03-01): add failing tests for CardBuilder island` (8 failing tests)
- GREEN gate: commit `f10a4c3` — `feat(03-01): implement CardBuilder client island` (all 8 tests passing)
- REFACTOR gate: not needed — implementation was clean on first pass

## Verification Results

All automated verifications passed:
- `grep -c '"use client"' CardBuilder.tsx` → 1
- `grep -c 'const STEPS' CardBuilder.tsx` → 1
- `grep -c 'STEPS\[activeStep\]\.allClasses' CardBuilder.tsx` → 1
- `grep -c 'STEPS\[activeStep\]\.newClasses' CardBuilder.tsx` → 1
- Dynamic interpolation check → 0 (none found)
- `yarn build` → exit 0, all routes built cleanly
- 8/8 Vitest tests pass

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None — `CardBuilder` is a complete, self-contained component. Its data is all static UI content (not wired to any external data source by design). The component will be imported into the utility-classes page in plan 03-03.

## Threat Surface Scan

No new security-relevant surface introduced. CardBuilder is a pure client-side UI island with:
- No network calls
- No external data sources
- No user-provided input stored or transmitted
- Step state is bounded 0–5 by Math.max/Math.min as specified in the threat model

## Self-Check: PASSED

- [x] `src/components/CardBuilder.tsx` exists
- [x] `src/test/components/CardBuilder.test.tsx` exists
- [x] Commit `89d5fe0` exists (RED)
- [x] Commit `f10a4c3` exists (GREEN)
- [x] `yarn build` passes (verified above)
- [x] All 8 tests pass
