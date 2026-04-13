---
description: Antigravity low-resource execution template for this repository.
---

## Antigravity Agent Defaults

Apply low-memory behavior by default:

- Keep tool calls scoped and concise.
- Use low-memory scripts first.
- Prefer report-first Sonar workflow.

## Commands

- `npm run dev:low-ram`
- `npm run check:low-ram`
- `npm run sonar:report:blockers`
- `npm run sonar:report:new-code`
- `npm run sonar:light`
- `npm run cleanup:build-cache`
- `npm run system:memory`

## Notes

- Avoid parallel heavy operations on 8GB machines.
- Prefer CLI Sonar checks over always-on Java analyzers.
