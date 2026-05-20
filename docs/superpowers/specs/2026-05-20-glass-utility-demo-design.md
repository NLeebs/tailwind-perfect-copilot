# Glass Utility Demo — Custom Utilities Slide

**Date:** 2026-05-20
**Slide:** `src/app/customizing-tailwind/page.tsx` — Section 2 (Custom Utilities)

## Problem

The current `@utility scrollbar-hidden` demo is invisible: hiding scrollbars produces no visible output without a contrived scrollable container. On a TV-sized presentation screen, the demo communicates nothing.

## Solution

Replace `scrollbar-hidden` with a `glass` utility (glassmorphism effect) that is unmistakably visible at any screen size.

## Changes

### `src/app/globals.css`

Remove `@utility scrollbar-hidden` block. Add:

```css
@utility glass {
  backdrop-filter: blur(12px);
  background: oklch(100% 0 0 / 0.1);
  border: 1px solid oklch(100% 0 0 / 0.2);
}
```

### `src/app/customizing-tailwind/page.tsx`

**Constants — update:**
- `UTILITY_SNIPPET`: update CSS to show the `glass` utility body above
- `CUSTOM_UTILITY_CLASSES` (new): usage string `glass rounded-2xl p-6` for `CodeCallout`
- Remove `V3_EQUIVALENT` constant entirely

**Right column — replace V3 equivalent block with:**
- Gradient container (`bg-linear-to-br from-indigo-500 to-pink-500`) filling the column, `rounded-2xl`, some padding
- Inside: a centered card using the `glass` utility, containing a bold heading "Frosted Glass" and a small subtitle "backdrop-filter + bg opacity + border"
- Below: `CodeCallout` showing the `CUSTOM_UTILITY_CLASSES` usage string

**Left column** — unchanged (`ShikiBlock` showing the utility CSS).

## Constraints

- The `glass` card text must be readable in both light and dark mode (white text works since it's over a dark gradient)
- Must include `3xl:` escalations on text/spacing per project conventions
- No `"use client"` needed — this is a purely visual RSC demo
- Do not use dynamic class interpolation; all Tailwind classes must be static strings
