# Contributing Guide

This project is a frontend SPA with a strict quality baseline for security, accessibility, and maintainability.

## Development Flow

1. Create a feature branch from `main`.
2. Keep commits focused and atomic.
3. Run local quality checks before opening a PR.
4. Fill out the PR template checklist.

## Architecture Rules

### Pages

- `src/pages/*` should focus on routing, data selection, and composition.
- Avoid large stateful logic in page files; extract to hooks/components.

### Components

- `src/components/*` should be presentational or page-local composition.
- Reusable UI goes to `src/components/ui`.
- Project-detail-specific UI goes to `src/components/project`.

### Hooks

- Shared stateful logic belongs in `src/hooks`.
- Hooks should be framework-idiomatic and side effects must clean up.
- If a hook changes behavior-critical flows, add/update tests.

### Utilities and Constants

- Route paths must come from `src/constants/routes.ts`.
- Browser storage access must go through `src/lib/storage.ts`.
- URL sanitization/validation must use existing utilities in `src/lib`.

## Testing Requirements

- New behavior requires tests.
- Critical user flows should be covered by Playwright in `tests/e2e`.
- Logic-heavy hooks/components should have Vitest coverage.
- Existing tests must remain green.

Required local commands:

```bash
npm run lint
npm run lint:cycles
npm run ci:full
```

## Content and Accessibility

- Do not merge placeholder content (`Coming Soon`, empty screenshots, fake links).
- Interactive controls must have accessible names and keyboard support.
- Carousels and dynamic sections should expose screen-reader announcements where needed.

## Documentation Expectations

- Update `README.md` when setup/architecture/scripts change.
- Add release-impact notes to `CHANGELOG.md`.
- Follow `docs/CHANGELOG_GUIDE.md` for technical entries.
