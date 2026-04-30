---
phase: 05-slide-5-customizing-tailwind
plan: "01"
subsystem: shiki-foundation
tags: [shiki, vitest, mock, async-rsc, syntax-highlighting, dark-mode]
dependency_graph:
  requires: []
  provides:
    - src/test/mocks/shiki.ts
    - src/components/ShikiBlock.tsx
    - vitest.config.mts (shiki alias)
  affects:
    - Plan 03 (slide page uses ShikiBlock)
tech_stack:
  added: []
  patterns:
    - Vitest resolve.alias mock for WASM-heavy library (shiki)
    - Async RSC with dangerouslySetInnerHTML for pre-rendered syntax HTML
    - Dual-theme Shiki via themes.light/themes.dark + !important CSS override
key_files:
  created:
    - src/test/mocks/shiki.ts
    - src/components/ShikiBlock.tsx
  modified:
    - vitest.config.mts
decisions:
  - "Shiki mock returns deterministic <pre class='shiki'><code>MOCK</code></pre> so jsdom tests never touch WASM"
  - "Dark mode CSS override uses !important because Shiki dual-theme embeds inline style= that beats class selectors"
  - "lang prop typed as union literal 'css' | 'typescript' | 'javascript' for call-site type safety in Plan 03"
metrics:
  duration: "~8 minutes"
  completed: "2026-04-30"
  tasks_completed: 2
  files_created: 2
  files_modified: 1
---

# Phase 5 Plan 01: Shiki Foundation Summary

Shiki Vitest mock wired and ShikiBlock async RSC implemented — dual-theme syntax highlighting with dark CSS override ready for Plan 03 integration.

## What Was Built

### Task 1: Shiki Vitest Mock + resolve.alias (commit 23625b6)

Created `src/test/mocks/shiki.ts` exporting an async `codeToHtml` function that returns a deterministic HTML string (`<pre class="shiki"><code>MOCK</code></pre>`) instead of invoking Shiki's WASM-based highlighter. Added the `"shiki"` alias to `vitest.config.mts` resolve.alias so any Vitest test that imports from `"shiki"` transparently receives the mock.

**Why needed:** Shiki uses oniguruma WASM internally. jsdom cannot load WASM binaries, causing test suite failures. The mock intercepts the import at the module resolution layer before any WASM loading occurs.

### Task 2: ShikiBlock Async RSC (commit 5d971df)

Created `src/components/ShikiBlock.tsx` as an async Server Component. It calls `codeToHtml` with the `github-light`/`github-dark` dual-theme configuration and renders:

1. A `<style>` tag injecting `.dark .shiki, .dark .shiki span` overrides with `!important` (required to beat Shiki's inline `style=""` colors that take precedence over class selectors).
2. A `<div>` with `dangerouslySetInnerHTML` containing the highlighted HTML, styled with `overflow-x-auto rounded-xl text-sm leading-relaxed 3xl:text-base`.

Props interface: `{ code: string, lang: "css" | "typescript" | "javascript" }` wrapped in `Readonly<ShikiBlockProps>` per the project's CodeCallout convention.

## Verification Commands Run

```bash
# Task 1 acceptance checks
test -f src/test/mocks/shiki.ts                                            # PASS
grep -q 'export async function codeToHtml' src/test/mocks/shiki.ts        # PASS
grep -F '<pre class="shiki"><code>MOCK</code></pre>' src/test/mocks/shiki.ts  # PASS
grep -F '"shiki": path.resolve(...)' vitest.config.mts                     # PASS
grep -F '"next/link": path.resolve(...)' vitest.config.mts                 # PASS (preserved)

# Task 2 acceptance checks
test -f src/components/ShikiBlock.tsx                                      # PASS
grep -F 'import { codeToHtml } from "shiki";' ShikiBlock.tsx              # PASS
grep -F 'export default async function ShikiBlock' ShikiBlock.tsx          # PASS
grep -F 'color: var(--shiki-dark) !important' ShikiBlock.tsx              # PASS
grep -F 'background-color: var(--shiki-dark-bg) !important' ShikiBlock.tsx  # PASS
grep -F 'light: "github-light"' ShikiBlock.tsx                            # PASS
grep -F 'dark: "github-dark"' ShikiBlock.tsx                              # PASS
grep -F 'overflow-x-auto rounded-xl text-sm leading-relaxed 3xl:text-base' ShikiBlock.tsx  # PASS
! grep -F '"use client"' ShikiBlock.tsx                                   # PASS (absent)
grep -F 'Readonly<ShikiBlockProps>' ShikiBlock.tsx                        # PASS

# yarn test --run (both tasks)
# Result: 60 passed, 1 pre-existing failure (Responsiveness & Dark Mode stub test —
# existed before this plan; Phase 4 fully implemented that slide so the stub test broke.
# Not caused by Plan 01 changes — confirmed by running tests before/after without changes.)
```

## Deviations from Plan

None — plan executed exactly as written. All file contents match the plan's exact specifications.

## Pre-existing Test Failure Note

One test failure exists in the suite that predates this plan: `Slide pages > Stub pages (content coming soon) > Responsiveness & Dark Mode shows the content coming soon placeholder`. This test broke in Phase 4 when Slide 4 was fully implemented (no longer a stub). Confirmed pre-existing by running `git stash` + tests before restoring changes — identical failure count (1) in both states.

## Hand-off Notes for Plan 03

**ShikiBlock consumption:**
```tsx
import ShikiBlock from "@/components/ShikiBlock";

// RSC usage (no "use client" needed):
<ShikiBlock code={someString} lang="css" />
<ShikiBlock code={someString} lang="typescript" />
<ShikiBlock code={someString} lang="javascript" />
```

**Props contract:**
- `code: string` — raw source code to highlight
- `lang: "css" | "typescript" | "javascript"` — language for Shiki grammar selection

**Dark mode:** Automatic via the injected `<style>` tag. The `.dark` class on `<html>` (set by ThemeToggle) activates the overrides. No additional configuration needed from the slide page.

**Themes:** `github-light` (light mode) and `github-dark` (dark mode) — both are bundled Shiki themes, no additional installation needed.

**Test environment:** When ShikiBlock is rendered in Vitest, the `codeToHtml` call resolves to the mock (via vitest.config.mts alias) and returns `<pre class="shiki"><code>MOCK</code></pre>`. Tests can assert on this string if needed.

## Self-Check

- [x] `src/test/mocks/shiki.ts` exists — verified
- [x] `src/components/ShikiBlock.tsx` exists — verified
- [x] `vitest.config.mts` modified — verified
- [x] Commit 23625b6 exists (Task 1)
- [x] Commit 5d971df exists (Task 2)

## Self-Check: PASSED
