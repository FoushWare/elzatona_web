# Missing tests checklist — admin app pages

Purpose

- Track missing unit, integration, and e2e coverage for admin app routes.
- Another AI/model can implement the tests listed below.
- Each test case includes file path, description, and implementation hints.

Progress

- [x] Implemented website Admin Create API route tests: `apps/website/src/app/lib/network/routes/admin/create/route.test.ts` (10 tests) — logs: `tmp/route_create_test_minimal2.log`
- [x] Implemented admin dashboard component tests: `libs/common-ui/src/admin/components/AdminDashboard.test.tsx` (8 tests) — covers rendering, loading, error states, and interactions
- [x] Implemented admin login page tests: `apps/admin/src/app/admin/login/page.test.tsx` (10 tests) — covers form rendering, submission, error handling, and loading states
- [x] Implemented admin content management page tests: `apps/admin/src/app/admin/content-management/page.test.tsx` (12 tests) — covers page rendering, data display, search, filtering, and modal states
- [x] Implemented admin questions management page tests: `apps/admin/src/app/admin/content/questions/page.test.tsx` (15 tests) — covers page rendering, question list, filtering, pagination, and modal interactions

Legend

- Unit: component/page rendering tests (React Testing Library)
- Integration: API + UI wiring tests (mock server or test DB)
- E2E: browser-level tests (Playwright)

---

## /

**Route:** Admin dashboard landing  
**Status:** ✅ IMPLEMENTED  
**Files:** `libs/common-ui/src/admin/components/AdminDashboard.test.tsx` (8 tests), `apps/admin/src/app/admin/dashboard/page.test.tsx` (1 test)

### Implemented test cases

#### Unit: `libs/common-ui/src/admin/components/AdminDashboard.test.tsx`

- ✅ Admin dashboard renders welcome header with user information
- ✅ Admin dashboard renders system metrics grid with stats
- ✅ Admin dashboard renders quick actions section
- ✅ Admin dashboard renders system health section
- ✅ Admin dashboard shows loading placeholders for stats
- ✅ Admin dashboard disables refresh button when loading
- ✅ Admin dashboard displays error alert when stats fetch fails
- ✅ Admin dashboard calls refetch when refresh button is clicked
- ✅ Admin dashboard prevents hydration mismatch by showing loading initially

#### Unit: `apps/admin/src/app/admin/dashboard/page.test.tsx`

- ✅ Admin dashboard page renders the AdminDashboard component

#### Integration: `apps/admin/src/app/page.integration.test.tsx`

```typescript
// TODO: Implement integration tests for dashboard API interactions
// - Mock stats API endpoint with MSW
// - Render page and verify API calls
// - Test error handling and retry functionality
```

#### E2E: `tests/e2e/admin/dashboard.spec.ts`

```typescript
// TODO: Implement E2E tests for dashboard user flows
// - Login and verify dashboard loads
// - Test quick action buttons navigation
// - Verify stats accuracy with test data
```

```typescript
// Test: Admin sees dashboard after login
// - Login as admin user
// - Verify redirect to admin dashboard
// - Verify stats widgets display with real data
// - Verify navigation sidebar works

// Test: Dashboard stats are accurate
// - Create known test data (users, questions)
// - Login and view dashboard
// - Verify counts match test data

// Test: Dashboard quick actions work
// - Click "Add User" quick action
// - Verify navigation to user creation
// - Click "Add Question" quick action
// - Verify navigation to question creation

// Test: Dashboard restricts non-admin access
// - Login as regular user
// - Navigate to admin dashboard
// - Verify access denied or redirect

// Test: Dashboard recent activity links work
// - View recent activity
// - Click on an activity item
// - Verify navigation to relevant detail page
```

---

## /admin/login

**Route:** Admin login page  
**Status:** ✅ IMPLEMENTED  
**Files:** `apps/admin/src/app/admin/login/page.test.tsx` (10 tests)

### Implemented test cases

#### Unit: `apps/admin/src/app/admin/login/page.test.tsx`

- ✅ Admin login page shows loading spinner when auth is loading
- ✅ Admin login page renders login form with all fields
- ✅ Admin login page renders email input with correct attributes
- ✅ Admin login page renders password input with correct attributes
- ✅ Admin login page updates email input value
- ✅ Admin login page updates password input value
- ✅ Admin login page calls login on form submission with success
- ✅ Admin login page shows loading state during submission
- ✅ Admin login page displays error message on login failure
- ✅ Admin login page displays generic error on unexpected error
- ✅ Admin login page clears error on new submission attempt
- ✅ Admin login page renders back to home link

#### Integration: `apps/admin/src/app/admin/login/page.integration.test.tsx`

```typescript
// TODO: Implement integration tests for login API interactions
// - Mock login API with MSW
// - Test successful login redirects
// - Test failed login shows errors
// - Test loading states
```

#### E2E: `tests/e2e/admin/login.spec.ts`

```typescript
// TODO: Implement E2E tests for login user flows
// - Test login with valid credentials
// - Test login with invalid credentials
// - Test login form validation
// - Test redirect after successful login
```

---

## /users

**Route:** User management list  
**Existing:** none

### Missing test cases

#### Unit: `apps/admin/src/app/users/page.test.tsx`

```typescript
// Test: Users page renders user table
// - Mock users data
// - Render page
// - Verify table with columns: Name, Email, Role, Status, Actions

// Test: Users page renders search input
// - Render page
// - Verify search input exists
// - Verify placeholder text

// Test: Users page renders filter dropdowns
// - Render page
// - Verify role filter dropdown
// - Verify status filter dropdown

// Test: Users page renders pagination
// - Mock paginated data
// - Render page
// - Verify page numbers display
// - Verify prev/next buttons

// Test: Users page renders empty state
// - Mock empty users list
// - Render page
// - Verify "No users found" message

// Test: Users page action buttons render
// - Mock users data
// - Render page
// - Verify Edit button per row
// - Verify Delete button per row
// - Verify View Details button per row
```

#### Integration: `apps/admin/src/app/users/page.integration.test.tsx`

```typescript
// Test: Users page fetches user list
// - Mock users API
// - Render page
// - Verify API called with default params
// - Verify users display in table

// Test: Users page search filters results
// - Render page with mock data
// - Enter search term
// - Verify API called with search query
// - Verify filtered results display

// Test: Users page role filter works
// - Select "Admin" from role filter
// - Verify API called with role param
// - Verify only admins display

// Test: Users page status filter works
// - Select "Active" from status filter
// - Verify API called with status param
// - Verify only active users display

// Test: Users page pagination works
// - Mock 25 users
// - Render page (page size 10)
// - Click page 2
// - Verify API called with page=2
// - Verify users 11-20 display

// Test: Users page delete user flow
// - Click delete on user row
// - Verify confirmation modal
// - Confirm deletion
// - Verify delete API called
// - Verify user removed from table

// Test: Users page edit user navigation
// - Click edit on user row
// - Verify navigation to /users/[id]/edit
```

#### E2E: `tests/e2e/admin/users.spec.ts`

```typescript
// Test: Admin views all users
// - Login as admin
// - Navigate to /users
// - Verify user table displays
// - Verify can scroll through users

// Test: Admin searches for user
// - Enter email address in search
// - Verify matching user displays
// - Clear search
// - Verify all users display again

// Test: Admin filters by role
// - Select "Admin" filter
// - Verify only admin users show
// - Select "User" filter
// - Verify only regular users show

// Test: Admin creates new user
// - Click "Add User" button
// - Fill user form
// - Submit
// - Verify success message
// - Verify user appears in list

// Test: Admin edits user
// - Click edit on a user
// - Modify user details
// - Save changes
// - Verify changes reflected in list

// Test: Admin deletes user
// - Click delete on a user
// - Confirm deletion
// - Verify user removed from list

// Test: Admin changes user role
// - Find regular user
// - Click edit
// - Change role to admin
// - Save
// - Verify role updated in list

// Test: Admin deactivates user
// - Find active user
// - Click deactivate
// - Verify status changes to inactive
// - Verify user cannot login
```

---

## /users/[id]

**Route:** User detail view  
**Existing:** none

### Missing test cases

#### Unit: `apps/admin/src/app/users/[id]/page.test.tsx`

```typescript
// Test: User detail renders profile info
// - Mock user data
// - Render page
// - Verify name displays
// - Verify email displays
// - Verify role badge displays

// Test: User detail renders activity history
// - Mock user with activity
// - Render page
// - Verify activity timeline displays

// Test: User detail renders progress stats
// - Mock user with progress data
// - Render page
// - Verify learning progress displays
// - Verify completion counts display

// Test: User detail renders action buttons
// - Render page
// - Verify Edit button
// - Verify Delete button
// - Verify Reset Password button
```

#### Integration: `apps/admin/src/app/users/[id]/page.integration.test.tsx`

```typescript
// Test: User detail fetches user by ID
// - Mock user API for specific ID
// - Render page with id param
// - Verify correct user data displays

// Test: User detail fetches activity
// - Mock user activity API
// - Render page
// - Verify activity list populates

// Test: User detail handles 404
// - Mock 404 response
// - Render page
// - Verify not found message

// Test: User detail reset password
// - Click reset password
// - Verify confirmation
// - Verify API called
// - Verify success message
```

#### E2E: `tests/e2e/admin/user-detail.spec.ts`

```typescript
// Test: Admin views user details
// - Navigate to /users/[id]
// - Verify user info displays
// - Verify activity history shows
// - Verify progress stats show

// Test: Admin resets user password
// - View user detail
// - Click reset password
// - Confirm action
// - Verify password reset email sent (mock)
// - Verify success notification

// Test: Admin impersonates user
// - Click "Login as User" (if feature exists)
// - Verify session switches
// - Verify can see user's view
// - Exit impersonation
// - Verify back to admin
```

---

## /admin/content-management

**Route:** Content management dashboard  
**Status:** ✅ IMPLEMENTED  
**Files:** `apps/admin/src/app/admin/content-management/page.test.tsx` (12 tests)

### Implemented test cases

#### Unit: `apps/admin/src/app/admin/content-management/page.test.tsx`

- ✅ Content management page shows loading spinner when loading
- ✅ Content management page displays error message when error occurs
- ✅ Content management page renders page title
- ✅ Content management page renders stats section
- ✅ Content management page renders search and filters
- ✅ Content management page renders all management sections
- ✅ Content management page renders cards list
- ✅ Content management page renders plans list
- ✅ Content management page renders categories list
- ✅ Content management page renders topics list
- ✅ Content management page updates search term when input changes
- ✅ Content management page updates filter when select changes
- ✅ Content management page shows empty state for cards when no cards
- ✅ Content management page shows empty state for plans when no plans
- ✅ Content management page renders topic questions modal when showTopicQuestionsModal is true
- ✅ Content management page renders delete confirmation modal when showDeleteModal is true
- ✅ Content management page renders card management modal when showCardModal is true

#### Integration: `apps/admin/src/app/admin/content-management/page.integration.test.tsx`

```typescript
// TODO: Implement integration tests for content management API interactions
// - Mock content APIs with MSW
// - Test CRUD operations for cards, plans, categories, topics
// - Test search and filtering functionality
// - Test modal interactions and form submissions
```

#### E2E: `tests/e2e/admin/content-management.spec.ts`

```typescript
// TODO: Implement E2E tests for content management user flows
// - Test creating, editing, deleting content items
// - Test search and filtering
// - Test navigation between different content types
// - Test modal interactions
```

---

## /content

**Route:** Content management dashboard  
**Existing:** none

### Missing test cases

#### Unit: `apps/admin/src/app/content/page.test.tsx`

```typescript
// Test: Content page renders content type navigation
// - Render page
// - Verify links to: Questions, Problems, Frontend Tasks, etc.

// Test: Content page renders stats overview
// - Mock content stats
// - Render page
// - Verify counts per content type

// Test: Content page renders recent content list
// - Mock recent content
// - Render page
// - Verify recently added items display
```

#### Integration: `apps/admin/src/app/content/page.integration.test.tsx`

```typescript
// Test: Content page fetches stats
// - Mock stats API
// - Render page
// - Verify stats display

// Test: Content page fetches recent items
// - Mock recent content API
// - Render page
// - Verify items display
```

#### E2E: `tests/e2e/admin/content.spec.ts`

```typescript
// Test: Admin views content overview
// - Login and navigate to /content
// - Verify content types listed
// - Verify can navigate to each type

// Test: Admin accesses recent content
// - View content dashboard
// - Click on recent item
// - Verify navigation to content detail
```

---

## /content/questions

**Route:** Questions content management  
**Status:** ✅ IMPLEMENTED  
**Files:** `apps/admin/src/app/admin/content/questions/page.test.tsx` (15 tests)

### Implemented test cases

#### Unit: `apps/admin/src/app/admin/content/questions/page.test.tsx`

- ✅ Questions page shows loading spinner when loading
- ✅ Questions page displays error message when error occurs
- ✅ Questions page renders page title
- ✅ Questions page renders stats cards
- ✅ Questions page renders advanced search
- ✅ Questions page renders categories overview
- ✅ Questions page renders filters card
- ✅ Questions page renders questions list
- ✅ Questions page renders pagination controls
- ✅ Questions page renders create question button
- ✅ Questions page renders category filter
- ✅ Questions page renders topic filter
- ✅ Questions page calls setSelectedCategory when category filter changes
- ✅ Questions page calls setSelectedTopic when topic filter changes
- ✅ Questions page renders action buttons for each question
- ✅ Questions page calls handleView when view button is clicked
- ✅ Questions page calls handleEdit when edit button is clicked
- ✅ Questions page calls handleDelete when delete button is clicked
- ✅ Questions page calls setCurrentPage when next page button is clicked
- ✅ Questions page calls setCurrentPage when previous page button is clicked
- ✅ Questions page disables previous button on first page
- ✅ Questions page disables next button on last page
- ✅ Questions page renders view question modal when isViewModalOpen is true
- ✅ Questions page renders form modal when isQuestionModalOpen is true
- ✅ Questions page calls handleCloseModal when modal close button is clicked
- ✅ Questions page calls handleOpenCreateModal when create button is clicked
- ✅ Questions page shows empty state when no questions
- ✅ Questions page shows empty state when no categories

#### Integration: `apps/admin/src/app/content/questions/page.integration.test.tsx`

```typescript
// TODO: Implement integration tests for questions management API interactions
// - Mock questions API with MSW
// - Test CRUD operations for questions
// - Test search and filtering functionality
// - Test pagination
// - Test modal form submissions
```

#### E2E: `tests/e2e/admin/content-questions.spec.ts`

```typescript
// TODO: Implement E2E tests for questions management user flows
// - Test creating, editing, deleting questions
// - Test search and filtering
// - Test pagination
// - Test modal interactions
```
```

#### Integration: `apps/admin/src/app/content/questions/page.integration.test.tsx`

```typescript
// Test: Questions page fetches questions
// - Mock questions API
// - Render page
// - Verify questions display

// Test: Questions page creates question
// - Click add
// - Fill form
// - Submit
// - Verify create API called
// - Verify question in list

// Test: Questions page edits question
// - Click edit
// - Modify fields
// - Save
// - Verify update API called

// Test: Questions page deletes question
// - Click delete
// - Confirm
// - Verify delete API called
// - Verify removed from list

// Test: Questions page publishes question
// - Click publish on draft
// - Verify status API called
// - Verify status changed to published

// Test: Questions page bulk operations
// - Select multiple questions
// - Click bulk delete/publish
// - Verify batch API called
```

#### E2E: `tests/e2e/admin/content-questions.spec.ts`

```typescript
// Test: Admin creates question
// - Navigate to /content/questions
// - Click "Add Question"
// - Fill question text
// - Add answer options
// - Set correct answer
// - Save as draft
// - Verify question in list as draft

// Test: Admin publishes question
// - Find draft question
// - Click publish
// - Verify status changes
// - Verify question visible to users

// Test: Admin edits question
// - Click edit on question
// - Modify question text
// - Save
// - Verify changes saved

// Test: Admin deletes question
// - Click delete
// - Confirm
// - Verify question removed

// Test: Admin previews question
// - Click preview
// - Verify question renders as user sees it
// - Verify can test answer selection
```

---

## /content/problems

**Route:** Problem solving content management  
**Existing:** none

### Missing test cases

#### Unit: `apps/admin/src/app/content/problems/page.test.tsx`

```typescript
// Test: Problems page renders list
// - Mock problems data
// - Render page
// - Verify problems table displays

// Test: Problems page shows difficulty badges
// - Mock problems with different difficulties
// - Render page
// - Verify Easy/Medium/Hard badges

// Test: Problems page renders test case count
// - Mock problems with test cases
// - Render page
// - Verify "X test cases" per problem
```

#### Integration: `apps/admin/src/app/content/problems/page.integration.test.tsx`

```typescript
// Test: Problems page CRUD
// - Create problem, verify API
// - Edit problem, verify API
// - Delete problem, verify API

// Test: Problems page manages test cases
// - Create problem
// - Add test cases
// - Verify test cases saved
// - Edit test case
// - Delete test case
```

#### E2E: `tests/e2e/admin/content-problems.spec.ts`

```typescript
// Test: Admin creates coding problem
// - Navigate to problems
// - Click create
// - Fill title, description (markdown)
// - Set difficulty
// - Add examples
// - Add hidden test cases
// - Save
// - Verify problem created

// Test: Admin tests problem solution
// - Open problem
// - Write reference solution
// - Run against test cases
// - Verify all pass
// - Save solution

// Test: Admin manages test cases
// - Open problem
// - Add new test case (input/output)
// - Edit existing test case
// - Delete test case
// - Verify changes saved

// Test: Admin sets constraints
// - Open problem
// - Set time limit
// - Set memory limit
// - Save
// - Verify constraints enforced
```

---

## /content/frontend-tasks

**Route:** Frontend tasks content management  
**Existing:** none

### Missing test cases

#### Unit: `apps/admin/src/app/content/frontend-tasks/page.test.tsx`

```typescript
// Test: Frontend tasks renders list
// - Mock tasks data
// - Render page
// - Verify tasks display with thumbnails

// Test: Frontend tasks shows requirements preview
// - Mock task with requirements
// - Render page
// - Verify requirement snippets show
```

#### Integration: `apps/admin/src/app/content/frontend-tasks/page.integration.test.tsx`

```typescript
// Test: Frontend tasks CRUD
// - Create, edit, delete tasks
// - Verify all API calls

// Test: Frontend tasks image upload
// - Create task
// - Upload design image
// - Verify image URL saved
// - Verify image displays
```

#### E2E: `tests/e2e/admin/content-frontend-tasks.spec.ts`

```typescript
// Test: Admin creates frontend task
// - Navigate to frontend tasks
// - Create new task
// - Enter title, requirements
// - Upload design mockup
// - Add starter code
// - Save
// - Verify task created

// Test: Admin sets solution
// - Open task
// - Enter HTML/CSS/JS solution
// - Verify live preview works
// - Save solution
// - Verify solution available for comparison

// Test: Admin tests task
// - Open task as user would see it
// - Verify requirements display
// - Verify starter code loads
// - Verify preview works
```

---

## /content/learning-paths

**Route:** Learning paths content management  
**Existing:** none

### Missing test cases

#### Unit: `apps/admin/src/app/content/learning-paths/page.test.tsx`

```typescript
// Test: Learning paths renders list
// - Mock paths data
// - Render page
// - Verify paths with section counts

// Test: Learning paths shows structure
// - Mock path with sections
// - Render page
// - Verify sections listed/previewed
```

#### Integration: `apps/admin/src/app/content/learning-paths/page.integration.test.tsx`

```typescript
// Test: Learning paths CRUD
// - Create path with sections
// - Edit path structure
// - Delete path
// - Verify API calls

// Test: Learning paths section management
// - Add section to path
// - Reorder sections
// - Remove section
// - Verify order saved
```

#### E2E: `tests/e2e/admin/content-learning-paths.spec.ts`

```typescript
// Test: Admin creates learning path
// - Navigate to learning paths
// - Create new path
// - Enter title, description
// - Add sections with content
// - Set prerequisites
// - Save
// - Verify path created

// Test: Admin reorders sections
// - Open path
// - Drag section to new position
// - Save
// - Verify order persisted

// Test: Admin adds content to section
// - Open path section
// - Add markdown content
// - Add video URL
// - Add quiz questions
// - Save
// - Verify all content saved

// Test: Admin previews learning path
// - Open path
// - Click preview
// - Navigate through as user would
// - Verify all content displays correctly
```

---

## /content/flashcards

**Route:** Flashcards content management  
**Existing:** none

### Missing test cases

#### Unit: `apps/admin/src/app/content/flashcards/page.test.tsx`

```typescript
// Test: Flashcards renders deck list
// - Mock decks data
// - Render page
// - Verify decks with card counts

// Test: Flashcards shows deck preview
// - Mock deck with cards
// - Render page
// - Verify sample cards preview
```

#### Integration: `apps/admin/src/app/content/flashcards/page.integration.test.tsx`

```typescript
// Test: Flashcards deck CRUD
// - Create deck, add cards
// - Edit deck info
// - Delete deck
// - Verify API calls

// Test: Flashcards card management
// - Add card to deck
// - Edit card front/back
// - Delete card
// - Reorder cards
```

#### E2E: `tests/e2e/admin/content-flashcards.spec.ts`

```typescript
// Test: Admin creates flashcard deck
// - Navigate to flashcards
// - Create new deck
// - Enter deck name, description
// - Add cards (front/back)
// - Save
// - Verify deck created

// Test: Admin bulk imports cards
// - Open deck
// - Click import
// - Upload CSV/JSON with cards
// - Verify cards added

// Test: Admin edits card
// - Open deck
// - Find card
// - Edit content
// - Save
// - Verify changes

// Test: Admin reorders cards
// - Open deck
// - Drag cards to reorder
// - Save
// - Verify order persisted
```

---

## /analytics

**Route:** Analytics dashboard  
**Existing:** none

### Missing test cases

#### Unit: `apps/admin/src/app/analytics/page.test.tsx`

```typescript
// Test: Analytics renders chart components
// - Render page
// - Verify user growth chart exists
// - Verify engagement chart exists
// - Verify completion chart exists

// Test: Analytics renders date range selector
// - Render page
// - Verify date range picker
// - Verify preset options (7d, 30d, 90d, custom)

// Test: Analytics renders metric cards
// - Mock metrics data
// - Render page
// - Verify DAU/MAU displays
// - Verify completion rate displays
```

#### Integration: `apps/admin/src/app/analytics/page.integration.test.tsx`

```typescript
// Test: Analytics fetches data for date range
// - Mock analytics API
// - Render page
// - Verify default range data loads

// Test: Analytics updates on date change
// - Render page
// - Select different date range
// - Verify API called with new range
// - Verify charts update

// Test: Analytics exports data
// - Click export
// - Verify export API called
// - Verify download triggered
```

#### E2E: `tests/e2e/admin/analytics.spec.ts`

```typescript
// Test: Admin views analytics dashboard
// - Login as admin
// - Navigate to /analytics
// - Verify charts display with data
// - Verify metrics accurate

// Test: Admin filters by date range
// - Select "Last 7 days"
// - Verify charts update
// - Select custom range
// - Verify charts update

// Test: Admin drills down on metric
// - Click on chart data point
// - Verify detailed view opens
// - Verify can see individual records

// Test: Admin exports analytics
// - Click export button
// - Select format (CSV/PDF)
// - Verify download completes
// - Verify file contains expected data
```

---

## /settings

**Route:** Admin settings  
**Existing:** none

### Missing test cases

#### Unit: `apps/admin/src/app/settings/page.test.tsx`

```typescript
// Test: Settings renders sections
// - Render page
// - Verify General settings section
// - Verify Email settings section
// - Verify Integration settings section

// Test: Settings form validation
// - Render page
// - Clear required field
// - Submit
// - Verify validation error
```

#### Integration: `apps/admin/src/app/settings/page.integration.test.tsx`

```typescript
// Test: Settings fetches current config
// - Mock settings API
// - Render page
// - Verify fields populated with current values

// Test: Settings saves changes
// - Modify setting
// - Save
// - Verify update API called
// - Verify success message

// Test: Settings handles save errors
// - Mock error response
// - Submit form
// - Verify error message displays
```

#### E2E: `tests/e2e/admin/settings.spec.ts`

```typescript
// Test: Admin views settings
// - Login as admin
// - Navigate to /settings
// - Verify all settings sections display

// Test: Admin updates general settings
// - Change site name
// - Save
// - Verify change reflected

// Test: Admin configures email settings
// - Enter SMTP settings
// - Test connection
// - Verify connection test result
// - Save settings

// Test: Admin manages integrations
// - Enable/disable integration
// - Configure API keys
// - Save
// - Verify integration status updated
```

---

## Summary

**Total pages:** 9 (admin app)  
**Pages with existing tests:** 0  
**Pages needing new tests:** 9

**Test files to create:**

- Unit tests: ~9 new files
- Integration tests: ~9 new files
- E2E tests: ~9 new spec files

**Priority order:**

1. Dashboard (/) - entry point, most used
2. Users management (/users, /users/[id]) - critical admin function
3. Content management (/content/\*) - main admin workflow
4. Analytics (/analytics) - reporting
5. Settings (/settings) - configuration

**Shared test utilities needed:**

```typescript
// tests/utils/admin-helpers.ts

// Function: loginAsAdmin
// - Login with admin credentials
// - Return authenticated page context

// Function: createTestUser
// - Create user via API
// - Return user object for tests

// Function: createTestContent
// - Create various content types
// - Return content objects for tests

// Function: cleanupTestData
// - Delete test-created users/content
// - Run after each test or test suite
```

**Admin app test configuration:**

```typescript
// playwright.config.ts additions for admin tests

// Project: admin-e2e
// - Base URL: admin app URL
// - Storage state: admin-auth.json
// - Global setup: login as admin, save auth state
```
