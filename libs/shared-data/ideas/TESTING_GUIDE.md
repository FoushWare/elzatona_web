# Testing Guide for Frontend KodDev

This guide provides comprehensive information about the testing strategy, setup, and execution for the Frontend KodDev project.

## 🧪 Testing Overview

Our testing strategy follows a multi-layered approach to ensure code quality, reliability, and user experience:

- **Unit Tests**: Test individual components and functions in isolation
- **Integration Tests**: Test component interactions and data flow
- **E2E Tests**: Test complete user journeys across the application
- **Storybook Tests**: Test component variations and visual regression
- **Linting & Type Checking**: Ensure code quality and type safety

## 📁 Test Structure

```
tests/
├── unit/                    # Unit tests
│   ├── auth-page.test.tsx
│   ├── dashboard-page.test.tsx
│   └── enhanced-dashboard.test.tsx
├── integration/             # Integration tests
│   ├── firebase-auth-integration.test.tsx
│   └── dashboard-integration.test.tsx
└── e2e/                     # End-to-end tests
    ├── auth-flow.spec.ts
    └── dashboard-flow.spec.ts

src/stories/                 # Storybook stories
├── AuthPage.stories.tsx
├── DashboardPage.stories.tsx
└── EnhancedDashboard.stories.tsx
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers (for E2E tests)
npx playwright install
```

### Running Tests

```bash
# Run all tests
./scripts/run-all-tests.sh

# Run specific test types
./scripts/run-all-tests.sh unit
./scripts/run-all-tests.sh integration
./scripts/run-all-tests.sh e2e
./scripts/run-all-tests.sh storybook
```

## 🔧 Test Configuration

### Jest Configuration (`jest.config.js`)

- **Environment**: jsdom for React component testing
- **Coverage**: 70% threshold for branches, functions, lines, and statements
- **Setup**: Custom setup file for test environment
- **Module Mapping**: Path aliases for clean imports

### Playwright Configuration (`playwright.config.ts`)

- **Browsers**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari
- **Base URL**: http://localhost:3000
- **Parallel Execution**: Enabled for faster test runs
- **Retries**: 2 retries on CI, 0 locally

### Storybook Configuration

- **Framework**: React with TypeScript
- **Addons**: Controls, Actions, Viewport, Accessibility
- **Stories**: Organized by component type and complexity

## 📋 Test Types

### 1. Unit Tests

**Purpose**: Test individual components and functions in isolation.

**Coverage**:

- Component rendering
- User interactions
- State management
- Props handling
- Error states
- Loading states

**Example**:

```typescript
// tests/unit/auth-page.test.tsx
test('renders login form by default', () => {
  render(<AuthPage />);
  expect(screen.getByText('Welcome Back!')).toBeInTheDocument();
  expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
});
```

**Running**:

```bash
npm run test:unit
```

### 2. Integration Tests

**Purpose**: Test component interactions and data flow between different parts of the application.

**Coverage**:

- Firebase authentication flow
- Dashboard data loading
- User progress tracking
- Error handling across components
- State synchronization

**Example**:

```typescript
// tests/integration/firebase-auth-integration.test.tsx
test('completes full email login flow', async () => {
  mockFirebaseAuth.signInWithEmail.mockResolvedValue({ success: true });

  render(<AuthPage />);

  fireEvent.change(screen.getByLabelText('Email Address'), {
    target: { value: 'test@example.com' }
  });
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  await waitFor(() => {
    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });
});
```

**Running**:

```bash
npm run test:integration
```

### 3. E2E Tests

**Purpose**: Test complete user journeys across the application.

**Coverage**:

- Authentication flow (login, signup, social auth)
- Dashboard navigation and interactions
- Responsive design across devices
- Accessibility compliance
- Performance benchmarks
- Error handling in real browser environment

**Example**:

```typescript
// tests/e2e/auth-flow.spec.ts
test("should render authentication page correctly", async ({ page }) => {
  await page.goto("/auth");

  await expect(page.getByText("Welcome Back!")).toBeVisible();
  await expect(page.getByLabel("Email Address")).toBeVisible();
  await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
});
```

**Running**:

```bash
npm run test:e2e
```

### 4. Storybook Tests

**Purpose**: Test component variations, visual regression, and component documentation.

**Coverage**:

- Component states (loading, error, success)
- Different props and configurations
- Responsive design variations
- Dark/light mode themes
- Interactive component behavior

**Example**:

```typescript
// src/stories/AuthPage.stories.tsx
export const Default: Story = {
  name: "Default Login View",
  parameters: {
    docs: {
      description: {
        story:
          "Default view showing the login form with email/password fields and social login options.",
      },
    },
  },
};
```

**Running**:

```bash
npm run storybook
npm run test:storybook
```

## 🎯 Test Coverage

### Authentication Tests

#### Unit Tests

- ✅ Form rendering and validation
- ✅ User input handling
- ✅ Password visibility toggle
- ✅ Form state management
- ✅ Error message display
- ✅ Loading states
- ✅ Social login buttons

#### Integration Tests

- ✅ Complete email authentication flow
- ✅ Social authentication flow
- ✅ Form validation integration
- ✅ Authentication state management
- ✅ Error handling across components
- ✅ Loading state coordination

#### E2E Tests

- ✅ Complete user authentication journey
- ✅ Responsive design testing
- ✅ Accessibility compliance
- ✅ Cross-browser compatibility
- ✅ Performance testing
- ✅ Error handling in real environment

### Dashboard Tests

#### Unit Tests

- ✅ Component rendering
- ✅ User progress display
- ✅ Quick action navigation
- ✅ Statistics toggle
- ✅ Loading and error states
- ✅ User profile display

#### Integration Tests

- ✅ Authentication state integration
- ✅ Progress data loading
- ✅ User interaction flow
- ✅ Error handling and retry
- ✅ Navigation integration
- ✅ State synchronization

#### E2E Tests

- ✅ Complete dashboard user journey
- ✅ Responsive design across devices
- ✅ Navigation and interaction testing
- ✅ Performance benchmarks
- ✅ Accessibility compliance
- ✅ Error handling scenarios

## 🔍 Test Utilities

### Mocking

We use comprehensive mocking for external dependencies:

```typescript
// Mock Firebase Auth Context
const mockFirebaseAuth = {
  signInWithGoogle: jest.fn(),
  signInWithGithub: jest.fn(),
  signInWithEmail: jest.fn(),
  signUpWithEmail: jest.fn(),
  isAuthenticated: false,
  user: null,
  isLoading: false,
};

// Mock Next.js router
const mockRouter = {
  push: jest.fn(),
};
```

### Test Helpers

```typescript
// Custom render function with providers
const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <FirebaseAuthProvider>
      <RouterProvider>
        {ui}
      </RouterProvider>
    </FirebaseAuthProvider>
  );
};
```

## 📊 Coverage Reports

### Unit Test Coverage

```bash
npm run test:unit -- --coverage
```

Coverage reports are generated in:

- `coverage/lcov-report/index.html` - HTML report
- `coverage/lcov.info` - LCOV format for CI

### E2E Test Reports

```bash
npm run test:e2e
```

Reports are generated in:

- `playwright-report/index.html` - HTML report with screenshots and videos

## 🚀 CI/CD Integration

### GitHub Actions

```yaml
# .github/workflows/test.yml
name: Test Suite
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm ci
      - run: npx playwright install
      - run: ./scripts/run-all-tests.sh
```

### Pre-commit Hooks

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write", "git add"]
  }
}
```

## 🐛 Debugging Tests

### Unit Tests

```bash
# Run tests in watch mode
npm run test:unit -- --watch

# Run specific test file
npm run test:unit -- auth-page.test.tsx

# Run with verbose output
npm run test:unit -- --verbose
```

### E2E Tests

```bash
# Run tests in headed mode (see browser)
npx playwright test --headed

# Run specific test file
npx playwright test auth-flow.spec.ts

# Debug mode (step through tests)
npx playwright test --debug
```

### Storybook

```bash
# Start Storybook in development mode
npm run storybook

# Build Storybook for production
npm run build-storybook
```

## 📝 Writing Tests

### Best Practices

1. **Test Behavior, Not Implementation**

   ```typescript
   // Good: Test what the user sees
   expect(screen.getByText("Welcome Back!")).toBeInTheDocument();

   // Bad: Test implementation details
   expect(component.state.isLogin).toBe(true);
   ```

2. **Use Descriptive Test Names**

   ```typescript
   // Good
   test('should show error when passwords do not match in signup', () => {

   // Bad
   test('password validation', () => {
   ```

3. **Test Edge Cases**

   ```typescript
   test('handles empty progress data gracefully', () => {
     mockUserProgress.setState({
       progress: {
         questionsCompleted: 0,
         challengesCompleted: 0,
         totalScore: 0,
         streak: 0,
         badges: [],
         achievements: [],
       },
     });
   ```

4. **Mock External Dependencies**

   ```typescript
   // Mock Firebase
   jest.mock("@/contexts/FirebaseAuthContext", () => ({
     useFirebaseAuth: () => mockFirebaseAuth,
   }));
   ```

5. **Use Accessibility Testing**
   ```typescript
   test("should be keyboard navigable", async ({ page }) => {
     await page.keyboard.press("Tab");
     await expect(page.getByLabel("Email Address")).toBeFocused();
   });
   ```

### Test Structure

```typescript
describe("ComponentName", () => {
  beforeEach(() => {
    // Setup before each test
  });

  describe("Rendering", () => {
    test("renders correctly", () => {
      // Test basic rendering
    });
  });

  describe("User Interactions", () => {
    test("handles user input", () => {
      // Test user interactions
    });
  });

  describe("Error Handling", () => {
    test("handles errors gracefully", () => {
      // Test error scenarios
    });
  });
});
```

## 🔧 Troubleshooting

### Common Issues

1. **Tests failing due to missing mocks**

   ```bash
   # Check if all dependencies are mocked
   npm run test:unit -- --verbose
   ```

2. **E2E tests timing out**

   ```bash
   # Increase timeout in playwright.config.ts
   testTimeout: 30000
   ```

3. **Coverage below threshold**

   ```bash
   # Check coverage report
   open coverage/lcov-report/index.html
   ```

4. **Storybook not loading**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules/.cache
   npm run storybook
   ```

### Performance Optimization

1. **Parallel Test Execution**

   ```bash
   # Run tests in parallel
   npm run test:unit -- --maxWorkers=4
   ```

2. **Selective Test Running**

   ```bash
   # Run only changed tests
   npm run test:unit -- --onlyChanged
   ```

3. **E2E Test Optimization**
   ```bash
   # Run tests in parallel
   npx playwright test --workers=4
   ```

## 📚 Additional Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Storybook Documentation](https://storybook.js.org/docs/react/get-started/introduction)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## 🤝 Contributing

When adding new features:

1. Write unit tests for new components
2. Add integration tests for new flows
3. Create E2E tests for user journeys
4. Add Storybook stories for new components
5. Ensure all tests pass before submitting PR

### Test Checklist

- [ ] Unit tests cover new functionality
- [ ] Integration tests cover component interactions
- [ ] E2E tests cover user journeys
- [ ] Storybook stories demonstrate component variations
- [ ] All tests pass locally
- [ ] Coverage meets threshold requirements
- [ ] Accessibility tests pass
- [ ] Performance tests pass
- [ ] Cross-browser compatibility verified

---

**Happy Testing! 🧪✨**
