# E2E Test Splitting Strategy

This document outlines the strategy for splitting large E2E test files into smaller, more maintainable test suites.

## Why Split E2E Tests?

Large E2E test files (500+ lines) can be difficult to:
- **Debug**: Hard to find the specific test that's failing
- **Maintain**: Changes affect many tests at once
- **Run efficiently**: Serial mode causes cascading skips when one test fails
- **Navigate**: Difficult to understand test structure

## When to Split

Consider splitting when a test file:
- Has **500+ lines** of code
- Contains **8+ tests** with different concerns
- Has **multiple logical groupings** (e.g., CRUD, validation, navigation)
- Uses **serial mode** causing cascading test skips
- Is **difficult to navigate** or understand

## Splitting Strategy

### 1. Identify Logical Groupings

Group tests by:
- **Feature area**: CRUD operations, search, pagination
- **User flow**: Login flow, navigation flow, guided flow
- **Test type**: Validation, error handling, success cases
- **Component**: Navbar, dashboard, forms

### 2. Create Shared Setup File

Extract common code into a setup file:
- `beforeEach` hooks
- Helper functions
- Environment variable loading
- Common utilities

**Example**: `admin-bulk-question-addition.setup.ts`

### 3. Split into Focused Files

Create separate files for each logical group:
- `feature-name.basic.spec.ts` - Basic page loading
- `feature-name.crud.spec.ts` - CRUD operations
- `feature-name.validation.spec.ts` - Form validation
- `feature-name.navigation.spec.ts` - Navigation tests

### 4. Update Package.json Scripts

Add scripts for each split file:
```json
{
  "test:e2e:admin:basic": "playwright test tests/e2e/admin/admin-bulk-question-addition.basic.spec.ts",
  "test:e2e:admin:crud": "playwright test tests/e2e/admin/admin-bulk-question-addition.crud.spec.ts",
  "test:e2e:admin:split": "playwright test tests/e2e/admin/admin-bulk-question-addition.*.spec.ts"
}
```

### 5. Keep Original File (Optional)

Keep the original file for reference:
- Mark as "kept for reference" in comments
- Don't modify it after splitting
- Can be removed after confirming split files work

## File Naming Convention

Use descriptive suffixes:
- `.basic.spec.ts` - Basic page loading and UI elements
- `.crud.spec.ts` - Create, Read, Update, Delete operations
- `.validation.spec.ts` - Form validation and error handling
- `.navigation.spec.ts` - Navigation and routing
- `.search.spec.ts` - Search and filtering
- `.pagination.spec.ts` - Pagination controls
- `.bulk.spec.ts` - Bulk operations (upload, delete)
- `.stats.spec.ts` - Statistics and metrics
- `.theme.spec.ts` - Theme toggle and dark mode
- `.error.spec.ts` - Error handling and edge cases
- `.setup.ts` - Shared setup and helpers

## Example: Admin Login Splitting

### Before (469 lines, 9 tests)
```
admin-login.spec.ts
├── Page loading test
├── Form display test
├── Email validation test
├── Password validation test
├── Invalid credentials test
├── Successful login test
├── Loading state test
├── Redirect protection test
└── Network error test
```

### After (Split into 3 files)
```
admin-login.setup.ts (shared setup)
admin-login.basic.spec.ts (page loading, form display)
admin-login.validation.spec.ts (form validation, error handling)
admin-login.flow.spec.ts (login flow, redirects, loading states)
```

## Example: Admin Dashboard Splitting

### Before (434 lines, 9 tests)
```
admin-dashboard.spec.ts
├── Page load test
├── Stats display test
├── Menu items test
├── Refresh button test
├── Navigation test
├── Theme toggle button test
├── Theme icon test
├── Theme switching test
└── Theme persistence test
```

### After (Split into 3 files)
```
admin-dashboard.setup.ts (shared setup)
admin-dashboard.display.spec.ts (page load, stats, menu)
admin-dashboard.navigation.spec.ts (navigation, refresh)
admin-dashboard.theme.spec.ts (theme toggle, switching, persistence)
```

## Benefits of Splitting

1. **Easier Debugging**: Smaller files make it easier to find and fix issues
2. **Faster Development**: Run only the tests you need
3. **Better Organization**: Related tests are grouped together
4. **Reduced Serial Mode Issues**: Each file can run independently
5. **Shared Setup**: Common code in one place
6. **No Code Duplication**: Environment setup centralized
7. **Independent Execution**: Failures in one file don't affect others

## Migration Checklist

- [ ] Identify logical groupings in the test file
- [ ] Create shared setup file with common code
- [ ] Split tests into focused files
- [ ] Update package.json scripts
- [ ] Test each split file independently
- [ ] Test running all split files together
- [ ] Update documentation (README, MANUAL_TESTING_WORKFLOW.md)
- [ ] Mark original file as "kept for reference"
- [ ] Verify all tests pass after splitting

## Files Ready for Splitting

Based on current file sizes and test counts:

1. **admin-login.spec.ts** (469 lines, 9 tests)
   - Split into: basic, validation, flow

2. **admin-dashboard.spec.ts** (434 lines, 9 tests)
   - Split into: display, navigation, theme

3. **complete-guided-flow.spec.ts** (324 lines, 10 tests)
   - Split into: homepage, get-started, guided-learning

4. **admin-bulk-question-addition.crud.spec.ts** (908 lines)
   - Already split, but could be split further if needed

## Next Steps

1. Review this strategy
2. Identify which files to split first
3. Create shared setup files
4. Split tests into focused files
5. Update scripts and documentation
6. Test and verify all tests pass




