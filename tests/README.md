# Content Management Test Suite

This comprehensive test suite covers the complete flow of content management in the Elzatona learning platform, including creating and linking categories, topics, learning paths, questions, and plans.

## 🎯 Test Coverage

### 1. **Unit Tests** (`tests/unit/`)

- **Content Linking Logic** (`content-linking.test.ts`)
  - Category management
  - Topic management with category linking
  - Learning path management with category linking
  - Question management with multi-entity linking
  - Content validation and consistency checks

### 2. **API Tests** (`tests/api/`)

- **Content Management Endpoints** (`content-management-api.test.ts`)
  - Categories API (POST, GET, PUT, DELETE)
  - Topics API (POST, GET, PUT, DELETE)
  - Learning Paths API (POST, GET, PUT, DELETE)
  - Questions API (POST, GET, PUT, DELETE, bulk operations)
  - Learning Plans API (POST, GET, PUT, DELETE)
  - Content linking validation
  - Error handling and edge cases

### 3. **Integration Tests** (`tests/integration/`)

- **Content Management Flow** (`content-management-flow.test.ts`)
  - Complete workflow from category creation to plan execution
  - Data consistency across all entities
  - Bulk operations and performance
  - End-to-end content linking validation

### 4. **End-to-End Tests** (`tests/e2e/`)

- **Content Management UI Flow** (`content-management-e2e.test.ts`)
  - Complete user journey through admin interface
  - UI interactions and form submissions
  - Learning paths page functionality
  - Guided learning plans workflow
  - Question practice flow

## 🚀 Running Tests

### Prerequisites

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Ensure all dependencies are installed:
   ```bash
   npm install
   ```

### Running All Tests

```bash
# Run the comprehensive test suite
node scripts/run-content-tests.js

# Or run individual test suites
npm run test:unit
npm run test:api
npm run test:integration
npm run test:e2e
```

### Running Specific Tests

```bash
# Unit tests only
jest tests/unit/content-linking.test.ts

# API tests only
jest tests/api/content-management-api.test.ts

# Integration tests only
jest tests/integration/content-management-flow.test.ts

# E2E tests only
playwright test tests/e2e/content-management-e2e.test.ts
```

## 📋 Test Scenarios

### 1. **Category Management Flow**

- ✅ Create categories
- ✅ Retrieve all categories
- ✅ Update category details
- ✅ Delete categories
- ✅ Validate category data

### 2. **Topic Management Flow**

- ✅ Create topics linked to categories
- ✅ Retrieve topics by category
- ✅ Update topic details
- ✅ Delete topics
- ✅ Validate topic-category relationships

### 3. **Learning Path Management Flow**

- ✅ Create learning paths linked to categories
- ✅ Retrieve learning paths with proper ordering
- ✅ Update learning path details
- ✅ Delete learning paths
- ✅ Validate learning path-category relationships

### 4. **Question Management Flow**

- ✅ Create questions with multiple entity links
- ✅ Link questions to categories, topics, and learning paths
- ✅ Retrieve questions by various filters
- ✅ Bulk question creation
- ✅ Update question details
- ✅ Delete questions
- ✅ Validate question-entity relationships

### 5. **Plan Management Flow**

- ✅ Create learning plans
- ✅ Add questions to plan sections
- ✅ Retrieve plans with questions
- ✅ Update plan sections
- ✅ Delete plans
- ✅ Validate plan-question relationships

### 6. **Learning Paths Page Integration**

- ✅ Display questions in learning paths
- ✅ Show topics in learning path detail pages
- ✅ Maintain question counts
- ✅ Proper ordering and filtering

### 7. **Data Consistency Validation**

- ✅ All entities properly linked
- ✅ Referential integrity maintained
- ✅ No orphaned records
- ✅ Consistent data across all views

## 🔧 Test Configuration

### Environment Variables

```bash
TEST_BASE_URL=http://localhost:3000  # Base URL for API tests
NODE_ENV=test                        # Test environment
```

### Test Data Management

- Tests use isolated test data with unique IDs
- Automatic cleanup after test completion
- No interference with production data
- Consistent test data across all test suites

### Mock Data

- Comprehensive test data for all entity types
- Realistic relationships between entities
- Edge cases and error scenarios
- Performance test data for bulk operations

## 📊 Test Results

### Expected Outcomes

- **Unit Tests**: 100% pass rate for core logic
- **API Tests**: 100% pass rate for all endpoints
- **Integration Tests**: 100% pass rate for workflows
- **E2E Tests**: 100% pass rate for user journeys

### Performance Benchmarks

- Category creation: < 100ms
- Topic creation: < 150ms
- Learning path creation: < 200ms
- Question creation: < 300ms
- Bulk question creation (10 questions): < 2s
- Plan creation with questions: < 500ms

## 🐛 Troubleshooting

### Common Issues

1. **Server not running**: Ensure `npm run dev` is running
2. **Database connection**: Check Firebase configuration
3. **Test data conflicts**: Run cleanup scripts
4. **Timeout errors**: Increase test timeout values

### Debug Mode

```bash
# Run tests with debug output
DEBUG=true node scripts/run-content-tests.js

# Run specific test with verbose output
jest tests/unit/content-linking.test.ts --verbose --detectOpenHandles
```

### Cleanup

```bash
# Clean up test data manually
node scripts/cleanup-test-data.js

# Reset test environment
npm run test:cleanup
```

## 📈 Continuous Integration

### GitHub Actions

The test suite is designed to run in CI/CD pipelines:

- Automated test execution on pull requests
- Test result reporting
- Performance monitoring
- Coverage reporting

### Test Reports

- Detailed test results in console
- HTML reports for E2E tests
- Coverage reports for unit tests
- Performance metrics

## 🔄 Maintenance

### Adding New Tests

1. Follow the existing test structure
2. Use consistent naming conventions
3. Include proper cleanup
4. Add to the test runner script
5. Update this documentation

### Updating Test Data

1. Modify test data in the respective test files
2. Ensure data consistency across all tests
3. Update cleanup procedures if needed
4. Test the changes thoroughly

### Performance Optimization

1. Monitor test execution times
2. Optimize slow tests
3. Use parallel execution where possible
4. Cache test data when appropriate

---

**Note**: This test suite ensures the reliability and consistency of the content management system. All tests should pass before deploying changes to production.
