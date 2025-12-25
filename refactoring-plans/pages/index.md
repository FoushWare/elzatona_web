# Page Refactoring Index

## Overview

This document provides a comprehensive inventory of all pages in the Elzatona web application and tracks their refactoring status, including line counts, component breakdown, security scans, test coverage, and SonarQube status.

## Page Inventory

### Admin Pages (12 pages)

| #   | Route                       | File                                                | Lines | Status  | Components | Security | Tests | SonarQube | Priority     | Plan                                                 |
| --- | --------------------------- | --------------------------------------------------- | ----- | ------- | ---------- | -------- | ----- | --------- | ------------ | ---------------------------------------------------- |
| 1   | `/admin`                    | `src/app/admin/page.tsx`                            | 5     | Planned | 0/0        | ❌       | 0%    | ❌        | Low          | [admin-root.md](admin/admin-root.md)                 |
| 2   | `/admin/dashboard`          | `src/app/Pages/admin/dashboard/page.tsx`            | 380   | Planned | 0/5        | ❌       | 0%    | ❌        | High         | [admin-dashboard.md](admin/admin-dashboard.md)       |
| 3   | `/admin/login`              | `src/app/admin/login/page.tsx`                      | 5     | Planned | 0/3        | ❌       | 0%    | ❌        | High         | [admin-login.md](admin/admin-login.md)               |
| 4   | `/admin/content-management` | `src/app/Pages/admin/content-management/page.tsx`  | 3367  | Planned | 0/15       | ❌       | 0%    | ❌        | **CRITICAL** | [content-management.md](admin/content-management.md) |
| 5   | `/admin/content/questions`  | `src/app/Pages/admin/content/questions/page.tsx`   | 1496  | Planned | 0/8        | ❌       | 0%    | ❌        | **CRITICAL** | [content-questions.md](admin/content-questions.md)   |
| 6   | `/admin/frontend-tasks`     | `src/app/Pages/admin/frontend-tasks/page.tsx`      | 940   | Planned | 0/5        | ❌       | 0%    | ❌        | High         | [frontend-tasks.md](admin/frontend-tasks.md)         |
| 7   | `/admin/problem-solving`    | `src/app/Pages/admin/problem-solving/page.tsx`      | 332   | Planned | 0/5        | ❌       | 0%    | ❌        | Medium       | [problem-solving.md](admin/problem-solving.md)       |
| 8   | `/admin/learning-cards`     | `src/app/Pages/admin/learning-cards/page.tsx`       | 554   | Planned | 0/4        | ❌       | 0%    | ❌        | Medium       | [learning-cards.md](admin/learning-cards.md)         |
| 9   | `/admin/users`              | `src/app/admin/users/page.tsx`                      | 5     | Planned | 0/4        | ❌       | 0%    | ❌        | High         | [users.md](admin/users.md)                           |
| 10  | `/admin/questions`          | `src/app/admin/questions/page.tsx`                  | 5     | Planned | 0/0        | ❌       | 0%    | ❌        | Low          | [questions-legacy.md](admin/questions-legacy.md)     |
| 11  | `/admin/questions/unified`  | `src/app/admin/questions/unified/page.tsx`          | 5     | Planned | 0/0        | ❌       | 0%    | ❌        | Low          | [questions-unified.md](admin/questions-unified.md)   |
| 12  | `/admin/logs`               | `src/app/admin/logs/page.tsx`                       | -     | Planned | 0/0        | ❌       | 0%    | ❌        | Low          | [logs.md](admin/logs.md)                             |

### User-Facing Pages (33+ pages)

| #   | Route                                       | File                                                                | Lines | Status  | Components | Security | Tests | SonarQube | Priority     | Plan                                                              |
| --- | ------------------------------------------- | ------------------------------------------------------------------- | ----- | ------- | ---------- | -------- | ----- | --------- | ------------ | ----------------------------------------------------------------- |
| 1   | `/`                                         | `src/app/page.tsx`                                                  | 66    | Done    | 5/5        | ❌       | 0%    | ❌        | High         | [home-page.md](user/home-page.md)                                 |
| 2   | `/auth`                                     | `src/app/auth/page.tsx`                                             | 5     | Planned | 0/4        | ❌       | 0%    | ❌        | **CRITICAL** | [auth.md](user/auth.md)                                           |
| 3   | `/auth/callback`                            | `src/app/auth/callback/page.tsx`                                    | 5     | Planned | 0/2        | ❌       | 0%    | ❌        | **CRITICAL** | [auth-callback.md](user/auth-callback.md)                         |
| 4   | `/dashboard`                                | `src/app/Pages/dashboard/page.tsx`                                 | -     | Planned | 0/5        | ❌       | 0%    | ❌        | High         | [dashboard.md](user/dashboard.md)                                 |
| 5   | `/get-started`                              | `src/app/Pages/get-started/page.tsx`                                | -     | Planned | 0/4        | ❌       | 0%    | ❌        | Medium       | [get-started.md](user/get-started.md)                             |
| 6   | `/browse-practice-questions`                | `src/app/Pages/browse-practice-questions/page.tsx`                 | 562   | Planned | 0/4        | ❌       | 0%    | ❌        | Medium       | [browse-practice-questions.md](user/browse-practice-questions.md) |
| 7   | `/categories-topics`                        | `src/app/Pages/categories-topics/page.tsx`                          | -     | Planned | 0/4        | ❌       | 0%    | ❌        | Medium       | [categories-topics.md](user/categories-topics.md)                 |
| 8   | `/custom-practice/[planId]`                 | `src/app/Pages/custom-practice/[planId]/page.tsx`                   | 585   | Planned | 0/5        | ❌       | 0%    | ❌        | Medium       | [custom-practice.md](user/custom-practice.md)                     |
| 9   | `/custom-roadmap`                           | `src/app/Pages/custom-roadmap/page.tsx`                              | 3115  | Planned | 0/8        | ❌       | 0%    | ❌        | **CRITICAL** | [custom-roadmap.md](user/custom-roadmap.md)                       |
| 10  | `/flashcards`                               | `src/app/Pages/flashcards/page.tsx`                                 | 780   | Planned | 0/5        | ❌       | 0%    | ❌        | Medium       | [flashcards.md](user/flashcards.md)                               |
| 11  | `/free-style`                               | `src/app/Pages/free-style/page.tsx`                                 | -     | Planned | 0/4        | ❌       | 0%    | ❌        | Medium       | [free-style.md](user/free-style.md)                               |
| 12  | `/free-style/cart`                          | `src/app/Pages/free-style/cart/page.tsx`                            | -     | Planned | 0/3        | ❌       | 0%    | ❌        | Medium       | [free-style-cart.md](user/free-style-cart.md)                     |
| 13  | `/free-style/path/[pathId]`                 | `src/app/Pages/free-style/path/[pathId]/page.tsx`                   | -     | Planned | 0/4        | ❌       | 0%    | ❌        | Medium       | [free-style-path.md](user/free-style-path.md)                     |
| 14  | `/free-style-practice`                      | `src/app/Pages/free-style-practice/page.tsx`                        | 3941  | Planned | 0/8        | ❌       | 0%    | ❌        | **CRITICAL** | [free-style-practice.md](user/free-style-practice.md)             |
| 15  | `/frontend-tasks`                           | `src/app/Pages/frontend-tasks/page.tsx`                             | 565   | Planned | 0/5        | ❌       | 0%    | ❌        | Medium       | [frontend-tasks.md](user/frontend-tasks.md)                       |
| 16  | `/frontend-tasks/[id]`                      | `src/app/Pages/frontend-tasks/[id]/page.tsx`                        | 1535  | Planned | 0/6        | ❌       | 0%    | ❌        | High         | [frontend-tasks-detail.md](user/frontend-tasks-detail.md)         |
| 17  | `/features/guided-learning`                 | `src/app/Pages/features/guided-learning/page.tsx`                    | 1019  | Planned | 0/6        | ❌       | 0%    | ❌        | Medium       | [guided-learning.md](user/guided-learning.md)                     |
| 18  | `/features/guided-learning/[planId]`        | `src/app/Pages/features/guided-learning/[planId]/page.tsx`         | 597   | Planned | 0/5        | ❌       | 0%    | ❌        | Medium       | [guided-learning-plan.md](user/guided-learning-plan.md)           |
| 19  | `/guided-practice`                          | `src/app/Pages/guided-practice/page.tsx`                            | 3966  | Planned | 0/7        | ❌       | 0%    | ❌        | **CRITICAL** | [guided-practice.md](user/guided-practice.md)                     |
| 20  | `/guided-practice-minimal`                  | `src/app/Pages/guided-practice-minimal/page.tsx`                    | -     | Planned | 0/3        | ❌       | 0%    | ❌        | Low          | [guided-practice-minimal.md](user/guided-practice-minimal.md)     |
| 21  | `/guided-practice-simple`                   | `src/app/Pages/guided-practice-simple/page.tsx`                     | -     | Planned | 0/3        | ❌       | 0%    | ❌        | Low          | [guided-practice-simple.md](user/guided-practice-simple.md)       |
| 22  | `/learning-paths`                           | `src/app/Pages/learning-paths/page.tsx`                              | -     | Planned | 0/4        | ❌       | 0%    | ❌        | Medium       | [learning-paths.md](user/learning-paths.md)                       |
| 23  | `/learning-paths/[id]`                      | `src/app/Pages/learning-paths/[id]/page.tsx`                         | -     | Planned | 0/5        | ❌       | 0%    | ❌        | Medium       | [learning-paths-detail.md](user/learning-paths-detail.md)         |
| 24  | `/learning-paths/[id]/sections/[sectionId]` | `src/app/Pages/learning-paths/[id]/sections/[sectionId]/page.tsx`   | -     | Planned | 0/4        | ❌       | 0%    | ❌        | Medium       | [learning-paths-section.md](user/learning-paths-section.md)       |
| 25  | `/my-plans`                                 | `src/app/Pages/my-plans/page.tsx`                                   | -     | Planned | 0/4        | ❌       | 0%    | ❌        | Medium       | [my-plans.md](user/my-plans.md)                                   |
| 26  | `/problem-solving`                          | `src/app/Pages/problem-solving/page.tsx`                            | -     | Planned | 0/4        | ❌       | 0%    | ❌        | Medium       | [problem-solving.md](user/problem-solving.md)                     |
| 27  | `/problem-solving/[id]`                     | `src/app/Pages/problem-solving/[id]/page.tsx`                       | 515   | Planned | 0/5        | ❌       | 0%    | ❌        | Medium       | [problem-solving-detail.md](user/problem-solving-detail.md)       |
| 28  | `/questions`                                | `src/app/Pages/questions/page.tsx`                                  | -     | Planned | 0/3        | ❌       | 0%    | ❌        | Low          | [questions.md](user/questions.md)                                 |
| 29  | `/settings`                                 | `src/app/Pages/settings/page.tsx`                                   | -     | Planned | 0/4        | ❌       | 0%    | ❌        | Medium       | [settings.md](user/settings.md)                                   |
| 30  | `/test-notifications`                       | `src/app/Pages/test-notifications/page.tsx`                          | -     | Planned | 0/1        | ❌       | 0%    | ❌        | Low          | [test-notifications.md](user/test-notifications.md)               |
| 31  | `/test-supabase`                            | `src/app/Pages/test-supabase/page.tsx`                               | -     | Planned | 0/1        | ❌       | 0%    | ❌        | Low          | [test-supabase.md](user/test-supabase.md)                         |
| 32  | `/learning-mode`                            | `src/app/Pages/learning-mode/page.tsx`                              | -     | Planned | 0/3        | ❌       | 0%    | ❌        | Low          | [learning-mode.md](user/learning-mode.md)                         |
| 33  | `/pages/my-plans`                           | `src/app/Pages/pages/my-plans/page.tsx`                             | -     | Planned | 0/0        | ❌       | 0%    | ❌        | Low          | [my-plans-alt.md](user/my-plans-alt.md)                           |

## Status Legend

### Status Values

- **Planned**: Refactoring plan created, not started
- **In Progress**: Currently being refactored
- **Review**: Completed, awaiting code review
- **Done**: Completed, reviewed, and merged

### Component Count Format

- Format: `extracted/target`
- Example: `3/12` means 3 components extracted out of 12 planned

### Security Status

- ✅: Security scan passed
- ❌: Security scan not completed or failed

### Test Coverage

- Percentage of code covered by tests
- Target: ≥80% (unit + integration)
- Critical pages: ≥90%

### SonarQube Status

- ✅: Quality gate passed
- ❌: Quality gate failed or not run

### Priority Levels

- **CRITICAL**: Must be refactored immediately (very large files)
- **High**: Important pages, refactor soon
- **Medium**: Standard priority
- **Low**: Can be refactored later

## Statistics

### Overall Progress

- **Total Pages**: 45
- **Planned**: 45
- **In Progress**: 0
- **Review**: 0
- **Done**: 0

### By Priority

- **CRITICAL**: 6 pages (13.3%)
- **High**: 8 pages (17.8%)
- **Medium**: 25 pages (55.6%)
- **Low**: 6 pages (13.3%)

### By Category

- **Admin Pages**: 12 (26.7%)
- **User Pages**: 33 (73.3%)

### Largest Pages (Top 10)

1. `/guided-practice` - 3966 lines
2. `/free-style-practice` - 3941 lines
3. `/admin/content-management` - 3367 lines
4. `/custom-roadmap` - 3115 lines
5. `/admin/content/questions` - 1496 lines
6. `/frontend-tasks/[id]` - 1535 lines
7. `/features/guided-learning` - 1019 lines
8. `/admin/frontend-tasks` - 940 lines
9. `/flashcards` - 780 lines
10. `/features/guided-learning/[planId]` - 597 lines

## Refactoring Phases

### Phase 1: Critical Infrastructure (Weeks 1-2)

- [x] Home Page (`/`) - **COMPLETED**
  - Components moved to `libs/components/`
  - Page reduced from 565 to 66 lines
  - Atomic design structure implemented
- [ ] Authentication (`/auth`, `/auth/callback`)
- [ ] Admin Dashboard (`/admin/dashboard`)

### Phase 2: Core Features (Weeks 3-5)

- [ ] User Dashboard (`/dashboard`)
- [ ] Content Management (`/admin/content-management`) - **3367 lines**
- [ ] Questions Management (`/admin/content/questions`) - **1496 lines**
- [ ] Browse Practice Questions (`/browse-practice-questions`)

### Phase 3: Learning Features (Weeks 6-8)

- [ ] Learning Paths (`/learning-paths`)
- [ ] Guided Learning (`/features/guided-learning`)
- [ ] Free Style Practice (`/free-style-practice`) - **3941 lines**
- [ ] Frontend Tasks (`/frontend-tasks`) - **1535 lines**

### Phase 4: Admin Features (Weeks 9-10)

- [ ] Problem Solving Admin (`/admin/problem-solving`)
- [ ] Frontend Tasks Admin (`/admin/frontend-tasks`)
- [ ] Learning Cards Admin (`/admin/learning-cards`)
- [ ] Users Management (`/admin/users`)

### Phase 5: Advanced Features (Weeks 11-12)

- [ ] Custom Roadmap (`/custom-roadmap`) - **3115 lines**
- [ ] Guided Practice (`/guided-practice`) - **3966 lines**
- [ ] Flashcards (`/flashcards`)
- [ ] Settings (`/settings`)
- [ ] Remaining pages

## Quality Metrics Summary

### Code Quality

- **Average Lines per Page**: ~800 (target: <500)
- **Largest Page**: 3966 lines (target: <500)
- **Pages >2000 lines**: 4 (need immediate attention)
- **Pages >1000 lines**: 8 (need attention)

### Security

- **Pages with Security Scans**: 0/45 (0%)
- **Critical Vulnerabilities**: Unknown
- **High Vulnerabilities**: Unknown

### Testing

- **Average Test Coverage**: 0%
- **Pages with Tests**: 0/45 (0%)
- **Target Coverage**: ≥80%

### SonarQube

- **Pages Analyzed**: 0/45 (0%)
- **Quality Gate Pass Rate**: 0%
- **Target Pass Rate**: 100%

## Next Steps

1. ✅ Create page inventory (this document)
2. ⏳ Create individual page plans for all admin pages
3. ⏳ Create individual page plans for all user pages
4. ⏳ Begin Phase 1 refactoring
5. ⏳ Track progress and update this index

## Notes

- Line counts are approximate and may vary
- Some pages are wrappers (5 lines) that import from `src/app/Pages/`
- Priority is based on size, complexity, and business importance
- Status will be updated as refactoring progresses
