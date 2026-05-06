# Tailwind CSS: The Perfect Wingman

## What This Is

An interactive presentation and demo web app for a live technical talk on Tailwind CSS. Six topic areas each live on their own Next.js page — with live demos, interactive examples, and inline code callouts showing the Tailwind classes powering every effect. The audience is mixed frontend devs (React/Vue/plain JS) who can pull down the repo and follow along in their IDEs.

All six slides are complete and presentation-ready as of v1.0. The app is a runnable teaching artifact: every demo is implemented idiomatically so the source code IS the lesson.

## Core Value

Every slide must both show the output AND make it obvious what Tailwind code produces it — so the audience leaves with a mental model they can immediately apply.

## Current State

**Version:** v1.0 (shipped 2026-05-06)
**Status:** Presentation-ready. All 6 demo slides built and verified at TV scale.
**Codebase:** ~2,400 LOC TypeScript/TSX/CSS, Next.js 16 / React 19 / Tailwind v4

What's live:
- Slide 2 — What Is Tailwind (semantic vs. utility comparison)
- Slide 3 — Core Utility Classes (CardBuilder + FlexGridComparison)
- Slide 4 — Responsiveness & Dark Mode (ResponsiveDemo + dark: panel + stacked variants)
- Slide 5 — Customizing Tailwind (ShikiBlock + @theme token pipeline + @utility + @layer base)
- Slide 6 — Conditional Styling (three-panel + peer-invalid + data-active + full test suite)
- TV readability pass: 3xl: escalations verified, reduced-motion gate confirmed, build/lint green

## Requirements

### Validated

- ✓ Next.js 16 App Router routing with per-slide pages under `src/app/<slug>/page.tsx` — existing
- ✓ SlideLayout component providing consistent chrome (nav bar, back link, slide number badge) — existing
- ✓ ThemeToggle with localStorage persistence and no-flash inline script — existing
- ✓ Class-based dark mode via `@custom-variant dark` in globals.css — existing
- ✓ Custom breakpoints 3xl (1920px), 4xl (2560px), and 5xl (3840px) for TV-scale display — validated Phase 7
- ✓ History of CSS slide with interactive CssTimeline accordion + scroll-reveal animation — existing
- ✓ Home NavCard grid as the navigation hub between slides — existing
- ✓ Vitest + React Testing Library test suite — existing
- ✓ Tailwind v4 config entirely in globals.css (no tailwind.config.js) — existing
- ✓ `cn()` utility at `src/lib/utils.ts` (clsx + tailwind-merge v3) — validated Phase 1
- ✓ `<CodeCallout>` RSC at `src/components/CodeCallout.tsx` — TV-legible chip with dark: and 3xl: — validated Phase 1
- ✓ Runtime deps installed: clsx, tailwind-merge@^3, motion, shiki, shiki-magic-move — validated Phase 1
- ✓ Single dark mode source of truth — prefers-color-scheme removed, @custom-variant dark authoritative — validated Phase 1
- ✓ Slide 2 — semantic vs. utility button comparison + "class list is documentation" card — validated Phase 2
- ✓ Slide 3 — CardBuilder 6-step progressive card (STEPS lookup table, TDD) + FlexGridComparison RSC — validated Phase 3
- ✓ Slide 4 — ResponsiveDemo island (tab nav, breakpoint layouts), dark: callout panel, stacked dark:md:hover: variant — validated Phase 4
- ✓ Slide 5 — ShikiBlock async RSC (dual-theme Shiki, !important dark override), @theme --color-brand-500 token → bg-brand-500 swatch, @utility scrollbar-hidden with v3 callout, @layer base live h1 demo — validated Phase 5
- ✓ Slide 6 — Three-panel CSS/group/React-state comparison, peer-invalid, data-active demos — validated Phase 6
- ✓ Inline code callouts on every demo — validated Phase 6
- ✓ TV readability pass — all 6 slides legible at 1920px, reduced-motion gated, build clean — validated Phase 7

### Active (Next Milestone)

- [ ] **EXT-03**: shiki-magic-move animated code transitions for Slides 5–6 — library installed, needs wiring
- [ ] **EXT-01**: Peer-checked radio button bonus slide — deferred from v1
- [ ] **EXT-02**: Container queries demo (@container) — genuine v4 superpower, deferred from v1
- [ ] Inline hyperlinks in CssTimeline milestone text — in progress (q01 done; more links to add)

### Out of Scope

- Authentication / user accounts — static public presentation app
- Backend API routes or database — no dynamic server-side data
- Analytics or event tracking — not needed for a talk resource
- Slide presenter mode / speaker notes — navigating from the home NavCard grid is sufficient
- Keyboard slide-to-slide navigation — back-to-home navigation model is the chosen approach
- Live CSS editor / real-time class applier — editor complexity becomes the demo; typos fail live
- Simulated phone frames for responsive demo — kills the live browser-resize moment; feels fake on TV
- Full code blocks on slide pages — unreadable at TV distance
- Tailwind cheatsheet / comprehensive class reference — overwhelming; no single class is memorable when all are shown
- Tailwind Play iframe embed — iframe interaction is awkward; loses the "codebase IS the playground" quality

## Context

- **v1.0 shipped:** All 6 demo slides complete, TV-verified, build/lint green
- **Talk-ready:** Source code is the teaching material — idiomatic Tailwind patterns throughout
- **Patterns established:** Single-source const, lookup-table maps, leaf-node client islands, Vitest mock aliases
- **Known debt:** shiki-magic-move installed but not wired; REQUIREMENTS.md checkbox status fell behind (archived clean)
- **Next milestone:** Extended demos (EXT-01 through EXT-03), additional CssTimeline enhancements, or talk-night polish

## Constraints

- **Tech stack**: Next.js 16, React 19, Tailwind v4, TypeScript, Yarn — no changes to core stack
- **Tailwind config**: All config in `globals.css` via `@theme` — no `tailwind.config.js` to create or maintain
- **Server components**: Default to RSC; only add `"use client"` when browser APIs (state, refs, observers) are required
- **Repo-first**: Self-contained and runnable with `yarn dev` after a fresh clone — no env vars, no external services
- **No dynamic class interpolation**: All class strings must be complete static literals (Tailwind purger safety)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Tailwind v4 config in globals.css only | Demonstrates v4's CSS-first config approach — teaches by example | ✓ Good |
| Class-based dark mode via @custom-variant | Shows how Tailwind v4 handles custom variants; works alongside ThemeToggle demo | ✓ Good |
| Home NavCard grid as navigation hub | Simpler to navigate for presenter and audience; avoids slide-runner complexity | ✓ Good |
| Minimal inline callouts over full code blocks | Audience at TV distance; dense code blocks hurt readability | ✓ Good |
| Per-slide RSC + "use client" isolation | Teaches the RSC boundary model implicitly while keeping demos interactive | ✓ Good |
| tailwind-merge@^3 (not v2) | v2 is Tailwind v3-only; project uses Tailwind v4 | ✓ Good |
| motion package (not framer-motion) | Maintained package; imported as "motion/react" | ✓ Good |
| CodeCallout class string as single static literal | Tailwind purger cannot detect dynamically constructed class strings | ✓ Good |
| Single-source const pattern for CodeCallout props | Extract className string as named const so element and callout never drift | ✓ Good — established Phase 2, used everywhere |
| Lookup-table map for toggled state (LAYOUT_CLASSES, PANEL3_CLASSES, etc.) | Complete static strings keyed by state — Tailwind-safe and type-safe | ✓ Good |
| !important in .dark .shiki CSS override | Shiki dual-theme embeds inline style= that beats class selectors | ✓ Good |
| ShikiBlock Vitest mock via resolve.alias | Async RSC cannot render in jsdom without Next.js framework | ✓ Good |
| ESLint globalIgnores for worktree .next dirs | Parallel agent .next/ generated files caused spurious lint errors | ✓ Good |
| MilestoneItem type for CssTimeline links | Allows inline hyperlinks in milestone text without restructuring the eras data | ✓ Good — established quick task 260506-q01 |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-06 after v1.0 milestone*
