# Theme Tests Documentation

This document provides comprehensive information about the theme testing suite for the application's light and dark mode functionality.

## 🎨 Overview

The theme tests ensure that the application's theme switching functionality works correctly across all components and pages. This includes testing the theme context, visual changes, persistence, and user interactions.

## 📁 Test Structure

```
tests/
├── unit/
│   ├── theme-context.test.tsx           # Theme context functionality
│   ├── theme-toggle-button.test.tsx     # Toggle button behavior
│   └── theme-visual-changes.test.tsx    # Visual styling changes
├── integration/
│   └── theme-persistence.test.tsx       # Cross-page theme persistence
├── e2e/
│   └── theme-switching.spec.ts          # End-to-end user workflows
├── run-theme-tests.ts                   # TypeScript test runner
└── THEME_TESTS_README.md               # This documentation
```

## 🧪 Test Categories

### 1. Unit Tests

#### Theme Context Tests (`theme-context.test.tsx`)

- **Purpose**: Test the core theme context functionality
- **Coverage**:
  - Theme state management
  - localStorage persistence
  - Theme toggle functionality
  - Document root class application
  - Error handling for invalid usage

#### Theme Toggle Button Tests (`theme-toggle-button.test.tsx`)

- **Purpose**: Test the theme toggle button component
- **Coverage**:
  - Button rendering and accessibility
  - Icon changes (sun/moon)
  - Click interactions
  - Styling and CSS classes
  - State persistence across re-renders

#### Theme Visual Changes Tests (`theme-visual-changes.test.tsx`)

- **Purpose**: Test visual changes when theme switches
- **Coverage**:
  - CSS class applications
  - Form element styling
  - Color contrast and accessibility
  - Transition animations
  - Component-specific theme styling

### 2. Integration Tests

#### Theme Persistence Tests (`theme-persistence.test.tsx`)

- **Purpose**: Test theme persistence across page interactions
- **Coverage**:
  - localStorage persistence
  - Page reload behavior
  - Cross-page navigation
  - Multiple theme changes
  - Invalid localStorage handling

### 3. End-to-End Tests

#### Theme Switching E2E Tests (`theme-switching.spec.ts`)

- **Purpose**: Test complete user workflows
- **Coverage**:
  - Full theme toggle workflow
  - Theme persistence across page reloads
  - Icon changes and visual feedback
  - Document root class applications
  - Cross-page theme consistency
  - Rapid theme toggles
  - Navigation with theme preservation

## 🚀 Running Tests

### Quick Commands

```bash
# Run all theme tests
npm run test:theme

# Run specific test categories
npm run test:theme:unit          # Unit tests only
npm run test:theme:integration   # Integration tests only
npm run test:theme:e2e          # E2E tests only

# Run individual test files
npx jest tests/unit/theme-context.test.tsx --verbose
npx jest tests/unit/theme-toggle-button.test.tsx --verbose
npx jest tests/unit/theme-visual-changes.test.tsx --verbose
npx jest tests/integration/theme-persistence.test.tsx --verbose
npx playwright test tests/e2e/theme-switching.spec.ts
```

### Test Runners

#### TypeScript Runner

```bash
tsx tests/run-theme-tests.ts
```

#### Bash Runner

```bash
./scripts/run-theme-tests.sh
```

## 🔧 Test Configuration

### Jest Configuration

The theme tests use the standard Jest configuration with the following key features:

- React Testing Library for component testing
- Mock implementations for localStorage and document
- Proper cleanup between tests
- Async/await support for theme state changes

### Playwright Configuration

E2E tests use Playwright with:

- Headless mode by default
- Timeout configurations for theme changes
- Local storage management
- Cross-page navigation testing

## 🎯 Test Scenarios

### Core Functionality

1. **Theme Initialization**
   - Default dark theme on first visit
   - Loading saved theme from localStorage
   - Handling invalid localStorage values

2. **Theme Switching**
   - Toggle between light and dark modes
   - Visual feedback (icon changes)
   - CSS class applications
   - localStorage updates

3. **Theme Persistence**
   - Saving theme preference
   - Loading theme on page reload
   - Cross-page consistency
   - Navigation preservation

### Edge Cases

1. **Rapid Toggles**
   - Multiple quick theme changes
   - State consistency
   - Performance considerations

2. **Invalid Data**
   - Corrupted localStorage values
   - Missing theme preferences
   - Error handling and recovery

3. **Browser Compatibility**
   - localStorage availability
   - Document manipulation
   - CSS class support

## 🐛 Common Issues and Solutions

### Issue: Tests failing due to localStorage mocking

**Solution**: Ensure localStorage mock is properly set up in test setup files.

### Issue: Theme changes not persisting in E2E tests

**Solution**: Add proper wait times for theme state changes and localStorage updates.

### Issue: CSS classes not being applied in tests

**Solution**: Mock document.documentElement properly and verify class applications.

### Issue: Icon changes not detected in tests

**Solution**: Use proper selectors for SVG elements and wait for DOM updates.

## 📊 Test Coverage

The theme tests provide comprehensive coverage of:

- ✅ Theme context state management
- ✅ User interface interactions
- ✅ Visual styling changes
- ✅ Data persistence
- ✅ Cross-page behavior
- ✅ Error handling
- ✅ Accessibility features
- ✅ Performance considerations

## 🔍 Debugging Tests

### Unit Test Debugging

```bash
# Run with verbose output
npx jest tests/unit/theme-context.test.tsx --verbose --no-cache

# Run specific test
npx jest tests/unit/theme-context.test.tsx --testNamePattern="should toggle theme"
```

### E2E Test Debugging

```bash
# Run with UI mode
npx playwright test tests/e2e/theme-switching.spec.ts --ui

# Run in headed mode
npx playwright test tests/e2e/theme-switching.spec.ts --headed

# Debug specific test
npx playwright test tests/e2e/theme-switching.spec.ts --grep "should toggle between light and dark themes"
```

## 📈 Continuous Integration

The theme tests are designed to run in CI environments:

- No external dependencies
- Proper mocking of browser APIs
- Consistent test results
- Fast execution times

## 🎉 Success Criteria

Tests pass when:

- ✅ All theme switching functionality works correctly
- ✅ Visual changes are applied properly
- ✅ Theme preferences persist across sessions
- ✅ No accessibility issues are introduced
- ✅ Performance remains optimal
- ✅ Cross-browser compatibility is maintained

## 📝 Contributing

When adding new theme-related features:

1. Add corresponding unit tests
2. Update integration tests if needed
3. Add E2E tests for user workflows
4. Update this documentation
5. Ensure all tests pass before merging

## 🔗 Related Documentation

- [Admin Tests Documentation](./ADMIN_TESTS_README.md)
- [Testing Guidelines](../docs/testing-guidelines.md)
- [Theme Implementation Guide](../docs/theme-implementation.md)
