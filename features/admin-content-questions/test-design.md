# Test Design: Admin - Content Questions

## Scope

Covers /admin/content/questions page behavior and related APIs.

## Unit Tests

1. useQuestionsManagement builds query params correctly for page, pageSize, category, topic.
2. useQuestionsManagement handles API errors by setting error and empty results.
3. question-counts route maps repository pagination meta.total to questionCount.
4. page component passes stable onResultsChange callback to AdvancedSearch.

## Integration Tests

1. Page loads initial questions and renders totals.
2. Changing filters resets currentPage to 1 and updates list.
3. Creating question updates totalCount and appears in list.
4. Editing question persists and reflects in row/modal.
5. Deleting question removes row and updates totals.

## E2E Tests

1. Admin can open /admin/content/questions and see loaded list.
2. Search, filters, and pagination work without repeated request loop.
3. CRUD flows succeed with visible confirmations.
4. API error state is displayed with retry option.

## Regression Focus

- Category count regression where counts show 0 due to wrong result shape.
- Infinite /api/questions/unified calls due to unstable callback props.
