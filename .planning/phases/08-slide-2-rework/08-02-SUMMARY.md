---
phase: 08-slide-2-rework
plan: "02"
subsystem: ui
tags: [tailwind, react, rsc, client-island, tdd, button-demo, semantic-css, utility-first]

dependency_graph:
  requires:
    - phase: 08-01
      provides: wave-0-test-scaffold (SemanticButton.test.tsx, UtilityButton.test.tsx)
  provides:
    - SemanticButton component (always-visible BTN_CSS_DEFINITION callout, use client, no toggle)
    - UtilityButton component (pure RSC, single-source TAILWIND_BTN_CLASSES const)
  affects: [08-03-PLAN]

tech-stack:
  added: []
  patterns:
    - leaf-node-client-island (SemanticButton: use client with static style block, no state)
    - rsc-by-default (UtilityButton: no use client, no hooks)
    - single-source-const (TAILWIND_BTN_CLASSES drives both className and CodeCallout)
    - always-visible-callout (D-08: CodeCallout rendered unconditionally, no click-to-reveal)

key-files:
  created:
    - src/components/SemanticButton.tsx
    - src/components/UtilityButton.tsx
  modified: []

key-decisions:
  - "D-08 enforced: no click-to-reveal toggle in SemanticButton — BTN_CSS_DEFINITION callout always visible"
  - "D-09 enforced: SemanticButton keeps 'use client' for <style> tag injection despite no useState"
  - "D-07 enforced: UtilityButton is pure RSC — no 'use client', no hooks"
  - "BTN_CSS_DEFINITION and TAILWIND_BTN_CLASSES migrated verbatim from ButtonComparison.tsx — no value drift"

requirements-completed:
  - S2-03

duration: 1min
completed: 2026-05-07
---

# Phase 8 Plan 02: Component Extraction Summary

**SemanticButton (use client, always-visible BTN_CSS_DEFINITION) and UtilityButton (pure RSC, single-source TAILWIND_BTN_CLASSES) extracted from ButtonComparison.tsx with no toggle, passing all 6 Wave 0 component tests**

## Performance

- **Duration:** ~1 min
- **Started:** 2026-05-07T15:17:32Z
- **Completed:** 2026-05-07T15:18:33Z
- **Tasks:** 3
- **Files modified:** 2 created

## Accomplishments

- Created SemanticButton.tsx: "use client" leaf-node island with static `<style>` block, `.btn` CSS rule, and CodeCallout rendering BTN_CSS_DEFINITION unconditionally (D-08 locked)
- Created UtilityButton.tsx: pure RSC with TAILWIND_BTN_CLASSES const driving both the button's className and CodeCallout (single-source pattern per CLAUDE.md)
- Turned 6 Wave 0 RED tests GREEN; 4 WhatIsTailwind tests remain RED as expected (Plan 03 will fix)
- yarn build clean — 0 type errors, no purged classes

## Task Commits

Each task was committed atomically:

1. **Task 1: Create SemanticButton.tsx** - `90b2913` (feat)
2. **Task 2: Create UtilityButton.tsx** - `226b172` (feat)
3. **Task 3: yarn build verification** — no separate commit (verification only, no files modified)

## Files Created/Modified

- `src/components/SemanticButton.tsx` — 32 lines; "use client" island with `.btn` style block and always-visible BTN_CSS_DEFINITION callout (no useState, no onClick, no toggle)
- `src/components/UtilityButton.tsx` — 18 lines; pure RSC with TAILWIND_BTN_CLASSES const wired to both className and CodeCallout

## Constant Fidelity Verification

BTN_CSS_DEFINITION (SemanticButton.tsx) matches ButtonComparison.tsx line 8 character-for-character:
```
`.btn {\n  background-color: #06b6d4;\n  color: white;\n  font-weight: 600;\n  font-size: 0.875rem;\n  padding: 0.75rem 1.25rem;\n  border-radius: 0.5rem;\n}`
```

TAILWIND_BTN_CLASSES (UtilityButton.tsx) matches ButtonComparison.tsx lines 5-6 character-for-character:
```
"bg-cyan-500 dark:bg-cyan-600 text-white font-semibold text-sm 3xl:text-xl px-5 py-3 rounded-lg 3xl:px-8 3xl:py-4"
```

## Test Results

| File | Tests | State |
|------|-------|-------|
| `SemanticButton.test.tsx` | 3/3 passing | GREEN |
| `UtilityButton.test.tsx` | 3/3 passing | GREEN |
| `WhatIsTailwind.test.tsx` | 4/8 passing | RED (expected — Plan 03) |
| All pre-existing tests | 84/84 passing | GREEN |

**Total:** 90 passing / 4 failing (same 4 WhatIsTailwind failures that were RED at Wave 0 baseline)

## yarn build Status

PASSED — `yarn build` exits 0. No TypeScript errors in SemanticButton.tsx or UtilityButton.tsx. No purged classes from TAILWIND_BTN_CLASSES (all classes are static string literals). All 10 pages generated successfully.

## Decisions Made

- D-08 (always-visible callout): Enforced by removing the `showCss && (...)` conditional and `cursor-pointer` class that signaled interactivity. CodeCallout now rendered at top level unconditionally.
- D-09 ("use client" retained): SemanticButton needs "use client" because it uses a `<style>` JSX element, which requires a client context for DOM injection.
- D-07 (RSC by default): UtilityButton has no state, refs, or browser APIs — confirmed as pure RSC.
- cursor-pointer removed from .btn button: Previously signaled click was available; now the demo is read-only per D-08 so the hint is misleading.

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## Known Stubs

None — both components render real, wired content.

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes introduced. Components are static leaf nodes rendering hardcoded demo content for a public presentation. T-08-03/T-08-04/T-08-05/T-08-06 addressed: no template interpolation in className or `<style>` block, no dangerouslySetInnerHTML, no user data.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

Plan 03 (08-03) can now:
- Import SemanticButton and UtilityButton into the WhatIsTailwind page
- Delete ButtonComparison.tsx
- Wire S2-01, S2-02, S2-03, S2-04 content sections
- Turn the remaining 4 RED WhatIsTailwind tests GREEN

ButtonComparison.tsx is left untouched (Plan 03 owns its deletion).
page.tsx is left untouched (Plan 03 owns its rewrite).

---
*Phase: 08-slide-2-rework*
*Completed: 2026-05-07*
