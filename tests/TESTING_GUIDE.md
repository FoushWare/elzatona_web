# Testing Guide

## Test Structure

```
tests/
├── api/                    # API endpoint tests
├── unit/                   # Unit tests (components, hooks, services)
├── integration/            # Integration tests
├── e2e/                   # End-to-end tests
├── performance/           # Performance tests
├── accessibility/         # Accessibility tests
├── visual/               # Visual regression tests
├── stories/              # Storybook stories
├── pages/                # Page component tests
├── components/           # Component tests
└── config/               # Test configuration
```

## Running Tests

```bash
# Individual test suites
npm run test:unit
npm run test:integration
npm run test:e2e
npm run test:api
npm run test:performance
npm run test:accessibility
npm run test:visual
npm run test:storybook

# Comprehensive testing
npm run test:comprehensive
npm run test:coverage
```

## Test Types

1. **Unit Tests**: Test individual components and functions
2. **Integration Tests**: Test component interactions
3. **E2E Tests**: Test complete user workflows
4. **API Tests**: Test API endpoints
5. **Performance Tests**: Test performance metrics
6. **Accessibility Tests**: Test WCAG compliance
7. **Visual Tests**: Test UI consistency
8. **Storybook Tests**: Test component variations

## Best Practices

- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Keep tests independent
- Use consistent test data
- Test both positive and negative cases
- Verify accessibility attributes
- Clean up after tests
