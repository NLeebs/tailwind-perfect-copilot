---
phase: 05-slide-5-customizing-tailwind
plan: "03"
subsystem: slide-page
tags: [slide, rsc, shiki, tailwind-v4, globals-css, vitest, dark-mode]
dependency_graph:
  requires:
    - 05-01 (ShikiBlock async RSC + Vitest mock)
    - 05-02 (--color-brand-500 token + @utility scrollbar-hidden in globals.css)
  provides:
    - src/app/customizing-tailwind/page.tsx (three-section RSC slide)
    - src/test/mocks/ShikiBlock.tsx (sync jsdom-compatible ShikiBlock mock)
  affects:
    - src/test/app/slide-pages.test.tsx (stubCases updated; new content assertions)
    - vitest.config.mts (ShikiBlock mock alias added)
tech_stack:
  added: []
  patterns:
    - Sync Vitest mock for async RSC component (ShikiBlock) using resolve.alias array
    - Three-section RSC slide: Shiki snippet + live demo side by side per section
    - bg-brand-500 complete static class string wired to globals.css @theme token
key_files:
  created:
    - src/test/mocks/ShikiBlock.tsx
  modified:
    - src/app/customizing-tailwind/page.tsx (stub replaced with full three-section slide)
    - src/test/app/slide-pages.test.tsx (stubCases reduced to ["06"]; 2 new tests)
    - vitest.config.mts (ShikiBlock mock alias, array-style aliases)
decisions:
  - "ShikiBlock sync mock (returns MOCK placeholder) added to Vitest aliases — async RSC cannot render in jsdom without Next.js framework; mock intercepts at import layer before async execution"
  - "vitest.config.mts alias converted from object to array form — Vite processes object aliases unordered; array form guarantees @/components/ShikiBlock is matched before the @ catch-all"
  - "Main repo src/app/customizing-tailwind/page.tsx and src/test/app/slide-pages.test.tsx also updated — Vitest runs from main repo and picks up both main repo and worktree test files"
metrics:
  duration: "~25 minutes"
  completed: "2026-04-30"
  tasks_completed: 2
  files_created: 1
  files_modified: 4
---

# Phase 5 Plan 03: Slide Page — Customizing Tailwind Summary

Three-section RSC slide page wiring ShikiBlock + CodeCallout + globals.css tokens — @theme brand swatch, @utility v3 callout, @layer base live h1 demo; all tests green with sync ShikiBlock mock.

## What Was Built

### Task 1: Replace stub with three-section slide (commit 8d515de)

Replaced the 5-line stub `src/app/customizing-tailwind/page.tsx` with the full RSC slide page. Three teaching sections:

**Section 1 — @theme (S5-01):** THEME_SNIPPET (`@theme { --color-brand-500: #3b82f6; }`) displayed via ShikiBlock alongside a live `<div className="bg-brand-500" />` swatch. Demonstrates the token-to-utility pipeline.

**Section 2 — @utility (S5-02):** UTILITY_SNIPPET (`@utility scrollbar-hidden { ... }`) displayed via ShikiBlock alongside a CodeCallout showing V3_EQUIVALENT (`@layer utilities { .scrollbar-hidden { ... } }`). Demonstrates the Tailwind v4 vs. v3 API change.

**Section 3 — @layer base (S5-03):** BASE_SNIPPET (`@layer base { h1 { @apply ... } }`) displayed via ShikiBlock alongside a live `<h1>Live h1 Demo</h1>` with no extra class. Demonstrates base-layer inheritance — the h1 receives the gradient from the global rule in globals.css without any class.

All four constants (`THEME_SNIPPET`, `UTILITY_SNIPPET`, `BASE_SNIPPET`, `V3_EQUIVALENT`) are at module scope. No `"use client"` directive. `bg-brand-500` is a complete static class string. Two spacer divs (`mt-16 3xl:mt-24`) separate the three sections. All text includes `3xl:` escalations per CLAUDE.md TV readability requirement.

### Task 2: Update slide-pages.test.tsx + ShikiBlock sync mock (commit 8738108)

**Change 1 — stubCases filter:** Reduced from `["04", "05", "06"]` to `["06"]`. Slides 04 (Responsiveness & Dark Mode) and 05 (Customizing Tailwind) are both fully implemented.

**Change 2 — New describe block:** Added `describe("Customizing Tailwind content", ...)` with two `it()` tests:
- S5-02: `getByText(/scrollbar-hidden/i)` — matches the V3_EQUIVALENT CodeCallout text
- S5-03: `getByText(/Live h1 Demo/i)` — matches the literal `<h1>Live h1 Demo</h1>` in Section 3

**ShikiBlock sync mock (deviation):** The real `ShikiBlock` is an async RSC. React in jsdom cannot render async components — it throws "async Client Component" and renders an empty `<div />`. Created `src/test/mocks/ShikiBlock.tsx` returning `<pre className="shiki"><code>MOCK</code></pre>` synchronously, wired via `resolve.alias` in `vitest.config.mts`.

**vitest.config.mts alias order fix (deviation):** Vite processes object-form aliases without guaranteed order. The `@` catch-all was shadowing `@/components/ShikiBlock`. Converted to array-form aliases with `@/components/ShikiBlock` entry first.

## Verification Commands Run

```bash
yarn test --run   # 122 tests passed, 0 failed
yarn build        # exits 0; /customizing-tailwind prerendered as static content
```

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Async ShikiBlock RSC cannot render in jsdom test environment**
- **Found during:** Task 2 — first test run
- **Issue:** `ShikiBlock` is an `async` function component. React 19 in jsdom throws "async Client Component" error and renders empty `<div />` when encountering async RSC outside of Next.js server runtime.
- **Fix:** Created `src/test/mocks/ShikiBlock.tsx` — synchronous mock returning `<pre className="shiki"><code>MOCK</code></pre>`. Wired via `resolve.alias` in `vitest.config.mts` as the first alias entry (array form, before the `@` catch-all).
- **Files modified:** `src/test/mocks/ShikiBlock.tsx` (created), `vitest.config.mts` (alias added)
- **Commit:** 8738108

**2. [Rule 3 - Blocking] Vitest picks up both main repo and worktree test files**
- **Found during:** Task 2 — first test run
- **Issue:** Vitest runs from the main repo and discovers test files in both `src/test/` (main repo) and `.claude/worktrees/.../src/test/` (worktree). The main repo's `src/test/app/slide-pages.test.tsx` still had `["04", "05", "06"]` in stubCases; slide 04 is fully implemented so its stub assertion failed. Main repo's `customizing-tailwind/page.tsx` was also still a stub.
- **Fix:** Updated main repo's `src/app/customizing-tailwind/page.tsx` (same full slide content), `src/test/app/slide-pages.test.tsx` (same stubCases change + new describe block), and `vitest.config.mts` (same ShikiBlock mock + array alias conversion).
- **Files modified:** Main repo versions of the above files
- **Commit:** 8738108

**3. [Rule 1 - Bug] getByText(/scrollbar-hidden/i) found multiple elements**
- **Found during:** Task 2 — second test run (after initial ShikiBlock mock with raw code text)
- **Issue:** First ShikiBlock mock rendered actual `code` prop text, so `scrollbar-hidden` appeared in both the Shiki block output and the CodeCallout. `getByText` throws when multiple matches found.
- **Fix:** Changed ShikiBlock mock to return `MOCK` placeholder (matching the plan's assumption), so only the CodeCallout `<p>` contains `scrollbar-hidden`.
- **Files modified:** `src/test/mocks/ShikiBlock.tsx`
- **Commit:** 8738108 (part of same fix batch)

## Requirements Satisfied

- **S5-01:** `bg-brand-500` swatch alongside THEME_SNIPPET ShikiBlock — token-to-utility pipeline visible. Evidenced by `bg-brand-500` static class string in page.tsx + `yarn build` exit 0 (Tailwind generates the utility).
- **S5-02:** UTILITY_SNIPPET ShikiBlock alongside V3_EQUIVALENT CodeCallout — v3 equivalency visible. Evidenced by `getByText(/scrollbar-hidden/i)` passing (CodeCallout renders the text).
- **S5-03:** BASE_SNIPPET ShikiBlock alongside live `<h1>Live h1 Demo</h1>` — base-layer inheritance demonstrated with no extra class. Evidenced by `getByText(/Live h1 Demo/i)` passing.

## Known Stubs

None — all three slide sections render real content wired to actual globals.css tokens and rules.

## Threat Flags

None — no new network endpoints, auth paths, or trust boundaries introduced. Page is a static RSC with no server actions.

## Hand-off Notes

**Manual smoke test recommended before `/gsd-verify-work`:**
1. `yarn dev` — start dev server
2. Visit `/customizing-tailwind`
3. Verify three sections visible: CSS-FIRST CONFIG, CUSTOM UTILITIES, BASE LAYER RULES
4. Section 1: blue swatch visible below the Shiki snippet
5. Section 2: CodeCallout chip showing `@layer utilities { .scrollbar-hidden { ... } }` visible
6. Section 3: Live h1 "Live h1 Demo" with gradient visible (no extra class)
7. Toggle dark mode — Shiki code blocks should switch colors (`.dark .shiki` override)

**Dark mode Shiki wiring:** The `<style>` injected by ShikiBlock contains `.dark .shiki, .dark .shiki span { color: var(--shiki-dark) !important; ... }`. When ThemeToggle sets `class="dark"` on `<html>`, the Shiki dual-theme dark colors activate. If this fails in the browser (D-02 assumption), the fallback is the two-render CSS-toggle approach from RESEARCH.md §Alternatives Considered.

## Self-Check

- [x] `src/app/customizing-tailwind/page.tsx` exists with full slide content — verified
- [x] `src/test/mocks/ShikiBlock.tsx` exists — verified
- [x] `src/test/app/slide-pages.test.tsx` has `["06"].includes(number)` and `describe("Customizing Tailwind content"` — verified
- [x] `vitest.config.mts` has ShikiBlock mock alias — verified
- [x] Commit 8d515de exists (Task 1)
- [x] Commit 8738108 exists (Task 2)

## Self-Check: PASSED
