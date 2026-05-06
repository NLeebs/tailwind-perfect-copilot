# Phase 8: Slide 2 Rework - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-06
**Phase:** 8-Slide 2 Rework
**Areas discussed:** Page scroll & density, Problem cards design, ButtonComparison split, Naming card framing

---

## Page Scroll & Density

| Option | Description | Selected |
|--------|-------------|----------|
| Scroll freely | Let content breathe at natural spacing. Consistent with Phase 6. | ✓ |
| Condense to one viewport | Tighten spacing so everything fits without scrolling at 1920px. | |

**User's choice:** Scroll freely

---

| Option | Description | Selected |
|--------|-------------|----------|
| Full-width banner | Prominent heading + 1–2 sentences. Visually distinct section. | ✓ |
| Compact paragraph | 1–2 sentences blending into problem cards. Lower visual weight. | |

**User's choice:** Full-width banner

---

| Option | Description | Selected |
|--------|-------------|----------|
| Spacing only | mt-12/mt-16 3xl:mt-20/3xl:mt-24 spacer. Phase 6 pattern. | ✓ |
| Subtle divider line | Border-b or horizontal rule between sections. | |

**User's choice:** Spacing only

---

## Problem Cards Design

| Option | Description | Selected |
|--------|-------------|----------|
| All 3 cards | Context-switching, naming things is hard, CSS bloat. | ✓ |
| 2 cards | Drop one problem for a cleaner layout. | |

**User's choice:** All 3

---

| Option | Description | Selected |
|--------|-------------|----------|
| grid-cols-3 | One card per column, equal width. | ✓ |
| grid-cols-2 with one spanning | Two normal + one wider card. | |

**User's choice:** grid-cols-3

---

| Option | Description | Selected |
|--------|-------------|----------|
| Emoji icon + heading + 1 line | Visual variety, fast to read at TV distance. | |
| Heading + 1–2 lines, no icon | Minimal, consistent with existing card style. | ✓ |
| Bold heading only | Large and punchy, no body text. | |

**User's choice:** Heading + 1–2 lines, no icon

---

## ButtonComparison Split

| Option | Description | Selected |
|--------|-------------|----------|
| Split into two components | SemanticButton.tsx + UtilityButton.tsx. Clean separation. | ✓ |
| One component, side prop | ButtonComparison with side='semantic'|'utility' prop. | |
| Keep one island, render in two columns | Avoid refactoring; fights the visual separation. | |

**User's choice:** Split into two components

---

| Option | Description | Selected |
|--------|-------------|----------|
| Keep click-to-reveal | Teaching beat preserved via toggle interaction. | |
| Always show the CSS | Remove toggle — always display .btn definition below button. | ✓ |

**User's choice:** Always show the CSS (no useState toggle)

---

| Option | Description | Selected |
|--------|-------------|----------|
| Pure RSC | No "use client" since no state is needed. Simpler. | |
| Keep as client island anyway | Explicit "use client" even without state. | ✓ |

**User's choice:** Keep as client island (explicit user preference)

---

## Naming Card Framing

| Option | Description | Selected |
|--------|-------------|----------|
| Contrast: 'the names you still have to invent' | Left col = semantic story. "With Semantic CSS" framing. | ✓ |
| Standalone: 'naming is hard' illustration | Card stands alone without Tailwind counterpart. | |
| You decide | Leave framing to Claude's discretion. | |

**User's choice:** Contrast framing — left column owns the semantic CSS narrative end-to-end

---

| Option | Description | Selected |
|--------|-------------|----------|
| Left column | Semantic story: semantic button + .btn CSS + naming card. | ✓ |
| Right column, below Tailwind card | Asymmetric; naming card connects to Tailwind card visually. | |

**User's choice:** Left column

---

| Option | Description | Selected |
|--------|-------------|----------|
| Visible card shell | Border, background, padding matching the Tailwind card. | ✓ |
| Overline + CodeCallout only, no card shell | Lighter weight; no card frame. | |

**User's choice:** Visible card shell

---

## Claude's Discretion

- Exact philosophy intro heading and body text
- Body text for each of the 3 problem cards
- Column caption text (1 short line below each overline)
- Naming card heading/body text and overline label wording
- Exact `mt-*` and `3xl:mt-*` spacer values between sections
- Whether `UtilityButton.tsx` uses `"use client"` or is pure RSC
- `3xl:` escalation values for problem card text, intro heading, card padding

## Deferred Ideas

None — discussion stayed within phase scope.
