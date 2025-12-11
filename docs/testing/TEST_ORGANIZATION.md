# Test Organization Structure

## 📁 Directory Structure

```
project-root/
├── tests/
│   ├── config/                    # Test configuration files
│   │   ├── jest.config.js         # Root Jest configuration
│   │   ├── jest.preset.js         # Jest preset for Nx
│   │   ├── jest.setup.js          # Jest global setup
│   │   └── playwright.config.ts   # Playwright E2E configuration
│   └── e2e/                       # End-to-end tests
│       ├── admin/                 # Admin flow E2E tests
│       ├── freestyle-flow/        # Freestyle flow E2E tests
│       ├── guided-flow/           # Guided flow E2E tests
│       ├── shared-components/     # Shared E2E test components
│       ├── global-setup.ts        # E2E global setup
│       ├── global-teardown.ts     # E2E global teardown
│       └── test-env-loader.ts     # E2E environment loader
├── apps/
│   ├── website/
│   │   ├── components/            # Components with co-located tests
│   │   │   └── Component.test.tsx # Unit tests next to components
│   │   ├── page-components/       # Page components with tests
│   │   │   └── page.test.tsx      # Page tests next to pages
│   │   ├── lib/                   # Utilities with tests
│   │   │   └── util.test.ts       # Utility tests
│   │   └── jest.config.js         # App-specific Jest config
│   └── admin/
│       ├── components/            # Admin components with tests
│       └── jest.config.js         # Admin Jest config
└── libs/
    ├── components/
    │   ├── src/
    │   │   └── lib/
    │   │       └── Component.test.tsx  # Lib component tests
    │   └── jest.config.ts         # Lib-specific Jest config
    └── utilities/
        └── jest.config.ts         # Utilities Jest config
```

## 🎯 Test Organization Principles

### 1. **Configuration Files** → `tests/config/`

All test configuration files are centralized in `tests/config/`:

- `jest.config.js` - Root Jest configuration
- `jest.preset.js` - Nx Jest preset
- `jest.setup.js` - Global Jest setup (test environment, mocks)
- `playwright.config.ts` - Playwright E2E configuration

### 2. **E2E Tests** → `tests/e2e/`

End-to-end tests are organized by flow:

- `admin/` - Admin panel E2E tests
- `freestyle-flow/` - Freestyle learning flow tests
- `guided-flow/` - Guided learning flow tests
- `shared-components/` - Reusable E2E test components

### 3. **Unit & Integration Tests** → Co-located

Unit and integration tests remain **co-located** with their source files:

- `Component.tsx` → `Component.test.tsx` (same directory)
- `util.ts` → `util.test.ts` (same directory)
- `page.tsx` → `page.test.tsx` (same directory)

**Why co-location?**

- ✅ Easy to find tests for any component
- ✅ Tests are updated when components change
- ✅ Better developer experience
- ✅ Industry best practice

## 🚀 Running Tests

### Unit Tests

```bash
# Run all unit tests
bun run test:unit

# Run tests for specific flow
bun run test:unit:guided-flow
bun run test:unit:freestyle-flow
bun run test:unit:admin
```

### Integration Tests

```bash
# Run all integration tests
bun run test:integration

# Run integration tests for specific flow
bun run test:integration:guided-flow
bun run test:integration:admin
```

### E2E Tests

```bash
# Run all E2E tests
bun run test:e2e

# Run E2E tests for specific flow
bun run test:e2e:guided-flow
bun run test:e2e:freestyle-flow
bun run test:e2e:admin

# Run E2E tests with UI
bun run test:e2e:ui

# Debug E2E tests
bun run test:e2e:debug
```

## 📝 Test File Naming Conventions

### Unit Tests

- `Component.test.tsx` - Component unit tests
- `util.test.ts` - Utility function tests
- `page.test.tsx` - Page component tests

### Integration Tests

- `Component.integration.test.tsx` - Component integration tests
- `api.integration.test.ts` - API integration tests

### E2E Tests

- `feature.spec.ts` - E2E test specs
- `flow.basic.spec.ts` - Basic flow E2E tests
- `flow.validation.spec.ts` - Validation E2E tests

## 🔧 Configuration References

### Jest Configuration

All Jest configs reference the root configuration:

```javascript
// apps/website/jest.config.js
module.exports = {
  preset: "../../tests/config/jest.preset.js",
  setupFilesAfterEnv: ["../../tests/config/jest.setup.js"],
  // ... app-specific config
};
```

### Playwright Configuration

All E2E tests use the centralized config:

```bash
playwright test --config=tests/config/playwright.config.ts
```

## 📊 Test Coverage

Test coverage reports are generated in:

- `coverage/` - Jest coverage reports
- `playwright-report/` - Playwright test reports

## 🎯 Best Practices

1. **Keep unit tests co-located** with source files
2. **Centralize configuration** in `tests/config/`
3. **Organize E2E tests** by user flow in `tests/e2e/`
4. **Use descriptive names** for test files
5. **Run tests in parallel** when possible (use `--workers=1` for memory constraints)
6. **Keep tests focused** - one concern per test
7. **Use test utilities** from `test-utils/` for shared logic

## 🔄 Migration Notes

### Before

```
project-root/
├── jest.config.js           # ❌ Root level
├── jest.preset.js           # ❌ Root level
├── jest.setup.js            # ❌ Root level
├── playwright.config.ts     # ❌ Root level
└── tests/
    └── e2e/                 # ✅ Already organized
```

### After

```
project-root/
└── tests/
    ├── config/              # ✅ Centralized configs
    │   ├── jest.config.js
    │   ├── jest.preset.js
    │   ├── jest.setup.js
    │   └── playwright.config.ts
    └── e2e/                 # ✅ E2E tests
```

## 📚 Related Documentation

- [Comprehensive Test Plan](./COMPREHENSIVE_TEST_PLAN.md)
- [Test Summary](./TEST_SUMMARY.md)
- [Testing Automatic Updates](../.cursor/rules/testing-automatic-updates.mdc)
