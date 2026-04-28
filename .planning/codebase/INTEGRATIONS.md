# External Integrations

**Analysis Date:** 2026-04-28

## APIs & External Services

None. This is a self-contained static presentation application. No third-party API clients, SDKs, or external HTTP calls exist in the source code.

## Data Storage

**Databases:**
- None. No database connection or ORM is present.

**File Storage:**
- Local filesystem only. Static assets are served from `public/` (SVG icons).

**Caching:**
- None. No Redis, Memcached, or in-memory cache layer.

**Browser Storage:**
- `localStorage` — used by `src/components/ThemeToggle.tsx` to persist the user's dark/light theme preference across page loads. Key: `'theme'`. Values: `'light'` or `'dark'` (implicit).

## Authentication & Identity

**Auth Provider:**
- None. No authentication system is present.

## Fonts

**Google Fonts (via next/font/google):**
- Geist and Geist Mono are loaded at build time through Next.js's font optimization layer (`src/app/layout.tsx`). Font requests are proxied by Next.js — no direct Google Fonts CDN calls at runtime.

## Monitoring & Observability

**Error Tracking:**
- None.

**Logs:**
- None beyond default Next.js dev-server output.

## CI/CD & Deployment

**Hosting:**
- Likely Vercel — `public/vercel.svg` asset is present. No deployment config file (`vercel.json`, `Dockerfile`, etc.) is committed.

**CI Pipeline:**
- None detected. No `.github/workflows/`, `.circleci/`, or similar CI config files.

## Environment Configuration

**Required env vars:**
- None. The application requires no environment variables to build or run.

**Secrets location:**
- N/A. No secrets are used.

## Webhooks & Callbacks

**Incoming:**
- None.

**Outgoing:**
- None.

---

*Integration audit: 2026-04-28*
