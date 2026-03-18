# Test Design: Admin - Content Management

## Unit Tests

1. useContentManagement maps paginated repository response via data key.
2. useContentManagement sets error on rejected repository Promise.
3. filteredCards and filteredPlans respect search/filter state.
4. API payload extractor supports both direct data arrays and nested paginated data.
5. Partial endpoint failures keep previously successful datasets in state.

## Integration Tests

1. Content management page renders loaded datasets.
2. Error state renders when hook returns error.
3. Delete confirmation flow removes card and refreshes list.
4. When one endpoint returns 500, page still renders remaining datasets and shows warning toast.

## E2E Tests

1. Admin can open /admin/content-management and view stats sections.
2. Search and filters update visible content.
3. Card delete flow succeeds and updates UI.
4. Simulated failed plans request does not block cards/categories/questions rendering.

## Regression Cases

- plan repository table mismatch (plan_cards vs learning_plans)
- empty UI caused by reading items instead of data from paginated response
