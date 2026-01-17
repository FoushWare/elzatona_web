# Implementation Plan: Learning Cards Admin

**Branch**: `feature/admin-learning-cards` | **Date**: 2026-01-17 | **Spec**: [.github/specs/admin-learning-cards/spec.md](file:///Users/a.fouad/S/New_elzatona/.github/specs/admin-learning-cards/spec.md)
**Input**: Feature specification for refactoring Learning Cards management.

## Summary

Migrate the Learning Cards administration from the legacy design to the App Router in `apps/admin`. This involves creating a new page at `/admin/learning-cards` that utilizes the `LearningCardsManager` component from `libs/common-ui`. The goal is to provide a clean, hierarchical view of content areas and enable full CRUD operations for Cards, Categories, and Topics.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18
**Primary Dependencies**: Next.js 14 (App Router), Lucide React, Radix UI (via @elzatona/common-ui)
**Storage**: Supabase (PostgreSQL)
**Testing**: Jest, React Testing Library
**Project Type**: Web Application (Admin)
**Performance Goals**: < 800ms page load
**Constraints**: Zero "any" types; Strict type adherence to `@elzatona/types`.

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- [x] **Spec-Driven**: Feature has a detailed spec in `.github/specs/`?
- [x] **Testable**: Plan includes unit testing strategy with ≥ 90% coverage target?
- [x] **Strict Types**: No `any` types planned; strict mode adherence?
- [x] **Security**: Authentication/Authorization checks identified?
- [x] **Predictable**: Product scenarios clearly mapped to implementation?

## Project Structure

### Documentation (this feature)

```text
.github/specs/admin-learning-cards/
├── plan.md              # This file
├── spec.md              # Feature specification
└── tasks.md             # Actionable tasks
```

### Source Code (repository root)

```text
# Nx Monorepo Structure
apps/
├── admin/
│   ├── src/
│   │   ├── app/
│   │   │   └── admin/
│   │   │       └── learning-cards/
│   │   │           ├── page.tsx           # Main Page component
│   │   │           └── hooks/             # Page-specific hooks
│   │   │               └── useLearningCards.ts
libs/
├── common-ui/
│   ├── src/
│   │   └── admin/
│   │       └── content-management/        # Shared components
```

## Proposed Changes

### 1. New Page Component

Create `apps/admin/src/app/admin/learning-cards/page.tsx`. This page will:

- Fetch initial data (Cards, Categories, Topics, Questions) via a custom hook.
- Render the `AdminNavbar`.
- Render the `LearningCardsManager` from `libs/common-ui`.
- Handle state for modals (Create/Edit/Delete).

### 2. Custom Hook: `useLearningCards`

Extract logic for fetching and mutating data into `apps/admin/src/app/admin/learning-cards/hooks/useLearningCards.ts`.

- Use Supabase client for all operations.
- Maintain expanded state for the hierarchy.
- Provide handlers for all CRUD actions.

### 3. API Integrity

Ensure the `learning_cards` table in Supabase has all necessary fields as defined in the `LearningCard` type.

## Verification Plan

### Automated Tests

- `npm run test admin`: Verify the new page renders and interacts correctly with the manager component.
- `npx tsc --noEmit`: Ensure zero type errors.

### Manual Verification

- Deploy locally and verify navigation from `/admin/dashboard`.
- Perform a complete CRUD cycle: Create Card -> Add Category -> Add Topic -> Edit Card -> Delete Card.
