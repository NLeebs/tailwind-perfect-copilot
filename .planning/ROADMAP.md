# Roadmap: Tailwind CSS — The Perfect Wingman

## Milestones

- ✅ **v1.0 — Tailwind CSS: The Perfect Wingman** — Phases 1–7 (shipped 2026-05-06)
- 🚧 **v1.1 — Extended Demos + Slide 2 Rework** — Phases 8–10 (in progress)

## Phases

<details>
<summary>✅ v1.0 — The Perfect Wingman (Phases 1–7) — SHIPPED 2026-05-06</summary>

- [x] Phase 1: Shared Infrastructure (3/3 plans) — completed 2026-04-29
- [x] Phase 2: Slide 2 — What Is Tailwind (1/1 plan) — completed 2026-04-29
- [x] Phase 3: Slide 3 — Core Utility Classes (3/3 plans) — completed 2026-04-30
- [x] Phase 4: Slide 4 — Responsiveness & Dark Mode (3/3 plans) — completed 2026-04-30
- [x] Phase 5: Slide 5 — Customizing Tailwind (3/3 plans) — completed 2026-04-30
- [x] Phase 6: Slide 6 — Conditional Styling (4/4 plans) — completed 2026-05-04
- [x] Phase 7: TV Readability & Quality Pass (3/3 plans) — completed 2026-05-04

Full archive: [.planning/milestones/v1.0-ROADMAP.md](milestones/v1.0-ROADMAP.md)

</details>

### 🚧 v1.1 — Extended Demos + Slide 2 Rework (In Progress)

**Milestone Goal:** Deepen the talk's teaching value — rebuild Slide 2 to lead with the "why Tailwind" story, wire three deferred interactive demos, add more CssTimeline inline links.

- [ ] **Phase 8: Slide 2 Rework** - Rebuild the "What Is Tailwind" slide with a philosophy intro, problem cards, rearranged demo, and a naming-problem CodeCallout card
- [ ] **Phase 9: Bonus Demo Slides** - Add the peer-checked radio button slide and the container queries slide as standalone navigable pages
- [ ] **Phase 10: shiki-magic-move & CssTimeline Polish** - Wire animated code transitions on Slides 5–6 and extend CssTimeline inline hyperlinks

## Phase Details

### Phase 8: Slide 2 Rework
**Goal**: Users see a fully reworked "What Is Tailwind" slide that leads with the philosophy, contextualizes the problem, and shows both the semantic and utility demos side-by-side with a naming-problem CodeCallout card
**Depends on**: Phase 7
**Requirements**: S2-01, S2-02, S2-03, S2-04
**Success Criteria** (what must be TRUE):
  1. User sees a philosophy intro section at the top of Slide 2 with a "utility-first CSS framework" definition before any demo content
  2. User sees 2–3 condensed problem cards (context-switching, naming things is hard, CSS bloat) above the interactive demo — legible at 1920px
  3. User sees the semantic button demo and utility button demo side-by-side in a two-column grid, one per column
  4. User sees a second card below the Tailwind card demo with a CodeCallout showing `.card-header {}`, `.card-title {}`, and `.card-highlighted {}` class names
**Plans**: 3 plans
- [x] 08-01-PLAN.md — Wave 0: scaffold failing tests for SemanticButton, UtilityButton, and the reworked WhatIsTailwind page (locks S2-01, S2-02, S2-03, S2-04 behavior) ✅ 2026-05-07
- [x] 08-02-PLAN.md — Wave 1: create SemanticButton.tsx (client island, always-visible BTN_CSS_DEFINITION callout) and UtilityButton.tsx (RSC, single-source TAILWIND_BTN_CLASSES) ✅ 2026-05-07
- [ ] 08-03-PLAN.md — Wave 2: rewrite what-is-tailwind/page.tsx with four-section narrative (intro → problem cards → two-column demo with naming card in left column); delete ButtonComparison.tsx
**UI hint**: yes

### Phase 9: Bonus Demo Slides
**Goal**: Users can navigate to two new standalone bonus slides — one demonstrating peer-checked radio buttons and one demonstrating container queries with @container
**Depends on**: Phase 7
**Requirements**: EXT-01, EXT-02
**Success Criteria** (what must be TRUE):
  1. User can navigate from the home NavCard grid to a peer-checked radio button bonus slide and interact with radio buttons to see the Tailwind peer-checked pattern in action with visible class callouts
  2. User can navigate from the home NavCard grid to a container queries demo slide and see a component respond to its container width (not the viewport) with visible @container class callouts
  3. Both new slides render at TV scale (1920px) with 3xl: escalations and pass yarn build
**Plans**: TBD
**UI hint**: yes

### Phase 10: shiki-magic-move & CssTimeline Polish
**Goal**: Slides 5–6 animate between code states using shiki-magic-move, and the History of CSS timeline has additional inline hyperlinks in milestone text entries
**Depends on**: Phase 8, Phase 9
**Requirements**: EXT-03, HIST-01
**Success Criteria** (what must be TRUE):
  1. User sees animated code transitions on Slide 5 (Customizing Tailwind) when navigating between code examples — characters morph rather than hard-cut
  2. User sees animated code transitions on Slide 6 (Conditional Styling) when navigating between code examples — characters morph rather than hard-cut
  3. User sees additional clickable inline hyperlinks in CssTimeline milestone text entries (extending the existing MilestoneItem link pattern)
  4. yarn build passes with no purged classes and no type errors
**Plans**: TBD

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Shared Infrastructure | v1.0 | 3/3 | Complete | 2026-04-29 |
| 2. Slide 2 — What Is Tailwind | v1.0 | 1/1 | Complete | 2026-04-29 |
| 3. Slide 3 — Core Utility Classes | v1.0 | 3/3 | Complete | 2026-04-30 |
| 4. Slide 4 — Responsiveness & Dark Mode | v1.0 | 3/3 | Complete | 2026-04-30 |
| 5. Slide 5 — Customizing Tailwind | v1.0 | 3/3 | Complete | 2026-04-30 |
| 6. Slide 6 — Conditional Styling | v1.0 | 4/4 | Complete | 2026-05-04 |
| 7. TV Readability & Quality Pass | v1.0 | 3/3 | Complete | 2026-05-04 |
| 8. Slide 2 Rework | v1.1 | 2/3 | In progress | - |
| 9. Bonus Demo Slides | v1.1 | 0/? | Not started | - |
| 10. shiki-magic-move & CssTimeline Polish | v1.1 | 0/? | Not started | - |
