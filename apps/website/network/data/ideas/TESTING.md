# Testing Guide

This project includes comprehensive testing setup with unit tests, integration tests, E2E tests, and Storybook for component documentation.

## 🧪 Testing Stack

- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: Jest + API route testing
- **E2E Tests**: Playwright
- **Component Documentation**: Storybook

## 📁 Test Structure

```
tests/
├── unit/                 # Unit tests for components
│   └── learning-paths.test.tsx
├── integration/          # Integration tests for API routes
│   └── questions-api.test.ts
└── e2e/                 # End-to-end tests
    └── learning-paths.spec.ts

src/
├── components/
│   ├── LearningPathCard.tsx
│   └── LearningPathCard.stories.tsx
└── app/
    └── learning-paths/
        └── learning-paths.stories.tsx
```

## 🚀 Running Tests

### Unit Tests

```bash
# Run all unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### E2E Tests

```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run E2E tests in headed mode (see browser)
npm run test:e2e:headed
```

### All Tests

```bash
# Run both unit and E2E tests
npm run test:all
```

## 📚 Storybook

### Running Storybook

```bash
# Start Storybook development server
npm run storybook

# Build Storybook for production
npm run build-storybook
```

### Storybook Features

- **Component Documentation**: Interactive component examples
- **Visual Testing**: Visual regression testing with Chromatic
- **Accessibility Testing**: Built-in a11y addon
- **Responsive Testing**: Test components at different viewport sizes

## 🎯 Test Coverage

The project aims for 70% test coverage across:

- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

## 📝 Writing Tests

### Unit Tests

Unit tests focus on testing individual components in isolation:

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LearningPathCard } from '@/components/LearningPathCard'

describe('LearningPathCard', () => {
  it('should expand when header is clicked', async () => {
    const user = userEvent.setup()
    render(<LearningPathCard {...props} />)

    await user.click(screen.getByText('Frontend Basics'))
    expect(screen.getByText('Learn HTML, CSS...')).toBeVisible()
  })
})
```

### Integration Tests

Integration tests verify API routes and data flow:

```typescript
import { GET } from "@/app/api/questions/[pathId]/route";

describe("Questions API", () => {
  it("should return questions for valid learning path", async () => {
    const response = await GET(request, {
      params: { pathId: "frontend-basics" },
    });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.questions).toHaveLength(3);
  });
});
```

### E2E Tests

E2E tests verify complete user workflows:

```typescript
import { test, expect } from "@playwright/test";

test("should navigate to questions page", async ({ page }) => {
  await page.goto("/learning-paths");
  await page.getByText("Frontend Basics").click();
  await page.getByRole("link", { name: "Practice Questions" }).click();

  await expect(page).toHaveURL(/\/learning-paths\/frontend-basics\/questions/);
});
```

## 🔧 Configuration Files

- **Jest**: `jest.config.js` - Unit test configuration
- **Playwright**: `playwright.config.ts` - E2E test configuration
- **Storybook**: `.storybook/` - Component documentation configuration

## 🎨 Storybook Stories

Stories document component behavior and provide interactive examples:

```typescript
export const Collapsed: Story = {
  name: "Collapsed State",
  args: {
    path: mockLearningPath,
    isCollapsed: true,
    onToggle: () => {},
  },
};
```

## 🚦 CI/CD Integration

Tests are designed to run in CI/CD pipelines:

- Unit tests run on every commit
- E2E tests run on pull requests
- Storybook builds for visual regression testing

## 📊 Test Reports

- **Coverage**: Generated in `coverage/` directory
- **E2E Reports**: HTML reports in `playwright-report/`
- **Storybook**: Built stories in `storybook-static/`

## 🐛 Debugging Tests

### Unit Tests

```bash
# Debug specific test
npm run test -- --testNamePattern="should expand card"

# Debug with verbose output
npm run test -- --verbose
```

### E2E Tests

```bash
# Debug with browser dev tools
npm run test:e2e:headed

# Debug specific test
npm run test:e2e -- --grep "should navigate to questions"
```

## 📖 Best Practices

1. **Test Behavior, Not Implementation**: Focus on what the user sees and does
2. **Use Data Test IDs**: Add `data-testid` attributes for reliable element selection
3. **Mock External Dependencies**: Mock API calls and external services
4. **Test Edge Cases**: Include error states and boundary conditions
5. **Keep Tests Independent**: Each test should be able to run in isolation
6. **Use Descriptive Names**: Test names should clearly describe what is being tested

## 🔍 Troubleshooting

### Common Issues

1. **Tests timing out**: Increase timeout or add proper waits
2. **Elements not found**: Check selectors and add proper test IDs
3. **Mock issues**: Verify mock implementations match real API responses
4. **Coverage issues**: Ensure all code paths are tested

### Getting Help

- Check test output for specific error messages
- Use `--verbose` flag for detailed test information
- Review Storybook stories for component behavior examples
