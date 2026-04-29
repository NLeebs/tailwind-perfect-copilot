# Phase 2: Slide 2 — What Is Tailwind - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-29
**Phase:** 2-Slide 2 — What Is Tailwind
**Areas discussed:** Semantic CSS visibility, Documentation card richness, Section layout & narration, Button demo interactivity

---

## Semantic CSS visibility

### Question 1: How is the .btn CSS definition presented?

| Option | Description | Selected |
|--------|-------------|----------|
| Hidden (black box) | The .btn class works but its CSS is not shown — audience sees "Semantic: .btn" and "Tailwind: bg-sky-500 px-4 py-2 rounded-lg font-semibold" side-by-side | |
| Visible as a callout | A second CodeCallout shows the .btn CSS definition next to the semantic button | |
| Expand on click | The .btn definition is collapsed by default — clicking reveals it. Teaching beat without cluttering the slide | ✓ |

**User's choice:** Expand on click

### Question 2: What does the revealed .btn definition look like?

| Option | Description | Selected |
|--------|-------------|----------|
| Plain CodeCallout chip | Same monospace chip style as all other callouts | ✓ |
| Minimal code block | A small `<pre>` / syntax-highlighted block showing `.btn { ... }` | |

**User's choice:** Plain CodeCallout chip

### Question 3: What triggers the .btn CSS reveal?

| Option | Description | Selected |
|--------|-------------|----------|
| Click the semantic button itself | Clicking the .btn button toggles its CSS definition inline below it | ✓ |
| Separate 'Show CSS' toggle link | A small "Show CSS ▾" link below the semantic button | |
| You decide | Claude picks whichever is cleaner | |

**User's choice:** Click the semantic button itself

---

## Documentation card richness

### Question 1: How rich should the card be?

| Option | Description | Selected |
|--------|-------------|----------|
| Simple styled div | Heading + body text, ~8-10 classes (bg, padding, border, shadow, rounded, font) | ✓ |
| Multi-element card | Heading, body, badge/tag, ~14-18 classes — richer story | |

**User's choice:** Simple styled div

### Question 2: Where does the CodeCallout appear?

| Option | Description | Selected |
|--------|-------------|----------|
| Below the card | Card on top, CodeCallout chip below it | ✓ |
| Alongside (side-by-side) | Card on the left, CodeCallout to the right | |
| You decide | Claude picks based on TV-scale readability | |

**User's choice:** Below the card

---

## Section layout & narration

### Question 1: How are the two demo sections arranged?

| Option | Description | Selected |
|--------|-------------|----------|
| Top-to-bottom, full-width sections | Button comparison on top, documentation card below | |
| Two columns side-by-side | Button comparison on left, documentation card on right | ✓ |
| You decide | Claude picks based on TV-scale readability | |

**User's choice:** Two columns side-by-side

### Question 2: Section labels?

| Option | Description | Selected |
|--------|-------------|----------|
| Small section labels | h2 or overline text above each column ("Semantic CSS" / "Utility-First Tailwind") | ✓ |
| No labels — demos speak for themselves | No additional text | |

**User's choice:** Small section labels

### Question 3: Explanatory text?

| Option | Description | Selected |
|--------|-------------|----------|
| Purely visual — label + demo + callout only | No `<p>` text | |
| One-line caption per section | A single sentence under each label | ✓ |

**User's choice:** One-line caption per section

---

## Button demo interactivity

### Question 1: Hover styles on the Tailwind button?

| Option | Description | Selected |
|--------|-------------|----------|
| Yes — hover styles on the Tailwind button | Tailwind button gets `hover:` classes; .btn button does not | |
| No — both buttons static | This slide is about class-list transparency, not hover interaction | ✓ |

**User's choice:** No — both buttons static

### Question 2: Click behavior?

| Option | Description | Selected |
|--------|-------------|----------|
| Only semantic button reveals CSS on click | The Tailwind button is inert; no other interactions | ✓ |
| Both buttons have a click ripple / active state | Both respond to clicks with brief visual feedback | |

**User's choice:** Only semantic button reveals CSS on click

---

## Claude's Discretion

- Exact Tailwind classes for the button (color, padding, rounded, font-weight) — must visually match the `.btn` CSS
- Exact card heading and body text content
- Caption wording for each section label
- Whether two-column layout uses `flex` or `grid`
- Exact `3xl:` escalation values for text and spacing

## Deferred Ideas

None — discussion stayed within phase scope.
