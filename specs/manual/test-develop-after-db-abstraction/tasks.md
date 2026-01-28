# tasks.md

## Setup

- [ ] 001-create-spec-folder: Create feature spec folder and add plan.md & tasks.md
- [ ] 002-ensure-git-hooks: Ensure permissive pre-push hook present (non-blocking until cleaned)
- [x] 001-create-spec-folder: Create feature spec folder and add plan.md & tasks.md
- [x] 002-ensure-git-hooks: Ensure permissive pre-push hook present (non-blocking until cleaned)

## Tests

- [ ] 101-fix-jest-setup: Repair `apps/website/jest.setup.js` parse/runtime issues
- [ ] 102-update-mocks: Convert anonymous default exports in test mocks to named exports
- [ ] 103-convert-requires: Replace local `require('./...')` usages in tests with ES imports
- [x] 101-fix-jest-setup: Repair `apps/website/jest.setup.js` parse/runtime issues
- [x] 102-update-mocks: Convert anonymous default exports in test mocks to named exports
- [x] 103-convert-requires: Replace local `require('./...')` usages in tests with ES imports

## Core

- [ ] 201-fix-types: Fix TypeScript errors in tests and mocks (e.g., react-syntax-highlighter props)
- [ ] 202-run-tc: Run `npx tsc --noEmit` and resolve blocking errors

## Integration

- [ ] 301-lint-fix: Run ESLint autofix and address blocking rules (no-require-imports, import/no-anonymous-default-export)
- [ ] 302-sonar: Run Sonar quick scan and address critical issues

## Polish

- [ ] 401-reduce-any: Systematic pass to remove `any` hotspots; add types or local exceptions
- [ ] 402-reenable-hooks: Re-enable strict hooks after CI is green

> Notes:
>
> - Mark tasks as completed by updating this file with `- [X]`.
> - Follow the plan in small batches and push changes progressively.
