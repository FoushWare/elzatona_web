# 🧪 Comprehensive Admin Testing Suite

This document provides a complete guide to the admin testing infrastructure for the Elzatona-web project.

## 📋 Overview

The admin testing suite provides comprehensive coverage for all admin functionality including:

- **Authentication & Authorization** - Login, session management, route protection
- **API Endpoints** - All CRUD operations for content management
- **UI Components** - React component testing with user interactions
- **Integration Tests** - End-to-end workflows and cross-component interactions
- **Error Handling** - Graceful error recovery and edge cases

## 🏗️ Test Architecture

### Test Categories

1. **Authentication Tests** (`tests/admin/admin-login-*.test.*`)
   - API endpoint authentication
   - UI component interactions
   - Integration flows
   - Security measures

2. **API Tests** (`tests/admin/*-api.test.ts`)
   - Content Management API
   - Frontend Tasks API
   - Problem Solving API
   - CRUD operations validation

3. **UI Component Tests** (`tests/admin/admin-ui-components.test.tsx`)
   - React component rendering
   - User interactions
   - State management
   - Error handling

4. **Integration Tests** (`tests/admin/admin-integration.test.tsx`)
   - Complete workflows
   - Cross-component interactions
   - Data consistency
   - Performance testing

## 🚀 Running Tests

### Quick Start

```bash
# Run all admin tests
npm run test:admin

# Run specific test categories
npm run test:admin:auth      # Authentication tests
npm run test:admin:api       # API tests
npm run test:admin:ui        # UI component tests
npm run test:admin:integration # Integration tests

# Run with coverage
npm run test:admin:coverage

# Watch mode for development
npm run test:admin:watch
```

### Detailed Commands

```bash
# Run all tests with detailed output
node scripts/run-admin-tests.mjs all

# Run specific category
node scripts/run-admin-tests.mjs category "Authentication Tests"

# Watch mode
node scripts/run-admin-tests.mjs watch

# Help
node scripts/run-admin-tests.mjs help
```

## 📊 Test Coverage

### API Endpoints Coverage

| Endpoint               | GET | POST | PUT | DELETE | Validation | Error Handling |
| ---------------------- | --- | ---- | --- | ------ | ---------- | -------------- |
| `/api/cards`           | ✅  | ✅   | ✅  | ✅     | ✅         | ✅             |
| `/api/plans`           | ✅  | ✅   | ✅  | ✅     | ✅         | ✅             |
| `/api/categories`      | ✅  | ✅   | ✅  | ✅     | ✅         | ✅             |
| `/api/topics`          | ✅  | ✅   | ✅  | ✅     | ✅         | ✅             |
| `/api/questions`       | ✅  | ✅   | ✅  | ✅     | ✅         | ✅             |
| `/api/frontend-tasks`  | ✅  | ✅   | ✅  | ✅     | ✅         | ✅             |
| `/api/problem-solving` | ✅  | ✅   | ✅  | ✅     | ✅         | ✅             |

### UI Components Coverage

| Component          | Rendering | Interactions | State | Error Handling | Accessibility |
| ------------------ | --------- | ------------ | ----- | -------------- | ------------- |
| Content Management | ✅        | ✅           | ✅    | ✅             | ✅            |
| Questions Page     | ✅        | ✅           | ✅    | ✅             | ✅            |
| Frontend Tasks     | ✅        | ✅           | ✅    | ✅             | ✅            |
| Problem Solving    | ✅        | ✅           | ✅    | ✅             | ✅            |
| Dashboard          | ✅        | ✅           | ✅    | ✅             | ✅            |

### Integration Workflows Coverage

| Workflow            | Create | Read | Update | Delete | Search | Filter |
| ------------------- | ------ | ---- | ------ | ------ | ------ | ------ |
| Card Management     | ✅     | ✅   | ✅     | ✅     | ✅     | ✅     |
| Question Management | ✅     | ✅   | ✅     | ✅     | ✅     | ✅     |
| Task Management     | ✅     | ✅   | ✅     | ✅     | ✅     | ✅     |
| Cross-Component     | ✅     | ✅   | ✅     | ✅     | ✅     | ✅     |

## 🔧 Test Configuration

### Jest Configuration (`jest.config.js`)

```javascript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/*.test.{js,jsx,ts,tsx}',
    '!src/**/*.spec.{js,jsx,ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};

module.exports = createJestConfig(customJestConfig);
```

### Setup File (`jest.setup.js`)

The setup file includes:

- Testing Library configuration
- Next.js router mocking
- Firebase mocking
- Local storage mocking
- Console warning suppression

## 📝 Writing Tests

### API Test Structure

```typescript
describe('API Endpoint Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/endpoint', () => {
    it('should return data successfully', async () => {
      // Mock Firebase response
      const mockData = [{ id: '1', name: 'Test' }];

      // Mock Firebase collection
      const mockFirestore = require('firebase-admin').firestore();
      mockFirestore.collection.mockReturnValue({
        get: jest.fn().mockResolvedValue({
          docs: mockData.map(item => ({
            id: item.id,
            data: () => item,
          })),
        }),
      });

      // Test API endpoint
      const { GET } = await import('@/app/api/endpoint/route');
      const request = new NextRequest('http://localhost:3000/api/endpoint');

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveLength(1);
    });
  });
});
```

### UI Component Test Structure

```typescript
describe('Component Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseQuery.mockReturnValue({
      data: { data: [] },
      isLoading: false,
      error: null,
    });

    mockUseMutation.mockReturnValue({
      mutate: jest.fn(),
      isLoading: false,
      error: null,
    });
  });

  it('should render component with data', async () => {
    const mockData = [{ id: '1', name: 'Test' }];

    mockUseQuery.mockReturnValue({
      data: { data: mockData },
      isLoading: false,
      error: null,
    });

    const Component = (await import('@/app/admin/page')).default;
    render(<Component />);

    await waitFor(() => {
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });
});
```

### Integration Test Structure

```typescript
describe('Integration Tests', () => {
  it('should complete full CRUD workflow', async () => {
    // Step 1: Create
    const addButton = screen.getByText(/add/i);
    await userEvent.click(addButton);

    // Fill form and submit
    const nameInput = screen.getByLabelText(/name/i);
    await userEvent.type(nameInput, 'Test Item');

    const submitButton = screen.getByText(/create/i);
    await userEvent.click(submitButton);

    // Step 2: Verify creation
    await waitFor(() => {
      expect(screen.getByText('Test Item')).toBeInTheDocument();
    });

    // Step 3: Edit
    const editButton = screen.getByLabelText(/edit/i);
    await userEvent.click(editButton);

    // Update and save
    const editInput = screen.getByDisplayValue('Test Item');
    await userEvent.clear(editInput);
    await userEvent.type(editInput, 'Updated Item');

    const saveButton = screen.getByText(/save/i);
    await userEvent.click(saveButton);

    // Step 4: Verify update
    await waitFor(() => {
      expect(screen.getByText('Updated Item')).toBeInTheDocument();
    });

    // Step 5: Delete
    const deleteButton = screen.getByLabelText(/delete/i);
    await userEvent.click(deleteButton);

    const confirmButton = screen.getByText(/confirm/i);
    await userEvent.click(confirmButton);

    // Step 6: Verify deletion
    await waitFor(() => {
      expect(screen.queryByText('Updated Item')).not.toBeInTheDocument();
    });
  });
});
```

## 🐛 Debugging Tests

### Common Issues

1. **Firebase Mocking Issues**

   ```bash
   # Check if Firebase mocks are properly configured
   npx jest tests/admin/ --verbose
   ```

2. **Component Rendering Issues**

   ```bash
   # Run specific component test with debug output
   npx jest tests/admin/admin-ui-components.test.tsx --verbose --no-cache
   ```

3. **Async Test Issues**
   ```bash
   # Run tests with longer timeout
   npx jest tests/admin/ --testTimeout=10000
   ```

### Debug Mode

```bash
# Run tests with debug output
DEBUG=jest* npm run test:admin

# Run specific test file with debug
npx jest tests/admin/admin-integration.test.tsx --verbose --no-cache
```

## 📈 Coverage Reports

### Generating Reports

```bash
# Generate HTML coverage report
npm run test:admin:coverage

# View coverage report
open coverage/admin/index.html
```

### Coverage Goals

- **Statements**: > 70%
- **Branches**: > 70%
- **Functions**: > 70%
- **Lines**: > 70%

## 🔄 Continuous Integration

### Pre-commit Hooks

Tests are automatically run before commits:

```bash
# Check current git hook configuration
npm run git-hooks:status

# Configure admin tests for pre-commit
npm run git-hooks:admin-tests
```

### CI/CD Pipeline

```yaml
# Example GitHub Actions workflow
name: Admin Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:admin:coverage
      - uses: codecov/codecov-action@v3
        with:
          file: ./coverage/admin/lcov.info
```

## 📚 Best Practices

### Test Organization

1. **Group related tests** in describe blocks
2. **Use descriptive test names** that explain the expected behavior
3. **Mock external dependencies** consistently
4. **Clean up after each test** with beforeEach/afterEach
5. **Test both success and error cases**

### Test Data

1. **Use realistic test data** that matches production
2. **Create reusable test fixtures** for common data structures
3. **Mock API responses** with proper structure
4. **Test edge cases** and boundary conditions

### Performance

1. **Run tests in parallel** when possible
2. **Use efficient selectors** in component tests
3. **Mock expensive operations** like API calls
4. **Keep test data minimal** but comprehensive

## 🎯 Future Enhancements

### Planned Improvements

1. **Visual Regression Testing** - Screenshot comparisons
2. **Performance Testing** - Load and stress testing
3. **Accessibility Testing** - Automated a11y checks
4. **E2E Testing** - Playwright integration
5. **Mutation Testing** - Test quality validation

### Contributing

When adding new admin functionality:

1. **Write tests first** (TDD approach)
2. **Update existing tests** if functionality changes
3. **Add integration tests** for new workflows
4. **Update this documentation** with new test patterns
5. **Ensure coverage goals** are maintained

---

**Last Updated**: December 2024  
**Test Suite Version**: 2.0.0  
**Maintainer**: Development Team
