# Phase 4: Slide 4 — Responsiveness & Dark Mode - Pattern Map

**Mapped:** 2026-04-30
**Files analyzed:** 2
**Analogs found:** 2 / 2

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `src/app/responsiveness-dark-mode/page.tsx` | page (RSC) | request-response | `src/app/utility-classes/page.tsx` | exact |
| `src/components/ResponsiveDemo.tsx` | component (client island) | event-driven | `src/components/CardBuilder.tsx` | exact |

---

## Pattern Assignments

### `src/app/responsiveness-dark-mode/page.tsx` (RSC page)

**Analog:** `src/app/utility-classes/page.tsx`

**Imports pattern** (lines 1–3):
```tsx
import SlideLayout from "@/components/SlideLayout";
import CardBuilder from "@/components/CardBuilder";
import FlexGridComparison from "@/components/FlexGridComparison";
```
For Phase 4, replace the second and third imports with `ResponsiveDemo` (client island). The dark mode card is inlined RSC markup directly in this file.

**Single-source const pattern** — copy from `src/app/what-is-tailwind/page.tsx` lines 5–6:
```tsx
const CARD_CLASSES =
  "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm 3xl:p-10";
```
For Phase 4, define two named consts at file top:
```tsx
const DARK_CLASSES =
  `dark:bg-slate-800   (header zone)\ndark:bg-slate-900   (body zone)\ndark:text-white     (title)\ndark:text-slate-400 (body text)\ndark:border-slate-700\ndark:bg-slate-700 dark:text-slate-200   (badge)\ndark:bg-cyan-600    (button)`;

const STACKED_CLASSES = "dark:md:hover:bg-sky-600 dark:md:hover:text-white";
```
Both consts are passed as `classes` props to their respective `<CodeCallout>` instances.

**Two-section stacked layout pattern** (lines 5–38 of `src/app/utility-classes/page.tsx`):
```tsx
export default function UtilityClasses() {
  return (
    <SlideLayout number="03" title="Core Utility Classes">
      {/* Section 1 */}
      <section>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white 3xl:text-3xl">
          Building a Card with Utilities
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 3xl:text-xl 3xl:mt-4">
          One utility at a time.
        </p>
        <div className="mt-8 3xl:mt-12">
          <CardBuilder />
        </div>
      </section>

      {/* Spacer between sections */}
      <div className="mt-16 3xl:mt-24" />

      {/* Section 2 */}
      <section>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white 3xl:text-3xl">
          Flex vs. Grid
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 3xl:text-xl 3xl:mt-4">
          Same children, different layout model.
        </p>
        <div className="mt-8 3xl:mt-12">
          <FlexGridComparison />
        </div>
      </section>
    </SlideLayout>
  );
}
```
Copy this verbatim structure. For Phase 4:
- `number="04"`, `title="Responsiveness & Dark Mode"`
- Section 1 h2: `"Responsive Layouts"`, description: `"Click a breakpoint to see how prefix classes reflow the layout."`
- Section 1 content: `<ResponsiveDemo />`
- Section 2 h2: `"Dark Mode with dark:"`, description: `"Toggle dark mode — every utility shifts in one class prefix."`
- Section 2 content: inline DarkModeCard RSC markup + two `<CodeCallout>` strips with overlines

**Overline label pattern** — copy from `src/app/what-is-tailwind/page.tsx` lines 14–15:
```tsx
<p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base">
  Semantic CSS
</p>
```
For Phase 4, the same class string applies to all three overline labels: `"LAYOUT CLASSES"`, `"DARK MODE CLASSES"`, `"STACKED VARIANTS"`. Add `mb-2` and spacing variants per position (e.g., `mt-6 3xl:mt-8 mb-2` for the dark mode overline; `mt-4 3xl:mt-6 mb-2` for stacked variants).

**CodeCallout usage pattern** — copy from `src/app/what-is-tailwind/page.tsx` lines 43–45:
```tsx
<div className="mt-4 3xl:mt-8">
  <CodeCallout classes={CARD_CLASSES} />
</div>
```
For Phase 4, the CodeCallout is placed directly below its overline without an extra wrapping div. The single-source const name (e.g., `DARK_CLASSES`) is used in both the relevant element's `className` and the `<CodeCallout classes={...} />` prop.

**Dark mode class patterns on card zones** — copy from `src/components/CardBuilder.tsx` lines 30–45:
```tsx
// Color step — full dark: pattern on a card-like element
newClasses: "bg-white dark:bg-slate-900 text-slate-900 dark:text-white",
// Borders step — dark: border pattern
newClasses: "border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm",
```
For Phase 4 DarkModeCard zones:
- Card wrapper: `border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-sm`
- Header zone: `bg-slate-100 dark:bg-slate-800 px-8 py-5 3xl:px-12 3xl:py-7`
- Body zone: `bg-white dark:bg-slate-900 px-8 py-6 3xl:px-12 3xl:py-8`
- Card title text: `text-xl font-semibold text-slate-900 dark:text-white 3xl:text-2xl`
- Card body text: `text-sm text-slate-600 dark:text-slate-400 3xl:text-lg`
- Badge: `bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200 text-xs font-semibold px-2 py-0.5 rounded-full 3xl:text-sm`
- Button: `bg-cyan-500 text-white dark:bg-cyan-600 dark:text-white hover:bg-cyan-600 dark:hover:bg-cyan-700 dark:md:hover:bg-sky-600 dark:md:hover:text-white font-semibold text-sm 3xl:text-base px-5 py-2 3xl:px-7 3xl:py-3 rounded-lg transition-colors`

---

### `src/components/ResponsiveDemo.tsx` (client island)

**Analog:** `src/components/CardBuilder.tsx`

**Imports pattern** (lines 1–4):
```tsx
"use client";
import { useState } from "react";
import CodeCallout from "@/components/CodeCallout";
import { cn } from "@/lib/utils";
```
Copy exactly — `"use client"` directive must be first line. All four imports apply to `ResponsiveDemo.tsx`.

**Static lookup map pattern** (lines 12–47 of `src/components/CardBuilder.tsx`):
```tsx
interface StepConfig {
  label: string;
  newClasses: string;
  allClasses: string;
}

const STEPS: StepConfig[] = [
  {
    label: "Layout",
    newClasses: "w-full max-w-sm",
    allClasses: "w-full max-w-sm",
  },
  // ...
];
```
For `ResponsiveDemo.tsx`, use a `Record`-typed object map (keyed by union type) instead of an array, since tab identity is by name not index:
```tsx
type Tab = "mobile" | "tablet" | "desktop";

const LAYOUT_CLASSES: Record<Tab, string> = {
  mobile: "flex flex-col gap-4",
  tablet: "flex flex-row gap-4",
  desktop: "grid grid-cols-3 gap-4",
};
```
`LAYOUT_CLASSES[activeTab]` drives both the profile card container `className` and `<CodeCallout classes={LAYOUT_CLASSES[activeTab]} />`.

**useState tab state pattern** (lines 50–51 of `src/components/CardBuilder.tsx`):
```tsx
export default function CardBuilder() {
  const [activeStep, setActiveStep] = useState(0);
```
For `ResponsiveDemo.tsx`:
```tsx
export default function ResponsiveDemo() {
  const [activeTab, setActiveTab] = useState<Tab>("mobile");
```

**Tab button active/inactive pattern with cn()** (lines 79–84 of `src/components/CardBuilder.tsx`):
```tsx
className={cn(
  "flex items-center justify-center size-10 rounded-full font-semibold text-sm 3xl:size-16 3xl:text-xl transition-colors",
  i === activeStep
    ? "bg-cyan-500 text-white ring-2 ring-cyan-500 ring-offset-2 dark:ring-offset-slate-950 cursor-default"
    : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-600"
)}
```
For `ResponsiveDemo.tsx` tab buttons, adapt to rectangular buttons (rounded-lg, not rounded-full):
```tsx
className={cn(
  "font-semibold text-sm 3xl:text-lg px-5 py-2 3xl:px-8 3xl:py-3 rounded-lg transition-colors",
  tab === activeTab
    ? "bg-cyan-500 text-white ring-2 ring-cyan-500 ring-offset-2 dark:ring-offset-slate-950 cursor-default"
    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
)}
```

**Tab navigator row layout** (line 55 of `src/components/CardBuilder.tsx`):
```tsx
<div className="flex items-center justify-between gap-4 mb-8 3xl:mb-12">
```
For `ResponsiveDemo.tsx`, the tab row is centered (no prev/next buttons):
```tsx
<div className="flex items-center justify-center gap-3 mb-8 3xl:mb-12">
```

**Overline label inside client island** (lines 114–116 of `src/components/CardBuilder.tsx`):
```tsx
<p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base mb-4">
  RESULT
</p>
```
For `ResponsiveDemo.tsx`, the overline above the CodeCallout strip:
```tsx
<p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base mb-2">
  LAYOUT CLASSES
</p>
```

**Profile card dark: class pattern** — adapt from CardBuilder.tsx line 30–33 (`bg-white dark:bg-slate-900 text-slate-900 dark:text-white`) and line 37–39 (`border border-slate-200 dark:border-slate-800`):
```tsx
// Profile card wrapper
"bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 3xl:p-6 flex flex-col items-center gap-2 3xl:gap-3"
// Avatar circle
"size-12 3xl:size-16 rounded-full bg-slate-300 dark:bg-slate-600"
// Profile name
"text-sm font-semibold text-slate-900 dark:text-white 3xl:text-base"
// Profile role
"text-xs text-slate-500 dark:text-slate-400 3xl:text-sm"
```

**Demo container wrapper** (analogous to two-column grid div in CardBuilder.tsx line 111):
```tsx
// Profile card container (layout class driven by LAYOUT_CLASSES[activeTab])
<div className={cn("mt-6 3xl:mt-8 p-6 3xl:p-8 bg-slate-100 dark:bg-slate-800 rounded-2xl", LAYOUT_CLASSES[activeTab])}>
```

**3xl: escalation pattern** — copy from `src/components/CardBuilder.tsx`:
- Nav gap: `mb-8 3xl:mb-12` (line 55)
- Grid gap: `gap-6 3xl:gap-12` (line 111)
- Grid top margin: `mt-8 3xl:mt-12` (line 111)
- Step node size: `size-10 3xl:size-16` (line 80)
- Step label text: `text-xs ... 3xl:text-sm` (line 88)
- Button text/padding: `text-sm ... 3xl:text-lg 3xl:px-6 3xl:py-3` (line 62)

---

## Shared Patterns

### Dark Mode Mechanism
**Source:** `src/app/globals.css` line 8
**Apply to:** All components in this phase
```css
@custom-variant dark (&:where(.dark, .dark *));
```
The `.dark` class on `<html>` is the sole trigger. `ThemeToggle` manages it. No `prefers-color-scheme` media query. No component-level state for dark mode — just `dark:` prefix utilities on every element.

### Overline Label
**Source:** `src/app/what-is-tailwind/page.tsx` lines 14–15 and `src/components/CardBuilder.tsx` lines 114–116
**Apply to:** All overline labels in `page.tsx` (before sections) and inside `ResponsiveDemo.tsx`
```tsx
<p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base mb-2">
  OVERLINE TEXT
</p>
```
Spacing modifier (`mb-2`, `mb-4`, `mt-6 3xl:mt-8 mb-2`, etc.) varies by position.

### CodeCallout Usage
**Source:** `src/app/what-is-tailwind/page.tsx` lines 43–45; `src/components/CodeCallout.tsx` lines 1–11
**Apply to:** All CodeCallout instances in `page.tsx` and `ResponsiveDemo.tsx`

Component interface (CodeCallout.tsx lines 1–3):
```tsx
interface CodeCalloutProps {
  classes: string;
}
```
Usage — always pass a named const, never an inline string literal:
```tsx
<CodeCallout classes={SOME_NAMED_CONST} />
```
`whitespace-pre-wrap` is already built into the component (line 7), so multi-line strings with `\n` render each pair on its own line without additional wrappers.

### cn() Conditional Class Composition
**Source:** `src/lib/utils.ts` lines 1–6; used in `src/components/CardBuilder.tsx` lines 61–64, 79–84, 100–103
**Apply to:** `ResponsiveDemo.tsx` tab buttons and profile card container (layout class switching)
```tsx
import { cn } from "@/lib/utils";
// ...
className={cn("base-classes", condition ? "active-classes" : "inactive-classes")}
```

### Section h2 + Description Typography
**Source:** `src/app/utility-classes/page.tsx` lines 10–15
**Apply to:** Both `<section>` headings in `page.tsx`
```tsx
<h2 className="text-xl font-semibold text-slate-900 dark:text-white 3xl:text-3xl">
  Section Title
</h2>
<p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 3xl:text-xl 3xl:mt-4">
  Description text.
</p>
```

### Section Spacer
**Source:** `src/app/utility-classes/page.tsx` line 22
**Apply to:** Between Section 1 and Section 2 in `page.tsx`
```tsx
<div className="mt-16 3xl:mt-24" />
```

### Demo Content Wrapper (inside section)
**Source:** `src/app/utility-classes/page.tsx` lines 16–18
**Apply to:** Both `<section>` content areas in `page.tsx`
```tsx
<div className="mt-8 3xl:mt-12">
  {/* demo content */}
</div>
```

---

## No Analog Found

None — all files in this phase have strong analogs in the existing codebase.

---

## Metadata

**Analog search scope:** `src/components/`, `src/app/`, `src/lib/`
**Files scanned:** 7 (`CardBuilder.tsx`, `utility-classes/page.tsx`, `what-is-tailwind/page.tsx`, `CodeCallout.tsx`, `SlideLayout.tsx`, `globals.css`, `lib/utils.ts`)
**Pattern extraction date:** 2026-04-30
