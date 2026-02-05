# Changelog

This file is based on the commit history of `main`. There are no Git tags or GitHub releases, so "versions" and "subversions" below correspond to sequential commits on `main`, ordered by date.

## Version 1 — 2026-01-30 (commit `d92841a`)
- Initial project scaffold and configuration (Vite + React + TypeScript, Tailwind, ESLint, Vitest).
- Routing and pages: `Index`, `ProjectDetail`, `NotFound`.
- Core UI helpers and hooks: animated sections, nav links, toasts/tooltips, scroll animation.
- Base data and assets: project data, placeholders, resume PDF, avatar, global styles.

## Version 2 — 2026-01-31 (commit `b215e7e`)
- Refactored architecture into section components (`Hero`, `About`, `Projects`, `TechStack`, `Footer`).
- Added theme support via `useTheme` and dark mode styling.
- SEO/branding updates in `index.html` and added `public/og-image.png`.

## Version 3 — 2026-01-31 (commit `7d826ec`)
- Responsive fixes using `dvh` units and sticky behavior in `TechStack`.
- Projects carousel redesign with infinite loop and swipe support.
- Added directional animations (slide/scale/blur) and mobile spacing improvements.
- Added `CHANGES_CODEX.md` (later removed).

## Version 4 — 2026-01-31 (commit `75b70de`)
- Content polish for About/Hero with more senior/engineering tone.
- Mobile UX improvements: swipe hints, horizontal scroll for tech stack, footer layout tweaks.
- Visual polish: unified stats style, glass-style icons, hand-drawn stroke.
- Updated project descriptions; fixed drag and spacing issues.

## Version 5 — 2026-02-01 (commit `091bc43`)
- Bundle size reduction and cleanup (removed unused assets and files).
- Dynamic SEO via `react-helmet-async` and page metadata updates.
- New components: `BackToTop`, `ProjectCard`, `PageLoader`.
- Removed old toast system and test scaffolding; refined styles and project detail page.
- Enabled stricter TypeScript settings and simplified configs.

## Version 6 — 2026-02-02 (commit `b2907fa`)
- Performance: optimized image loading, scroll-spy via IntersectionObserver, throttled high-frequency events, manualChunks tuning.
- Code quality: strict TS, global `ErrorBoundary`, better broken-image handling.
- Architecture: introduced layout components (`MainLayout`, `Navbar`, `Footer`), deduplicated project data, added `useSwipe`.
- UX/Accessibility: system theme sync, deep-linking/scroll restoration, improved ARIA/keyboard support.
- Housekeeping: removed dead code; README update with detailed features.

## Version 6.1 — 2026-02-02 (commit `6b4f8e6`)
- Removed `manualChunks` in `vite.config.ts` to fix a circular dependency error.

## Version 6.2 — 2026-02-02 (commit `6fbcb9a`)
- Build config updates: improved `manualChunks`, conditional sourcemaps, React Router v7 future flags.
- E2E testing: added Playwright config, `test:e2e` script, CI workflow, smoke tests.
- Documentation updates in README.

## Version 6.3 — 2026-02-05 (commit `5c9583f`)
- Added synced blinking underscore animation for favicon/logo (`useBlink`, `useDynamicFavicon`).
- Updated footer text and related UI tweaks.
- Refreshed preview and avatar assets.

## Version 6.4 — 2026-02-05 (commit `993b4c0`)
- Added Inter font asset and wired it into styles and `index.html`.
- Restored `src/test/setup.ts` and updated `vitest.config.ts`.
- Minor layout/style refinements.