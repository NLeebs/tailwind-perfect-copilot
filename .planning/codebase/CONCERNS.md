# Concerns & Tech Debt
*Mapped: 2026-04-28*

## Summary

This is a small, focused presentation app with a clean codebase. There are no critical issues. The concerns below are observations for when the project scope expands.

---

## Slide Content Completeness

**Severity:** Medium (presentational gap, not a bug)

Most slide pages are stubs — `page.tsx` files that render only the `SlideLayout` wrapper with no children, showing the "Content coming soon" fallback. Only Slide 01 (`history-of-css`) has a fully built `CssTimeline` component.

**Affected files:**
- `src/app/what-is-tailwind/page.tsx`
- `src/app/utility-classes/page.tsx`
- `src/app/responsiveness-dark-mode/page.tsx`
- `src/app/customizing-tailwind/page.tsx`
- `src/app/conditional-styling/page.tsx`

---

## Theme Default Hardcoded to Dark

**Severity:** Low

`src/app/layout.tsx` sets `className="... dark"` on `<html>` as a default, then the inline script overrides it from `localStorage`. On first visit (no stored preference), the page always starts in dark mode regardless of the user's OS preference.

```tsx
<html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}>
```

The `prefers-color-scheme` media query in `globals.css` applies only to CSS custom properties, not to the `.dark` class toggling — so OS preference is partially ignored on first load.

---

## `dangerouslySetInnerHTML` for Theme Script

**Severity:** Low (known/intentional pattern)

`layout.tsx` uses `dangerouslySetInnerHTML` to inject a theme-init `<script>` tag. This is a well-established Next.js pattern to avoid flash-of-unstyled-content. The script content is hardcoded and safe, but it bypasses React's XSS protection — any future modification must be careful not to inject user-controlled data.

```tsx
<script dangerouslySetInnerHTML={{ __html: `...localStorage.getItem('theme')...` }} />
```

---

## No Error Boundaries

**Severity:** Low (appropriate for current scope)

No React error boundaries are defined. Unhandled rendering errors will propagate to the Next.js error page. Acceptable for a static presentation app; would be a concern if async data fetching is added.

---

## No `next.config.ts` Restrictions

**Severity:** Low

`next.config.ts` is minimal (likely just the default scaffold). No image domain allowlist, no headers config, no CSP headers. Fine for a localhost demo; would need hardening for public hosting.

---

## Test Coverage Gap: Slide Pages 02–06

**Severity:** Low

`src/test/app/slide-pages.test.tsx` covers all slide pages at a smoke-test level (renders without error, SlideLayout present), but there are no content-level tests for slides 02–06 because their content hasn't been built yet.

---

## No CI/CD Configuration

**Severity:** Low (appropriate for personal project)

No `.github/workflows/` or similar CI config found. Tests and lint must be run manually. If this project is shared or demoed from a hosted URL, adding a simple CI workflow would prevent regressions.

---

## `coverage/` Directory Committed

**Severity:** Very Low (stylistic)

The `coverage/` directory appears to be committed to the repo (not in `.gitignore`). Coverage artifacts (HTML reports, lcov data) are typically gitignored. Check `.gitignore` and consider adding `coverage/` if not already present.

---
*Last mapped: 2026-04-28*
