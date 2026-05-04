---
phase: 06-slide-6-conditional-styling
reviewed: 2026-05-04T16:01:00Z
depth: standard
files_reviewed: 6
files_reviewed_list:
  - src/components/ConditionalPanels.tsx
  - src/components/DataActiveDemo.tsx
  - src/app/conditional-styling/page.tsx
  - src/test/components/ConditionalPanels.test.tsx
  - src/test/components/DataActiveDemo.test.tsx
  - src/test/app/slide-pages.test.tsx
findings:
  critical: 0
  warning: 4
  info: 1
  total: 5
status: issues_found
---

# Phase 06: Code Review Report

**Reviewed:** 2026-05-04T16:01:00Z
**Depth:** standard
**Files Reviewed:** 6
**Status:** issues_found

## Summary

Reviewed the Phase 6 Conditional Styling slide implementation: `ConditionalPanels`, `DataActiveDemo`, the slide page, and their tests. The build passes and all 80 tests pass.

No critical bugs were found. Four warnings were identified, three of which are violations of the single-source const / callout-accuracy rules stated in CLAUDE.md — the audience-facing `CodeCallout` content diverges from what is actually rendered in two components and the page. A fourth warning covers a `peer-invalid` behavioral quirk that will silently confuse an audience member who expects the demo to work with an empty field. One info item covers permanent dead code in the shared test file.

---

## Warnings

### WR-01: `DATA_CALLOUT` omits one of three applied `data-active:` classes — violates single-source const rule

**File:** `src/components/DataActiveDemo.tsx:7`

**Issue:** `DATA_CALLOUT` (the value passed to `CodeCallout`) contains only two classes:
```
data-active:bg-purple-600
data-active:text-white
```
But the card element applies three:
```
data-active:bg-purple-600 data-active:text-white data-active:border-purple-600
```
`data-active:border-purple-600` (line 25) is silently omitted from the callout shown to the audience. CLAUDE.md requires "extract className strings as named constants so the element and its CodeCallout use the same value — prevents callout drift." The slide shows code that does not fully match the element being demonstrated.

**Fix:** Add the missing class to `DATA_CALLOUT` so it is the single source of truth for all three applied data-active classes:
```tsx
const DATA_CALLOUT =
  "data-active:bg-purple-600\ndata-active:text-white\ndata-active:border-purple-600";
```
Then use `DATA_CALLOUT` to drive (or at least match) the element's data-active classes.

---

### WR-02: `PEER_CALLOUT` omits `invisible` — the callout shows an incomplete, non-functional snippet

**File:** `src/app/conditional-styling/page.tsx:8`

**Issue:** `PEER_CALLOUT` is:
```
peer
peer-invalid:visible text-red-500
```
The actual sibling `<p>` (line 65) has class `invisible peer-invalid:visible text-red-500`. The `invisible` class is the baseline state that makes the show/hide mechanism work — without it, the element is visible by default and `peer-invalid:visible` has no useful effect. The callout presented to the audience omits `invisible`, making the shown code snippet incomplete and non-functional as a copy-paste teaching example.

**Fix:**
```tsx
const PEER_CALLOUT = "peer\n\ninvisible peer-invalid:visible text-red-500";
```

---

### WR-03: `peer-invalid:visible` never fires on an empty field — demo requires user action that may not be obvious

**File:** `src/app/conditional-styling/page.tsx:57-66`

**Issue:** The `<input type="email">` has no `required` attribute. Per the HTML spec, an empty non-required email input is in a `:valid` state (not `:invalid`). Therefore `peer-invalid:visible` is never active on page load. An audience member who glances at the card and sees no error message, then types nothing (or clears the field), will conclude the demo is broken. The error only appears after the user types at least one character that fails the email format check (e.g. "f").

This is a correctness issue for a live-presented educational demo where the expected behavior should be self-evident or guided.

**Fix:** Add `required` to the input. With `required`, an empty email field is `:invalid`, so the error message appears on first render and disappears only when a valid email is entered — which is the intuitive behavior an audience expects:
```tsx
<input
  type="email"
  required
  className="peer w-full ..."
  placeholder="you@example.com"
/>
```
Update the error message text to match: `"Please enter a valid email address."` is appropriate for both states.

---

### WR-04: `GROUP_CALLOUT` does not match the classes actually applied to child elements

**File:** `src/components/ConditionalPanels.tsx:11`

**Issue:** `GROUP_CALLOUT` (shown in the Panel 2 `CodeCallout`) is:
```
group-hover:scale-105 group-hover:shadow-lg
```
But `shadow-lg` is not applied to any element in Panel 2. The actual child classes are:
- Avatar div: `group-hover:scale-105 group-hover:bg-sky-200 dark:group-hover:bg-sky-900`
- Text: `group-hover:text-sky-700 dark:group-hover:text-sky-300`

The callout presents `shadow-lg` which has no visual effect, and omits the color-transition classes (`bg-sky-200`, `text-sky-700`) that are the visible behavior when hovering. CLAUDE.md: "extract className strings as named constants so the element and its CodeCallout use the same value — prevents callout drift."

**Fix:** Update `GROUP_CALLOUT` to reflect the actual applied classes (at least for one representative child), or add `group-hover:shadow-lg` to the parent/child elements so the callout matches:
```tsx
// Option A — fix the callout to reflect the avatar's actual classes
const GROUP_CALLOUT = "group-hover:scale-105 group-hover:bg-sky-200";

// Option B — add shadow-lg to the parent so the callout is accurate
<div className="group ... group-hover:shadow-lg">
```

---

## Info

### IN-01: `stubCases` filter is permanently empty dead code in shared test file

**File:** `src/test/app/slide-pages.test.tsx:22-24`

**Issue:** The `stubCases` array is computed as:
```ts
const stubCases = allCases.filter(({ number }) =>
  ([] as string[]).includes(number)
);
```
`([] as string[])` is a literal empty array. `.includes()` on an empty array always returns `false`. `stubCases` is permanently empty, and the `if (stubCases.length > 0)` block at lines 43-51 is unreachable dead code. This is leftover scaffolding from when some slides were not yet implemented.

**Fix:** Delete the `stubCases` declaration and the dead `if` block (lines 22-51), keeping only the main `allCases.forEach` describe block:
```ts
// Remove these lines entirely:
const stubCases = allCases.filter(({ number }) =>
  ([] as string[]).includes(number)
);
// ...and the if (stubCases.length > 0) { ... } block
```

---

_Reviewed: 2026-05-04T16:01:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
