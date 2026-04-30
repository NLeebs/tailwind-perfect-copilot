# Phase 5: Slide 5 — Customizing Tailwind - Pattern Map

**Mapped:** 2026-04-30
**Files analyzed:** 5 (3 new, 2 modified)
**Analogs found:** 4 / 5

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `src/components/ShikiBlock.tsx` | component (async RSC) | request-response (server render) | `src/components/CodeCallout.tsx` | partial — same RSC role; different rendering mechanism |
| `src/app/customizing-tailwind/page.tsx` | component (slide page RSC) | request-response | `src/app/responsiveness-dark-mode/page.tsx` | exact — same role, same stacked-section layout, same two-column grid |
| `src/app/globals.css` | config | transform (Tailwind token pipeline) | `src/app/globals.css` (self) | self-modification — add to existing `@theme` block and add new `@utility` rule |
| `src/test/mocks/shiki.ts` | utility (Vitest mock) | — | `src/test/mocks/next-link.tsx` | role-match — same mock file structure; different module shape |
| `src/test/app/slide-pages.test.tsx` | test | — | `src/test/app/slide-pages.test.tsx` (self) | self-modification — remove `"05"` from `stubCases` filter; add content-presence assertions |

---

## Pattern Assignments

### `src/components/ShikiBlock.tsx` (async RSC, request-response)

**Analog:** `src/components/CodeCallout.tsx`

**Why this analog:** Only other pure-RSC component in `src/components/`. No client state needed; receives a prop, returns JSX. The pattern differences (async, `dangerouslySetInnerHTML`) are prescribed by RESEARCH.md — the analog gives the import style, Readonly prop interface, and mono-font display conventions.

**Imports pattern** (CodeCallout.tsx lines 1–11 — no imports; pattern is zero-import RSC with inline interface):
```tsx
// CodeCallout has no imports — uses only JSX + a typed props interface.
// ShikiBlock adds one import:
import { codeToHtml } from 'shiki'

interface ShikiBlockProps {
  code: string
  lang: string
}
```

**Props interface pattern** (CodeCallout.tsx lines 1–3):
```tsx
interface CodeCalloutProps {
  classes: string;
}

export default function CodeCallout({ classes }: Readonly<CodeCalloutProps>) {
```
Copy the `Readonly<Props>` destructure pattern and single-string-prop interface shape.

**Core rendering pattern** — no codebase analog exists for `dangerouslySetInnerHTML`; use RESEARCH.md pattern verbatim:
```tsx
// RESEARCH.md Code Examples — ShikiBlock (lines 340–373)
const DARK_OVERRIDES = `.dark .shiki, .dark .shiki span {
  color: var(--shiki-dark) !important;
  background-color: var(--shiki-dark-bg) !important;
}`

export default async function ShikiBlock({ code, lang }: Readonly<ShikiBlockProps>) {
  const html = await codeToHtml(code, {
    lang,
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
  })
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: DARK_OVERRIDES }} />
      <div
        className="overflow-x-auto rounded-xl text-sm leading-relaxed 3xl:text-base"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  )
}
```

**Tailwind class conventions to copy from CodeCallout** (CodeCallout.tsx line 7):
```
rounded-xl (or rounded-lg)
text-sm 3xl:text-base
dark: prefix for dark-mode variants
border border-slate-200 dark:border-slate-700
bg-slate-100 dark:bg-slate-800
```

**No error handling needed** — `codeToHtml` throws synchronously on bad lang; code strings are hardcoded constants so no runtime I/O failure paths.

---

### `src/app/customizing-tailwind/page.tsx` (slide page RSC, request-response)

**Analog:** `src/app/responsiveness-dark-mode/page.tsx` (primary) + `src/app/what-is-tailwind/page.tsx` (two-column grid)

**Why this analog:** Phase 4 (`responsiveness-dark-mode/page.tsx`) is the most recent completed slide page and establishes: stacked `<section>` blocks, `<div className="mt-16 3xl:mt-24" />` spacer, overline labels, `h2` subheadings, `CodeCallout` usage, and `SlideLayout` wrapper. Phase 2 (`what-is-tailwind/page.tsx`) establishes the `grid grid-cols-2 gap-6 3xl:gap-12` two-column layout that Phase 5 uses per D-05.

**Imports pattern** (responsiveness-dark-mode/page.tsx lines 1–3):
```tsx
import SlideLayout from "@/components/SlideLayout";
import CodeCallout from "@/components/CodeCallout";
// ADD:
import ShikiBlock from "@/components/ShikiBlock";
// (no "use client" — all RSC)
```

**Static const pattern** (responsiveness-dark-mode/page.tsx lines 7–11 + what-is-tailwind/page.tsx lines 5–6):
```tsx
// Single-source consts — each drives both the ShikiBlock code prop AND any CodeCallout.
// Copy this naming/placement convention directly above the export default.
const THEME_SNIPPET = `@theme {
  --color-brand-500: #3b82f6;
}`

const UTILITY_SNIPPET = `@utility scrollbar-hidden {
  scrollbar-width: none;
}`

const BASE_SNIPPET = `@layer base {
  h1 {
    @apply font-bold tracking-tight text-transparent
           bg-clip-text bg-linear-to-r
           from-slate-900 to-slate-500
           dark:from-white dark:to-slate-400;
  }
}`

const V3_EQUIVALENT = `@layer utilities {
  .scrollbar-hidden {
    scrollbar-width: none;
  }
}`
```

**Stacked section + spacer pattern** (responsiveness-dark-mode/page.tsx lines 16–31):
```tsx
export default function CustomizingTailwind() {
  return (
    <SlideLayout number="05" title="Customizing Tailwind">
      <section>
        {/* ... section content ... */}
      </section>

      {/* Spacer between sections */}
      <div className="mt-16 3xl:mt-24" />

      <section>
        {/* ... section content ... */}
      </section>

      <div className="mt-16 3xl:mt-24" />

      <section>
        {/* ... section content ... */}
      </section>
    </SlideLayout>
  )
}
```

**Overline label pattern** (responsiveness-dark-mode/page.tsx line 74, what-is-tailwind/page.tsx lines 14–16):
```tsx
<p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base">
  CSS-FIRST CONFIG
</p>
```

**Two-column grid pattern** (what-is-tailwind/page.tsx lines 11–12):
```tsx
<div className="mt-8 grid grid-cols-2 gap-6 3xl:gap-12 3xl:mt-12">
  {/* Left: ShikiBlock */}
  {/* Right: demo element + CodeCallout */}
</div>
```

**Section h2 + description pattern** (responsiveness-dark-mode/page.tsx lines 18–23):
```tsx
<h2 className="text-xl font-semibold text-slate-900 dark:text-white 3xl:text-3xl">
  Section Title
</h2>
<p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 3xl:text-xl 3xl:mt-4">
  Description text.
</p>
```

**CodeCallout usage pattern** (responsiveness-dark-mode/page.tsx lines 77, 83):
```tsx
<CodeCallout classes={NAMED_CONST} />
```

**No error handling needed** — static RSC, no data fetching, all strings are compile-time constants. ShikiBlock `await` exceptions propagate to Next.js error boundary.

---

### `src/app/globals.css` (config, self-modification)

**Analog:** `src/app/globals.css` itself (lines 41–45 — the existing plain `@theme` block)

**Critical pitfall (from RESEARCH.md Pitfall 2):** Two `@theme` blocks exist. `--color-brand-500` must go into the PLAIN `@theme {}` block (lines 41–45), NOT the `@theme inline {}` block (lines 10–15). Only plain `@theme` generates utility classes.

**Existing plain `@theme` block** (globals.css lines 41–45):
```css
@theme {
  --breakpoint-3xl: 1920px;
  --breakpoint-4xl: 2560px;
  --animate-reveal-up: reveal-up 0.7s ease-out both;
}
```
Add `--color-brand-500: #3b82f6;` as the last token inside this block.

**`@utility` insertion point** — add as a new top-level rule after the closing `}` of the `@theme` block (after line 45):
```css
@utility scrollbar-hidden {
  scrollbar-width: none;
}
```

**No other changes to globals.css.** The `@layer base h1` rule (lines 23–27) already exists and needs no modification — it is only displayed in Section 3 of the slide.

---

### `src/test/mocks/shiki.ts` (Vitest mock, utility)

**Analog:** `src/test/mocks/next-link.tsx`

**Why this analog:** The only existing file in `src/test/mocks/`. It shows the pattern: a plain TypeScript/TSX file that exports a replacement for a module resolved via `vitest.config.mts` `resolve.alias`.

**Existing mock pattern** (next-link.tsx lines 1–15):
```tsx
import React from "react";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => (
    <a href={href} ref={ref} {...props}>
      {children}
    </a>
  )
);
Link.displayName = "Link";
export default Link;
```

**Shiki mock shape** — `shiki` exports named function `codeToHtml`; the mock must export the same named function:
```ts
// src/test/mocks/shiki.ts
export async function codeToHtml(_code: string, _options: unknown): Promise<string> {
  return '<pre class="shiki"><code>MOCK</code></pre>'
}
```

**Wire-up pattern** — add an alias entry to `vitest.config.mts` `resolve.alias` (same pattern as the `next/link` alias at line 24):
```ts
// vitest.config.mts — ADD to resolve.alias:
"shiki": path.resolve(__dirname, "./src/test/mocks/shiki.ts"),
```

**Key difference from next-link mock:** `codeToHtml` is a named async export, not a default export React component. The mock is a plain `.ts` file (no JSX), not `.tsx`.

---

### `src/test/app/slide-pages.test.tsx` (test, self-modification)

**Analog:** `src/test/app/slide-pages.test.tsx` itself (lines 22–24)

**Why this is a self-modification:** The test file already imports `CustomizingTailwind` and already has a `stubCases` filter. Two changes are required:

**Change 1 — Remove `"05"` from stubCases** (slide-pages.test.tsx lines 22–24):
```tsx
// BEFORE:
const stubCases = allCases.filter(({ number }) =>
  ["04", "05", "06"].includes(number)
);

// AFTER:
const stubCases = allCases.filter(({ number }) =>
  ["06"].includes(number)
);
```
Note: `"04"` is also completed (Phase 4 done per git log). Remove both `"04"` and `"05"`.

**Change 2 — Add content-presence assertions** (after the existing `describe` block, following the same `describe`/`it`/`screen.getByText` pattern from lines 26–50):
```tsx
describe("Customizing Tailwind content", () => {
  it("renders the @utility scrollbar-hidden snippet", () => {
    render(<CustomizingTailwind />)
    expect(screen.getByText(/scrollbar-hidden/i)).toBeInTheDocument()
  })

  it("renders the @layer base snippet", () => {
    render(<CustomizingTailwind />)
    expect(screen.getByText(/@layer base/i)).toBeInTheDocument()
  })
})
```

**Test infrastructure pattern** (slide-pages.test.tsx lines 1–2):
```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
```
No additional imports needed — same testing utilities already imported.

---

## Shared Patterns

### Overline Label (cross-cutting: applies to all three `<section>` blocks in page.tsx)
**Source:** `src/app/responsiveness-dark-mode/page.tsx` lines 74, 80; `src/app/what-is-tailwind/page.tsx` lines 14–16
```tsx
<p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base">
  SECTION LABEL
</p>
```

### 3xl: TV-Scale Escalations (cross-cutting: applies to all text and spacing in page.tsx and ShikiBlock.tsx)
**Source:** `src/app/responsiveness-dark-mode/page.tsx` — see usage throughout
- Text: `text-sm 3xl:text-base`, `text-xl 3xl:text-3xl`, `text-xs 3xl:text-base`
- Spacing: `mt-8 3xl:mt-12`, `mt-16 3xl:mt-24`, `gap-6 3xl:gap-12`
- Never omit `3xl:` — every text size and margin in the slide must have an escalation

### Single-Source Const (cross-cutting: applies to all snippet strings in page.tsx)
**Source:** `src/app/responsiveness-dark-mode/page.tsx` lines 5–11; `src/app/what-is-tailwind/page.tsx` lines 5–6
```tsx
// Pattern: named const defined once, passed to both ShikiBlock code prop and any CodeCallout classes prop.
// const FOO = "..." is defined at module scope, above the export default.
const SOME_SNIPPET = `...css here...`
// Used as:
<ShikiBlock code={SOME_SNIPPET} lang="css" />
<CodeCallout classes={SOME_SNIPPET} />  // only when showing v3 equivalent
```

### Dark Mode via `dark:` prefix (cross-cutting: applies to all visible elements)
**Source:** `src/app/globals.css` line 8; `CLAUDE.md` §Tailwind v4 specifics
```css
@custom-variant dark (&:where(.dark, .dark *));
```
Use `dark:` prefix classes everywhere. Never use `prefers-color-scheme`. The `.dark` class on `<html>` is what ShikiBlock's raw `<style>` tag targets.

### No Dynamic Class Interpolation (cross-cutting: brand swatch demo element)
**Source:** `CLAUDE.md` §Tailwind v4 specifics
```tsx
// CORRECT — complete static string:
<div className="h-16 w-full rounded-xl bg-brand-500 3xl:h-24" />

// WRONG — Tailwind cannot detect this:
<div className={`bg-${color}-500`} />
```

---

## No Analog Found

| File | Role | Data Flow | Reason |
|---|---|---|---|
| `src/components/ShikiBlock.tsx` (async render core) | component | request-response | No async RSC with `dangerouslySetInnerHTML` exists in this codebase. The rendering pattern comes from RESEARCH.md Code Examples (verified against Shiki docs), not a codebase analog. The component shell and Tailwind class conventions copy from `CodeCallout.tsx`. |

---

## Metadata

**Analog search scope:** `src/components/`, `src/app/`, `src/test/`
**Files read:** 10 (CONTEXT.md, RESEARCH.md, CodeCallout.tsx, SlideLayout.tsx, responsiveness-dark-mode/page.tsx, utility-classes/page.tsx, what-is-tailwind/page.tsx, customizing-tailwind/page.tsx, globals.css, next-link.tsx, slide-pages.test.tsx, vitest.config.mts)
**Pattern extraction date:** 2026-04-30
