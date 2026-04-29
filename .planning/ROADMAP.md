# Roadmap: Tailwind CSS — The Perfect Wingman

## Overview

Build five stub slides (Slides 2–6) into fully interactive demo pages, each showing Tailwind output alongside inline class callouts. Start with shared infrastructure (CodeCallout, cn(), dark mode fix) that every subsequent slide depends on, then build slides in talk sequence so each demo reinforces the concepts just taught. Close with a TV readability and quality pass before the talk date.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Shared Infrastructure** - CodeCallout component, cn() utility, library installs, and dark mode conflict fix
- [ ] **Phase 2: Slide 2 — What Is Tailwind** - Side-by-side semantic vs. utility comparison with inline callouts
- [ ] **Phase 3: Slide 3 — Core Utility Classes** - Progressive card-building demo and flex vs. grid comparison
- [ ] **Phase 4: Slide 4 — Responsiveness & Dark Mode** - Responsive layout demo and dark: prefix callouts
- [ ] **Phase 5: Slide 5 — Customizing Tailwind** - @theme token pipeline, @utility, and @layer base callouts with Shiki
- [ ] **Phase 6: Slide 6 — Conditional Styling** - Three-panel CSS/group/React-state comparison, peer-invalid, data-attribute demos
- [ ] **Phase 7: TV Readability & Quality Pass** - 1920px audit, reduced-motion check, build smoke test

## Phase Details

### Phase 1: Shared Infrastructure
**Goal**: Every subsequent slide has the shared primitives it depends on — CodeCallout, cn(), and a single source-of-truth dark mode — installed and working
**Depends on**: Nothing (first phase)
**Requirements**: INFRA-01, INFRA-02, INFRA-03
**Success Criteria** (what must be TRUE):
  1. A `<CodeCallout>` RSC component renders a class string adjacent to demo output with consistent TV-legible styling on any slide page
  2. `cn(classes)` is importable from `src/lib/utils.ts` and correctly merges conflicting Tailwind classes at runtime
  3. Toggling dark mode via ThemeToggle shows identical dark-mode visual results whether OS preference is light or dark — no competing `prefers-color-scheme` media query overrides the class-based variant
  4. `yarn add shiki shiki-magic-move motion clsx tailwind-merge` completes without peer-dependency errors and the app starts cleanly with `yarn dev`
**Plans**: 3 plans
- [x] 01-01-PLAN.md — Install shared runtime libraries (clsx, tailwind-merge@^3, motion, shiki, shiki-magic-move)
- [x] 01-02-PLAN.md — Remove prefers-color-scheme media query from globals.css (single dark mode source of truth)
- [x] 01-03-PLAN.md — Create cn() utility at src/lib/utils.ts and CodeCallout RSC at src/components/CodeCallout.tsx
**UI hint**: yes

### Phase 2: Slide 2 — What Is Tailwind
**Goal**: The "What Is Tailwind" slide page replaces its stub with a live demo that makes the utility-first philosophy immediately legible to an audience with no prior Tailwind experience
**Depends on**: Phase 1
**Requirements**: S2-01, S2-02
**Success Criteria** (what must be TRUE):
  1. The slide renders two buttons — one using a semantic `.btn` class (defined in a style block on the page), one using Tailwind utilities — that produce visually identical output, with CodeCallout annotations making the class-list difference obvious at TV scale
  2. The slide renders a "class list as documentation" card where the Tailwind class string is displayed inline as a callout, readable without opening any separate file
  3. Both demos render correctly in dark mode (ThemeToggle applies dark: variants visibly)
**Plans**: TBD
**UI hint**: yes

### Phase 3: Slide 3 — Core Utility Classes
**Goal**: The "Core Utility Classes" slide page shows a single card evolving visibly through six utility categories, and contrasts flex vs. grid layouts — making the incremental composability of utilities concrete
**Depends on**: Phase 2
**Requirements**: S3-01, S3-02
**Success Criteria** (what must be TRUE):
  1. The slide renders a card that advances through 6 distinct steps (layout → spacing → typography → color → borders → flexbox), with the card visibly improving at each step and only the newly added classes shown in a CodeCallout
  2. The slide renders a flex vs. grid comparison with identical children, with CodeCallout annotations showing `flex flex-row gap-4` vs. `grid grid-cols-3 gap-4` side-by-side
  3. No dynamic class string interpolation is used — all class strings are complete literals in lookup-table maps (verified by a clean `yarn build`)
**Plans**: TBD
**UI hint**: yes

### Phase 4: Slide 4 — Responsiveness & Dark Mode
**Goal**: The "Responsiveness & Dark Mode" slide page gives the audience a live artifact showing how breakpoint prefixes and dark: prefixes compose — with callouts making both prefix families legible at TV scale
**Depends on**: Phase 1
**Requirements**: S4-01, S4-02, S4-03
**Success Criteria** (what must be TRUE):
  1. The slide renders a responsive layout demo that shows single-column, side-by-side (md:), and three-column (lg:) layouts with CodeCallout annotations labeling `md:flex-row` and `lg:grid-cols-3` adjacent to the affected elements
  2. The slide renders a component with at least 6 `dark:` utility classes that visibly shift when ThemeToggle is clicked, with each `dark:` prefix-value pair shown in a CodeCallout readable at TV distance
  3. The slide shows a single element with `dark:md:hover:` stacked variants in a callout, demonstrating that all three variant dimensions compose with one consistent mental model
**Plans**: TBD
**UI hint**: yes

### Phase 5: Slide 5 — Customizing Tailwind
**Goal**: The "Customizing Tailwind" slide page makes the v4 CSS-first config story tangible — showing the `@theme` token-to-utility pipeline, a custom `@utility`, and an `@layer base` rule as live artifacts in globals.css
**Depends on**: Phase 4
**Requirements**: S5-01, S5-02, S5-03
**Success Criteria** (what must be TRUE):
  1. The slide shows globals.css content (Shiki-rendered, syntax-highlighted) alongside a component using `bg-brand-500` — where `--color-brand-500` is defined in an `@theme` block in globals.css — demonstrating the token-to-utility pipeline visually
  2. The slide shows a `@utility scrollbar-hidden` definition with an explicit callout mapping it to the v3 equivalent (`@layer utilities`), readable for attendees who have seen v3 tutorials
  3. The slide shows the existing `@layer base` h1 gradient rule as a live callout, with text explaining that every slide title inherits these styles without any additional class on the element
**Plans**: TBD
**UI hint**: yes

### Phase 6: Slide 6 — Conditional Styling
**Goal**: The "Conditional Styling" slide page shows three distinct mechanisms for class-driven appearance changes — CSS variants, group variants, and React state + cn() — so the audience can choose the right tool for each context
**Depends on**: Phase 5
**Requirements**: S6-01, S6-02, S6-03, S6-04
**Success Criteria** (what must be TRUE):
  1. The slide renders three panels showing the same card implemented with: (1) pure CSS hover variants (`hover:bg-sky-50`), (2) `group-hover:` driving multiple children simultaneously, and (3) React `useState` + `cn()` explicit toggle — with callouts distinguishing when to use each
  2. The slide shows `cn()` merging conflicting Tailwind classes (e.g., `bg-red-500` overridden by `bg-blue-500`) with the merging logic visible as a CodeCallout
  3. The slide renders a `peer-invalid` form validation demo — an email input with `peer` and a sibling paragraph with `invisible peer-invalid:visible text-red-500` — that activates with no JavaScript
  4. The slide renders a `data-active` attribute toggle where React state sets `data-active` on an element and `data-active:bg-purple-600` drives the visual change, with a callout explaining how headless UI libraries use this pattern
**Plans**: TBD
**UI hint**: yes

### Phase 7: TV Readability & Quality Pass
**Goal**: All six slides are verified presentation-ready — legible at 1920px from TV distance, animation-safe for reduced-motion users, and confirmed free of purged classes in production
**Depends on**: Phase 6
**Requirements**: QA-01, QA-02, QA-03
**Success Criteria** (what must be TRUE):
  1. All 6 slides are reviewed at exactly 1920px browser width — every text element, callout, and demo label is legible without zooming, with `3xl:` size escalations added wherever the default size fails the TV distance test
  2. All new animations and transitions are confirmed to be gated by `prefers-reduced-motion` (consistent with the existing CssTimeline pattern)
  3. `yarn build && yarn start` completes without errors and all demo interactions work correctly in the production build — no Tailwind classes silently purged
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Shared Infrastructure | 3/3 | Complete | 2026-04-29 |
| 2. Slide 2 — What Is Tailwind | 0/TBD | Not started | - |
| 3. Slide 3 — Core Utility Classes | 0/TBD | Not started | - |
| 4. Slide 4 — Responsiveness & Dark Mode | 0/TBD | Not started | - |
| 5. Slide 5 — Customizing Tailwind | 0/TBD | Not started | - |
| 6. Slide 6 — Conditional Styling | 0/TBD | Not started | - |
| 7. TV Readability & Quality Pass | 0/TBD | Not started | - |
