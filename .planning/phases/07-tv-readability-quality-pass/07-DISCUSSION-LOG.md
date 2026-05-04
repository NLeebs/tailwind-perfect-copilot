# Phase 7: TV Readability & Quality Pass - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-04
**Phase:** 7-TV Readability & Quality Pass
**Areas discussed:** Reduced-motion scope, TV audit method, Build test depth

---

## Reduced-Motion Scope

| Option | Description | Selected |
|--------|-------------|----------|
| Entrance animations only | Gate only `animate-*` entrance animations; leave `transition-*` and hover transforms alone | ✓ |
| All transitions too | Global CSS rule to zero-out all transition durations | |
| Full Tailwind motion-reduce: | Add `motion-reduce:transition-none motion-reduce:transform-none` to ~10 component files | |

**User's choice:** Entrance animations only
**Notes:** `transition-colors` and hover transforms are subtle interactive feedback, not disorienting motion. QA-02 is about consistency with the existing CssTimeline keyframe-override pattern.

### Follow-up: IntersectionObserver under reduced-motion

| Option | Description | Selected |
|--------|-------------|----------|
| Keyframe override sufficient | Existing pattern makes items appear immediately — no code changes needed | ✓ |
| Remove observer under reduced-motion | Check `prefers-reduced-motion` in component and skip IntersectionObserver entirely | |

**User's choice:** Keyframe override is sufficient

### Follow-up: ConditionalPanels group-hover:scale-105

| Option | Description | Selected |
|--------|-------------|----------|
| Leave as-is | `group-hover:scale-105` is minor interactive feedback, not disorienting entrance/exit motion | ✓ |
| Gate the scale transform | Add `motion-reduce:scale-100` alongside `group-hover:scale-105` | |

**User's choice:** Leave as-is

---

## TV Audit Method

| Option | Description | Selected |
|--------|-------------|----------|
| Code inspection + browser spot-check | Scan class strings for small text without `3xl:` escalations, fix, then browser verify | ✓ |
| Full visual browser pass | Set viewport to 1920px, eyeball every element, fix what looks bad | |
| Automated viewport test | Playwright test at 1920px checking minimum font sizes | |

**User's choice:** Code inspection + browser spot-check

### Follow-up: Demo content in STEP_STYLES

| Option | Description | Selected |
|--------|-------------|----------|
| Keep demo content authentic | `text-sm` in STEP_STYLES is the content being taught — leave it as-is | ✓ |
| Escalate even demo content | Add `3xl:text-base` alongside `text-sm` in the lookup map | |

**User's choice:** Keep demo content authentic

### Follow-up: Slide 1 inclusion

| Option | Description | Selected |
|--------|-------------|----------|
| Include in audit | CssTimeline was built in Phase 1 before TV readability contract was formalized — include for completeness | ✓ |
| Exclude it | Phase 1 is done and verified — don't touch it | |

**User's choice:** Include in audit

---

## Build Test Depth

| Option | Description | Selected |
|--------|-------------|----------|
| yarn build passes clean | `yarn build` with no errors — same gate as every prior phase | ✓ |
| Build + manual slide walkthrough | `yarn build && yarn start` then manually visit all 6 slides | |
| Build + existing test suite | `yarn build && yarn test --run` — all 80+ tests pass | |

**User's choice:** yarn build passes clean

---

## Claude's Discretion

- Exact `3xl:` values for any gaps (follow established escalation ratios from prior phases)
- Whether CssTimeline detail paragraphs need `4xl:` escalations beyond `3xl:`
- Scanning order for components
- Any gaps between `3xl:` and missing escalations in specific elements

## Deferred Ideas

None — discussion stayed within phase scope.
