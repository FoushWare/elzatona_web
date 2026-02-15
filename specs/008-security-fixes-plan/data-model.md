# Data Model: Security & Code Quality Fixes

**Date**: 2026-02-15 | **Spec**: 008-security-fixes-plan

This feature is a code quality / security remediation — no new data entities are created.
The "data model" here describes the affected code areas and their relationships.

## Affected Code Areas

### Area 1: Package Dependencies

| Entity         | Location                    | Change                       |
| -------------- | --------------------------- | ---------------------------- |
| next (admin)   | `apps/admin/package.json`   | 16.1.0 → 16.1.5              |
| next (website) | `apps/website/package.json` | 16.1.0 → 16.1.5              |
| next (root)    | `package.json`              | 16.1.0 → 16.1.5 (if present) |

### Area 2: Documentation Files with Secrets

| File                                            | Secret Type                      | Action                                  |
| ----------------------------------------------- | -------------------------------- | --------------------------------------- |
| `CHATGPT_SETUP.md`                              | generic-api-key                  | Replace with placeholder                |
| `CHATGPT_COMPLETE_SETUP.md`                     | generic-api-key                  | Replace with placeholder                |
| `CHATGPT_SETUP_SUMMARY.md`                      | generic-api-key                  | Replace with placeholder                |
| `FIREBASE_SETUP.md`                             | generic-api-key                  | Replace with placeholder                |
| `FIREBASE_PROGRESS_SETUP.md`                    | generic-api-key                  | Replace with placeholder                |
| `FIREBASE_QUESTIONS_SETUP.md`                   | generic-api-key                  | Replace with placeholder                |
| `DAILY_SETUP.md`                                | generic-api-key                  | Replace with placeholder                |
| `GROQ_SETUP.md`                                 | generic-api-key                  | Replace with placeholder                |
| `FREE_AI_SETUP.md`                              | generic-api-key                  | Replace with placeholder                |
| `HUMAN_TTS_SETUP.md`                            | generic-api-key                  | Replace with placeholder                |
| `DEVELOPMENT_SETUP.md`                          | generic-api-key                  | Replace with placeholder                |
| `ISSUES_RESOLUTION_REPORT.md`                   | generic-api-key                  | Replace with placeholder                |
| `References/debugging-web-scrapping.md`         | generic-api-key                  | Replace with placeholder                |
| `QuestionsBank/security/questions.md`           | generic-api-key + supabase-key   | Replace with placeholder                |
| `QuestionsBank/english-learning/questions.md`   | supabase-key                     | Replace with placeholder                |
| `scripts/setup-vercel-env.md`                   | google-api-key                   | Replace with placeholder                |
| `scripts/setup-vercel-env.sh`                   | google-api-key                   | Replace with placeholder                |
| `scripts/fix-vercel-env.sh`                     | google-api-key                   | Replace with placeholder                |
| `scripts/test-firestore-connection.mjs`         | google-api-key                   | Move to env var                         |
| `scripts/test-progress-api.mjs`                 | google-api-key                   | Move to env var                         |
| `scripts/populate-learning-plans.mjs`           | google-api-key                   | Move to env var                         |
| `scripts/create-admin-user.mjs`                 | google-api-key                   | Move to env var                         |
| `playwright-report/index.html`                  | aws-access-key                   | Delete file (build artifact)            |
| `static/main.js`                                | generic-api-key + aws-access-key | Delete file (build artifact)            |
| `src/lib/firebase.ts`                           | google-api-key                   | Historical — file may not exist on HEAD |
| `src/app/api/questions/[learningPath]/route.ts` | google-api-key                   | Historical — file may not exist on HEAD |

### Area 3: SonarQube Cognitive Complexity (S3776)

Files sorted by worst cognitive complexity score:

| File                                                                                     | Function Line | Score | Target |
| ---------------------------------------------------------------------------------------- | ------------- | ----- | ------ |
| `apps/website/src/app/lib/network/routes/questions/unified/route.ts`                     | L310          | 246   | ≤15    |
| `apps/website/src/app/lib/network/routes/questions/unified/route.ts`                     | L43           | 24    | ≤15    |
| `apps/website/src/app/lib/network/routes/questions/unified/route.ts`                     | L184          | 20    | ≤15    |
| `apps/website/src/app/lib/network/routes/questions/unified/route.ts`                     | L1207         | 74    | ≤15    |
| `apps/website/src/app/lib/network/routes/questions/unified/[id]/route.ts`                | L68           | 82    | ≤15    |
| `apps/website/src/app/lib/markdown-question-parser.ts`                                   | L137          | 71    | ≤15    |
| `apps/website/utilities/validation.ts`                                                   | L282          | 51    | ≤15    |
| `apps/website/src/app/lib/network/routes/guided-learning/plans/route.ts`                 | L11           | 48    | ≤15    |
| `apps/website/src/app/lib/network/routes/guided-learning/plan-details/[planId]/route.ts` | L6            | 41    | ≤15    |
| `apps/website/src/app/lib/network/routes/guided-learning/plan-details/[planId]/route.ts` | L1207         | 38    | ≤15    |
| `apps/website/src/app/lib/network/routes/plans/[id]/hierarchy/route.ts`                  | L17           | 38    | ≤15    |
| `apps/website/src/app/lib/network/routes/questions/route.ts`                             | L5            | 37    | ≤15    |
| `libs/common-ui/src/common/NavbarSimple.tsx`                                             | L129          | 35    | ≤15    |
| `apps/website/src/app/lib/network/routes/dashboard/stats/route.ts`                       | L113          | 31    | ≤15    |
| `apps/website/src/app/lib/network/routes/dashboard/stats/route.ts`                       | L12           | 29    | ≤15    |
| `apps/website/src/app/lib/frontend-task-validator.ts`                                    | L264          | 27    | ≤15    |
| `libs/common-ui/src/admin/editors/ProblemSolvingEditorComponents.tsx`                    | L151          | 26    | ≤15    |
| `apps/website/src/app/lib/test-env-loader.ts`                                            | L26           | 26    | ≤15    |
| `apps/website/src/app/lib/network/routes/check-project/route.ts`                         | L19           | 22    | ≤15    |
| `apps/website/src/app/lib/sync-progress-on-login.ts`                                     | L36           | 22    | ≤15    |
| `apps/website/src/app/features/guided-learning/hooks/useGuidedLearningAuth.ts`           | L19           | 21    | ≤15    |
| `apps/website/src/app/lib/network/routes/progress/save/route.ts`                         | L37           | 21    | ≤15    |
| `libs/common-ui/src/admin/editors/FrontendTaskEditorComponents.tsx`                      | L169          | 20    | ≤15    |
| `libs/common-ui/src/common/EnhancedDashboard.tsx`                                        | L98           | 18    | ≤15    |
| `apps/website/src/app/lib/network/routes/questions/route.ts`                             | L297          | 17    | ≤15    |
| `libs/common-ui/src/forms/TopicForm.tsx`                                                 | L105          | 17    | ≤15    |
| `apps/website/src/app/lib/network/routes/progress/guided-learning/sync/route.ts`         | L21           | 17    | ≤15    |
| `tests/utils/jest-mock-msw.js`                                                           | L10           | 17    | ≤15    |
| `tests/utils/node-fetch-mock.js`                                                         | L2            | 16    | ≤15    |
| Multiple files                                                                           | Various       | 16    | ≤15    |

### Area 4: SonarQube Quick Fixes

| File                                                                                | Rule  | Issue                     | Fix                            |
| ----------------------------------------------------------------------------------- | ----- | ------------------------- | ------------------------------ |
| `apps/website/src/app/lib/auth-config.ts` L47                                       | S3516 | Always returns same value | **BLOCKER** — Fix return logic |
| `apps/website/src/app/lib/homePageHelpers.ts` L3                                    | S6861 | Mutable `let` export      | Change to `const`              |
| `apps/website/src/app/lib/supabase-server.ts` L20                                   | S6861 | Mutable `let` export      | Change to `const`              |
| `libs/common-ui/src/common/ErrorBoundary.tsx` L23                                   | S3735 | Unnecessary `void`        | Remove `void`                  |
| `libs/common-ui/src/admin/editors/ProblemSolvingEditorUtils.ts` L176,179            | S7746 | Promise.resolve/reject    | Use return/throw               |
| `libs/common-ui/src/admin/editors/FrontendTaskEditorUtils.ts` L358,361              | S7746 | Promise.resolve/reject    | Use return/throw               |
| `apps/website/src/app/lib/network/routes/dashboard/stats/route.ts` L28              | S2871 | Sort without compare      | Add `.localeCompare()`         |
| `libs/common-ui/src/admin/content-management/LearningCardsManager.tsx` L187,284,312 | S2004 | >4 nested functions       | Extract functions              |
| `libs/common-ui/src/admin/content-management/PlansManager.tsx` L312,324,354         | S2004 | >4 nested functions       | Extract functions              |
| `apps/website/src/app/lib/network/routes/plans/[id]/hierarchy/route.ts` L291        | S2004 | >4 nested functions       | Extract functions              |
