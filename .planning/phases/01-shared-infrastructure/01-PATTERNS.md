# Phase 1: Shared Infrastructure - Pattern Map

**Mapped:** 2026-04-29
**Files analyzed:** 4 (2 new, 2 modified)
**Analogs found:** 4 / 4

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `src/components/CodeCallout.tsx` | component (RSC display) | transform | `src/components/NavCard.tsx` | role-match (RSC, typed props, pure display) |
| `src/lib/utils.ts` | utility | transform | `src/components/NavCard.tsx` (import alias pattern) | partial (no utility file exists yet) |
| `src/app/globals.css` | config | — | `src/app/globals.css` itself | exact (targeted removal) |
| `package.json` | config | — | `package.json` itself | exact (add dependencies) |

---

## Pattern Assignments

### `src/components/CodeCallout.tsx` (RSC component, transform)

**Analog:** `src/components/NavCard.tsx`

**Why this analog:** NavCard is the closest RSC display component — typed props interface, no `"use client"`, no state, pure rendering. SlideLayout is also RSC but is a layout wrapper rather than a display primitive.

**Imports pattern** (`src/components/NavCard.tsx` lines 1–8):
```typescript
import Link from "next/link";

interface NavCardProps {
  number: string;
  title: string;
  tagline: string;
  href: string;
}
```
Apply: CodeCallout needs only a single `interface CodeCalloutProps { classes: string }` — no imports required (no Link, no hooks).

**RSC component structure pattern** (`src/components/NavCard.tsx` lines 10–30):
```typescript
export default function NavCard({ number, title, tagline, href }: Readonly<NavCardProps>) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 ..."
    >
      ...
    </Link>
  );
}
```
Apply: Use `Readonly<CodeCalloutProps>`, `export default function CodeCallout(...)`, return a single element — no `"use client"` directive.

**Chip/pill visual pattern** (`src/components/NavCard.tsx` line 16 and `src/components/SlideLayout.tsx` line 23):
```typescript
// NavCard — pill badge
<span className="w-fit rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold tracking-widest text-cyan-600 dark:text-cyan-400 3xl:text-sm 3xl:px-4">

// SlideLayout — slide number pill
<span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold tracking-widest text-cyan-600 dark:text-cyan-400 3xl:text-sm 3xl:px-4">
```
Apply to CodeCallout: The chip wrapping the class string should use this pill shape as a baseline, but swap to a muted/neutral palette (slate-100/slate-800) and a `font-mono` font. Decision D-01 specifies "muted background (slate-100 light / slate-800 dark)". Decision D-03 requires wrapping — use `break-all` or `whitespace-pre-wrap` so long class lists wrap. Include `3xl:` size escalations.

**3xl/4xl TV-scale pattern** (`src/components/CssTimeline.tsx` line 228, `src/components/SlideLayout.tsx` line 16):
```typescript
// Pattern: every text size and spacing has a 3xl: escalation
className="... text-xs 3xl:text-base ..."
className="... px-3 py-1 3xl:px-5 3xl:py-2 ..."
```
Apply: CodeCallout chip must include `3xl:` escalations on font size, padding.

**Concrete CodeCallout target structure** (derived from all analogs):
```typescript
interface CodeCalloutProps {
  classes: string;
}

export default function CodeCallout({ classes }: Readonly<CodeCalloutProps>) {
  return (
    <div className="mt-3 inline-block rounded-lg bg-slate-100 px-3 py-2 font-mono text-xs text-slate-600 break-all dark:bg-slate-800 dark:text-slate-300 3xl:mt-4 3xl:rounded-xl 3xl:px-5 3xl:py-3 3xl:text-sm">
      {classes}
    </div>
  );
}
```
Note: `inline-block` keeps the chip from stretching full-width; `break-all` satisfies D-03 (never truncate). Padding, radius, and color values follow the design system established in NavCard and SlideLayout.

---

### `src/lib/utils.ts` (utility, transform)

**Analog:** No exact utility file exists. Path alias `@/` is confirmed in use throughout the codebase (`import ... from "@/components/..."` in `ThemeToggle.tsx` line 4). The standard `cn()` pattern is industry-standard for clsx + tailwind-merge.

**Path alias pattern** (`src/components/ThemeToggle.tsx` lines 3–4):
```typescript
import SunIcon from "@/components/icons/SunIcon";
import MoonIcon from "@/components/icons/MoonIcon";
```
Apply: Downstream consumers will import as `import { cn } from "@/lib/utils"` — the `@/` alias resolves to `src/`.

**TypeScript export style** (all existing components use `export default`; utils.ts should use named export):
```typescript
// Named export for tree-shaking and multi-export utility files
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

**Concrete utils.ts target structure:**
```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```
Decision D-08: no additional functionality. Decision D-09: lives at `src/lib/utils.ts`.

---

### `src/app/globals.css` (config, targeted removal)

**Analog:** `src/app/globals.css` itself — this is a surgical removal, not a rewrite.

**Block to remove** (`src/app/globals.css` lines 17–22):
```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```
Decision D-10: remove this entire block. The file has 53 lines total; nothing else changes in Phase 1.

**Block to keep — dark mode variant** (`src/app/globals.css` line 8):
```css
@custom-variant dark (&:where(.dark, .dark *));
```
This line must remain. It is the sole dark mode mechanism confirmed by ThemeToggle's class-toggle behavior.

**Block to keep — @layer base h1 styles** (`src/app/globals.css` lines 30–34):
```css
@layer base {
  h1 {
    @apply font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400;
  }
}
```
Note: The `dark:` prefix in this `@apply` depends on `@custom-variant dark` being present — confirms removal of `prefers-color-scheme` is safe and non-breaking.

**Block to keep — @theme breakpoints** (`src/app/globals.css` lines 48–52):
```css
@theme {
  --breakpoint-3xl: 1920px;
  --breakpoint-4xl: 2560px;
  --animate-reveal-up: reveal-up 0.7s ease-out both;
}
```

---

### `package.json` (config, add dependencies)

**Analog:** `package.json` itself.

**Current dependencies section** (`package.json` lines 14–17):
```json
"dependencies": {
  "next": "16.2.3",
  "react": "19.2.4",
  "react-dom": "19.2.4"
},
```
Apply: `clsx`, `tailwind-merge`, `motion`, `shiki`, `shiki-magic-move` are runtime dependencies — add to `"dependencies"`, not `"devDependencies"`.

**Version constraints to observe** (from decisions):
- D-12: `tailwind-merge` must be v3 (`"tailwind-merge": "^3"`) — v2 is Tailwind v3 only.
- D-13: `motion` package (not `framer-motion`) — imported as `"motion/react"`.
- D-14: `shiki-magic-move` is a v2-deferred feature but installed now.

**Install command (do not guess versions — run yarn add):**
```bash
yarn add clsx tailwind-merge@^3 motion shiki shiki-magic-move
```

---

## Shared Patterns

### Dark mode class application
**Source:** `src/components/ThemeToggle.tsx` (toggle mechanism) + `src/app/globals.css` line 8 (`@custom-variant dark`)
**Apply to:** CodeCallout's chip dark classes

The dark mode pattern used by every existing component is `dark:` prefix on Tailwind classes (e.g., `dark:bg-slate-800 dark:text-slate-300`). This works because `@custom-variant dark (&:where(.dark, .dark *))` in globals.css maps `dark:` to the `.dark` class on `<html>`. After removing the `prefers-color-scheme` block, this remains the only mechanism.

```typescript
// Pattern found in SlideLayout.tsx line 15, NavCard.tsx line 14, CssTimeline.tsx line 282
className="... bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 ..."
```

### TV-legibility 3xl/4xl escalation
**Source:** `src/components/SlideLayout.tsx` lines 16, 23, 28–29; `src/components/CssTimeline.tsx` lines 272, 287, 290
**Apply to:** CodeCallout chip (all text and spacing)

Every visible element in the project carries a `3xl:` variant for 1920px display legibility. The typical pattern is to double text size and increase padding by 1.5–2×:

```typescript
// text-xs → 3xl:text-base (or 3xl:text-sm for secondary elements)
// px-3 py-1 → 3xl:px-5 3xl:py-2
// rounded-lg → 3xl:rounded-xl
// mt-3 → 3xl:mt-4
```

### Readonly props pattern
**Source:** `src/components/NavCard.tsx` line 10
**Apply to:** CodeCallout props

```typescript
export default function NavCard({ number, title, tagline, href }: Readonly<NavCardProps>) {
```
Wrap destructured props in `Readonly<T>` — consistent with the one existing pure display component.

### No `"use client"` on RSC display components
**Source:** `src/components/NavCard.tsx` (no directive), `src/components/SlideLayout.tsx` (no directive)
**Apply to:** CodeCallout

Neither NavCard nor SlideLayout has `"use client"`. CodeCallout is pure display with no interactivity — omit the directive. Contrast with `src/components/ThemeToggle.tsx` and `src/components/CssTimeline.tsx` which both open with `"use client"` because they use `useState`/`useSyncExternalStore`.

---

## No Analog Found

| File | Role | Data Flow | Reason |
|---|---|---|---|
| `src/lib/utils.ts` | utility | transform | No utility file exists in the codebase; cn() pattern is standard industry boilerplate — use RESEARCH.md/decisions for the exact shape |

---

## Metadata

**Analog search scope:** `src/components/`, `src/app/`, `package.json`
**Files scanned:** 7 (NavCard.tsx, SlideLayout.tsx, ThemeToggle.tsx, CssTimeline.tsx, page.tsx, globals.css, package.json)
**Pattern extraction date:** 2026-04-29
