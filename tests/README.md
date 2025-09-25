# Auto-linking System Integration Tests

This directory contains comprehensive integration tests for the auto-linking system that connects questions, sections, and guided learning plans.

## Test Structure

```
tests/
├── integration/
│   ├── auto-linking.test.js      # Core auto-linking functionality tests
│   └── api-integration.test.js   # API endpoint integration tests
├── e2e/
│   └── auto-linking-workflow.test.js  # End-to-end user workflow tests
├── setup.js                      # Jest setup and mocks
└── README.md                     # This file
```

## Test Categories

### 1. Integration Tests (`tests/integration/`)

#### Auto-linking Tests (`auto-linking.test.js`)

Tests the core auto-linking functionality:

- **Question Creation and Auto-linking**: Verifies that questions are automatically linked to matching sections based on category and learning path
- **Section Management**: Tests section creation, question filtering, and relationship management
- **Guided Learning Plan Integration**: Tests plan creation with sections and questions
- **Bulk Question Import**: Tests auto-linking when importing multiple questions
- **Error Handling**: Tests edge cases and error scenarios

#### API Integration Tests (`api-integration.test.js`)

Tests the complete API flow:

- **Question Creation API**: Tests POST `/api/admin/questions` with auto-linking
- **Sections API**: Tests GET `/api/admin/sections` with filtering
- **Guided Learning API**: Tests plan creation and management endpoints
- **Error Handling**: Tests API error responses and validation

### 2. End-to-End Tests (`tests/e2e/`)

#### Workflow Tests (`auto-linking-workflow.test.js`)

Tests complete user journeys:

- **Admin Login and Navigation**: Tests admin panel access
- **Question Creation**: Tests both form-based and bulk import workflows
- **Section Management**: Tests viewing and managing sections with questions
- **Guided Learning**: Tests plan creation, editing, and question assignment
- **User Experience**: Tests the user-facing guided learning interface
- **Performance**: Tests with large datasets and load scenarios

## Running Tests

### Prerequisites

1. **Node.js and npm**: Ensure Node.js 18+ and npm are installed
2. **Development Server**: For E2E tests, start the development server:
   ```bash
   npm run dev
   ```

### Quick Start

```bash
# Run all tests
npm test

# Run specific test categories
npm test -- tests/integration/
npm test -- tests/e2e/

# Run with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

### Using the Test Runner Script

```bash
# Make script executable (first time only)
chmod +x scripts/run-tests.sh

# Run comprehensive test suite
./scripts/run-tests.sh
```

## Test Configuration

### Jest Configuration (`jest.config.js`)

- **Test Environment**: Node.js
- **Test Timeout**: 30 seconds
- **Coverage**: HTML and LCOV reports
- **Module Mapping**: Supports `@/` imports
- **Transform**: Babel for TypeScript/JSX

### Setup File (`tests/setup.js`)

- **Firebase Mocking**: Mocks Firebase services for testing
- **Next.js Mocking**: Mocks Next.js server components
- **Environment Variables**: Sets up test environment
- **Global Utilities**: Provides test helper functions

## Test Data

### Mock Data Structure

```javascript
// Questions
{
  title: "Test Question",
  content: "Question content",
  type: "single",
  difficulty: "medium",
  category: "JavaScript",
  learningPath: "frontend",
  options: ["Option 1", "Option 2", "Option 3", "Option 4"],
  correctAnswers: ["Option 1"],
  explanation: "Explanation text",
  points: 1,
  timeLimit: 60,
  isActive: true,
  isComplete: true
}

// Sections
{
  title: "Test Section",
  description: "Section description",
  category: "JavaScript",
  learningPathId: "frontend",
  order: 1,
  weight: 25,
  isActive: true,
  questions: []
}

// Learning Plans
{
  title: "Test Learning Plan",
  description: "Plan description",
  difficulty: "beginner",
  totalQuestions: 0,
  dailyQuestions: 0,
  sections: [],
  isActive: true
}
```

## Testing Scenarios

### 1. Question Auto-linking Flow

1. **Create Question**: Add question with category "JavaScript" and learning path "frontend"
2. **Auto-link to Section**: System automatically finds matching section
3. **Verify Linking**: Confirm question appears in section's question list
4. **Test Filtering**: Verify questions are filtered correctly by section

### 2. Bulk Import Flow

1. **Prepare Markdown**: Create markdown with multiple questions
2. **Import Questions**: Use bulk import functionality
3. **Verify Auto-linking**: Confirm all questions are linked to appropriate sections
4. **Check Relationships**: Verify section-question relationships are correct

### 3. Guided Learning Plan Flow

1. **Create Plan**: Create new learning plan
2. **Select Sections**: Choose sections based on category/learning path filters
3. **Assign Questions**: Add questions to plan sections
4. **Save Plan**: Persist plan with all relationships
5. **Verify Plan**: Confirm plan displays correctly with all questions

### 4. User Experience Flow

1. **Access Plan**: Navigate to guided learning plan
2. **View Sections**: See all plan sections
3. **Start Section**: Click on a section to begin
4. **Answer Questions**: Interact with questions in the section
5. **Progress Tracking**: Verify progress is tracked correctly

## Error Scenarios

### Network Errors

- Offline mode handling
- API timeout scenarios
- Connection failure recovery

### Data Validation

- Invalid question data
- Missing required fields
- Duplicate entries

### Edge Cases

- Empty sections
- Non-existent references
- Circular dependencies

## Performance Testing

### Load Testing

- Large number of questions (1000+)
- Multiple concurrent users
- Database query optimization

### Memory Testing

- Memory usage with large datasets
- Garbage collection efficiency
- Memory leak detection

## Coverage Goals

- **Statements**: > 90%
- **Branches**: > 85%
- **Functions**: > 90%
- **Lines**: > 90%

## Continuous Integration

### GitHub Actions (if applicable)

```yaml
name: Auto-linking Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
      - run: npm run test:coverage
```

## Debugging Tests

### Common Issues

1. **Firebase Connection**: Ensure Firebase is properly mocked
2. **Async Operations**: Use proper async/await patterns
3. **Timeouts**: Increase timeout for slow operations
4. **Memory Leaks**: Clean up resources after tests

### Debug Commands

```bash
# Run specific test with verbose output
npm test -- --verbose tests/integration/auto-linking.test.js

# Run tests in debug mode
node --inspect-brk node_modules/.bin/jest --runInBand

# Run tests with coverage and detailed output
npm test -- --coverage --verbose
```

## Contributing

### Adding New Tests

1. **Follow Naming Convention**: Use descriptive test names
2. **Group Related Tests**: Use `describe` blocks for organization
3. **Use Mock Data**: Leverage the provided mock utilities
4. **Clean Up**: Ensure tests clean up after themselves
5. **Document**: Add comments for complex test scenarios

### Test Best Practices

1. **Arrange-Act-Assert**: Structure tests clearly
2. **Single Responsibility**: One test per scenario
3. **Independent Tests**: Tests should not depend on each other
4. **Fast Execution**: Keep tests fast and efficient
5. **Clear Assertions**: Use specific, meaningful assertions

## Troubleshooting

### Common Problems

1. **Tests Hanging**: Check for unclosed async operations
2. **Firebase Errors**: Verify Firebase mocking is working
3. **Import Errors**: Check module path mappings
4. **Timeout Issues**: Increase timeout or optimize test code

### Getting Help

1. Check test logs for specific error messages
2. Verify all dependencies are installed
3. Ensure development server is running for E2E tests
4. Check Jest configuration for any issues

---

For more information about the auto-linking system, see the main project documentation.
