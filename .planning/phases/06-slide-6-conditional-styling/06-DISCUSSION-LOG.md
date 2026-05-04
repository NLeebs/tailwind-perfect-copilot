# Phase 6: Slide 6 — Conditional Styling - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-04
**Phase:** 6-Slide 6 — Conditional Styling
**Areas discussed:** Section layout & grouping, Three-panel comparison design, cn() merge demo, data-active island design

---

## Section Layout & Grouping

| Option | Description | Selected |
|--------|-------------|----------|
| 3 sections | Section 1: three-panel comparison; Section 2: cn() merge + peer-invalid side by side; Section 3: data-active toggle | ✓ |
| 2 sections | Section 1: three-panel comparison; Section 2: all three remaining demos (cn() + peer-invalid + data-active) | |
| 4 sections | One section per demo, matching the four success criteria exactly | |

**User's choice:** 3 sections
**Notes:** Keeps the big visual comparison (Section 1) at the top. Groups the two "logic mechanism" demos (cn() merge + peer-invalid) together in Section 2. Isolates the data-active pattern in Section 3 with its own clear label.

---

## Three-Panel Comparison Design

| Option | Description | Selected |
|--------|-------------|----------|
| Self-contained panels | Each panel = demo card + its own CodeCallout directly beneath it | ✓ |
| Shared callout row | One full-width CodeCallout row below all three panels explaining mechanism differences | |

**User's choice:** Self-contained panels
**Notes:** Audience sees the class strings tied directly to each card. Three isolated columns — each panel explains itself. Better for pointing at specific panels during a live talk.

---

## cn() Merge Demo

| Option | Description | Selected |
|--------|-------------|----------|
| Static two-column | Colored swatch showing merged result + CodeCallout showing cn() call → output; no interaction | ✓ |
| Interactive toggle | Button toggles the override on/off; CodeCallout updates live; requires a client island | |

**User's choice:** Static two-column
**Notes:** The point is the class string and merge behavior, not the interaction. Keeping it static avoids adding a client island to Section 2, which stays pure RSC.

---

## data-active Island Design

| Option | Description | Selected |
|--------|-------------|----------|
| Standalone island, two-column | Left: interactive card + Toggle Active button; Right: CodeCallout + headless UI label | ✓ |
| Full-width, stacked vertically | Card full-width, button below, CodeCallout below that | |

**User's choice:** Standalone island, two-column
**Notes:** Mirrors the two-column pattern of other slides. Keeps the demo and its explanation visually paired. The headless UI callout on the right reinforces the teaching point without requiring verbal explanation.

---

## Claude's Discretion

- Exact demo card content for the three-panel comparison (placeholder text/icons)
- cn() class strings for the React state panel (e.g., `cn('rounded-xl p-6 transition', isActive && 'bg-blue-500 text-white')`)
- Whether `data-active:` works as a Tailwind v4 variant out of the box or needs a `@custom-variant` — researcher to verify
- Exact `3xl:` escalation values for text, spacing, panel padding
- Border/shadow styling on demo cards in light and dark mode

## Deferred Ideas

None — discussion stayed within phase scope.
