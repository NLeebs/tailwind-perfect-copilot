# Architecture Research

**Domain:** Interactive developer presentation app (Next.js + Tailwind v4 slide deck)
**Researched:** 2026-04-28
**Confidence:** HIGH — all decisions grounded in the existing codebase plus verified patterns

---

## Standard Architecture

### System Overview

The existing architecture is a flat RSC page-per-slide model. The 5 remaining slides extend this
model uniformly — no new structural layers are needed. Each new slide follows the same
page → SlideLayout → [static content + client island(s)] pattern established by history-of-css.

```
src/app/<slug>/page.tsx          (RSC — no "use client")
    │
    └── <SlideLayout number title>
            │
            ├── [static JSX sections]     ← prose, callouts, labels (RSC, zero JS)
            │
            └── <SlideDemoName />         ← "use client" island, co-located in src/components/
                    │
                    └── [interactive state, browser APIs, event handlers]
```

The client island is always a **named export from `src/components/`**, never defined inline in
the page file. This keeps the RSC page file readable (audience scans the page and sees the
structure immediately) and keeps the interactive component testable in isolation.

### Component Responsibilities

| Layer | Component | Responsibility |
|-------|-----------|----------------|
| Page (RSC) | `src/app/<slug>/page.tsx` | Compose static prose + import demo island; zero logic |
| Shared layout | `SlideLayout` | Chrome (nav bar, h1, content area); unchanged |
| Callout (RSC) | `CodeCallout` | Render inline highlighted Tailwind class string(s) |
| Demo island | `<SlideName>Demo` in `src/components/` | All interactivity, state, browser APIs |
| Breakpoint preview | `ViewportPreview` (RSC shell + client resize handle) | Constrained container simulating viewport widths |

---

## Recommended Project Structure

```
src/
├── app/
│   ├── what-is-tailwind/
│   │   └── page.tsx               # RSC: prose + UtilityPhilosophyDemo
│   ├── utility-classes/
│   │   └── page.tsx               # RSC: prose + UtilityClassesDemo
│   ├── responsiveness-dark-mode/
│   │   └── page.tsx               # RSC: prose + ViewportPreview + DarkModeToggleDemo
│   ├── customizing-tailwind/
│   │   └── page.tsx               # RSC: prose + ThemeTokenDemo + AnimationDemo
│   ├── conditional-styling/
│   │   └── page.tsx               # RSC: prose + ConditionalStylingDemo
│   └── globals.css                # Tailwind v4 config (unchanged)
│
└── components/
    ├── SlideLayout.tsx             # Unchanged
    ├── CodeCallout.tsx             # NEW: inline class callout (RSC)
    ├── WhatIsTailwindDemo.tsx      # NEW: "use client" — before/after toggle
    ├── UtilityClassesDemo.tsx      # NEW: "use client" — interactive class explorer
    ├── ViewportPreview.tsx         # NEW: "use client" — constrained breakpoint preview
    ├── CustomizingTailwindDemo.tsx # NEW: "use client" — token editor / live preview
    ├── ConditionalStylingDemo.tsx  # NEW: "use client" — state-driven Tailwind demo
    ├── CssTimeline.tsx             # Existing
    ├── NavCard.tsx                 # Existing
    ├── ThemeToggle.tsx             # Existing
    └── icons/
        ├── SunIcon.tsx
        └── MoonIcon.tsx
```

### Structure Rationale

- **One demo component per slide:** Each slide's interactive portion lives in a single
  `src/components/<SlideName>Demo.tsx`. This matches the CssTimeline precedent and keeps the
  components directory scannable.
- **No `src/app/<slug>/components/` subdirectories:** Co-located page-level component folders
  would obscure the "one shared component layer" model that teaches the architecture by example.
  Audience members cloning the repo should find all demo components in one place.
- **`CodeCallout.tsx` in shared components, not inlined:** Multiple slides use code callouts.
  A single component ensures consistent visual style across all slides.

---

## Architectural Patterns

### Pattern 1: RSC Page as Compositor

**What:** The page file (`page.tsx`) contains only static JSX sections (headings, prose
paragraphs, section labels) and imports for demo components. It has no logic, no state, no hooks.

**When to use:** Every slide page. This is the only pattern.

**Trade-offs:** The page is instantly readable as an outline of the slide. Demo components are
separately importable and testable. The cost is one additional file per interactive demo.

**Example:**
```tsx
// src/app/conditional-styling/page.tsx
import SlideLayout from "@/components/SlideLayout";
import ConditionalStylingDemo from "@/components/ConditionalStylingDemo";

export default function ConditionalStyling() {
  return (
    <SlideLayout number="06" title="Conditional Styling">
      <p className="text-slate-600 dark:text-slate-400 mb-12 text-lg 3xl:text-2xl">
        Tailwind makes state-driven styling explicit — class strings encode logic.
      </p>
      <ConditionalStylingDemo />
    </SlideLayout>
  );
}
```

---

### Pattern 2: CodeCallout — Inline Class Annotation

**What:** A small RSC component that renders a styled inline code span showing the key Tailwind
class(es) that produce an adjacent visual effect. Lives next to (not inside) the demo output.

**When to use:** Every demo section that produces a visual result. Renders on the server —
no JS shipped.

**Trade-offs:** Completely static and zero-cost. The constraint is that it only shows the classes
the author decides to highlight — it is a deliberate callout, not a full code dump.

**Implementation choice:** Do NOT use Shiki for simple inline class callouts. Shiki is
appropriate for multi-line code blocks (e.g., a full component). For 1–4 Tailwind class tokens
adjacent to a rendered demo, a styled `<code>` span with `font-mono`, a muted background, and
cyan accent for the class name is sufficient and far lighter.

Shiki IS the right choice for any section that shows a full component snippet (e.g., the
`globals.css` block on the Customizing Tailwind slide). Use `codeToHtml` in an async RSC,
render via `dangerouslySetInnerHTML`. Zero client JS.

**Example — simple callout (no Shiki):**
```tsx
// src/components/CodeCallout.tsx
interface CodeCalloutProps {
  classes: string[];      // e.g. ["flex", "gap-4", "items-center"]
  label?: string;         // e.g. "layout"
}

export default function CodeCallout({ classes, label }: CodeCalloutProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mt-3 3xl:mt-5">
      {label && (
        <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase 3xl:text-sm">
          {label}
        </span>
      )}
      {classes.map((cls) => (
        <code
          key={cls}
          className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400
                     text-sm font-mono 3xl:text-base 3xl:px-3"
        >
          {cls}
        </code>
      ))}
    </div>
  );
}
```

Usage adjacent to a rendered demo block:
```tsx
<div className="flex gap-4 items-center p-6 bg-white dark:bg-slate-800 rounded-xl">
  <div className="w-10 h-10 rounded-full bg-cyan-500" />
  <span className="font-medium">Avatar card</span>
</div>
<CodeCallout classes={["flex", "gap-4", "items-center"]} label="layout" />
```

---

### Pattern 3: "use client" Demo Island Inside RSC Slide

**What:** The demo component is marked `"use client"` and imported into the RSC page as a
leaf node. The RSC page passes no props beyond what is serializable (strings, numbers). The
island owns all its own state internally.

**When to use:** Any demo that requires `useState`, event handlers, browser APIs
(`localStorage`, `ResizeObserver`, `MutationObserver`), or animated transitions triggered
by user interaction.

**Trade-offs:** The RSC boundary is explicit and intentional — audience members reading the
page file see the boundary immediately. The island is hydrated independently. Keeping islands
as leaf nodes (not wrapping large static subtrees) is the correct RSC pattern.

**Key rule:** Never import a server component inside a "use client" component. All static
context that a demo island needs should be passed as props from the RSC page or defined as
constants inside the island itself.

**Example pattern (existing CssTimeline is the template):**
```tsx
// src/components/ConditionalStylingDemo.tsx
"use client";
import { useState } from "react";

export default function ConditionalStylingDemo() {
  const [active, setActive] = useState(false);

  return (
    <div className="space-y-6">
      <button
        onClick={() => setActive((v) => !v)}
        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200
          ${active
            ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
            : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
          }`}
      >
        {active ? "Active" : "Inactive"}
      </button>
      {/* CodeCallout lives in the RSC page above this island, not inside it */}
    </div>
  );
}
```

---

### Pattern 4: Responsive Demo — Constrained Container (not iframe)

**What:** A `"use client"` component that renders a resizable constrained `<div>` at a
controlled CSS width (not the true browser viewport). Preset buttons select common breakpoint
widths (320px mobile, 768px tablet, 1280px desktop). The content inside is the demo itself,
rendered inside the container at its constrained width. No iframe needed.

**When to use:** Slide 04 — Responsiveness & Dark Mode. Demonstrates `sm:`, `md:`, `lg:`
prefixes by letting the presenter click between widths.

**Why not iframe:** An iframe creates a full browsing context with its own document, style
sheets, and base URL. For a single self-contained demo component, it is unnecessary complexity.
A constrained `<div>` with `overflow-hidden` and a controlled `width` style achieves the same
teaching effect with zero additional infrastructure.

**Why not live browser resize:** The app is displayed on a large TV at 1080p–4K. Resizing the
browser window during a live talk is awkward and unpredictable. A button-driven preset model
gives the presenter full control and makes the active breakpoint visually obvious.

**Trade-offs:** The constrained container does not simulate the real browser viewport for
media queries — Tailwind's breakpoint utilities respond to the *viewport*, not the container.
To make a constrained container demo actually trigger `sm:`/`md:` breakpoints without a real
viewport resize, you have two options:

1. **Container Queries approach (recommended):** Define the demo's responsive behavior using
   Tailwind v4's `@container` / `@responsive` annotations so it responds to the container
   width rather than the viewport. This is exactly what the slide should teach — the distinction
   between viewport queries and container queries.

2. **Inline style + `data-` attribute simulation:** For purely teaching breakpoints (not live
   responsive behavior), render static side-by-side "cards" showing the layout at each
   breakpoint — no resize needed, fully static RSC.

For Slide 04, **option 2 is simpler and more TV-legible**: show three static columns (mobile /
tablet / desktop layout) with CodeCallout annotations labeling which `sm:`/`md:` class is active
at each width. Add a single client-side toggle to switch between the "before" (no responsive
classes) and "after" (with responsive prefixes) state to dramatize the difference.

---

### Pattern 5: Slide Data Constants — Co-located with Component

**What:** Static data that drives a demo (e.g., an array of utility class examples to display,
a list of theme tokens to show) is defined as a `const` at the top of the component file, not
extracted into a separate `data/` file.

**When to use:** All slide-specific demo data. The CssTimeline `eras` array is the existing
example of this pattern.

**Trade-offs:** Keeps the component self-contained and the repository structure flat. The data
is tightly coupled to the component that uses it — which is correct here because the data exists
to drive that specific demo and would not be shared.

---

## Data Flow

### Slide Render Flow

```
GET /<slug>
    ↓
Next.js App Router matches src/app/<slug>/page.tsx
    ↓
RSC page renders (server): SlideLayout + static JSX + CodeCallout(s) → HTML
    ↓
Client island hydrates: demo component receives no serialized state from server
    ↓
User interacts → useState / useReducer in island → re-render within island boundary
```

### No Cross-Slide State

There is no global state store and no cross-slide communication. Each slide's demo island is
fully independent. Theme state (dark/light) continues to live in the DOM (`.dark` on `<html>`)
and `localStorage`, managed by the existing ThemeToggle — demo islands read this via CSS
(Tailwind's `dark:` variant) without any React state.

---

## Slide-by-Slide Architecture Recommendations

### Slide 02 — What Is Tailwind

**Structure:** RSC page with two static sections: "Traditional CSS" and "Tailwind CSS" comparison,
plus a client island toggle that switches between them.

**Island:** `WhatIsTailwindDemo` — `"use client"`, manages a `mode: "traditional" | "utility"`
toggle state. Renders a sample card styled with long-form traditional CSS (simulated via inline
styles or a `<style>` tag) vs. the same card with Tailwind classes. The contrast is the demo.

**Callouts:** CodeCallout annotations on the Tailwind side labeling `p-6`, `rounded-xl`,
`bg-white`, `dark:bg-slate-900`, etc.

**No Shiki needed:** The code shown is brief enough for styled `<code>` spans.

---

### Slide 03 — Utility Classes

**Structure:** RSC page with a grid of categorized examples (layout, spacing, typography, color,
flexbox, grid). Each category box is a static RSC section with a rendered demo and CodeCallout.

**Island:** `UtilityClassesDemo` — `"use client"`, allows selecting a class category from a
tab/pill nav and showing that category's examples highlighted. Alternatively, a hover-to-reveal
callout effect (hover the rendered output → the callout classes appear). The latter is simpler
and more TV-friendly (no tiny click targets).

**Callouts:** Heavy use of CodeCallout throughout — this slide IS about classes.

**No Shiki needed:** All callouts are short class token lists.

---

### Slide 04 — Responsiveness & Dark Mode

**Structure:** Two distinct sections in the RSC page: (1) Responsive Prefixes, (2) Dark Mode.

**Responsive section island:** `ViewportPreview` — `"use client"`, renders three static layout
cards side by side showing "mobile", "tablet", "desktop" layout. A toggle switches the card
content between "without responsive classes" and "with responsive prefixes". Button bar shows
`sm:` / `md:` / `lg:` labels to make the prefix-to-breakpoint mapping explicit.

**Dark mode section:** Static RSC, no island needed. Show two cards (light / dark) side-by-side
using explicit `bg-white` and `bg-slate-900` — do not depend on the ThemeToggle for the demo.
Add CodeCallout for `dark:bg-slate-900`, `dark:text-white`, etc.

**No iframe required.** See Pattern 4 rationale above.

---

### Slide 05 — Customizing Tailwind

**Structure:** Three sections in the RSC page: (1) Custom theme tokens from `globals.css`,
(2) Custom utilities / variants, (3) Custom animations.

**Primary demo:** Show the actual `globals.css` `@theme` block as a Shiki-highlighted code
block (async RSC component, `codeToHtml`). Adjacent to it, show live rendered examples using
those tokens (colored swatches, custom breakpoint label, animated element).

**Animation section island:** `CustomAnimationDemo` — `"use client"`, a button that triggers
and re-triggers the `animate-reveal-up` animation (the one already defined in `globals.css`)
so the audience can replay it. One `useState` boolean, one `useEffect` to reset it.

**Shiki IS appropriate here** for the `globals.css` code block — it is multi-line and the
syntax coloring aids reading. Use the `github-dark` theme to match the slide's dark aesthetic.

---

### Slide 06 — Conditional Styling

**Structure:** RSC page with three demo sections: (1) Hover/focus state variants, (2) Toggle
state with `cn()`, (3) Compound variants pattern.

**Islands:**
- `HoverFocusDemo` — `"use client"`, a set of interactive buttons/inputs where the audience
  can hover/focus/click to see the variant classes activate in real time. Show the active class
  in a CodeCallout that updates on state change (or simply show all variants statically with
  their prefix labeled).
- `ConditionalStylingDemo` — `"use client"`, the primary demo. A card that changes appearance
  based on toggled boolean state. Show the ternary / `cn()` call in a CodeCallout adjacent to
  the rendered output.

**`cn()` pattern:** Implement a local `cn` utility (`clsx` + no `tailwind-merge` unless class
conflicts appear — for this presentation, `clsx` alone is sufficient and adds no dependency).
Define it inline in the demo file:
```tsx
function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
```
This teaches the pattern without requiring an npm install, and the audience can copy the
3-line function directly.

---

## Anti-Patterns

### Anti-Pattern 1: Defining "use client" Components Inside page.tsx

**What people do:** Add `"use client"` to the top of a slide page file and write the demo
component inline.

**Why it's wrong:** The entire page becomes a client component, including all static prose and
headings. This ships unnecessary JS to the client and breaks the RSC teaching model that the
app implicitly demonstrates.

**Do this instead:** Keep `page.tsx` as a pure RSC. Define the interactive component in
`src/components/<SlideName>Demo.tsx` with its own `"use client"` directive.

---

### Anti-Pattern 2: Using Shiki for Simple Class Token Callouts

**What people do:** Run all code snippets through Shiki for consistency.

**Why it's wrong:** Shiki is async, requires `dangerouslySetInnerHTML`, and adds build complexity.
For 1–4 class tokens displayed as `<code>` spans, a styled component is faster to build,
easier to maintain, and produces identical visual output.

**Do this instead:** Use `CodeCallout` (a styled RSC `<code>` span) for inline class token
callouts. Reserve Shiki for multi-line code blocks where syntax coloring provides genuine
reading value (Slide 05's `globals.css` block).

---

### Anti-Pattern 3: Iframe for Responsive Breakpoint Demo

**What people do:** Load the demo in an iframe and resize the iframe to simulate viewport widths.

**Why it's wrong:** Requires a separate URL that serves only the demo content, CORS management
for same-origin access, and makes the source code less readable. On a large TV, iframe chrome
and address bars create visual noise.

**Do this instead:** Use static side-by-side layout cards (Pattern 4, option 2) with CodeCallout
annotations. Simpler, fully static, readable at distance.

---

### Anti-Pattern 4: Dynamic Tailwind Class String Concatenation

**What people do:** Build class strings dynamically: `` `text-${size}` `` or
`` `bg-${color}-500` ``.

**Why it's wrong:** Tailwind's build step scans source files for complete class strings. Partially
constructed strings are not detected and the corresponding CSS is not generated. This is a
critical teaching point for the conditional styling slide.

**Do this instead:** Use complete class strings in conditional expressions:
```tsx
// Wrong
const cls = `text-${isLarge ? "xl" : "sm"}`;
// Right
const cls = isLarge ? "text-xl" : "text-sm";
```
The demo on Slide 06 should explicitly show this anti-pattern alongside the correct pattern.

---

### Anti-Pattern 5: Spreading CodeCallout Inside the Client Island

**What people do:** Put CodeCallout inside the `"use client"` demo component to show the
"current" classes.

**Why it's wrong:** `CodeCallout` is a static RSC. Importing it inside a client component
forces it to become a client component too, negating its zero-JS nature.

**Do this instead:** Place CodeCallout in the RSC page, adjacent to but outside the client
island. For demos where the callout should react to state changes (e.g., show different classes
for active vs. inactive state), render both variants of the callout statically in the RSC and
let CSS `hidden`/`block` toggling (driven by a data attribute from the island) control which
is visible — or simply accept that the callout is static and the demo output is dynamic.

---

## Integration Points

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| RSC page → SlideLayout | Props: `number` (string), `title` (string), `children` (ReactNode) | Unchanged from existing pattern |
| RSC page → CodeCallout | Props: `classes` (string[]), optional `label` (string) | Pure static, no state |
| RSC page → Demo island | Import only; demo island receives no props in simple cases | Props must be serializable if passed |
| Demo island → ThemeToggle | Zero coupling — both read DOM `.dark` class via CSS | No React state coupling needed |
| Shiki (Slide 05) → RSC page | `codeToHtml()` called in async RSC function, rendered via `dangerouslySetInnerHTML` | Server-only; no client bundle impact |

### No External Services

This app has no external API dependencies, authentication, or data fetching. All content
is static and co-located in the source files.

---

## Repo Readability for Cloning Audience

Since the source code is part of the teaching material, the repository structure should
communicate the architecture at a glance:

1. **Every slide page file is short (< 50 lines).** It reads like a table of contents for
   the slide: prose, callouts, one demo component.

2. **Every demo component name maps to its slide.** `ConditionalStylingDemo.tsx` is on the
   conditional styling slide. No guessing.

3. **The RSC / client boundary is visible at the top of each component file.** `"use client"`
   or its absence tells the reader immediately what kind of component they are reading.

4. **Inline data (the `eras` array pattern from CssTimeline) keeps demos self-contained.**
   Audience members can read one file and understand the full demo without jumping to a data
   directory.

5. **CodeCallout is the mechanism that connects "what you see" to "what class does it."**
   The component's existence and simplicity is itself a teaching artifact — it shows that
   you do not need a complex library to annotate demos.

---

## Sources

- Existing codebase: `src/components/CssTimeline.tsx` (reference implementation for "use client" island pattern)
- Existing codebase: `src/app/history-of-css/page.tsx` (reference implementation for RSC page as compositor)
- Shiki Next.js package documentation: https://shiki.style/packages/next
- Next.js Server and Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components
- RSC "use client" island best practices: https://learnwebcraft.com/blog/react-server-components-next-js-14-guide
- clsx conditional class pattern: https://www.npmjs.com/package/clsx

---

*Architecture research for: Tailwind CSS interactive presentation app — remaining 5 slides*
*Researched: 2026-04-28*
