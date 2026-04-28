# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About

An interactive presentation/demo app for a talk titled "Tailwind CSS: The Perfect Wingman for Frontend Projects." Each slide topic is its own Next.js App Router page. Built with Next.js 16, React 19, and Tailwind CSS v4.

## Commands

```bash
yarn dev       # start dev server at localhost:3000
yarn build     # production build
yarn lint      # ESLint
```

Node 22 is required (see `.nvmrc`).

## Architecture

- **Routing**: Next.js App Router. Each slide is a page under `src/app/<slug>/page.tsx`. The home page (`src/app/page.tsx`) renders a `NavCard` grid linking to all slides.
- **SlideLayout** (`src/components/SlideLayout.tsx`): Shared wrapper for every slide page — provides the top nav bar (back link + slide number badge), page chrome, and a "Content coming soon" fallback when no children are passed.
- **ThemeToggle** (`src/components/ThemeToggle.tsx`): Fixed bottom-right button. Reads/writes `localStorage('theme')` and toggles the `dark` class on `<html>`. Uses `useSyncExternalStore` with a `MutationObserver` to stay in sync with class changes. An inline script in `layout.tsx` applies the saved preference before first paint to avoid flash.

## Tailwind v4 specifics

- Config lives entirely in `src/app/globals.css` via `@theme` blocks — there is no `tailwind.config.js`.
- Dark mode uses a class-based custom variant: `@custom-variant dark (&:where(.dark, .dark *))`.
- Two custom breakpoints are defined: `3xl` (1920 px) and `4xl` (2560 px) — used throughout for large-display scaling.
- `h1` has a global base style (gradient clip) applied via `@layer base` in `globals.css`.

## Adding a new slide

1. Create `src/app/<slug>/page.tsx` and wrap content in `<SlideLayout number="NN" title="...">`.
2. Add an entry to the `slides` array in `src/app/page.tsx`.
