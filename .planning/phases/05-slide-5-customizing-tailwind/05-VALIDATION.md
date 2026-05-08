---
phase: 5
slug: slide-5-customizing-tailwind
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-30
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest + jsdom |
| **Config file** | `vitest.config.mts` |
| **Quick run command** | `yarn test --run` |
| **Full suite command** | `yarn test --run && yarn build` |
| **Estimated runtime** | ~10 seconds (test) + ~30 seconds (build) |

---

## Sampling Rate

- **After every task commit:** Run `yarn test --run`
- **After every plan wave:** Run `yarn test --run && yarn build`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** ~40 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 05-01-01 | 01 | 0 | — | — | N/A | unit | `yarn test --run src/test/mocks/shiki.ts` | ❌ W0 | ⬜ pending |
| 05-01-02 | 01 | 1 | — | — | N/A | unit | `yarn test --run` | ✅ | ⬜ pending |
| 05-02-01 | 02 | 1 | S5-01 | — | N/A | build | `yarn build` | ✅ | ⬜ pending |
| 05-02-02 | 02 | 1 | S5-01 | — | N/A | unit | `yarn test --run` | ✅ | ⬜ pending |
| 05-03-01 | 03 | 2 | S5-01, S5-02, S5-03 | — | N/A | unit | `yarn test --run` | ✅ | ⬜ pending |
| 05-03-02 | 03 | 2 | S5-01, S5-02, S5-03 | — | N/A | build | `yarn build` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/test/mocks/shiki.ts` — Vitest mock for `shiki` module; `codeToHtml` returns a predictable HTML string to prevent WASM failures in jsdom
- [ ] Update `slide-pages.test.tsx` stubCases filter to remove `"05"` so the customizing-tailwind page is tested with the real component tree (after the mock is in place)

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Shiki dual-theme light/dark colors display correctly at runtime | S5-01, S5-02, S5-03 | Requires browser + ThemeToggle interaction; jsdom cannot verify CSS variable rendering | Start `yarn dev`, open `/customizing-tailwind`, toggle dark mode with ThemeToggle, verify code blocks switch colors |
| Code blocks are TV-legible at 1920px width | S5-01, S5-02, S5-03 | Requires browser resize to 1920px | Set browser viewport to 1920px, verify `3xl:` text and spacing escalations apply |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 40s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
