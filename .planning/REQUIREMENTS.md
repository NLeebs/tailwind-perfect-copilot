# Requirements: v1.1 — Extended Demos + Slide 2 Rework

**Defined:** 2026-05-06
**Core Value:** Every slide must both show the output AND make it obvious what Tailwind code produces it — so the audience leaves with a mental model they can immediately apply.

---

## v1.1 Requirements

### Slide 2 Rework — What Is Tailwind

- [ ] **S2-01**: User sees a philosophy intro section on Slide 2 before the existing demo — includes a "utility-first CSS framework" definition and the core concept (style in markup, composable primitives)
- [ ] **S2-02**: User sees 2–3 condensed problem cards above the demo (context-switching between HTML/CSS, naming things is hard, CSS bloat) — TV-legible at 1920px
- [ ] **S2-03**: User sees the semantic vs. utility button demos split one-per-column in the two-column grid (rearranged from the current single-column layout)
- [ ] **S2-04**: User sees a second card below the existing Tailwind card demo with a `CodeCallout` showing `.card-header {}` / `.card-title {}` / `.card-highlighted {}` to illustrate the naming-things-is-hard problem live

### Extended Demos

- [ ] **EXT-01**: User can navigate to a standalone bonus slide demonstrating the `peer-checked` radio button pattern with visible Tailwind class callouts
- [ ] **EXT-02**: User can navigate to a container queries demo using `@container` — shows how a component responds to its own container width rather than the viewport, with class callouts
- [ ] **EXT-03**: User sees animated shiki-magic-move code transitions on Slides 5–6 (library already installed; needs wiring to animate between code states)

### History of CSS

- [ ] **HIST-01**: User sees additional inline hyperlinks in CssTimeline milestone text entries (extending quick task 260506-q01)

---

## Future Requirements

- Full shiki-magic-move transition coverage across all slides (beyond 5–6)
- Presenter mode / speaker notes
- Keyboard slide-to-slide navigation

## Out of Scope

- Authentication / user accounts — static public presentation app
- Backend API routes or database
- Live CSS editor / real-time class applier
- Tailwind cheatsheet or comprehensive class reference
- Tailwind Play iframe embed

## Traceability

| REQ-ID | Phase | Notes |
|--------|-------|-------|
| S2-01 | TBD | |
| S2-02 | TBD | |
| S2-03 | TBD | |
| S2-04 | TBD | |
| EXT-01 | TBD | |
| EXT-02 | TBD | |
| EXT-03 | TBD | |
| HIST-01 | TBD | |
