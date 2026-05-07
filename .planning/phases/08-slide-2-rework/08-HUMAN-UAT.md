---
status: partial
phase: 08-slide-2-rework
source: [08-VERIFICATION.md]
started: 2026-05-07T15:32:02Z
updated: 2026-05-07T15:32:02Z
---

## Current Test

[awaiting human testing]

## Tests

### 1. Naming card spatial position (D-13 vs SC-4 reconciliation)
expected: Naming card (`.card-header {} / .card-title {} / .card-highlighted {}` CodeCallout) appears in the LEFT column under SemanticButton — NOT below the right-column Tailwind card. D-13 locked this placement during /gsd-discuss-phase. Confirm the left-column placement reads pedagogically at TV scale.
result: [pending]

### 2. 1920px legibility (SC-2)
expected: All three problem cards are legible at 1920px. All overlines, headings, body text, and demo components scale visibly at the `3xl:` breakpoint (TV/projector display). Per 08-VALIDATION.md this is explicitly Manual-Only.
result: [pending]

### 3. Dark mode visual rendering
expected: All `dark:` class variants render correctly in browser dark mode. SemanticButton's `.dark .btn` override (`background-color: #0891b2`) shows for the button. Overlines and card text use dark-variant colours correctly.
result: [pending]

## Summary

total: 3
passed: 0
issues: 0
pending: 3
skipped: 0
blocked: 0

## Gaps
