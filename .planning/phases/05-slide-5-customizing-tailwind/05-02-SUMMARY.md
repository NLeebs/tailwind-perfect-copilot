---
phase: 05-slide-5-customizing-tailwind
plan: "02"
subsystem: globals-css
tags: [tailwind-v4, theme-token, utility-directive, css-config]
dependency_graph:
  requires: []
  provides:
    - "--color-brand-500 design token (plain @theme block) → bg-brand-500 Tailwind utility class"
    - "@utility scrollbar-hidden rule → scrollbar-hidden CSS class"
  affects:
    - "src/app/globals.css"
    - "Plan 03 (consumes bg-brand-500 and scrollbar-hidden snippet)"
tech_stack:
  added: []
  patterns:
    - "Tailwind v4 plain @theme block for utility-generating design tokens"
    - "Tailwind v4 @utility directive for custom CSS class definition"
key_files:
  created: []
  modified:
    - "src/app/globals.css"
decisions:
  - "Used scrollbar-width: none (not overflow: hidden) for scrollbar-hidden — narrower, cleaner demo; does not change box model behavior"
  - "Added --color-brand-500 to plain @theme block (NOT @theme inline) — plain @theme generates utility classes; @theme inline suppresses generation per Tailwind v4 semantics"
metrics:
  duration: "~5 minutes"
  completed: "2026-04-30"
  tasks_completed: 2
  files_modified: 1
---

# Phase 05 Plan 02: globals.css Token and Utility Additions Summary

One-liner: Added `--color-brand-500: #3b82f6` to the plain `@theme` block and appended `@utility scrollbar-hidden { scrollbar-width: none; }` to `globals.css`, verified by `yarn build` exit 0.

## What Was Done

### Task 1: Add --color-brand-500 to the plain @theme block
- Located the plain `@theme {}` block (lines 41–46 in final file) — distinct from the `@theme inline {}` block at the top.
- Inserted `--color-brand-500: #3b82f6;` as the last token before the closing brace.
- The `inline` keyword in `@theme inline` suppresses Tailwind utility class generation. Adding the token to the PLAIN `@theme` block ensures `bg-brand-500` is generated as a real utility class.
- Commit: `6f0ff03`

### Task 2: Append @utility scrollbar-hidden rule and verify yarn build
- Appended `@utility scrollbar-hidden { scrollbar-width: none; }` as a new top-level block after the plain `@theme {}` closing brace, separated by one blank line (matching existing file style).
- Chose `scrollbar-width: none` per CONTEXT.md D-09 discretion — narrower scope than `overflow: hidden`, does not affect box model.
- Ran `yarn build` → exit 0. Compiled successfully in 1701ms; all 10 static pages generated.
- Commit: `086ad1f`

## Verification Commands Run

```bash
grep -q "^  --color-brand-500: #3b82f6;$" src/app/globals.css          # PASS
awk '/^@theme \{/{flag=1} flag && /--color-brand-500/{found=1; exit} END{exit !found}' # PASS
awk '/^@theme inline \{/,/^\}/' | grep -q -- '--color-brand-500'       # PASS (NOT in inline)
grep -q "^@utility scrollbar-hidden {" src/app/globals.css              # PASS
grep -q "^  scrollbar-width: none;" src/app/globals.css                 # PASS
yarn build                                                               # exit 0
```

## Confirmation: --color-brand-500 is in PLAIN @theme, NOT @theme inline

The file contains two `@theme` blocks:
- `@theme inline { ... }` — near the top, contains `--color-background`, `--color-foreground`, `--font-sans`, `--font-mono`. Does NOT contain `--color-brand-500`.
- `@theme { ... }` — near the bottom (plain, no `inline` keyword), contains `--breakpoint-3xl`, `--breakpoint-4xl`, `--animate-reveal-up`, and now `--color-brand-500: #3b82f6`. This block generates utility classes.

The awk verification script confirmed `--color-brand-500` is inside the plain block and NOT inside the inline block.

## Final globals.css State (bottom of file)

```css
@theme {
  --breakpoint-3xl: 1920px;
  --breakpoint-4xl: 2560px;
  --animate-reveal-up: reveal-up 0.7s ease-out both;
  --color-brand-500: #3b82f6;
}

@utility scrollbar-hidden {
  scrollbar-width: none;
}
```

## Hand-off Notes for Plan 03

- `bg-brand-500` is now a real, generated Tailwind utility class — Plan 03 can render `<div className="bg-brand-500" />` as a live color swatch without any risk of the class being purged.
- The `@utility scrollbar-hidden` snippet displayed via Shiki in Section 2 should use `scrollbar-width: none` in the snippet string (not `overflow: hidden`) to match the actual code in `globals.css`.
- The existing `@layer base { h1 { ... } }` gradient rule is unchanged — Plan 03's Section 3 can display it verbatim.

## Deviations from Plan

None — plan executed exactly as written. Both tasks completed in sequence with all acceptance criteria passing.

## Known Stubs

None — this plan only modifies CSS; no UI rendering involved.

## Threat Flags

None — `globals.css` modifications are pure CSS token and utility additions; no new network endpoints, auth paths, or trust boundaries introduced.

## Self-Check: PASSED

- `src/app/globals.css` exists and contains both additions: confirmed by grep commands above.
- Task 1 commit `6f0ff03` exists: verified via git log.
- Task 2 commit `086ad1f` exists: verified via git log.
- `yarn build` exit 0: confirmed in build output above.
