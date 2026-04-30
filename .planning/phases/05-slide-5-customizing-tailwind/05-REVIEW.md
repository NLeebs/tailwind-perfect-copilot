---
phase: 05-slide-5-customizing-tailwind
reviewed: 2026-04-30T00:00:00Z
depth: standard
files_reviewed: 7
files_reviewed_list:
  - src/test/mocks/shiki.ts
  - src/components/ShikiBlock.tsx
  - vitest.config.mts
  - src/app/globals.css
  - src/test/mocks/ShikiBlock.tsx
  - src/app/customizing-tailwind/page.tsx
  - src/test/app/slide-pages.test.tsx
findings:
  critical: 0
  warning: 3
  info: 3
  total: 6
status: issues_found
---

# Phase 05: Code Review Report

**Reviewed:** 2026-04-30
**Depth:** standard
**Files Reviewed:** 7
**Status:** issues_found

## Summary

Seven files were reviewed covering the Shiki syntax-highlighter integration, the Customizing Tailwind slide page, global CSS additions, and the test suite. The implementation is structurally sound: the RSC/client boundary is respected, the dual-alias strategy (one alias for `shiki` module, one for the full `ShikiBlock` component) correctly sidesteps jsdom's WASM limitation, and the slide page follows project conventions. No security vulnerabilities or data-loss risks were found.

Three warnings require attention: a missing test for the `@theme` section (S5-01), a hard-coded two-column grid that will collapse illegibly on narrow viewports, and the `scrollbar-hidden` `@utility` lacking the `-webkit-scrollbar` rule needed for Chromium. Three informational items cover test stubs left in the array, the `dangerouslySetInnerHTML` dual usage in `ShikiBlock`, and the absence of `4xl:` escalations on the slide page content.

---

## Warnings

### WR-01: No test asserts the @theme brand-500 section renders (S5-01 gap)

**File:** `src/test/app/slide-pages.test.tsx:53-63`

**Issue:** The `"Customizing Tailwind content"` describe block covers S5-02 (`scrollbar-hidden` callout) and S5-03 (live h1 demo) but has no assertion for S5-01 — the `@theme` section that renders the `bg-brand-500` swatch via `ShikiBlock`. If the `@theme` ShikiBlock or its surrounding markup were removed or broken the test suite would still pass. The comment style `(S5-02)` and `(S5-03)` makes the numbering gap conspicuous.

**Fix:** Add a third test that verifies the @theme section rendered:

```typescript
it("renders the @theme brand-500 color token section (S5-01)", () => {
  render(<CustomizingTailwind />);
  expect(screen.getByText(/bg-brand-500/i)).toBeInTheDocument();
});
```

The text `"bg-brand-500 — auto-generated from the token above"` in `page.tsx:41` provides a stable assertion target without needing to inspect the Shiki mock output.

---

### WR-02: `grid-cols-2` is fixed — no responsive column fallback

**File:** `src/app/customizing-tailwind/page.tsx:36, 54, 72`

**Issue:** All three section grids use `grid grid-cols-2` with no responsive prefix (`md:grid-cols-2` or similar). CLAUDE.md specifies this is a presentation app primarily targeted at TV-scale displays (3xl / 4xl), so narrow-viewport collapse may be acceptable. However, the project's own "Adding a new slide" guide says to include `3xl:` escalations but says nothing about removing lower-breakpoint responsiveness. At any viewport width below where a two-column grid works (roughly `<768px` depending on content), the ShikiBlock and demo column will be squeezed to half the available width with no wrapping, making the code illegible.

**Fix:** Add a `sm:` or `md:` prefixed single-column fallback and escalate to two columns at a comfortable breakpoint:

```html
<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 3xl:gap-12 3xl:mt-12">
```

---

### WR-03: `@utility scrollbar-hidden` is incomplete — missing `-webkit-scrollbar` rule

**File:** `src/app/globals.css:48-50`

**Issue:** The utility only sets `scrollbar-width: none`, which works in Firefox. Chromium-based browsers (Chrome, Edge, Arc) require `display: none` on the `::-webkit-scrollbar` pseudo-element to hide scrollbars. The slide page teaches this utility as a real-world pattern via `UTILITY_SNIPPET` (page.tsx:9-11), so the underlying implementation being incomplete undermines the demo's credibility and can silently ship visible scrollbars.

**Fix:**

```css
@utility scrollbar-hidden {
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
```

Note that the `UTILITY_SNIPPET` constant in `page.tsx` used as the Shiki display code should be updated to match, so the slide accurately shows the complete implementation.

---

## Info

### IN-01: `dangerouslySetInnerHTML` used twice in a single RSC — consider consolidation

**File:** `src/components/ShikiBlock.tsx:26-29`

**Issue:** `ShikiBlock` injects a `<style>` tag via `dangerouslySetInnerHTML` on every render (once per ShikiBlock instance on a page). The slide page renders ShikiBlock three times, meaning `DARK_OVERRIDES` is emitted as three identical inline `<style>` blocks in the final HTML. This is not a security issue — `DARK_OVERRIDES` is a module-level constant with no user input — but it creates duplicated markup.

**Fix:** Move `DARK_OVERRIDES` into `globals.css` (or a dedicated `shiki.css` file imported in the root layout), and remove the `<style dangerouslySetInnerHTML>` line from `ShikiBlock`. The CSS is static and belongs in the stylesheet layer.

---

### IN-02: `stubCases` filter in slide-pages.test.tsx will silently pass once ConditionalStyling is implemented

**File:** `src/test/app/slide-pages.test.tsx:22-24`

**Issue:** The `stubCases` array is derived by hardcoding `["06"]` as a filter. When ConditionalStyling (slide 06) is implemented, the "content coming soon" text will no longer be present, but the test `${title} shows the content coming soon placeholder` will fail with a "not found" error rather than being removed. This is a latent failure — it won't affect the current test run but will require manual cleanup after the next phase.

**Fix:** When implementing slide 06, remove `"06"` from the filter array and delete the corresponding stub test, or restructure the pattern so implemented slides are not listed in `stubCases` at all.

---

### IN-03: No `4xl:` breakpoint escalations on slide page content

**File:** `src/app/customizing-tailwind/page.tsx` (entire file)

**Issue:** CLAUDE.md defines a `4xl` breakpoint at 2560px for large-display scaling and the `SlideLayout` component itself uses `4xl:max-w-600` on the main container. None of the text, spacing, or layout classes in `customizing-tailwind/page.tsx` include `4xl:` escalations, whereas other architectural elements (e.g., `SlideLayout`) do. At 2560px the content will be constrained by `SlideLayout`'s `4xl:max-w-600` but individual text sizes will remain at `3xl:` scale, which may look undersized relative to the container change.

**Fix:** Audit the typography and spacing tokens on each section and add `4xl:` escalations following the pattern used in `SlideLayout`:

```html
<!-- Example for section labels -->
<p className="text-xs ... 3xl:text-base 4xl:text-lg">

<!-- Example for body text -->
<p className="text-sm ... 3xl:text-lg 4xl:text-xl">
```

---

_Reviewed: 2026-04-30_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
