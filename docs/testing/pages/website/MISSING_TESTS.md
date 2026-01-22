# Missing tests checklist — website app pages

Purpose

- Track missing unit, integration, and e2e coverage per page route.
- Another AI/model can implement the tests listed below.
- Each test case includes file path, description, and implementation hints.

Legend

- Unit: component/page rendering tests (React Testing Library)
- Integration: API + UI wiring tests (mock server or test DB)
- E2E: browser-level tests (Playwright)

---

## /

**Route:** Home page  
**Existing:** `apps/website/src/app/page.test.tsx`, `apps/website/src/app/page.integration.test.tsx`

### Missing test cases

#### E2E: `tests/e2e/website/home.spec.ts`

```typescript
// Test: Home page loads and displays hero section
// - Navigate to /
// - Verify page title contains site name
// - Verify hero section is visible
// - Verify primary CTA button exists

// Test: Home page navigation to get-started
// - Click "Get Started" CTA
// - Verify navigation to /get-started

// Test: Home page navigation to auth
// - Click "Sign In" link
// - Verify navigation to /auth

// Test: Home page responsive layout
// - Test mobile viewport (375px)
// - Test tablet viewport (768px)
// - Test desktop viewport (1280px)
// - Verify no horizontal scroll on any viewport
```

---

## /get-started

**Route:** Onboarding / Get Started  
**Existing:** `apps/website/src/app/get-started/page.test.tsx`

### Missing test cases

#### Integration: `apps/website/src/app/get-started/page.integration.test.tsx`

```typescript
// Test: Get started page fetches initial data
// - Mock API responses for any initial data
// - Render page
// - Verify data displays correctly

// Test: Get started handles API errors gracefully
// - Mock API to return error
// - Render page
// - Verify error state UI displays
```

#### E2E: `tests/e2e/website/get-started.spec.ts`

```typescript
// Test: Complete onboarding flow as new user
// - Navigate to /get-started
// - Complete each onboarding step
// - Verify progress indicator updates
// - Verify final redirect to dashboard or learning path

// Test: Skip onboarding option
// - Navigate to /get-started
// - Click skip button (if exists)
// - Verify redirect to appropriate page

// Test: Onboarding persists progress
// - Start onboarding, complete 2 steps
// - Refresh page
// - Verify progress is maintained
```

---

## /auth

**Route:** Authentication page  
**Existing:** none

### Missing test cases

#### Unit: `apps/website/src/app/auth/page.test.tsx`

```typescript
// Test: Auth page renders login form by default
// - Render AuthPage
// - Verify email input exists
// - Verify password input exists
// - Verify submit button exists

// Test: Auth page switches to signup mode
// - Render AuthPage
// - Click "Sign Up" tab/link
// - Verify signup form fields appear (name, confirm password)

// Test: Login form validation - empty fields
// - Render AuthPage
// - Submit form without filling fields
// - Verify error messages for required fields

// Test: Login form validation - invalid email
// - Enter invalid email format
// - Submit form
// - Verify email validation error

// Test: Login form validation - short password
// - Enter password < 8 characters
// - Submit form
// - Verify password length error

// Test: Signup form validation - password mismatch
// - Switch to signup mode
// - Enter different passwords
// - Submit form
// - Verify password mismatch error

// Test: Form shows loading state during submission
// - Mock slow API response
// - Submit valid form
// - Verify loading indicator appears
// - Verify submit button is disabled
```

#### Integration: `apps/website/src/app/auth/page.integration.test.tsx`

```typescript
// Test: Successful login redirects to dashboard
// - Mock successful login API response
// - Submit valid credentials
// - Verify redirect to /dashboard

// Test: Failed login shows error message
// - Mock 401 API response
// - Submit credentials
// - Verify error message displays

// Test: Successful signup creates account and redirects
// - Mock successful signup API response
// - Submit signup form
// - Verify redirect or verification message

// Test: OAuth login initiates provider flow
// - Click Google/GitHub OAuth button
// - Verify redirect to OAuth provider URL
```

#### E2E: `tests/e2e/website/auth.spec.ts`

```typescript
// Test: Complete login flow with valid credentials
// - Navigate to /auth
// - Enter test user credentials
// - Submit form
// - Verify redirect to dashboard
// - Verify user is authenticated (check nav shows user info)

// Test: Complete signup flow
// - Navigate to /auth
// - Switch to signup
// - Fill signup form with new user data
// - Submit form
// - Verify account creation (check email or redirect)

// Test: Logout flow
// - Login as test user
// - Click logout button
// - Verify redirect to home or auth
// - Verify protected routes redirect to auth

// Test: Remember me functionality
// - Login with "remember me" checked
// - Close browser (clear session)
// - Reopen and navigate to protected route
// - Verify still authenticated

// Test: Forgot password flow
// - Click "Forgot Password" link
// - Enter email
// - Submit
// - Verify confirmation message
```

---

## /auth/callback

**Route:** OAuth callback handler  
**Existing:** none

### Missing test cases

#### Unit: `apps/website/src/app/auth/callback/page.test.tsx`

```typescript
// Test: Callback page renders loading state
// - Render CallbackPage
// - Verify loading spinner or message displays

// Test: Callback page handles missing params
// - Render without required URL params
// - Verify error state displays
```

#### Integration: `apps/website/src/app/auth/callback/page.integration.test.tsx`

```typescript
// Test: Callback processes valid OAuth code
// - Mock URL with valid code param
// - Mock token exchange API
// - Render page
// - Verify token exchange called
// - Verify redirect to dashboard

// Test: Callback handles invalid code
// - Mock URL with invalid code
// - Mock 400 API response
// - Render page
// - Verify error message and redirect to auth

// Test: Callback handles expired code
// - Mock URL with expired code
// - Mock 401 API response
// - Render page
// - Verify session expired message
```

#### E2E: `tests/e2e/website/auth-callback.spec.ts`

```typescript
// Test: OAuth callback completes authentication
// - Simulate OAuth provider redirect with valid params
// - Verify callback page processes auth
// - Verify redirect to dashboard
// - Verify user session established
```

---

## /dashboard

**Route:** User dashboard  
**Existing:** none

### Missing test cases

#### Unit: `apps/website/src/app/dashboard/page.test.tsx`

```typescript
// Test: Dashboard renders with user data
// - Mock user context
// - Render DashboardPage
// - Verify welcome message with user name
// - Verify progress widget renders
// - Verify recent activity widget renders

// Test: Dashboard renders empty state for new user
// - Mock user context with no progress
// - Render DashboardPage
// - Verify empty state message
// - Verify "Get Started" CTA displays

// Test: Dashboard shows loading skeleton
// - Mock loading state
// - Render DashboardPage
// - Verify skeleton loaders display

// Test: Dashboard widgets are interactive
// - Render with mock data
// - Verify progress widget shows percentage
// - Verify streak counter displays
// - Verify learning path cards are clickable
```

#### Integration: `apps/website/src/app/dashboard/page.integration.test.tsx`

```typescript
// Test: Dashboard fetches user progress
// - Mock progress API endpoint
// - Render page
// - Verify API called
// - Verify progress data displays

// Test: Dashboard fetches recent activity
// - Mock activity API endpoint
// - Render page
// - Verify activity list populates

// Test: Dashboard handles API errors
// - Mock 500 API response
// - Render page
// - Verify error state displays
// - Verify retry button works

// Test: Dashboard updates on progress change
// - Render with initial data
// - Simulate progress update
// - Verify widget updates without full reload
```

#### E2E: `tests/e2e/website/dashboard.spec.ts`

```typescript
// Test: Authenticated user sees personalized dashboard
// - Login as test user with progress
// - Navigate to /dashboard
// - Verify user name displays
// - Verify progress stats are accurate
// - Verify recent activity shows

// Test: Dashboard quick actions work
// - Login and go to dashboard
// - Click "Continue Learning" button
// - Verify navigation to last active path

// Test: Dashboard redirects unauthenticated users
// - Clear auth session
// - Navigate to /dashboard
// - Verify redirect to /auth

// Test: Dashboard updates after completing activity
// - Login and complete a flashcard deck
// - Return to dashboard
// - Verify activity appears in recent list
// - Verify progress stats updated
```

---

## /settings

**Route:** User settings  
**Existing:** none

### Missing test cases

#### Unit: `apps/website/src/app/settings/page.test.tsx`

```typescript
// Test: Settings page renders profile section
// - Mock user context
// - Render SettingsPage
// - Verify profile form displays
// - Verify current values populated

// Test: Settings page renders preferences section
// - Render SettingsPage
// - Verify notification preferences exist
// - Verify theme preference exists

// Test: Profile form validation
// - Clear name field
// - Submit form
// - Verify name required error

// Test: Email change requires confirmation
// - Change email field
// - Submit form
// - Verify confirmation dialog appears

// Test: Password change form validation
// - Enter new password without current
// - Submit
// - Verify current password required error

// Test: Delete account shows confirmation
// - Click delete account button
// - Verify confirmation modal appears
// - Verify destructive action warning
```

#### Integration: `apps/website/src/app/settings/page.integration.test.tsx`

```typescript
// Test: Settings saves profile changes
// - Mock update API
// - Change name field
// - Submit form
// - Verify API called with new data
// - Verify success message

// Test: Settings handles save errors
// - Mock 400 API response
// - Submit form
// - Verify error message displays

// Test: Settings updates preferences
// - Toggle notification setting
// - Verify API called
// - Verify preference persisted

// Test: Password change validates current password
// - Mock password validation API
// - Enter wrong current password
// - Submit
// - Verify error from API displays
```

#### E2E: `tests/e2e/website/settings.spec.ts`

```typescript
// Test: User can update profile name
// - Login and go to /settings
// - Change display name
// - Save changes
// - Verify name updated in nav/header

// Test: User can change notification preferences
// - Go to settings
// - Toggle email notifications off
// - Refresh page
// - Verify preference persisted

// Test: User can change theme
// - Go to settings
// - Select dark theme
// - Verify theme applied
// - Refresh and verify persisted

// Test: Password change flow
// - Go to settings
// - Enter current and new password
// - Submit
// - Logout and login with new password
// - Verify login successful
```

---

## /learning-paths

**Route:** Learning paths list  
**Existing:** `apps/website/src/app/learning-paths/page.test.tsx`

### Missing test cases

#### Integration: `apps/website/src/app/learning-paths/page.integration.test.tsx`

```typescript
// Test: Learning paths fetches and displays list
// - Mock paths API
// - Render page
// - Verify paths display as cards

// Test: Learning paths shows user progress on each path
// - Mock paths with progress data
// - Render page
// - Verify progress indicators on cards

// Test: Learning paths handles empty list
// - Mock empty API response
// - Render page
// - Verify empty state message

// Test: Learning paths filters by category
// - Render with mock data
// - Select category filter
// - Verify filtered results
```

#### E2E: `tests/e2e/website/learning-paths.spec.ts`

```typescript
// Test: User can browse all learning paths
// - Navigate to /learning-paths
// - Verify multiple path cards display
// - Verify each card has title, description, duration

// Test: User can filter paths by difficulty
// - Select "Beginner" filter
// - Verify only beginner paths show

// Test: User can search paths
// - Enter search term
// - Verify results match search

// Test: User can start a learning path
// - Click on a path card
// - Verify navigation to path detail
// - Click "Start Learning"
// - Verify first section opens
```

---

## /learning-paths/[id]

**Route:** Learning path detail  
**Existing:** none

### Missing test cases

#### Unit: `apps/website/src/app/learning-paths/[id]/page.test.tsx`

```typescript
// Test: Path detail renders header with title
// - Mock path data
// - Render page
// - Verify title displays
// - Verify description displays

// Test: Path detail renders sections list
// - Mock path with sections
// - Render page
// - Verify all sections listed
// - Verify section order preserved

// Test: Path detail shows progress
// - Mock path with 50% progress
// - Render page
// - Verify progress bar at 50%
// - Verify completed sections marked

// Test: Path detail shows locked sections
// - Mock path with prerequisites
// - Render page
// - Verify locked sections show lock icon
// - Verify locked sections not clickable
```

#### Integration: `apps/website/src/app/learning-paths/[id]/page.integration.test.tsx`

```typescript
// Test: Path detail fetches path data by ID
// - Mock path API for specific ID
// - Render page with ID param
// - Verify correct data displays

// Test: Path detail handles 404
// - Mock 404 API response
// - Render page
// - Verify not found message

// Test: Path detail marks section complete
// - Render with progress
// - Click complete on section
// - Verify API called
// - Verify UI updates
```

#### E2E: `tests/e2e/website/learning-path-detail.spec.ts`

```typescript
// Test: User views path details
// - Navigate to /learning-paths/[id]
// - Verify path title and description
// - Verify sections list

// Test: User starts first section
// - Open path detail
// - Click first section
// - Verify navigation to section page

// Test: User resumes path from last position
// - Have user with partial progress
// - Open path detail
// - Click "Continue" button
// - Verify opens at last incomplete section

// Test: Completed path shows certificate option
// - Have user complete all sections
// - Open path detail
// - Verify completion badge
// - Verify certificate download option
```

---

## /learning-paths/[id]/sections/[sectionId]

**Route:** Learning path section  
**Existing:** none

### Missing test cases

#### Unit: `apps/website/src/app/learning-paths/[id]/sections/[sectionId]/page.test.tsx`

```typescript
// Test: Section renders content
// - Mock section data with markdown content
// - Render page
// - Verify content renders as HTML

// Test: Section renders video if present
// - Mock section with video URL
// - Render page
// - Verify video player component

// Test: Section renders quiz if present
// - Mock section with quiz questions
// - Render page
// - Verify quiz component renders

// Test: Section navigation shows prev/next
// - Mock section with siblings
// - Render page
// - Verify prev/next buttons

// Test: Section shows completion button
// - Render incomplete section
// - Verify "Mark Complete" button
```

#### Integration: `apps/website/src/app/learning-paths/[id]/sections/[sectionId]/page.integration.test.tsx`

```typescript
// Test: Section fetches content by IDs
// - Mock section API
// - Render with path and section IDs
// - Verify correct content loads

// Test: Section saves progress on complete
// - Click mark complete
// - Verify progress API called
// - Verify navigation to next section

// Test: Quiz submission saves answers
// - Complete quiz
// - Submit
// - Verify answers saved to API
// - Verify score displayed

// Test: Video progress tracking
// - Play video
// - Pause at 50%
// - Verify progress saved
```

#### E2E: `tests/e2e/website/learning-section.spec.ts`

```typescript
// Test: User reads section content
// - Navigate to section
// - Verify content displays
// - Scroll through content

// Test: User completes section and progresses
// - Open section
// - Read content
// - Click "Mark Complete"
// - Verify auto-navigation to next section

// Test: User completes quiz in section
// - Open section with quiz
// - Answer all questions
// - Submit quiz
// - Verify score shown
// - Verify section marked complete if passed

// Test: User can navigate between sections
// - Open middle section
// - Click previous
// - Verify previous section loads
// - Click next
// - Verify next section loads
```

---

## /learning-mode

**Route:** Learning mode selector  
**Existing:** none

### Missing test cases

#### Unit: `apps/website/src/app/learning-mode/page.test.tsx`

```typescript
// Test: Learning mode renders mode options
// - Render page
// - Verify guided mode option
// - Verify free-style mode option
// - Verify each has description

// Test: Learning mode shows recommendations
// - Mock user with history
// - Render page
// - Verify recommended mode highlighted
```

#### Integration: `apps/website/src/app/learning-mode/page.integration.test.tsx`

```typescript
// Test: Learning mode fetches user preferences
// - Mock preferences API
// - Render page
// - Verify last used mode indicated
```

#### E2E: `tests/e2e/website/learning-mode.spec.ts`

```typescript
// Test: User selects guided mode
// - Navigate to /learning-mode
// - Click guided mode
// - Verify navigation to /guided-practice

// Test: User selects free-style mode
// - Click free-style mode
// - Verify navigation to /free-style
```

---

## /guided-practice

**Route:** Guided practice flow  
**Existing:** `apps/website/src/app/guided-practice/page.test.tsx`

### Missing test cases

#### Integration: `apps/website/src/app/guided-practice/page.integration.test.tsx`

```typescript
// Test: Guided practice loads session
// - Mock session API
// - Render page
// - Verify current step displays

// Test: Guided practice tracks step completion
// - Complete a step
// - Verify progress API called
// - Verify next step unlocks

// Test: Guided practice handles session resume
// - Mock session with progress
// - Render page
// - Verify resumes at correct step
```

#### E2E: `tests/e2e/website/guided-practice.spec.ts`

```typescript
// Test: User starts new guided session
// - Navigate to /guided-practice
// - Select a topic
// - Start session
// - Verify first question appears

// Test: User completes guided practice step
// - Start session
// - Answer question correctly
// - Verify feedback shown
// - Verify progress updates
// - Verify next question loads

// Test: User completes full guided session
// - Start session
// - Answer all questions
// - Verify completion screen
// - Verify stats summary

// Test: User can pause and resume session
// - Start session, answer 2 questions
// - Navigate away
// - Return to /guided-practice
// - Verify can resume from step 3
```

---

## /guided-practice-minimal

**Route:** Minimal guided practice  
**Existing:** none

### Missing test cases

#### Unit: `apps/website/src/app/guided-practice-minimal/page.test.tsx`

```typescript
// Test: Minimal guided renders simplified UI
// - Render page
// - Verify minimal layout (no sidebars)
// - Verify question displays

// Test: Minimal guided shows only essential elements
// - Render page
// - Verify no progress bar (or simplified)
// - Verify submit button prominent
```

#### Integration: `apps/website/src/app/guided-practice-minimal/page.integration.test.tsx`

```typescript
// Test: Minimal guided loads questions
// - Mock questions API
// - Render page
// - Verify question content loads
```

#### E2E: `tests/e2e/website/guided-practice-minimal.spec.ts`

```typescript
// Test: User completes minimal practice session
// - Navigate to /guided-practice-minimal
// - Answer questions in sequence
// - Verify simplified feedback
// - Verify completion
```

---

## /guided-practice-simple

**Route:** Simple guided practice  
**Existing:** none

### Missing test cases

#### Unit: `apps/website/src/app/guided-practice-simple/page.test.tsx`

```typescript
// Test: Simple guided renders standard UI
// - Render page
// - Verify layout components
// - Verify question area

// Test: Simple guided shows progress indicator
// - Mock session with 5 questions, at question 2
// - Render page
// - Verify "2 of 5" or progress bar
```

#### Integration: `apps/website/src/app/guided-practice-simple/page.integration.test.tsx`

```typescript
// Test: Simple guided fetches session data
// - Mock session API
// - Render page
// - Verify data loads and displays
```

#### E2E: `tests/e2e/website/guided-practice-simple.spec.ts`

```typescript
// Test: User navigates simple practice flow
// - Start simple practice
// - Answer questions
// - Verify standard progress tracking
// - Complete session
```

---

## /free-style

**Route:** Free-style practice landing  
**Existing:** none

### Missing test cases

#### Unit: `apps/website/src/app/free-style/page.test.tsx`

```typescript
// Test: Free-style renders topic selection
// - Render page
// - Verify topic categories display
// - Verify search input exists

// Test: Free-style shows available paths
// - Mock paths data
// - Render page
// - Verify path cards display

// Test: Free-style filters topics
// - Render with mock data
// - Select category filter
// - Verify filtered results
```

#### Integration: `apps/website/src/app/free-style/page.integration.test.tsx`

```typescript
// Test: Free-style fetches available topics
// - Mock topics API
// - Render page
// - Verify topics load

// Test: Free-style search queries API
// - Enter search term
// - Verify API called with query
// - Verify results display
```

#### E2E: `tests/e2e/website/free-style.spec.ts`

```typescript
// Test: User browses free-style topics
// - Navigate to /free-style
// - Verify topic cards display
// - Click on a topic
// - Verify navigation to path

// Test: User searches topics
// - Enter search term
// - Verify filtered results
// - Click result
// - Verify correct path opens

// Test: User adds items to cart
// - Browse topics
// - Click "Add to Cart" on multiple items
// - Verify cart count updates
// - Navigate to cart
// - Verify items listed
```

---

## /free-style/cart

**Route:** Free-style cart  
**Existing:** none

### Missing test cases

#### Unit: `apps/website/src/app/free-style/cart/page.test.tsx`

```typescript
// Test: Cart renders items list
// - Mock cart context with items
// - Render page
// - Verify all items display
// - Verify item details (title, description)

// Test: Cart shows empty state
// - Mock empty cart
// - Render page
// - Verify empty message
// - Verify link to browse

// Test: Cart allows item removal
// - Render with items
// - Click remove on item
// - Verify remove handler called

// Test: Cart shows total/summary
// - Render with items
// - Verify item count
// - Verify any totals if applicable
```

#### Integration: `apps/website/src/app/free-style/cart/page.integration.test.tsx`

```typescript
// Test: Cart persists across sessions
// - Add items to cart
// - Refresh page
// - Verify items still present

// Test: Cart checkout creates practice plan
// - Click checkout/start
// - Verify plan creation API called
// - Verify redirect to practice
```

#### E2E: `tests/e2e/website/free-style-cart.spec.ts`

```typescript
// Test: User views cart contents
// - Add items from /free-style
// - Navigate to /free-style/cart
// - Verify all added items display

// Test: User removes item from cart
// - With items in cart
// - Click remove on one item
// - Verify item removed
// - Verify cart count updates

// Test: User starts practice from cart
// - With items in cart
// - Click "Start Practice"
// - Verify navigation to practice session
// - Verify session includes cart items
```

---

## /free-style/path/[pathId]

**Route:** Free-style path detail  
**Existing:** none

### Missing test cases

#### Unit: `apps/website/src/app/free-style/path/[pathId]/page.test.tsx`

```typescript
// Test: Path detail renders content
// - Mock path data
// - Render page
// - Verify title, description
// - Verify items/tasks list

// Test: Path detail shows add to cart button
// - Render page
// - Verify "Add to Cart" button
// - Click button
// - Verify cart handler called
```

#### Integration: `apps/website/src/app/free-style/path/[pathId]/page.integration.test.tsx`

```typescript
// Test: Path detail fetches by ID
// - Mock path API
// - Render with pathId param
// - Verify correct data loads

// Test: Path detail handles 404
// - Mock 404 response
// - Render page
// - Verify not found state
```

#### E2E: `tests/e2e/website/free-style-path.spec.ts`

```typescript
// Test: User views path details
// - Navigate to /free-style/path/[id]
// - Verify path info displays
// - Verify task list shows

// Test: User starts path directly
// - Open path detail
// - Click "Start Now"
// - Verify practice session begins
```

---

## /free-style-practice

**Route:** Free-style practice session  
**Existing:** none

### Missing test cases

#### Unit: `apps/website/src/app/free-style-practice/page.test.tsx`

```typescript
// Test: Practice session renders question
// - Mock session context
// - Render page
// - Verify question displays

// Test: Practice session shows code editor
// - Mock coding question
// - Render page
// - Verify Monaco editor loads

// Test: Practice session shows submit button
// - Render page
// - Verify submit button enabled when answer provided
```

#### Integration: `apps/website/src/app/free-style-practice/page.integration.test.tsx`

```typescript
// Test: Practice session loads questions
// - Mock session API
// - Render page
// - Verify questions load in sequence

// Test: Practice session submits answers
// - Submit answer
// - Verify submission API called
// - Verify feedback received

// Test: Practice session tracks time
// - Start session
// - Verify timer running
// - Complete session
// - Verify time recorded
```

#### E2E: `tests/e2e/website/free-style-practice.spec.ts`

```typescript
// Test: User completes free-style practice
// - Start practice session
// - Answer questions
// - Submit each answer
// - Verify session completion
// - Verify results summary

// Test: User can skip questions
// - Start session
// - Click skip
// - Verify moves to next question
// - Verify skipped tracked

// Test: User can review answers
// - Complete session
// - Click review
// - Verify can see all answers
// - Verify correct/incorrect marked
```

---

## /browse-practice-questions

**Route:** Question browser  
**Existing:** `apps/website/src/app/browse-practice-questions/page.test.tsx`

### Missing test cases

#### Integration: `apps/website/src/app/browse-practice-questions/page.integration.test.tsx`

```typescript
// Test: Question browser fetches questions
// - Mock questions API
// - Render page
// - Verify questions list displays

// Test: Question browser pagination
// - Mock paginated response
// - Render page
// - Click next page
// - Verify next page API called
// - Verify new questions display

// Test: Question browser filters
// - Select difficulty filter
// - Verify API called with filter param
// - Verify results update

// Test: Question browser search
// - Enter search term
// - Verify API called with search query
// - Verify results match search
```

#### E2E: `tests/e2e/website/browse-questions.spec.ts`

```typescript
// Test: User browses all questions
// - Navigate to /browse-practice-questions
// - Verify questions list displays
// - Verify pagination controls

// Test: User filters by difficulty
// - Select "Easy" filter
// - Verify only easy questions show

// Test: User filters by category
// - Select "JavaScript" category
// - Verify filtered results

// Test: User searches questions
// - Enter "array" in search
// - Verify results contain array-related questions

// Test: User opens question detail
// - Click on question card
// - Verify navigation to question page
// - Verify question content displays
```

---

## /questions

**Route:** Questions list  
**Existing:** none

### Missing test cases

#### Unit: `apps/website/src/app/questions/page.test.tsx`

```typescript
// Test: Questions page renders list
// - Mock questions data
// - Render page
// - Verify question cards display

// Test: Questions page shows loading state
// - Mock loading state
// - Render page
// - Verify skeleton loaders

// Test: Questions page shows empty state
// - Mock empty response
// - Render page
// - Verify empty state message
```

#### Integration: `apps/website/src/app/questions/page.integration.test.tsx`

```typescript
// Test: Questions page fetches data
// - Mock questions API
// - Render page
// - Verify API called
// - Verify data displays

// Test: Questions page handles errors
// - Mock 500 response
// - Render page
// - Verify error state
```

#### E2E: `tests/e2e/website/questions.spec.ts`

```typescript
// Test: User views questions list
// - Navigate to /questions
// - Verify questions display
// - Verify can scroll through list

// Test: User navigates to question detail
// - Click on question
// - Verify detail page opens
```

---

## /categories-topics

**Route:** Categories and topics browser  
**Existing:** none

### Missing test cases

#### Unit: `apps/website/src/app/categories-topics/page.test.tsx`

```typescript
// Test: Categories page renders category list
// - Mock categories data
// - Render page
// - Verify category cards display

// Test: Categories page shows topic count per category
// - Mock data with counts
// - Render page
// - Verify "X topics" label on each card

// Test: Categories page is searchable
// - Render page
// - Verify search input exists
```

#### Integration: `apps/website/src/app/categories-topics/page.integration.test.tsx`

```typescript
// Test: Categories fetches from API
// - Mock categories API
// - Render page
// - Verify data loads

// Test: Selecting category loads topics
// - Click category
// - Verify topics API called
// - Verify topics display
```

#### E2E: `tests/e2e/website/categories-topics.spec.ts`

```typescript
// Test: User browses categories
// - Navigate to /categories-topics
// - Verify category cards display
// - Verify descriptions show

// Test: User selects category
// - Click on "JavaScript" category
// - Verify JavaScript topics display

// Test: User navigates to topic questions
// - Select category
// - Click on topic
// - Verify filtered questions display
```

---

## /custom-practice/[planId]

**Route:** Custom practice plan  
**Existing:** none

### Missing test cases

#### Unit: `apps/website/src/app/custom-practice/[planId]/page.test.tsx`

```typescript
// Test: Custom practice renders plan details
// - Mock plan data
// - Render page
// - Verify plan title
// - Verify items list

// Test: Custom practice shows progress
// - Mock plan with progress
// - Render page
// - Verify progress bar
// - Verify completed items marked

// Test: Custom practice shows start button
// - Render page
// - Verify "Start Practice" or "Continue" button
```

#### Integration: `apps/website/src/app/custom-practice/[planId]/page.integration.test.tsx`

```typescript
// Test: Custom practice fetches plan by ID
// - Mock plan API
// - Render with planId param
// - Verify correct plan loads

// Test: Custom practice saves progress
// - Complete an item
// - Verify progress API called
// - Verify UI updates

// Test: Custom practice handles 404 plan
// - Mock 404 response
// - Render page
// - Verify not found state
```

#### E2E: `tests/e2e/website/custom-practice.spec.ts`

```typescript
// Test: User views custom plan
// - Navigate to /custom-practice/[planId]
// - Verify plan details display
// - Verify items list

// Test: User starts custom practice
// - Click "Start Practice"
// - Verify session begins
// - Verify first item loads

// Test: User completes custom practice
// - Start practice
// - Complete all items
// - Verify completion screen
// - Verify plan marked complete
```

---

## /custom-roadmap

**Route:** Custom roadmap builder  
**Existing:** `apps/website/src/app/custom-roadmap/page.test.tsx`

### Missing test cases

#### Integration: `apps/website/src/app/custom-roadmap/page.integration.test.tsx`

```typescript
// Test: Roadmap builder fetches available topics
// - Mock topics API
// - Render page
// - Verify topics available for selection

// Test: Roadmap builder saves roadmap
// - Create roadmap
// - Click save
// - Verify save API called
// - Verify success feedback

// Test: Roadmap builder loads existing roadmap
// - Mock existing roadmap
// - Render page with ID
// - Verify roadmap data populated
```

#### E2E: `tests/e2e/website/custom-roadmap.spec.ts`

```typescript
// Test: User creates new roadmap
// - Navigate to /custom-roadmap
// - Enter roadmap title
// - Add topics to roadmap
// - Save roadmap
// - Verify saved in my-plans

// Test: User edits existing roadmap
// - Open existing roadmap
// - Modify topics
// - Save changes
// - Verify changes persisted

// Test: User reorders roadmap items
// - Create roadmap with items
// - Drag to reorder
// - Verify new order saved
```

---

## /my-plans

**Route:** User's saved plans  
**Existing:** `apps/website/src/app/my-plans/page.test.tsx`

### Missing test cases

#### Integration: `apps/website/src/app/my-plans/page.integration.test.tsx`

```typescript
// Test: My plans fetches user's plans
// - Mock plans API
// - Render page
// - Verify plans display

// Test: My plans shows progress per plan
// - Mock plans with progress
// - Render page
// - Verify progress bars accurate

// Test: My plans allows plan deletion
// - Click delete on plan
// - Verify confirmation
// - Confirm deletion
// - Verify API called
// - Verify plan removed from UI
```

#### E2E: `tests/e2e/website/my-plans.spec.ts`

```typescript
// Test: User views their plans
// - Login as user with plans
// - Navigate to /my-plans
// - Verify plans list displays

// Test: User opens a plan
// - Click on plan card
// - Verify navigation to plan detail

// Test: User deletes a plan
// - Click delete on plan
// - Confirm deletion
// - Verify plan removed from list

// Test: Empty state for new user
// - Login as user with no plans
// - Navigate to /my-plans
// - Verify empty state with CTA to create plan
```

---

## /problem-solving

**Route:** Problem solving list  
**Existing:** `apps/website/src/app/problem-solving/page.test.tsx`

### Missing test cases

#### Integration: `apps/website/src/app/problem-solving/page.integration.test.tsx`

```typescript
// Test: Problem solving fetches problems
// - Mock problems API
// - Render page
// - Verify problems list displays

// Test: Problem solving filters by difficulty
// - Select difficulty filter
// - Verify API called with filter
// - Verify filtered results

// Test: Problem solving shows solved status
// - Mock user progress
// - Render page
// - Verify solved problems marked
```

#### E2E: `tests/e2e/website/problem-solving.spec.ts`

```typescript
// Test: User browses problems
// - Navigate to /problem-solving
// - Verify problem list displays
// - Verify difficulty tags show

// Test: User filters by difficulty
// - Select "Medium" filter
// - Verify only medium problems show

// Test: User opens problem
// - Click on problem
// - Verify navigation to detail page
// - Verify problem statement displays
```

---

## /problem-solving/[id]

**Route:** Problem detail and solution  
**Existing:** none

### Missing test cases

#### Unit: `apps/website/src/app/problem-solving/[id]/page.test.tsx`

```typescript
// Test: Problem page renders statement
// - Mock problem data
// - Render page
// - Verify title displays
// - Verify problem statement displays

// Test: Problem page renders code editor
// - Render page
// - Verify Monaco editor component

// Test: Problem page shows test cases
// - Mock problem with test cases
// - Render page
// - Verify example test cases visible

// Test: Problem page shows submit button
// - Render page
// - Verify submit button exists
// - Verify disabled when empty

// Test: Problem page shows hints
// - Mock problem with hints
// - Render page
// - Click show hint
// - Verify hint displays
```

#### Integration: `apps/website/src/app/problem-solving/[id]/page.integration.test.tsx`

```typescript
// Test: Problem page fetches by ID
// - Mock problem API
// - Render with id param
// - Verify correct problem loads

// Test: Problem page runs code
// - Enter code
// - Click run
// - Verify execution API called
// - Verify output displays

// Test: Problem page submits solution
// - Enter valid solution
// - Click submit
// - Verify submission API called
// - Verify result feedback

// Test: Problem page handles failed tests
// - Submit incorrect solution
// - Verify failed test cases shown
// - Verify expected vs actual output
```

#### E2E: `tests/e2e/website/problem-solving-detail.spec.ts`

```typescript
// Test: User views problem details
// - Navigate to /problem-solving/[id]
// - Verify problem title
// - Verify statement renders markdown
// - Verify examples show

// Test: User runs code
// - Enter code in editor
// - Click "Run"
// - Verify output panel shows result

// Test: User submits correct solution
// - Enter correct solution
// - Click "Submit"
// - Verify all tests pass
// - Verify success message
// - Verify problem marked solved

// Test: User submits incorrect solution
// - Enter incorrect solution
// - Submit
// - Verify failing tests highlighted
// - Verify can retry

// Test: User uses hints
// - Click "Show Hint"
// - Verify hint displays
// - Click next hint
// - Verify subsequent hint shows
```

---

## /frontend-tasks

**Route:** Frontend tasks list  
**Existing:** `apps/website/src/app/frontend-tasks/page.test.tsx`

### Missing test cases

#### Integration: `apps/website/src/app/frontend-tasks/page.integration.test.tsx`

```typescript
// Test: Frontend tasks fetches list
// - Mock tasks API
// - Render page
// - Verify tasks display

// Test: Frontend tasks shows difficulty
// - Mock tasks with difficulty
// - Render page
// - Verify difficulty badges

// Test: Frontend tasks shows completion status
// - Mock user progress
// - Render page
// - Verify completed tasks marked
```

#### E2E: `tests/e2e/website/frontend-tasks.spec.ts`

```typescript
// Test: User browses frontend tasks
// - Navigate to /frontend-tasks
// - Verify task cards display
// - Verify preview images show

// Test: User filters tasks
// - Select "CSS" filter
// - Verify CSS tasks show

// Test: User opens task
// - Click on task card
// - Verify navigation to task detail
```

---

## /frontend-tasks/[id]

**Route:** Frontend task detail  
**Existing:** none

### Missing test cases

#### Unit: `apps/website/src/app/frontend-tasks/[id]/page.test.tsx`

```typescript
// Test: Task detail renders requirements
// - Mock task data
// - Render page
// - Verify requirements list

// Test: Task detail shows preview
// - Mock task with design image
// - Render page
// - Verify preview image displays

// Test: Task detail renders code editor
// - Render page
// - Verify HTML/CSS/JS editors or tabs

// Test: Task detail shows live preview
// - Render page
// - Verify live preview iframe
```

#### Integration: `apps/website/src/app/frontend-tasks/[id]/page.integration.test.tsx`

```typescript
// Test: Task detail fetches by ID
// - Mock task API
// - Render with id
// - Verify correct task loads

// Test: Task detail auto-saves code
// - Type in editor
// - Wait debounce
// - Verify save API called

// Test: Task detail submits solution
// - Complete task
// - Submit
// - Verify submission API
// - Verify feedback
```

#### E2E: `tests/e2e/website/frontend-task-detail.spec.ts`

```typescript
// Test: User views task requirements
// - Navigate to /frontend-tasks/[id]
// - Verify requirements display
// - Verify design preview shows

// Test: User writes code
// - Enter HTML in editor
// - Verify live preview updates

// Test: User submits task
// - Complete the task
// - Click submit
// - Verify submission reviewed
// - Verify completion status

// Test: User compares with solution
// - Complete task
// - Click "View Solution"
// - Verify solution code displays
// - Verify can toggle between user/solution
```

---

## /flashcards

**Route:** Flashcards practice  
**Existing:** `apps/website/src/app/flashcards/page.test.tsx`

### Missing test cases

#### Integration: `apps/website/src/app/flashcards/page.integration.test.tsx`

```typescript
// Test: Flashcards fetches decks
// - Mock decks API
// - Render page
// - Verify deck cards display

// Test: Flashcards shows progress per deck
// - Mock decks with progress
// - Render page
// - Verify progress indicators

// Test: Flashcards saves card flip
// - Flip card
// - Mark known/unknown
// - Verify progress API called
```

#### E2E: `tests/e2e/website/flashcards.spec.ts`

```typescript
// Test: User browses flashcard decks
// - Navigate to /flashcards
// - Verify deck cards display
// - Verify card counts show

// Test: User starts a deck
// - Click on deck
// - Verify cards start appearing

// Test: User flips and rates cards
// - Start deck
// - Click to flip card
// - Mark as "Known" or "Review Again"
// - Verify next card shows

// Test: User completes deck
// - Go through all cards
// - Verify completion summary
// - Verify accuracy percentage

// Test: Spaced repetition scheduling
// - Complete deck
// - Check next review date
// - Cards marked "Review Again" should appear sooner
```

---

## /test-notifications

**Route:** Notifications test page  
**Existing:** none

### Missing test cases

#### Unit: `apps/website/src/app/test-notifications/page.test.tsx`

```typescript
// Test: Test page renders notification triggers
// - Render page
// - Verify trigger buttons exist

// Test: Test page shows notification preview
// - Render page
// - Verify notification preview area
```

#### Integration: `apps/website/src/app/test-notifications/page.integration.test.tsx`

```typescript
// Test: Trigger notification creates notification
// - Click trigger button
// - Verify notification API called
// - Verify notification appears in UI
```

#### E2E: `tests/e2e/website/notifications.spec.ts`

```typescript
// Test: Notification appears when triggered
// - Navigate to /test-notifications
// - Click trigger
// - Verify toast/notification appears
// - Verify auto-dismisses after timeout

// Test: Notification click action
// - Trigger notification with action
// - Click notification
// - Verify action executes (navigation, etc.)
```

---

## /test-supabase

**Route:** Supabase connection test  
**Existing:** none

### Missing test cases

#### Unit: `apps/website/src/app/test-supabase/page.test.tsx`

```typescript
// Test: Test page renders connection status
// - Mock Supabase client
// - Render page
// - Verify status indicator

// Test: Test page shows test buttons
// - Render page
// - Verify CRUD test buttons exist
```

#### Integration: `apps/website/src/app/test-supabase/page.integration.test.tsx`

```typescript
// Test: Connection test verifies Supabase
// - Click test connection
// - Verify Supabase ping called
// - Verify success/failure indicator

// Test: CRUD operations test
// - Click test CRUD
// - Verify create, read, update, delete called
// - Verify results display
```

#### E2E: `tests/e2e/website/test-supabase.spec.ts`

```typescript
// Test: Supabase connection test passes
// - Navigate to /test-supabase
// - Click "Test Connection"
// - Verify green success indicator

// Test: Database operations work
// - Click "Test CRUD"
// - Verify all operations pass
// - Verify test data cleaned up
```

---

## Website-admin routes

### /admin

**Route:** Admin landing (website app)  
**Existing:** `apps/website/src/app/admin/page.test.tsx`

### Missing test cases

#### Integration: `apps/website/src/app/admin/page.integration.test.tsx`

```typescript
// Test: Admin page loads dashboard data
// - Mock admin API
// - Render page
// - Verify stats display

// Test: Admin page requires authentication
// - Render without auth
// - Verify redirect to login
```

#### E2E: `tests/e2e/admin/admin-landing.spec.ts`

```typescript
// Test: Authenticated admin sees dashboard
// - Login as admin
// - Navigate to /admin
// - Verify dashboard widgets

// Test: Non-admin redirected
// - Login as regular user
// - Navigate to /admin
// - Verify access denied or redirect
```

---

### /admin/login

**Route:** Admin login  
**Existing:** `apps/website/src/app/admin/login/page.test.tsx`

### Missing test cases

#### Integration: `apps/website/src/app/admin/login/page.integration.test.tsx`

```typescript
// Test: Admin login calls auth API
// - Submit valid credentials
// - Verify admin auth API called
// - Verify redirect on success

// Test: Admin login handles errors
// - Submit invalid credentials
// - Verify error message displays
```

#### E2E: `tests/e2e/admin/admin-login.spec.ts`

```typescript
// Test: Admin logs in successfully
// - Navigate to /admin/login
// - Enter admin credentials
// - Submit
// - Verify redirect to admin dashboard

// Test: Invalid admin credentials rejected
// - Enter wrong password
// - Submit
// - Verify error message
// - Verify still on login page
```

---

### /admin/users

**Route:** User management  
**Existing:** `apps/website/src/app/admin/users/page.test.tsx`

### Missing test cases

#### Integration: `apps/website/src/app/admin/users/page.integration.test.tsx`

```typescript
// Test: Users page fetches user list
// - Mock users API
// - Render page
// - Verify users table displays

// Test: Users page updates user role
// - Change role dropdown
// - Verify update API called
// - Verify role updated in UI

// Test: Users page handles search
// - Enter search term
// - Verify filtered results
```

#### E2E: `tests/e2e/admin/users.spec.ts`

```typescript
// Test: Admin views user list
// - Login as admin
// - Navigate to /admin/users
// - Verify users table displays

// Test: Admin searches users
// - Enter email in search
// - Verify filtered results

// Test: Admin changes user role
// - Find user
// - Change role to "moderator"
// - Verify change saved
// - Verify user has new role
```

---

### /admin/content-management

**Route:** Content management  
**Existing:** `apps/website/src/app/admin/content-management/page.test.tsx`

### Missing test cases

#### Integration: `apps/website/src/app/admin/content-management/page.integration.test.tsx`

```typescript
// Test: Content page fetches content list
// - Mock content API
// - Render page
// - Verify content items display

// Test: Content page creates item
// - Fill form
// - Submit
// - Verify create API called
// - Verify item appears in list

// Test: Content page edits item
// - Click edit on item
// - Modify fields
// - Save
// - Verify update API called

// Test: Content page deletes item
// - Click delete
// - Confirm
// - Verify delete API called
// - Verify item removed
```

#### E2E: `tests/e2e/admin/content-management.spec.ts`

```typescript
// Test: Admin creates content
// - Login as admin
// - Navigate to /admin/content-management
// - Click "New Content"
// - Fill form
// - Save
// - Verify content in list

// Test: Admin edits content
// - Open existing content
// - Modify title
// - Save
// - Verify title updated

// Test: Admin deletes content
// - Click delete on content
// - Confirm deletion
// - Verify content removed

// Test: Content appears on website
// - Create content
// - Navigate to website
// - Verify content displays
```

---

### /admin/content/questions

**Route:** Questions content management  
**Existing:** `apps/website/src/app/admin/content/questions/page.test.tsx`

### Missing test cases

#### Integration: `apps/website/src/app/admin/content/questions/page.integration.test.tsx`

```typescript
// Test: Questions page CRUD operations
// - Create question, verify API
// - Edit question, verify API
// - Delete question, verify API

// Test: Questions page validates form
// - Submit empty form
// - Verify validation errors
```

#### E2E: `tests/e2e/admin/content-questions.spec.ts`

```typescript
// Test: Admin creates question
// - Navigate to questions
// - Click new
// - Fill question details
// - Save
// - Verify in list

// Test: Admin previews question
// - Click preview
// - Verify question renders as users see it
```

---

### /admin/questions

**Route:** Questions admin list  
**Existing:** none

### Missing test cases

#### Unit: `apps/website/src/app/admin/questions/page.test.tsx`

```typescript
// Test: Questions list renders
// - Mock questions data
// - Render page
// - Verify table displays

// Test: Questions list shows actions
// - Render page
// - Verify edit/delete buttons per row
```

#### Integration: `apps/website/src/app/admin/questions/page.integration.test.tsx`

```typescript
// Test: Questions list fetches data
// - Mock API
// - Render page
// - Verify questions load

// Test: Questions list pagination
// - Mock paginated data
// - Click next page
// - Verify new data loads
```

#### E2E: `tests/e2e/admin/questions-list.spec.ts`

```typescript
// Test: Admin manages questions
// - View list
// - Edit a question
// - Delete a question
// - Verify changes persist
```

---

### /admin/questions/unified

**Route:** Unified questions view  
**Existing:** none

### Missing test cases

#### Unit: `apps/website/src/app/admin/questions/unified/page.test.tsx`

```typescript
// Test: Unified view renders all question types
// - Mock mixed question data
// - Render page
// - Verify different question types display
```

#### Integration: `apps/website/src/app/admin/questions/unified/page.integration.test.tsx`

```typescript
// Test: Unified view fetches from multiple sources
// - Mock unified API
// - Render page
// - Verify combined data displays
```

#### E2E: `tests/e2e/admin/questions-unified.spec.ts`

```typescript
// Test: Admin uses unified question management
// - Navigate to unified view
// - Filter by type
// - Edit question
// - Verify changes across system
```

---

### /admin/learning-cards

**Route:** Learning cards management  
**Existing:** none

### Missing test cases

#### Unit: `apps/website/src/app/admin/learning-cards/page.test.tsx`

```typescript
// Test: Learning cards page renders deck list
// - Mock decks data
// - Render page
// - Verify decks display

// Test: Learning cards page shows card form
// - Click add card
// - Verify form appears
```

#### Integration: `apps/website/src/app/admin/learning-cards/page.integration.test.tsx`

```typescript
// Test: Learning cards CRUD
// - Create deck and cards
// - Edit card content
// - Delete card
// - Verify all API calls
```

#### E2E: `tests/e2e/admin/learning-cards.spec.ts`

```typescript
// Test: Admin creates flashcard deck
// - Navigate to learning-cards
// - Create new deck
// - Add cards to deck
// - Save
// - Verify deck available to users

// Test: Admin edits card
// - Open existing deck
// - Edit card front/back
// - Save
// - Verify changes

// Test: Admin reorders cards
// - Open deck
// - Drag cards to reorder
// - Save
// - Verify order persisted
```

---

### /admin/frontend-tasks

**Route:** Frontend tasks management  
**Existing:** `apps/website/src/app/admin/frontend-tasks/page.test.tsx`

### Missing test cases

#### Integration: `apps/website/src/app/admin/frontend-tasks/page.integration.test.tsx`

```typescript
// Test: Frontend tasks CRUD
// - Create task
// - Edit task
// - Delete task
// - Verify API calls

// Test: Frontend tasks image upload
// - Create task
// - Upload design image
// - Verify image stored
```

#### E2E: `tests/e2e/admin/frontend-tasks.spec.ts`

```typescript
// Test: Admin creates frontend task
// - Navigate to frontend-tasks admin
// - Click create
// - Fill requirements
// - Upload design
// - Save
// - Verify task visible to users

// Test: Admin edits task difficulty
// - Open task
// - Change difficulty
// - Save
// - Verify difficulty updated
```

---

### /admin/problem-solving

**Route:** Problem solving management  
**Existing:** `apps/website/src/app/admin/problem-solving/page.test.tsx`

### Missing test cases

#### Integration: `apps/website/src/app/admin/problem-solving/page.integration.test.tsx`

```typescript
// Test: Problem solving CRUD
// - Create problem
// - Edit problem
// - Delete problem
// - Verify API calls

// Test: Problem test cases management
// - Add test cases
// - Edit test case
// - Delete test case
// - Verify test cases saved
```

#### E2E: `tests/e2e/admin/problem-solving.spec.ts`

```typescript
// Test: Admin creates problem
// - Navigate to problem-solving admin
// - Create new problem
// - Add statement, examples, test cases
// - Save
// - Verify problem available to users

// Test: Admin adds test cases
// - Open problem
// - Add input/output test case
// - Save
// - Verify test case runs on submissions

// Test: Admin sets solution template
// - Open problem
// - Add starter code template
// - Save
// - Verify users see template
```

---

## Summary

**Total pages:** 42 (website app)  
**Pages with existing tests:** 15  
**Pages needing new tests:** 27

**Test files to create:**

- Unit tests: ~35 new files
- Integration tests: ~35 new files
- E2E tests: ~30 new spec files

**Priority order:**

1. Auth flows (/auth, /auth/callback)
2. Core user pages (/dashboard, /settings)
3. Learning flows (/learning-paths/_, /guided-practice/_)
4. Practice flows (/problem-solving/_, /frontend-tasks/_)
5. Admin CRUD pages (/admin/\*)
6. Utility pages (/flashcards, /custom-\*, etc.)
