# Admin Testing Suite

This directory contains comprehensive tests for all admin functionality in the application. The test suite covers unit tests, integration tests, API tests, and end-to-end (E2E) tests to ensure the admin system is robust and reliable.

## 📁 Directory Structure

```
tests/admin/
├── unit/
│   ├── components/          # Unit tests for admin components
│   │   ├── AdminNavbar.test.tsx
│   │   ├── AdminLoginNavbar.test.tsx
│   │   ├── TopicManager.test.tsx
│   │   ├── TopicSelector.test.tsx
│   │   └── ...
│   └── hooks/              # Unit tests for admin hooks
│       └── useAdminAuth.test.tsx
├── integration/            # Integration tests for admin workflows
│   ├── admin-auth-integration.test.tsx
│   ├── admin-dashboard-integration.test.tsx
│   ├── admin-content-management.test.tsx
│   └── ...
├── e2e/                   # End-to-end tests for admin user flows
│   ├── admin-auth-complete-flow.spec.ts
│   ├── admin-dashboard-flow.spec.ts
│   ├── admin-content-management-flow.spec.ts
│   └── ...
├── api/                   # API endpoint tests
│   ├── admin-topics-api.test.ts
│   ├── admin-sections-api.test.ts
│   └── ...
├── run-admin-tests.ts     # Test runner script
└── README.md             # This file
```

## 🧪 Test Types

### **Unit Tests** (`tests/admin/unit/`)

- **Purpose**: Test individual components and hooks in isolation
- **Focus**: Component rendering, props handling, state management, user interactions
- **Mocking**: All external dependencies are mocked
- **Examples**:
  - `AdminNavbar.test.tsx` - Tests navbar rendering, dropdowns, logout functionality
  - `TopicManager.test.tsx` - Tests topic CRUD operations, form validation
  - `useAdminAuth.test.tsx` - Tests authentication hook logic

### **Integration Tests** (`tests/admin/integration/`)

- **Purpose**: Test component interactions and data flow
- **Focus**: Component communication, API integration, routing
- **Mocking**: Limited mocking, focuses on real component interactions
- **Examples**:
  - `admin-dashboard-integration.test.tsx` - Tests dashboard rendering with authentication
  - `admin-content-management.test.tsx` - Tests question management workflow

### **E2E Tests** (`tests/admin/e2e/`)

- **Purpose**: Test complete user workflows in real browser
- **Focus**: Full user journeys, authentication flows, data persistence
- **Mocking**: No mocking, uses real browser and server
- **Examples**:
  - `admin-dashboard-flow.spec.ts` - Tests complete dashboard navigation
  - `admin-content-management-flow.spec.ts` - Tests question management workflow

### **API Tests** (`tests/admin/api/`)

- **Purpose**: Test API endpoints and data handling
- **Focus**: Request/response handling, error scenarios, data validation
- **Mocking**: Mocks fetch calls to test API logic
- **Examples**:
  - `admin-topics-api.test.ts` - Tests topic CRUD API endpoints

## 🚀 Running Tests

### **Run All Admin Tests**

```bash
npm run test:admin
```

### **Run by Test Type**

```bash
# Unit tests only
npm run test:admin:unit

# Integration tests only
npm run test:admin:integration

# API tests only
npm run test:admin:api

# E2E tests only
npm run test:admin:e2e
```

### **Run by Component Category**

```bash
# Component tests only
npm run test:admin:components

# Hook tests only
npm run test:admin:hooks
```

### **Run Individual Test Files**

```bash
# Run specific test file
jest tests/admin/unit/components/AdminNavbar.test.tsx --verbose

# Run tests matching pattern
jest tests/admin/unit --testNamePattern="AdminNavbar"
```

## 📋 Test Coverage

### **Authentication & Layout** ✅

- [x] `useAdminAuth` hook (Unit)
- [x] `AdminLayout` component (Integration)
- [x] `AdminLoginPage` (Integration)
- [x] `AdminNavbar` (Unit + Integration)
- [x] `AdminLoginNavbar` (Unit)
- [x] Login/logout flows (E2E)
- [x] Route protection (E2E)

### **Dashboard & Main Pages** 🔄

- [x] `AdminDashboard` page (Integration)
- [x] `AdminPage` root redirect (Integration)
- [x] Dashboard navigation (E2E)
- [x] Statistics display (E2E)
- [x] Theme switching (E2E)

### **Content Management** 🔄

- [x] `TopicManager` component (Unit)
- [x] `TopicSelector` component (Unit)
- [x] Question management workflow (Integration)
- [x] Topic CRUD operations (E2E)
- [x] Bulk operations (E2E)
- [x] Search and filtering (E2E)

### **API Endpoints** 🔄

- [x] Topics API (GET, POST, PUT, DELETE)
- [x] Question topics API
- [x] Bulk operations API
- [x] Error handling
- [x] Validation

## 🎯 Test Scenarios

### **Authentication Flow**

1. **Login Process**
   - Valid credentials → Dashboard redirect
   - Invalid credentials → Error message
   - Session persistence across refreshes
   - Logout → Login redirect

2. **Route Protection**
   - Unauthenticated access → Login redirect
   - Authenticated access → Allow navigation
   - Session expiration → Login redirect

### **Dashboard Functionality**

1. **Navigation**
   - All admin sections accessible
   - Breadcrumb navigation
   - Mobile responsive navigation

2. **Statistics Display**
   - Question counts
   - User statistics
   - Learning path metrics

### **Content Management**

1. **Question Management**
   - Create, read, update, delete questions
   - Search and filter functionality
   - Bulk operations
   - Topic assignment

2. **Topic Management**
   - CRUD operations for topics
   - Category organization
   - Question-topic relationships

### **Error Handling**

1. **Network Errors**
   - Offline scenarios
   - API failures
   - Timeout handling

2. **Validation Errors**
   - Form validation
   - Required field checks
   - Data type validation

## 🔧 Test Configuration

### **Jest Configuration**

- Test environment: `jsdom`
- Setup files: `@testing-library/jest-dom`
- Mock implementations for external dependencies
- Coverage reporting enabled

### **Playwright Configuration**

- Browser: Chromium (default)
- Viewport: 1280x720
- Timeout: 30 seconds
- Screenshots on failure

### **Mock Data**

- Sample admin users with different roles
- Mock questions and topics
- API response fixtures
- Error scenarios

## 📊 Test Metrics

### **Coverage Goals**

- **Unit Tests**: 90%+ line coverage
- **Integration Tests**: 80%+ component interaction coverage
- **E2E Tests**: 100% critical user flow coverage
- **API Tests**: 100% endpoint coverage

### **Performance Targets**

- Unit tests: < 5 seconds
- Integration tests: < 30 seconds
- E2E tests: < 2 minutes
- API tests: < 10 seconds

## 🐛 Debugging Tests

### **Unit Test Debugging**

```bash
# Run with verbose output
jest tests/admin/unit/components/AdminNavbar.test.tsx --verbose

# Run with coverage
jest tests/admin/unit --coverage

# Run in watch mode
jest tests/admin/unit --watch
```

### **E2E Test Debugging**

```bash
# Run with UI mode
playwright test tests/admin/e2e --ui

# Run in headed mode (see browser)
playwright test tests/admin/e2e --headed

# Run specific test
playwright test tests/admin/e2e/admin-dashboard-flow.spec.ts
```

### **Common Issues**

1. **Test Timeouts**: Increase timeout in test configuration
2. **Mock Issues**: Check mock implementations and cleanup
3. **Async Issues**: Use proper `waitFor` and `await` patterns
4. **Environment Issues**: Ensure test environment is properly set up

## 📝 Writing New Tests

### **Unit Test Template**

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import ComponentName from '@/components/ComponentName';

// Mock dependencies
jest.mock('@/hooks/useHook', () => ({
  useHook: jest.fn(),
}));

describe('ComponentName', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  test('should handle user interaction', async () => {
    render(<ComponentName />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    // Assert expected behavior
  });
});
```

### **E2E Test Template**

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin/login');
    // Setup steps
  });

  test('should complete user workflow', async ({ page }) => {
    // Test steps
    await page.getByText('Button Text').click();
    await expect(page).toHaveURL(/expected-url/);
  });
});
```

## 🎉 Success Criteria

- **All tests pass** in CI/CD pipeline
- **No flaky tests** (consistent results)
- **Fast execution** (under performance targets)
- **Good coverage** (meets coverage goals)
- **Clear documentation** (easy to understand and maintain)
- **Regular updates** (tests stay current with code changes)

## 📚 Additional Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)



