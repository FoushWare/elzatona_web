# Implementation Plan: CodeQL Security Bug Fixes

**Branch**: `007-codeql-bug-fixes` | **Date**: 2026-02-15 | **Spec**: [spec.md](spec.md)  
**Input**: Feature specification from `/specs/007-codeql-bug-fixes/spec.md`

## Summary

Resolve all 30 open CodeQL security alerts across 8 categories (clear-text-logging, insecure-randomness, xss-through-dom, incomplete-multi-char-sanitization, double-escaping, incomplete-sanitization, shell-command-injection, missing-rate-limiting). Each category is fixed on its own branch with a dedicated PR to `main`. Fixes use DOMPurify for DOM sanitization, `crypto.getRandomValues()` for secure randomness, email masking for PII protection, convergence-loop sanitization for multi-char issues, and an in-memory rate limiter for auth endpoints.

## Technical Context

**Language/Version**: TypeScript ^5 targeting ES2017, strict mode enabled  
**Primary Dependencies**: Next.js ^16.1.0, React ^18.3.1, DOMPurify ^3.3.0, xss ^1.0.15, bcryptjs ^3.0.2, Zod ^4.1.12  
**Storage**: Supabase (@supabase/supabase-js ^2.76.1) — not directly affected by these fixes  
**Testing**: Vitest 3.2.4 (unit, V8 coverage), Jest ^30.2.0, Playwright ^1.56.0 (E2E), @testing-library/react ^16.3.0  
**Target Platform**: Vercel (Next.js SSR/SSG), Node.js >=20.0.0  
**Project Type**: Web (Nx Monorepo — 2 apps, 11 libs)  
**Performance Goals**: Rate limiter must handle 100+ concurrent IP entries with <1ms lookup  
**Constraints**: No external rate-limiting service (in-memory only), DOMPurify client-side only  
**Scale/Scope**: 30 CodeQL alerts across ~20 source files in 2 apps and 4 libs

## Constitution Check (Pre-Design)

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- [x] **Spec-Driven**: Feature has a detailed spec in `specs/007-codeql-bug-fixes/spec.md`
- [x] **Testable**: Each fix category has specific acceptance scenarios; unit test coverage target ≥ 90% for new utilities (rate-limit.ts, generateId)
- [x] **Strict Types**: No `any` types; all new code uses strict TypeScript. `RateLimitResult` and `RateLimiter` are fully typed interfaces.
- [x] **Security**: This IS a security feature — all 8 categories address CodeQL security alerts. Auth rate limiting, PII masking, XSS prevention, and secure randomness are all security-by-design.
- [x] **Predictable**: Each of the 8 user stories maps 1:1 to a fix branch/PR with measurable acceptance criteria.

**Gate Result**: ✅ PASS — All gates satisfied.

## Project Structure

### Documentation (this feature)

```text
specs/007-codeql-bug-fixes/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0: Security research findings
├── data-model.md        # Phase 1: RateLimiter entity model
├── quickstart.md        # Phase 1: Verification guide
└── contracts/
    └── rate-limit-api.yaml  # Rate limiter contract
```

### Source Code (affected files)

```text
apps/
├── admin/
│   ├── src/app/api/admin/auth/route.ts          # Rate limiting + PII masking
│   └── src/components/QuestionPracticeView.tsx   # Double-escaping fix
├── website/
│   └── src/app/frontend-tasks/[id]/page.tsx      # Incomplete sanitization fix
libs/
├── utilities/
│   └── src/lib/
│       ├── utils.ts                              # Secure generateId()
│       └── rate-limit.ts                         # NEW: Rate limiter utility
├── shared-atoms/
│   └── src/lib/auth.ts                           # PII masking in logs
├── common-ui/
│   └── src/
│       ├── QuestionContent.tsx                   # Multi-char + double-escaping fixes
│       └── components/molecules/TaskDescription.tsx  # DOMPurify XSS fix
├── shared-components/
│   └── src/lib/admin/FrontendTaskEditor.tsx      # Backslash escaping
.github/
└── workflows/codeql-config.yml                   # Shell injection path exclusions
```

**Structure Decision**: Fixes are distributed across existing files in the monorepo. One new file (`rate-limit.ts`) is added to `libs/utilities`. No structural changes to the project layout.

## Complexity Tracking

| Violation                             | Why Needed                                                    | Simpler Alternative Rejected Because                                                 |
| ------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Branching from `main` (not `develop`) | Security hotfixes need immediate production deployment        | `develop` branch has divergent features; security fixes must go direct to production |
| In-memory rate limiter (no Redis)     | No external cache infrastructure; lightweight auth protection | Redis adds deployment complexity, cost, and a new dependency for a single endpoint   |
