# Phase 5: Slide 5 — Customizing Tailwind - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-30
**Phase:** 5-Slide 5 — Customizing Tailwind
**Areas discussed:** Shiki dark mode, Section layout, globals.css display scope

---

## Shiki Dark Mode

| Option | Description | Selected |
|--------|-------------|----------|
| Dual-theme CSS vars | One Shiki render; spans carry both `--shiki-light` and `--shiki-dark` CSS vars. `html.dark .shiki span` override flips colors. Needs a specificity test. | ✓ |
| Two renders, CSS toggle | Shiki runs twice (light + dark). Light render hidden in dark mode via CSS. Reliable, doubles HTML. | |
| Skip Shiki | Use `<pre>` with manual Tailwind span coloring. Zero risk, more manual. | |

**User's choice:** Dual-theme CSS vars (with prototype step first)
**Notes:** User asked for a plain-English explanation of Shiki and the dark mode challenge before deciding. After explanation: chose dual-theme with an explicit prototype/test step early in execution. If specificity fails, fall back to two-render approach.

---

## Section Layout

| Option | Description | Selected |
|--------|-------------|----------|
| Stacked vertically | Three full-width sections, spacers between them — same pattern as Phases 3 and 4. | ✓ |
| Two-column grid | @theme full-width top row; @utility and @layer base side-by-side in second row. | |

**User's choice:** Stacked vertically
**Notes:** No additional comments. Standard pattern consistent with prior phases.

---

## globals.css Display Scope

| Option | Description | Selected |
|--------|-------------|----------|
| Relevant excerpt only | Show just the relevant @theme / @utility / @layer base snippet per section (~3–5 lines each). | ✓ |
| Full globals.css | Show all 32 lines to convey that all config lives in one file. | |

**User's choice:** Relevant excerpt only
**Notes:** Focused approach — each section shows only the snippet being taught.

---

## Claude's Discretion

- Exact brand color value for `--color-brand-500`
- Exact CSS property for `@utility scrollbar-hidden`
- Live demo element design for each section
- Shiki theme pair selection (light + dark)
- 3xl: escalation values for code blocks and section text

## Deferred Ideas

None — discussion stayed within phase scope.
