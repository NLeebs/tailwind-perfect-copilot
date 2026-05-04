---
phase: 06-slide-6-conditional-styling
plan: "01"
subsystem: components
tags: [client-island, conditional-styling, tailwind-variants, lookup-table, single-source-consts]
dependency_graph:
  requires:
    - src/components/CodeCallout.tsx
    - src/lib/utils.ts
  provides:
    - src/components/ConditionalPanels.tsx
  affects:
    - src/app/conditional-styling/page.tsx (future import in 06-03)
tech_stack:
  added: []
  patterns:
    - Lookup-table map (PANEL3_CLASSES) for React state toggle — complete static strings, no dynamic interpolation
    - Single-source const pattern — 6 module-scope consts shared between element classNames and CodeCallout.classes props
    - Leaf-node "use client" island — useState lives here, page.tsx stays RSC
key_files:
  created:
    - src/components/ConditionalPanels.tsx
  modified: []
decisions:
  - PANEL3_CLASSES uses Record<"active" | "inactive", string> with complete static class strings per CLAUDE.md lookup-table rule
  - GROUP_CALLOUT (not GROUP_AVATAR_CLASSES) shown in Panel 2 CodeCallout — teaching string vs. applied classes are distinct consts
  - Template literal `${OVERLINE}` used for three overline paragraphs — valid because OVERLINE is a complete static style string (not a partial class name), consistent with plan action spec
metrics:
  duration: "~5 minutes"
  completed: "2026-05-04T15:41:57Z"
  tasks_completed: 1
  tasks_total: 1
  files_created: 1
  files_modified: 0
---

# Phase 06 Plan 01: ConditionalPanels Client Island Summary

**One-liner:** Three-panel CSS/group/React-state comparison island using single-source consts and a PANEL3_CLASSES lookup-table map for Tailwind-safe conditional styling.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create ConditionalPanels.tsx client island | 62d6378 | src/components/ConditionalPanels.tsx |

## What Was Built

`src/components/ConditionalPanels.tsx` — a `"use client"` island that renders all of Section 1 of the Conditional Styling slide. Three panels in a `grid grid-cols-3 gap-6 3xl:gap-8` layout:

- **Panel 1 (CSS VARIANTS):** Demo card with `HOVER_CLASSES = "hover:bg-sky-50 dark:hover:bg-slate-700"` applied directly; same const fed to `<CodeCallout classes={HOVER_CLASSES} />`.
- **Panel 2 (GROUP VARIANTS):** Parent `div` with `group` class; avatar child carries `GROUP_AVATAR_CLASSES` (scale + color shift); text child carries `GROUP_TEXT_CLASSES`; CodeCallout shows `GROUP_CALLOUT = "group-hover:scale-105 group-hover:shadow-lg"`.
- **Panel 3 (REACT STATE):** `useState(false)` drives `isActive`; `PANEL3_CLASSES` lookup-table map provides complete static class strings for `active` and `inactive` states; `cn()` composes base classes with the map value; CodeCallout shows `STATE_CALLOUT` (the `cn()` call as a readable string).

Every panel has an overline label, demo card, CodeCallout, and sub-label, all conforming to the established Phase 2–5 overline/sub-label style and the 06-UI-SPEC escalation table.

## Verification Results

```
grep -c '"use client"' src/components/ConditionalPanels.tsx  → 1 ✓
grep -c 'HOVER_CLASSES|...|PANEL3_CLASSES' ...              → 15 ✓ (declarations + usages)
grep '`.*\${' for dynamic interpolation                     → 3 (all are ${OVERLINE} — static const, not partial class construction) ✓
No "use client" in page.tsx                                 → 0 ✓
yarn test --run (61 tests)                                  → 61 passed ✓
```

## Deviations from Plan

None — plan executed exactly as written. The three `${OVERLINE}` template literal usages match the plan's provided implementation verbatim and are semantically correct (inserting a full static style string, not constructing partial Tailwind class names).

## Known Stubs

None. This island renders complete content on first load. Panel 3 initial state (isActive=false) shows "Status: Inactive" which is the intended initial display, not a stub.

## Threat Flags

None. This component handles only ephemeral boolean state with no user data, no server interaction, and no PII. No new security surface introduced.

## Self-Check: PASSED

| Check | Result |
|-------|--------|
| src/components/ConditionalPanels.tsx exists | FOUND |
| Commit 62d6378 exists | FOUND |
| 06-01-SUMMARY.md exists | FOUND |
