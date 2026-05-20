# Glass Utility Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the invisible `scrollbar-hidden` utility demo with a visually dramatic `glass` (glassmorphism) utility demo on the Customizing Tailwind slide.

**Architecture:** Two file changes — `globals.css` swaps the `@utility` definition, and `customizing-tailwind/page.tsx` updates the constants and replaces the V3-equivalent callout with a live gradient + glass card demo. An existing Vitest test asserting `scrollbar-hidden` text is updated first so TDD guides the change.

**Tech Stack:** Next.js 15 App Router, React 19 RSC, Tailwind CSS v4, Vitest + Testing Library

---

## File Map

- Modify: `src/test/app/slide-pages.test.tsx` — update the S5-02 test to assert `Frosted Glass` instead of `scrollbar-hidden`
- Modify: `src/app/globals.css` — remove `@utility scrollbar-hidden`, add `@utility glass`
- Modify: `src/app/customizing-tailwind/page.tsx` — update `UTILITY_SNIPPET`, remove `V3_EQUIVALENT`, add `GLASS_USAGE`, replace right-column markup

---

### Task 1: Update the test to assert the new demo content

**Files:**
- Modify: `src/test/app/slide-pages.test.tsx:56-59`

- [ ] **Step 1: Replace the scrollbar-hidden assertion with one for the glass demo**

In `src/test/app/slide-pages.test.tsx`, replace the describe block starting at line 55:

```tsx
describe("Customizing Tailwind content", () => {
  it("renders the @utility glass demo card (S5-02)", () => {
    render(<CustomizingTailwind />);
    expect(screen.getByText(/Frosted Glass/i)).toBeInTheDocument();
  });

  it("renders the live h1 demo for the @layer base section (S5-03)", () => {
    render(<CustomizingTailwind />);
    expect(screen.getByText(/Live h1 Demo/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to confirm it fails**

```bash
yarn test src/test/app/slide-pages.test.tsx --reporter=verbose
```

Expected: FAIL — `Unable to find an element with the text: /Frosted Glass/i`

- [ ] **Step 3: Commit the updated test**

```bash
git add src/test/app/slide-pages.test.tsx
git commit -m "test: update S5-02 assertion from scrollbar-hidden to glass demo"
```

---

### Task 2: Update globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace the utility definition**

In `src/app/globals.css`, replace the entire `@utility scrollbar-hidden` block:

```css
/* REMOVE this block: */
@utility scrollbar-hidden {
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
```

With:

```css
@utility glass {
  backdrop-filter: blur(12px);
  background: oklch(100% 0 0 / 0.1);
  border: 1px solid oklch(100% 0 0 / 0.2);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: replace scrollbar-hidden utility with glass (glassmorphism)"
```

---

### Task 3: Update the page constants and markup

**Files:**
- Modify: `src/app/customizing-tailwind/page.tsx`

- [ ] **Step 1: Update the constants at the top of the file**

Replace `UTILITY_SNIPPET` and `V3_EQUIVALENT`, and add `GLASS_USAGE`. Leave `CUSTOM_UTILITY_CLASSES` untouched (it's used by Section 1's color demo).

Change `UTILITY_SNIPPET` from:

```ts
const UTILITY_SNIPPET = `/* globals.css */
@import "tailwindcss";

@utility scrollbar-hidden {
  scrollbar-width: none;
}`;
```

To:

```ts
const UTILITY_SNIPPET = `/* globals.css */
@import "tailwindcss";

@utility glass {
  backdrop-filter: blur(12px);
  background: oklch(100% 0 0 / 0.1);
  border: 1px solid oklch(100% 0 0 / 0.2);
}`;
```

Remove `V3_EQUIVALENT` entirely:

```ts
// DELETE this constant:
const V3_EQUIVALENT = `@layer utilities {
  .scrollbar-hidden {
    scrollbar-width: none;
  }
}`;
```

Add `GLASS_USAGE` after `UTILITY_SNIPPET`:

```ts
const GLASS_USAGE = `glass rounded-2xl p-6`;
```

- [ ] **Step 2: Replace the Section 2 right column**

Find the Section 2 right column (currently the `<div>` containing the "V3 EQUIVALENT" label and its `CodeCallout`):

```tsx
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 3xl:text-base mb-2">
              V3 EQUIVALENT
            </p>
            <CodeCallout classes={V3_EQUIVALENT} />
          </div>
```

Replace with:

```tsx
          <div>
            <div className="flex items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-pink-500 p-10 3xl:p-14">
              <div className="glass rounded-2xl p-6 text-center text-white 3xl:p-8">
                <p className="text-lg font-bold 3xl:text-2xl">Frosted Glass</p>
                <p className="mt-1 text-sm opacity-75 3xl:text-base">
                  backdrop-filter + bg opacity + border
                </p>
              </div>
            </div>
            <div className="mt-3">
              <CodeCallout classes={GLASS_USAGE} />
            </div>
          </div>
```

- [ ] **Step 3: Run the tests to confirm they pass**

```bash
yarn test src/test/app/slide-pages.test.tsx --reporter=verbose
```

Expected: ALL PASS — including the new `renders the @utility glass demo card (S5-02)` assertion.

- [ ] **Step 4: Run the full test suite to check for regressions**

```bash
yarn test
```

Expected: ALL PASS

- [ ] **Step 5: Run a production build to verify no classes are purged**

```bash
yarn build
```

Expected: Build succeeds with no errors or warnings about missing classes.

- [ ] **Step 6: Spot-check in the browser**

Start dev server:
```bash
yarn dev
```

Open [http://localhost:3000/customizing-tailwind](http://localhost:3000/customizing-tailwind).

Verify:
- Section 1 (Custom Colors): unchanged — blue swatch with `bg-brand-500` callout
- Section 2 (Custom Utilities): gradient box visible, frosted glass card centered inside it, `glass rounded-2xl p-6` callout below
- Section 3 (@layer base): unchanged — Live h1 Demo visible
- Toggle dark mode: glass card remains visible in both modes

- [ ] **Step 7: Commit**

```bash
git add src/app/customizing-tailwind/page.tsx
git commit -m "feat: replace scrollbar-hidden demo with glass utility live demo"
```
