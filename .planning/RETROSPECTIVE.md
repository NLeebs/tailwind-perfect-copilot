# Retrospective: Tailwind CSS — The Perfect Wingman

---

## Milestone: v1.0 — Tailwind CSS: The Perfect Wingman

**Shipped:** 2026-05-06
**Phases:** 7 | **Plans:** 20
**Timeline:** 22 days (2026-04-14 → 2026-05-06)

### What Was Built

1. Shared infrastructure: CodeCallout RSC + cn() utility + @custom-variant dark mode fix
2. Slide 2 — semantic vs. utility button comparison and "class list is documentation" demo
3. Slide 3 — CardBuilder 6-step progressive card + FlexGridComparison with single-source consts
4. Slide 4 — ResponsiveDemo tab island + dark: prefix panel + stacked dark:md:hover: variants
5. Slide 5 — ShikiBlock async RSC with Vitest mock alias + @theme token pipeline + @utility + @layer base
6. Slide 6 — three-panel CSS/group/React-state comparison + peer-invalid + data-active + full Vitest tests
7. TV readability audit: all 6 slides pre-compliant at 3xl; reduced-motion gate confirmed; build/lint green

### What Worked

- **Wave-based parallel execution** — Phases 3, 4, and 6 ran multiple plans in parallel waves, cutting calendar time significantly
- **Single-source const pattern** — Established in Phase 2 and adopted across all subsequent slides; zero CodeCallout drift issues
- **Lookup-table maps for toggled state** — Satisfied Tailwind's class purger without any workarounds; pattern was immediately clear to implement
- **Leaf-node client islands** — Kept `page.tsx` files RSC throughout; no accidental "use client" creep
- **Pre-compliant TV readability** — All 3xl: escalations were already in place before the Phase 7 audit; zero remediation needed
- **Vitest resolve.alias mock pattern** — Clean solution for WASM-heavy (shiki) and async RSC (ShikiBlock) library mocking; no jsdom workarounds needed

### What Was Inefficient

- **REQUIREMENTS.md not updated during execution** — Checkbox state fell behind reality; required manual reconciliation at archive time. Should use `/gsd-transition` after each phase to keep it current.
- **Phase 5 Shiki specificity risk** — Flagged in STATE.md as a blocker concern pre-execution but resolved trivially with `!important`. The concern was valid but the fix was one line.
- **ESLint worktree pollution** — Parallel agent `.next/` dirs caused spurious lint errors that required an ESLint globalIgnores fix in Phase 7. Should have been caught earlier.

### Patterns Established

- **Single-source const** — `className` string as named module-scope const consumed by both element and `<CodeCallout classes={}>`
- **Lookup-table map** — `Record<StateKey, string>` with complete static class strings for all toggled visual states
- **Leaf-node client island** — `"use client"` lives only at the deepest interactive component; RSC page imports it
- **Vitest resolve.alias** — Mock WASM-heavy or async RSC dependencies at the import layer, not inside test files
- **MilestoneItem type** — Structured milestone entries that support inline hyperlinks without changing the flat string entries elsewhere

### Key Lessons

1. **Run REQUIREMENTS.md updates after each phase** — The traceability table is valuable at milestone close only if it's been maintained. Hook this into the transition workflow.
2. **Pre-flight spec against browser rendering early** — ShikiBlock dark mode specificity was a known risk; worth a 5-minute prototype before committing to the full implementation plan.
3. **ESLint globalIgnores should be a project default** — Any project using parallel worktree execution should add `.claude/worktrees/**` to globalIgnores from the start.
4. **Phase 7 TV audit was a confidence check, not a remediation pass** — Pre-compliance suggests the 3xl: escalation convention was internalized correctly from CLAUDE.md early on.

### Cost Observations

- Sessions: Multiple over 22 days; majority of implementation in concentrated 2-day bursts (Apr 29–30 and May 4)
- Notable: Parallel wave execution in Phases 3, 4, 6 provided significant throughput; single-plan phases (2) were faster but sequential

---

## Cross-Milestone Trends

| Metric | v1.0 |
|--------|------|
| Phases | 7 |
| Plans | 20 |
| Days | 22 |
| LOC | ~2,400 |
| Pre-compliant quality | High (TV audit zero-remediation) |
| Requirement tracking discipline | Low (not updated during execution) |
