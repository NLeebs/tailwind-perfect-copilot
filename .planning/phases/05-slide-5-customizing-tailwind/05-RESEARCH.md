# Phase 5: Slide 5 — Customizing Tailwind - Research

**Researched:** 2026-04-30
**Domain:** Shiki syntax highlighting (RSC, dual-theme), Tailwind v4 `@theme` / `@utility` / `@layer base`
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Use Shiki dual-theme CSS variable approach — one render per code block; each `<span>` carries both `--shiki-light` and `--shiki-dark` CSS variable values. A CSS rule `html.dark .shiki span { color: var(--shiki-dark) }` (with `!important` if needed for inline-style specificity) flips the colors in dark mode.
- **D-02:** Prototype required as plan 1. Before building the full slide, create a minimal prototype page or component that verifies the dual-theme approach works with this project's `@custom-variant dark (&:where(.dark, .dark *))` mechanism. If specificity fails, fall back to the two-render CSS-toggle approach.
- **D-03:** Shiki rendering happens in RSC (Server Components) — no client-side highlighting needed.
- **D-04:** Three full-width stacked sections separated by `<div className="mt-16 3xl:mt-24" />` spacers.
- **D-05:** Each section: Shiki code block on the left, live demo + `CodeCallout` on the right — `grid grid-cols-2 gap-6 3xl:gap-12`.
- **D-06:** Show relevant excerpts only — NOT the full file. Each section shows only its teaching snippet (~3–5 lines).
- **D-07:** Snippet strings are hardcoded static constants (no runtime file reads).
- **D-08:** Add `--color-brand-500: #3b82f6` to the existing `@theme { }` block in globals.css.
- **D-09:** Add `@utility scrollbar-hidden { ... }` to globals.css.

### Claude's Discretion

- Exact brand color value (suggested `#3b82f6`)
- Exact `@utility scrollbar-hidden` CSS property (`overflow: hidden` vs `scrollbar-width: none`)
- Live demo element for `bg-brand-500`
- Live demo element for `@layer base`
- Shiki theme choices (suggested `github-light` + `github-dark` or `vitesse-light` + `vitesse-dark`)
- Exact `3xl:` escalations

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| S5-01 | Show `globals.css` `@theme` block with `--color-brand-500` token alongside a live component using `bg-brand-500`, demonstrating auto-generated utility class | Tailwind v4 `@theme` syntax confirmed; `--color-brand-500: #3b82f6` generates `bg-brand-500` automatically |
| S5-02 | Show `@utility scrollbar-hidden` definition with explicit `CodeCallout` naming the v3 equivalent (`@layer utilities`) | Tailwind v4 `@utility` syntax confirmed; `@utility` replaces `@layer utilities` in v4 |
| S5-03 | Show existing `@layer base { h1 { ... } }` gradient rule as live artifact, with callout explaining no extra class needed | `@layer base` syntax confirmed; h1 already in globals.css with gradient; SlideLayout renders h1 naturally |
</phase_requirements>

---

## Summary

Phase 5 adds a Shiki-highlighted code presentation layer to the existing slide infrastructure. The primary technical challenge is getting the Shiki dual-theme CSS variable approach to work correctly with this project's `@custom-variant dark (&:where(.dark, .dark *))` selector. The Tailwind v4 content (`@theme`, `@utility`, `@layer base`) is straightforward — syntax is verified and the relevant tokens already exist or need only a single line added.

**The Shiki dark mode CSS selector is the only meaningful risk.** Shiki's class-based dark mode documentation prescribes `html.dark .shiki, html.dark .shiki span { color: var(--shiki-dark) !important; ... }`. This project's `@custom-variant dark` generates selectors matching `:where(.dark, .dark *)`, which means the `dark` class lives on `<html>`. The selector `.dark .shiki, .dark .shiki span` is functionally equivalent and will work — `html.dark` and `.dark` (when applied to `<html>`) are the same DOM node. The `!important` flag is required because Shiki's dual-theme output embeds colors as inline `style=""` attributes, which have higher specificity than class selectors without `!important`.

The `defaultColor: false` option is an alternative worth knowing: it omits inline `color` attributes entirely, leaving only `--shiki-light` and `--shiki-dark` CSS variables on each span, eliminating the need for `!important`. However the default dual-theme output (with `defaultColor` defaulting to `'light'`) is simpler and equally valid with `!important`.

**Primary recommendation:** Build `ShikiBlock.tsx` as an async RSC using `codeToHtml` with `themes: { light, dark }` and inject a `<style>` tag containing `.dark .shiki, .dark .shiki span { color: var(--shiki-dark) !important; background-color: var(--shiki-dark-bg) !important; }`. Prototype this first (D-02) before the full slide.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Shiki syntax highlighting | Frontend Server (RSC) | — | Async `codeToHtml` runs at render time on the server; output is static HTML shipped to browser |
| Dark mode CSS switch for Shiki | Browser / Client | — | CSS rule injected via `<style>` tag; ThemeToggle toggles `.dark` on `<html>` which triggers the rule |
| `@theme` / `@utility` additions to globals.css | Frontend Server (SSR) | — | CSS-only changes applied at build/serve time by Tailwind |
| Live demo elements (swatch, h1) | Frontend Server (RSC) | — | Static JSX in page.tsx; no interactivity needed |
| Section layout and CodeCallout | Frontend Server (RSC) | — | RSC components, no state |

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| shiki | 4.0.2 | Syntax highlighting HTML from code strings | Already installed; official Shiki release; async-capable for RSC |

[VERIFIED: npm registry — `npm view shiki version` returned `4.0.2`, published 2026-03-09]

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `codeToHtml` (shiki export) | 4.0.2 | Convert code string to highlighted HTML with dual-theme | One-shot per snippet; simplest API for RSC use |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `codeToHtml` dual-theme | Two separate renders, CSS-toggle approach | More DOM weight; simpler CSS but doubles render work. Use only if D-02 prototype shows specificity failure |
| `defaultColor: 'light'` (default) + `!important` CSS | `defaultColor: false` + plain CSS | `defaultColor: false` avoids `!important` but requires CSS for both light AND dark explicitly; default is simpler |

**Installation:** No new packages needed — Shiki is already installed at 4.0.2.

---

## Architecture Patterns

### System Architecture Diagram

```
page.tsx (RSC)
  └── SlideLayout (RSC)
        └── children:
              ├── Section 1: @theme
              │     ├── ShikiBlock (async RSC) ← static CSS snippet string
              │     │     └── codeToHtml(snippet, { lang:'css', themes:{light,dark} })
              │     │     └── <style> .dark .shiki... </style>
              │     │     └── <div dangerouslySetInnerHTML /> (highlighted HTML)
              │     └── Right col: brand swatch (bg-brand-500) + CodeCallout
              ├── Spacer div
              ├── Section 2: @utility
              │     ├── ShikiBlock (async RSC) ← static CSS snippet string
              │     └── Right col: CodeCallout (v3 equivalent)
              ├── Spacer div
              └── Section 3: @layer base
                    ├── ShikiBlock (async RSC) ← static CSS snippet string
                    └── Right col: live <h1> demo + label
```

### Recommended Project Structure

```
src/
├── components/
│   └── ShikiBlock.tsx       # new async RSC — accepts code + lang; renders dual-theme HTML
├── app/
│   └── customizing-tailwind/
│       └── page.tsx         # replaces stub; three-section layout
└── app/
    └── globals.css          # +--color-brand-500 in @theme; +@utility scrollbar-hidden
```

### Pattern 1: Async RSC with `codeToHtml` (dual-theme)

**What:** An `async` Server Component that calls `codeToHtml` at render time and returns raw HTML via `dangerouslySetInnerHTML`. Includes a co-located `<style>` tag with the dark-mode overrides.

**When to use:** Every code snippet in the slide. No client JS required.

**Example:**
```tsx
// Source: https://github.com/shikijs/shiki/blob/main/docs/packages/next.md
// + https://github.com/shikijs/shiki/blob/main/docs/guide/dual-themes.md
import { codeToHtml } from 'shiki'

const DARK_OVERRIDES = `
  .dark .shiki,
  .dark .shiki span {
    color: var(--shiki-dark) !important;
    background-color: var(--shiki-dark-bg) !important;
  }
`

interface ShikiBlockProps {
  code: string
  lang: string
}

export default async function ShikiBlock({ code, lang }: ShikiBlockProps) {
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
        className="overflow-x-auto rounded-xl text-sm 3xl:text-base"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  )
}
```

[VERIFIED: Context7 /shikijs/shiki — dual-themes, Next.js RSC patterns]

### Pattern 2: Tailwind v4 `@theme` Custom Color Token

**What:** Add a CSS custom property under `--color-*` namespace inside any `@theme {}` block. Tailwind v4 auto-generates utility classes (`bg-brand-500`, `text-brand-500`, `border-brand-500`, etc.) from the token.

**When to use:** Any new design token. No JavaScript config needed.

**Example:**
```css
/* Source: https://tailwindlabs.github.io/tailwindcss.com/docs/adding-custom-styles */
@theme {
  --breakpoint-3xl: 1920px;
  --breakpoint-4xl: 2560px;
  --animate-reveal-up: reveal-up 0.7s ease-out both;
  --color-brand-500: #3b82f6;   /* ← add here; generates bg-brand-500 etc. */
}
```

[VERIFIED: Context7 /tailwindlabs/tailwindcss.com — @theme directive docs]

### Pattern 3: Tailwind v4 `@utility` Custom Utility

**What:** `@utility` in v4 replaces `@layer utilities` in v3 for custom utilities. Produces a named Tailwind utility class. Utilities defined this way participate in Tailwind's cascade order.

**When to use:** Any custom reusable CSS pattern that should behave like a Tailwind class.

**Example:**
```css
/* Source: https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/upgrade-guide.mdx */
@utility scrollbar-hidden {
  scrollbar-width: none;
}
```

The v3 equivalent (for the `CodeCallout`) is:
```css
/* v3 equivalent shown in callout */
@layer utilities {
  .scrollbar-hidden {
    scrollbar-width: none;
  }
}
```

[VERIFIED: Context7 /tailwindlabs/tailwindcss.com — @utility directive docs, upgrade guide]

### Pattern 4: `@layer base` Global Element Styles

**What:** `@layer base` applies styles to bare HTML elements. The existing `h1` gradient rule in `globals.css` is already in place — the slide only needs to show the code and point to the live h1 rendered by `SlideLayout`.

**Existing globals.css rule (exact source):**
```css
@layer base {
  h1 {
    @apply font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400;
  }
}
```

[VERIFIED: read `src/app/globals.css` directly]

### Anti-Patterns to Avoid

- **`html.dark` selector in globals.css:** This project's dark mode variant is `@custom-variant dark (&:where(.dark, .dark *))`. The Shiki override CSS does NOT go through Tailwind's `@custom-variant` — it is raw CSS in a `<style>` tag, so `html.dark` and `.dark` both work (the `.dark` class IS on `<html>`). Do not use Tailwind's `dark:` prefix inside the `<style>` tag injected by ShikiBlock — plain CSS only.
- **`prefers-color-scheme` in Shiki override CSS:** CLAUDE.md explicitly prohibits this; use `.dark .shiki` selector instead.
- **Reading globals.css at runtime:** Snippet strings must be hardcoded constants (D-07). Never use `fs.readFile` or `import` from the CSS file.
- **Dynamic class interpolation in demo elements:** The brand swatch must use a complete static class string (`bg-brand-500`), not `bg-${color}-500`.
- **`"use client"` on `page.tsx`:** All three sections are RSC. ShikiBlock is `async` and must not be a client component.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| CSS syntax highlighting | Manual regex/tokenizer | `shiki` `codeToHtml` | Shiki uses TextMate grammars; handles every edge case in CSS/Tailwind syntax |
| Dark mode color switching for code | Manual inline-style swapping via React state | CSS variable override in `<style>` tag | No JS needed; ThemeToggle already sets `.dark` on `<html>` |

**Key insight:** Shiki's dual-theme output embeds every color in both `--shiki-light` and `--shiki-dark` CSS variables directly on each `<span>`. The browser switches themes with a single CSS rule — no re-render, no JavaScript.

---

## Common Pitfalls

### Pitfall 1: Inline Styles Have Higher Specificity Than Class Selectors

**What goes wrong:** `.dark .shiki span { color: var(--shiki-dark) }` has no effect — the highlighted spans already have `style="color:#..."` which overrides the class selector.

**Why it happens:** Shiki dual-theme output (default `defaultColor: 'light'`) renders each span with an inline `style` attribute containing the light-theme color directly. Inline styles win over any class selector.

**How to avoid:** Add `!important` to the CSS variable overrides:
```css
.dark .shiki, .dark .shiki span {
  color: var(--shiki-dark) !important;
  background-color: var(--shiki-dark-bg) !important;
}
```

Alternatively, use `defaultColor: false` which omits inline `color` styles entirely — then no `!important` is needed. The D-02 prototype will confirm which approach is needed.

[VERIFIED: Context7 /shikijs/shiki — dual-themes section, defaultColor false section]

**Warning signs:** Light theme colors appear in dark mode; toggling ThemeToggle has no effect on code block colors.

### Pitfall 2: `@theme inline` vs `@theme` — Token Scope

**What goes wrong:** Adding `--color-brand-500` to the existing `@theme inline { ... }` block does NOT generate utility classes — the `inline` keyword means "expose as CSS custom properties only, do not generate utilities."

**Why it happens:** The project's `globals.css` has two `@theme` blocks: one is `@theme inline` (for `--color-background`, `--color-foreground`, fonts) and the other is plain `@theme` (for breakpoints, animation). Only plain `@theme` generates utility classes.

**How to avoid:** Add `--color-brand-500: #3b82f6` to the PLAIN `@theme { }` block (the one with breakpoints), NOT to `@theme inline { }`.

[VERIFIED: read `src/app/globals.css` directly — confirmed two separate blocks exist]

**Warning signs:** `bg-brand-500` produces no styling in the browser; Tailwind doesn't list the class.

### Pitfall 3: ShikiBlock Needs a Shiki Mock for Vitest

**What goes wrong:** Tests that `render(<CustomizingTailwind />)` fail because `codeToHtml` is an async function that Vitest's jsdom environment cannot call (it may try to load language grammars, WASM, etc.).

**Why it happens:** The existing `slide-pages.test.tsx` already imports `CustomizingTailwind`. Once the stub is replaced with a page that imports `ShikiBlock` (which calls `codeToHtml`), the test suite may break unless Shiki is mocked.

**How to avoid:** Either (a) mock `shiki` in the Vitest config/setup so `codeToHtml` returns a deterministic stub, or (b) structure `ShikiBlock` so the test renders a thin wrapper that doesn't execute `codeToHtml`. Pattern (a) is consistent with how the project mocks `next/link`. Add a `shiki` mock to `src/test/mocks/` or use `vi.mock('shiki', ...)` in the test file.

[VERIFIED: read `src/test/app/slide-pages.test.tsx`, `vitest.config.mts`, `src/test/mocks/`]

**Warning signs:** `yarn test` fails after adding ShikiBlock with "cannot resolve wasm" or async component errors.

### Pitfall 4: `slide-pages.test.tsx` Stub List Must Be Updated

**What goes wrong:** The test file asserts that slide 05 shows "Content coming soon" (it is in the `stubCases` list). After implementing the slide, this assertion will fail — and correctly so.

**Why it happens:** `stubCases` filters by `["04", "05", "06"]`. Phase 4 was completed; Phase 5 completion makes 05 no longer a stub.

**How to avoid:** When replacing the stub, also update `slide-pages.test.tsx` to remove `"05"` from the `stubCases` filter. This is a required test maintenance step.

[VERIFIED: read `src/test/app/slide-pages.test.tsx` line 22]

**Warning signs:** `yarn test` passes before page replacement; fails after with "expected to find 'Content coming soon'" error on slide 05.

### Pitfall 5: Style Tag Duplication in SSR

**What goes wrong:** If `ShikiBlock` is rendered three times on the same page, the `<style>` tag with `.dark .shiki` overrides is injected three times, causing minor redundancy.

**Why it happens:** Each `ShikiBlock` instance independently injects its `<style>`. This is not a functional bug but adds noise.

**How to avoid:** Accept the duplication — it is harmless (CSS is idempotent). Or inject the dark override CSS once in the page-level JSX rather than inside `ShikiBlock`. Either approach works; the per-component injection is simpler for encapsulation.

[ASSUMED: Based on how `dangerouslySetInnerHTML` style injection works in React RSC. No functional issue verified or expected.]

---

## Code Examples

### ShikiBlock Component (full, verified pattern)

```tsx
// Source: https://github.com/shikijs/shiki/blob/main/docs/packages/next.md
// Source: https://github.com/shikijs/shiki/blob/main/docs/guide/dual-themes.md
import { codeToHtml } from 'shiki'

const DARK_OVERRIDES = `.dark .shiki, .dark .shiki span {
  color: var(--shiki-dark) !important;
  background-color: var(--shiki-dark-bg) !important;
}`

interface ShikiBlockProps {
  code: string
  lang: 'css' | 'typescript' | 'javascript'
}

export default async function ShikiBlock({ code, lang }: ShikiBlockProps) {
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

### globals.css Additions

```css
/* ADD to the existing plain @theme { } block (the one with breakpoints) */
@theme {
  --breakpoint-3xl: 1920px;
  --breakpoint-4xl: 2560px;
  --animate-reveal-up: reveal-up 0.7s ease-out both;
  --color-brand-500: #3b82f6;   /* ← NEW */
}

/* ADD as a new top-level rule after @theme */
@utility scrollbar-hidden {
  scrollbar-width: none;
}
```

### Snippet Constants (hardcoded, single-source)

```ts
// Each constant drives both the ShikiBlock code prop AND any related CodeCallout

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

// v3 equivalent callout for @utility section
const V3_EQUIVALENT = `@layer utilities {
  .scrollbar-hidden {
    scrollbar-width: none;
  }
}`
```

### Page Structure Skeleton

```tsx
// page.tsx — RSC, no "use client"
import SlideLayout from "@/components/SlideLayout"
import CodeCallout from "@/components/CodeCallout"
import ShikiBlock from "@/components/ShikiBlock"

const THEME_SNIPPET = `...`  // static const
const UTILITY_SNIPPET = `...`
const BASE_SNIPPET = `...`
const V3_EQUIVALENT = `...`

export default function CustomizingTailwind() {
  return (
    <SlideLayout number="05" title="Customizing Tailwind">
      {/* Section 1 — @theme */}
      <section>
        <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base">
          CSS-FIRST CONFIG
        </p>
        <div className="mt-8 grid grid-cols-2 gap-6 3xl:gap-12 3xl:mt-12">
          <ShikiBlock code={THEME_SNIPPET} lang="css" />
          <div>
            <div className="h-16 w-full rounded-xl bg-brand-500 3xl:h-24" />
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 3xl:text-lg">
              bg-brand-500 — auto-generated from the token above
            </p>
          </div>
        </div>
      </section>

      <div className="mt-16 3xl:mt-24" />

      {/* Section 2 — @utility */}
      <section>
        <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base">
          CUSTOM UTILITIES
        </p>
        <div className="mt-8 grid grid-cols-2 gap-6 3xl:gap-12 3xl:mt-12">
          <ShikiBlock code={UTILITY_SNIPPET} lang="css" />
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base mb-2">
              V3 EQUIVALENT
            </p>
            <CodeCallout classes={V3_EQUIVALENT} />
          </div>
        </div>
      </section>

      <div className="mt-16 3xl:mt-24" />

      {/* Section 3 — @layer base */}
      <section>
        <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base">
          BASE LAYER RULES
        </p>
        <div className="mt-8 grid grid-cols-2 gap-6 3xl:gap-12 3xl:mt-12">
          <ShikiBlock code={BASE_SNIPPET} lang="css" />
          <div>
            <h1 className="text-3xl 3xl:text-5xl">Live h1 Demo</h1>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 3xl:text-lg">
              No class needed — this h1 inherits the gradient from @layer base.
            </p>
          </div>
        </div>
      </section>
    </SlideLayout>
  )
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Tailwind v3: custom utilities in `@layer utilities { .classname { ... } }` | Tailwind v4: `@utility utilityname { ... }` (no dot, no @layer) | Tailwind v4.0 (2025) | Simpler syntax; utilities automatically compose with variants |
| Tailwind v3: custom colors in `tailwind.config.js` `theme.extend.colors` | Tailwind v4: `@theme { --color-name: value; }` in CSS | Tailwind v4.0 (2025) | No JS config file needed; tokens auto-generate utility classes |
| Shiki: `createHighlighter` then `.highlight()` | Shiki v1+: `codeToHtml()` shorthand (one-shot async) | Shiki v1.0 | Simpler API for RSC; no highlighter instance management |

**Deprecated/outdated:**
- `@layer utilities { .className { ... } }` for custom utilities: replaced by `@utility className { ... }` in Tailwind v4. The v3 form still works in v4 but is the "old way" — show it only in the CodeCallout as the explicit v3 equivalent.
- `tailwind.config.js theme.extend.colors`: replaced by `@theme { --color-name: value; }` in v4. Project has no `tailwind.config.js`.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `<style dangerouslySetInnerHTML>` inside an async RSC renders correctly in Next.js 16 App Router without deduplication warnings | Code Examples / ShikiBlock | Style may be injected multiple times (harmless) or React may warn; easy to fix by hoisting `<style>` to page level |
| A2 | `github-light` and `github-dark` are high-contrast enough for TV readability | Standard Stack (theme choice) | Lower contrast at distance; fall back to `vitesse-light`/`vitesse-dark` or `min-light`/`nord` if too dim |
| A3 | `scrollbar-width: none` is the better `@utility scrollbar-hidden` implementation for teaching purposes (vs `overflow: hidden`) | Code Examples | `overflow: hidden` changes box model behavior; `scrollbar-width: none` is a narrower, cleaner demo |

---

## Open Questions

1. **Does `codeToHtml` work in Vitest/jsdom without a mock?**
   - What we know: Shiki 4.x uses WASM for its regex engine (`shiki/engine/oniguruma`). jsdom doesn't support WASM loading.
   - What's unclear: Whether the default `codeToHtml` shorthand tries to load WASM eagerly or lazily (on first language parse).
   - Recommendation: Assume a mock is needed. Plan 1 (Shiki prototype) should include verifying `yarn test` still passes and add a `vi.mock('shiki', ...)` in the test file or a global mock if it fails.

2. **Should the `<style>` override live in `ShikiBlock` or in `globals.css`?**
   - What we know: Injecting in `ShikiBlock` is self-contained. Injecting in `globals.css` is cleaner (no React style tag management) but requires manual CSS.
   - What's unclear: Whether Next.js 16 deduplicates `<style>` tags from RSC output.
   - Recommendation: Start with `ShikiBlock`-local injection. If Next.js deduplication warnings appear, move the rule to `globals.css`.

---

## Environment Availability

Step 2.6: SKIPPED (no new external tools or CLI utilities required — Shiki is already installed, Node 22 is available, no databases or services needed).

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Vitest 3.x + @testing-library/react 16 |
| Config file | `vitest.config.mts` |
| Quick run command | `yarn test` |
| Full suite command | `yarn test` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| S5-01 | Slide 05 renders slide number badge "05" | unit | `yarn test -- --reporter=verbose src/test/app/slide-pages.test.tsx` | ✅ (existing) |
| S5-01 | Slide 05 renders h1 "Customizing Tailwind" | unit | `yarn test -- --reporter=verbose src/test/app/slide-pages.test.tsx` | ✅ (existing) |
| S5-01 | "Content coming soon" placeholder is gone after implementation | unit | same file, `stubCases` filter updated | ✅ requires edit |
| S5-02 | `@utility scrollbar-hidden` snippet is present in rendered output | unit | new test in `slide-pages.test.tsx` or dedicated file | ❌ Wave 0 |
| S5-03 | `@layer base` snippet is present in rendered output | unit | same | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** `yarn test`
- **Per wave merge:** `yarn test && yarn build`
- **Phase gate:** `yarn test` green + `yarn build` passes before `/gsd-verify-work`

### Wave 0 Gaps

- [ ] `src/test/mocks/shiki.ts` — mock for `codeToHtml` returning `<pre class="shiki"><code>MOCK</code></pre>` — needed before any Shiki-importing component renders in tests
- [ ] Update `src/test/app/slide-pages.test.tsx` — remove `"05"` from `stubCases` filter; add content-presence assertions for S5-01, S5-02, S5-03

*(Existing test infrastructure covers the slide number and heading assertions — only the Shiki mock and stub-list update are new gaps.)*

---

## Security Domain

Step 2.6 skipped — this phase is a static presentation page with no user input, authentication, session handling, or external data fetching. No ASVS categories apply. The one security-relevant note: `dangerouslySetInnerHTML` in `ShikiBlock` receives output from `codeToHtml` only — the code string passed in is a hardcoded constant, never user input. No sanitization needed.

---

## Sources

### Primary (HIGH confidence)

- Context7 `/shikijs/shiki` — dual-theme CSS variable approach, `codeToHtml` API, `themes: { light, dark }`, `defaultColor: false`, `!important` requirement, Next.js RSC pattern, class-based dark mode CSS selector
- Context7 `/tailwindlabs/tailwindcss.com` — `@theme` custom color tokens, `@utility` directive, `@layer base` patterns, `@custom-variant dark` selector
- `src/app/globals.css` (read directly) — confirmed two `@theme` blocks (`@theme inline` vs plain `@theme`), confirmed existing `@layer base h1` rule
- `src/test/app/slide-pages.test.tsx` (read directly) — confirmed `"05"` in stubCases, confirmed existing test structure
- `npm view shiki version` — confirmed 4.0.2 installed, published 2026-03-09

### Secondary (MEDIUM confidence)

- Context7 `/shikijs/shiki` CSS output example — `html.dark .shiki, html.dark .shiki span { ... }` selector confirmed as official recommended pattern for class-based dark mode

### Tertiary (LOW confidence)

- [ASSUMED] `<style dangerouslySetInnerHTML>` deduplication behavior in Next.js 16 RSC — not explicitly verified against Next.js 16 release notes

---

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH — Shiki 4.0.2 installed and verified; API confirmed via Context7
- Architecture: HIGH — patterns confirmed from Context7 docs and direct codebase reads
- Pitfalls: HIGH (P1–P4) / LOW (P5) — P1–P4 sourced from official docs or direct code reads; P5 is assumed

**Research date:** 2026-04-30
**Valid until:** 2026-05-30 (stable libraries; Shiki and Tailwind v4 are not fast-moving at patch level)
