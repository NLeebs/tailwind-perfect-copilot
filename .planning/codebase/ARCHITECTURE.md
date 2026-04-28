<!-- refreshed: 2026-04-28 -->
# Architecture

**Analysis Date:** 2026-04-28

## System Overview

```text
┌──────────────────────────────────────────────────────────────┐
│                   Next.js App Router                         │
│           Route Segments: src/app/<slug>/page.tsx            │
├────────────────────────┬─────────────────────────────────────┤
│   Home (NavCard grid)  │   Slide Pages (01–06)               │
│   `src/app/page.tsx`   │   `src/app/<slug>/page.tsx`         │
└───────────┬────────────┴────────────┬────────────────────────┘
            │                         │
            ▼                         ▼
┌──────────────────────────────────────────────────────────────┐
│                     Shared Components                        │
│   SlideLayout  NavCard  ThemeToggle  CssTimeline  Icons      │
│   `src/components/`                                          │
└──────────────────────────────────────────────────────────────┘
            │
            ▼
┌──────────────────────────────────────────────────────────────┐
│   Root Layout + Global Styles                                │
│   `src/app/layout.tsx`   `src/app/globals.css`               │
└──────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| RootLayout | HTML shell, font injection, inline theme-init script, mounts ThemeToggle | `src/app/layout.tsx` |
| Home | NavCard grid listing all 6 slides | `src/app/page.tsx` |
| SlideLayout | Per-slide chrome: top nav bar (back link + slide number badge), h1, children fallback | `src/components/SlideLayout.tsx` |
| NavCard | Linked card rendered on the home page for each slide entry | `src/components/NavCard.tsx` |
| ThemeToggle | Fixed bottom-right button; reads/writes `localStorage('theme')` and toggles `.dark` on `<html>` | `src/components/ThemeToggle.tsx` |
| CssTimeline | Interactive accordion timeline used exclusively by the history-of-css slide | `src/components/CssTimeline.tsx` |
| SunIcon / MoonIcon | SVG icon components consumed by ThemeToggle | `src/components/icons/SunIcon.tsx`, `src/components/icons/MoonIcon.tsx` |

## Pattern Overview

**Overall:** Presentation app using Next.js App Router with a flat page-per-slide routing model. Each slide is an independent server component that wraps its content in `SlideLayout`. Client interactivity is isolated to `ThemeToggle` (theme persistence) and `CssTimeline` (accordion + scroll animations).

**Key Characteristics:**
- Server Components by default; `"use client"` added only where browser APIs are required (`ThemeToggle`, `CssTimeline`)
- `SlideLayout` is the single layout abstraction shared by all slide pages — no Next.js nested layouts are used for slides
- All Tailwind configuration (custom breakpoints, custom variant, animations, theme tokens) lives in `src/app/globals.css` via `@theme` — no `tailwind.config.js` file exists
- Dark mode is class-based (`dark` on `<html>`), with a blocking inline script in `layout.tsx` preventing flash on load

## Layers

**Routing / Pages:**
- Purpose: Defines URL structure; each file IS the route handler
- Location: `src/app/`
- Contains: `page.tsx` files (one per slide slug), `layout.tsx`, `globals.css`, `favicon.ico`
- Depends on: Shared components
- Used by: Next.js router

**Shared Components:**
- Purpose: Reusable UI building blocks
- Location: `src/components/`
- Contains: Layout wrapper, navigation card, theme toggle, timeline, icon sub-components
- Depends on: `globals.css` (for Tailwind classes/custom tokens)
- Used by: Page files under `src/app/`

**Global Styles / Tailwind Config:**
- Purpose: Tailwind v4 configuration, base styles, custom breakpoints, custom dark variant, keyframe animations
- Location: `src/app/globals.css`
- Contains: `@import "tailwindcss"`, `@custom-variant dark`, `@theme` blocks, `@layer base` h1 override, `@keyframes reveal-up`
- Depends on: Nothing
- Used by: `src/app/layout.tsx` (imported once at the root)

**Test Suite:**
- Purpose: Vitest + React Testing Library unit/integration tests
- Location: `src/test/`
- Contains: Tests mirroring `src/app/` and `src/components/` structure, mocks, setup file
- Depends on: `src/test/mocks/next-link.tsx` (stubs `next/link`), `src/test/setup.ts` (IntersectionObserver mock, jest-dom)
- Used by: CI / `yarn test`

## Data Flow

### Home Page Render

1. Next.js matches `/` → renders `src/app/page.tsx`
2. `page.tsx` iterates the static `slides` array and renders one `<NavCard>` per entry
3. Each `NavCard` renders an `<a>` (via `next/link`) pointing to the slide slug

### Slide Page Render

1. Next.js matches `/<slug>` → renders `src/app/<slug>/page.tsx`
2. Slide page renders `<SlideLayout number="NN" title="...">` with optional children
3. `SlideLayout` renders the top nav bar and the `<h1>` title
4. If no children are passed, `SlideLayout` renders a "Content coming soon" placeholder

### Theme Toggle

1. Inline `<script>` in `layout.tsx` runs synchronously before paint: reads `localStorage('theme')`, adds/removes `.dark` on `<html>`
2. `ThemeToggle` (client component) calls `useSyncExternalStore` with a `MutationObserver` watching `<html>` class attribute changes
3. On button click: `toggle()` updates `document.documentElement.classList` and writes to `localStorage`
4. The `MutationObserver` fires → `useSyncExternalStore` re-renders the icon

### CssTimeline Interaction

1. `CssTimeline` is a `"use client"` component managing `expandedIndex` state (single expanded era at a time)
2. Each `TimelineEntry` uses `useRef` + `IntersectionObserver` to trigger a CSS `animate-reveal-up` class when scrolled into view
3. Accordion open/close is driven by CSS `grid-template-rows` transition (0fr → 1fr), not JS-toggled height

**State Management:**
- No global state store. All state is local React (`useState`) within client components.
- Theme state lives in the DOM (`.dark` class on `<html>`) and `localStorage`, not React state tree.

## Key Abstractions

**SlideLayout:**
- Purpose: Wraps every slide page with consistent chrome (nav bar, h1, content area)
- Examples: Used by all 6 slide pages: `src/app/history-of-css/page.tsx`, `src/app/what-is-tailwind/page.tsx`, `src/app/utility-classes/page.tsx`, `src/app/responsiveness-dark-mode/page.tsx`, `src/app/customizing-tailwind/page.tsx`, `src/app/conditional-styling/page.tsx`
- Pattern: Receives `number`, `title`, and optional `children`; renders "Content coming soon" if `children` is omitted

**slides Array (Home Page):**
- Purpose: Single source of truth for the slide index — drives both the NavCard grid and determines which slugs exist
- Examples: `src/app/page.tsx` lines 3–40
- Pattern: Static array of `{ number, title, tagline, href }` objects; adding a slide requires both a new array entry and a new `src/app/<slug>/page.tsx`

## Entry Points

**Application Root:**
- Location: `src/app/layout.tsx`
- Triggers: Every request (wraps all pages)
- Responsibilities: HTML document shell, Google font variables, inline theme script, ThemeToggle mount, global CSS import

**Home Page:**
- Location: `src/app/page.tsx`
- Triggers: GET `/`
- Responsibilities: Renders presentation overview with NavCard grid

**Slide Pages:**
- Location: `src/app/<slug>/page.tsx` (6 pages)
- Triggers: GET `/<slug>`
- Responsibilities: Renders slide content wrapped in SlideLayout

## Architectural Constraints

- **Rendering model:** Pages are React Server Components by default. `"use client"` is used only in `ThemeToggle` and `CssTimeline` where browser APIs (`localStorage`, `MutationObserver`, `IntersectionObserver`) are required.
- **Global state:** No module-level singletons. Theme state is stored in the DOM (`<html>` class) and `localStorage`. The `slides` array in `src/app/page.tsx` is the only module-level data structure.
- **No Next.js nested layouts for slides:** All slide pages use `SlideLayout` directly as a component — no `layout.tsx` files exist under slide subdirectories.
- **No API routes:** This is a purely static presentation app. There are no `route.ts` / `api/` handlers.
- **Circular imports:** None detected. Components depend only on globals.css (implicitly via Tailwind classes) and peer icon components.
- **Tailwind config location:** No `tailwind.config.js`. All custom tokens, breakpoints, variants, and animations are defined in `src/app/globals.css`.

## Anti-Patterns

### Slides Array Out of Sync with File System

**What happens:** The `slides` array in `src/app/page.tsx` must be manually kept in sync with actual `src/app/<slug>/page.tsx` files. There is no automatic registration.
**Why it's wrong:** Adding a file without updating the array means the slide is unreachable from the home page. Updating the array without adding a file causes a 404.
**Do this instead:** When adding a slide, always do both steps: create `src/app/<slug>/page.tsx` AND add the entry to the `slides` array in `src/app/page.tsx`.

### Inline Style Props for Dynamic Colors in CssTimeline

**What happens:** `CssTimeline` uses `style={{ backgroundColor: era.color }}` and CSS custom property injection (`--c`, `--cd`) for era-specific colors that vary per data entry.
**Why it's wrong:** These colors are data-driven at runtime and cannot be expressed as static Tailwind class strings, so inline styles are intentionally used here.
**Do this instead:** This is the correct pattern for runtime-determined colors. Do not attempt to generate dynamic Tailwind class strings (e.g., `bg-[${era.color}]`) as Tailwind does not detect dynamically concatenated class names.

## Error Handling

**Strategy:** No explicit error boundaries. Next.js default error handling applies.

**Patterns:**
- `SlideLayout` provides a "Content coming soon" fallback via the `children ?? (...)` null-coalescing pattern — graceful degradation for stub pages
- No async data fetching exists; all content is static, so runtime errors are limited to client-side browser API failures

## Cross-Cutting Concerns

**Logging:** None — no logging library or `console` statements in production code.
**Validation:** None — no form inputs or user-submitted data.
**Authentication:** Not applicable — fully public static presentation.
**Accessibility:** `ThemeToggle` uses `aria-label`. `CssTimeline` accordion uses `aria-expanded` and `aria-controls` on toggle buttons, and `role="heading"` + `aria-level={2}` on era titles.

---

*Architecture analysis: 2026-04-28*
