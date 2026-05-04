---
phase: 07-tv-readability-quality-pass
reviewed: 2026-05-04T00:00:00Z
depth: standard
files_reviewed: 3
files_reviewed_list:
  - CLAUDE.md
  - eslint.config.mjs
  - src/app/globals.css
findings:
  critical: 0
  warning: 2
  info: 2
  total: 4
status: issues_found
---

# Phase 7: Code Review Report

**Reviewed:** 2026-05-04
**Depth:** standard
**Files Reviewed:** 3
**Status:** issues_found

## Summary

Three files were changed as part of the Phase 7 TV Readability & Quality Pass: `CLAUDE.md` (documentation of the new `5xl` breakpoint), `eslint.config.mjs` (worktree and coverage ignore additions), and `src/app/globals.css` (the actual `--breakpoint-5xl` CSS variable). The changes are small and targeted. Two warnings and two info-level findings were identified — no critical issues.

---

## Warnings

### WR-01: `@theme inline` block is missing the new breakpoints

**File:** `src/app/globals.css:10-15`
**Issue:** The file contains two separate `@theme` blocks: one at line 10 with the `inline` keyword (`@theme inline`) and one at line 41 without it (`@theme`). The breakpoints (`--breakpoint-3xl`, `--breakpoint-4xl`, `--breakpoint-5xl`) and animation/color tokens live in the non-`inline` block (line 41). In Tailwind CSS v4, `@theme inline` tells Tailwind to emit the values as CSS custom properties without generating utility class variants, while a bare `@theme` block registers tokens for utility generation. These are semantically different. The breakpoints must be in a bare `@theme` block (as they currently are) to generate responsive variants — that part is correct. However, the two-block split is fragile: colors and font aliases are in `@theme inline` while breakpoints, animation, and brand color are in `@theme`. The `--color-brand-500` token in the bare `@theme` block (line 46) will not receive the CSS-variable-indirection treatment that `@theme inline` provides, meaning it cannot be overridden at runtime via `:root` the way `--color-background` and `--color-foreground` can. This inconsistency is a latent confusion risk and a potential bug if a developer later tries to theme `brand-500` at runtime.
**Fix:** Decide intentionally which tokens need runtime CSS-variable indirection (`@theme inline`) vs. pure compile-time tokens (`@theme`). If `brand-500` is a static design token never overridden at runtime, its current placement is acceptable — add a comment making that explicit. If breakpoints and animations should also be static compile-time tokens, consolidate all non-overridable tokens into a single `@theme` block and keep only runtime-variable tokens in `@theme inline`.

```css
/* Option A: explicit separation with comments */
@theme inline {
  /* Runtime-overridable color aliases (resolved from :root custom properties) */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@theme {
  /* Static design tokens — not overridable at runtime */
  --breakpoint-3xl: 1920px;
  --breakpoint-4xl: 2560px;
  --breakpoint-5xl: 3840px;
  --animate-reveal-up: reveal-up 0.7s ease-out both;
  --color-brand-500: #3b82f6; /* static; add comment if intentional */
}
```

### WR-02: `scrollbar-hidden` utility is incomplete — only sets `scrollbar-width`, misses WebKit

**File:** `src/app/globals.css:49-51`
**Issue:** The `@utility scrollbar-hidden` block only sets `scrollbar-width: none`, which works in Firefox and Chromium (v121+). It does not include `::-webkit-scrollbar { display: none; }`. On Safari (including iOS Safari) versions that have not yet fully adopted the `scrollbar-width` standard, this utility class will appear to work but the scrollbar will remain visible. Given this app targets large-display TV/presentation contexts where Safari on macOS is a plausible browser, the missing vendor-specific rule is a silent visual failure.
**Fix:**
```css
@utility scrollbar-hidden {
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
```

---

## Info

### IN-01: CLAUDE.md "Adding a new slide" checklist only requires `3xl:` escalations — `4xl:` and `5xl:` are now also defined

**File:** `CLAUDE.md:64`
**Issue:** Line 64 says "Include `3xl:` size escalations on all text and spacing for TV readability." The Tailwind v4 specifics section (line 49) correctly documents all three breakpoints (`3xl`, `4xl`, `5xl`), but the actionable checklist for adding a new slide only mentions `3xl:`. This creates an inconsistency: a developer following the checklist step-by-step will add `3xl:` classes but may never think to consider `4xl:` or `5xl:`, defeating the purpose of adding those breakpoints.
**Fix:** Update the checklist step to reference all defined large-display breakpoints:
```
3. Include `3xl:`, `4xl:`, and `5xl:` size escalations on all text and spacing for TV readability.
```

### IN-02: `eslint.config.mjs` spreads two config arrays without a base config — relies entirely on Next.js presets

**File:** `eslint.config.mjs:5-20`
**Issue:** The config spreads `nextVitals` and `nextTs` and then adds `globalIgnores`. There is no project-local rule set. This is not a bug, but it means there is no enforcement of the project-specific coding conventions documented in `CLAUDE.md` (e.g., no `"use client"` on page files, no dynamic class interpolation). These are currently documentation-only rules with no lint enforcement. If a future contributor uses `` `bg-${color}-500` `` or adds `"use client"` to a `page.tsx`, no lint rule will catch it.
**Fix (optional):** Add a `rules` object to the ESLint config enforcing at minimum a `no-restricted-syntax` rule that catches template literals containing Tailwind class fragments. This is a suggestion, not a blocker for the current phase.

---

_Reviewed: 2026-05-04_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
