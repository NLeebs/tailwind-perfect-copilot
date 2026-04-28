# Technology Stack

**Analysis Date:** 2026-04-28

## Languages

**Primary:**
- TypeScript 5.x - All application source files under `src/`
- CSS - `src/app/globals.css` (Tailwind v4 configuration and global styles)

**Secondary:**
- JavaScript - Config files (`eslint.config.mjs`, `postcss.config.mjs`, `vitest.config.mts`)

## Runtime

**Environment:**
- Node.js 22 (required — see `.nvmrc`, which contains `22`)

**Package Manager:**
- Yarn 1.22.22
- Lockfile: `yarn.lock` present

## Frameworks

**Core:**
- Next.js 16.2.3 - App Router, SSR/SSG, file-based routing under `src/app/`
- React 19.2.4 - UI component model; uses `useSyncExternalStore` for theme sync

**Testing:**
- Vitest 3.x - Test runner, replaces Jest; config at `vitest.config.mts`
- @testing-library/react 16.x - React component rendering in tests
- @testing-library/jest-dom 6.x - DOM assertion matchers
- @testing-library/user-event 14.x - User interaction simulation
- @testing-library/dom 10.x - Low-level DOM queries
- jsdom 26.x - Browser environment simulation for Vitest

**Build/Dev:**
- @tailwindcss/postcss 4.x - Tailwind v4 PostCSS integration
- PostCSS - Config at `postcss.config.mjs`
- @vitejs/plugin-react 4.x - React transform for Vitest

**Linting/Formatting:**
- ESLint 9.x - Config at `eslint.config.mjs` using flat config format
- eslint-config-next 16.2.3 - Next.js core-web-vitals + TypeScript rules

## Key Dependencies

**Critical:**
- `next` 16.2.3 - Framework core; App Router pages, fonts, metadata
- `react` / `react-dom` 19.2.4 - Component rendering
- `tailwindcss` 4.x - Utility-first CSS; configured entirely via `src/app/globals.css` (no `tailwind.config.js`)

**Infrastructure:**
- `next/font/google` - Loads Geist and Geist Mono fonts at build time (used in `src/app/layout.tsx`)
- `@vitest/coverage-v8` 3.x - V8-based code coverage reporting

## Configuration

**Tailwind:**
- No `tailwind.config.js` — all config lives in `src/app/globals.css` via `@theme` and `@custom-variant` blocks
- Dark mode: class-based custom variant `@custom-variant dark (&:where(.dark, .dark *))`
- Custom breakpoints: `--breakpoint-3xl: 1920px`, `--breakpoint-4xl: 2560px`
- Custom animation: `--animate-reveal-up: reveal-up 0.7s ease-out both`

**TypeScript:**
- Config: `tsconfig.json`
- Strict mode enabled
- Path alias `@/*` maps to `./src/*`
- Target: ES2017

**Build:**
- Next.js config: `next.config.ts` (minimal — only `devIndicators: false`)
- PostCSS config: `postcss.config.mjs`

**Test:**
- Config: `vitest.config.mts`
- Environment: jsdom
- Globals: enabled
- Setup file: `src/test/setup.ts`
- Coverage provider: v8; reporters: text, html, lcov
- Path alias `@/` mirrored in Vitest; `next/link` mocked via `src/test/mocks/next-link.tsx`

**Environment:**
- No `.env` files present
- No environment variables required — this is a static presentation app with no backend or secrets

## Platform Requirements

**Development:**
- Node.js 22 (`nvm use` reads `.nvmrc`)
- Yarn 1.x (`yarn dev`, `yarn build`, `yarn lint`, `yarn test`)

**Production:**
- Static-compatible Next.js export; public assets in `public/` (SVGs)
- Vercel SVG asset present (`public/vercel.svg`) — likely the intended deployment target

---

*Stack analysis: 2026-04-28*
