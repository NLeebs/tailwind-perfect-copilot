# Tailwind CSS: The Perfect Wingman

## What This Is

An interactive presentation and demo web app for a live technical talk on Tailwind CSS. Each of six topic areas lives on its own Next.js page — with live demos, interactive examples, and inline code callouts that show the Tailwind classes powering every effect. The audience is mixed frontend devs (React/Vue/plain JS) who can pull down the repo and follow along in their IDEs.

## Core Value

Every slide must both show the output AND make it obvious what Tailwind code produces it — so the audience leaves with a mental model they can immediately apply.

## Requirements

### Validated

- ✓ Next.js 16 App Router routing with per-slide pages under `src/app/<slug>/page.tsx` — existing
- ✓ SlideLayout component providing consistent chrome (nav bar, back link, slide number badge) — existing
- ✓ ThemeToggle with localStorage persistence and no-flash inline script — existing
- ✓ Class-based dark mode via `@custom-variant dark` in globals.css — existing
- ✓ Custom breakpoints 3xl (1920px) and 4xl (2560px) for TV-scale display — existing
- ✓ History of CSS slide with interactive CssTimeline accordion + scroll-reveal animation — existing
- ✓ Home NavCard grid as the navigation hub between slides — existing
- ✓ Vitest + React Testing Library test suite — existing
- ✓ Tailwind v4 config entirely in globals.css (no tailwind.config.js) — existing
- ✓ `cn()` utility at `src/lib/utils.ts` (clsx + tailwind-merge v3) — validated Phase 1
- ✓ `<CodeCallout>` RSC at `src/components/CodeCallout.tsx` — TV-legible chip with dark: and 3xl: — validated Phase 1
- ✓ Runtime deps installed: clsx, tailwind-merge@^3, motion, shiki, shiki-magic-move — validated Phase 1
- ✓ Single dark mode source of truth — prefers-color-scheme removed, @custom-variant dark authoritative — validated Phase 1

### Active

- [ ] **Slide 2 — What Is Tailwind**: Content and demos explaining the utility-first philosophy and why it's powerful vs. traditional CSS
- [ ] **Slide 3 — Utility Classes**: Interactive React component examples demonstrating core utility classes (layout, spacing, typography, color, flexbox, grid)
- [ ] **Slide 4 — Responsiveness & Dark Mode**: Live demos that respond to viewport changes and toggle between light/dark — with callouts showing the `sm:`, `md:`, `dark:` prefixes
- [ ] **Slide 5 — Customizing Tailwind**: Examples of custom theme tokens, custom utility classes, and custom animations defined in globals.css
- [ ] **Slide 6 — Conditional Styling**: Interactive React components that change appearance based on state (hover, focus, active, toggled) with inline `cn()` / ternary pattern callouts
- [ ] **Inline code callouts**: Every demo has minimal readable callouts showing the key Tailwind classes adjacent to the rendered output
- [ ] **TV readability pass**: Verify all slides are legible and usable at 1920px+ (3xl breakpoint); fonts, contrast, and spacing sized for a large display audience

### Out of Scope

- Authentication / user accounts — static public presentation app
- Backend API routes or database — no dynamic server-side data
- Analytics or event tracking — not needed for a talk resource
- Slide presenter mode / speaker notes — navigating from the home NavCard grid is sufficient
- Keyboard slide-to-slide navigation — back-to-home navigation model is the chosen approach

## Context

- **Existing codebase:** The app scaffold is fully in place — routing, layout, dark mode, responsive breakpoints, and the history-of-css slide are done. The remaining 5 slides are stubs with "Content coming soon" placeholders.
- **Demo code IS the teaching material:** Because the audience can clone the repo, the source code of each slide page is part of the lesson. Demos should use idiomatic Tailwind patterns that are worth studying.
- **Talk audience:** Mixed frontend experience — React devs, Vue devs, plain JS devs, varying CSS fluency. Assume no prior Tailwind knowledge.
- **Presentation context:** Displayed on large TVs (1080p–4K). Audience also has laptops. Need to read at distance AND be usable up close.
- **Navigation model:** Presenter and audience navigate from the home page card grid. No in-slide prev/next needed.
- **Code visibility:** Inline on the slide — minimal callouts highlighting the specific Tailwind classes adjacent to each demo. Not full code blocks; just the key parts.

## Constraints

- **Tech stack**: Next.js 16, React 19, Tailwind v4, TypeScript, Yarn — no changes to core stack
- **Tailwind config**: All config in `globals.css` via `@theme` — no `tailwind.config.js` to create or maintain
- **Timeline**: Talk is 1–2 months out — time to build properly, but not to over-engineer
- **Server components**: Default to RSC; only add `"use client"` when browser APIs (state, refs, observers) are required
- **Repo-first**: The codebase must be self-contained and runnable with `yarn dev` after a fresh clone — no env vars, no external services

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Tailwind v4 config in globals.css only | Demonstrates v4's CSS-first config approach — teaches by example | — Pending |
| Class-based dark mode via @custom-variant | Shows how Tailwind v4 handles custom variants; works alongside the ThemeToggle demo | — Pending |
| Home NavCard grid as navigation hub | Simpler to navigate for both presenter and audience; avoids slide-runner complexity | — Pending |
| Minimal inline callouts over full code blocks | Audience reading from a distance; dense code blocks hurt readability at TV scale | — Pending |
| Per-slide RSC + "use client" isolation | Teaches the RSC boundary model implicitly while keeping demos interactive | — Pending |
| tailwind-merge@^3 (not v2) | v2 is Tailwind v3-only; this project uses Tailwind v4 | Phase 1 |
| motion package (not framer-motion) | Maintained package; imported as "motion/react" | Phase 1 |
| CodeCallout class string as single static literal | Tailwind purger cannot detect dynamically constructed class strings | Phase 1 |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-28 after initialization*
