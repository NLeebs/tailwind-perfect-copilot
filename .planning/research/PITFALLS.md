# Pitfalls Research

**Domain:** Interactive technical presentation / Tailwind CSS demo app
**Researched:** 2026-04-28
**Confidence:** HIGH (Tailwind v4 class detection, dark mode variant); MEDIUM (TV readability, RSC boundaries, animation); HIGH (inline code drift — well-established pattern from presentation tooling community)

---

## Critical Pitfalls

### Pitfall 1: Dynamic Class Name String Interpolation Breaks Silently

**What goes wrong:**
A component receives a color or size prop and constructs class names at runtime via template literals — e.g., `` `bg-${color}-500` `` or `` `text-${size}` ``. In dev mode this often works because Tailwind's dev server has scanned enough classes to have them in cache. In production, or after a cache clear, the interpolated class is never present in the output CSS. The element renders unstyled with no console error, no build warning, no indication anything is wrong.

**Why it happens:**
Tailwind's scanner performs static analysis of source files. It finds complete, literal class strings like `bg-blue-500`. It does not execute JavaScript, so it cannot know what `bg-${color}-500` will evaluate to. v4 is more unforgiving of this than v3 because the detection heuristics changed. This is especially dangerous in demo slides where color props, theme variants, or "live configuration" knobs are common patterns.

**How to avoid:**
Use lookup-table maps with complete static strings:
```tsx
const colorMap = {
  blue: "bg-blue-500 hover:bg-blue-600",
  red: "bg-red-500 hover:bg-red-600",
};
return <button className={colorMap[color]}>…</button>;
```
Never concatenate partial class names. If a class must be generated from runtime data (e.g., a `style` prop demo), use an actual `style` attribute for the dynamic value and demonstrate the equivalent Tailwind class in a static callout next to it.

**Warning signs:**
- Styles work in `yarn dev` but disappear after `yarn build && yarn start`
- A class appears in JSX as an expression containing `${}` that includes a Tailwind prefix (`bg-`, `text-`, `p-`, etc.)
- Interactive demo "knobs" that change color/size/spacing via prop

**Phase to address:**
Every interactive slide (Slides 3, 4, 5, 6). Establish the lookup-table pattern in Slide 3 (Utility Classes) since it's the first interactive demo slide and teaches the pattern implicitly.

---

### Pitfall 2: `@custom-variant dark` Silently Conflicts with `prefers-color-scheme`

**What goes wrong:**
The project defines `@custom-variant dark (&:where(.dark, .dark *))` in `globals.css`, overriding Tailwind's default `dark:` variant behavior. This means `dark:` utilities respond only to the `.dark` class on `<html>`, not to the OS preference. The existing CONCERNS.md documents a related issue: `layout.tsx` hardcodes `dark` in `className` as the default, so users who have set OS preference to light still see dark mode on first visit. More subtly, the `@media (prefers-color-scheme: dark)` block in `globals.css` still updates `--background` / `--foreground` CSS custom properties, but since `dark:` utilities are now class-gated, those custom properties and the `dark:` utilities can diverge — `body` background may shift one way while `dark:bg-slate-950` stays fixed, creating a mismatched appearance.

**Why it happens:**
The custom variant fully replaces the built-in dark mode behavior. The `globals.css` file has both `@custom-variant dark (&:where(.dark, .dark *))` (class-gated) and `@media (prefers-color-scheme: dark) { :root { … } }` (OS-gated), which are two independent systems. Neither knows about the other.

**How to avoid:**
Either (a) remove the `prefers-color-scheme` media query from `globals.css` since the JS toggle fully owns dark mode, and replace the CSS variable defaults with explicit values for each mode, or (b) add a hybrid approach to the custom variant:
```css
@custom-variant dark {
  &:where(.dark, .dark *) { @slot; }
  @media (prefers-color-scheme: dark) {
    &:where(:not(.light *)) { @slot; }
  }
}
```
For this project the simpler fix is (a): remove the media query and document the JS-only toggle as an intentional design choice. This is also better teaching material — it shows students that toggling a class is all that's needed.

**Warning signs:**
- Fresh visit (no localStorage) shows dark background but light `dark:` utility text, or vice versa
- ThemeToggle button icon is in wrong state on first render (the `getServerSnapshot` returns `true`, always starting dark server-side)
- Testing in a browser with OS light mode preference shows mixed light/dark styling

**Phase to address:**
Slide 4 (Responsiveness & Dark Mode) — must resolve this before building the dark mode demo, since the demo itself is the teaching artifact. Also flagged in CONCERNS.md as an existing known issue.

---

### Pitfall 3: RSC `"use client"` Boundary Placed Too High, Breaking the Teaching Model

**What goes wrong:**
When adding `"use client"` to a slide's `page.tsx` to enable a single interactive widget, every component imported by that page (including SlideLayout, icons, any data arrays) becomes a client component. For a demo app the performance cost is low, but the teaching cost is high: the source code no longer demonstrates the intended RSC + minimal-client-boundary pattern. Audience members cloning the repo will see `"use client"` at the top of a page that could be 90% server-rendered, learning the wrong mental model.

**Why it happens:**
It's the path of least resistance. When a `useState` call is needed anywhere in a component tree, the fastest fix is to add `"use client"` at the file root rather than extracting the interactive part into a separate client component file.

**How to avoid:**
Structure interactive demos as leaf-node client components, keeping page.tsx as a server component:
```
src/app/conditional-styling/
  page.tsx              ← RSC, no "use client"
  ConditionalDemo.tsx   ← "use client", receives no server data
```
This matches the CLAUDE.md directive ("Default to RSC; only add `'use client'` when browser APIs are required") and makes the component boundary itself a teaching example about RSC composition.

**Warning signs:**
- `page.tsx` has `"use client"` at the top
- A page file imports more than one component and one of them has `useState`/`useEffect`
- SlideLayout renders inside a `"use client"` component

**Phase to address:**
All five slide builds (Slides 2–6). Establish the pattern explicitly in Slide 3 (first interactive demo) and hold to it.

---

### Pitfall 4: TV-Scale Text Too Small — The `text-sm` Default Trap

**What goes wrong:**
Default Tailwind text utilities (`text-sm`, `text-base`, `text-xs`) produce 12–16px text, which is unreadable from TV viewing distance. Audience members at the back of a room with a 65" 1080p display need a minimum ~28px for body text. Demo callout badges using `text-xs` for Tailwind class names — which is the most tempting choice — become squints from more than 6 feet away. The CssTimeline component already uses `3xl:text-base` and `4xl:text-xl` on `text-xs` elements for the large-display path, which is the right pattern; failing to replicate this in new slides silently breaks TV readability.

**Why it happens:**
Developers build and test on laptops. `text-sm` looks fine at 1440×900. The 3xl/4xl breakpoints only trigger at 1920px+, so the problem is invisible during development.

**How to avoid:**
Every text element must have a `3xl:` size escalation, typically one or two steps up from the base. For any `text-xs` callout: add at minimum `3xl:text-sm`. For body paragraphs (`text-sm` or `text-base`): add `3xl:text-xl` or `3xl:text-2xl`. Use the existing CssTimeline as the reference implementation — it has the full scaling table. Conduct a TV readability pass on a 1920px viewport before considering any slide "done."

**Warning signs:**
- Any new text element without a `3xl:text-*` class
- Inline code callout badges using only `text-xs` or `text-sm` with no `3xl:` escalation
- No test/review step at a 1920px browser width before shipping a slide

**Phase to address:**
Every slide build. Add a TV readability check as the explicit final step of each slide's definition of done. Flag in Slide 4 (Responsiveness demo) since that slide must demonstrate breakpoint behavior — 3xl/4xl are custom breakpoints from globals.css, which makes them worth calling out in the demo itself.

---

### Pitfall 5: Inline Code Callout Drift from Actual Rendered Classes

**What goes wrong:**
A slide shows a demo component alongside a callout like `"flex items-center gap-4"`. The component gets refactored — gap changes to `gap-6`, a `flex-col` is added on mobile, a responsive variant is updated. The callout still shows the old classes. During the talk, audience members inspect the element in devtools and see classes that don't match the callout, undermining trust and confusing the teaching moment.

**Why it happens:**
Callout strings are hardcoded as JSX text content, completely decoupled from the component's actual className. There is no linting rule, no type check, and no test that detects the mismatch. It's purely a manual maintenance problem.

**How to avoid:**
Two strategies, use whichever fits the component:
1. **Single-source callout**: Extract the key className string as a named constant, use it on the element AND display it in the callout — `const cardClasses = "rounded-xl p-6 shadow-sm"; return <div className={cardClasses}>…<code>{cardClasses}</code>`.
2. **Selective callout**: Accept that callouts are teaching excerpts, not complete copies — document this explicitly in comments so future edits know the callout is intentionally partial. Then do a full class audit before the talk date.
Strategy 1 is preferred for any single-element demo. Strategy 2 is acceptable when the element has many classes and the callout deliberately highlights only the interesting subset.

**Warning signs:**
- Callout text is a static string that duplicates a className somewhere in the component
- Component was refactored after the callout was written
- No comment distinguishing "this is a live excerpt" from "this is a full copy"

**Phase to address:**
Slides 3–6. Introduce the single-source constant pattern in Slide 3 when building the first utility class demos.

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| `"use client"` on `page.tsx` | Unblocks interactive work fast | Teaches wrong RSC boundary model; audience clones wrong pattern | Never — extract a leaf component instead |
| Dynamic class interpolation (`bg-${x}`) | Concise prop-driven demo code | Silent CSS purging in production; breaks the demo during the talk | Never — use lookup tables |
| Hardcoded callout strings disconnected from component | Fast to write | Drift after any refactor; erodes audience trust during live talk | Only if clearly marked as intentional excerpt |
| Skipping `3xl:` breakpoint escalation on new elements | Faster to write | Unreadable at TV scale; discovered only at showtime | Never for text content; low risk for decorative elements |
| Inline `style` for color/size in demos | Avoids purging concern | Misrepresents how Tailwind works; audience learns wrong pattern | Only when explicitly demonstrating the CSS variable escape hatch |

---

## Integration Gotchas

Common mistakes when connecting pieces of this specific stack.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Tailwind v4 + Next.js App Router | Adding `@source` directives or `content` paths that aren't needed — v4 auto-detects `src/` | Trust auto-detection; only add `@source` if classes from `node_modules` packages are used |
| `@custom-variant dark` + `prefers-color-scheme` media query | Keeping both in `globals.css` creates two independent dark mode systems | Remove the `prefers-color-scheme` block since JS toggle owns dark mode, or use the hybrid `@custom-variant` pattern |
| `ThemeToggle` `getServerSnapshot` always returning `true` | Server renders dark state; client may flip to light on first visit causing a hydration flash | `suppressHydrationWarning` on the button is already present (correct); do not remove it |
| `@theme inline` vs `@theme` bare | Bare `@theme` generates CSS variables that utility classes reference by variable; `inline` inlines the value. Using bare `@theme` with colors and then applying opacity modifiers (`bg-cyan-500/50`) may misbehave | Prefer `@theme inline` when defining colors that will use opacity modifiers |
| RSC page importing a `"use client"` component | The client component correctly isolates the boundary | Ensure the RSC page itself has no hooks/state; boundary is implicit and correct |

---

## Performance Traps

Patterns that work at dev scale but cause presentation-day jank.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| `IntersectionObserver` + `animate-reveal-up` on every timeline item firing simultaneously | All items animate at once on first load; no staggered reveal | The existing CssTimeline correctly fires per-item — new slides must replicate this; don't attach all observers to the same element | When a new slide uses a single observer for a list |
| Heavy client component hydration on initial page load | Perceptible interaction delay during live demo | Keep interactive widgets small; defer non-critical state | Any `"use client"` component over ~50KB uncompressed |
| `transform`/`opacity` CSS animations vs. `width`/`height` | `width`/`height` triggers layout reflow; causes jank during accordion expand | CssTimeline uses `grid-template-rows` expand (compositor-friendly); use the same pattern | Any accordion, expand/collapse, or drawer component |
| Simultaneous scroll-triggered animations for large lists | Multiple IntersectionObservers active while user scrolls quickly | Disconnect each observer after first trigger (CssTimeline does this correctly with `obs.disconnect()`) | Lists with >10 animated items |

---

## UX Pitfalls

Common user experience mistakes specific to live technical presentation demos.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Demo requires mouse hover to show the Tailwind effect | Audience watching the TV sees a static state; presenter must narrate "imagine I'm hovering" | Build demos that show both states simultaneously — use a toggle or show before/after columns instead of relying on hover |
| Responsive demo uses browser resize | Audience laptops have different screen sizes; demo may not match presenter's state | Show responsive behavior via a class-controlled width constraint (`max-w-sm` → `max-w-full` toggle) rather than requiring the audience to resize their browser |
| Dark mode toggle is the only demo on the dark mode slide | Audience already knows toggles exist; the teaching point is the `dark:` classes | Show the actual class strings powering the transition — the toggle is just the trigger, not the lesson |
| Callout badges use `font-mono` without enforced contrast | Cyan-on-white or white-on-dark badge text may fail WCAG at TV viewing distance | Audit callout badge contrast at 7:1 minimum (TV recommendation); use `font-semibold` for light mono text |
| Animation runs once on page load; audience missed it | No way to re-trigger the reveal animation for late-arriving audience members | Add a "replay" button that resets `inView` state for scroll-reveal animations |

---

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **TV readability**: Slide renders correctly in the browser at dev scale — verify at exactly 1920px browser width with all text elements having `3xl:` escalations
- [ ] **Dark mode**: Dark mode toggle works in dev — verify no mixed light/dark artifact on fresh load (no localStorage) in both light-preference and dark-preference OS settings
- [ ] **Code callouts**: Callout text matches the actual `className` values on the demo element — verify by opening DevTools and comparing after any refactor
- [ ] **Production build**: Interactive demo works in dev — verify after `yarn build && yarn start` to catch purged dynamic classes
- [ ] **Reduced motion**: Animations look great — verify `@media (prefers-reduced-motion: reduce)` in `globals.css` overrides `reveal-up` correctly; check no new custom animations are added without a reduced-motion counterpart
- [ ] **RSC boundary**: Page works — verify `page.tsx` files for slides 2–6 do not have `"use client"` at the top; interactive pieces live in separate leaf components
- [ ] **3xl/4xl breakpoints**: Custom breakpoints used in CssTimeline — verify new slide components also scale at `3xl`/`4xl` and not just at standard `lg`/`xl`

---

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Dynamic class interpolation discovered pre-talk | LOW | Replace interpolated classes with lookup-table maps; verify with `yarn build` |
| Dynamic class interpolation discovered during talk | MEDIUM | Add `@source "unsafe"` to globals.css as a temporary safelist (forces all detected classes into output); rebuild before next run |
| Dark mode artifact on first load | LOW | Remove the `prefers-color-scheme` block from `globals.css` to unify dark mode under JS toggle only; retains full functionality |
| Callout drift discovered during talk | LOW | Acknowledge the discrepancy verbally ("the callout shows the original; here's the current version") — audiences respect honesty; fix in repo after the talk |
| TV text too small discovered at venue | MEDIUM | Open DevTools, increase `html { font-size }` via browser zoom as a stopgap; fix `3xl:` classes before next use |
| RSC boundary placed too high | LOW | Move `"use client"` from `page.tsx` to a new leaf component file; update the import in `page.tsx` |

---

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Dynamic class interpolation | Slide 3 (first interactive demo) — establish lookup-table pattern | `yarn build && yarn start` smoke test after each interactive slide |
| Dark mode `@custom-variant` conflict | Slide 4 (dark mode demo) — fix globals.css before building | Fresh-visit test in OS light-preference browser with no localStorage |
| RSC boundary too high | All slides 2–6 — enforce leaf-component pattern | Check that `page.tsx` files have no `"use client"` directive |
| TV text too small | Every slide — verify at 1920px before marking done | Browser DevTools responsive mode at exactly 1920px width |
| Inline callout drift | Slides 3–6 — use single-source constant pattern | Pre-talk audit: compare all callout strings against rendered className in DevTools |
| Animation without `prefers-reduced-motion` override | Any slide with animation | Simulate `prefers-reduced-motion: reduce` in DevTools |
| `"use client"` boundary enlargement | All slides — keep in design review | Count `"use client"` occurrences per page; any `page.tsx` with the directive is a red flag |

---

## Sources

- Context7 / tailwindlabs/tailwindcss.com: [Detecting classes in source files](https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/detecting-classes-in-source-files.mdx)
- Context7 / tailwindlabs/tailwindcss.com: [Dark mode — @custom-variant](https://tailwindcss.com/docs/dark-mode)
- Context7 / tailwindlabs/tailwindcss.com: [v4 automatic content detection](https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/blog/tailwindcss-v4/index.mdx)
- Tailwind CSS GitHub Discussion #16159: [v4 not compiling with dynamic values](https://github.com/tailwindlabs/tailwindcss/discussions/16159)
- Tailwind CSS GitHub Issue #16068: [dark variant doesn't apply in some cases](https://github.com/tailwindlabs/tailwindcss/issues/16068)
- Tailwind CSS GitHub Issue #18539: [dual CSS load in dev mode with custom dark variant](https://github.com/tailwindlabs/tailwindcss/issues/18539)
- Tailwind CSS GitHub Discussion #15083: [CSS variables for dark/light mode in v4](https://github.com/tailwindlabs/tailwindcss/discussions/15083)
- Next.js docs: [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- Next.js docs: [Composition Patterns](https://nextjs.org/docs/14/app/building-your-application/rendering/composition-patterns)
- LogRocket: [6 React Server Component performance pitfalls in Next.js](https://blog.logrocket.com/react-server-components-performance-mistakes)
- Schoen.world: [Flexible Dark Mode with Tailwind CSS v4 Custom Variants](https://schoen.world/n/tailwind-dark-mode-custom-variant)
- Extron: [Font Size and Legibility for Large-Screen/Videowall Content](https://www.extron.com/article/videowallfontsize)
- Android Developers TV Typography Guide (10-foot UI, 28px minimum)
- Project codebase: `.planning/codebase/CONCERNS.md` — existing theme-default and `@custom-variant` notes
- Project codebase: `src/app/globals.css` — actual `@custom-variant dark` and `prefers-color-scheme` co-existence
- Project codebase: `src/components/CssTimeline.tsx` — reference implementation for `3xl`/`4xl` scaling and animation patterns

---
*Pitfalls research for: Tailwind CSS interactive presentation app (Next.js 16 + React 19 + Tailwind v4)*
*Researched: 2026-04-28*
