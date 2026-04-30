# Phase 3: Slide 3 — Core Utility Classes - Pattern Map

**Mapped:** 2026-04-30
**Files analyzed:** 4
**Analogs found:** 4 / 4

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `src/app/utility-classes/page.tsx` | component (RSC slide page) | request-response | `src/app/what-is-tailwind/page.tsx` | exact |
| `src/components/CardBuilder.tsx` | component (client island) | event-driven | `src/components/ButtonComparison.tsx` + `src/components/CssTimeline.tsx` | exact (composite) |
| `src/components/FlexGridComparison.tsx` | component (RSC) | request-response | `src/app/what-is-tailwind/page.tsx` (card + CodeCallout pattern) | role-match |
| `src/app/page.tsx` | config / nav registry | request-response | `src/app/page.tsx` (self — verify entry) | exact |

---

## Pattern Assignments

### `src/app/utility-classes/page.tsx` (RSC slide page)

**Analog:** `src/app/what-is-tailwind/page.tsx`

**Imports pattern** (lines 1–3):
```typescript
import SlideLayout from "@/components/SlideLayout";
import CodeCallout from "@/components/CodeCallout";
import ButtonComparison from "@/components/ButtonComparison";
```
Apply: import `SlideLayout`, `CardBuilder` (client island), `FlexGridComparison` (RSC or inline). `CodeCallout` is not needed directly in `page.tsx` — it is used inside `FlexGridComparison`.

**SlideLayout wrapper pattern** (lines 8–10):
```typescript
export default function WhatIsTailwind() {
  return (
    <SlideLayout number="02" title="What is Tailwind?">
```
Apply: `<SlideLayout number="03" title="Tailwind Utility Classes">`. Never add `"use client"` to `page.tsx`.

**Two-column grid pattern** (line 11):
```typescript
<div className="grid grid-cols-2 gap-6 3xl:gap-12">
```
Apply this exact string inside `CardBuilder` for the card-on-left / callout-on-right split. The step navigator spans full width above it.

**Stacked section pattern** (implicit structure in `what-is-tailwind/page.tsx`):
```typescript
{/* Section 1: CardBuilder — full width container */}
<div className="space-y-8 3xl:space-y-16">
  <CardBuilder />
</div>

{/* Section 2: FlexGridComparison — below */}
<div className="mt-12 3xl:mt-20">
  <FlexGridComparison />
</div>
```
Or separated by a padding divider (`pt-12 border-t border-slate-200 dark:border-slate-800`).

**Overline label pattern** (lines 14–16):
```typescript
<p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base">
  Semantic CSS
</p>
```
Apply for section labels ("Card Builder", "Flex vs. Grid") and for the `FLEX` / `GRID` overline labels in `FlexGridComparison`.

---

### `src/components/CardBuilder.tsx` ("use client" island, event-driven)

**Analogs:** `src/components/ButtonComparison.tsx` (single-source const + CodeCallout) and `src/components/CssTimeline.tsx` (static data array + index state + structural sub-components)

**"use client" + imports pattern** (`ButtonComparison.tsx` lines 1–3):
```typescript
"use client";
import { useState } from "react";
import CodeCallout from "@/components/CodeCallout";
```
Apply exactly. Also import `cn` from `@/lib/utils` for conditional active-step node styling.

**Single-source const pattern** (`ButtonComparison.tsx` lines 5–6):
```typescript
const TAILWIND_BTN_CLASSES =
  "bg-cyan-500 dark:bg-cyan-600 text-white font-semibold text-sm 3xl:text-xl px-5 py-3 rounded-lg 3xl:px-8 3xl:py-4";
```
Apply as a lookup-table array of step configs. Each entry is a plain object with complete static strings — no string interpolation:
```typescript
const STEPS: StepConfig[] = [
  {
    label: "Layout",
    newClasses: "w-full max-w-sm rounded-2xl",
    allClasses:  "w-full max-w-sm rounded-2xl",
  },
  // ... 5 more entries, each allClasses cumulates prior steps
];
```
`STEPS[activeStep].allClasses` drives the card element; `STEPS[activeStep].newClasses` is passed to `<CodeCallout classes={...} />`.

**useState for active step** (`CssTimeline.tsx` line 399):
```typescript
const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
```
Apply as:
```typescript
const [activeStep, setActiveStep] = useState(0);
```
Demo opens at step 0 (index 0 = "Layout") per decision D-05.

**Static data array pattern** (`CssTimeline.tsx` lines 18–220):
```typescript
const eras: Era[] = [
  {
    color: "...",
    title: "...",
    // all values are complete static strings
  },
  ...
];
```
Apply as `const STEPS: StepConfig[]` with fields `{ label, newClasses, allClasses }`. All class strings are complete static string literals — never template literals or concatenation.

**CodeCallout usage pattern** (`ButtonComparison.tsx` lines 48–50):
```typescript
<button type="button" className={TAILWIND_BTN_CLASSES}>Button</button>
<div className="mt-4 3xl:mt-8">
  <CodeCallout classes={TAILWIND_BTN_CLASSES} />
</div>
```
Apply: the card element receives `className={STEPS[activeStep].allClasses}` and the callout receives `classes={STEPS[activeStep].newClasses}`.

**Step navigator pattern** (derived from `CssTimeline.tsx` toggle logic + `ButtonComparison.tsx` button pattern):
```typescript
{/* Step indicator row: 6 numbered nodes */}
<div className="flex items-center justify-center gap-4 3xl:gap-6 mb-6 3xl:mb-10">
  <button
    onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
    disabled={activeStep === 0}
    className="..."
  >◄</button>
  {STEPS.map((step, i) => (
    <button
      key={step.label}
      onClick={() => setActiveStep(i)}
      className={cn(
        "flex flex-col items-center gap-1",
        i === activeStep
          ? "text-white"
          : "text-slate-500 dark:text-slate-400"
      )}
    >
      <span className={cn(
        "flex items-center justify-center rounded-full size-8 text-sm font-semibold 3xl:size-12 3xl:text-lg",
        i === activeStep
          ? "bg-cyan-500 text-white"
          : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
      )}>{i + 1}</span>
      <span className="text-xs tracking-widest uppercase 3xl:text-sm">{step.label}</span>
    </button>
  ))}
  <button
    onClick={() => setActiveStep((s) => Math.min(STEPS.length - 1, s + 1))}
    disabled={activeStep === STEPS.length - 1}
    className="..."
  >►</button>
</div>
```

**Two-column split inside island** (from `what-is-tailwind/page.tsx` line 11):
```typescript
<div className="grid grid-cols-2 gap-6 3xl:gap-12">
  {/* Left: demo card */}
  <div>
    <div className={STEPS[activeStep].allClasses}>...</div>
  </div>
  {/* Right: CodeCallout */}
  <div>
    <CodeCallout classes={STEPS[activeStep].newClasses} />
  </div>
</div>
```

**Dark mode pattern** (throughout `CssTimeline.tsx`, e.g. line 282):
```typescript
className="... bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 ..."
```
Apply `dark:` variants on the demo card at every step (background, text, border). Color palette: `slate-50`/`slate-950` page backgrounds, `bg-white dark:bg-slate-900` for cards, `border-slate-200 dark:border-slate-800`, `text-slate-900 dark:text-white` headings, `text-slate-600 dark:text-slate-400` body.

**3xl escalation pattern** (throughout `CssTimeline.tsx`, e.g. line 287):
```typescript
className="... p-6 3xl:p-10 ..."
className="... text-sm 3xl:text-xl ..."
className="... size-9 3xl:size-14 ..."
```
Apply `3xl:` escalations to all text sizes, padding, gap, and step-node sizes.

---

### `src/components/FlexGridComparison.tsx` (RSC, request-response)

**Analog:** `src/app/what-is-tailwind/page.tsx` (card + CodeCallout side-by-side column)

No `"use client"` — pure RSC, no state needed.

**Imports pattern**:
```typescript
import CodeCallout from "@/components/CodeCallout";
```
No `useState`, no `cn` needed unless conditional classes are used for box styling (use static strings from a small array instead).

**Overline + CodeCallout per column** (adapted from `what-is-tailwind/page.tsx` lines 14–44):
```typescript
const FLEX_CLASSES = "flex flex-row gap-4";
const GRID_CLASSES = "grid grid-cols-3 gap-4";

export default function FlexGridComparison() {
  return (
    <div className="grid grid-cols-2 gap-6 3xl:gap-12">
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base">
          Flex
        </p>
        <div className={`mt-4 3xl:mt-8 ${FLEX_CLASSES}`}>
          {/* numbered boxes */}
        </div>
        <div className="mt-4 3xl:mt-8">
          <CodeCallout classes={FLEX_CLASSES} />
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base">
          Grid
        </p>
        <div className={`mt-4 3xl:mt-8 ${GRID_CLASSES}`}>
          {/* numbered boxes */}
        </div>
        <div className="mt-4 3xl:mt-8">
          <CodeCallout classes={GRID_CLASSES} />
        </div>
      </div>
    </div>
  );
}
```
Numbered box children (per decision D-07) use static complete class strings. No dynamic interpolation. Example:
```typescript
// Static map — never bg-`${color}-200`
const BOXES = [
  "flex items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 font-semibold text-sm 3xl:text-lg h-12 3xl:h-16",
  "flex items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900 text-violet-800 dark:text-violet-200 font-semibold text-sm 3xl:text-lg h-12 3xl:h-16",
  "flex items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 font-semibold text-sm 3xl:text-lg h-12 3xl:h-16",
];
```

---

### `src/app/page.tsx` (nav registry, verify only)

**Analog:** `src/app/page.tsx` (self)

The slide-03 entry already exists at lines 15–21:
```typescript
{
  number: "03",
  title: "Tailwind Utility Classes",
  tagline: "The building blocks — spacing, color, typography, and more.",
  href: "/utility-classes",
},
```
No modification is required. Verify the entry is present and the `href` matches the route. If the title or tagline needs updating after the demo is built, edit only those two string values — the array structure and `NavCard` props interface do not change.

---

## Shared Patterns

### Dark Mode
**Source:** `src/components/CssTimeline.tsx` (throughout) and `src/app/what-is-tailwind/page.tsx`
**Apply to:** All new components — `CardBuilder.tsx`, `FlexGridComparison.tsx`, `utility-classes/page.tsx`
**Mechanism:** `dark:` prefix only (never `prefers-color-scheme`). The `@custom-variant dark (&:where(.dark, .dark *))` in `globals.css` is the only dark mode mechanism.
```typescript
// Card surface
"bg-white dark:bg-slate-900"
// Border
"border border-slate-200 dark:border-slate-800"
// Heading text
"text-slate-900 dark:text-white"
// Body / muted text
"text-slate-600 dark:text-slate-400"
// Muted interactive (step nodes)
"bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
// Accent / active
"bg-cyan-500 text-white"
```

### 3xl/4xl Escalation
**Source:** `src/components/CssTimeline.tsx` lines 272, 276, 287, 300
**Apply to:** All new components
```typescript
// Text escalation pattern
"text-xs 3xl:text-base"
"text-sm 3xl:text-xl"
"text-base 3xl:text-2xl"
// Spacing escalation pattern
"p-6 3xl:p-10"
"gap-6 3xl:gap-12"
"mt-4 3xl:mt-8"
"mb-6 3xl:mb-10"
// Size escalation pattern (nodes/icons)
"size-8 3xl:size-12"
```

### Single-Source Const + CodeCallout
**Source:** `src/components/ButtonComparison.tsx` lines 5–6, 47–50
**Apply to:** `CardBuilder.tsx` (per-step `newClasses`), `FlexGridComparison.tsx` (`FLEX_CLASSES`, `GRID_CLASSES`)
```typescript
// Define once, use in both element and callout
const SOME_CLASSES = "complete static string here";
// ...
<div className={SOME_CLASSES}>...</div>
<CodeCallout classes={SOME_CLASSES} />
```

### No Dynamic Class Interpolation
**Source:** `CLAUDE.md` §Tailwind v4 specifics
**Apply to:** All new files
```typescript
// NEVER do this:
`bg-${color}-500`
// ALWAYS do this:
const BOX_CLASSES = [
  "bg-cyan-100 dark:bg-cyan-900 ...",   // box 1
  "bg-violet-100 dark:bg-violet-900 ...", // box 2
  "bg-amber-100 dark:bg-amber-900 ...",   // box 3
];
```

### Overline Label
**Source:** `src/app/what-is-tailwind/page.tsx` lines 14–16
**Apply to:** `FlexGridComparison.tsx` section labels, `utility-classes/page.tsx` section headings
```typescript
<p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base">
  FLEX
</p>
```

### cn() Usage
**Source:** `src/lib/utils.ts`
**Apply to:** `CardBuilder.tsx` for conditional step-node styling
```typescript
import { cn } from "@/lib/utils";
// ...
className={cn(
  "size-8 rounded-full flex items-center justify-center font-semibold text-sm 3xl:size-12 3xl:text-lg",
  i === activeStep
    ? "bg-cyan-500 text-white"
    : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
)}
```

---

## No Analog Found

No files are without an analog — all four files have direct or composite analogs in the existing codebase.

---

## Metadata

**Analog search scope:** `src/app/`, `src/components/`, `src/lib/`
**Files scanned:** 8 (`CssTimeline.tsx`, `ButtonComparison.tsx`, `what-is-tailwind/page.tsx`, `history-of-css/page.tsx`, `utility-classes/page.tsx`, `CodeCallout.tsx`, `SlideLayout.tsx`, `page.tsx`)
**Pattern extraction date:** 2026-04-30
