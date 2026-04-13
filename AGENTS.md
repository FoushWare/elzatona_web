# Agent Runtime Guidelines

This repository is optimized for low-resource development on 8GB RAM laptops.

## Default Policy

- Prefer focused searches over broad scans.
- Prefer low-memory scripts over heavyweight workflows.
- Do not run multiple heavy jobs in parallel (for example: Sonar full scan + E2E + dev servers).
- Use CLI Sonar workflows before enabling Java-based editor analysis.

## Required Commands for Low-RAM Work

- `npm run dev:low-ram`
- `npm run dev:low-ram:admin`
- `npm run check:low-ram`
- `npm run sonar:report:blockers`
- `npm run sonar:report:new-code`
- `npm run sonar:light`
- `npm run cleanup:build-cache`
- `npm run system:memory`

## Sonar Fixing Flow

1. Run `npm run sonar:report:blockers`.
2. Fix listed issues only.
3. Run `npm run sonar:report:new-code`.
4. Run `npm run sonar:light` if verification is still needed.

## Instruction Source

- Copilot policies: `.github/copilot-instructions.md`
- Claude workspace rules: `.claude/CLAUDE.md`
