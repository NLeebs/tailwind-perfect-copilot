# Code Conventions
*Mapped: 2026-04-28*

## Language & Tooling

- **TypeScript strict mode** — `"strict": true` in `tsconfig.json`. All props explicitly typed via interfaces.
- **React 19 / Next.js 16** — App Router. Server Components by default; `"use client"` only where needed.
- **ESLint** — `eslint-config-next` via `eslint.config.mjs`.
- **No Prettier config found** — formatting enforced by ESLint rules from `eslint-config-next`.

## Component Patterns

### Props interfaces

Every component defines a named interface above the function:

```tsx
interface SlideLayoutProps {
  number: string;
  title: string;
  children?: React.ReactNode;
}
```

`Readonly<>` wrapper used on NavCard (immutable props pattern):

```tsx
export default function NavCard({ number, title, tagline, href }: Readonly<NavCardProps>)
```

### Default exports

All components use default exports, named after the file:

```tsx
export default function SlideLayout(...) { ... }
```

### Client components

Only components that use browser APIs or React hooks carry `"use client"`:

- `ThemeToggle.tsx` — uses `useSyncExternalStore`, `localStorage`, `MutationObserver`
- All other components are Server Components (no directive)

### Children / fallback pattern

`SlideLayout` uses the nullish coalescing operator for optional content:

```tsx
{children ?? (
  <div ...>Content coming soon</div>
)}
```

## Tailwind CSS Conventions

### v4 config in CSS

No `tailwind.config.js`. All config lives in `src/app/globals.css`:

```css
@theme {
  --breakpoint-3xl: 1920px;
  --breakpoint-4xl: 2560px;
  --animate-reveal-up: reveal-up 0.7s ease-out both;
}
```

### Dark mode

Class-based custom variant (not the built-in `darkMode: 'class'`):

```css
@custom-variant dark (&:where(.dark, .dark *));
```

Used inline: `dark:bg-slate-950 dark:text-white`

### Responsive scaling

Large-display breakpoints applied throughout with `3xl:` and `4xl:` variants:

```tsx
className="px-8 py-20 3xl:px-16 3xl:py-28 4xl:py-36"
```

### Color palette

- Backgrounds: `slate-50` / `slate-950` (light/dark)
- Accents: `cyan-500`, `cyan-600`, `cyan-400`
- Borders: `slate-200` / `slate-800`
- Text: `slate-900` / `white`, muted `slate-500` / `slate-400`

### h1 base style

Applied globally in `@layer base` — gradient clip text:

```css
h1 {
  @apply font-bold tracking-tight text-transparent bg-clip-text
         bg-linear-to-r from-slate-900 to-slate-500
         dark:from-white dark:to-slate-400;
}
```

## State Management

No external state library. Patterns used:

- **`useSyncExternalStore`** — `ThemeToggle` subscribes to DOM class mutations via `MutationObserver`
- **`localStorage`** — `theme` key stores `"dark"` or `"light"` preference
- **Inline script in `layout.tsx`** — applies saved theme before first paint (avoids flash)

## Imports

Path alias `@/` maps to `src/`:

```tsx
import SlideLayout from "@/components/SlideLayout";
import ThemeToggle from "@/components/ThemeToggle";
```

Next.js built-ins imported directly:

```tsx
import Link from "next/link";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
```

## Accessibility

- `aria-label` on icon-only buttons: `aria-label="Toggle light/dark mode"`
- `aria-expanded` on accordion buttons in `CssTimeline`
- `suppressHydrationWarning` on `ThemeToggle` button (theme applied client-side)
- Reduced motion: `@media (prefers-reduced-motion: reduce)` overrides `reveal-up` animation

## Error Handling

No explicit error boundaries or error handling in current code. All components are pure render functions with no async data fetching (static presentation app).

---
*Last mapped: 2026-04-28*
