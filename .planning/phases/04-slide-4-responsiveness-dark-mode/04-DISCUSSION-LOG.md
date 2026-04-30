# Phase 4: Slide 4 — Responsiveness & Dark Mode - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-30
**Phase:** 4-Slide 4 — Responsiveness & Dark Mode
**Areas discussed:** Responsive demo strategy, Dark mode demo content, Stacked variants placement, Page section layout

---

## Responsive Demo Strategy

### Q1: How should the responsive layout demo work?

| Option | Description | Selected |
|--------|-------------|----------|
| Interactive tabs | Client island with Mobile/Tablet/Desktop buttons switching layout via useState | ✓ |
| Static 3-snapshot | Three frozen labeled cards (RSC), no interaction | |
| Constrained container | One box with draggable/stepped resize handle | |

**User's choice:** Interactive tabs (recommended)
**Notes:** Works at any viewport size including TV at 1920px. Needs useState so it becomes the only client island in this phase.

### Q2: What content lives inside the responsive cards?

| Option | Description | Selected |
|--------|-------------|----------|
| Profile card | Avatar circle + name + role text | ✓ |
| Simple labeled boxes | Numbered boxes (1,2,3) with background colors | |
| Content card | Icon + title + short body text | |

**User's choice:** Profile card (recommended)

### Q3: Where do the breakpoint callouts appear?

| Option | Description | Selected |
|--------|-------------|----------|
| Below the demo, update per tab | CodeCallout strip below the container, shows active breakpoint classes | ✓ |
| Inline badge on the container | Badge overlaid on the container | |
| Static callout showing all three | Fixed callout with all three states | |

**User's choice:** Below the demo, updates per active tab (recommended)

---

## Dark Mode Demo Content

### Q1: What component shows 6+ dark: classes most legibly at TV scale?

| Option | Description | Selected |
|--------|-------------|----------|
| Rich info card | Card with multiple named zones each carrying a dark: class | ✓ |
| Before/after comparison | Two frozen cards side by side | |
| Color swatch grid | Grid of labeled dark: pair swatches | |

**User's choice:** Rich info card (recommended)

### Q2: How are the 6+ dark: callouts presented?

| Option | Description | Selected |
|--------|-------------|----------|
| Single multi-line CodeCallout | One chip with all 6 class pairs on separate lines | ✓ |
| One callout per zone | Individual CodeCallout per card zone | |
| Two-column callout grid | Light class left, dark: override right | |

**User's choice:** Single multi-line CodeCallout (recommended)

### Q3: Is the dark mode demo RSC or a client island?

| Option | Description | Selected |
|--------|-------------|----------|
| RSC — no island needed | ThemeToggle drives .dark class on html; no useState needed in card | ✓ |
| Client island with highlight | useState to highlight callout entry on zone click | |

**User's choice:** RSC — no island needed (recommended)

---

## Stacked Variants Placement

### Q1: Where does the dark:md:hover: element live?

| Option | Description | Selected |
|--------|-------------|----------|
| Embedded in the dark mode card | Button inside the info card carries dark:md:hover: classes | ✓ |
| Standalone third section | Separate section with overline + dedicated element | |
| Embedded in the responsive demo | Tab buttons or profile cards carry the stacked classes | |

**User's choice:** Embedded in the dark mode card (recommended)

### Q2: How is the dark:md:hover: element called out?

| Option | Description | Selected |
|--------|-------------|----------|
| Separate CodeCallout below the card | Second chip below the dark: callout, labeled "STACKED VARIANTS" | ✓ |
| Inline annotation next to the button | CodeCallout adjacent to the button inside the card | |
| Part of the same multi-line CodeCallout | Appended to the dark: class list | |

**User's choice:** Separate CodeCallout below the main dark: chip (recommended)

---

## Page Section Layout

### Q1: How should the two main sections be arranged?

| Option | Description | Selected |
|--------|-------------|----------|
| Full-width stacked sections | Phase 3 pattern — two sections + spacer div | ✓ |
| Two-column split | Responsive left, dark mode right, both visible at once | |

**User's choice:** Full-width stacked sections (recommended) — consistent with Phase 3

### Q2: Within the dark mode section, how is the card arranged relative to callouts?

| Option | Description | Selected |
|--------|-------------|----------|
| Card left, callouts right | Two-column split within the section | |
| Card on top, callouts below | Full-width card then CodeCallouts below | ✓ |
| You decide | Claude picks based on phase patterns | |

**User's choice:** Card on top, callouts below (departed from Phase 2 side-by-side pattern — full-width card gets more visual space)

---

## Claude's Discretion

- Exact 6+ dark: class choices (which color utilities, which zones, exact values)
- Profile card placeholder content (names, roles, avatar styling)
- Whether tab buttons include a breakpoint label hint
- Exact 3xl: escalation values
- Section heading style (match Phase 3 h2 pattern)
- Border/shadow styling on the info card

## Deferred Ideas

None — discussion stayed within phase scope.
