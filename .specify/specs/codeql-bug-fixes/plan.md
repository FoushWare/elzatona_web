# Implementation Plan: CodeQL Security Bug Fixes

**Branch**: `fix/codeql-*` (8 branches) | **Date**: 2026-02-15 | **Spec**: [spec.md](spec.md)

## Summary

Fix all 30 open CodeQL security alerts across 8 categories. Each category gets its own feature branch from `main` and a separate PR back to `main`. Issues are marked completed in `bugs-issues.md` after each PR merge.

## Technical Context

**Language/Version**: TypeScript 5.x, Next.js 14 (App Router)
**Primary Dependencies**: React, Next.js, DOMPurify, xss library
**Storage**: Supabase (PostgreSQL)
**Testing**: Vitest
**Target Platform**: Vercel (Web)
**Project Type**: Nx Monorepo (apps/admin, apps/website, libs/*)

## Constitution Check

- [x] **Spec-Driven**: Feature has a detailed spec in `.specify/specs/codeql-bug-fixes/`
- [x] **Testable**: Each fix category is independently testable
- [x] **Strict Types**: No `any` types; strict mode
- [x] **Security**: This IS the security fix initiative
- [x] **Predictable**: Each issue maps to a specific code location

> **Note**: Constitution says branches go from `develop` → `develop`. User explicitly overrides to `main` → `main` for these critical security hotfixes. Justified: these are production security fixes that should not wait for the develop cycle.

## Task Execution Plan

### Task 1: Fix Clear-Text Logging
- **Branch**: `fix/clear-text-logging`
- **Issues**: #7500–#7509 (10 issues, ERROR severity)
- **Files**:
  - `libs/shared-atoms/src/lib/auth.ts` — mask email in log
  - `apps/admin/src/app/api/admin/auth/route.ts` — mask email in error log
- **Fix**: Replace plaintext email/password logging with masked versions
- **PR**: → `main`

### Task 2: Fix Insecure Randomness
- **Branch**: `fix/insecure-randomness`
- **Issues**: #7497–#7498 (2 issues, WARNING)
- **Files**:
  - `libs/utilities/src/lib/utilities.ts` — `generateId()` root cause
  - All consumers auto-fixed once utility is updated
- **Fix**: Replace `Math.random().toString(36)` with `crypto.getRandomValues()`
- **PR**: → `main`

### Task 3: Fix XSS Through DOM
- **Branch**: `fix/xss-through-dom`
- **Issues**: #7492–#7494 (3 issues, WARNING)
- **Files**:
  - `libs/shared-components/src/lib/QuestionContent.tsx`
  - Verify DOMPurify is always applied before `dangerouslySetInnerHTML`
- **Fix**: Add explicit DOMPurify.sanitize() call at the render site + CodeQL suppression comment if already mitigated
- **PR**: → `main`

### Task 4: Fix Incomplete Multi-Character Sanitization
- **Branch**: `fix/incomplete-multi-char-sanitization`
- **Issues**: #7480–#7483 (4 issues, WARNING)
- **Files**:
  - `apps/website/src/app/free-style-practice/page.tsx`
  - `apps/website/src/app/api/guided-learning/plan-details/[planId]/route.ts`
- **Fix**: Replace single-pass regex with loop-until-stable or use `xss` library
- **PR**: → `main`

### Task 5: Fix Double-Escaping
- **Branch**: `fix/double-escaping`
- **Issues**: #7488–#7491 (4 issues, WARNING)
- **Files**:
  - `libs/shared-components/src/lib/QuestionContent.tsx`
  - `apps/website/src/app/free-style-practice/page.tsx`
  - `apps/admin/src/components/QuestionPracticeView.tsx`
- **Fix**: Reorder `&amp;` decode first + use `/g` flag on all replaces
- **PR**: → `main`

### Task 6: Fix Incomplete Sanitization
- **Branch**: `fix/incomplete-sanitization`
- **Issues**: #7484–#7487 (4 issues, WARNING)
- **Files**:
  - `apps/website/src/app/frontend-tasks/[id]/page.tsx`
  - `libs/shared-components/src/lib/admin/FrontendTaskEditor.tsx`
- **Fix**: Add `/g` flag + escape backslashes in sanitization functions
- **PR**: → `main`

### Task 7: Fix Shell Command Injection
- **Branch**: `fix/shell-command-injection`
- **Issues**: #7495–#7496 (2 issues, WARNING)
- **Status**: No production code affected. Issues reference `Rest/scripts/` which don't exist in current codebase
- **Fix**: Close issues as "not applicable" or add CodeQL config to exclude build scripts
- **PR**: → `main` (config change only)

### Task 8: Add Rate Limiting
- **Branch**: `fix/missing-rate-limiting`
- **Issues**: #7499 (1 issue, WARNING)
- **Files**:
  - Create `libs/utilities/src/lib/rate-limit.ts`
  - Apply to auth routes first, then expand
- **Fix**: Implement in-memory rate limiter middleware for Next.js API routes
- **PR**: → `main`

## Execution Order

| Order | Task | Effort | Risk |
|-------|------|--------|------|
| 1 | Clear-text logging | 15 min | Low |
| 2 | Insecure randomness | 20 min | Low |
| 3 | Double-escaping | 20 min | Low |
| 4 | Incomplete sanitization | 25 min | Low |
| 5 | XSS through DOM | 15 min | Low |
| 6 | Incomplete multi-char sanitization | 20 min | Low |
| 7 | Shell command injection | 10 min | None |
| 8 | Rate limiting | 45 min | Medium |
