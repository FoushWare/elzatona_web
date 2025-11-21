# Admin Login - Split Test Files

The `admin-login.spec.ts` file (469 lines, 9 tests) has been split into smaller, focused test files for better maintainability and easier debugging.

## File Structure

### Shared Setup
- **`admin-login.setup.ts`** - Shared setup functions and helper utilities
  - `setupLoginPage()` - Common beforeEach hook
  - `getAdminCredentials()` - Get valid admin credentials from environment
  - `getInvalidCredentials()` - Get invalid test credentials

### Test Files
- **`admin-login.basic.spec.ts`** - Basic page loading and form element display (2 tests)
- **`admin-login.validation.spec.ts`** - Form validation and error handling (4 tests)
- **`admin-login.flow.spec.ts`** - Login flow, redirects, and loading states (3 tests)

## Running Tests

### Run All Split Tests
```bash
npm run test:e2e:admin:login:split
```

### Run Specific Test Suite
```bash
# Basic page tests
npm run test:e2e:admin:login:basic

# Form validation tests
npm run test:e2e:admin:login:validation

# Login flow tests
npm run test:e2e:admin:login:flow
```

### Run Original File (kept for reference)
```bash
npm run test:e2e:headed -- tests/e2e/admin/admin-login.spec.ts
```

## Test Distribution

### Basic Tests (2 tests)
- ✅ Page loads correctly
- ✅ All form elements displayed

### Validation Tests (4 tests)
- ✅ HTML5 validation for empty email
- ✅ HTML5 validation for empty password
- ✅ Error message for invalid credentials
- ✅ Network error handling

### Flow Tests (3 tests)
- ✅ Successful login with valid credentials
- ✅ Loading state during submission
- ✅ Redirect authenticated users away from login page

## Benefits

1. **Easier Debugging** - Smaller files make it easier to find and fix issues
2. **Faster Development** - Run only the tests you need (validation, flow, etc.)
3. **Better Organization** - Related tests are grouped together
4. **Reduced Serial Mode Issues** - Each file can run independently
5. **Shared Setup** - Common beforeEach and helpers in one place
6. **No Code Duplication** - Environment setup centralized

## Migration Notes

- The original `admin-login.spec.ts` file is kept for reference (marked with warning comment)
- All tests use the shared `setupLoginPage` function from the setup file
- Tests no longer use serial mode across all tests (only within each file if needed)
- Each test file is independent and can be run separately
- Environment variable loading is handled by `test-env-loader` - no need to duplicate

## File Sizes

- **Original file**: 469 lines
- **Split files**: ~50-150 lines each (much more manageable!)
- **Setup file**: ~60 lines (shared code)

## Next Steps

Similar splitting can be done for:
- `admin-dashboard.spec.ts` (434 lines, 9 tests) - Split into display, navigation, theme
- `complete-guided-flow.spec.ts` (324 lines, 10 tests) - Split into homepage, get-started, guided-learning

See `tests/e2e/E2E_TEST_SPLITTING_STRATEGY.md` for the complete splitting strategy.




