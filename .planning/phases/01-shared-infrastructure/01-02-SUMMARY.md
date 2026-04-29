---
phase: 01-shared-infrastructure
plan: "02"
subsystem: css-infrastructure
tags: [tailwind, dark-mode, globals-css, css-variant]
dependency_graph:
  requires: []
  provides: [single-source-dark-mode]
  affects: [all-slide-pages, theme-toggle]
tech_stack:
  added: []
  patterns: [class-based-dark-mode-only]
key_files:
  created: []
  modified:
    - src/app/globals.css
decisions:
  - "D-10 satisfied: prefers-color-scheme block removed; @custom-variant dark is the single dark mode source of truth"
metrics:
  duration: "~3 minutes"
  completed: "2026-04-29T13:56:16Z"
  tasks_completed: 1
  files_modified: 1
---

# Phase 1 Plan 02: Remove prefers-color-scheme Dark Mode Conflict Summary

**One-liner:** Deleted the `@media (prefers-color-scheme: dark)` block from `globals.css` so `@custom-variant dark` is the sole dark mode mechanism — ThemeToggle toggle state is now authoritative regardless of OS preference.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Remove prefers-color-scheme media query from globals.css | eb71424 | src/app/globals.css |

## What Was Built

Removed the 7-line `@media (prefers-color-scheme: dark)` block (former lines 17-22) from `src/app/globals.css`. This block set `--background: #0a0a0a` and `--foreground: #ededed` for OS-dark users, which competed with the class-based `@custom-variant dark` mechanism used by ThemeToggle.

With the block removed:
- ThemeToggle is the single authority over light/dark mode
- A dark-OS user who clicks ThemeToggle to "light" sees light mode (no OS override)
- Visual output is identical for the same toggle state regardless of OS preference
- `@custom-variant dark (&:where(.dark, .dark *))` remains on line 8 — unchanged

All other declarations preserved byte-identically:
- `@import "tailwindcss"` (line 1)
- `:root { --background: #ffffff; --foreground: #171717; }` (lines 3-6)
- `@custom-variant dark` (line 8)
- `@theme inline` block (lines 10-15)
- `body` block (lines 17-21)
- `@layer base h1` gradient rule (lines 23-27)
- `@keyframes reveal-up` and `@media (prefers-reduced-motion: reduce)` blocks (lines 29-39)
- `@theme { --breakpoint-3xl, --breakpoint-4xl, --animate-reveal-up }` block (lines 41-45)

## Verification Results

All acceptance criteria passed:

- `grep -c "prefers-color-scheme" src/app/globals.css` returns `0`
- `@custom-variant dark (&:where(.dark, .dark *));` present
- `@layer base` h1 gradient preserved
- `prefers-reduced-motion` media query preserved (not accidentally deleted)
- `--breakpoint-3xl: 1920px` present
- `--breakpoint-4xl: 2560px` present
- `--animate-reveal-up` present
- `yarn build` exits 0 — all 8 routes compiled (Tailwind, TypeScript, static generation all passed)

## Deviations from Plan

None — plan executed exactly as written. Single block deletion, verified by grep, confirmed by build.

## Known Stubs

None — this plan makes no UI changes and introduces no stub components.

## Threat Flags

None — pure static CSS file deletion in a presentation app. No new network endpoints, auth paths, file access patterns, or schema changes.

## Requirements Satisfied

- INFRA-03: `@custom-variant dark` is the single dark mode source of truth in globals.css
- D-10: `prefers-color-scheme` block removed entirely
- ROADMAP Phase 1 success criterion 3: identical visual results for same ThemeToggle state regardless of OS preference

## Self-Check

- [x] `src/app/globals.css` exists and contains no `prefers-color-scheme`
- [x] Commit eb71424 exists
- [x] `yarn build` passed (exit 0, 8 routes generated)

## Self-Check: PASSED
