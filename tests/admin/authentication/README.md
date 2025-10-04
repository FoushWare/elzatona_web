# 🧪 Admin Authentication Test Suite

This directory contains comprehensive tests for the admin authentication system, ensuring secure and reliable admin access to the Elzatona Web platform.

## 📁 Test Structure

```
tests/admin/authentication/
├── AdminAuthContext.test.tsx          # Unit tests for authentication context
├── AdminLoginIntegration.test.tsx     # Integration tests for login flow
├── AdminAuthE2E.test.ts               # End-to-end tests with Playwright
├── AdminAuthSecurity.test.ts          # Security-focused tests
├── run-admin-auth-tests.js            # Test runner script
└── README.md                          # This file
```

## 🚀 Quick Start

### Run All Tests

```bash
npm run test:admin-auth
```

### Run Specific Test Types

```bash
# Unit tests only
npm run test:admin-auth:unit

# Integration tests only
npm run test:admin-auth:integration

# End-to-end tests only
npm run test:admin-auth:e2e

# Security tests only
npm run test:admin-auth:security
```

### Direct Test Runner

```bash
# Run all tests
node tests/admin/authentication/run-admin-auth-tests.js

# Run specific test types
node tests/admin/authentication/run-admin-auth-tests.js unit
node tests/admin/authentication/run-admin-auth-tests.js integration
node tests/admin/authentication/run-admin-auth-tests.js e2e
node tests/admin/authentication/run-admin-auth-tests.js security
```

## 📋 Test Categories

### 1. Unit Tests (`AdminAuthContext.test.tsx`)

**Purpose**: Test individual functions and components in isolation

**Coverage**:

- ✅ Authentication state management
- ✅ Login/logout functionality
- ✅ Firebase integration
- ✅ Error handling
- ✅ Admin role verification

**Dependencies**: Jest, React Testing Library, Firebase mocks

### 2. Integration Tests (`AdminLoginIntegration.test.tsx`)

**Purpose**: Test component interactions and data flow

**Coverage**:

- ✅ Form interactions
- ✅ Authentication flow
- ✅ Redirect behavior
- ✅ Error display
- ✅ Accessibility

**Dependencies**: Jest, React Testing Library, Next.js router mocks

### 3. End-to-End Tests (`AdminAuthE2E.test.ts`)

**Purpose**: Test complete user journeys in real browser environment

**Coverage**:

- ✅ Complete login flow
- ✅ Cross-browser compatibility
- ✅ Mobile responsiveness
- ✅ Performance testing
- ✅ Real user scenarios

**Dependencies**: Playwright, Real browser automation

### 4. Security Tests (`AdminAuthSecurity.test.ts`)

**Purpose**: Test security vulnerabilities and attack prevention

**Coverage**:

- ✅ Role-based access control
- ✅ Session management
- ✅ Input validation
- ✅ XSS/SQL injection prevention
- ✅ CSRF protection
- ✅ Authentication bypass prevention

**Dependencies**: Playwright, Security testing tools

## 🔧 Prerequisites

### Required Software

- Node.js (v18+)
- npm (v8+)
- Jest (for unit/integration tests)
- Playwright (for E2E/security tests)

### Test Dependencies

The test runner will automatically install required dependencies:

- `@testing-library/react`
- `@testing-library/jest-dom`
- `@testing-library/user-event`
- `jest`
- `jest-environment-jsdom`
- `@playwright/test`
- `firebase`
- `firebase/auth`
- `firebase/firestore`

## 🎯 Test Scenarios

### Authentication Flow

1. **Initial State**: No user, not loading
2. **Login Process**: Form validation, Firebase auth, role verification
3. **Success State**: User authenticated, redirected to dashboard
4. **Error Handling**: Invalid credentials, network errors, role failures
5. **Logout Process**: Session invalidation, redirect to login

### Security Testing

1. **Input Validation**: XSS, SQL injection, NoSQL injection prevention
2. **Access Control**: Admin role verification, unauthorized access prevention
3. **Session Security**: Session hijacking prevention, token validation
4. **Rate Limiting**: Brute force protection, rapid request handling

### User Experience

1. **Form Interactions**: Real-time validation, error display, accessibility
2. **Loading States**: Visual feedback during authentication
3. **Error Messages**: Clear, helpful error communication
4. **Mobile Experience**: Touch-friendly interface, responsive design

## 📊 Test Metrics

### Coverage Goals

- **Unit Tests**: 100% function coverage
- **Integration Tests**: 100% component interaction coverage
- **E2E Tests**: 100% user journey coverage
- **Security Tests**: 100% vulnerability coverage

### Performance Benchmarks

- **Page Load Time**: < 3 seconds
- **Login Response**: < 2 seconds
- **Form Validation**: < 500ms
- **Mobile Performance**: 60fps smooth interactions

## 🐛 Troubleshooting

### Common Issues

#### Jest Tests Failing

```bash
# Clear Jest cache
npx jest --clearCache

# Run with verbose output
npm run test:admin-auth:unit -- --verbose
```

#### Playwright Tests Failing

```bash
# Install Playwright browsers
npx playwright install

# Run with headed mode for debugging
npx playwright test tests/admin/authentication/AdminAuthE2E.test.ts --headed
```

#### Firebase Connection Issues

```bash
# Check Firebase configuration
# Ensure environment variables are set
# Verify Firebase project is accessible
```

### Debug Mode

```bash
# Run tests with debug output
DEBUG=* npm run test:admin-auth

# Run specific test with debug
DEBUG=* npx jest tests/admin/authentication/AdminAuthContext.test.tsx --verbose
```

## 📈 Continuous Integration

### GitHub Actions

The tests are designed to run in CI/CD pipelines:

```yaml
- name: Run Admin Auth Tests
  run: |
    npm install
    npm run test:admin-auth
```

### Pre-commit Hooks

```bash
# Add to .husky/pre-commit
npm run test:admin-auth:unit
```

## 🔒 Security Considerations

### Test Data

- Tests use mock data and test credentials
- No real admin credentials are stored in test files
- Firebase test project is used for integration tests

### Environment Isolation

- Tests run in isolated environments
- No impact on production data
- Cleanup after test execution

## 📝 Contributing

### Adding New Tests

1. Follow existing test patterns
2. Use descriptive test names
3. Include proper setup/teardown
4. Add appropriate assertions
5. Update this README if needed

### Test Naming Convention

- Unit tests: `describe('ComponentName', () => { it('should do something', () => {}) })`
- Integration tests: `describe('Feature Integration', () => { it('should handle user flow', () => {}) })`
- E2E tests: `test('should complete user journey', async () => {})`
- Security tests: `test('should prevent security vulnerability', async () => {})`

## 📞 Support

For questions or issues with the test suite:

1. Check this README
2. Review test output and error messages
3. Check Firebase configuration
4. Verify all dependencies are installed
5. Contact the development team

---

**Last Updated**: December 2024  
**Test Suite Version**: 1.0.0  
**Maintainer**: Elzatona Web Development Team
