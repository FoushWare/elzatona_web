# Admin Questions Page - Split Test Files

The large `admin-bulk-question-addition.spec.ts` file (3560 lines) has been split into smaller, focused test files for better maintainability and easier debugging.

**Note**: Files have been renamed to better reflect that they test the questions page:
- Old naming: `admin-bulk-question-addition.*`
- New naming: `admin-questions-page.*`

## File Structure

### Shared Setup
- **`admin-questions-page.setup.ts`** - Shared beforeEach hook, helper functions, and environment setup

### Test Files
- **`admin-questions-page.basic.spec.ts`** - Basic page loading and UI element tests
- **`admin-questions-page.crud.spec.ts`** - CRUD operations (Create, Read, Update, Delete)
- **`admin-questions-page.search.spec.ts`** - Search functionality tests
- **`admin-questions-page.pagination.spec.ts`** - Pagination tests
- **`admin-questions-page.bulk.spec.ts`** - Bulk upload and bulk deletion tests
- **`admin-questions-page.stats.spec.ts`** - Stats cards tests
- **`admin-questions-page.validation.spec.ts`** - Form validation tests

## Running Tests

### Run All Tests
```bash
# Run all admin tests (including original file)
npm run test:e2e:admin

# Run all questions page split test files together
npm run test:e2e:admin:questions
```

### Run Specific Test Suite
```bash
# Basic page tests
npm run test:e2e:admin:questions:basic

# CRUD operations
npm run test:e2e:admin:questions:crud

# Search functionality
npm run test:e2e:admin:questions:search

# Pagination
npm run test:e2e:admin:questions:pagination

# Bulk operations
npm run test:e2e:admin:questions:bulk

# Stats cards
npm run test:e2e:admin:questions:stats

# Form validation
npm run test:e2e:admin:questions:validation
```

## Benefits

1. **Easier Debugging** - Smaller files make it easier to find and fix issues
2. **Faster Development** - Run only the tests you need
3. **Better Organization** - Related tests are grouped together
4. **Reduced Serial Mode Issues** - Each file can run independently, reducing cascading skips
5. **Shared Setup** - Common beforeEach and helpers are in one place
6. **No Code Duplication** - Environment setup is centralized in the setup file
7. **Independent Execution** - Each test suite can run separately without affecting others

## Migration Notes

- The original `admin-bulk-question-addition.spec.ts` file is kept for reference
- All tests use the shared `setupAdminPage` function from the setup file
- Tests no longer use serial mode across all tests (only within each file if needed)
- Each test file is independent and can be run separately
- Environment variable loading is handled by the setup file - no need to duplicate in each test file
- All helper functions (`createQuestion`, `bulkDeleteQuestions`) are exported from the setup file

## File Sizes

- **Original file**: 3560 lines
- **Split files**: 66-945 lines each (much more manageable!)
- **Setup file**: 820 lines (shared code)

## Troubleshooting

If you see "skipped" tests:
- In the original file: This is due to serial mode - if one test fails, subsequent tests are skipped
- In split files: Each file runs independently, so failures in one file don't affect others
- To fix: Run the specific failing test suite to isolate the issue

