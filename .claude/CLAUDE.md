# Claude Workspace Instructions

Use low-resource workflows by default in this repository.

## Rules

- Prefer targeted reads/searches.
- Avoid starting heavyweight parallel tasks.
- Use report-first Sonar flow before full scans.

## Preferred Commands

- `npm run dev:low-ram`
- `npm run check:low-ram`
- `npm run sonar:report:blockers`
- `npm run sonar:report:new-code`
- `npm run sonar:light`
- `npm run cleanup:build-cache`
- `npm run system:memory`

## Reference

- `.github/copilot-instructions.md`
- `AGENTS.md`
