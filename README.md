# My Portfolio Website

Production portfolio built as a **frontend-only SPA** (no backend service in this repository).  
It is implemented with React + TypeScript and deployed to Vercel.

## Stack

- React 18
- TypeScript
- Vite
- React Router v6
- Tailwind CSS + shadcn/ui
- Vitest + React Testing Library
- Playwright

## Architecture

The app follows a modular structure:

```text
src/
  components/
    layout/       # App shell (navbar/layout wrappers)
    sections/     # Home page sections
    project/      # Project-detail page building blocks
    ui/           # Reusable UI primitives
  pages/          # Route entries (composition + routing concerns)
  hooks/          # Reusable stateful logic
  data/           # Static content/data for projects
  constants/      # Routes, animation timings, UI constants
  lib/            # Shared utilities (storage, URLs, monitoring, sanitizers)
```

Key conventions:

- Keep routing paths in `src/constants/routes.ts`.
- Keep storage access in `src/lib/storage.ts`.
- Keep page files thin; move logic into hooks/components.

## Local Development

Prerequisites:

- Node.js 18+
- npm

Run locally:

```bash
npm install
npm run dev
```

By default Vite runs on `http://localhost:5173`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview built bundle locally |
| `npm run lint` | Run ESLint |
| `npm run lint:cycles` | Check import cycles |
| `npm run test` | Run Vitest tests |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run check:bundle` | Enforce bundle budget |
| `npm run analyze` | Build with bundle visualizer |
| `npm run ci:full` | Full CI chain (`lint`, `test`, `test:e2e`, `build`, `check:bundle`) |

## Environment Variables

Optional environment variables:

- `VITE_SENTRY_DSN` for production monitoring (Sentry).
- `VITE_SOURCEMAP=true` to emit sourcemaps during build.

## Adding a New Page

1. Create page component in `src/pages/`.
2. Add route constant in `src/constants/routes.ts`.
3. Register route in `src/App.tsx` (prefer lazy loading for non-primary pages).
4. Add navigation entry if required (`src/components/layout/Navbar.tsx`).
5. Add tests:
   - Unit/integration tests for page logic.
   - E2E flow when page is user-facing navigation.

## Quality Gate

Before opening a PR:

```bash
npm run lint
npm run lint:cycles
npm run ci:full
```

See `CONTRIBUTING.md` and `docs/RELEASE_CHECKLIST.md` for detailed standards.
