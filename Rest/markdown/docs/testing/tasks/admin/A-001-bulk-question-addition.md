# Task: Admin Bulk Question Addition by Category

## Time Estimation

### Manual Testing
- **Estimated Time**: 60-90 minutes
- **Breakdown**:
  - Clear existing questions: 5-7 minutes
  - Navigate to bulk addition: 2 minutes
  - Test HTML category (upload/add questions): 8-12 minutes
  - Test CSS category (upload/add questions): 8-12 minutes
  - Test JavaScript category (upload/add questions): 8-12 minutes
  - Test React category (upload/add questions): 8-12 minutes
  - Test other categories (Node.js, TypeScript, etc.): 15-20 minutes
  - Test question validation: 5-7 minutes
  - Test bulk upload file formats (CSV/JSON): 5-8 minutes
  - Verify question counts: 2-3 minutes
- **Complexity**: Very High
- **Dependencies**: Admin authentication, database access, test question data, file uploads

### Automated Testing
- **Estimated Time**: 20-35 minutes (first run), 3-6 minutes (subsequent runs)
- **Breakdown**:
  - Unit tests setup and execution: 5-8 minutes
  - Integration tests setup and execution: 8-15 minutes (includes API mocking, file parsing)
  - E2E tests execution: 7-12 minutes (includes multiple categories, file uploads)
- **Complexity**: Very High
- **Dependencies**: Admin auth mocks, database mocks, test files (CSV/JSON), API setup

### Total Time
- **Manual Only**: 60-90 minutes
- **Automated Only**: 20-35 minutes (first run), 3-6 minutes (subsequent)
- **Both Manual + Automated**: 80-125 minutes (first run), 63-96 minutes (subsequent)

---

## Overview
Test the admin functionality to add questions in bulk, organized by category (HTML, CSS, JavaScript, React, etc.). This includes clearing existing questions and starting fresh.

## Manual Testing Steps

1. **Clear existing questions**
   - Sign in as admin
   - Navigate to admin dashboard
   - Go to questions management page
   - Click "Clear All Questions" (if available)
   - Verify confirmation dialog
   - Confirm deletion
   - Verify all questions removed

2. **Navigate to bulk question addition**
   - Go to admin questions page
   - Click "Add Questions in Bulk" or similar
   - Verify bulk upload interface appears

3. **Test HTML category question addition**
   - Select "HTML" category
   - Upload CSV/JSON file with HTML questions OR
   - Use form to add questions one by one
   - Verify questions added successfully
   - Verify questions appear in HTML category

4. **Test CSS category question addition**
   - Select "CSS" category
   - Add CSS questions
   - Verify questions added
   - Verify questions appear in CSS category

5. **Test JavaScript category question addition**
   - Select "JavaScript" category
   - Add JavaScript questions
   - Verify questions added
   - Verify questions appear in JavaScript category

6. **Test React category question addition**
   - Select "React" category
   - Add React questions
   - Verify questions added
   - Verify questions appear in React category

7. **Test other categories**
   - Repeat for other categories (Node.js, TypeScript, etc.)
   - Verify each category works independently

8. **Test question validation**
   - Try to add question without required fields
   - Verify error messages
   - Try to add duplicate question
   - Verify duplicate detection

9. **Test bulk upload file format**
   - Upload valid CSV file
   - Verify questions imported
   - Upload invalid CSV file
   - Verify error handling
   - Upload JSON file
   - Verify questions imported

10. **Verify question counts**
    - After adding questions, verify counts per category
    - Verify total question count
    - Verify questions appear in frontend

## Automated Tests

### Unit Tests

- **A-UT-001**: Test clear questions function
  - **File**: `apps/admin/src/app/admin/questions/page.test.tsx`
  - **Assertions**:
    - Clear function exists
    - Confirmation dialog shows
    - Delete API called on confirm
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-UT-002**: Test bulk upload form renders
  - **File**: `apps/admin/src/app/admin/questions/page.test.tsx`
  - **Assertions**:
    - Form visible
    - Category selector present
    - File upload input present
    - Submit button present
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-UT-003**: Test category selector
  - **File**: `apps/admin/src/app/admin/questions/page.test.tsx`
  - **Assertions**:
    - All categories listed (HTML, CSS, JS, React, etc.)
    - Category selection works
    - Selected category stored in state
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-UT-004**: Test question form validation
  - **File**: `apps/admin/src/app/admin/questions/page.test.tsx`
  - **Assertions**:
    - Required fields validated
    - Error messages shown
    - Submit disabled if invalid
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-UT-005**: Test file upload validation
  - **File**: `apps/admin/src/app/admin/questions/page.test.tsx`
  - **Assertions**:
    - File type validated (CSV/JSON)
    - File size validated
    - Error shown for invalid file
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

### Integration Tests

- **A-IT-001**: Test clear questions API call
  - **File**: `apps/admin/src/app/admin/questions/page.integration.test.tsx`
  - **Assertions**:
    - Delete API called
    - All questions removed
    - Success message shown
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-IT-002**: Test bulk question addition API (HTML)
  - **File**: `apps/admin/src/app/admin/questions/page.integration.test.tsx`
  - **Assertions**:
    - API called with HTML category
    - Questions data formatted correctly
    - Success response handled
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-IT-003**: Test bulk question addition API (CSS)
  - **File**: `apps/admin/src/app/admin/questions/page.integration.test.tsx`
  - **Assertions**:
    - API called with CSS category
    - Questions added successfully
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-IT-004**: Test bulk question addition API (JavaScript)
  - **File**: `apps/admin/src/app/admin/questions/page.integration.test.tsx`
  - **Assertions**:
    - API called with JavaScript category
    - Questions added successfully
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-IT-005**: Test bulk question addition API (React)
  - **File**: `apps/admin/src/app/admin/questions/page.integration.test.tsx`
  - **Assertions**:
    - API called with React category
    - Questions added successfully
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-IT-006**: Test CSV file parsing
  - **File**: `apps/admin/src/app/admin/questions/page.integration.test.tsx`
  - **Assertions**:
    - CSV parsed correctly
    - Questions extracted from CSV
    - Data formatted for API
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-IT-007**: Test JSON file parsing
  - **File**: `apps/admin/src/app/admin/questions/page.integration.test.tsx`
  - **Assertions**:
    - JSON parsed correctly
    - Questions extracted from JSON
    - Data formatted for API
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-IT-008**: Test duplicate question detection
  - **File**: `apps/admin/src/app/admin/questions/page.integration.test.tsx`
  - **Assertions**:
    - Duplicate check API called
    - Duplicates detected
    - Warning shown to admin
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-IT-009**: Test question count updates
  - **File**: `apps/admin/src/app/admin/questions/page.integration.test.tsx`
  - **Assertions**:
    - Count API called after addition
    - Count updated in UI
    - Category counts updated
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

### E2E Tests

- **A-E2E-001**: Complete bulk question addition flow (HTML)
  - **File**: `tests/e2e/admin/bulk-questions-html.spec.ts`
  - **Steps**:
    1. Sign in as admin
    2. Navigate to admin questions page
    3. Select "HTML" category
    4. Upload CSV file with HTML questions
    5. Verify questions imported
    6. Verify questions appear in HTML category
    7. Verify question count updated
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-E2E-002**: Complete bulk question addition flow (CSS)
  - **File**: `tests/e2e/admin/bulk-questions-css.spec.ts`
  - **Steps**:
    1. Sign in as admin
    2. Navigate to admin questions page
    3. Select "CSS" category
    4. Add CSS questions via form
    5. Verify questions added
    6. Verify questions appear in CSS category
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-E2E-003**: Complete bulk question addition flow (JavaScript)
  - **File**: `tests/e2e/admin/bulk-questions-javascript.spec.ts`
  - **Steps**:
    1. Sign in as admin
    2. Navigate to admin questions page
    3. Select "JavaScript" category
    4. Upload JSON file with JavaScript questions
    5. Verify questions imported
    6. Verify questions appear in JavaScript category
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-E2E-004**: Complete bulk question addition flow (React)
  - **File**: `tests/e2e/admin/bulk-questions-react.spec.ts`
  - **Steps**:
    1. Sign in as admin
    2. Navigate to admin questions page
    3. Select "React" category
    4. Add React questions
    5. Verify questions added
    6. Verify questions appear in React category
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-E2E-005**: Clear all questions and start fresh
  - **File**: `tests/e2e/admin/clear-questions.spec.ts`
  - **Steps**:
    1. Sign in as admin
    2. Navigate to admin questions page
    3. Click "Clear All Questions"
    4. Confirm deletion
    5. Verify all questions removed
    6. Verify question counts reset to 0
    7. Add new questions by category
    8. Verify fresh start successful
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-E2E-006**: Bulk upload validation and error handling
  - **File**: `tests/e2e/admin/bulk-upload-validation.spec.ts`
  - **Steps**:
    1. Sign in as admin
    2. Navigate to admin questions page
    3. Try to upload invalid file format
    4. Verify error message
    5. Try to upload file with missing required fields
    6. Verify validation errors
    7. Upload valid file
    8. Verify success
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

## Test Execution

```bash
# Run unit tests
npm run test:unit -- admin/questions/page.test.tsx

# Run integration tests
npm run test:integration -- admin/questions/page.integration.test.tsx

# Run E2E tests
npm run test:e2e -- bulk-questions-*.spec.ts
```

## Notes

- All tests can run in parallel
- Requires admin authentication
- Tests database operations
- Tests file upload functionality
- Category tests are independent and can run in parallel

