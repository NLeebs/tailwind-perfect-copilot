# Requirements: Tailwind CSS — The Perfect Wingman

**Defined:** 2026-04-28
**Core Value:** Every slide must both show the output AND make it obvious what Tailwind code produces it — so the audience leaves with a mental model they can immediately apply.

## v1 Requirements

### Shared Infrastructure

- [ ] **INFRA-01**: A reusable `CodeCallout` RSC component renders key Tailwind class strings adjacent to demo output with consistent, TV-legible styling
- [ ] **INFRA-02**: A `cn()` utility (clsx + tailwind-merge v3) is available in `src/lib/utils.ts` for all interactive demo components
- [ ] **INFRA-03**: The `globals.css` dark mode conflict is resolved — `@custom-variant dark` is the single dark mode source of truth; the `prefers-color-scheme` media query block is removed

### Slide 2 — What Is Tailwind

- [x] **S2-01**: Slide renders a side-by-side button comparison: the left button uses a semantic class (`.btn { ... }` in a style block), the right button uses Tailwind utilities — identical visual output, class callouts highlight the difference
- [x] **S2-02**: Slide renders a "class soup is documentation" section showing a Tailwind card component whose class list is displayed as an inline callout, narrating that reading the classes tells you everything about the element without opening a separate file

### Slide 3 — Core Utility Classes

- [ ] **S3-01**: Slide renders a progressive card-building demo with 6 steps (layout → spacing → typography → color → borders → flexbox) where the card looks visibly better at each step and only the newly added classes are shown in a callout
- [ ] **S3-02**: Slide renders a flex vs. grid side-by-side comparison with identical children, with callouts showing `flex flex-row gap-4` vs. `grid grid-cols-3 gap-4` to teach when to use each

### Slide 4 — Responsiveness & Dark Mode

- [ ] **S4-01**: Slide renders a responsive layout card that stacks vertically at mobile widths, goes side-by-side at `md:`, and shows a three-column grid at `lg:`, with breakpoint-prefix callouts (`md:flex-row`, `lg:grid-cols-3`) adjacent to the affected elements
- [ ] **S4-02**: Slide renders a component with at least 6 `dark:` prefixed utility classes that visibly shift on ThemeToggle click, with `dark:` callouts making the prefix/value relationship legible at TV scale
- [ ] **S4-03**: Slide renders a single element demonstrating `dark:md:hover:` stacked variants to show that all three variant dimensions compose with the same mental model

### Slide 5 — Customizing Tailwind

- [x] **S5-01**: Slide shows the `globals.css` file content on-screen alongside a component using a `--color-brand-500` token defined in `@theme`, demonstrating that the class `bg-brand-500` is generated automatically from the token
- [x] **S5-02**: Slide shows a `@utility scrollbar-hidden` custom utility definition, with an explicit callout naming the v3 equivalent (`@layer utilities`) so attendees who've seen v3 content understand the mapping
- [x] **S5-03**: Slide shows the existing `@layer base` h1 gradient rule as a live artifact, with a callout explaining that every slide title inherits these styles without an additional class

### Slide 6 — Conditional Styling

- [ ] **S6-01**: Slide renders a three-panel comparison of the same card with three implementations: (1) pure Tailwind CSS variants — `hover:bg-sky-50`, (2) `group-hover:` driving multiple children, (3) React `useState` + `cn()` explicit toggle
- [ ] **S6-02**: Slide demonstrates `tailwind-merge` behavior: shows how conflicting Tailwind classes are resolved when passed to `cn()` and how local component state drives class changes — with the merging logic visible as a callout
- [ ] **S6-03**: Slide renders a `peer-invalid` form validation demo: an email input with `peer` + a sibling paragraph with `invisible peer-invalid:visible text-red-500` — no JavaScript required
- [ ] **S6-04**: Slide renders a `data-active` attribute pattern: React state toggles `data-active` on an element, Tailwind's `data-active:bg-purple-600` drives the visual change — with a callout explaining how headless UI libraries use this pattern

### Quality

- [ ] **QA-01**: All 6 slides are verified legible and usable at 1920px width (3xl breakpoint) — fonts, spacing, and callouts readable from TV viewing distance
- [ ] **QA-02**: All new animations and transitions respect `prefers-reduced-motion` (consistent with the existing `CssTimeline` pattern)
- [ ] **QA-03**: `yarn build && yarn start` passes after each slide is complete to verify no Tailwind classes are silently purged in production

## v2 Requirements

### Extended Demos

- **EXT-01**: Peer-checked radio button pattern as a bonus/appendix slide — deferred because the HTML markup is distracting in a live talk
- **EXT-02**: Container queries demo (`@container`) — genuine v4 superpower but out of scope for a 6-topic intro talk
- **EXT-03**: `shiki-magic-move` animated code transitions for Slides 5–6 — adds visual interest to code reveals but not required for teaching value

## Out of Scope

| Feature | Reason |
|---------|--------|
| Live CSS editor / real-time class applier | Editor complexity becomes the demo; typos fail live |
| Simulated phone frames for responsive demo | Kills the live browser-resize moment; feels fake on TV |
| Full code blocks on slide pages | Unreadable at TV distance; defeats the purpose of inline callouts |
| Tailwind cheatsheet / comprehensive class reference | Overwhelming; no single class is memorable when all are shown |
| Keyboard slide-to-slide navigation | Home NavCard navigation model is sufficient for a live talk |
| Presenter mode / speaker notes | Adds complexity with no teaching value |
| Tailwind Play iframe embed | iframe interaction is awkward; loses the "codebase IS the playground" quality |
| `tailwind.config.js` demo | Project doesn't have one; showing v3 config would confuse v4-focused learners |
| Authentication, backend, database | Static public presentation app |
| Analytics / event tracking | Not needed for a talk resource |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| INFRA-01 | Phase 1 | Pending |
| INFRA-02 | Phase 1 | Pending |
| INFRA-03 | Phase 1 | Pending |
| S2-01 | Phase 2 | Complete |
| S2-02 | Phase 2 | Complete |
| S3-01 | Phase 3 | Pending |
| S3-02 | Phase 3 | Pending |
| S4-01 | Phase 4 | Pending |
| S4-02 | Phase 4 | Pending |
| S4-03 | Phase 4 | Pending |
| S5-01 | Phase 5 | Complete |
| S5-02 | Phase 5 | Complete |
| S5-03 | Phase 5 | Complete |
| S6-01 | Phase 6 | Pending |
| S6-02 | Phase 6 | Pending |
| S6-03 | Phase 6 | Pending |
| S6-04 | Phase 6 | Pending |
| QA-01 | Phase 7 | Pending |
| QA-02 | Phase 7 | Pending |
| QA-03 | Phase 7 | Pending |

**Coverage:**
- v1 requirements: 20 total
- Mapped to phases: 20
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-28*
*Last updated: 2026-04-28 after roadmap creation — all 20 requirements mapped to Phases 1–7*
