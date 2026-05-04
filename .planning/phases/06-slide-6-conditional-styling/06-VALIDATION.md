---
phase: 6
slug: slide-6-conditional-styling
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-05-04
---

# Phase 6 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 3.2.4 + Testing Library React 16 |
| **Config file** | `vitest.config.mts` |
| **Quick run command** | `yarn test` |
| **Full suite command** | `yarn test && yarn build` |
| **Estimated runtime** | ~15 seconds (test) + ~30 seconds (build) |

---

## Sampling Rate

- **After every task commit:** Run `yarn test`
- **After every plan wave:** Run `yarn test && yarn build`
- **Before `/gsd-verify-work`:** Full suite must be green + build must succeed
- **Max feedback latency:** ~15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 6-W0-01 | Wave 0 | 0 | S6-01 | — | N/A | unit | `yarn test` | ❌ Wave 0 | ⬜ pending |
| 6-W0-02 | Wave 0 | 0 | S6-04 | — | N/A | unit | `yarn test` | ❌ Wave 0 | ⬜ pending |
| 6-W0-03 | Wave 0 | 0 | S6-01–S6-04 | — | N/A | unit | `yarn test` | ❌ Wave 0 | ⬜ pending |
| 6-01-01 | 01 | 1 | S6-01 | — | N/A | unit | `yarn test` | ✅ (after W0) | ⬜ pending |
| 6-01-02 | 01 | 1 | S6-02, S6-03 | — | N/A | unit | `yarn test` | ✅ (after W0) | ⬜ pending |
| 6-01-03 | 01 | 1 | S6-04 | — | N/A | unit | `yarn test` | ✅ (after W0) | ⬜ pending |
| 6-01-04 | 01 | 1 | S6-01–S6-04 | — | N/A | build | `yarn build` | ✅ existing | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/test/components/ConditionalPanels.test.tsx` — stubs/assertions for S6-01 (panel rendering, state toggle)
- [ ] `src/test/components/DataActiveDemo.test.tsx` — stubs/assertions for S6-04 (renders, toggle button, data-active attribute)
- [ ] `src/test/app/slide-pages.test.tsx` update — remove `"06"` from `stubCases`, add `describe("Conditional Styling content")` assertions (S6-01 through S6-04)

*Existing `src/test/setup.ts` covers all islands — no new setup needed.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| CSS hover variant activates on card hover | S6-01 | jsdom doesn't fire `:hover` pseudo-class | Open `localhost:3000/conditional-styling`, hover Panel 1 card — background should shift to `sky-50` |
| `group-hover:` drives multiple children simultaneously | S6-01 | jsdom doesn't fire `:hover` pseudo-class | Hover Panel 2 card — icon should scale and text color should shift together |
| `peer-invalid:` error message appears without JS | S6-03 | Requires native browser email validation | Type "notanemail" in the email input — red message should appear with no JS involved |
| Dark mode renders all panels correctly | All | jsdom doesn't toggle `dark` class | Toggle ThemeToggle → verify all three panels, the form, and the data-active card render correctly in dark mode |
| TV readability at 1920px | All | Requires browser viewport resize | Set browser width to 1920px — all text, labels, and callouts must be legible from TV distance |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
