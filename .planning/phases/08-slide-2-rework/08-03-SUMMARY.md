---
phase: 08-slide-2-rework
plan: "03"
subsystem: ui
tags: [tailwind, react, rsc, slide-2, s2-01, s2-02, s2-03, s2-04, wave-2]

dependency_graph:
  requires:
    - phase: 08-01
      provides: wave-0-test-scaffold (WhatIsTailwind.test.tsx, SemanticButton.test.tsx, UtilityButton.test.tsx)
    - phase: 08-02
      provides: SemanticButton component, UtilityButton component
  provides:
    - Reworked Slide 2 page (four-section narrative arc)
    - ButtonComparison.tsx retired
  affects: [Phase 8 complete]

tech-stack:
  added: []
  patterns:
    - rsc-page (no use client on page.tsx)
    - single-source-const (CARD_CLASSES and NAMING_CALLOUT drive both rendered elements and CodeCallouts)
    - leaf-node-client-island (SemanticButton is the only use client boundary)
    - section-spacer (mt-16 3xl:mt-24 between all sections)

key-files:
  created: []
  modified:
    - src/app/what-is-tailwind/page.tsx
  deleted:
    - src/components/ButtonComparison.tsx

decisions:
  - "D-13 enforced: naming card placed in LEFT column under SemanticButton (not right column)"
  - "D-15/D-16: CARD_CLASSES const drives both naming card shell and Tailwind card shell — no string drift"
  - "NAMING_CALLOUT const introduced in page.tsx — .card-header {}/.card-title {}/.card-highlighted {} as single-source"
  - "ButtonComparison.tsx deleted — replaced by SemanticButton + UtilityButton from Plan 02"
  - "Page stays RSC — no use client directive anywhere in page.tsx"

requirements-completed:
  - S2-01
  - S2-02
  - S2-03
  - S2-04

metrics:
  duration: "4 minutes"
  completed: "2026-05-07"
  tasks_completed: 3
  tasks_total: 3
  files_created: 0
  files_modified: 1
  files_deleted: 1
---

# Phase 8 Plan 03: Page Rewrite Summary

**Four-section RSC rewrite of WhatIsTailwind page delivering all S2-XX requirements: philosophy intro banner + 3 problem cards + two-column demo grid (SemanticButton left / UtilityButton right) + naming card in left column with `.card-header {}` CodeCallout. ButtonComparison.tsx deleted. All 94 tests green, yarn build clean.**

## What Was Built

### Task 1: Rewrite `src/app/what-is-tailwind/page.tsx`

Replaced the existing 51-line two-column page (which imported ButtonComparison) with a 125-line four-section RSC:

1. **Section 1 — Philosophy Intro Banner (S2-01):** Full-width `<section>` with `h2` heading "A Utility-First CSS Framework" (text-3xl, 3xl:text-5xl) and two body paragraphs describing composable utility classes and the "no context-switching, no naming things, no growing stylesheets" payoff.

2. **Section 2 — Problem Cards (S2-02):** `grid grid-cols-3 gap-6 3xl:gap-12` with three cards using `CARD_CLASSES` const: "Context Switching", "Naming Things Is Hard", "CSS Bloat". No icons, no emoji (D-06). Each card has a heading (text-base, 3xl:text-xl) + 1–2 body lines.

3. **Section 3 — Two-Column Demo Grid (S2-03):**
   - Left column: overline "Semantic CSS" → caption → `<SemanticButton />` → naming card + `<CodeCallout classes={NAMING_CALLOUT} />` (S2-04, D-13)
   - Right column: overline "Utility-First Tailwind" → caption → `<UtilityButton />` → Tailwind card (preserved verbatim) + `<CodeCallout classes={CARD_CLASSES} />`

4. **Two section spacers** (`mt-16 3xl:mt-24`) between sections 1↔2 and 2↔3 (D-01/D-03).

**New constants introduced:**
- `NAMING_CALLOUT = \`.card-header {}\n.card-title {}\n.card-highlighted {}\`` — single-source for naming card CodeCallout
- `CARD_CLASSES` preserved verbatim from old page (already existed)

**Imports changed:**
- Removed: `import ButtonComparison from "@/components/ButtonComparison"`
- Added: `import SemanticButton from "@/components/SemanticButton"` and `import UtilityButton from "@/components/UtilityButton"`

### Task 2: Delete `src/components/ButtonComparison.tsx`

Removed the legacy 54-line component (which had the click-to-reveal useState toggle). No remaining import of ButtonComparison exists anywhere in `src/`. The `.planning/` docs reference it by name in documentation context only (not code).

### Task 3: Phase Gate — Full Suite Green

- `yarn test --run`: 94/94 tests pass across 15 test files
- `yarn build`: All 10 pages compiled and generated successfully, no TypeScript errors, no purged classes
- No "use client" in page.tsx or UtilityButton.tsx
- "use client" correctly present only in SemanticButton.tsx (D-09)
- Zero ButtonComparison references in any import statement

## Task Commits

| Task | Hash | Description |
|------|------|-------------|
| Task 1 | c881f4c | feat(08-03): rewrite WhatIsTailwind page with four-section layout |
| Task 2 | 57042fe | chore(08-03): delete ButtonComparison.tsx |
| Task 3 | (verification only — no files modified) | — |

## Test Results

| File | Before Plan 03 | After Plan 03 | State |
|------|---------------|---------------|-------|
| `WhatIsTailwind.test.tsx` | 4/8 passing (RED) | 8/8 passing | GREEN |
| `SemanticButton.test.tsx` | 3/3 passing | 3/3 passing | GREEN |
| `UtilityButton.test.tsx` | 3/3 passing | 3/3 passing | GREEN |
| All pre-existing tests | 84/84 passing | 84/84 passing | GREEN |
| **Total** | **90 passing / 4 failing** | **94 passing / 0 failing** | **GREEN** |

Wave 0 RED tests all flipped GREEN. Phase 8 test suite fully green.

## ROADMAP Success Criteria Verification

| SC | Criterion | Verification |
|----|-----------|-------------|
| SC-1 | Philosophy intro section at top with "utility-first CSS framework" definition | WhatIsTailwind test 2 + test 3 (heading + body assertions) |
| SC-2 | 2–3 condensed problem cards above demo | WhatIsTailwind test 4 (three heading assertions) |
| SC-3 | Semantic + utility buttons side-by-side in two-column grid | WhatIsTailwind test 5 (overlines) + test 6 (two buttons) |
| SC-4 | Naming card with `.card-header {}` / `.card-title {}` / `.card-highlighted {}` CodeCallout | WhatIsTailwind test 7 (regex match) |

All 4 success criteria satisfied via automated tests. Manual 1920px legibility verification deferred to `/gsd-verify-work` (per 08-VALIDATION.md Manual-Only table).

## Locked Decisions Implemented

All 16 D-XX decisions from CONTEXT.md satisfied:

- D-01: Free scroll, natural spacing — section spacers used (no viewport-fit)
- D-02: Philosophy intro is full-width banner section — implemented as Section 1
- D-03: Spacing-only section separators (`mt-16 3xl:mt-24`) — no border dividers
- D-04: 3 problem cards — all three present
- D-05: `grid grid-cols-3` for problem cards — implemented
- D-06: No icons or emoji on problem cards — only text
- D-07: ButtonComparison replaced by SemanticButton + UtilityButton — done
- D-08: No click-to-reveal; BTN_CSS_DEFINITION always visible — SemanticButton from Plan 02
- D-09: SemanticButton keeps "use client" — SemanticButton.tsx from Plan 02
- D-10: Left column = full semantic story (SemanticButton + naming card) — implemented
- D-11: Right column = full Tailwind story (UtilityButton + Tailwind card) — implemented
- D-12: Overlines follow Phase 2 pattern (text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400) — implemented
- D-13: Naming card in LEFT column — implemented (Pitfall 1 avoided)
- D-14: Naming card framed as "With Semantic CSS" overline + "Card Component" heading — implemented
- D-15: Naming card has visible card shell using CARD_CLASSES — implemented
- D-16: Single-source const for naming card class string — `CARD_CLASSES` drives both shell and CodeCallout

## Deviations from Plan

None — plan executed exactly as written. The page.tsx implementation matches the action block verbatim.

## Manual Verification Deferred

Per `08-VALIDATION.md` Manual-Only table, these items are deferred to `/gsd-verify-work`:
- 1920px legibility of problem cards and philosophy intro at TV scale
- Dark mode visual check (dark: classes are present; visual check requires browser)
- Three-column problem grid readable at TV distance (automated tests cannot verify visual sizing)

## Known Stubs

None — all four sections render real, wired content. No hardcoded empty values, no placeholder text, no components with unwired data sources.

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes introduced. All content is static hardcoded markup. T-08-07 and T-08-08 mitigations verified:
- CARD_CLASSES and NAMING_CALLOUT are static template/string literals (no dynamic interpolation)
- No `dangerouslySetInnerHTML` anywhere in page.tsx
- CodeCallout renders `classes` as a text node (React automatic escaping preserved)

## Self-Check: PASSED

- [x] `src/app/what-is-tailwind/page.tsx` exists and is 125 lines (>= 90)
- [x] `grep -c "use client" page.tsx` returns 0
- [x] `grep -c "ButtonComparison" page.tsx` returns 0
- [x] `src/components/ButtonComparison.tsx` does NOT exist
- [x] `grep -r "import.*ButtonComparison" src/` returns 0 matches
- [x] Commit c881f4c verified in git log
- [x] Commit 57042fe verified in git log
- [x] All 94 tests pass (`yarn test --run` exits 0)
- [x] `yarn build` exits 0
