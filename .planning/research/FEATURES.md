# Feature Research

**Domain:** Interactive Tailwind CSS teaching presentation app (live talk resource)
**Researched:** 2026-04-28
**Confidence:** HIGH — all claims verified against Tailwind v4 official docs and direct codebase review

---

## Slide-by-Slide Demo Landscape

This section answers the core question for each of the five stub slides: what to build, what to show, what to skip.

---

### Slide 2 — What Is Tailwind & Why It's Powerful

**Teaching goal:** Convince skeptical developers (BEM users, CSS-in-JS users, Bootstrap users) that utility-first is worth the learning cost.

**Most effective demo: Side-by-side button**
Show the exact same rendered button twice — once with a semantic class approach (`.btn { ... }`) and once with Tailwind utilities. The visual output is identical; only the source differs. The Tailwind version lives in one place. The semantic version requires jumping to a stylesheet. This is not hypothetical — it is the exact comparison the official Tailwind v4 docs use to open the utility-first explanation.

Key teaching points to surface inline:
- `hover:bg-sky-700` ONLY fires on hover; `bg-sky-500` does nothing on hover. Each class has one job.
- Removing the Tailwind button deletes all its styles. Removing the semantic button leaves orphaned CSS.
- No class-naming decisions: the constraint IS the constraint.

**Supporting demo: "The class soup is the documentation"**
Show a Tailwind card element and narrate that reading `rounded-2xl border border-slate-200 bg-white dark:bg-slate-900 p-6` tells you everything about that element without opening a separate file. The CssTimeline component in the existing codebase is a living example of this — reference it.

**What NOT to build for this slide:**
Do not build a live CSS editor or real-time class applier. The complexity of the editor becomes the demo, not the concept. Do not show a full Tailwind cheatsheet — it overwhelms before the philosophy has landed.

---

### Slide 3 — Core Utility Classes in a Component-Based Context

**Teaching goal:** Give every attendee a mental map of the most-used utility categories so they can start writing Tailwind immediately.

**Most effective demo: A single evolving card component**
Build one component (a profile card or article preview card) and progressively add utility categories one section at a time:

1. Layout / spacing: `flex`, `gap-4`, `p-6`, `m-auto`, `max-w-sm`
2. Typography: `text-xl`, `font-semibold`, `tracking-tight`, `leading-snug`, `text-slate-900`
3. Color: `bg-white`, `text-slate-600`, `border-slate-200`
4. Borders / radius: `rounded-2xl`, `border`, `ring-2`, `ring-offset-2`
5. Flexbox: `flex`, `items-center`, `justify-between`, `shrink-0`
6. Grid: `grid`, `grid-cols-3`, `col-span-2`, `gap-6`

At each step, the card looks visibly better. This story structure (start ugly, fix one system at a time) is the most legible teaching sequence for a mixed audience.

**Inline callout pattern:** Show only the classes added at each step next to the rendered output. Never show the full class list until the end reveal. This is consistent with the existing "minimal callouts over full code blocks" decision in PROJECT.md.

**Important: include flexbox vs grid contrast**
A single-row flex example and a two-dimensional grid example side by side. This directly addresses the question frontend devs from all backgrounds have: "when do I use which?" Tailwind makes the difference tactile — `flex flex-row gap-4` vs `grid grid-cols-3 gap-4` with identical children.

**What NOT to build:**
Do not show all utility categories in parallel. Cognitive overload kills live demos. Do not show utility classes without rendered output adjacent — always show the visual alongside the classes.

---

### Slide 4 — Responsiveness & Dark Mode

**Teaching goal:** Show that responsive breakpoints and dark mode are the same mental model as any other Tailwind variant — a prefix, not a separate system.

**Most effective demo: A resize-aware layout card**

The demo must actually respond when the presenter resizes the browser window. A card component that:
- Stacks vertically (image on top, text below) at mobile widths
- Goes side-by-side at `md:` and above
- Changes `grid-cols-1` to `md:grid-cols-2` to `lg:grid-cols-3`

The key visual moment: the presenter drags the browser window narrower while the audience watches the layout snap at exact breakpoints. Callouts show `md:flex-row`, `md:w-48`, `lg:grid-cols-3` adjacent to the affected elements.

**Important implementation detail:** Use the browser's built-in DevTools responsive viewport (not a shrunk iframe) so the demo works full-screen on the TV. The Tailwind Responsive Breakpoint Chrome extension (displays current breakpoint prefix) is useful for presenter setup but should not be a dependency of the slide itself.

**Dark mode sub-demo: Live toggle on the same card**

The ThemeToggle button already exists and works. The dark mode slide section should show a component that uses at least 6-8 `dark:` prefixed classes visibly changing on toggle — backgrounds, text, borders, shadows. The toggle moment (clicking the button and watching everything shift) is the payoff.

Callout to surface: `dark:bg-slate-900 dark:text-white dark:border-slate-700` — make the prefix/value relationship legible at TV scale.

**Secondary demo: Stacked variants**
Show one element with `dark:md:hover:bg-fuchsia-600` to demonstrate that variants compose. This is the "aha" moment — the same mental model applies across all three dimensions simultaneously. Keep it brief; one element, one callout.

**What NOT to build:**
Do not demo responsive behavior inside an embedded iframe or a simulated "phone frame" component. These lose the live resize effect. Do not demo `prefers-color-scheme` media query detection in isolation — the app already uses class-based dark mode via `@custom-variant dark`, so all demos should reflect that implementation.

---

### Slide 5 — Customizing Tailwind (Theme Tokens, Custom Classes, Animations)

**Teaching goal:** Show that all customization lives in `globals.css`, that theme variables automatically generate utility classes, and that the customization hierarchy has a clear order of preference.

**Most effective demo: Token-to-utility pipeline**

Show the contents of `globals.css` (the actual project file) on screen alongside a component that uses the custom tokens defined there. Walk through:

1. `@theme { --breakpoint-3xl: 1920px; }` → the `3xl:` prefix works in JSX
2. `@theme { --animate-reveal-up: reveal-up 0.7s ease-out both; }` → `animate-reveal-up` is a valid utility class

Then live-add a brand color:

```css
@theme {
  --color-brand-500: oklch(0.55 0.25 250);
}
```

And immediately use `bg-brand-500` in a component on the slide. The class did not exist before the `@theme` entry. This is the single most powerful demonstration of v4's CSS-first config.

**Secondary demo: @utility for custom utilities**

Show `@utility scrollbar-hidden { &::-webkit-scrollbar { display: none; } }` being added to `globals.css`. This is the v4 replacement for `@layer utilities` (v3). Critical to name the v3 difference — many attendees will have seen v3 content online.

**Tertiary demo: @layer base for global element styles**

The `h1` gradient rule already in `globals.css` is a perfect example: `@apply font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400`. Every slide title inherits this without an additional class. Show this as a live callout.

**Customization hierarchy to teach (in order of preference):**
1. Use a theme value from `@theme` — a class you reference
2. Use an arbitrary value — `top-[117px]`
3. Write a `@utility` — a reusable custom utility
4. Write a `@layer components` class — a reusable semantic class (only for overridable patterns)

**What NOT to build:**
Do not demo `tailwind.config.js` at all — it does not exist in this project and demonstrating v3 config would confuse v4-focused learners. Do not demo every `@theme` namespace — color, animation, and breakpoint are sufficient to make the pattern clear. Do not use `@apply` in new components during the demo (outside of `@layer base`) — it is explicitly discouraged in v4 except for base styles.

---

### Slide 6 — Conditional Styling / Reactive Components

**Teaching goal:** Show that interactive UI (hover, focus, active, toggled state) can be expressed in three ways: pure CSS variants, group/peer patterns, and React state + `cn()`. Each has its right context.

**Most effective demo: Three-panel comparison**

Show three implementations of a card that highlights on hover:

**Panel 1 — Pure Tailwind CSS variants** (no JavaScript needed):
```html
<div class="bg-white hover:bg-sky-50 hover:border-sky-300 border transition-colors">
```
Works entirely in Tailwind classes. Zero JS. Best for simple per-element state.

**Panel 2 — Group variant** (no JavaScript, multi-child state):
```html
<a class="group">
  <h3 class="text-gray-900 group-hover:text-white">Title</h3>
  <p class="text-gray-500 group-hover:text-white">Subtext</p>
</a>
```
One parent interaction drives multiple children. Zero JS. Best for cards and nav items.

**Panel 3 — React useState + cn()** (JavaScript-driven toggle):
```tsx
const [active, setActive] = useState(false);
<button className={cn("bg-white border", active && "bg-sky-600 text-white border-sky-600")}>
  Toggle
</button>
```
Explicit state, inspectable in devtools. Best for toggles, selection state, open/close.

**The teaching moment:** Each panel has its right context. Tailwind doesn't pick for you — it provides all three. The cn() pattern (conditionally joining class strings) is the idiomatic React + Tailwind pattern. It should be shown, not hidden.

**Secondary demo: peer variant for form validation**
An email input with `peer` and a `<p class="invisible peer-invalid:visible text-red-500">` sibling. This shows browser-native validation state driving Tailwind styling without any JavaScript. This pattern lands exceptionally well with Vue and plain JS devs who are accustomed to writing validation listeners.

**Secondary demo: data attribute pattern**
Show `data-active` toggled by React state, driving `data-active:bg-purple-600`. Bridges JS state and Tailwind styling without class manipulation — and explains how headless UI libraries (Radix, Headless UI) work with Tailwind under the hood.

**What NOT to build:**
Do not demo `peer-checked` with radio buttons as the primary conditional styling example — the HTML required (label/input relationship, DOM sibling ordering) is distracting in a live talk. Defer it to a bonus/appendix section. Do not show complex stacked variants (e.g., `dark:md:group-hover:`) as the first example — start with one dimension, stack later.

---

## Feature Landscape

### Table Stakes (Audiences Expect These)

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Inline code callouts adjacent to every demo | Audience came to see the code, not just the output; without callouts it's a screenshot | MEDIUM | Consistent pattern already established by PROJECT.md decision; keep to key classes only |
| Rendered visual output for every demo | Static code blocks on a TV are useless; the app needs to show what the classes produce | LOW | Built into every component by design — just don't regress to slides-with-code |
| TV-scale readability (3xl / 4xl breakpoints) | Displayed on 1080p–4K TVs; sub-20px text from 10 feet is unreadable | LOW | `3xl:` and `4xl:` breakpoint infrastructure already exists in globals.css and CssTimeline |
| Dark mode toggle visible on every slide | ThemeToggle is global; dark-mode-unaware slide content looks broken when toggled | MEDIUM | Every slide must supply `dark:` variants on its demo components |
| Consistent `SlideLayout` chrome | Navigation coherence; audience needs to know which slide they're on | LOW | Already implemented; just use the component |
| Interactive interaction (click, hover, resize) | Static demos fail to teach interactive concepts | MEDIUM | Varies by slide — hover states need real hover targets, responsive needs a real resizable viewport |
| Working from `yarn dev` with no env vars | Audience members cloning the repo during the talk need zero-config startup | LOW | Constraint already in PROJECT.md; no new dependencies requiring env vars |

### Differentiators (Competitive Advantage)

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| The actual `globals.css` file as a live demo artifact | Most Tailwind courses don't show how v4 CSS-first config works in a real project file; this app IS the demo | LOW | Already exists; Slide 5 should show the real file contents on screen |
| Progressive reveal within a slide (accordion, staged building) | Mirrors the CssTimeline pattern; prevents cognitive overload by showing demos incrementally rather than all-at-once | MEDIUM | The CssTimeline accordion model is the established pattern — apply it to the utility-classes card-building sequence |
| Source code as curriculum (audience clones the repo) | Unlike a video course, the audience has the actual implementation to study after the talk | LOW | Reinforced by code quality decisions; components must use idiomatic Tailwind patterns |
| Three-panel comparison (CSS variants vs group/peer vs React state) | No other Tailwind intro I found shows all three conditional styling approaches side by side; most pick one | MEDIUM | Core differentiator for Slide 6 — directly addresses the "when do I use which?" question |
| v4-specific demo content (`@theme`, `@utility`, `@custom-variant`) | Most Tailwind talks and courses cover v3; showing v4's CSS-first config is a genuine knowledge differentiator in 2026 | MEDIUM | Requires Slide 5 to explicitly name v3 vs v4 differences for clarity |
| Live resize breakpoint demo (not simulated viewport) | Simulated phone frames are common in CSS talks; real browser-window resizing on a large TV is rarer and more visceral | LOW | Implementation is just building the right layout and resizing the window during the talk |

### Anti-Features (Avoid These)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Full code blocks on slides | Developers want to read the code | Unreadable at TV distance; dense blocks cause audience to stop looking at the output and start trying to read | Inline callouts showing only the key classes adjacent to the rendered output — the pattern already defined in PROJECT.md |
| Live CSS editor / class-applier (type classes and see the output) | Feels interactive and magical | Editor UI complexity becomes the demo; typos fail live; attention splits between the editor and the output | Pre-built demos with staged reveal; the audience clones the repo for their own experimentation |
| Simulated viewport / phone frame for responsive demo | Common pattern in CSS courses | Kills the live resize moment; audience can't feel the breakpoint snap; feels fake on a TV | Real browser window resize; the existing `3xl`/`4xl` breakpoints already demonstrate that the app is built for large viewports |
| Tailwind cheatsheet / comprehensive class reference | Audiences want to see what's available | Overwhelming; turns teaching into a catalog; no single class is memorable because all are presented equally | Show 3–5 classes per category max; teach the pattern (`{property}-{scale}`) so they can guess the rest |
| Presenter mode / slide transitions / keynote-style navigation | Makes it feel like a polished presentation tool | Complexity for zero teaching value; the home NavCard model already works for a live talk; slide-runner features distract from the Tailwind content | Stay with the home NavCard hub; each slide is a self-contained page |
| Embedding Tailwind Play in an iframe | Shows the official playground, feels credible | iframe interaction is awkward; playground doesn't show the v4 globals.css config approach; loses the "app is the demo" quality | Use the actual app codebase; the codebase IS the playground |
| `tailwind.config.js` mention or demo | Many tutorials reference it | This project does not have one and should not; showing v3 config would create confusion for attendees trying to reproduce the demo | Show only `globals.css` and `@theme`; explicitly name the v3→v4 config change once |
| Complex peer-checked radio button examples as primary demo | peer/checked is a Tailwind superpower | DOM sibling ordering requirement and label/input markup is distracting in a live talk setting; requires explanation before the point lands | Use `hover:`, `group-hover:`, and a simple `peer-invalid:` form validation example instead; reserve radio peer patterns for the appendix |
| Animation-heavy scroll effects per slide | Makes it feel dynamic | Scroll-driven animations add JavaScript complexity and distract from what each slide is teaching; the CssTimeline scroll-reveal is sufficient in Slide 1 | Use animation only on Slide 5 (Customizing Tailwind) where animations ARE the lesson; keep other slides static |

---

## Feature Dependencies

```
Slide 3 (Utility Classes card demo)
    └──requires──> Inline callout component or pattern
                       └──required by──> All slides 2-6

Slide 4 (Responsiveness)
    └──requires──> A component with meaningful multi-breakpoint layout
    └──requires──> Browser-resizable context (no iframe)

Slide 4 (Dark Mode)
    └──requires──> dark: variants on all demo components
    └──enhances──> ThemeToggle (already exists)

Slide 5 (Customization)
    └──requires──> globals.css @theme additions (brand color, custom animation)
    └──requires──> @utility additions to globals.css
    └──enhances──> Slide 4 dark mode (shows how @custom-variant dark is defined)

Slide 6 (Conditional Styling)
    └──requires──> A cn() utility (clsx or tailwind-merge)
    └──requires──> useState-based toggle component ("use client")
    └──enhances──> Slide 3 (the same card becomes the conditional styling demo)

Slide 2 (What Is Tailwind)
    ──conflicts──> Full code blocks (should use callouts, not code panels)
```

### Dependency Notes

- **Inline callout pattern requires definition before Slide 2:** The callout display format (minimal classes adjacent to output) must be decided once and reused. Build a reusable `CodeCallout` or `ClassBadge` component for Slides 2–6.
- **Slide 6 requires cn():** Either `clsx` or `tailwind-merge` must be added as a dependency. The `cn()` pattern is the idiomatic React + Tailwind approach; it must be present for Slide 6 to be honest.
- **Slide 5 enhances Slide 4:** The `@custom-variant dark` definition in `globals.css` should be called out on Slide 5 as an example of a custom variant — it ties the dark mode demo from Slide 4 back to the customization story.

---

## MVP Definition

### Build Now (this milestone)

- [ ] Slide 2: Side-by-side button (semantic class vs. utilities) + inline callout — why it's essential: establishes the philosophy; everything else builds on this mental model
- [ ] Slide 3: Progressive card-building demo with 6 utility categories (layout → spacing → typography → color → border → flex/grid) — why it's essential: gives every attendee something actionable to reference
- [ ] Slide 4: Responsive card with live viewport breakpoints + dark mode toggle on a component with 6+ dark: classes — why it's essential: the resize + toggle are the two most visceral live-demo moments in the whole talk
- [ ] Slide 5: globals.css on-screen with live-add brand color token → immediate utility class — why it's essential: the v4 CSS-first config is the single most differentiating thing about this talk vs. every v3 Tailwind tutorial online
- [ ] Slide 6: Three-panel comparison (CSS variant / group variant / React state + cn()) with a peer-invalid form validation demo — why it's essential: directly answers the audience's "when do I use which?" question
- [ ] Reusable inline code callout component used by all 5 slides — why it's essential: without a consistent callout pattern, individual slides will diverge in readability

### Add After First Pass (before the talk)

- [ ] TV readability pass: verify all slides at 3xl (1920px) — some demos may need extra spacing or larger callout text
- [ ] Reduced-motion audit: all animations respect `prefers-reduced-motion` (already in CssTimeline; new slides must follow suit)
- [ ] `cn()` utility added and documented: either add `clsx` + `tailwind-merge` or a lightweight custom implementation

### Future / Appendix

- [ ] Peer-checked radio pattern — useful but distracting in a live flow; add as an appendix or "further reading" link
- [ ] Container queries demo — genuinely powerful v4 feature, but out of scope for a 6-topic intro talk
- [ ] Dark mode / responsive stacked variant depth (`dark:md:hover:`) — show once as a "look what's possible" moment; do not build a dedicated demo

---

## Feature Prioritization Matrix

| Feature | Audience Value | Implementation Cost | Priority |
|---------|----------------|---------------------|----------|
| Side-by-side utility-first philosophy demo (Slide 2) | HIGH | LOW | P1 |
| Progressive card builder with callouts (Slide 3) | HIGH | MEDIUM | P1 |
| Live resize responsive demo (Slide 4) | HIGH | LOW | P1 |
| Dark mode toggle demo with dark: callouts (Slide 4) | HIGH | LOW | P1 |
| globals.css live brand color token demo (Slide 5) | HIGH | LOW | P1 |
| Three-panel conditional styling comparison (Slide 6) | HIGH | MEDIUM | P1 |
| Reusable inline code callout component | HIGH | LOW | P1 |
| peer-invalid form validation demo (Slide 6) | MEDIUM | LOW | P2 |
| @utility custom scrollbar-hidden demo (Slide 5) | MEDIUM | LOW | P2 |
| Stacked variants demo `dark:md:hover:` (Slide 4) | MEDIUM | LOW | P2 |
| TV readability pass (3xl/4xl verification) | HIGH | LOW | P1 |
| cn() utility / clsx + tailwind-merge setup | HIGH (for Slide 6) | LOW | P1 |
| Container queries demo | LOW (out of scope for talk) | MEDIUM | P3 |
| Peer-checked radio button demo | LOW (distracting in live talk) | MEDIUM | P3 |

---

## Sources

- [Tailwind CSS v4 — Utility-First documentation](https://tailwindcss.com/docs/utility-first) — authoritative on the button comparison demo
- [Tailwind CSS v4 — Responsive Design documentation](https://tailwindcss.com/docs/responsive-design) — breakpoints, mobile-first principle, card demo
- [Tailwind CSS v4 — Hover, Focus, and Other States](https://tailwindcss.com/docs/hover-focus-and-other-states) — group, peer, data attribute, has-checked patterns
- [Tailwind CSS v4 — Theme documentation](https://tailwindcss.com/docs/theme) — @theme directive, namespace conventions, token-to-utility pipeline
- [Tailwind CSS v4 — Adding Custom Styles](https://tailwindcss.com/docs/adding-custom-styles) — @utility, @layer components, v3 vs v4 differences
- [Tailwind CSS v4 — Dark Mode documentation](https://tailwindcss.com/docs/dark-mode) — selector strategy, @custom-variant pattern
- [Tailwind v4 blog post](https://tailwindcss.com/blog/tailwindcss-v4) — CSS-first config rationale
- [InformIT — Presentation Patterns: Demonstrations vs Presentations](https://www.informit.com/articles/article.aspx?p=1930512) — live demo anti-patterns, when live demos work well
- [dasroot.net — Live Coding in Presentations Best Practices (2026)](https://dasroot.net/posts/2026/04/live-coding-presentations-best-practices/) — avoid typing live, pre-stage steps
- Project codebase: `/src/components/CssTimeline.tsx`, `/src/app/globals.css`, `/src/components/ThemeToggle.tsx` — existing patterns to follow

---
*Feature research for: Tailwind CSS interactive teaching presentation app*
*Researched: 2026-04-28*
