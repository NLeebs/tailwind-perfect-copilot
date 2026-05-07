# Phase 8: Slide 2 Rework - Pattern Map

**Mapped:** 2026-05-07
**Files analyzed:** 5 (3 new/modified source files + 3 new test files)
**Analogs found:** 5 / 5

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `src/app/what-is-tailwind/page.tsx` | page (RSC) | request-response | `src/app/conditional-styling/page.tsx` | exact — multi-section RSC page with section spacers, two-column grid, OVERLINE const, imported client islands |
| `src/components/SemanticButton.tsx` | component (client island) | request-response | `src/components/ButtonComparison.tsx` | exact — `"use client"`, `<style>` tag for `.btn`, `BTN_CSS_DEFINITION` const, `CodeCallout` usage |
| `src/components/UtilityButton.tsx` | component (RSC) | request-response | `src/app/what-is-tailwind/page.tsx` (right column, lines 34–46) | role-match — RSC element + single-source const + `CodeCallout` pattern |
| `src/test/components/SemanticButton.test.tsx` | test | — | `src/test/components/ConditionalPanels.test.tsx` | exact — `render` + `screen.getByText` for always-visible text; `screen.getByRole("button")` |
| `src/test/components/UtilityButton.test.tsx` | test | — | `src/test/components/ConditionalPanels.test.tsx` | role-match — RSC component render, text presence assertions |
| `src/test/app/WhatIsTailwind.test.tsx` | test | — | `src/test/app/history-of-css/page.test.tsx` | exact — page-level render test, heading/text assertions |

---

## Pattern Assignments

### `src/app/what-is-tailwind/page.tsx` (page RSC — full rewrite)

**Analog:** `src/app/conditional-styling/page.tsx`

**Imports pattern** (`conditional-styling/page.tsx` lines 1–4, `what-is-tailwind/page.tsx` lines 1–3):
```typescript
import SlideLayout from "@/components/SlideLayout";
import CodeCallout from "@/components/CodeCallout";
import SemanticButton from "@/components/SemanticButton";
import UtilityButton from "@/components/UtilityButton";
```
No `"use client"` directive — page stays RSC even though it imports the `"use client"` `SemanticButton` island.

**Single-source const pattern** (`what-is-tailwind/page.tsx` lines 5–6):
```typescript
const CARD_CLASSES =
  "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm 3xl:p-10";
```
Reuse verbatim for all card shells (problem cards, naming card, Tailwind card). Add:
```typescript
const NAMING_CALLOUT = `.card-header {}\n.card-title {}\n.card-highlighted {}`;
```

**Overline const pattern** (`conditional-styling/page.tsx` lines 11–12, matching `what-is-tailwind/page.tsx` lines 14, 27):
```typescript
const OVERLINE =
  "text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base";
```
Can extract to a const or inline. Use `className={OVERLINE}` on each column overline `<p>`.

**Multi-section page structure with spacers** (`conditional-styling/page.tsx` lines 15–86):
```typescript
export default function ConditionalStyling() {
  return (
    <SlideLayout number="06" title="Conditional Styling">

      {/* ══ Section 1 ══ */}
      <section>
        {/* content */}
      </section>

      <div className="mt-16 3xl:mt-24" />

      {/* ══ Section 2 ══ */}
      <section>
        <div className="grid grid-cols-2 gap-6 3xl:gap-12">
          {/* Left column */}
          <div>
            <p className={`${OVERLINE} mb-4 3xl:mb-6`}>…</p>
            {/* demo content */}
          </div>
          {/* Right column */}
          <div>…</div>
        </div>
      </section>

      <div className="mt-16 3xl:mt-24" />

      {/* ══ Section 3 ══ */}
      <section>…</section>

    </SlideLayout>
  );
}
```
Phase 8 has 3 sections (intro banner, problem cards, demo grid). Use `<div className="mt-16 3xl:mt-24" />` between each.

**Three-column grid pattern** (`conditional-styling/page.tsx` line 29 + gap convention):
```typescript
<div className="grid grid-cols-3 gap-6 3xl:gap-12">
  <div className={CARD_CLASSES}>…</div>
  <div className={CARD_CLASSES}>…</div>
  <div className={CARD_CLASSES}>…</div>
</div>
```

**Problem card inner structure** (`what-is-tailwind/page.tsx` lines 35–42 as model for card heading/body):
```typescript
<div className={CARD_CLASSES}>
  <h3 className="text-base font-semibold text-slate-900 dark:text-white 3xl:text-xl">
    Context Switching
  </h3>
  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 3xl:text-base 3xl:mt-3">
    {/* 1–2 tight sentences */}
  </p>
</div>
```

**Column caption pattern** (`what-is-tailwind/page.tsx` lines 17–19, carried forward verbatim):
```typescript
<p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 3xl:text-xl 3xl:mt-4">
  The class name hides the implementation.
</p>
```

**Island wrapper pattern** (`what-is-tailwind/page.tsx` lines 20–22):
```typescript
<div className="mt-4 3xl:mt-8">
  <SemanticButton />
</div>
```

---

### `src/components/SemanticButton.tsx` (component, client island)

**Analog:** `src/components/ButtonComparison.tsx`

**Directive + imports** (`ButtonComparison.tsx` lines 1–3):
```typescript
"use client";
// No useState import — D-08 removes the toggle
import CodeCallout from "@/components/CodeCallout";
```
Remove the `import { useState } from "react"` line entirely. Per D-09, `"use client"` is kept even without state.

**Const to migrate verbatim** (`ButtonComparison.tsx` line 8):
```typescript
const BTN_CSS_DEFINITION = `.btn {\n  background-color: #06b6d4;\n  color: white;\n  font-weight: 600;\n  font-size: 0.875rem;\n  padding: 0.75rem 1.25rem;\n  border-radius: 0.5rem;\n}`;
```
Move this const to `SemanticButton.tsx` exactly as-is (backtick template literal with `\n`; produces actual newline characters for `whitespace-pre-wrap` rendering).

**`<style>` block to migrate verbatim** (`ButtonComparison.tsx` lines 15–27):
```typescript
<style>{`
  .btn {
    background-color: #06b6d4;
    color: white;
    font-weight: 600;
    font-size: 0.875rem;
    padding: 0.75rem 1.25rem;
    border-radius: 0.5rem;
  }
  .dark .btn {
    background-color: #0891b2;
  }
`}</style>
```

**Core pattern — button without toggle** (`ButtonComparison.tsx` lines 31–43, simplified per D-08):
```typescript
// Remove: onClick, setShowCss, showCss conditional
// Replace: always render CodeCallout unconditionally
<div>
  <button type="button" className="btn cursor-pointer">
    Button
  </button>
  <div className="mt-4 3xl:mt-8">
    <CodeCallout classes={BTN_CSS_DEFINITION} />
  </div>
</div>
```
`onClick` and `{showCss && …}` are deleted. CodeCallout renders unconditionally.

---

### `src/components/UtilityButton.tsx` (component, RSC)

**Analog:** `src/app/what-is-tailwind/page.tsx` right column (lines 34–46) and `ButtonComparison.tsx` lines 45–51

**No directive** — omit `"use client"` entirely. RSC by default per CLAUDE.md.

**Import**:
```typescript
import CodeCallout from "@/components/CodeCallout";
```

**Const to migrate verbatim** (`ButtonComparison.tsx` lines 5–6):
```typescript
const TAILWIND_BTN_CLASSES =
  "bg-cyan-500 dark:bg-cyan-600 text-white font-semibold text-sm 3xl:text-xl px-5 py-3 rounded-lg 3xl:px-8 3xl:py-4";
```

**Core pattern — button + callout** (`ButtonComparison.tsx` lines 47–51):
```typescript
<div>
  <button type="button" className={TAILWIND_BTN_CLASSES}>Button</button>
  <div className="mt-4 3xl:mt-8">
    <CodeCallout classes={TAILWIND_BTN_CLASSES} />
  </div>
</div>
```
Single-source const: `TAILWIND_BTN_CLASSES` feeds both the `className` and the `CodeCallout`.

---

### `src/test/components/SemanticButton.test.tsx` (test)

**Analog:** `src/test/components/ConditionalPanels.test.tsx`

**Imports + describe block** (`ConditionalPanels.test.tsx` lines 1–5):
```typescript
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SemanticButton from "@/components/SemanticButton";

describe("SemanticButton", () => {
```
No `fireEvent` import needed — no toggle interaction to test.

**Always-visible callout assertion pattern** (`ConditionalPanels.test.tsx` lines 13–17, adapted):
```typescript
it("renders BTN_CSS_DEFINITION callout without any click (always visible)", () => {
  render(<SemanticButton />);
  // Verify the CSS definition text is in the document on initial render — validates D-08
  expect(screen.getByText(/background-color: #06b6d4/)).toBeInTheDocument();
});
```

**Button presence assertion** (`ConditionalPanels.test.tsx` lines 33–35, adapted):
```typescript
it("renders the semantic .btn button", () => {
  render(<SemanticButton />);
  expect(screen.getByRole("button", { name: /^button$/i })).toBeInTheDocument();
});
```

---

### `src/test/components/UtilityButton.test.tsx` (test)

**Analog:** `src/test/components/ConditionalPanels.test.tsx`

**Pattern** (same imports, describe/it structure):
```typescript
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import UtilityButton from "@/components/UtilityButton";

describe("UtilityButton", () => {
  it("renders the utility button with TAILWIND_BTN_CLASSES text", () => {
    render(<UtilityButton />);
    expect(screen.getByRole("button", { name: /^button$/i })).toBeInTheDocument();
  });

  it("renders CodeCallout with TAILWIND_BTN_CLASSES text", () => {
    render(<UtilityButton />);
    // The CodeCallout renders the const value as text — match a distinctive fragment
    expect(screen.getByText(/bg-cyan-500/)).toBeInTheDocument();
  });
});
```

---

### `src/test/app/WhatIsTailwind.test.tsx` (test, page-level)

**Analog:** `src/test/app/history-of-css/page.test.tsx`

**Imports + describe block** (`history-of-css/page.test.tsx` lines 1–5):
```typescript
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import WhatIsTailwind from "@/app/what-is-tailwind/page";

describe("What is Tailwind page", () => {
```

**SlideLayout integration assertion** (`history-of-css/page.test.tsx` lines 6–9):
```typescript
it("renders within the slide layout with number 02", () => {
  render(<WhatIsTailwind />);
  expect(screen.getByText("02")).toBeInTheDocument();
});
```

**Philosophy intro assertion** (S2-01):
```typescript
it("renders the philosophy intro with utility-first text", () => {
  render(<WhatIsTailwind />);
  expect(screen.getByText(/utility-first/i)).toBeInTheDocument();
});
```

**Problem card headings assertions** (S2-02):
```typescript
it("renders all three problem card headings", () => {
  render(<WhatIsTailwind />);
  // Exact text is Claude's discretion but must include these concepts
  expect(screen.getByText(/context switching/i)).toBeInTheDocument();
  expect(screen.getByText(/naming/i)).toBeInTheDocument();
  expect(screen.getByText(/bloat/i)).toBeInTheDocument();
});
```

**Naming card callout assertion** (S2-04):
```typescript
it("renders naming card CodeCallout with .card-header {}, .card-title {}, .card-highlighted {}", () => {
  render(<WhatIsTailwind />);
  expect(screen.getByText(/.card-header \{\}/)).toBeInTheDocument();
  expect(screen.getByText(/.card-title \{\}/)).toBeInTheDocument();
  expect(screen.getByText(/.card-highlighted \{\}/)).toBeInTheDocument();
});
```
Note: `NAMING_CALLOUT` uses `\n` — `whitespace-pre-wrap` renders it as separate lines. The CodeCallout renders the full multi-line string as a single `<p>` text node. Use `screen.getByText(/.card-header {}/)` (regex) or `getByText` with the full multi-line string. Regex is safer.

---

## Shared Patterns

### Single-Source Const
**Source:** `src/app/what-is-tailwind/page.tsx` lines 5–6 and `src/components/ButtonComparison.tsx` lines 5–6, 8
**Apply to:** Every named const used in both a rendered element and a `CodeCallout`
```typescript
const FOO = "complete static class string or CSS definition";
// element
<element className={FOO}>…</element>
// callout — identical string, zero drift
<CodeCallout classes={FOO} />
```

### Dark Mode: `dark:` prefix only
**Source:** `src/app/globals.css` (`@custom-variant dark (&:where(.dark, .dark *))`)
**Apply to:** All new elements with color, background, or border
- Card shells: covered by `CARD_CLASSES` (`dark:bg-slate-900 dark:border-slate-800`)
- Headings: `dark:text-white`
- Body/caption text: `dark:text-slate-400`
- Overlines: `dark:text-cyan-400`
- No `prefers-color-scheme`. No JS class toggling in components (ThemeToggle handles it globally).

### Section Spacer
**Source:** `src/app/conditional-styling/page.tsx` lines 25, 77
**Apply to:** Between all major sections in `page.tsx`
```typescript
<div className="mt-16 3xl:mt-24" />
```

### 3xl: Escalation Ratios
**Source:** `src/app/what-is-tailwind/page.tsx` lines 5–6, 14, 17, 20, 35, 38 + Phase 7 CONTEXT.md
**Apply to:** Every text size and spacing class in new elements
| Base | 3xl: escalation |
|------|----------------|
| `text-xs` | `3xl:text-base` (overlines) |
| `text-sm` | `3xl:text-xl` (body/caption) or `3xl:text-base` (card body) |
| `text-base` | `3xl:text-xl` (card headings) |
| `text-2xl+` | `3xl:text-4xl+` (intro banner heading) |
| `gap-6` | `3xl:gap-12` |
| `p-6` | `3xl:p-10` (already in `CARD_CLASSES`) |
| `mt-4` | `3xl:mt-8` |
| `mt-16` | `3xl:mt-24` |

### `CodeCallout` API
**Source:** `src/components/CodeCallout.tsx` lines 1–11
**Apply to:** All callout usages in new components and page
```typescript
// Single prop — accepts any string including multi-line (whitespace-pre-wrap handles \n)
<CodeCallout classes={SOME_CONST} />
```
RSC component — no `"use client"` needed on importers unless they already have it for other reasons.

### Leaf-Node Client Island Rule
**Source:** CLAUDE.md §Interactive demo patterns
**Apply to:** `SemanticButton.tsx` only
```typescript
// SemanticButton.tsx — "use client" at top of file
"use client";
// page.tsx — NO "use client" even though it imports SemanticButton
// UtilityButton.tsx — NO "use client" (no state, no browser APIs)
```

---

## No Analog Found

All files in this phase have strong analogs. No files require falling back to RESEARCH.md patterns alone.

---

## Metadata

**Analog search scope:** `src/app/`, `src/components/`, `src/test/`
**Files scanned:** 8 source files read (what-is-tailwind/page.tsx, ButtonComparison.tsx, CodeCallout.tsx, SlideLayout.tsx, conditional-styling/page.tsx, ConditionalPanels.test.tsx, history-of-css/page.test.tsx, test file listing)
**Pattern extraction date:** 2026-05-07
