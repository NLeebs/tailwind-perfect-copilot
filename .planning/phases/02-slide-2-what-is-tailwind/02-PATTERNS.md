# Phase 2: Slide 2 — What Is Tailwind — Pattern Map

**Mapped:** 2026-04-29
**Files analyzed:** 2 (1 modified, 1 new)
**Analogs found:** 2 / 2

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `src/app/what-is-tailwind/page.tsx` | page (RSC) | request-response | `src/app/history-of-css/page.tsx` | exact |
| `src/components/ButtonComparison.tsx` | component (client island) | event-driven | `src/components/CssTimeline.tsx` | exact |

---

## Pattern Assignments

### `src/app/what-is-tailwind/page.tsx` (RSC page, request-response)

**Analog:** `src/app/history-of-css/page.tsx`

**Full file — copy this structure exactly** (lines 1-10):
```typescript
import SlideLayout from "@/components/SlideLayout";
import CssTimeline from "@/components/CssTimeline";

export default function HistoryOfCSS() {
  return (
    <SlideLayout number="01" title="The History of CSS">
      <CssTimeline />
    </SlideLayout>
  );
}
```

**Applied to Phase 2:**
- Replace `CssTimeline` import with `ButtonComparison` (the new client island).
- Pass `number="02"` and `title="What is Tailwind?"` to `SlideLayout`.
- The documentation card section (right column) is purely RSC and lives **inline** in `page.tsx` — no separate component file needed.
- Import `CodeCallout` directly in `page.tsx` for the right-column card callout.

**Imports pattern for Phase 2 page:**
```typescript
import SlideLayout from "@/components/SlideLayout";
import CodeCallout from "@/components/CodeCallout";
import ButtonComparison from "@/components/ButtonComparison";
```

**Single-source const pattern — right column card** (from CONTEXT.md D-14):
```typescript
const CARD_CLASSES =
  "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm 3xl:p-10";

// In JSX:
<div className={CARD_CLASSES}>...</div>
<CodeCallout classes={CARD_CLASSES} />
```

**Two-column grid layout — from UI-SPEC layout contract:**
```tsx
<div className="grid grid-cols-2 gap-6 3xl:gap-12">
  {/* Left column — ButtonComparison client island */}
  <div>
    <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base">
      Semantic CSS
    </p>
    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 3xl:text-xl 3xl:mt-4">
      The class name hides the implementation.
    </p>
    <ButtonComparison />
  </div>

  {/* Right column — RSC inline card */}
  <div>
    <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base">
      Utility-First Tailwind
    </p>
    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 3xl:text-xl 3xl:mt-4">
      Every style is visible inline.
    </p>
    <div className={CARD_CLASSES}>...</div>
    <div className="mt-4 3xl:mt-8">
      <CodeCallout classes={CARD_CLASSES} />
    </div>
  </div>
</div>
```

**No `"use client"` on `page.tsx`** — the file stays a pure RSC. All interactivity is inside `ButtonComparison`.

---

### `src/components/ButtonComparison.tsx` (client island, event-driven)

**Analog:** `src/components/CssTimeline.tsx`

**"use client" directive + useState — top of file** (CssTimeline lines 1-3, 399):
```typescript
"use client";

import { useState } from "react";
```

Note: `CssTimeline` also uses `useRef` and `useEffect` for IntersectionObserver. `ButtonComparison` only needs `useState` — omit `useRef`/`useEffect`.

**Boolean toggle state pattern** (from CssTimeline lines 399-417):
```typescript
// CssTimeline uses a number index; ButtonComparison uses a simple boolean:
const [showCss, setShowCss] = useState(false);
```

**Single-source const pattern for class strings** (CONTEXT.md §Established Patterns + UI-SPEC §Single-Source Constants):
```typescript
const TAILWIND_BTN_CLASSES =
  "bg-cyan-500 dark:bg-cyan-600 text-white font-semibold px-5 py-3 rounded-lg 3xl:px-8 3xl:py-4";

const BTN_CSS_DEFINITION =
  `.btn {\n  background-color: #06b6d4;\n  color: white;\n  font-weight: 600;\n  padding: 0.75rem 1.25rem;\n  border-radius: 0.5rem;\n}`;
```

**No dynamic class interpolation** — use a conditional to pick between two complete class strings, never template literals. From CLAUDE.md §Interactive demo patterns:
```typescript
// CORRECT — complete static strings selected by condition:
const btnClass = showCss ? "border-cyan-500" : "border-slate-200";

// WRONG — dynamic interpolation (purged by Tailwind):
// const btnClass = `border-${active ? 'cyan' : 'slate'}-500`;
```

**Conditional render pattern for CSS reveal** (modeled on CssTimeline's `isExpanded` grid collapse, but simplified to a direct conditional):
```tsx
{showCss && (
  <div className="mt-4 3xl:mt-8">
    <CodeCallout classes={BTN_CSS_DEFINITION} />
  </div>
)}
```

**Card and button surface pattern** (CssTimeline lines 280-283 — card chrome):
```tsx
// CssTimeline card surface (analog):
<div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors duration-300">

// ButtonComparison uses the same surface tokens for the two-button container
// or for any wrapper card around the comparison.
```

**Overline label pattern** (CssTimeline lines 290-292):
```typescript
// CssTimeline uses this exact pattern for section sub-labels:
<span className="text-xs font-semibold tracking-widest text-slate-400 dark:text-slate-500 uppercase 3xl:text-base 4xl:text-xl">
```

**3xl escalation pattern on text + spacing** (CssTimeline lines 287-288):
```typescript
// Every text element has a 3xl: escalation — copy this discipline exactly:
className="p-6 flex items-start justify-between gap-4 3xl:p-10 4xl:p-14"
className="text-xl font-semibold text-slate-900 dark:text-white 3xl:text-4xl"
className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 3xl:text-xl"
```

**`<style>` block for `.btn` class** — must live inside `ButtonComparison.tsx` (the client island), not in `page.tsx`, so the scoped CSS rule is co-located with the toggle logic:
```tsx
export default function ButtonComparison() {
  const [showCss, setShowCss] = useState(false);

  return (
    <>
      <style>{`
        .btn {
          background-color: #06b6d4;
          color: white;
          font-weight: 600;
          padding: 0.75rem 1.25rem;
          border-radius: 0.5rem;
        }
      `}</style>
      {/* ... */}
    </>
  );
}
```

**Import of CodeCallout inside a client island** — CodeCallout is an RSC but can be imported and rendered inside a client component (React allows RSC-compatible components to render inside client trees when they carry no server-only APIs):
```typescript
import CodeCallout from "@/components/CodeCallout";
```

---

## Shared Patterns

### Dark Mode
**Source:** `src/app/globals.css` line 8 + `src/components/SlideLayout.tsx` line 15
**Apply to:** All elements in `ButtonComparison.tsx` and `page.tsx`

```css
/* globals.css — the ONLY dark mode mechanism */
@custom-variant dark (&:where(.dark, .dark *));
```

Every element needs explicit `dark:` variant classes. There is no `prefers-color-scheme` fallback. Required pairs for this phase (from UI-SPEC §Dark Mode Contract):

```
bg-white            → dark:bg-slate-900
border-slate-200    → dark:border-slate-800
text-slate-900      → dark:text-white
text-slate-600      → dark:text-slate-400
bg-cyan-500         → dark:bg-cyan-600
text-cyan-600       → dark:text-cyan-400
```

### SlideLayout Wrapper
**Source:** `src/components/SlideLayout.tsx` lines 9-40
**Apply to:** `src/app/what-is-tailwind/page.tsx`

SlideLayout provides: `min-h-screen bg-slate-50 dark:bg-slate-950` page background, the nav bar with back link + slide number badge, `<main>` with `max-w-5xl px-8 py-20 3xl:max-w-7xl 3xl:px-16 3xl:py-28`, and the `<h1>` title with gradient clip styling from `@layer base`. Pass `number="02"` and `title="What is Tailwind?"` — do not override or re-declare any of those styles.

### CodeCallout Usage
**Source:** `src/components/CodeCallout.tsx` lines 1-11
**Apply to:** Both `page.tsx` (card callout) and `ButtonComparison.tsx` (btn CSS reveal + Tailwind button callout)

Single required prop: `classes: string`. Always pass the same named `const` used on the element itself:

```tsx
// Single-source pattern — const used on both element and callout:
const TAILWIND_BTN_CLASSES = "bg-cyan-500 dark:bg-cyan-600 text-white font-semibold px-5 py-3 rounded-lg 3xl:px-8 3xl:py-4";

<button className={TAILWIND_BTN_CLASSES}>Button</button>
<CodeCallout classes={TAILWIND_BTN_CLASSES} />
```

### cn() Utility
**Source:** `src/lib/utils.ts` lines 1-6
**Apply to:** `ButtonComparison.tsx` if any conditional class composition is needed

```typescript
import { cn } from "@/lib/utils";

// Use only when combining conditional class fragments — not needed for
// simple static class strings or direct ternary string selection.
```

### 3xl Escalation Discipline
**Source:** `src/components/CssTimeline.tsx` (throughout) + `src/components/SlideLayout.tsx` line 28
**Apply to:** Every text element and spacing value in both new files

Pattern: every `text-*`, `p-*`, `gap-*`, `px-*`, `py-*`, and `mt-*` must have a corresponding `3xl:` version. Required escalations for this phase (from UI-SPEC §TV Readability Contract):

```
text-xs      → 3xl:text-base
text-sm      → 3xl:text-xl
text-xl      → 3xl:text-4xl
text-base    → 3xl:text-2xl
px-5 py-3   → 3xl:px-8 3xl:py-4
p-6          → 3xl:p-10
gap-6        → 3xl:gap-12
mt-4         → 3xl:mt-8
mt-2         → 3xl:mt-4
```

---

## No Analog Found

None — all files in this phase have a strong existing analog in the codebase.

---

## Metadata

**Analog search scope:** `src/app/`, `src/components/`, `src/lib/`, `src/app/globals.css`
**Files scanned:** 7
**Pattern extraction date:** 2026-04-29
