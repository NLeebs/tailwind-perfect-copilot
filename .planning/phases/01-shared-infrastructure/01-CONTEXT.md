# Phase 1: Shared Infrastructure - Context

**Gathered:** 2026-04-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Install shared primitive libraries, create the `CodeCallout` RSC component, create the `cn()` utility in `src/lib/utils.ts`, and remove the `prefers-color-scheme` media query conflict from `globals.css`. Every subsequent slide phase depends on these foundations — nothing else is added here.

</domain>

<decisions>
## Implementation Decisions

### CodeCallout Appearance
- **D-01:** Monospace chip/badge style — small pill with monospace font, muted background (slate-100 light / slate-800 dark). Minimal visual noise.
- **D-02:** Component renders the chip below the demo element. Each slide controls overall layout via normal flex/grid — CodeCallout is layout-agnostic.
- **D-03:** Class string wraps to multiple lines within the chip. Never truncates — must show the full class list (critical for the "class soup is documentation" demo in Slide 2).
- **D-04:** Raw class string only — no label prefix. Just the Tailwind classes, no extra text.

### CodeCallout API
- **D-05:** Single `classes` string prop. Usage: `<CodeCallout classes="bg-sky-500 rounded-lg px-4 py-2" />`. No other required props.
- **D-06:** No additional props — fixed appearance. No `className`, `size`, or variant overrides. Consistent visual language across all slides, no per-slide tweaks.
- **D-07:** Single-source convention (extract class string as a named `const`, pass the same const to both the element and `<CodeCallout classes={CARD_CLASSES} />`) is documented in CLAUDE.md. Not enforced structurally by the component.

### cn() Utility
- **D-08:** Standard `clsx` + `tailwind-merge` (v3) wrapper. Signature: `cn(...inputs: ClassValue[]): string`. No additional functionality.
- **D-09:** Lives at `src/lib/utils.ts`. This file does not exist yet — create it.

### Dark Mode Fix
- **D-10:** Remove the `@media (prefers-color-scheme: dark)` block from `globals.css` entirely. The `@custom-variant dark (&:where(.dark, .dark *))` is the single source of truth. ThemeToggle controls dark mode; OS preference should not compete.

### Package Installation
- **D-11:** Install all roadmap packages in Phase 1: `shiki`, `shiki-magic-move`, `motion`, `clsx`, `tailwind-merge`. Single install pass — later phases can use them immediately.
- **D-12:** `tailwind-merge` must be v3 (v2 is Tailwind v3 only).
- **D-13:** `motion` is imported from `"motion/react"`, not `"framer-motion"`.
- **D-14:** `shiki-magic-move` is deferred to v2 in the roadmap but installed now for completeness.

### Claude's Discretion
- Exact chip styling values (specific slate shade, padding, border-radius, font-size) — Claude picks TV-legible defaults that fit the existing design system.
- File structure for `src/lib/` — create the directory and `utils.ts` as needed.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Requirements
- `.planning/REQUIREMENTS.md` §Shared Infrastructure — INFRA-01, INFRA-02, INFRA-03 (the three requirements for this phase)
- `.planning/ROADMAP.md` §Phase 1 — Success criteria and dependencies

### Existing Code
- `src/app/globals.css` — Contains the `@media (prefers-color-scheme: dark)` block to remove, the `@custom-variant dark` declaration to keep, the `@layer base` h1 styles, and the existing `@theme` breakpoints
- `src/components/SlideLayout.tsx` — The shared slide wrapper every subsequent page uses; CodeCallout must work within its chrome
- `src/components/ThemeToggle.tsx` — The mechanism that applies `.dark` to `<html>` — understanding this confirms why removing `prefers-color-scheme` is safe

### Architecture Guidance
- `CLAUDE.md` §Interactive demo patterns — single-source callout pattern, RSC default, leaf-node client island rule, no dynamic class interpolation
- `CLAUDE.md` §Tailwind v4 specifics — config lives in `globals.css`, `@custom-variant dark` is the ONLY dark mode mechanism

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/SlideLayout.tsx`: Provides the shared page chrome. CodeCallout will be used inside SlideLayout-wrapped pages — match its visual weight.
- `src/components/ThemeToggle.tsx`: Writes `.dark` to `<html>` — confirms that removing `prefers-color-scheme` is safe and the dark variant works exclusively via class.
- `src/components/CssTimeline.tsx`: An existing interactive "use client" island — reference for the leaf-node client island pattern.

### Established Patterns
- RSC default: `page.tsx` files are Server Components. Only add `"use client"` to leaf components that need `useState`/`useRef`/browser APIs.
- Tailwind v4 config: All customization is in `globals.css` via `@theme` blocks. No `tailwind.config.js`.
- Dark mode: Class-based via `@custom-variant dark (&:where(.dark, .dark *))`. No `prefers-color-scheme` anywhere after this phase.
- TV scale: `3xl:` breakpoint (1920px) escalations required on all text and spacing. `4xl:` (2560px) available.
- No dynamic class interpolation: All class strings must be complete static literals. Use lookup-table maps for toggled states.

### Integration Points
- `src/lib/utils.ts`: New file. All interactive demo components across phases 2–6 will `import { cn } from "@/lib/utils"`.
- `src/components/CodeCallout.tsx`: New RSC. All slide pages will import and use it adjacent to demo elements.
- `globals.css`: Remove the `prefers-color-scheme` block. No other structural changes to this file in Phase 1.

</code_context>

<specifics>
## Specific Ideas

- The chip preview chosen by user: `[ bg-sky-500 rounded-lg px-4 py-2 ]` — monospace, bracketed feel. The component should evoke this aesthetic.
- The `classes` prop is named `classes` (not `className`, `value`, or `children`) to avoid confusion with the element's own `className`.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 1-Shared Infrastructure*
*Context gathered: 2026-04-29*
