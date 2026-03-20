# TDD: Admin - Content Management

## Architecture

- Client hook: useContentManagement
- Repositories: question, learning card, plan, category, topic
- Page: /admin/content-management

## Data Contract Expectations

- Repository findAll returns paginated shape: { data, meta }
- UI extracts items from data arrays
- Plans must be queried from learning_plans table

## Known Failure Modes

- Wrong repository table binding causes database error banner
- Assuming items instead of data yields empty state despite successful query
- Direct client Supabase access from browser can fail with network/credential issues and trigger repeated partial-load warnings

## Technical Acceptance

1. Initial load succeeds without unexpected database errors.
2. Cards/plans/questions arrays are populated from paginated responses.
3. Search/filter and destructive actions trigger refresh with consistent state.
4. Initial data load uses internal API endpoints and degrades gracefully when a subset of endpoints fail.
