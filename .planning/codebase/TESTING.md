# Testing
*Mapped: 2026-04-28*

## Framework & Setup

| Tool | Version | Role |
|------|---------|------|
| **Vitest** | ^3 | Test runner and assertion |
| **@testing-library/react** | ^16 | React component rendering |
| **@testing-library/jest-dom** | ^6 | DOM assertion matchers |
| **@testing-library/user-event** | ^14 | User interaction simulation |
| **jsdom** | ^26 | Browser environment in Node |
| **@vitest/coverage-v8** | ^3 | V8-based coverage |

Config: `vitest.config.mts`

```ts
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/test/**", "src/app/layout.tsx"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "next/link": path.resolve(__dirname, "./src/test/mocks/next-link.tsx"),
    },
  },
});
```

## Test Location

Tests live in `src/test/`, mirroring the `src/` structure:

```
src/test/
├── setup.ts                        # Global setup
├── mocks/
│   └── next-link.tsx               # next/link mock
├── app/
│   ├── page.test.tsx               # Home page
│   ├── history-of-css/page.test.tsx
│   └── slide-pages.test.tsx        # All slide pages smoke test
└── components/
    ├── CssTimeline.test.tsx
    ├── NavCard.test.tsx
    ├── SlideLayout.test.tsx
    ├── ThemeToggle.test.tsx
    └── icons/
        ├── MoonIcon.test.tsx
        └── SunIcon.test.tsx
```

## Global Setup (`src/test/setup.ts`)

```ts
import "@testing-library/jest-dom";
import { vi } from "vitest";

// IntersectionObserver mock — fires immediately as intersecting
const mockIntersectionObserver = vi.fn().mockImplementation((callback) => ({
  observe: vi.fn((el) => {
    callback([{ isIntersecting: true, target: el }], {});
  }),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
Object.defineProperty(window, "IntersectionObserver", {
  writable: true, configurable: true, value: mockIntersectionObserver,
});
```

## Mocks

### `next/link`

`next/link` is aliased in Vitest config to `src/test/mocks/next-link.tsx` — renders a plain `<a>` tag so href assertions work without Next.js router context.

### `IntersectionObserver`

Globally mocked in `setup.ts`. Fires `isIntersecting: true` immediately on `observe()` — ensures animation-triggered content is visible in tests.

### `localStorage` / DOM classes

Tests that touch `ThemeToggle` manipulate DOM state directly:

```ts
beforeEach(() => {
  document.documentElement.classList.remove("dark");
  localStorage.clear();
});
```

## Test Patterns

### Render + query

Standard RTL pattern throughout:

```ts
render(<Component prop="value" />);
expect(screen.getByRole("button", { name: /label/i })).toBeInTheDocument();
```

### Interaction

`fireEvent` used for click events (not `userEvent` — simpler for sync toggles):

```ts
await act(async () => {
  fireEvent.click(screen.getByRole("button"));
});
```

### Accessibility assertions

Tests verify ARIA roles and labels, not just text:

```ts
screen.getByRole("heading", { level: 1, name: "The History of CSS" })
screen.getByRole("link", { name: /back to overview/i })
screen.getByRole("button", { name: /toggle light\/dark mode/i })
```

### Accordion state

`CssTimeline` tests verify `aria-expanded` state transitions:

```ts
expect(screen.getAllByRole("button")[0]).toHaveAttribute("aria-expanded", "true");
```

## Scripts

```bash
yarn test              # vitest run (single pass)
yarn test:watch        # vitest (watch mode)
yarn test:coverage     # vitest run --coverage
```

Coverage output: `coverage/` directory (HTML at `coverage/lcov-report/index.html`).

## Coverage Scope

- **Included:** `src/**/*.{ts,tsx}`
- **Excluded:** `src/test/**`, `src/app/layout.tsx` (theme script not testable in jsdom)
- Coverage was run and artifacts exist in `coverage/`

---
*Last mapped: 2026-04-28*
