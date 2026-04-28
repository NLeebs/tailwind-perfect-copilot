# Directory Structure
*Mapped: 2026-04-28*

## Root Layout

```
tailwind-perfect-copilot/
├── src/
│   ├── app/                  # Next.js App Router pages + global config
│   ├── components/           # Shared React components
│   └── test/                 # Vitest test suite (mirrors src/ structure)
├── public/                   # Static assets served at /
├── coverage/                 # Generated coverage reports (gitignored)
├── .planning/                # GSD planning artifacts
├── .claude/                  # Claude Code settings
├── next.config.ts            # Next.js config
├── vitest.config.mts         # Vitest config
├── postcss.config.mjs        # PostCSS (Tailwind v4 plugin)
├── tsconfig.json             # TypeScript config
├── package.json              # Dependencies and scripts
├── .nvmrc                    # Node version pin (22)
└── CLAUDE.md                 # Project instructions for Claude Code
```

## `src/app/` — App Router Pages

Each slide topic is its own page file. The home page renders a nav grid.

```
src/app/
├── globals.css               # Tailwind @import, @theme blocks, base styles
├── layout.tsx                # Root layout: fonts, ThemeToggle, theme-init script
├── page.tsx                  # Home page — NavCard grid for all slides
├── history-of-css/
│   └── page.tsx              # Slide 01: CSS history timeline (CssTimeline)
├── what-is-tailwind/
│   └── page.tsx              # Slide 02: What is Tailwind?
├── utility-classes/
│   └── page.tsx              # Slide 03: Utility classes overview
├── responsiveness-dark-mode/
│   └── page.tsx              # Slide 04: Responsiveness & dark mode
├── customizing-tailwind/
│   └── page.tsx              # Slide 05: Customizing Tailwind
└── conditional-styling/
    └── page.tsx              # Slide 06: Conditional styling
```

## `src/components/` — Shared Components

```
src/components/
├── SlideLayout.tsx           # Shared wrapper for all slide pages (nav bar, h1, chrome)
├── ThemeToggle.tsx           # Fixed dark/light toggle button (bottom-right)
├── NavCard.tsx               # Link card used in the home page grid
├── CssTimeline.tsx           # Accordion timeline for the history-of-css slide
└── icons/
    ├── SunIcon.tsx           # SVG sun icon
    └── MoonIcon.tsx          # SVG moon icon
```

## `src/test/` — Test Suite

Mirrors the `src/` structure. Uses `@/` alias for imports.

```
src/test/
├── setup.ts                  # Global test setup (jest-dom, IntersectionObserver mock)
├── mocks/
│   └── next-link.tsx         # Mock for next/link (aliased in vitest.config)
├── app/
│   ├── page.test.tsx         # Home page tests
│   ├── history-of-css/
│   │   └── page.test.tsx     # History slide tests
│   └── slide-pages.test.tsx  # Generic slide page smoke tests
└── components/
    ├── CssTimeline.test.tsx  # Timeline accordion interaction tests
    ├── NavCard.test.tsx      # NavCard render tests
    ├── SlideLayout.test.tsx  # SlideLayout render/fallback tests
    ├── ThemeToggle.test.tsx  # ThemeToggle interaction tests
    └── icons/
        ├── MoonIcon.test.tsx
        └── SunIcon.test.tsx
```

## Key File Locations

| Purpose | File |
|---------|------|
| Tailwind config (v4) | `src/app/globals.css` (`@theme` blocks) |
| Custom dark mode variant | `src/app/globals.css` (`@custom-variant dark`) |
| Custom breakpoints (3xl, 4xl) | `src/app/globals.css` |
| Global h1 base style | `src/app/globals.css` (`@layer base`) |
| Theme persistence script | `src/app/layout.tsx` (inline `<script>`) |
| Path alias `@/` → `src/` | `tsconfig.json` + `vitest.config.mts` |
| Slide registry | `src/app/page.tsx` (`slides` array) |

## Naming Conventions

- **Page files:** `src/app/<slug>/page.tsx` — kebab-case route slugs
- **Components:** PascalCase filename, default export (`SlideLayout.tsx`)
- **Test files:** `<Component>.test.tsx` co-located in `src/test/` mirror
- **Icon components:** `src/components/icons/<Name>Icon.tsx`
- **Slide numbers:** Zero-padded 2-digit strings (`"01"`, `"06"`)

---
*Last mapped: 2026-04-28*
