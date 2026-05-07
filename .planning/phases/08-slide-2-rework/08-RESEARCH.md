# Phase 8: Slide 2 Rework — Research

**Researched:** 2026-05-07
**Domain:** Next.js App Router page rework — React Server Components, Tailwind v4, TV-legible slide layout
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Page Structure & Scroll (S2-01–S2-04)**
- D-01: The slide scrolls freely — no viewport-fit constraint. All four content sections (intro, problem cards, demo grid, naming card) use natural spacing. Consistent with Phase 6's section-spacer pattern (`mt-16 3xl:mt-24` between sections).
- D-02: Philosophy intro is a full-width banner section — a prominent heading with 1–2 sentences below it defining "utility-first CSS framework" and the core concept (style in markup, composable primitives). Rendered before the problem cards.
- D-03: Section separators are spacing-only (`mt-12 3xl:mt-20` or `mt-16 3xl:mt-24`). No border dividers between sections.

**Problem Cards (S2-02)**
- D-04: 3 problem cards — all three problems included: context-switching (HTML↔CSS), naming things is hard, CSS bloat.
- D-05: Problem cards use a `grid grid-cols-3` layout (one card per column). Follows the same grid convention as the demo section below it.
- D-06: Each card: heading + 1–2 body lines of text. No icons or emoji. Minimal, consistent with the existing text-card style on the slide.

**Demo Column Split (S2-03)**
- D-07: `ButtonComparison.tsx` is replaced by two separate components: `src/components/SemanticButton.tsx` (left column) and `src/components/UtilityButton.tsx` (right column).
- D-08: No click-to-reveal interaction. The `.btn` CSS definition is always visible below the semantic button. Teaching beat preserved by always showing it.
- D-09: `SemanticButton.tsx` keeps `"use client"` directive even though no `useState` is needed — explicit user choice.

**Demo Column Narrative**
- D-10: Left column = full semantic CSS story: semantic button → `.btn` CSS CodeCallout → naming card (S2-04).
- D-11: Right column = full Tailwind story: utility button → Tailwind class CodeCallout → existing Tailwind card → Tailwind card CodeCallout.
- D-12: Column overlines follow the established Phase 2 pattern (`text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400`): Left: "Semantic CSS", Right: "Utility-First Tailwind".

**Naming Card (S2-04)**
- D-13: Naming card sits in the left column, below the semantic button + `.btn` CodeCallout.
- D-14: Teaching frame: "the names you still have to invent." CodeCallout shows `.card-header {}`, `.card-title {}`, `.card-highlighted {}`.
- D-15: Naming card has a visible card shell (border, background, padding) using the same `CARD_CLASSES` const or equivalent — both columns have a real-looking card at the bottom.
- D-16: Single-source const for the naming card's class string so the CodeCallout never drifts from the rendered card.

### Claude's Discretion

- Exact heading text for the philosophy intro section
- Body text for each of the 3 problem cards (must be TV-legible — 1–2 tight sentences per card)
- Column caption text (1 short line below each overline, matching the current Phase 2 captions)
- Naming card heading/body text and overline label wording
- Exact `mt-*` and `3xl:mt-*` spacer values between sections
- Whether `UtilityButton.tsx` is a pure RSC or also has `"use client"` (no state needed — RSC preferred per conventions)
- `3xl:` escalation values for problem card text, intro heading, and card padding

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| S2-01 | User sees a philosophy intro section on Slide 2 before the existing demo — includes a "utility-first CSS framework" definition and the core concept (style in markup, composable primitives) | Full-width banner section above problem cards. Pure RSC. Heading + 1–2 sentences. Pattern: same `max-w-*` container as rest of slide content, no separate wrapper component needed. |
| S2-02 | User sees 2–3 condensed problem cards above the demo (context-switching between HTML/CSS, naming things is hard, CSS bloat) — TV-legible at 1920px | `grid grid-cols-3 gap-6 3xl:gap-12` — identical gap convention to the existing demo grid. Card shell: `CARD_CLASSES` const. Text escalations confirmed from Phase 7 ratios. |
| S2-03 | User sees the semantic vs. utility button demos split one-per-column in the two-column grid (rearranged from the current single-column layout) | `ButtonComparison.tsx` → `SemanticButton.tsx` + `UtilityButton.tsx`. Constants `TAILWIND_BTN_CLASSES` and `BTN_CSS_DEFINITION` migrate directly. `SemanticButton.tsx` = `"use client"` (D-09). `UtilityButton.tsx` = RSC. |
| S2-04 | User sees a second card below the existing Tailwind card demo with a CodeCallout showing `.card-header {}` / `.card-title {}` / `.card-highlighted {}` to illustrate the naming-things-is-hard problem live | Naming card in the LEFT column (D-13), not the right. Uses `CARD_CLASSES` (or `NAMING_CARD_CLASSES`) const. CodeCallout receives a multi-line string of the 3 CSS rule stubs. |
</phase_requirements>

---

## Summary

Phase 8 is a bounded page rework — a full rewrite of `src/app/what-is-tailwind/page.tsx` plus creation of two new leaf-node components (`SemanticButton.tsx`, `UtilityButton.tsx`) to replace `ButtonComparison.tsx`. No new routes, no new shared infrastructure, no new design system additions.

The current slide is a simple two-column grid with no intro or context. The rework adds three sections above the existing demo: (1) a philosophy intro banner defining "utility-first CSS framework," (2) a 3-card problem row on a `grid grid-cols-3` layout, and (3) the rearranged two-column demo grid. A fourth content addition is the naming-problem card that now lives at the bottom of the left (semantic) column.

All patterns in this phase are established and battle-tested across Phases 2–7. There is no novel technology or API to research — the work is application of existing conventions: single-source consts, RSC-by-default with leaf-node client islands, `3xl:` escalations, `dark:` prefixes, `CodeCallout` usage, and section-spacer spacing. The only "new" file is `SemanticButton.tsx` (which retains the `"use client"` boundary per D-09 despite needing no state), and `UtilityButton.tsx` which is a pure RSC.

**Primary recommendation:** Follow the exact constants and patterns extracted from `ButtonComparison.tsx` and `what-is-tailwind/page.tsx`. Copy `TAILWIND_BTN_CLASSES` and `BTN_CSS_DEFINITION` verbatim into the new components. Reuse `CARD_CLASSES` from the page for the naming card shell. Apply Phase 6 section-spacer pattern between all four sections.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Philosophy intro banner | RSC (page) | — | Static text content; no interactivity needed |
| Problem cards grid | RSC (page) | — | Static text content; pure markup |
| Semantic button demo | Client island (SemanticButton.tsx) | — | `"use client"` required per D-09; renders `<style>` tag for `.btn` |
| Utility button demo | RSC (UtilityButton.tsx) | — | No state needed; RSC preferred per CLAUDE.md conventions |
| Tailwind card demo | RSC (page, inline) | — | Already inline in page.tsx; no interaction |
| Naming card + CodeCallout | RSC (page, inline) | — | Static card shell + CodeCallout; no interaction |
| Page assembly & grid layout | RSC (page.tsx) | — | Orchestrates all columns and sections |

---

## Standard Stack

### Core (already installed — no new dependencies)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.2.3 | App Router RSC page | Already the project framework [VERIFIED: package.json] |
| React | 19.2.4 | Component model | Already installed [VERIFIED: package.json] |
| Tailwind CSS | ^4 | Utility class styling | Project standard; config in globals.css [VERIFIED: package.json] |
| tailwind-merge | ^3 | cn() utility | Available via src/lib/utils.ts [VERIFIED: package.json] |

**No new packages to install.** This phase uses only existing dependencies.

---

## Architecture Patterns

### System Architecture Diagram

```
SlideLayout (RSC wrapper — nav + h1)
  └─ page.tsx (RSC — full rewrite)
       │
       ├─ [Section 1] Philosophy Intro Banner
       │    └─ Heading + 1–2 sentence paragraph (inline JSX)
       │
       ├─ [mt-16 3xl:mt-24 spacer]
       │
       ├─ [Section 2] Problem Cards
       │    └─ grid grid-cols-3 gap-6 3xl:gap-12
       │         ├─ Card: Context-switching (CARD_CLASSES const)
       │         ├─ Card: Naming things (CARD_CLASSES const)
       │         └─ Card: CSS bloat (CARD_CLASSES const)
       │
       ├─ [mt-16 3xl:mt-24 spacer]
       │
       └─ [Section 3] Two-Column Demo Grid
            └─ grid grid-cols-2 gap-6 3xl:gap-12
                 │
                 ├─ [Left column] — Semantic CSS
                 │    ├─ Overline: "Semantic CSS" + caption
                 │    ├─ SemanticButton.tsx ("use client" island)
                 │    │    ├─ <style> .btn {...} block
                 │    │    ├─ <button class="btn"> Button </button>
                 │    │    └─ <CodeCallout classes={BTN_CSS_DEFINITION} />
                 │    └─ Naming Card (inline RSC)
                 │         ├─ Card shell (CARD_CLASSES const)
                 │         └─ <CodeCallout classes={NAMING_CALLOUT} />
                 │
                 └─ [Right column] — Utility-First Tailwind
                      ├─ Overline: "Utility-First Tailwind" + caption
                      ├─ UtilityButton.tsx (RSC)
                      │    ├─ <button className={TAILWIND_BTN_CLASSES}> Button </button>
                      │    └─ <CodeCallout classes={TAILWIND_BTN_CLASSES} />
                      ├─ Tailwind Card (inline, CARD_CLASSES const)
                      └─ <CodeCallout classes={CARD_CLASSES} />
```

### Recommended File Structure

```
src/
├── app/
│   └── what-is-tailwind/
│       └── page.tsx          (full rewrite — RSC, imports SemanticButton + UtilityButton)
└── components/
    ├── SemanticButton.tsx    (new — "use client" per D-09)
    ├── UtilityButton.tsx     (new — RSC, no "use client")
    └── ButtonComparison.tsx  (no longer imported — can be deleted or left)
```

### Pattern 1: Single-Source Const (established Phase 2)

Extract the class string as a named const so the element and its `CodeCallout` always match.

```typescript
// Source: src/app/what-is-tailwind/page.tsx (current)
const CARD_CLASSES =
  "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm 3xl:p-10";

// element
<div className={CARD_CLASSES}>…</div>
// callout — identical string, zero drift
<CodeCallout classes={CARD_CLASSES} />
```

[VERIFIED: src/app/what-is-tailwind/page.tsx]

### Pattern 2: Constants from ButtonComparison.tsx (migrate to new components)

These are the verbatim constants that must be preserved exactly:

```typescript
// Source: src/components/ButtonComparison.tsx
const TAILWIND_BTN_CLASSES =
  "bg-cyan-500 dark:bg-cyan-600 text-white font-semibold text-sm 3xl:text-xl px-5 py-3 rounded-lg 3xl:px-8 3xl:py-4";

const BTN_CSS_DEFINITION = `.btn {\n  background-color: #06b6d4;\n  color: white;\n  font-weight: 600;\n  font-size: 0.875rem;\n  padding: 0.75rem 1.25rem;\n  border-radius: 0.5rem;\n}`;
```

`TAILWIND_BTN_CLASSES` moves to `UtilityButton.tsx`. `BTN_CSS_DEFINITION` moves to `SemanticButton.tsx`.
[VERIFIED: src/components/ButtonComparison.tsx]

### Pattern 3: Leaf-Node Client Island (SemanticButton.tsx)

`SemanticButton.tsx` needs `"use client"` because it renders a `<style>` tag for `.btn` CSS. Per D-09 the user explicitly chose to keep the `"use client"` directive even without `useState`.

```typescript
// src/components/SemanticButton.tsx
"use client";
import CodeCallout from "@/components/CodeCallout";

const BTN_CSS_DEFINITION = `…`;

export default function SemanticButton() {
  return (
    <div>
      <style>{`
        .btn { background-color: #06b6d4; color: white; … }
        .dark .btn { background-color: #0891b2; }
      `}</style>
      <button type="button" className="btn">Button</button>
      <div className="mt-4 3xl:mt-8">
        <CodeCallout classes={BTN_CSS_DEFINITION} />
      </div>
    </div>
  );
}
```

[VERIFIED: pattern derived from src/components/ButtonComparison.tsx]

### Pattern 4: Section Spacers (Phase 6 convention)

```typescript
// Source: .planning/phases/06-slide-6-conditional-styling/06-CONTEXT.md D-01
<div className="mt-16 3xl:mt-24" />
```

Used between every major section on the slide. [VERIFIED: Phase 6 CONTEXT.md]

### Pattern 5: Overline Labels (Phase 2 convention)

```typescript
// Source: src/app/what-is-tailwind/page.tsx (current)
<p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base">
  Semantic CSS
</p>
```

[VERIFIED: src/app/what-is-tailwind/page.tsx]

### Pattern 6: Three-Column Grid (Phase 6 convention)

```typescript
// Source: .planning/phases/06-slide-6-conditional-styling/06-CONTEXT.md
<div className="grid grid-cols-3 gap-6 3xl:gap-12">
  …
</div>
```

[VERIFIED: Phase 6 CONTEXT.md code context — "Three-column layout: `grid grid-cols-3 gap-6 3xl:gap-12`"]

### Pattern 7: Multi-Line CodeCallout for CSS Stubs

`CodeCallout` already has `whitespace-pre-wrap` in its class list, so multi-line strings render correctly. The naming card CodeCallout string for S2-04 should use `\n` to separate the three CSS rule stubs:

```typescript
const NAMING_CALLOUT = `.card-header {}\n.card-title {}\n.card-highlighted {}`;
```

[VERIFIED: src/components/CodeCallout.tsx — `whitespace-pre-wrap` present; multi-line pattern established in Phase 4/6]

### Anti-Patterns to Avoid

- **Merging SemanticButton + UtilityButton back into one component:** D-07 locks them as separate files. The side-by-side column ownership is the teaching beat.
- **Adding `useState` toggle to SemanticButton:** D-08 explicitly removes the click-to-reveal. The `.btn` CSS is always visible.
- **Putting the naming card in the right column:** D-13 locks it to the left column. The right column ends with the Tailwind card.
- **Dynamic class string interpolation:** CLAUDE.md prohibits `\`bg-${color}-500\`` patterns. All class strings must be complete static literals.
- **Adding `"use client"` to page.tsx:** CLAUDE.md requires page.tsx to stay RSC.
- **New dark mode mechanism:** Only `dark:` prefix via `@custom-variant dark`. No `prefers-color-scheme`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| CSS class string composition | Template literals with logic | Complete static strings (lookup tables) | Tailwind cannot detect dynamically constructed strings; classes get purged |
| CodeCallout display | Custom `<pre>` or `<code>` wrapper | `<CodeCallout classes={CONST} />` | Established RSC with correct `whitespace-pre-wrap`, dark mode, 3xl: escalation |
| Dark mode switching | `prefers-color-scheme` or JS class toggle | `dark:` prefix via `@custom-variant dark` | Only mechanism in project; ThemeToggle applies `.dark` to `<html>` |
| Conditional classes | String concatenation / ternary interpolation | `cn()` from `src/lib/utils.ts` or lookup-table map | Prevents class conflicts; tailwind-merge resolves conflicts |
| Class drift between element and callout | Duplicated string literals | Single-source `const` pattern | One change point; callout always matches rendered element |

**Key insight:** All problems this phase faces have established project-level solutions. The value is correct application of existing patterns, not solving new problems.

---

## Current `what-is-tailwind/page.tsx` — Complete Inventory

**What exists and must be preserved / migrated:**

| Item | Current Location | Disposition |
|------|-----------------|-------------|
| `CARD_CLASSES` const | `page.tsx` line 5–6 | KEEP — reuse for naming card shell (D-15) and Tailwind card (right column). Same const, same value. |
| `SlideLayout number="02" title="What is Tailwind?"` | `page.tsx` line 10 | KEEP — wrapper stays identical |
| Two-column grid (`grid grid-cols-2 gap-6 3xl:gap-12`) | `page.tsx` line 11 | KEEP for demo section; becomes Section 3 |
| Left column overline "Semantic CSS" | `page.tsx` line 13–15 | KEEP — same class string |
| Left column caption | `page.tsx` line 16–18 | KEEP — "The class name hides the implementation." |
| Right column overline "Utility-First Tailwind" | `page.tsx` line 27–29 | KEEP — same class string |
| Right column caption | `page.tsx` line 30–32 | KEEP — "Every style is visible inline." |
| `<ButtonComparison />` import + usage | `page.tsx` line 3, 21 | REPLACE — remove import, insert `<SemanticButton />` in left column |
| Tailwind card `<div className={CARD_CLASSES}>` | `page.tsx` lines 34–42 | KEEP in right column — now followed by naming card in left column |
| `<CodeCallout classes={CARD_CLASSES} />` | `page.tsx` line 44 | KEEP in right column — already correct |

**What is added:**

| Addition | Section | Location in final layout |
|----------|---------|--------------------------|
| Philosophy intro banner (heading + 1–2 sentences) | Section 1 (top) | Before Section 2 spacer |
| 3-card problem row (`grid grid-cols-3`) | Section 2 | Between intro and demo grid |
| `<SemanticButton />` call | Left column, Section 3 | Replaces `<ButtonComparison />` |
| Naming card + `NAMING_CALLOUT` CodeCallout | Left column, Section 3 | Below `<SemanticButton />`, end of left column |
| `<UtilityButton />` call (in right column header, above card) | Right column, Section 3 | Above existing Tailwind card |
| Section spacers between all 3 sections | Between sections | `mt-16 3xl:mt-24` |

---

## `ButtonComparison.tsx` Migration Map

| Item | Source (ButtonComparison.tsx) | Destination |
|------|-------------------------------|-------------|
| `TAILWIND_BTN_CLASSES` const | Line 5–6 | `UtilityButton.tsx` — verbatim copy |
| `BTN_CSS_DEFINITION` const | Line 8 | `SemanticButton.tsx` — verbatim copy |
| `<style>` block with `.btn` and `.dark .btn` | Lines 15–27 | `SemanticButton.tsx` — verbatim copy |
| `<button className="btn">` | Lines 31–35 | `SemanticButton.tsx` — keep; remove `onClick` per D-08 |
| Conditional `{showCss && <CodeCallout>}` | Lines 38–42 | `SemanticButton.tsx` — always show (remove `useState`, remove condition) |
| `<button className={TAILWIND_BTN_CLASSES}>` | Line 48 | `UtilityButton.tsx` |
| `<CodeCallout classes={TAILWIND_BTN_CLASSES} />` | Lines 49–51 | `UtilityButton.tsx` |
| `useState` import + `showCss` state | Lines 1, 12 | DELETE — not needed in either new component |

---

## 3xl/4xl Escalation Patterns (Phase 7 canonical ratios)

From Phase 7 CONTEXT.md (D-45 established ratios):

| Base class | 3xl: escalation | Use case |
|------------|----------------|---------|
| `text-xs` | `3xl:text-sm` or `3xl:text-base` | Overline labels |
| `text-sm` | `3xl:text-base` or `3xl:text-xl` | Body text, captions |
| `text-base` | `3xl:text-xl` | Card body text |
| `text-lg` / `text-xl` | `3xl:text-2xl` / `3xl:text-3xl` | Card headings |
| `text-2xl` / `text-3xl` | `3xl:text-4xl` / `3xl:text-5xl` | Section headings |
| `gap-6` | `3xl:gap-12` | Grid gaps |
| `p-6` | `3xl:p-10` | Card padding (already in CARD_CLASSES) |
| `mt-4` | `3xl:mt-8` | Internal element spacing |
| `mt-16` | `3xl:mt-24` | Section spacers |

[VERIFIED: src/app/what-is-tailwind/page.tsx — `CARD_CLASSES` has `p-6 3xl:p-10`; Phase 7 CONTEXT.md ratios]

**Philosophy intro heading escalation suggestion (Claude's discretion):** `text-2xl font-bold 3xl:text-4xl` or larger — it's the banner heading that anchors the slide. Should be visually prominent at 1920px but not compete with the `<h1>` title rendered by SlideLayout.

**Problem card heading escalation:** `text-base font-semibold 3xl:text-xl`. Body text: `text-sm 3xl:text-base`.

---

## Dark Mode Checklist for New Elements

Every new element must have a `dark:` counterpart via `@custom-variant dark (&:where(.dark, .dark *))`.

| Element | Light | Dark |
|---------|-------|------|
| Philosophy intro heading | `text-slate-900` | `dark:text-white` |
| Philosophy intro body text | `text-slate-600` | `dark:text-slate-400` |
| Problem card shell | use `CARD_CLASSES` (`bg-white dark:bg-slate-900`) | included in const |
| Problem card heading | `text-slate-900` | `dark:text-white` |
| Problem card body text | `text-slate-600` | `dark:text-slate-400` |
| Naming card shell | use `CARD_CLASSES` | included in const |
| Naming card overline (if any) | `text-cyan-600` | `dark:text-cyan-400` |

`CARD_CLASSES` already contains all dark mode for the card shell — no additional work needed when reusing it.

[VERIFIED: src/app/what-is-tailwind/page.tsx — `CARD_CLASSES` has `dark:bg-slate-900 dark:border-slate-800`]

---

## Common Pitfalls

### Pitfall 1: Naming Card in Wrong Column
**What goes wrong:** Naming card (S2-04) ends up in the right column below the Tailwind card.
**Why it happens:** S2-04 says "below the existing Tailwind card" — easy to misread as "right column."
**How to avoid:** D-13 locks it to the LEFT column. The teaching narrative is "semantic CSS forces you to invent names" — it lives with the semantic story.
**Warning signs:** Right column has two cards stacked; left column ends after SemanticButton.

### Pitfall 2: BTN_CSS_DEFINITION Line Breaks in CodeCallout
**What goes wrong:** The `\n` escapes in `BTN_CSS_DEFINITION` render as literal `\n` text instead of newlines.
**Why it happens:** The string uses JavaScript `\n` but CodeCallout renders in JSX — the `whitespace-pre-wrap` CSS handles actual newlines; `\n` in a JS string literal IS an actual newline character.
**How to avoid:** Confirm the string in ButtonComparison.tsx uses `\n` (backslash-n in a template literal with backticks) — this produces actual newline characters in the string. `whitespace-pre-wrap` then renders them as visual line breaks. No change needed.
**Warning signs:** CSS definition renders as one line in CodeCallout.

### Pitfall 3: CARD_CLASSES Includes 3xl:p-10 — Problem Cards May Not Need It
**What goes wrong:** Reusing `CARD_CLASSES` verbatim for problem cards gives them `3xl:p-10` padding which is correct, but the builder must confirm the 3-card grid fits at 1920px with that padding.
**Why it happens:** `CARD_CLASSES` was designed for a single-card column; three cards at `3xl:p-10` each inside a `max-w-7xl` container may be tight.
**How to avoid:** `max-w-7xl` at 3xl breakpoint is 80rem = 1280px actual content width. Three cards with `gap-12` (3rem × 2 = 6rem) leaves ~(1280 - 96) / 3 = ~395px per card. With `p-10` (2.5rem padding each side = 5rem), inner content = ~315px. This is comfortable for 1–2 lines of text at `text-base 3xl:text-xl`. Use CARD_CLASSES as-is.
**Warning signs:** Problem cards look cramped or text wraps awkwardly at 1920px.

### Pitfall 4: SemanticButton Still Has `useState` Logic
**What goes wrong:** Implementer copies ButtonComparison.tsx and keeps the `showCss` toggle.
**Why it happens:** The original ButtonComparison used `useState` for click-to-reveal; the copy might retain it.
**How to avoid:** D-08 explicitly removes the toggle. Delete `useState`, the `onClick` handler, and the conditional render. The `BTN_CSS_DEFINITION` CodeCallout is always visible.
**Warning signs:** Slide has a clickable button that reveals CSS instead of always showing it.

### Pitfall 5: page.tsx Gains "use client"
**What goes wrong:** Implementer adds `"use client"` to `page.tsx` because it imports `SemanticButton.tsx` which has `"use client"`.
**Why it happens:** Misunderstanding of how RSC client islands work — a RSC page can import a `"use client"` component without becoming a client component itself.
**How to avoid:** CLAUDE.md rule: "Never add `"use client"` to `page.tsx` files." The `"use client"` boundary is at `SemanticButton.tsx`.
**Warning signs:** page.tsx has `"use client"` at top.

### Pitfall 6: UtilityButton Has "use client" Unnecessarily
**What goes wrong:** UtilityButton.tsx gets `"use client"` because SemanticButton.tsx has it.
**Why it happens:** Pattern-matching from SemanticButton without checking necessity.
**How to avoid:** `UtilityButton.tsx` has no state, no browser APIs. It renders a button and a CodeCallout — pure RSC. CLAUDE.md: "RSC by default."
**Warning signs:** UtilityButton.tsx has `"use client"` at top.

---

## Code Examples

### NAMING_CALLOUT const (naming card — S2-04)
```typescript
// Source: REQUIREMENTS.md S2-04, CONTEXT.md D-14
const NAMING_CALLOUT = `.card-header {}\n.card-title {}\n.card-highlighted {}`;
```
The exact class names (`.card-header`, `.card-title`, `.card-highlighted`) are specified in REQUIREMENTS.md S2-04.

### Problem card inner structure
```typescript
// Source: CONTEXT.md D-06
<div className={CARD_CLASSES}>
  <h3 className="text-base font-semibold text-slate-900 dark:text-white 3xl:text-xl">
    Context Switching
  </h3>
  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 3xl:text-base 3xl:mt-3">
    {/* 1–2 tight sentences — Claude's discretion */}
  </p>
</div>
```

### Full page.tsx section assembly (structure sketch)
```typescript
// src/app/what-is-tailwind/page.tsx — RSC, no "use client"
import SlideLayout from "@/components/SlideLayout";
import CodeCallout from "@/components/CodeCallout";
import SemanticButton from "@/components/SemanticButton";
import UtilityButton from "@/components/UtilityButton";

const CARD_CLASSES =
  "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm 3xl:p-10";

const NAMING_CALLOUT = `.card-header {}\n.card-title {}\n.card-highlighted {}`;

export default function WhatIsTailwind() {
  return (
    <SlideLayout number="02" title="What is Tailwind?">
      {/* Section 1: Philosophy intro */}
      <section>…heading + 1–2 sentences…</section>

      {/* Section spacer */}
      <div className="mt-16 3xl:mt-24" />

      {/* Section 2: Problem cards */}
      <section>
        <div className="grid grid-cols-3 gap-6 3xl:gap-12">
          {/* 3 × CARD_CLASSES cards */}
        </div>
      </section>

      {/* Section spacer */}
      <div className="mt-16 3xl:mt-24" />

      {/* Section 3: Two-column demo grid */}
      <div className="grid grid-cols-2 gap-6 3xl:gap-12">
        {/* Left column — Semantic CSS */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base">
            Semantic CSS
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 3xl:text-xl 3xl:mt-4">
            The class name hides the implementation.
          </p>
          <div className="mt-4 3xl:mt-8">
            <SemanticButton />
          </div>
          {/* Naming card — S2-04 */}
          <div className="mt-4 3xl:mt-8">
            <div className={CARD_CLASSES}>…</div>
            <div className="mt-4 3xl:mt-8">
              <CodeCallout classes={NAMING_CALLOUT} />
            </div>
          </div>
        </div>

        {/* Right column — Utility-First Tailwind */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base">
            Utility-First Tailwind
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 3xl:text-xl 3xl:mt-4">
            Every style is visible inline.
          </p>
          <div className="mt-4 3xl:mt-8">
            <UtilityButton />
          </div>
          <div className="mt-4 3xl:mt-8">
            <div className={CARD_CLASSES}>…card content…</div>
            <div className="mt-4 3xl:mt-8">
              <CodeCallout classes={CARD_CLASSES} />
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
```
[VERIFIED: pattern derived from src/app/what-is-tailwind/page.tsx + CONTEXT.md decisions]

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `ButtonComparison.tsx` (single component, both buttons, click-to-reveal toggle) | `SemanticButton.tsx` + `UtilityButton.tsx` (separate components, always-visible callout) | Phase 8 rework | Cleaner column ownership; eliminates `useState`; simplifies SemanticButton |
| Single-column demo (no intro, no problem context) | Four-section page (intro → problem cards → demo → naming card) | Phase 8 rework | Full "why Tailwind" narrative arc on one slide |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `UtilityButton.tsx` can be a pure RSC because it imports `CodeCallout` (RSC) and renders no hooks | Architecture Patterns | None — if it somehow needs client context, add `"use client"`; won't affect page.tsx |
| A2 | The `<style>` tag in `SemanticButton.tsx` is why `"use client"` is kept per D-09 (style injection requires client rendering context) | Code Examples | Low risk — user explicitly chose to keep `"use client"`; reason is secondary |
| A3 | Three problem cards fit comfortably in `max-w-7xl` at 3xl with `CARD_CLASSES` padding | Pitfalls | Mild layout issue; fixable with `3xl:p-8` if too tight |

All three are LOW risk. No high-risk assumptions.

---

## Open Questions

1. **Where does `UtilityButton.tsx` import `CodeCallout` — from `@/components/CodeCallout`?**
   - What we know: `CodeCallout` is at `src/components/CodeCallout.tsx`; imported via `@/components/CodeCallout` in `ButtonComparison.tsx`
   - What's unclear: Nothing — alias is confirmed
   - Recommendation: Use `import CodeCallout from "@/components/CodeCallout"` in both new components

2. **Should `ButtonComparison.tsx` be deleted?**
   - What we know: It will no longer be imported after the rework
   - What's unclear: CONTEXT.md says "Delete or leave; no longer imported anywhere"
   - Recommendation: Plan includes explicit task to remove the import from `page.tsx`. Deletion of the file itself is the planner's call — either leaves the codebase clean or leaves an unused file. Recommend deletion for hygiene; `yarn build` will pass either way.

---

## Environment Availability

Step 2.6: SKIPPED (no external dependencies identified — this is a pure code/component rework using existing installed packages).

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Vitest 3.x + jsdom + @testing-library/react 16 |
| Config file | `vitest.config.mts` |
| Quick run command | `yarn test --run` |
| Full suite command | `yarn test --run && yarn build` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| S2-01 | Philosophy intro renders with "utility-first" text and definition | unit | `yarn test --run` | ❌ Wave 0 — new test file |
| S2-02 | Problem cards grid renders all 3 problem headings (context-switching, naming, CSS bloat) | unit | `yarn test --run` | ❌ Wave 0 — new test file |
| S2-03 | SemanticButton renders `.btn` button and BTN_CSS_DEFINITION CodeCallout (always visible, no toggle) | unit | `yarn test --run` | ❌ Wave 0 — `SemanticButton.test.tsx` |
| S2-03 | UtilityButton renders TAILWIND_BTN_CLASSES button and CodeCallout | unit | `yarn test --run` | ❌ Wave 0 — `UtilityButton.test.tsx` |
| S2-04 | Naming card CodeCallout contains `.card-header {}`, `.card-title {}`, `.card-highlighted {}` | unit | `yarn test --run` | ❌ Wave 0 — part of WhatIsTailwind page test |
| All | yarn build completes clean — no purged classes, no type errors | build | `yarn build` | ✅ (build task always) |

### Sampling Rate

- **Per task commit:** `yarn test --run`
- **Per wave merge:** `yarn test --run && yarn build`
- **Phase gate:** Full suite green before `/gsd-verify-work`

### Wave 0 Gaps

- [ ] `src/test/components/SemanticButton.test.tsx` — covers S2-03 (semantic button always-visible callout; no toggle behavior)
- [ ] `src/test/components/UtilityButton.test.tsx` — covers S2-03 (utility button + TAILWIND_BTN_CLASSES callout)
- [ ] `src/test/app/WhatIsTailwind.test.tsx` (or `WhatIsTailwindPage.test.tsx`) — covers S2-01 (intro text), S2-02 (problem card headings), S2-04 (naming callout content `.card-header {}` etc.)

**Note on test approach:** `SemanticButton.test.tsx` should verify that `BTN_CSS_DEFINITION` text is in the document on initial render (no click required) — this directly validates D-08 (always visible, no toggle). Compare pattern with `ConditionalPanels.test.tsx` which checks initial state text.

---

## Security Domain

This phase has no authentication, session management, data persistence, user input processing, cryptography, or external API calls. It is static presentational content only.

**Security enforcement:** Applicable ASVS categories — V5 Input Validation only as a formality (no user input in this phase). No threats identified. `yarn build` with TypeScript strict mode provides sufficient static analysis.

---

## Sources

### Primary (HIGH confidence)
- `src/app/what-is-tailwind/page.tsx` — current CARD_CLASSES const, two-column grid pattern, overline classes [VERIFIED]
- `src/components/ButtonComparison.tsx` — TAILWIND_BTN_CLASSES, BTN_CSS_DEFINITION, style block, component structure [VERIFIED]
- `src/components/CodeCallout.tsx` — API (single `classes` prop), whitespace-pre-wrap multi-line support [VERIFIED]
- `src/app/globals.css` — @custom-variant dark, @theme breakpoints (3xl=1920px, 4xl=2560px) [VERIFIED]
- `.planning/phases/08-slide-2-rework/08-CONTEXT.md` — all locked decisions D-01 through D-16 [VERIFIED]
- `.planning/phases/06-slide-6-conditional-styling/06-CONTEXT.md` — section spacer pattern `mt-16 3xl:mt-24`, three-column grid `gap-6 3xl:gap-12` [VERIFIED]
- `.planning/phases/07-tv-readability-quality-pass/07-CONTEXT.md` — 3xl: escalation ratios table [VERIFIED]
- `vitest.config.mts`, `src/test/components/` — test infrastructure, existing test patterns [VERIFIED]

### Secondary (MEDIUM confidence)
- `.planning/REQUIREMENTS.md` — S2-01 through S2-04 exact requirement text including `.card-header {}`, `.card-title {}`, `.card-highlighted {}` strings [VERIFIED]

### Tertiary (LOW confidence)
None — all claims verified from codebase.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new dependencies; all from package.json
- Architecture: HIGH — all patterns verified from existing codebase
- Pitfalls: HIGH — derived from actual code review of ButtonComparison.tsx and CONTEXT.md decisions
- Migration map: HIGH — line-by-line from ButtonComparison.tsx source

**Research date:** 2026-05-07
**Valid until:** This is a bounded rework with locked decisions — valid indefinitely unless CONTEXT.md is amended.
