---
phase: 8
slug: slide-2-rework
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-05-07
---

# Phase 8 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 3.x + jsdom + @testing-library/react 16 |
| **Config file** | `vitest.config.mts` |
| **Quick run command** | `yarn test --run` |
| **Full suite command** | `yarn test --run && yarn build` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `yarn test --run`
- **After every plan wave:** Run `yarn test --run && yarn build`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 8-W0-01 | Wave 0 | 0 | S2-03 | — | N/A | unit | `yarn test --run` | ❌ W0 | ⬜ pending |
| 8-W0-02 | Wave 0 | 0 | S2-03 | — | N/A | unit | `yarn test --run` | ❌ W0 | ⬜ pending |
| 8-W0-03 | Wave 0 | 0 | S2-01, S2-02, S2-04 | — | N/A | unit | `yarn test --run` | ❌ W0 | ⬜ pending |
| 8-01-01 | 01 | 1 | S2-03 | — | N/A | unit | `yarn test --run` | ❌ W0 | ⬜ pending |
| 8-01-02 | 01 | 1 | S2-03 | — | N/A | unit | `yarn test --run` | ❌ W0 | ⬜ pending |
| 8-01-03 | 01 | 1 | S2-01, S2-02, S2-04 | — | N/A | unit + build | `yarn test --run && yarn build` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/test/components/SemanticButton.test.tsx` — stubs for S2-03 (BTN_CSS_DEFINITION always visible; no toggle)
- [ ] `src/test/components/UtilityButton.test.tsx` — stubs for S2-03 (TAILWIND_BTN_CLASSES button + CodeCallout)
- [ ] `src/test/app/WhatIsTailwind.test.tsx` — stubs for S2-01 (intro "utility-first" text), S2-02 (problem card headings), S2-04 (naming callout `.card-header {}` etc.)

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Slide renders TV-legible at 1920px (3xl: escalations visible) | S2-01, S2-02, S2-03, S2-04 | Requires browser at 1920px viewport | Open Slide 2 at 1920px; verify all text readable, cards not cramped |
| Dark mode renders all new sections correctly | S2-01, S2-02, S2-03, S2-04 | Visual check — dark: variants applied | Toggle dark mode; verify intro, problem cards, demo grid, naming card |
| Philosophy intro section appears above problem cards | S2-01 | Visual order check | View Slide 2; confirm intro heading visible before cards |
| Problem cards appear above two-column demo | S2-02 | Visual order check | Confirm 3-card row between intro and demo columns |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
