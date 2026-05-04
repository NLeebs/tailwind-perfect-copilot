# Phase 6: Slide 6 — Conditional Styling - Research

**Researched:** 2026-05-04
**Domain:** Tailwind CSS v4 conditional variants (hover, group, peer, data-*), React state + cn(), interactive client islands
**Confidence:** HIGH

---

## Summary

Phase 6 replaces the stub at `src/app/conditional-styling/page.tsx` with a three-section slide demonstrating four conditional-class mechanisms: CSS hover variants, group-hover, React useState + cn(), cn() conflict resolution, peer-invalid form validation, and data-active attribute toggling. The architecture is two "use client" islands (ConditionalPanels, DataActiveDemo) and one pure RSC section (cn() merge + peer-invalid).

The most critical open question — whether `data-active:` works in Tailwind v4 without a `@custom-variant` — is **answered: yes, it works natively**. Tailwind v4 dynamically derives data-attribute variants. `data-active:bg-purple-600` generates `[data-active]` as the CSS selector, and React's `data-active={isActive ? "" : undefined}` pattern correctly adds/removes the attribute. No `@custom-variant data-active` is needed in globals.css.

All four mechanisms (hover, group-hover, peer-invalid, data-active) work with this project's `@custom-variant dark` setup. The `peer-invalid:` variant is fully composable with `dark:` prefix. The `hover:` variant in v4 is wrapped in `@media (hover: hover)` which is the correct behavior for a desktop presentation app — hover works as expected on mouse/trackpad devices.

**Primary recommendation:** Implement exactly as specified in CONTEXT.md. No globals.css additions required. Two islands, one RSC section, single-source const pattern throughout.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Three stacked sections separated by `<div className="mt-16 3xl:mt-24" />` spacers — matching the Phase 3/4/5 pattern.
- **D-02:** Section 1: `grid grid-cols-3` layout with self-contained panels. Each panel vertical stack: overline label → demo card → CodeCallout. Single client island (ConditionalPanels.tsx) wraps all three because the React state panel requires `useState`.
- **D-03:** Panel overline labels: "CSS VARIANTS" / "GROUP VARIANTS" / "REACT STATE" — using `text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400` overline style.
- **D-04:** Each panel's CodeCallout shows only classes specific to that mechanism: Panel 1: `hover:bg-sky-50 dark:hover:bg-slate-700`; Panel 2: `group-hover:scale-105 group-hover:shadow-lg`; Panel 3: cn() call string for active/inactive toggle.
- **D-05:** Section 2 left column: colored swatch showing final merged result (blue wins) + CodeCallout showing `cn('bg-red-500', 'bg-blue-500')` → `'bg-blue-500'` + label "Later class wins — tailwind-merge resolves the conflict".
- **D-06:** Section 2 (cn() merge + peer-invalid) is pure RSC — no client island.
- **D-07:** Email input with `peer` class. Sibling paragraph `invisible peer-invalid:visible text-red-500` — pure RSC, no JavaScript.
- **D-08:** CodeCallout below the form showing both `peer` (on input) and `peer-invalid:visible` (on sibling) as two-line callout.
- **D-09:** DataActiveDemo.tsx: card element whose `data-active` attribute is toggled by React state. Card uses `data-active:bg-purple-600 data-active:text-white`. Right column: CodeCallout showing classes + label about headless UI pattern.
- **D-10:** Attribute toggling: `<div data-active={isActive ? "" : undefined}>` — adds `data-active` when true, removes when false.
- **D-11:** Two client islands: `src/components/ConditionalPanels.tsx` (Section 1) and `src/components/DataActiveDemo.tsx` (Section 3).
- **D-12:** Section 2 is pure RSC.

### Claude's Discretion

- Exact demo card content (placeholder text/icons in the three panels — keep minimal and consistent)
- Exact cn() class strings for the React state panel in S6-01
- `data-active` Tailwind variant syntax — **resolved by research: use `data-active:` directly, no @custom-variant needed**
- Exact `3xl:` escalation values for text, spacing, panel padding, and card sizes
- Border/shadow styling on demo cards in light and dark mode

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| S6-01 | Three-panel comparison: pure CSS hover variants, group-hover, React useState + cn() | Verified: hover:, group-hover:, cn() all work natively in v4. Three-panel grid pattern established. |
| S6-02 | tailwind-merge conflict demo: cn() resolves conflicting classes, state drives class changes | Verified: twMerge('bg-red-500', 'bg-blue-500') === 'bg-blue-500'. Installed tailwind-merge v3.5.0. |
| S6-03 | peer-invalid form validation: email input with peer + sibling with invisible peer-invalid:visible text-red-500 | Verified: peer-invalid works natively in v4, pure CSS (no JS), compatible with class-based dark mode. |
| S6-04 | data-active attribute pattern: React state toggles data-active, Tailwind data-active:bg-purple-600 drives visual change | Verified: data-active: is a native dynamic variant in v4, no @custom-variant needed. D-10 attribute pattern confirmed correct. |
</phase_requirements>

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| CSS hover variant demo | Browser/Client | — | Pure CSS `:hover` pseudo-class — no JS. Rendered in ConditionalPanels island only because co-located with other panels needing state. |
| group-hover demo | Browser/Client | — | CSS group combinator selector — no JS. Same island as above for visual cohesion. |
| React state + cn() toggle | Browser/Client | — | `useState` makes this a client island requirement. |
| cn() merge demo | Frontend Server (RSC) | — | Static display — no interactivity, no state. |
| peer-invalid form validation | Browser/Client (CSS) | Frontend Server (RSC) | Validation is CSS-only via `:invalid` pseudo-class. Markup is static RSC. |
| data-active attribute toggle | Browser/Client | — | `useState` toggles the attribute; `DataActiveDemo.tsx` island. |

---

## Standard Stack

### Core (already installed — no new installs needed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| tailwindcss | 4.2.4 | CSS utility generation, all variants | Already in project |
| tailwind-merge | 3.5.0 | cn() conflict resolution in S6-02 callout | Already in project |
| clsx | 2.1.1 | Conditional class composition via cn() | Already in project |
| react | 19.2.4 | useState for ConditionalPanels + DataActiveDemo | Already in project |
| next | 16.2.3 | App Router RSC pages + page.tsx | Already in project |

**Version verification:** Confirmed via `npm view` on 2026-05-04. [VERIFIED: npm registry]

### No new packages required for Phase 6.

---

## Architecture Patterns

### System Architecture Diagram

```
src/app/conditional-styling/page.tsx  (RSC — no "use client")
  │
  ├── <SlideLayout number="06" title="Conditional Styling">
  │
  ├── Section 1: Three-panel comparison
  │     └── <ConditionalPanels />  ← "use client" island
  │           ├── Panel 1: CSS hover card  (no state, CSS-only)
  │           │     └── <CodeCallout classes={HOVER_CLASSES} />
  │           ├── Panel 2: group-hover card  (no state, CSS-only)
  │           │     └── <CodeCallout classes={GROUP_CLASSES} />
  │           └── Panel 3: React state toggle card  (useState)
  │                 └── <CodeCallout classes={STATE_CALLOUT} />
  │
  ├── <div spacer mt-16 3xl:mt-24 />
  │
  ├── Section 2: cn() merge + peer-invalid  (pure RSC)
  │     ├── Left col: cn() merge swatch + <CodeCallout classes={MERGE_CALLOUT} />
  │     └── Right col: <form> with peer input + sibling + <CodeCallout classes={PEER_CALLOUT} />
  │
  ├── <div spacer mt-16 3xl:mt-24 />
  │
  └── Section 3: data-active toggle
        └── <DataActiveDemo />  ← "use client" island
              ├── Left col: card with data-active attribute (useState)
              │     └── Toggle button
              └── Right col: <CodeCallout classes={DATA_CALLOUT} />
```

### Recommended Project Structure

```
src/
├── app/
│   └── conditional-styling/
│       └── page.tsx          # Replace stub — RSC, no "use client"
└── components/
    ├── ConditionalPanels.tsx  # NEW — "use client" — three-panel Section 1
    └── DataActiveDemo.tsx     # NEW — "use client" — Section 3 data-active toggle
```

### Pattern 1: Native Tailwind v4 Data-Attribute Variant

**What:** `data-active:` generates CSS `[data-active]` selector without any configuration.
**When to use:** When React state should drive visual style via DOM attribute, not className switching (headless UI pattern).

```tsx
// Source: https://tailwindcss.com/blog/tailwindcss-v4 (verified 2026-05-04)
// Source: https://tailwindcss.com/docs/hover-focus-and-other-states

// Setting the attribute — add data-active when true, remove when false
<div
  data-active={isActive ? "" : undefined}
  className="rounded-xl p-6 border border-slate-200 dark:border-slate-700
             data-active:bg-purple-600 data-active:text-white
             data-active:border-purple-600 transition-colors duration-200"
>
  Status: {isActive ? "Active" : "Inactive"}
</div>

// Toggle button
<button
  type="button"
  onClick={() => setIsActive((v) => !v)}
  className="mt-4 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800
             text-sm font-semibold text-slate-700 dark:text-slate-300
             hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
>
  Toggle Active
</button>
```

Generated CSS:
```css
.data-active\:bg-purple-600[data-active] { background-color: #9333ea; }
.data-active\:text-white[data-active]    { color: #ffffff; }
```

### Pattern 2: group-hover Driving Multiple Children

**What:** Parent element has `group` class; children use `group-hover:` to all respond to parent hover simultaneously.
**When to use:** When hovering a card/container should trigger coordinated child style changes — no JS required.

```tsx
// Source: https://tailwindcss.com/docs/hover-focus-and-other-states (verified 2026-05-04)
<div className="group rounded-xl p-6 border border-slate-200 dark:border-slate-700
                bg-white dark:bg-slate-900 transition-colors duration-200
                hover:bg-sky-50 dark:hover:bg-slate-800 cursor-pointer">
  {/* Icon scales on parent hover */}
  <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-700
                  group-hover:scale-105 group-hover:bg-sky-200 dark:group-hover:bg-sky-900
                  transition-transform duration-200 mb-4" />
  {/* Text color shifts on parent hover */}
  <p className="text-sm text-slate-600 dark:text-slate-400
                group-hover:text-sky-700 dark:group-hover:text-sky-300
                transition-colors duration-200">
    Hover the card
  </p>
</div>
```

### Pattern 3: peer-invalid Form Validation (No JavaScript)

**What:** Input carries `peer` class; sibling paragraph uses `peer-invalid:visible`. Browser native email validation triggers `:invalid` pseudo-class, which Tailwind surfaces as `peer-invalid:` on the sibling.
**When to use:** Pure CSS form validation UX — no useState, no event handlers.

```tsx
// Source: https://tailwindcss.com/docs/hover-focus-and-other-states (verified 2026-05-04)
// NOTE: peer element MUST PRECEDE the sibling in DOM order (CSS subsequent-sibling combinator)
<div className="flex flex-col gap-2">
  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 3xl:text-base">
    Email address
  </label>
  <input
    type="email"
    className="peer rounded-lg border border-slate-200 dark:border-slate-700
               bg-white dark:bg-slate-900 px-3 py-2 text-sm
               focus:outline-none focus:ring-2 focus:ring-cyan-500
               3xl:text-base 3xl:px-4 3xl:py-3"
    placeholder="you@example.com"
  />
  {/* Sibling — invisible by default, visible when input is invalid */}
  <p className="invisible peer-invalid:visible text-red-500 text-xs 3xl:text-sm">
    Please enter a valid email address.
  </p>
</div>
```

### Pattern 4: Single-Source Const for CodeCallout

**What:** Extract className strings as named const so the element and its CodeCallout display identical text.
**When to use:** Always — every CodeCallout in this project uses this pattern to prevent drift.

```tsx
// Source: established project pattern (CardBuilder.tsx, ResponsiveDemo.tsx)
const HOVER_CLASSES = "hover:bg-sky-50 dark:hover:bg-slate-700";

// Element uses it:
<div className={`rounded-xl p-6 transition-colors ${HOVER_CLASSES}`}>...</div>

// CodeCallout references same const:
<CodeCallout classes={HOVER_CLASSES} />
```

### Pattern 5: cn() Lookup-Table Map for State Toggle (S6-01 Panel 3)

**What:** Static lookup map keyed by boolean or state value — complete static strings, no dynamic interpolation.
**When to use:** Any component that toggles between visual states based on React state.

```tsx
// Source: established project pattern (CLAUDE.md, CardBuilder.tsx)
const ACTIVE_CLASSES = "bg-blue-500 text-white shadow-md";
const INACTIVE_CLASSES = "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700";

const PANEL3_CARD_CLASSES: Record<"active" | "inactive", string> = {
  active: ACTIVE_CLASSES,
  inactive: INACTIVE_CLASSES,
};

// In component:
<div className={cn("rounded-xl p-6 transition-colors duration-200", PANEL3_CARD_CLASSES[isActive ? "active" : "inactive"])}>
```

### Anti-Patterns to Avoid

- **Dynamic class interpolation:** `\`bg-${color}-500\`` — Tailwind cannot detect these. Use lookup tables. [VERIFIED: CLAUDE.md]
- **`"use client"` on page.tsx:** page.tsx must remain RSC. Client logic lives exclusively in leaf-node island files.
- **`prefers-color-scheme` media query for dark mode:** This project uses `@custom-variant dark` only. Any `dark:prefers-color-scheme` usage is wrong.
- **`data-active` with a @custom-variant:** NOT needed in v4. `data-active:` works natively. Adding a @custom-variant for `data-active` would be redundant.
- **peer after the form input in DOM:** The `peer` element must come BEFORE its sibling in DOM order (CSS subsequent-sibling combinator). Placing the peer element after the paragraph it controls will silently break the validation styling.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Class conflict resolution | Custom merge logic | `cn()` (clsx + tailwind-merge) | tailwind-merge understands Tailwind's class hierarchy — custom logic misses edge cases like `bg-opacity` interaction |
| Conditional classes | String concatenation with ternary | `cn()` with lookup-table map | String concat produces duplicate/conflicting classes; cn() deduplicates |
| Data attribute variant | `@custom-variant data-active` | Native `data-active:` | Tailwind v4 derives these dynamically — configuration is redundant and creates maintenance burden |
| Form validation messaging | `useState` + onChange handler | `peer` + `peer-invalid:` | CSS-only solution is more robust, has zero JS overhead, and is the teaching point of S6-03 |

---

## Verified Tailwind v4 Variant Behavior

### Key Questions — All Answered

**Q1: Does `data-active:` work without `@custom-variant`?**
**A: YES.** Tailwind v4 dynamically derives data-attribute variants. `data-active:bg-purple-600` generates:
```css
.data-active\:bg-purple-600[data-active] { background-color: #9333ea; }
```
No `@custom-variant` needed. No globals.css change required. [VERIFIED: tailwindcss.com/blog/tailwindcss-v4]

**Q2: Does `group-hover:` work the same in v4 as v3?**
**A: YES.** No breaking changes to `group-hover:`. Syntax unchanged. Named groups (`group/name`, `group-hover/name`) are available but not needed here. [VERIFIED: tailwindcss.com/docs/hover-focus-and-other-states]

**Q3: Does `peer-invalid:` work with the class-based dark mode in this project?**
**A: YES.** `peer-invalid:` is fully composable with `dark:`. The `@custom-variant dark` approach does not interfere. `peer` element must precede the sibling in DOM order. [VERIFIED: tailwindcss.com/docs/hover-focus-and-other-states]

**Q4: What is the v4 change to `hover:`?**
**A: Minor.** v4 wraps `hover:` in `@media (hover: hover)`. This is FINE for a desktop presentation app — hover works exactly as expected on mouse/trackpad. Touch-tap no longer triggers hover, which is the correct behavior. [VERIFIED: tailwindcss.com/docs/upgrade-guide]

**Q5: Does `data-active={isActive ? "" : undefined}` correctly add/remove the attribute in React?**
**A: YES.** React omits the attribute when value is `undefined`, and adds `data-active=""` when value is `""`. This matches the CSS `[data-active]` selector which checks for attribute presence regardless of value. [ASSUMED — standard React attribute behavior, consistent with D-10 in CONTEXT.md]

---

## 3xl: Escalation Values (Consistent with Prior Slides)

Derived from reading SlideLayout.tsx, CardBuilder.tsx, ResponsiveDemo.tsx, and customizing-tailwind/page.tsx. [VERIFIED: codebase]

| Element Type | Base | 3xl: |
|--------------|------|------|
| Overline label | `text-xs` | `3xl:text-base` |
| Body/description text | `text-sm` | `3xl:text-xl` |
| Section spacer | `mt-16` | `3xl:mt-24` |
| Grid gap (2-col) | `gap-6` | `3xl:gap-12` |
| Grid gap (3-col) | `gap-6` | `3xl:gap-8` |
| Card padding | `p-6` | `3xl:p-8` or `3xl:p-10` |
| Button padding | `px-4 py-2` | `3xl:px-6 3xl:py-3` |
| Button text | `text-sm` | `3xl:text-lg` |
| mt below overline | `mt-8` | `3xl:mt-12` |
| CodeCallout (built-in) | `text-[13px]` | `3xl:text-base` (in component) |

---

## Common Pitfalls

### Pitfall 1: peer Element After Its Sibling
**What goes wrong:** The error message paragraph appears even when the email input is valid (or never appears).
**Why it happens:** CSS's subsequent-sibling combinator (`.peer-invalid ~ .sibling`) only matches elements that come AFTER the peer in the DOM. If the `<p>` comes before the `<input>`, the selector cannot target it.
**How to avoid:** Always place the `peer`-marked element before its sibling in JSX. For the email form: `<input class="peer" />` then `<p class="peer-invalid:visible">`.
**Warning signs:** Error message visible immediately on page load (or never visible regardless of input).

### Pitfall 2: Dynamic Class Interpolation Breaking Tailwind Purge
**What goes wrong:** Classes like `bg-${color}-500` are absent from the production build — the card appears unstyled.
**Why it happens:** Tailwind's scanner extracts class strings statically. Dynamically constructed strings are invisible to the scanner.
**How to avoid:** Use complete static strings in lookup-table maps. For Panel 3's toggle: define `ACTIVE_CLASSES` and `INACTIVE_CLASSES` as complete static strings. [VERIFIED: CLAUDE.md]
**Warning signs:** Classes work in `yarn dev` but break after `yarn build`.

### Pitfall 3: Adding "use client" to page.tsx
**What goes wrong:** The RSC page becomes a client component, losing streaming and causing unnecessary bundle bloat.
**Why it happens:** Reaching for state in a page file instead of extracting an island.
**How to avoid:** `page.tsx` stays RSC — always. Islands are imported from separate files with their own `"use client"` directive.
**Warning signs:** `"use client"` at the top of `src/app/conditional-styling/page.tsx`.

### Pitfall 4: Adding @custom-variant data-active to globals.css
**What goes wrong:** Redundant configuration; confusion if someone sees both native `data-active:` usage AND a custom variant for it.
**Why it happens:** Uncertainty about v4 data-attribute variant support (now resolved: it's native).
**How to avoid:** Do not modify globals.css for this phase. `data-active:` works out of the box.
**Warning signs:** A `@custom-variant data-active` line appearing in globals.css.

### Pitfall 5: slide-pages.test.tsx stub list not updated
**What goes wrong:** After implementation, the test still expects "Content coming soon" placeholder for slide 06 (fails with "found unexpected text").
**Why it happens:** `stubCases` in `slide-pages.test.tsx` currently includes `"06"` — this must be removed once the slide is implemented.
**How to avoid:** Remove `"06"` from the `stubCases` filter array in `src/test/app/slide-pages.test.tsx` as part of implementation.
**Warning signs:** Test failure: `${title} shows the content coming soon placeholder`.

### Pitfall 6: hover: Variant Not Triggering in jsdom Tests
**What goes wrong:** Tests that try to verify hover state changes will fail in jsdom — jsdom doesn't fire `:hover` pseudo-class.
**Why it happens:** jsdom is a headless environment without a real rendering engine.
**How to avoid:** Don't test hover state transitions in unit tests. Test rendered class strings and structure instead. Visual hover behavior is verified manually in browser.

---

## Code Examples

### ConditionalPanels.tsx Island Skeleton

```tsx
// Source: project patterns — CardBuilder.tsx, ResponsiveDemo.tsx (verified via codebase read)
"use client";
import { useState } from "react";
import CodeCallout from "@/components/CodeCallout";
import { cn } from "@/lib/utils";

// Single-source consts — element and CodeCallout use the same string
const HOVER_CLASSES = "hover:bg-sky-50 dark:hover:bg-slate-700";
const GROUP_CLASSES = "group-hover:scale-105 group-hover:shadow-lg";

// Lookup-table map — complete static strings, no interpolation
const PANEL3_CLASSES: Record<"active" | "inactive", string> = {
  active:   "bg-blue-500 text-white shadow-md",
  inactive: "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700",
};

// CodeCallout string for Panel 3 (shown to audience; reflects cn() usage)
const STATE_CALLOUT = "cn('rounded-xl p-6 transition-colors',\n  isActive && 'bg-blue-500 text-white')";

export default function ConditionalPanels() {
  const [isActive, setIsActive] = useState(false);
  // ... render three-panel grid
}
```

### DataActiveDemo.tsx Island Skeleton

```tsx
// Source: D-09/D-10 from CONTEXT.md + tailwindcss.com/blog/tailwindcss-v4 verified pattern
"use client";
import { useState } from "react";
import CodeCallout from "@/components/CodeCallout";

const DATA_CALLOUT = "data-active:bg-purple-600\ndata-active:text-white";

export default function DataActiveDemo() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="grid grid-cols-2 gap-6 3xl:gap-12">
      {/* Left: card with data-active attribute */}
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base mb-4">
          DATA ATTRIBUTE
        </p>
        <div
          data-active={isActive ? "" : undefined}
          className="rounded-xl p-6 3xl:p-8 border border-slate-200 dark:border-slate-700
                     bg-white dark:bg-slate-900
                     data-active:bg-purple-600 data-active:text-white
                     data-active:border-purple-600 transition-colors duration-200"
        >
          <p className="font-semibold text-slate-900 dark:text-white data-active:text-white">
            Status: {isActive ? "Active" : "Inactive"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsActive((v) => !v)}
          className="mt-4 px-4 py-2 3xl:px-6 3xl:py-3 rounded-lg bg-slate-100 dark:bg-slate-800
                     text-sm 3xl:text-base font-semibold text-slate-700 dark:text-slate-300
                     hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          Toggle Active
        </button>
      </div>
      {/* Right: CodeCallout */}
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base mb-4">
          CLASSES
        </p>
        <CodeCallout classes={DATA_CALLOUT} />
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 3xl:text-lg">
          Headless UI libraries (Radix, Headless UI) use data-* attributes
          to drive styles without class toggling.
        </p>
      </div>
    </div>
  );
}
```

### Section 2 RSC (cn() merge + peer-invalid) Skeleton

```tsx
// Source: tailwindcss.com/docs/hover-focus-and-other-states (peer-invalid pattern)
// Section in page.tsx — pure RSC, no "use client"
const MERGE_CALLOUT = "cn('bg-red-500', 'bg-blue-500')\n→ 'bg-blue-500'";
const PEER_CALLOUT  = "peer\npeer-invalid:visible text-red-500";

// cn() merge demo (left col)
<div>
  <div className="h-16 3xl:h-24 w-full rounded-xl bg-blue-500" />
  <div className="mt-3">
    <CodeCallout classes={MERGE_CALLOUT} />
  </div>
  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 3xl:text-lg">
    tailwind-merge resolves conflicting utility classes — the last applicable class wins.
  </p>
</div>

// peer-invalid form (right col)
<div>
  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 3xl:text-base block mb-2">
    Email address
  </label>
  <input
    type="email"
    className="peer w-full rounded-lg border border-slate-200 dark:border-slate-700
               bg-white dark:bg-slate-900 px-3 py-2 text-sm 3xl:text-base
               focus:outline-none focus:ring-2 focus:ring-cyan-500"
    placeholder="you@example.com"
  />
  <p className="invisible peer-invalid:visible text-red-500 text-xs 3xl:text-sm mt-1">
    Please enter a valid email address.
  </p>
  <div className="mt-3">
    <CodeCallout classes={PEER_CALLOUT} />
  </div>
</div>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Define data variants in tailwind.config.js | Native `data-*:` variants, zero config | Tailwind v4.0 | No config needed — `data-active:`, `data-state:`, etc. work out of the box |
| `hover:` applies on touch tap | `hover:` wrapped in `@media (hover: hover)` | Tailwind v4.0 | Touch devices no longer trigger hover styles on tap |
| `group-hover:` stacking order right-to-left | Left-to-right stacking | Tailwind v4.0 | Affects complex variant stacks; basic `group-hover:` unaffected |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `data-active={isActive ? "" : undefined}` correctly adds/removes the DOM attribute in React 19 | Pattern 1 code example | If React changed attribute handling, data-active:* classes would never trigger. Low risk — this is documented React behavior. |
| A2 | `peer-invalid:` fires when `type="email"` input contains text that is not a valid email | Pattern 3 code example | If browser native email validation doesn't fire `:invalid` in expected cases, peer-invalid won't show. This is standard HTML5 behavior. Low risk. |

---

## Open Questions

1. **Test update scope for slide-pages.test.tsx**
   - What we know: The test file has `"06"` in the `stubCases` filter, causing a "content coming soon" assertion for the stub.
   - What's unclear: Should new ConditionalStyling-specific test assertions (e.g., "CSS VARIANTS" panel heading, "Toggle Active" button) be added in the same PR, or deferred to Phase 7 QA?
   - Recommendation: Add ConditionalStyling content assertions in a new `describe("Conditional Styling content")` block in `slide-pages.test.tsx`, mirroring the `describe("Customizing Tailwind content")` pattern. Remove `"06"` from stubCases.

2. **data-active: text color inheritance within the card**
   - What we know: `data-active:text-white` on the card container sets text color at the container level.
   - What's unclear: Will nested `<p>` elements inside the card inherit this text color, or do they need their own `data-active:text-white`?
   - Recommendation: Test both approaches during implementation. If nesting doesn't inherit, apply `data-active:text-white` to individual text elements, or avoid nested color overrides.

---

## Environment Availability

Step 2.6: SKIPPED — This phase adds no external dependencies. All required packages (tailwindcss, tailwind-merge, clsx, react, next) are already installed and verified.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Vitest 3.2.4 + Testing Library React 16 |
| Config file | `vitest.config.mts` |
| Quick run command | `yarn test` |
| Full suite command | `yarn test` (same — no separate slow suite) |
| Build verification | `yarn build` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| S6-01 | ConditionalPanels renders panel overline labels (CSS VARIANTS, GROUP VARIANTS, REACT STATE) | unit | `yarn test --reporter=verbose` | ❌ Wave 0 gap |
| S6-01 | Panel 3 "Toggle" button changes card state | unit | `yarn test --reporter=verbose` | ❌ Wave 0 gap |
| S6-01 | CodeCallout renders hover/group/state class strings | unit | `yarn test --reporter=verbose` | ❌ Wave 0 gap |
| S6-02 | cn() merge swatch section renders (blue swatch visible, merge callout present) | unit | `yarn test --reporter=verbose` | ❌ Wave 0 gap |
| S6-03 | peer-invalid form renders input and error message element | unit | `yarn test --reporter=verbose` | ❌ Wave 0 gap |
| S6-04 | DataActiveDemo renders card and "Toggle Active" button | unit | `yarn test --reporter=verbose` | ❌ Wave 0 gap |
| S6-04 | Clicking Toggle Active button toggles data-active attribute | unit | `yarn test --reporter=verbose` | ❌ Wave 0 gap |
| S6-01–S6-04 | Slide page renders number "06" and heading "Conditional Styling" | unit | `yarn test` | ✅ slide-pages.test.tsx |
| All | No Tailwind classes purged in production | build smoke | `yarn build` | ✅ (existing CI pattern) |

**Important test update required:** `slide-pages.test.tsx` line 23 currently lists `"06"` in `stubCases`. This filter must be updated to remove `"06"` once the stub is replaced. If not removed, the test will FAIL after implementation because "Content coming soon" will no longer be in the DOM.

### Sampling Rate

- **Per task commit:** `yarn test` — verify 61+ tests pass, no regressions
- **Per wave merge:** `yarn test && yarn build` — full test suite + production build verification
- **Phase gate:** `yarn test` green + `yarn build` succeeds before `/gsd-verify-work`

### Wave 0 Gaps

- [ ] `src/test/components/ConditionalPanels.test.tsx` — covers S6-01 (panel rendering, state toggle)
- [ ] `src/test/components/DataActiveDemo.test.tsx` — covers S6-04 (renders, toggle button, data-active attribute)
- [ ] `src/test/app/slide-pages.test.tsx` update — remove `"06"` from stubCases, add `describe("Conditional Styling content")` assertions (S6-01 through S6-04)
- [ ] No new conftest/setup needed — existing `src/test/setup.ts` covers all islands

---

## Project Constraints (from CLAUDE.md)

| Directive | Enforcement |
|-----------|-------------|
| No dynamic class interpolation (`\`bg-${color}-500\``) | Use lookup-table maps with complete static strings throughout |
| Dark mode via `@custom-variant dark` ONLY | Never add `prefers-color-scheme`. All `dark:` prefixes work via `.dark` class on `<html>` |
| Config in `src/app/globals.css` via `@theme` — no `tailwind.config.js` | No changes to tailwind.config.js (it doesn't exist) |
| Must include `3xl:` escalations on all text and spacing (3xl = 1920px) | See 3xl: escalation table above |
| `"use client"` only on leaf-node island files, never on `page.tsx` | ConditionalPanels.tsx and DataActiveDemo.tsx carry `"use client"`, page.tsx does not |
| Single-source const pattern — class strings as named consts | HOVER_CLASSES, GROUP_CLASSES, DATA_CALLOUT, etc. — same const used by element and CodeCallout |
| Run `yarn build` after completing the slide | Verifies no Tailwind classes are purged in production |
| No new routes in this phase | Only modifying `src/app/conditional-styling/page.tsx` and adding two components |

---

## Sources

### Primary (HIGH confidence)
- `https://tailwindcss.com/docs/hover-focus-and-other-states` — group-hover, peer-invalid, data-* variant syntax, full code examples
- `https://tailwindcss.com/blog/tailwindcss-v4` — v4 data-attribute variant changes (zero config, dynamic derivation)
- `https://tailwindcss.com/docs/upgrade-guide` — hover: media query wrapping change, variant stacking order change
- Codebase reads: `src/app/globals.css`, `src/components/CardBuilder.tsx`, `src/components/ResponsiveDemo.tsx`, `src/app/customizing-tailwind/page.tsx`, `src/components/SlideLayout.tsx`, `src/test/app/slide-pages.test.tsx` — established patterns

### Secondary (MEDIUM confidence)
- `npm view tailwindcss version`, `npm view tailwind-merge version`, `npm view clsx version` — verified installed package versions
- `node -e "twMerge('bg-red-500', 'bg-blue-500')"` — VERIFIED live: returns `'bg-blue-500'`
- `yarn test` — VERIFIED: 61/61 tests pass as of 2026-05-04 baseline

### Tertiary (LOW confidence — none)
All critical claims in this research were verified or cited.

---

## Metadata

**Confidence breakdown:**
- Tailwind v4 variant behavior: HIGH — verified against official tailwindcss.com docs
- data-active: syntax: HIGH — verified native v4 support, code example in official blog
- peer-invalid behavior: HIGH — verified in official docs, DOM order requirement confirmed
- group-hover behavior: HIGH — verified in official docs, no breaking changes
- 3xl: escalation values: HIGH — verified against multiple existing project components
- cn() / tailwind-merge behavior: HIGH — verified via live node execution

**Research date:** 2026-05-04
**Valid until:** 2026-06-04 (Tailwind v4 stable; 30-day horizon)
