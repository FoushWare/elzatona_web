# Admin Login Tests

This directory contains comprehensive tests for the admin login functionality to ensure it continues working correctly and prevent regressions in the future.

## 📁 Test Files

### 1. `admin-login-api.test.ts`

**API Endpoint Tests** - Tests for the `/api/admin/auth` endpoint

- ✅ Authentication with valid credentials
- ✅ Rejection of invalid credentials
- ✅ Input validation (email, password)
- ✅ Error handling (server errors, network issues)
- ✅ JWT token generation and validation
- ✅ Security measures (rate limiting, XSS prevention)
- ✅ Request validation (Content-Type, JSON parsing)

### 2. `admin-login-ui.test.tsx`

**UI Component Tests** - Tests for the admin login page component

- ✅ Form rendering and validation
- ✅ User interactions (form submission, password toggle)
- ✅ Loading states and error handling
- ✅ Accessibility features (ARIA labels, keyboard navigation)
- ✅ Responsive design (mobile/desktop viewports)
- ✅ Security features (XSS prevention, sensitive data handling)

### 3. `admin-auth-integration.test.ts`

**Integration Tests** - End-to-end tests for the complete authentication flow

- ✅ Complete login flow (API → JWT → Session)
- ✅ Session management and persistence
- ✅ Token validation and expiration handling
- ✅ Logout functionality
- ✅ Route protection
- ✅ Error handling and edge cases
- ✅ Security tests (token signature validation)
- ✅ Performance tests (concurrent requests)

### 4. `admin-dashboard-redirection.test.tsx`

**Redirection Tests** - Tests for admin dashboard redirection functionality

- ✅ Successful login redirection to dashboard
- ✅ Already authenticated user redirection
- ✅ Route protection (unauthorized access)
- ✅ Session persistence across page refreshes
- ✅ Role-based access control
- ✅ Navigation flow handling
- ✅ Error handling for missing user data

### 5. `navbar-switching-fix.test.tsx`

**Navbar Switching Tests** - Tests for the navbar switching fix

- ✅ No navbar flash on admin page refresh
- ✅ Correct navbar rendering for admin routes
- ✅ Proper SSR/hydration handling
- ✅ Consistent rendering between server and client
- ✅ Route detection (admin vs non-admin routes)
- ✅ Edge cases (undefined/null pathnames)
- ✅ Performance (no unnecessary re-renders)

## 🚀 Running Tests

### Run All Admin Login Tests

```bash
npm run test:admin-login
```

### Run Tests in Watch Mode

```bash
npm run test:admin-login:watch
```

### Run Tests with Coverage Report

```bash
npm run test:admin-login:coverage
```

### Run Individual Test Files

```bash
# API tests
npx jest tests/admin/admin-login-api.test.ts

# UI tests
npx jest tests/admin/admin-login-ui.test.tsx

# Integration tests
npx jest tests/admin/admin-auth-integration.test.ts

# Redirection tests
npx jest tests/admin/admin-dashboard-redirection.test.tsx

# Navbar switching tests
npx jest tests/admin/navbar-switching-fix.test.tsx
```

## 🧪 Test Coverage

The tests cover the following areas:

### ✅ **Authentication Flow**

- Login with valid credentials
- Rejection of invalid credentials
- JWT token generation and validation
- Session management
- Logout functionality

### ✅ **Security**

- Input validation and sanitization
- XSS prevention
- Token signature validation
- Rate limiting (if implemented)
- Sensitive data protection

### ✅ **User Experience**

- Form validation and error messages
- Loading states
- Responsive design
- Accessibility features
- Keyboard navigation

### ✅ **Navigation & Routing**

- Admin dashboard redirection
- Route protection
- Navbar switching fix
- SSR/hydration consistency

### ✅ **Error Handling**

- Network errors
- Server errors
- Invalid requests
- Missing environment variables
- Expired sessions

## 🔧 Test Configuration

### Jest Configuration

The tests use Jest with the following configuration:

- **Test Environment**: `jsdom` for React component testing
- **Setup Files**: `jest.setup.js` for global test setup
- **Mocking**: Firebase, Next.js router, and admin auth context
- **Coverage**: HTML and text coverage reports

### Mocked Dependencies

- `@/lib/firebase` - Firebase database operations
- `@/lib/admin-auth` - Admin authentication service
- `@/contexts/AdminAuthContext` - Admin authentication context
- `next/navigation` - Next.js router and navigation
- `localStorage` - Browser storage for session persistence

## 🐛 Troubleshooting

### Common Issues

1. **Tests failing due to missing environment variables**

   ```bash
   # Set required environment variables
   export JWT_SECRET="test-jwt-secret-key"
   export NEXT_PUBLIC_FIREBASE_PROJECT_ID="test-project"
   ```

2. **Firebase connection errors**
   - Tests use mocked Firebase, so real connection is not required
   - If you see Firebase errors, check that mocks are properly configured

3. **Jest configuration issues**
   - Ensure `jest.config.js` is properly configured
   - Check that `jest.setup.js` exists and is referenced

4. **TypeScript errors in tests**
   - Ensure all test files have proper TypeScript types
   - Check that mock types are correctly defined

### Debug Mode

Run tests with verbose output:

```bash
npx jest tests/admin/ --verbose
```

## 📝 Adding New Tests

When adding new admin login functionality:

1. **Update existing test files** if the functionality affects existing features
2. **Create new test files** for new features
3. **Update the test runner script** (`apps/admin/Utils/scripts/run-admin-login-tests.js`) to include new tests
4. **Update this README** with new test descriptions

### Test File Naming Convention

- `admin-[feature]-api.test.ts` - API endpoint tests
- `admin-[feature]-ui.test.tsx` - UI component tests
- `admin-[feature]-integration.test.ts` - Integration tests
- `admin-[feature]-[specific].test.tsx` - Specific functionality tests

## 🎯 Test Goals

The primary goals of these tests are:

1. **Prevent Regressions** - Ensure admin login continues working after code changes
2. **Documentation** - Serve as living documentation of expected behavior
3. **Confidence** - Provide confidence when deploying admin features
4. **Debugging** - Help identify issues quickly when they occur
5. **Refactoring** - Enable safe refactoring of admin authentication code

## 🔄 Continuous Integration

These tests are designed to run in CI/CD pipelines:

- **Pre-commit hooks** - Run basic tests before commits
- **Pull request checks** - Run full test suite on PRs
- **Deployment validation** - Ensure admin login works before deployment

## 📊 Test Metrics

Track the following metrics to ensure test quality:

- **Coverage**: Aim for >90% code coverage
- **Performance**: Tests should complete in <30 seconds
- **Reliability**: Tests should have <1% flaky test rate
- **Maintenance**: Update tests when features change

---

**Last Updated**: October 2025  
**Test Suite Version**: 1.0.0  
**Maintainer**: Development Team
