# Task: Admin Content Management (Unified)

## Time Estimation

### Manual Testing
- **Estimated Time**: 60-90 minutes
- **Breakdown**:
  - Navigate and verify access: 2 minutes
  - Test cards management (CRUD): 15-20 minutes
  - Test plans management (CRUD): 15-20 minutes
  - Test categories management (CRUD): 10-15 minutes
  - Test topics management (CRUD): 10-15 minutes
  - Test questions management (CRUD): 10-15 minutes
  - Test bulk operations: 8-12 minutes
  - Test stats display: 3-5 minutes
- **Complexity**: Very High
- **Dependencies**: Admin authentication, database access, API endpoints

### Automated Testing
- **Estimated Time**: 25-40 minutes (first run), 4-7 minutes (subsequent runs)
- **Breakdown**:
  - Unit tests setup and execution: 8-12 minutes
  - Integration tests setup and execution: 12-20 minutes (includes API mocking, CRUD operations)
  - E2E tests execution: 5-8 minutes (includes full CRUD flows)
- **Complexity**: Very High
- **Dependencies**: API mocks, database mocks, test data fixtures

### Total Time
- **Manual Only**: 60-90 minutes
- **Automated Only**: 25-40 minutes (first run), 4-7 minutes (subsequent)
- **Both Manual + Automated**: 85-130 minutes (first run), 64-97 minutes (subsequent)

---

## Overview
Test the unified content management page including CRUD operations for cards, plans, categories, topics, and questions, plus bulk operations.

## Manual Testing Steps

1. **Navigate to content management**
   - Login as admin
   - Navigate to `/admin/content-management`
   - Verify page loads
   - Verify stats displayed

2. **Test Cards Management (CRUD)**
   - **Create**: Click "Add Card", fill form, save, verify card created
   - **Read**: Verify card appears in list, click to view details
   - **Update**: Click edit on card, modify, save, verify updated
   - **Delete**: Click delete on card, confirm, verify removed

3. **Test Plans Management (CRUD)**
   - **Create**: Click "Add Plan", fill form, save, verify plan created
   - **Read**: Verify plan appears in list, view details
   - **Update**: Edit plan, modify fields, save, verify updated
   - **Delete**: Delete plan, confirm, verify removed

4. **Test Categories Management (CRUD)**
   - **Create**: Add category, fill form, save, verify created
   - **Read**: View category list, verify categories displayed
   - **Update**: Edit category, modify, save, verify updated
   - **Delete**: Delete category, confirm, verify removed

5. **Test Topics Management (CRUD)**
   - **Create**: Add topic under category, save, verify created
   - **Read**: View topics list, verify topics displayed
   - **Update**: Edit topic, modify, save, verify updated
   - **Delete**: Delete topic, confirm, verify removed

6. **Test Questions Management (CRUD)**
   - **Create**: Add question under topic, fill form, save, verify created
   - **Read**: View questions list, verify questions displayed
   - **Update**: Edit question, modify, save, verify updated
   - **Delete**: Delete question, confirm, verify removed

7. **Test Bulk Operations**
   - Select multiple items
   - Click bulk delete, confirm, verify items deleted
   - Test bulk update (if available)
   - Test bulk export (if available)

8. **Test Stats Display**
   - Verify total cards count
   - Verify total plans count
   - Verify total categories count
   - Verify total topics count
   - Verify total questions count
   - Verify stats update after operations

9. **Test Form Validation**
   - Try to create item with empty required fields
   - Verify validation errors
   - Test invalid data formats
   - Verify error messages clear

10. **Test Error Handling**
    - Simulate API errors
    - Verify error messages display
    - Verify retry options available
    - Test network failure scenarios

## Automated Tests

### Unit Tests

- **A-UT-016**: Test content management page renders
  - **File**: `apps/website/src/app/admin/content-management/page.test.tsx`
  - **Assertions**:
    - Page renders without errors
    - Stats cards visible
    - Tabs/views visible
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-UT-017**: Test cards CRUD operations UI
  - **File**: `apps/website/src/app/admin/content-management/page.test.tsx`
  - **Assertions**:
    - Create card form renders
    - Edit card form renders
    - Delete confirmation shows
    - Card list displays
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-UT-018**: Test plans CRUD operations UI
  - **File**: `apps/website/src/app/admin/content-management/page.test.tsx`
  - **Assertions**:
    - Create plan form renders
    - Edit plan form renders
    - Plan list displays
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-UT-019**: Test categories CRUD operations UI
  - **File**: `apps/website/src/app/admin/content-management/page.test.tsx`
  - **Assertions**:
    - Create category form renders
    - Edit category form renders
    - Category list displays
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-UT-020**: Test topics CRUD operations UI
  - **File**: `apps/website/src/app/admin/content-management/page.test.tsx`
  - **Assertions**:
    - Create topic form renders
    - Edit topic form renders
    - Topic list displays
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-UT-021**: Test questions CRUD operations UI
  - **File**: `apps/website/src/app/admin/content-management/page.test.tsx`
  - **Assertions**:
    - Create question form renders
    - Edit question form renders
    - Question list displays
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-UT-022**: Test bulk operations UI
  - **File**: `apps/website/src/app/admin/content-management/page.test.tsx`
  - **Assertions**:
    - Bulk selection works
    - Bulk actions menu visible
    - Confirmation dialogs show
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

### Integration Tests

- **A-IT-018**: Test cards CRUD API calls
  - **File**: `apps/website/src/app/admin/content-management/page.integration.test.tsx`
  - **Assertions**:
    - Create API called with correct data
    - Update API called with correct data
    - Delete API called with correct ID
    - List API called on mount
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-IT-019**: Test plans CRUD API calls
  - **File**: `apps/website/src/app/admin/content-management/page.integration.test.tsx`
  - **Assertions**:
    - Create/Update/Delete API calls work
    - Data formatted correctly
    - Success/error handling works
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-IT-020**: Test categories CRUD API calls
  - **File**: `apps/website/src/app/admin/content-management/page.integration.test.tsx`
  - **Assertions**:
    - CRUD operations call correct APIs
    - Data persisted correctly
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-IT-021**: Test topics CRUD API calls
  - **File**: `apps/website/src/app/admin/content-management/page.integration.test.tsx`
  - **Assertions**:
    - CRUD operations work
    - Parent category relationship maintained
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-IT-022**: Test questions CRUD API calls
  - **File**: `apps/website/src/app/admin/content-management/page.integration.test.tsx`
  - **Assertions**:
    - CRUD operations work
    - Topic relationship maintained
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-IT-023**: Test bulk operations API calls
  - **File**: `apps/website/src/app/admin/content-management/page.integration.test.tsx`
  - **Assertions**:
    - Bulk delete API called with IDs
    - Multiple items processed
    - Success/error handling works
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

### E2E Tests

- **A-E2E-012**: Complete cards CRUD flow
  - **File**: `tests/e2e/admin/content-management-cards.spec.ts`
  - **Steps**:
    1. Login as admin
    2. Navigate to content management
    3. Create a new card
    4. Verify card appears in list
    5. Edit the card
    6. Verify changes saved
    7. Delete the card
    8. Verify card removed
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-E2E-013**: Complete questions CRUD flow
  - **File**: `tests/e2e/admin/content-management-questions.spec.ts`
  - **Steps**:
    1. Login as admin
    2. Navigate to content management
    3. Select a topic
    4. Create a new question
    5. Verify question appears
    6. Edit the question
    7. Delete the question
    8. Verify question removed
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

- **A-E2E-014**: Bulk operations flow
  - **File**: `tests/e2e/admin/content-management-bulk.spec.ts`
  - **Steps**:
    1. Login as admin
    2. Navigate to content management
    3. Select multiple items
    4. Click bulk delete
    5. Confirm deletion
    6. Verify items removed
  - **Status**: ⏳ Pending
  - **Can Run Parallel**: ✅ Yes

## Test Execution

```bash
# Run unit tests
npm run test:unit -- admin/content-management/page.test.tsx

# Run integration tests
npm run test:integration -- admin/content-management/page.integration.test.tsx

# Run E2E tests
npm run test:e2e -- content-management-*.spec.ts
```

## Notes

- All tests can run in parallel
- Requires admin authentication
- Tests complex CRUD operations
- Tests API integration extensively

