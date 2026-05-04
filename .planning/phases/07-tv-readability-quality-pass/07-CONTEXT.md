# Phase 7: TV Readability & Quality Pass - Context

**Gathered:** 2026-05-04
**Status:** Ready for planning

<domain>
## Phase Boundary

Audit-and-fix pass across all 6 slide pages — confirming legibility at 1920px from TV distance, verifying animation compliance with `prefers-reduced-motion`, and confirming a clean production build. No new features, no new routes, no new components. This phase only patches existing slides and components.

Scope includes all 6 slides:
- Slide 1: History of CSS (`history-of-css`) — CssTimeline component, built Phase 1
- Slide 2: What Is Tailwind (`what-is-tailwind`) — ButtonComparison, built Phase 2
- Slide 3: Core Utility Classes (`utility-classes`) — CardBuilder + FlexGridComparison, built Phase 3
- Slide 4: Responsiveness & Dark Mode (`responsiveness-dark-mode`) — ResponsiveDemo, built Phase 4
- Slide 5: Customizing Tailwind (`customizing-tailwind`) — ShikiBlock + TokenPipeline, built Phase 5
- Slide 6: Conditional Styling (`conditional-styling`) — ConditionalPanels + DataActiveDemo, built Phase 6

</domain>

<decisions>
## Implementation Decisions

### Reduced-Motion Coverage (QA-02)
- **D-01:** Gate only entrance/exit animations. The existing `@media (prefers-reduced-motion: reduce)` block in `globals.css` already handles `animate-reveal-up` by overriding the keyframe to a no-op. This is the correct pattern and is sufficient.
- **D-02:** Do NOT add `motion-reduce:transition-none` to `transition-colors`, `transition-all`, or `transition-transform` utilities throughout components. These are subtle interactive feedback (color fades on hover, border changes), not disorienting motion.
- **D-03:** Do NOT add `motion-reduce:scale-100` to `group-hover:scale-105` in ConditionalPanels. The scale is minor interactive feedback, not an entrance animation.
- **D-04:** Do NOT modify the CssTimeline IntersectionObserver logic. The keyframe-override approach makes items appear immediately under reduced-motion — no code changes to observer logic needed.
- **D-05:** Audit scope for QA-02: confirm that `animate-reveal-up` is the only entrance animation in the codebase and that it is already gated. If any other `animate-*` classes are found that are NOT in the reduced-motion override block, add them.

### TV Audit Method (QA-01)
- **D-06:** Code inspection approach: scan all slide page files and component files for `text-xs`, `text-sm`, `text-base`, and spacing values without corresponding `3xl:` escalations. Fix any gaps found. Then do a quick browser spot-check at 1920px to confirm.
- **D-07:** Demo-content class strings in lookup-table maps (e.g., CardBuilder `STEP_STYLES`) are intentional — they show authentic utility output. Do NOT add `3xl:` escalations inside these class string constants. The card container layout and surrounding navigation already have `3xl:` escalations.
- **D-08:** Slide 1 (History of CSS / CssTimeline) IS included in the audit even though it was built in Phase 1. A quick pass confirms `3xl:`/`4xl:` coverage and catches any gaps in timeline card body text and detail paragraphs.
- **D-09:** Focus audit on: CodeCallout text, overline labels, section headings, form validation messages, badge text, slide number chips, back-nav link text — small UI chrome elements that are most likely to be under-escalated.

### Build Test (QA-03)
- **D-10:** `yarn build` completing clean is the QA-03 gate. This is the same standard used in every prior phase. It verifies no TypeScript errors, no purged classes, and no Next.js build errors.
- **D-11:** No automated Playwright smoke tests added. No manual production server walkthrough required beyond the build completing.

### Phase Structure
- **D-12:** Three plans matching the three requirements: (1) TV audit + 3xl: fix pass, (2) reduced-motion audit + fix pass, (3) final `yarn build` gate + any remaining cleanup. Plans 1 and 2 can run in parallel since they touch different aspects of the codebase.

### Claude's Discretion
- Exact `3xl:` values to add for any gaps found (follow the established escalation ratios from prior phases: `text-xs` → `3xl:text-sm`, `text-sm` → `3xl:text-base`/`3xl:text-lg`, `text-base` → `3xl:text-lg`/`3xl:text-xl`)
- Whether specific gap fixes require `3xl:` or `4xl:` escalations (CssTimeline already uses `4xl:` — follow that pattern for Slide 1)
- Order of scanning components (suggest: SlideLayout → all page.tsx files → component files by slide order)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase Requirements
- `.planning/REQUIREMENTS.md` §Phase 7 — Requirements QA-01, QA-02, QA-03
- `.planning/ROADMAP.md` §Phase 7 — Goal, success criteria, dependencies

### Architecture & Conventions
- `CLAUDE.md` §Tailwind v4 specifics — `@custom-variant dark`, `@theme` breakpoints (`3xl` = 1920px, `4xl` = 2560px); all demo components must include `3xl:` escalations
- `CLAUDE.md` §Interactive demo patterns — single-source callout, RSC default, leaf-node islands, no dynamic class interpolation

### Existing Reduced-Motion Pattern
- `src/app/globals.css` — The `@media (prefers-reduced-motion: reduce)` block (around line 34) defines the ONLY reduced-motion mechanism. New entrance animations MUST be added to this block. Do NOT add Tailwind `motion-reduce:` prefixes to component class strings.

### Existing Code to Audit
- `src/components/CssTimeline.tsx` — Slide 1; uses `animate-reveal-up`, `transition-transform`, `transition-[grid-template-rows]`; has `3xl:` and `4xl:` escalations
- `src/components/SlideLayout.tsx` — Shared wrapper; nav bar, back link, slide number badge — small chrome elements to audit
- `src/components/CodeCallout.tsx` — Check `3xl:` text escalation on the class display itself
- `src/components/ButtonComparison.tsx` — Slide 2 island
- `src/components/CardBuilder.tsx` — Slide 3; STEP_STYLES map class strings are intentionally small (demo content — do not change)
- `src/components/FlexGridComparison.tsx` — Slide 3 RSC
- `src/components/ResponsiveDemo.tsx` — Slide 4 island
- `src/components/ConditionalPanels.tsx` — Slide 6; has `group-hover:scale-105` — leave as-is per D-03
- `src/components/DataActiveDemo.tsx` — Slide 6 island
- `src/app/what-is-tailwind/page.tsx` — Slide 2 page
- `src/app/utility-classes/page.tsx` — Slide 3 page
- `src/app/responsiveness-dark-mode/page.tsx` — Slide 4 page
- `src/app/customizing-tailwind/page.tsx` — Slide 5 page
- `src/app/conditional-styling/page.tsx` — Slide 6 page

### Prior Phase Context
- `.planning/phases/06-slide-6-conditional-styling/06-CONTEXT.md` — Phase 6 escalation patterns and component structure

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/app/globals.css` `@media (prefers-reduced-motion: reduce)` block — add any new entrance animation keyframe overrides here
- `src/app/globals.css` `@theme` — `--breakpoint-3xl: 1920px` and `--breakpoint-4xl: 2560px` define the audit targets

### Established Patterns
- **3xl: escalation ratios**: `text-xs` → `3xl:text-sm`, `text-sm` → `3xl:text-base` or `3xl:text-lg`, `text-base` → `3xl:text-xl`, spacing `gap-6` → `3xl:gap-12`, padding `p-6` → `3xl:p-8` — follow prior phase patterns
- **4xl: for Slide 1**: CssTimeline uses `4xl:` escalations beyond `3xl:` — Slide 1 audit should check for `4xl:` consistency
- **Reduced-motion = keyframe override in globals.css**: Not Tailwind `motion-reduce:` prefix — keep consistent with existing approach
- **Demo content exempt**: Class strings inside lookup-table maps that ARE the content being demonstrated are not escalated

### Integration Points
- All fixes are in-place edits to existing component and page files — no new files created
- `yarn build` at the end of Plan 3 is the final phase gate

</code_context>

<specifics>
## Specific Ideas

- CssTimeline Slide 1 detail paragraphs (body text inside accordion cards) may be the most likely gap — they were written early and the TV readability contract was codified later
- `SlideLayout` back-nav link and slide number badge are small fixed-size elements worth checking
- `CodeCallout` is used on every slide — confirming its `3xl:` escalation applies to all call sites is high value

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 7-TV Readability & Quality Pass*
*Context gathered: 2026-05-04*
