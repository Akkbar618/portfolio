# Changelog Guide

This repository keeps a human-readable changelog in `CHANGELOG.md`.

## When to Add an Entry

Add a changelog entry for any change that affects:

- User-visible behavior or UI.
- Security, performance, or accessibility.
- Build/CI/release process.
- Developer workflow or architecture standards.

## Entry Sections

Use one or more of these categories:

- `Added`
- `Changed`
- `Fixed`
- `Security`
- `Performance`
- `Docs`

## Technical Change Template

Use this short template when writing an entry:

```markdown
### [YYYY-MM-DD] Short Title
- Type: Added | Changed | Fixed | Security | Performance | Docs
- Scope: Files/modules touched
- Why: Problem or risk addressed
- Impact: User-facing and/or DX impact
- Validation: Commands/tests run
```

## Example

```markdown
### [2026-02-06] Add full CI pipeline command
- Type: Changed
- Scope: package.json, .github/workflows/ci.yml
- Why: Reduce drift between local validation and GitHub Actions
- Impact: One command now verifies lint, tests, build, e2e, and bundle budget
- Validation: npm run ci:full
```

## Process

1. Update changelog in the same PR as the code change.
2. Keep entries concise and factual.
3. Reference related docs if needed (`docs/RELEASE_CHECKLIST.md`, `CONTRIBUTING.md`).
4. For large features, add a summary plus links to detailed docs/PR.
