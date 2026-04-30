# Phase 5: Slide 5 — Customizing Tailwind - Context

**Gathered:** 2026-04-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the "Customizing Tailwind" slide page — replacing the stub at `src/app/customizing-tailwind/page.tsx` with three full-width stacked sections, each teaching a distinct Tailwind v4 CSS-first config concept:

1. **@theme token pipeline (S5-01)**: A Shiki-rendered excerpt of globals.css showing the `@theme` block with `--color-brand-500` token, alongside a live component using `bg-brand-500` — demonstrating that the CSS token generates a Tailwind utility class automatically.

2. **@utility custom utility (S5-02)**: A Shiki-rendered snippet showing the `@utility scrollbar-hidden` definition from globals.css, with an explicit `CodeCallout` naming the v3 equivalent (`@layer utilities`).

3. **@layer base rule (S5-03)**: A Shiki-rendered snippet showing the existing `@layer base { h1 { ... } }` gradient rule from globals.css, with a live `<h1>` on the slide demonstrating that the styles apply without any extra class.

Nothing else is added in this phase — no new interactive client islands beyond what is needed, no new shared components.

</domain>

<decisions>
## Implementation Decisions

### Shiki Syntax Highlighting
- **D-01:** Use Shiki dual-theme CSS variable approach — one render per code block; each `<span>` carries both `--shiki-light` and `--shiki-dark` CSS variable values. A CSS rule `html.dark .shiki span { color: var(--shiki-dark) }` (with `!important` if needed for inline-style specificity) flips the colors in dark mode.
- **D-02:** **Prototype required as plan 1.** Before building the full slide, create a minimal prototype page or component that verifies the dual-theme approach works with this project's `@custom-variant dark (&:where(.dark, .dark *))` mechanism. If specificity fails (dark colors don't apply), fall back to the two-render CSS-toggle approach (render both themes, hide one with `.dark .shiki-light { display: none }`).
- **D-03:** Shiki rendering happens in RSC (Server Components) — no client-side highlighting needed. The rendered HTML string is returned from an `async` RSC.

### Section Layout
- **D-04:** Three full-width stacked sections, separated by `<div className="mt-16 3xl:mt-24" />` spacers — same pattern as Phases 3 and 4. @theme section on top (primary demo), @utility in the middle, @layer base at the bottom.
- **D-05:** Each section follows the established two-column split: Shiki code block on the left, live demo element + `CodeCallout` on the right (matching the Phase 2 two-column grid pattern: `grid grid-cols-2 gap-6 3xl:gap-12`).

### globals.css Code Display
- **D-06:** Show relevant excerpts only — NOT the full 32-line file. Each section renders only the snippet that is being taught:
  - @theme section: just the `@theme { ... }` block with `--color-brand-500` (~4–5 lines)
  - @utility section: just the `@utility scrollbar-hidden { ... }` definition (~3 lines)
  - @layer base section: just the `@layer base { h1 { ... } }` block (~5 lines)
- **D-07:** Snippet strings are hardcoded static constants (not read from disk at runtime) — consistent with the project's static-string pattern and avoids file I/O in RSC.

### globals.css Modifications
- **D-08:** Add `--color-brand-500: #3b82f6` to the existing `@theme { }` block in globals.css (after breakpoints). This makes `bg-brand-500` a real Tailwind utility class.
- **D-09:** Add `@utility scrollbar-hidden { overflow: hidden; }` (or `scrollbar-width: none` variant — Claude's discretion) to globals.css. This is a real addition to the file that the slide demos.

### Claude's Discretion
- Exact brand color value (suggested `#3b82f6` — blue-500 equivalent, clearly visible)
- Exact `@utility scrollbar-hidden` CSS property (e.g., `overflow: hidden` vs. `scrollbar-width: none` — either is valid for the demo)
- Live demo element for bg-brand-500 (a colored swatch or button using the brand token)
- Live demo element for @layer base (the slide's own `<h1>` serves as proof — can reuse it or add a standalone `<h1>` in the section)
- Shiki theme choices (suggested `github-light` + `github-dark` or `vitesse-light` + `vitesse-dark` — high contrast for TV readability)
- Exact 3xl: escalations for code block font size, spacing, and section headings

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase Requirements
- `.planning/REQUIREMENTS.md` §Slide 5 — Requirements S5-01, S5-02, S5-03 (the three success criteria for this phase)
- `.planning/ROADMAP.md` §Phase 5 — Goal, success criteria, dependencies, and UI hint

### Architecture & Conventions
- `CLAUDE.md` §Interactive demo patterns — single-source callout pattern, RSC default, leaf-node client island rule, no dynamic class interpolation
- `CLAUDE.md` §Tailwind v4 specifics — `@custom-variant dark` is the ONLY dark mode mechanism; no `prefers-color-scheme`
- `CLAUDE.md` §Adding a new slide — steps for registering in home nav (already registered — verify title/tagline)

### Existing Code (read before implementing)
- `src/app/customizing-tailwind/page.tsx` — Current stub; the file being replaced
- `src/app/globals.css` — File being modified (add `--color-brand-500` to @theme; add `@utility scrollbar-hidden`); also the source of all three displayed snippets
- `src/components/SlideLayout.tsx` — Shared wrapper providing nav bar, back link, slide number badge, and h1
- `src/components/CodeCallout.tsx` — RSC component; single `classes: string` prop; use for v3-equivalent callout in @utility section
- `src/lib/utils.ts` — `cn()` utility; available if any conditional class logic needed
- `src/app/utility-classes/page.tsx` — Phase 3 stacked sections pattern (two `<section>` blocks + spacer div)
- `src/app/responsiveness-dark-mode/page.tsx` — Phase 4 stacked sections pattern with section overlines
- `src/app/what-is-tailwind/page.tsx` — Phase 2 two-column grid pattern (`grid grid-cols-2 gap-6 3xl:gap-12`) and overline convention

### Prior Phase Context
- `.planning/phases/04-slide-4-responsiveness-dark-mode/04-CONTEXT.md` — Phase 4 section layout, overline convention, dark mode patterns
- `.planning/phases/03-slide-3-core-utility-classes/03-CONTEXT.md` — Phase 3 stacked sections spacer convention

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/CodeCallout.tsx` — `<CodeCallout classes={STRING_CONST} />`. Use for the v3 equivalent callout in the @utility section ("v3: `@layer utilities { .scrollbar-hidden { ... } }`").
- `src/components/SlideLayout.tsx` — Wraps all slide content. Provides nav bar and `<h1>` title — the h1 itself serves as a live demo artifact for the @layer base section.
- `src/lib/utils.ts` — `cn()` — available if needed for conditional class logic in any client island.

### Established Patterns
- **Single-source const**: Snippet strings for Shiki input and any related CodeCallout should use the same named const to prevent drift.
- **Static string constants**: All code snippet content hardcoded as named constants (no runtime file reads, no dynamic string building).
- **Two-column layout**: `grid grid-cols-2 gap-6 3xl:gap-12` — code block on left, demo + callout on right. Established in Phase 2.
- **Stacked sections**: Two or more `<section>` blocks separated by `<div className="mt-16 3xl:mt-24" />`.
- **Overline labels**: `text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400` above each section.
- **TV scale**: `3xl:` escalations required on all text, spacing, and code block font size.
- **Color palette**: `slate-50`/`slate-950` backgrounds, `cyan-500` accents, `slate-200`/`slate-800` borders.
- **Dark mode**: `dark:` prefix via `@custom-variant dark`. No `prefers-color-scheme`.

### Integration Points
- `src/app/customizing-tailwind/page.tsx` — Replace stub. Import `SlideLayout`, new Shiki-rendering RSC(s), `CodeCallout`.
- `src/app/globals.css` — Add `--color-brand-500` token and `@utility scrollbar-hidden` rule.
- `src/app/page.tsx` — Verify `customizing-tailwind` entry exists in the `slides` array with correct title/tagline.
- New Shiki component (e.g., `src/components/ShikiBlock.tsx`) — async RSC that accepts a code string + language, renders Shiki dual-theme HTML, and adds the dark mode CSS rule.

</code_context>

<specifics>
## Specific Ideas

- The Shiki prototype plan should create a minimal test in the customizing-tailwind page (or a throwaway component) that renders one highlighted CSS snippet and verifies both light and dark mode colors display correctly before the full slide is built.
- The @theme section: left column = Shiki block showing the @theme excerpt; right column = a colored swatch or button using `bg-brand-500` with a label "This class is auto-generated from the token above."
- The @utility section: left column = Shiki block showing `@utility scrollbar-hidden { ... }`; right column = `CodeCallout` showing the v3 equivalent (`@layer utilities { .scrollbar-hidden { ... } }`), labeled with overline "V3 EQUIVALENT".
- The @layer base section: left column = Shiki block showing the `@layer base { h1 { ... } }` rule; right column = a live `<h1>` element with no extra class, labeled "No class needed — this h1 inherits the gradient from @layer base."

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 5-Slide 5 — Customizing Tailwind*
*Context gathered: 2026-04-30*
