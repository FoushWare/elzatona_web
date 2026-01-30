# SonarQube Issues Resolution TODO List

## Issues Identified (36 total)

### 1. ESLint Configuration Migration
- **Issue**: `.eslintignore` file is deprecated, migrate to `ignores` in `eslint.config.js`
- **Status**: ✅ Resolved (removed .eslintignore file)
- **Impact**: ESLint warnings in CI
- **Solution**: Removed deprecated .eslintignore file

### 2. Prettier Formatting Issues
- **Issue**: Code style issues in `eslint.config.mjs`
- **Status**: ✅ Resolved (ran `npm run format`)
- **Impact**: CI formatting checks failing
- **Solution**: Applied Prettier formatting

### 3. Jest Setup Syntax Error
- **Issue**: Potential syntax error in `apps/website/jest.setup.js` (duplicate catch blocks)
- **Status**: ✅ Resolved (no syntax errors found)
- **Impact**: Prettier parsing failure
- **Solution**: Verified syntax is correct

### 4. TODO Items in Codebase - Repository Implementation
- **Issue**: TODOs for category, topic, and admin repositories
- **Status**: 🔄 In Progress
- **Impact**: Dashboard stats functionality incomplete
- **Progress**:
  - ✅ Added category and topic repository hooks to RepositoryContext
  - ✅ Implemented category/topic fetching in dashboard stats API
  - ✅ Implemented category/topic fetching in content management hooks
  - ✅ Implemented admin count using userRepository.findByRole("admin")
  - 🔄 Plan-question associations require new repository methods (complex)
  - 🔄 Add/remove questions from plans require new repository methods (complex)

### 5. Missing Repository Implementations
- **Issue**: TODOs for category, topic, admin, and plan repositories
- **Status**: 📋 Identified
- **Impact**: Dashboard stats functionality incomplete

### 6. Test Coverage Gaps
- **Issue**: Multiple test.todo() placeholders in admin pages
- **Status**: 📋 Identified
- **Impact**: Test coverage incomplete

## Resolution Strategy

1. **Priority 1**: Fix ESLint configuration migration
2. **Priority 2**: Resolve any remaining syntax/prettier issues
3. **Priority 3**: Address critical TODOs (repository implementations)
4. **Priority 4**: Implement missing tests
5. **Priority 5**: Clean up remaining TODOs

## Progress Tracking

- ✅ Formatting issues resolved
- 🔄 ESLint config migration in progress
- 🔍 Syntax error investigation ongoing
- 📋 TODO items cataloged