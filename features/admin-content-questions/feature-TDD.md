# TDD: Admin - Content Questions

## Technical Design

- Client page uses useQuestionsManagement for primary query state.
- Server-side search and filtering are provided by /api/questions/unified.
- Category overview uses /api/categories/question-counts.
- Modal form writes through unified create/update endpoints.

## Data Contracts

- GET /api/questions/unified response:
  - data: AdminUnifiedQuestion[]
  - pagination: { currentPage, pageSize, totalCount, totalPages, hasNextPage, hasPreviousPage }
- GET /api/categories/question-counts response:
  - data: { id, name, description, questionCount }[]

## Architectural Constraints

- Prevent duplicate search requests by memoizing callback props passed to AdvancedSearch.
- Keep pagination source-of-truth in one place per render path.
- Repository pagination counts must come from metadata (meta.total), not array length.

## Risks

- Mixed search ownership (hook + search component) can trigger repeated fetches.
- Incorrect count extraction can silently show zero counts.
- Large question datasets can degrade UX without stable pagination behavior.

## Acceptance Signals

- Network tab shows one unified query per state change.
- Category counts match DB counts.
- Create/update/delete operations refresh list state consistently.
