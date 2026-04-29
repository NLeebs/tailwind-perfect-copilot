# Phase 3: Slide 3 — Core Utility Classes - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-29
**Phase:** 3-Slide 3 — Core Utility Classes
**Areas discussed:** Two-demo arrangement, Card builder navigation, Callout scope per step

---

## Two-demo arrangement

### Q1: Overall slide structure

| Option | Description | Selected |
|--------|-------------|----------|
| Stacked vertically | Card builder top (full width), flex/grid bottom | ✓ |
| Side by side | Card builder left, flex/grid right (two-column) | |
| Tabbed | One tab per demo, only one visible at a time | |

**User's choice:** Stacked vertically
**Notes:** Card builder is the primary/featured demo; flex/grid is secondary. Full width for both.

### Q2: Card builder internal layout

| Option | Description | Selected |
|--------|-------------|----------|
| Card left, callout right | Two-column split within builder section | ✓ |
| Card centered, callout below | Card centered, callout chip stacked below | |

**User's choice:** Card left, callout right
**Notes:** Consistent with Phase 2 two-column pattern. Step navigator spans full width above.

---

## Card builder navigation

### Q1: Navigation type

| Option | Description | Selected |
|--------|-------------|----------|
| Step indicator + Prev/Next | Numbered nodes 1–6 + arrow buttons; nodes are clickable | ✓ |
| Prev/Next arrows only | Simple linear navigation, no jumping | |
| Numbered step buttons | Row of 6 buttons, clicking activates that step | |

**User's choice:** Step indicator + Prev/Next arrows
**Notes:** Presenter can jump to any step during a live talk.

### Q2: Step node labels

| Option | Description | Selected |
|--------|-------------|----------|
| Numbers + category labels | Each node: number + label below (Layout, Spacing, etc.) | ✓ |
| Numbers only | Cleaner; callout tells the story | |

**User's choice:** Numbers + category labels
**Notes:** Labels help the audience know what each step demonstrates.

### Q3: Starting step

| Option | Description | Selected |
|--------|-------------|----------|
| Start at step 1 | Opens on bare card (Layout step) | ✓ |
| Start at step 6 | Opens on complete card; steps back to explain | |

**User's choice:** Start at step 1
**Notes:** Most natural teaching progression — build from nothing.

---

## Callout scope per step

### Q1: What the callout shows

| Option | Description | Selected |
|--------|-------------|----------|
| Newly added only | Shows only classes added at the current step | ✓ |
| Two callouts: new + cumulative | "Added now" chip + "All so far" chip | |

**User's choice:** Newly added only
**Notes:** Exactly as S3-01 specifies. Card shows cumulative visual result; callout stays focused.

### Q2: Flex/grid children content

| Option | Description | Selected |
|--------|-------------|----------|
| Numbered colored boxes | Simple 1/2/3 boxes with background color | ✓ |
| Mini avatar/profile cards | Small cards with avatar, name, tag | |

**User's choice:** Numbered colored boxes
**Notes:** Keeps attention on layout behavior, not content.

---

## Claude's Discretion

- Exact Tailwind class strings at each of the 6 card steps
- Card content text (heading and body copy)
- Color choices for the numbered boxes in flex/grid demo
- Section divider style (hr vs. gap/padding)
- Exact `3xl:` escalation values
- Whether Prev/Next arrows disable or dim at step boundaries

## Deferred Ideas

None — discussion stayed within phase scope.
