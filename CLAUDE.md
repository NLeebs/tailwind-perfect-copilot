# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About

An interactive presentation/demo app for a talk titled "Tailwind CSS: The Perfect Wingman for Frontend Projects." Each slide topic is its own Next.js App Router page. Built with Next.js 16, React 19, and Tailwind CSS v4.

## GSD Workflow

This project uses GSD (Get Shit Done) for structured planning and execution.

**Planning artifacts:** `.planning/`
- `PROJECT.md` — project context and requirements
- `REQUIREMENTS.md` — 20 v1 requirements across 7 phases
- `ROADMAP.md` — 7-phase execution plan
- `STATE.md` — current phase and progress

**Next step:** `/gsd-discuss-phase 1` or `/gsd-plan-phase 1`

**Workflow rules:**
- Read `.planning/STATE.md` at the start of every session to understand current phase
- Never modify `.planning/ROADMAP.md` directly — use `/gsd-*` commands
- After completing a phase, run `/gsd-verify-work` before advancing

## Commands

```bash
yarn dev       # start dev server at localhost:3000
yarn build     # production build
yarn lint      # ESLint
yarn test      # Vitest test suite
```

Node 22 is required (see `.nvmrc`).

## Architecture

- **Routing**: Next.js App Router. Each slide is a page under `src/app/<slug>/page.tsx`. The home page (`src/app/page.tsx`) renders a `NavCard` grid linking to all slides.
- **SlideLayout** (`src/components/SlideLayout.tsx`): Shared wrapper for every slide page — provides the top nav bar (back link + slide number badge), page chrome, and a "Content coming soon" fallback when no children are passed.
- **ThemeToggle** (`src/components/ThemeToggle.tsx`): Fixed bottom-right button. Reads/writes `localStorage('theme')` and toggles the `dark` class on `<html>`. Uses `useSyncExternalStore` with a `MutationObserver` to stay in sync with class changes. An inline script in `layout.tsx` applies the saved preference before first paint to avoid flash.
- **CodeCallout** (`src/components/CodeCallout.tsx`): RSC component rendering Tailwind class strings adjacent to demo output — TV-legible. Used by all slide pages.
- **cn()** (`src/lib/utils.ts`): clsx + tailwind-merge utility for conditional class composition. Used in interactive demo components.

## Tailwind v4 specifics

- Config lives entirely in `src/app/globals.css` via `@theme` blocks — there is no `tailwind.config.js`.
- Dark mode uses a class-based custom variant: `@custom-variant dark (&:where(.dark, .dark *))` — this is the ONLY dark mode mechanism; there is no `prefers-color-scheme` media query.
- Three custom breakpoints are defined: `3xl` (1920 px), `4xl` (2560 px), and `5xl` (3840 px) — used throughout for large-display scaling. All demo components must include `3xl:` escalations.
- `h1` has a global base style (gradient clip) applied via `@layer base` in `globals.css`.
- **Never use dynamic class interpolation** (e.g. `` `bg-${color}-500` ``) — Tailwind cannot detect dynamically constructed class strings. Use lookup-table maps with complete static strings.

## Interactive demo patterns

- **RSC by default**: Slide pages and `CodeCallout` are Server Components. Add `"use client"` only for components that need `useState`, `useRef`, or browser APIs.
- **Single-source callouts**: Extract `className` strings as named constants so the element and its `CodeCallout` use the same value — prevents callout drift.
- **Lookup-table maps for toggled state**: When a component toggles between visual states, use a map of complete static class strings keyed by state value, never string concatenation.
- **Leaf-node client islands**: Interactive demos are isolated `"use client"` components imported into RSC slide pages. Never add `"use client"` to `page.tsx` files.

## Adding a new slide

1. Create `src/app/<slug>/page.tsx` and wrap content in `<SlideLayout number="NN" title="...">`.
2. Add an entry to the `slides` array in `src/app/page.tsx`.
3. Include `3xl:` size escalations on all text and spacing for TV readability.
4. Run `yarn build` after completing the slide to verify no classes are purged.
