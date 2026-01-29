# Frontend Task Detail - Implementation Plan

## Overview
Implement the frontend task detail page and supporting UI components as an incremental refactor.

## Architecture / Stack
- Next.js (app dir), TypeScript, React
- Shared UI components in `libs/common-ui`
- API routes in `apps/website/src/app/api`

## Phases
1. Atoms
2. Molecules
3. Organisms
4. Page integration
5. Polish & quality gates

## Data model
Refer to `libs/types` for `FrontendTask` definition. The page will fetch a single `FrontendTask` by `id` via repository layer.

## Constraints
- Keep components small and testable
- Follow existing repo conventions for exports and paths

## Deliverables
- Components in `libs/common-ui` (atoms/molecules/organisms)
- `apps/website` API route and page
- Unit tests and type-checks passing

