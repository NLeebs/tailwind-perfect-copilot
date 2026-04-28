# Project Research Summary

**Project:** Tailwind CSS: The Perfect Wingman for Frontend Projects — Interactive Presentation App
**Domain:** Interactive developer teaching presentation (Next.js + Tailwind v4 slide deck)
**Researched:** 2026-04-28
**Confidence:** HIGH

## Executive Summary

This is a live-talk presentation app where the source code is itself the teaching artifact. Five stub slides (Slides 2–6) need interactive demo components built on an already-solid foundation: Next.js 16 App Router, React 19, Tailwind CSS v4 (CSS-first config), Vitest, and an existing SlideLayout/ThemeToggle/CssTimeline component layer. The recommended approach is strictly additive: install four libraries (shiki, shiki-magic-move, motion, clsx + tailwind-merge), build one demo component per slide as a leaf-node "use client" island, and expose a shared CodeCallout RSC component for inline class callouts on every slide. Nothing about the existing architecture needs to change.

The most important cross-cutting concern is TV readability: all text elements must carry `3xl:` breakpoint escalations matching the pattern already established in CssTimeline. The second most important concern is Tailwind class detection: dynamic template-literal class strings (`bg-${color}-500`) are silently purged in production — every interactive demo must use lookup-table maps with complete class strings. These two issues together account for the most likely presentation-day failures and must be treated as non-negotiable definition-of-done criteria for every slide.

The v4 CSS-first config story (everything in `globals.css`, no `tailwind.config.js`) is the genuine differentiator of this talk compared to every Tailwind v3 tutorial online. Slide 5 (Customizing Tailwind) is the highest-value slide to build well: showing the `@theme` token-to-utility pipeline with a live brand-color addition is the moment no prior Tailwind content delivers. The dark mode `@custom-variant` conflict (class-gated `dark:` vs. OS `prefers-color-scheme` media query) is a known existing bug that must be resolved before Slide 4 is built.

---

## Key Findings

### Recommended Stack

The existing stack is locked and should not change. The four additive libraries are: `shiki` for RSC-rendered syntax-highlighted code blocks (zero client JS); `shiki-magic-move` for animated step-through code diffs on Slides 5–6; `motion` (Framer Motion's successor) for stagger and gesture-driven animations; and `clsx` + `tailwind-merge` v3 for the `cn()` utility pattern required by Slide 6's conditional styling demo. `tailwind-merge` must be v3 — v2 is Tailwind v3 only. The `framer-motion` package name is deprecated; always import from `"motion/react"`.

**Core technologies:**
- `shiki ^4.0.2`: Syntax highlighting via RSC `codeToHtml` — zero client JS; VS Code-grade grammars; native dual-theme support maps to class-based dark mode
- `shiki-magic-move ^1.3.0`: Animated token-level code diffs — pairs with shiki; ideal for before/after Tailwind class demonstrations on Slides 5–6
- `motion ^12.38.0`: Declarative React animations — React 19 supported; `variants` + `staggerChildren` replaces hand-rolled IntersectionObserver logic; import from `"motion/react"` in client components
- `clsx ^2.1.1` + `tailwind-merge ^3.5.0`: `cn()` utility — the ecosystem standard for conditional class construction; required for Slide 6's three-panel demo

**What not to install:** `react-syntax-highlighter` (maintenance mode, Prism-based, ships ~300KB client JS), `framer-motion` (deprecated package name), `shadcn/ui` wholesale (hides classes — defeats the talk's purpose), any MDX processor (5 slides do not warrant a pipeline).

### Expected Features

**Must have (table stakes):**
- Inline CodeCallout component showing key Tailwind class tokens adjacent to every rendered demo
- Rendered visual output for every demo — static code blocks on a TV are useless
- TV-scale readability via `3xl:`/`4xl:` breakpoint escalations on all text elements
- Dark mode `dark:` variants on every demo component — ThemeToggle is global; dark-mode-unaware content looks broken on toggle
- Consistent SlideLayout chrome on all 5 new slides
- Zero-config startup (`yarn dev`, no env vars)

**Should have (differentiators):**
- Progressive reveal within slides (the CssTimeline accordion model applied to new slides)
- Three-panel comparison of conditional styling approaches (CSS variant / group / React state + cn()) on Slide 6
- Live `globals.css` on screen during Slide 5 with a brand color token added in real time
- Explicit v3 vs v4 naming on the customization slide

**Defer to appendix / v2:**
- Container queries demo (out of scope for a 6-topic intro talk)
- `peer-checked` radio button demo (DOM sibling ordering is distracting in a live setting)
- Presenter mode / slide-transition navigation
- Live CSS editor / class applier

### Architecture Approach

The existing architecture is a flat RSC page-per-slide model and should not change. Every new slide follows: `page.tsx` (RSC, pure compositor, < 50 lines) → `SlideLayout` → static JSX + `CodeCallout` instances → one `<SlideName>Demo` client island from `src/components/`. The client island is always a leaf node — never import a server component inside a "use client" component. Slide-specific data lives as constants co-located in the component file, following the CssTimeline `eras` array precedent. Shiki is only warranted for multi-line code blocks (Slide 5's `globals.css` display); single class token callouts use the lightweight CodeCallout RSC instead.

**Major components:**
1. `CodeCallout` (RSC, new) — inline class token annotation component; shared by all 5 new slides; styled `<code>` spans, no Shiki, zero client JS
2. `<SlideName>Demo` client islands (5 new, one per slide) — all interactivity, state, browser APIs; leaf nodes imported by RSC pages
3. `SlideLayout` (existing, unchanged) — nav bar, h1, chrome; all slides use it

### Critical Pitfalls

1. **Dynamic class string interpolation** — `` `bg-${color}-500` `` is silently purged in production (v4 is more unforgiving than v3). Use lookup-table maps with complete class strings everywhere. Establish this pattern in Slide 3 and verify with `yarn build && yarn start` after each slide.

2. **`@custom-variant dark` + `prefers-color-scheme` conflict** — the project has both class-gated `dark:` behavior AND an OS-preference media query updating CSS variables, creating two independent systems. On a fresh visit with OS light preference and no localStorage, backgrounds and `dark:` utilities can diverge. Fix in Phase 1: remove the `prefers-color-scheme` media query block from `globals.css`.

3. **`"use client"` placed on `page.tsx`** — makes the entire page a client component, ships unnecessary JS, and teaches the wrong mental model to audience members cloning the repo. Always extract interactive pieces to a leaf component in `src/components/`.

4. **TV text too small** — default Tailwind text utilities produce 12–16px text, unreadable at TV distance. Every text element needs a `3xl:` size escalation. Check at exactly 1920px browser width before marking any slide done.

5. **Inline callout drift from actual rendered classes** — callout strings hardcoded in JSX diverge silently when components are refactored. Use the single-source constant pattern: extract the key className as a named const and use it on both the element and the callout display.

---

## Implications for Roadmap

Based on combined research, the natural phase structure is: shared infrastructure first, then slides in teaching-sequence order, then a final quality pass.

### Phase 1: Shared Infrastructure
**Rationale:** CodeCallout, `cn()`, and the library installations are dependencies for every subsequent slide. The dark mode bug fix must also land here — it affects every slide's dark mode correctness and must be resolved before Slide 4 demo work starts.
**Delivers:** `CodeCallout.tsx` component; `src/lib/utils.ts` with `cn()`; `yarn add shiki shiki-magic-move motion clsx tailwind-merge`; `globals.css` dark mode conflict resolution (remove `prefers-color-scheme` block)
**Addresses:** Slide 6 dependency on `cn()`, all slides' dependency on consistent callout pattern
**Avoids:** Dark mode conflict pitfall (Pitfall 2), callout drift pitfall (Pitfall 5 — CodeCallout is the mechanism)

### Phase 2: Slide 2 — What Is Tailwind
**Rationale:** Philosophy slide uses the simplest possible demo (before/after toggle, no Shiki, no complex state). Validates the CodeCallout + leaf-island pattern before tackling more complex slides. Establishes the lookup-table pattern to prevent dynamic class interpolation.
**Delivers:** `WhatIsTailwindDemo.tsx`; `src/app/what-is-tailwind/page.tsx`; side-by-side semantic-class vs. utility-class button demo with CodeCallout annotations
**Uses:** `CodeCallout`, `cn()`, standard `useState` toggle
**Implements:** RSC compositor + leaf client island pattern

### Phase 3: Slide 3 — Core Utility Classes
**Rationale:** Content-heavy slide; the first slide where the lookup-table pattern for dynamic class handling is explicitly needed. Building third, after the pattern is established, means the implementation naturally demonstrates it.
**Delivers:** `UtilityClassesDemo.tsx`; `src/app/utility-classes/page.tsx`; progressive card with 6 utility categories and per-category CodeCallout groups
**Uses:** `CodeCallout` heavily; lookup-table maps for category selection state
**Avoids:** Dynamic class interpolation pitfall (lookup tables established here as a teaching artifact)

### Phase 4: Slide 4 — Responsiveness & Dark Mode
**Rationale:** Depends on Phase 1 dark mode bug fix. Responsive section uses static side-by-side layout cards (simpler than live resize, better at TV scale). Dark mode section shows two static cards side-by-side — does not depend on ThemeToggle for the demo itself.
**Delivers:** `ViewportPreview.tsx` client island; `src/app/responsiveness-dark-mode/page.tsx`; static three-column responsive demo with before/after toggle; static light/dark card pair with `dark:` CodeCallout annotations; stacked variants (`dark:md:hover:`) as a one-liner callout
**Uses:** `CodeCallout`; `useState` for before/after toggle; lookup-table for breakpoint selection
**Avoids:** TV readability pitfall (3xl: escalations); dark mode conflict (fixed in Phase 1)

### Phase 5: Slide 5 — Customizing Tailwind
**Rationale:** Highest-value slide for talk differentiation, but depends on `@theme` additions to `globals.css` and is the only slide using Shiki for a multi-line block. Building fifth means the leaf-island pattern is established before tackling the more complex Shiki integration.
**Delivers:** `CustomizingTailwindDemo.tsx` (animation replay island); `src/app/customizing-tailwind/page.tsx`; Shiki-rendered `globals.css` block; live brand color token addition demo; `@utility` and `@layer base` callouts; `globals.css` additions (`--color-brand-500`)
**Uses:** `shiki` (`codeToHtml` in async RSC); `shiki-magic-move` for animated token diff; `motion` for stagger if needed; `CodeCallout`
**Implements:** Shiki RSC pattern (`dangerouslySetInnerHTML` from `codeToHtml`)

### Phase 6: Slide 6 — Conditional Styling
**Rationale:** This slide explicitly teaches `cn()` and all three conditional-styling patterns. Building last means the codebase already demonstrates all prior patterns as context, and the three-panel comparison can reference idioms the audience has already seen in earlier slides.
**Delivers:** `ConditionalStylingDemo.tsx` (three-panel: CSS variant / group variant / useState + cn()); `HoverFocusDemo.tsx`; `src/app/conditional-styling/page.tsx`; peer-invalid validation demo; data-attribute toggle pattern; explicit anti-pattern callout for dynamic class interpolation
**Uses:** `cn()` utility; `useState`; `CodeCallout`

### Phase 7: TV Readability & Quality Pass
**Rationale:** Structural work must be complete before a readability audit is meaningful. This is a formal gate before the talk date.
**Delivers:** 1920px viewport audit of all 6 slides; `3xl:`/`4xl:` escalation fixes; reduced-motion audit for any new animations; pre-talk CodeCallout drift check (compare all callout strings against DevTools className); `yarn build && yarn start` smoke test
**Addresses:** TV text pitfall (Pitfall 4), callout drift pitfall (Pitfall 5), production build purge verification (Pitfall 1)

### Phase Ordering Rationale

- Phase 1 first because CodeCallout and `cn()` are dependencies of phases 2–6, and the dark mode bug affects every slide's dark mode correctness
- Slides ordered by teaching sequence (talk order) because each slide's demo builds conceptual fluency the next slide assumes
- Slide 5 (Shiki, globals.css modifications) is deliberately not first despite being the highest-value demo — the Shiki integration is more complex and benefits from the leaf-island pattern being established in simpler slides first
- Phase 7 (quality pass) is a dedicated phase, not a per-slide step, because TV readability issues are only visible at 1920px+ and are easiest to audit holistically

### Research Flags

Phases with standard, well-documented patterns (skip deep research during planning):
- **Phase 1 (Infrastructure):** `cn()` pattern is ecosystem-standard; `shiki` install is straightforward; CodeCallout design fully specified in ARCHITECTURE.md
- **Phase 2 (Slide 2):** Simple before/after toggle; no novel patterns
- **Phase 3 (Slide 3):** Progressive reveal follows existing CssTimeline accordion model
- **Phase 7 (Quality pass):** Checklist-driven; no new implementation

Phases that may benefit from deeper research during planning:
- **Phase 4 (Slide 4 — Responsiveness):** The constrained-container vs. real-viewport tradeoff for the responsive demo needs a concrete decision before implementation; validate that static side-by-side cards produce a compelling enough live demo
- **Phase 5 (Slide 5 — Shiki integration):** `codeToHtml` with dual-theme CSS variable injection into globals.css is specific enough that the exact implementation should be prototyped before committing to it

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All libraries verified against current npm versions and official docs; version compatibility table cross-referenced; alternatives considered with specific rationale |
| Features | HIGH | All claims verified against Tailwind v4 official docs and direct codebase review; slide content grounded in existing project files |
| Architecture | HIGH | Grounded in existing codebase patterns (CssTimeline as reference implementation); RSC/client island decisions align with Next.js App Router official docs |
| Pitfalls | HIGH | Dynamic class detection, dark mode conflict, RSC boundary, callout drift: verified with GitHub issues and official docs. TV readability: HIGH for the rule, MEDIUM for exact scale factors at specific TV sizes |

**Overall confidence:** HIGH

### Gaps to Address

- **Shiki dual-theme CSS injection with `@custom-variant dark`:** The pattern (adding `html.dark .shiki` overrides to globals.css) is documented but not tested against this project's specific selector. Should be prototyped early in Phase 5 to confirm selector specificity works as expected.
- **Constrained-container responsive demo vs. static side-by-side:** ARCHITECTURE.md makes a strong case for static side-by-side cards, but the final visual design decision should be validated with a quick prototype before Slide 4 is fully built.
- **`@theme inline` for brand colors with opacity modifiers:** PITFALLS.md flags that bare `@theme` colors may misbehave with opacity modifiers (`bg-brand-500/50`). If the Slide 5 brand color demo uses opacity variants, use `@theme inline` instead of bare `@theme`.

---

## Sources

### Primary (HIGH confidence)
- Tailwind CSS v4 official docs (utility-first, responsive design, dark mode, theme, hover/focus states, adding custom styles) — all feature and pitfall claims
- Next.js App Router docs (server/client components, composition patterns) — architecture decisions
- shikijs/shiki Context7 — RSC `codeToHtml` usage, dual-theme pattern, Node 20+ requirement
- motion/react Context7 + npm v12.38.0 — React 19 compatibility, App Router import path
- tailwind-merge GitHub discussion #468 — v3 / Tailwind v4 compatibility matrix
- Tailwind CSS GitHub issues #16159, #16068, #18539, discussion #15083 — class detection and dark mode variant bugs
- Project codebase: `src/components/CssTimeline.tsx`, `src/app/globals.css`, `.planning/codebase/CONCERNS.md`

### Secondary (MEDIUM confidence)
- InformIT — Presentation Patterns: live demo anti-patterns
- dasroot.net — Live Coding in Presentations Best Practices (2026)
- Extron / Android TV Typography Guide — 10-foot UI, 28px minimum text size
- houseofgiants.com — Next.js syntax highlighting comparison
- pkgpulse.com — Shiki vs. Prism vs. highlight.js 2026 comparison

### Tertiary (LOW confidence — project-specific inference)
- Patterns extrapolated from CssTimeline to new slides; assumes new slides face the same constraints

---
*Research completed: 2026-04-28*
*Ready for roadmap: yes*
