# Phase 1: Shared Infrastructure - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-29
**Phase:** 1-Shared Infrastructure
**Areas discussed:** CodeCallout appearance, CodeCallout API, Package install scope

---

## CodeCallout Appearance

### Q1: What should CodeCallout look like?

| Option | Description | Selected |
|--------|-------------|----------|
| Monospace chip | Small pill/badge with monospace font, muted background (slate-800 dark, slate-100 light) | ✓ |
| Highlighted code block | Larger block with syntax tinting, clear separation from demo | |
| Inline label + value | "Classes:" label followed by class string in `<code>` style | |

**User's choice:** Monospace chip  
**Notes:** Minimal visual noise preferred. Preview that resonated: `[ bg-sky-500 rounded-lg px-4 py-2 ]`

---

### Q2: Where does the chip sit relative to the demo element?

| Option | Description | Selected |
|--------|-------------|----------|
| Below the demo | Renders beneath demo element — natural reading flow | ✓ |
| Beside the demo (right) | Floats to the right — saves vertical space | |
| Slide decides layout | Component renders chip only; slides control position | |

**User's choice:** Below the demo  
**Notes:** Component handles placement; slides use normal flex/grid for overall layout.

---

### Q3: Single line or wrap?

| Option | Description | Selected |
|--------|-------------|----------|
| One line, truncate if long | Single row, cleaner but may cut off long strings | |
| Wrap to multiple lines | Classes wrap within the chip box — always shows everything | ✓ |
| One class per line (stacked) | Each class on its own line, list-style | |

**User's choice:** Wrap to multiple lines  
**Notes:** Critical for Slide 2 "class soup is documentation" demo — must show full class lists.

---

### Q4: Label or no label?

| Option | Description | Selected |
|--------|-------------|----------|
| Raw class string only | Just the classes — no prefix or extra text | ✓ |
| Optional label prop | Small label above classes when passed | |
| Always a label | Required label on every callout | |

**User's choice:** Raw class string only  
**Notes:** No extra visual noise.

---

## CodeCallout API

### Q1: Primary prop shape?

| Option | Description | Selected |
|--------|-------------|----------|
| Single string prop | `<CodeCallout classes="..." />` | ✓ |
| children (JSX string) | `<CodeCallout>...</CodeCallout>` | |
| Array of class groups | `classes={["bg-sky-500", "rounded-lg"]}` | |

**User's choice:** Single string prop — `classes="..."`  
**Notes:** Named `classes` (not `className`) to avoid confusion with the element's own `className`.

---

### Q2: Should CodeCallout enforce the single-source pattern?

| Option | Description | Selected |
|--------|-------------|----------|
| Document the pattern only | Convention in CLAUDE.md; not enforced by component | ✓ |
| Accept a ref or variable only | Structurally enforce — CodeCallout takes a const, not a literal | |

**User's choice:** Document the pattern only  
**Notes:** Convention over enforcement. CLAUDE.md is the authority.

---

### Q3: Additional props?

| Option | Description | Selected |
|--------|-------------|----------|
| No extra props | Fixed appearance — consistent across all slides | ✓ |
| className prop for layout overrides | Optional className for margin/width/alignment adjustments | |
| Size variant | sm/md/lg variants | |

**User's choice:** No extra props  
**Notes:** Intentionally rigid. All slides use the same visual language.

---

## Package Install Scope

### Q1: When to install packages?

| Option | Description | Selected |
|--------|-------------|----------|
| All now in Phase 1 | Install shiki, shiki-magic-move, motion, clsx, tailwind-merge upfront | ✓ |
| Phase 1 needs only | Install clsx + tailwind-merge now; add others later | |
| You decide | Claude uses best judgement | |

**User's choice:** All now in Phase 1  
**Notes:** Single package.json update; later phases can use packages immediately.

---

### Q2: Include shiki-magic-move despite v2 deferral?

| Option | Description | Selected |
|--------|-------------|----------|
| Skip shiki-magic-move | It's deferred to v2 — install only what's v1-relevant | |
| Install it anyway | Pre-install for completeness — deferred doesn't mean never | ✓ |

**User's choice:** Install it anyway  
**Notes:** Small cost; avoids a future install step if it gets promoted to v1.

---

## Claude's Discretion

- Exact chip styling values: specific slate shade, padding, border-radius, font-size — Claude picks TV-legible defaults consistent with the existing design system
- File structure for `src/lib/` — create directory and `utils.ts` as needed

## Deferred Ideas

None — discussion stayed within phase scope.
