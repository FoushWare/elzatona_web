# Implementation Plan: Comprehensive Security & Code Quality Fixes

**Branch**: `008-security-fixes-plan` | **Date**: 2026-02-15 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/008-security-fixes-plan/spec.md`

## Summary

Resolve all security vulnerabilities and code quality issues in the elzatona_web repository to achieve Constitution compliance: 0 Critical/High vulnerabilities and SonarQube quality gate PASS. This plan produces **10 PRs** organized by priority, targeting 3 Trivy CVEs, ~97 Gitleaks secret alerts, and 93 SonarQube HIGH/BLOCKER issues. Additionally, 8 existing fix PRs (#7510–#7517) need pipeline resolution.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 20+, Next.js 16.1.0 → 16.1.5
**Primary Dependencies**: Next.js (App Router), React 19, Supabase, Firebase, Nx 21.x, Tailwind CSS
**Storage**: Supabase (PostgreSQL), Firebase Firestore
**Testing**: Vitest (unit), Playwright (E2E)
**Target Platform**: Vercel (production), Linux containers (CI)
**Project Type**: Web (Nx monorepo with 2 apps + 11 libs)
**Performance Goals**: N/A (security/quality remediation, no new features)
**Constraints**: All PRs must pass SonarCloud CI, Prettier formatting, TypeScript strict mode
**Scale/Scope**: ~100 files affected across 10 PRs, resolving ~193 total alerts

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- [x] **Spec-Driven**: Feature has a detailed spec in `specs/008-security-fixes-plan/spec.md`
- [x] **Testable**: Each PR contract includes verification steps; existing tests must not break
- [x] **Strict Types**: No `any` types introduced; strict mode maintained throughout
- [x] **Security**: All fixes directly address security vulnerabilities (CVEs, leaked secrets, code smells)
- [x] **Predictable**: Each PR maps to specific alerts with measurable outcomes (alert count → 0)

### Post-Design Re-Evaluation ✅

- [x] **Spec-Driven**: 10 detailed PR contracts created in `contracts/`
- [x] **Testable**: Each contract specifies verification commands (`npx next build`, SonarQube scan)
- [x] **Strict Types**: Refactored functions maintain type safety; no `any` introduced
- [x] **Security**: Covers all 3 CVEs, ~97 secrets, 93 code quality issues, 8 PR pipeline fixes
- [x] **Predictable**: Execution order defined with dependencies in quickstart.md

## Project Structure

### Documentation (this feature)

```text
specs/008-security-fixes-plan/
├── plan.md              # This file (implementation plan)
├── spec.md              # Feature specification
├── research.md          # Phase 0: research findings
├── data-model.md        # Phase 1: affected code inventory
├── quickstart.md        # Phase 1: 10-PR execution overview
├── contracts/
│   ├── PR01-nextjs-cve-upgrade.md
│   ├── PR02-sonar-blocker-auth-config.md
│   ├── PR03-sonar-quick-fixes.md
│   ├── PR04-sonar-nested-functions.md
│   ├── PR05-sonar-complexity-api-routes.md
│   ├── PR06-sonar-complexity-ui-components.md
│   ├── PR07-sonar-complexity-utils.md
│   ├── PR08-gitleaks-docs-secrets.md
│   ├── PR09-gitleaks-scripts-secrets.md
│   └── PR10-gitleaks-artifacts-cleanup.md
└── tasks.md             # Phase 2 output (NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
# Nx Monorepo — Files Affected by This Plan
apps/
├── admin/
│   ├── package.json                          # PR01: Next.js upgrade
│   └── src/app/
│       ├── (app)/api/unified/route.ts        # PR05: CC=246 (most complex)
│       ├── (app)/api/plans/route.ts          # PR05: CC=48
│       ├── (app)/api/plan-details/[planId]/route.ts  # PR05: CC=48,41,38
│       ├── (app)/api/questions/route.ts      # PR05: CC=37
│       ├── (app)/api/dashboard/stats/route.ts # PR05: CC=31
│       ├── (app)/api/plans/[id]/hierarchy/route.ts   # PR04,05
│       └── (app)/components/
│           ├── NavbarSimple.tsx               # PR06: CC=35
│           ├── PlansManager.tsx               # PR04: nested funcs
│           ├── LearningCardsManager.tsx       # PR04: nested funcs
│           └── admin-learning-cards/editors/  # PR06
├── website/
│   ├── package.json                          # PR01: Next.js upgrade
│   └── src/app/components/
│       └── ErrorBoundary.tsx                 # PR03: void operator
libs/
├── utilities/src/lib/
│   ├── markdown-question-parser.ts           # PR07: CC=71
│   ├── validation.ts                         # PR07: CC=51
│   └── helpers/homePageHelpers.ts            # PR03: mutable export
├── common-ui/src/lib/
│   ├── ProblemSolvingEditorUtils.ts          # PR03: Promise.resolve
│   └── FrontendTaskEditorUtils.ts            # PR03: Promise.resolve
├── hooks/src/lib/
│   └── useSettings.ts                        # PR03: mutable export
├── auth/src/lib/
│   └── auth-config.ts                        # PR02: BLOCKER S3516
scripts/
│   ├── test-firestore-connection.mjs         # PR09: hardcoded key
│   ├── test-progress-api.mjs                 # PR09: hardcoded key
│   ├── populate-learning-plans.mjs           # PR09: hardcoded key
│   ├── create-admin-user.mjs                 # PR09: hardcoded key
│   ├── setup-vercel-env.sh                   # PR09: hardcoded key
│   └── fix-vercel-env.sh                     # PR09: hardcoded key
playwright-report/index.html                  # PR10: contains AWS key
static/main.js                                # PR10: contains API keys
```

**Structure Decision**: Existing Nx monorepo structure is maintained. No new libs or apps are created. All changes are in-place fixes to existing files. Build artifacts (`playwright-report/`, `static/`) will be deleted and gitignored.

## PR Execution Order

| Phase | PR#  | Branch                               | Priority    | Est. Time | Dependency  |
| ----- | ---- | ------------------------------------ | ----------- | --------- | ----------- |
| 1     | PR01 | `fix/nextjs-cve-upgrade`             | 🔴 CRITICAL | 15 min    | None        |
| 1     | PR02 | `fix/sonar-blocker-auth-config`      | 🔴 CRITICAL | 15 min    | None        |
| 1     | PR10 | `fix/gitleaks-artifacts-cleanup`     | 🔴 HIGH     | 15 min    | None        |
| 2     | PR03 | `fix/sonar-quick-fixes`              | 🟡 MEDIUM   | 30 min    | None        |
| 2     | PR04 | `fix/sonar-nested-functions`         | 🟡 MEDIUM   | 45 min    | None        |
| 3     | PR05 | `fix/sonar-complexity-api-routes`    | 🟡 MEDIUM   | 3 hrs     | PR03 merged |
| 3     | PR06 | `fix/sonar-complexity-ui-components` | 🟡 MEDIUM   | 1.5 hrs   | PR04 merged |
| 3     | PR07 | `fix/sonar-complexity-utils`         | 🟡 MEDIUM   | 1 hr      | None        |
| 4     | PR08 | `fix/gitleaks-docs-secrets`          | 🟢 LOW      | 30 min    | None        |
| 4     | PR09 | `fix/gitleaks-scripts-secrets`       | 🟢 LOW      | 30 min    | None        |

## Existing PR Pipeline Resolution

Before creating new PRs, resolve the 8 existing PRs:

### Ready to Merge (MERGEABLE)

1. **#7510** `fix/clear-text-logging` — Rebase onto main, verify CI passes, merge
2. **#7511** `fix/insecure-randomness` — Rebase onto main, verify CI passes, merge
3. **#7512** `fix/double-escaping` — Rebase onto main, verify CI passes, merge
4. **#7513** `fix/incomplete-sanitization` — Rebase onto main, verify CI passes, merge

### Need Rebase (UNKNOWN status)

5. **#7514** `fix/xss-through-dom` — Rebase onto main, resolve conflicts, push
6. **#7515** `fix/incomplete-multi-char-sanitization` — Rebase onto main, resolve conflicts, push
7. **#7516** `fix/shell-command-injection` — Rebase onto main, resolve conflicts, push
8. **#7517** `fix/missing-rate-limiting` — Rebase onto main, resolve conflicts, push

### SonarCloud CI Note

SonarCloud Automatic Analysis is enabled on the repo, which may conflict with CI-based scanner. If the SonarCloud CI step fails, this is expected — the Automatic Analysis on SonarCloud.io will still run. The sonar-project.properties file at root configures the scanner.

## Workflow for Shipper Model

```bash
# For each PR (1-10):
git checkout main && git pull
git checkout -b <branch-name>

# Follow the contract in specs/008-security-fixes-plan/contracts/PR<##>-*.md
# Make all changes specified
# Run verification commands from the contract

# Commit and push
git add -A
git commit -m "<commit message from contract>"
git push -u origin <branch-name>

# Create PR targeting main
gh pr create --title "<PR title>" --body "Closes security/quality issues per spec 008" --base main
```

## Verification Checklist (Post All Merges)

- [ ] `gh api repos/{owner}/{repo}/code-scanning/alerts?state=open | jq length` returns 0
- [ ] SonarQube quality gate shows PASS on main
- [ ] `npx nx run-many --target=build --all` succeeds
- [ ] `npx nx run-many --target=lint --all` succeeds
- [ ] All 8 existing PRs (#7510–#7517) merged or closed
- [ ] No new HIGH/BLOCKER issues introduced
