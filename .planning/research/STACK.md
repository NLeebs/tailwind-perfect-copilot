# Stack Research

**Domain:** Interactive presentation/demo app — syntax-highlighted code callouts, animated UI showcases, interactive React component demos
**Researched:** 2026-04-28
**Confidence:** HIGH

## Existing Core Stack (Locked — Do Not Change)

| Technology | Version | Notes |
|------------|---------|-------|
| Next.js | 16.2.3 | App Router, RSC by default |
| React | 19.2.4 | Concurrent features, React Compiler ready |
| Tailwind CSS | ^4 | Config entirely in globals.css — no tailwind.config.js |
| TypeScript | ^5 | Strict mode recommended |
| Vitest + RTL | ^3 / ^16 | Test suite already in place |
| Yarn | — | Package manager |

These are fixed. The research below covers only additive libraries needed for the 5 remaining slides.

---

## Recommended Additions

### Syntax Highlighting

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| `shiki` | ^4.0.2 | Render highlighted code HTML | VS Code–grade TextMate grammars; renders to static HTML at the RSC layer with zero client JS; native dual-theme support maps cleanly to the existing class-based dark mode; used by Vite, Astro, Nuxt, and VitePress — the current ecosystem standard |
| `shiki-magic-move` | ^1.3.0 | Animated code transitions (step-through demos) | Pairs directly with shiki; animates token-level diffs using FLIP — ideal for "before and after" Tailwind class demonstrations; official React wrapper available |

**Usage model:** `shiki` runs as an async RSC (`codeToHtml`) — no `"use client"` needed for static callouts. `shiki-magic-move` requires `"use client"` because it manages animation state; isolate it as a leaf component.

**Dark mode integration:** Use shiki's `themes: { light: 'github-light', dark: 'github-dark' }` dual-theme option. Because the app uses class-based dark mode (`.dark`), add this to `globals.css`:

```css
html.dark .shiki,
html.dark .shiki span {
  color: var(--shiki-dark) !important;
  background-color: var(--shiki-dark-bg) !important;
}
```

### Animation

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| `motion` | ^12.38.0 | Declarative React animations | Rebranded from Framer Motion; import from `"motion/react"` for client components or `"motion/react-client"` inside RSC files to minimize client bundle; React 19 fully supported; `variants` + `staggerChildren` pattern matches the scroll-reveal pattern already in CssTimeline; `useInView` hook replaces the hand-rolled IntersectionObserver in CssTimeline |

**Usage model:** Add `"use client"` to any component that uses `motion.*` elements with gesture or state-driven animations. Static spring transitions can be set via the RSC `style` prop using `motion`'s CSS helpers — no client boundary required.

### Class Name Utilities

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| `clsx` | ^2.1.1 | Conditional class construction | 239B, zero deps; the standard for ternary class logic in demo components |
| `tailwind-merge` | ^3.5.0 | Resolve Tailwind class conflicts | v3 is the Tailwind v4–compatible release; prevents specificity bugs when passing className props into demo wrapper components |

**Usage model:** Combine into a single `cn()` utility at `src/lib/utils.ts`:

```ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

This pattern is now the de facto standard across the React/Tailwind ecosystem (shadcn/ui, Radix UI, etc.) and teaches a directly applicable pattern — doubly valuable in a Tailwind demo context.

---

## Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `shiki-magic-move` | ^1.3.0 | Animated step-through code diffs | Slide 5 (Customizing Tailwind) and Slide 6 (Conditional Styling) where showing class changes in sequence is more instructive than a static before/after |

No additional libraries are needed. The remaining slide interactivity (hover states, toggle switches, responsive resize demos) is pure Tailwind + React state — no extra libraries.

---

## Installation

```bash
# Syntax highlighting
yarn add shiki shiki-magic-move

# Animation
yarn add motion

# Class utilities
yarn add clsx tailwind-merge
```

---

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|------------------------|
| `shiki` | `react-syntax-highlighter` | Never for this project — it wraps Prism.js, is in maintenance mode, has known Next.js static generation bugs, and ships client JS by default |
| `shiki` | `highlight.js` | Only if you need maximum runtime performance on dynamically generated content; quality is lower and VS Code parity is absent |
| `shiki` (RSC) | `react-shiki` hook | Only if you need client-side dynamic highlighting (e.g., a live code editor); all code in this app is static at render time, so the RSC `codeToHtml` path is simpler and ships zero client JS |
| `motion` | `@gsap/react` | GSAP is more powerful for timeline-orchestrated sequences; overkill here and requires a license for commercial use; Motion is sufficient |
| `motion` | Native CSS animations (`@keyframes`) | Already used and correct for the `reveal-up` scroll animation in globals.css; continue using CSS for simple one-shot animations; reserve Motion for stateful, gesture-driven, or stagger-sequenced animations |
| `tailwind-merge` v3 | `tailwind-merge` v2 | v2 only supports Tailwind v3; this project is on Tailwind v4 — must use v3 |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `react-syntax-highlighter` | Maintenance mode; wraps Prism (unmaintained since 2022); ships ~300KB of client JS; broken with Next.js static export | `shiki` via RSC `codeToHtml` |
| `prismjs` directly | No updates since 2022; no RSC support; requires client JS | `shiki` |
| `framer-motion` (old package) | Superseded by `motion`; the `framer-motion` npm package now just re-exports `motion` with a deprecation notice — import confusion in App Router | `motion` (import from `"motion/react"`) |
| `styled-components` / `@emotion/react` | Runtime CSS-in-JS; conflicts with Tailwind v4's compile-time approach; adds meaningful client JS bundle; defeats the purpose of a Tailwind demo | Tailwind utility classes |
| `react-spring` | Older API, less community momentum than Motion; no clear advantage for this use case | `motion` |
| Any MDX processor (`next-mdx-remote`, `@next/mdx`) | Slide content is TypeScript components, not markdown; adding an MDX pipeline for 5 slides would be over-engineering | Plain `.tsx` slide files |
| `shadcn/ui` as a wholesale dependency | Copies component source into the repo; hides Tailwind classes behind abstractions, which works against the "show the classes" goal of the talk | Hand-built components with explicit Tailwind classes |

---

## Stack Patterns by Variant

**For static code callouts (inline class names next to a rendered element):**
- Write as an RSC `async function CodeCallout` using `shiki`'s `codeToHtml`
- No `"use client"` needed
- Renders once at request time; zero client JS overhead

**For animated code step-throughs (showing class additions one at a time):**
- Use `shiki-magic-move/react` inside a `"use client"` leaf component
- Pass the pre-initialized shiki highlighter in via prop or module-level singleton
- Keep the surrounding slide page as an RSC

**For interactive UI demos (hover states, toggle, focus rings):**
- Pure React state + Tailwind classes
- Add `"use client"` only to the interactive demo component
- Wrap it in a server-rendered `<DemoCard>` container that provides the card frame

**For entrance animations (items animating in on scroll):**
- Simple one-shot reveals: continue using the existing `animate-reveal-up` CSS animation pattern from globals.css — no new library needed
- Staggered list animations or gesture-triggered effects: use `motion` variants with `staggerChildren`

---

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| `shiki ^4.0.2` | Node.js ≥ 20 | Project uses Node 22 (see .nvmrc) — compatible |
| `shiki ^4.0.2` | Next.js 16 RSC | `codeToHtml` is a plain async function; works in any RSC |
| `shiki-magic-move ^1.3.0` | `shiki ^4` | Peer dep is shiki; v1.3.0 released March 2026 |
| `motion ^12.38.0` | React 19.2.4 | Motion v12 explicitly supports React 18.2+ and React 19 |
| `motion ^12.38.0` | Next.js App Router | Use `"motion/react-client"` import in RSC files; `"motion/react"` + `"use client"` in client components |
| `tailwind-merge ^3.5.0` | Tailwind CSS ^4 | tw-merge v3 is the v4-specific release; v2 is Tailwind v3 only |
| `clsx ^2.1.1` | Any | No peer dependencies |

---

## Sources

- `/shikijs/shiki` (Context7) — RSC `codeToHtml` usage, dual-theme CSS variable pattern
- `/websites/motion_dev` (Context7) — `motion/react-client` App Router import, React 19 compatibility
- `/grx7/framer-motion` (Context7) — stagger variants, scroll hooks
- https://shiki.style/blog/v4 — v4.0.2 release notes, Node 20+ requirement
- https://github.com/shikijs/shiki-magic-move — React wrapper, v1.3.0 confirmation
- https://www.npmjs.com/package/motion — v12.38.0 latest confirmed
- https://github.com/dcastil/tailwind-merge/discussions/468 — tailwind-merge v3 / Tailwind v4 compatibility matrix
- https://www.npmjs.com/package/tailwind-merge — v3.5.0 latest confirmed
- https://www.codeline.co/thoughts/repo-review/2025/react-shiki-syntax-highlighting-hook — react-shiki vs. shiki RSC tradeoffs
- https://houseofgiants.com/blog/five-syntax-highlighting-plugins-that-arent-terrible — Next.js-specific comparison
- https://www.pkgpulse.com/blog/shiki-vs-prismjs-vs-highlightjs-syntax-highlighting-2026 — 2026 comparison confirming Shiki as the modern standard

---
*Stack research for: Interactive Tailwind CSS presentation/demo app — additive libraries for slides 2–6*
*Researched: 2026-04-28*
