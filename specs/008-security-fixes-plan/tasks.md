# Tasks: Comprehensive Security & Code Quality Fixes

## Phase 1: Setup

- [x] T001 Create 008-security-fixes-plan branch from main
- [x] T002 Create project documentation structure in specs/008-security-fixes-plan/
- [x] T003 [P] Copy plan.md, spec.md, research.md, data-model.md, quickstart.md templates

## Phase 2: Foundational

- [x] T004 [P] Validate SonarCloud CI and Prettier formatting in .github/workflows/
- [x] T005 [P] Validate gitleaks config in .gitleaks.toml
- [x] T006 [P] Validate nx monorepo config in nx.json, apps/, libs/

## Phase 3: PR01 - Next.js CVE Upgrade

- [x] T007 [P] [US1] Update next version in package.json, apps/admin/package.json, apps/website/package.json
- [x] T008 [US1] Run npm install and regenerate lockfile
- [x] T009 [US1] Verify build with npx nx run-many --target=build --all
- [ ] T010 [US1] Commit upgrade with message in contracts/PR01-nextjs-cve-upgrade.md

## Phase 4: PR02 - Sonar Blocker Auth Config

- [x] T011 [P] [US2] Read apps/website/src/app/lib/auth-config.ts
- [x] T012 [US2] Refactor function at line 47 to return different values based on input
- [x] T013 [US2] Verify build with npx nx run website:build
- [ ] T014 [US2] Commit fix with message in contracts/PR02-sonar-blocker-auth-config.md

## Phase 5: PR03 - Sonar Quick Fixes

- [x] T015 [P] [US3] Refactor mutable let exports to const in homePageHelpers.ts, supabase-server.ts
- [x] T016 [US3] Remove void operator in ErrorBoundary.tsx
- [x] T017 [US3] Refactor Promise.resolve/reject in ProblemSolvingEditorUtils.ts, FrontendTaskEditorUtils.ts
- [x] T018 [US3] Add compare function to sort in validation.ts
- [ ] T019 [US3] Commit fixes with message in contracts/PR03-sonar-quick-fixes.md

## Phase 6: PR04 - Sonar Nested Functions

- [ ] T020 [P] [US4] Extract deeply nested functions in LearningCardsManager.tsx, PlansManager.tsx, hierarchy/route.ts
- [ ] T021 [US4] Refactor callbacks to named component-level functions
- [ ] T022 [US4] Commit fixes with message in contracts/PR04-sonar-nested-functions.md

## Phase 7: PR05 - Sonar Complexity API Routes

- [x] T023 [P] [US5] Refactor unified/route.ts, unified/[id]/route.ts, plans/route.ts, plan-details/[planId]/route.ts, questions/route.ts, dashboard/stats/route.ts, plans/[id]/hierarchy/route.ts
- [x] T024 [US5] Decompose main functions into helper functions per contract
- [ ] T025 [US5] Commit fixes with message in contracts/PR05-sonar-complexity-api-routes.md

## Phase 8: PR06 - Sonar Complexity UI Components

- [x] T026 [P] [US6] Refactor NavbarSimple.tsx, EnhancedDashboard.tsx, ProblemSolvingEditorComponents.tsx, FrontendTaskEditorComponents.tsx, admin-learning-cards/editors/
- [x] T027 [US6] Extract nav sections and editor rendering into helpers/sub-components
- [ ] T028 [US6] Commit fixes with message in contracts/PR06-sonar-complexity-ui-components.md

## Phase 9: PR07 - Sonar Complexity Utils

- [x] T029 [P] [US7] Refactor markdown-question-parser.ts, validation.ts, helpers/homePageHelpers.ts
- [x] T030 [US7] Decompose parser and validation logic into stages/functions
- [ ] T031 [US7] Commit fixes with message in contracts/PR07-sonar-complexity-utils.md

## Phase 10: PR08 - Gitleaks Docs Secrets

- [x] T032 [P] [US8] Replace hardcoded secrets in documentation files listed in contracts/PR08-gitleaks-docs-secrets.md
- [x] T033 [US8] Update .gitleaks.toml allowlist for docs
- [x] T034 [US8] Commit fixes with message in contracts/PR08-gitleaks-docs-secrets.md

## Phase 11: PR09 - Gitleaks Scripts Secrets

- [ ] T035 [P] [US9] Move hardcoded secrets in scripts to env vars per contracts/PR09-gitleaks-scripts-secrets.md
- [ ] T036 [US9] Create/update .env.example with required keys
- [ ] T037 [US9] Commit fixes with message in contracts/PR09-gitleaks-scripts-secrets.md

## Phase 12: PR10 - Gitleaks Artifacts Cleanup

- [x] T038 [P] [US10] Delete build artifacts (playwright-report/index.html, static/main.js, playwright-report/) per contracts/PR10-gitleaks-artifacts-cleanup.md
- [x] T039 [US10] Update .gitignore to prevent future commits
- [ ] T040 [US10] Commit fixes with message in contracts/PR10-gitleaks-artifacts-cleanup.md

## Phase 13: Existing PR Pipeline Resolution

- [ ] T041 [P] Rebase and verify CI for PRs #7510–#7513 (MERGEABLE)
- [ ] T042 [P] Rebase, resolve conflicts, and push for PRs #7514–#7517 (UNKNOWN)

## Final Phase: Polish & Cross-Cutting

- [ ] T043 [P] Run SonarQube scan and verify quality gate PASS
- [ ] T044 [P] Run code scanning workflow and verify 0 open alerts
- [ ] T045 [P] Run npx nx run-many --target=build --all and lint --all
- [ ] T046 [P] Verify all PRs merged, no new HIGH/BLOCKER issues

## Dependencies

- PR01, PR02, PR10 (Critical) → PR03, PR04 (Quick/Medium) → PR05, PR06, PR07 (Complexity) → PR08, PR09 (Secrets)
- Existing PRs must be resolved before new PRs

## Parallel Execution Examples

- T007, T011, T038 ([US1], [US2], [US10]) can be run in parallel (different files)
- T015, T016, T017 ([US3]) can be run in parallel (different files)
- T032, T035 ([US8], [US9]) can be run in parallel (docs vs scripts)

## MVP Scope

- PR01, PR02, PR10 (Critical fixes) — minimum for Constitution compliance

## Format Validation

- All tasks follow strict checklist format: checkbox, TaskID, [P] if parallel, [USx] if user story, file path

---
