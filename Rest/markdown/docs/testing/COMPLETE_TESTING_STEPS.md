# Complete Testing Steps Guide

**Date**: 2025-01-27  
**Purpose**: Every single step needed to test all features manually  
**Status**: Comprehensive step-by-step guide

---

## 📋 Table of Contents

1. [Pre-Testing Setup](#pre-testing-setup)
2. [Task 1: Admin Bulk Question Addition](#task-1-admin-bulk-question-addition)
3. [Task 2: Admin Login](#task-2-admin-login)
4. [Task 3: Admin Dashboard](#task-3-admin-dashboard)
5. [Task 4: Content Management](#task-4-content-management)
6. [Task 5: Frontend Tasks Management](#task-5-frontend-tasks-management)
7. [Task 6: Problem Solving Management](#task-6-problem-solving-management)
8. [Task 7: User Management](#task-7-user-management)
9. [Task 8: Custom Roadmap Creation](#task-8-custom-roadmap-creation)
10. [Task 9: My Plans](#task-9-my-plans)
11. [Task 10: Browse Practice Questions](#task-10-browse-practice-questions)
12. [Task 11: Learning Paths](#task-11-learning-paths)
13. [Task 12: Frontend Tasks (User-Facing)](#task-12-frontend-tasks-user-facing)
14. [Task 13: Problem Solving (User-Facing)](#task-13-problem-solving-user-facing)
15. [Task 14-16: Flashcards](#task-14-16-flashcards)
16. [Task 17: Homepage](#task-17-homepage)
17. [Task 18: Get Started](#task-18-get-started)
18. [Task 18b: Guided Learning Page](#task-18b-guided-learning-page)
19. [Task 19: Navigation Component](#task-19-navigation-component)
20. [Task 20: Question Card Component](#task-20-question-card-component)
21. [Task 21: Progress Tracker Component](#task-21-progress-tracker-component)

---

## 🔧 Pre-Testing Setup

### Step 1: Environment Variables Setup

1. **Create `.env.local` file** in project root (if not exists)
2. **Add required environment variables**:
   ```bash
   # Admin Test Credentials (for E2E tests)
   ADMIN_EMAIL=your-admin-email@example.com
   ADMIN_PASSWORD=your-admin-password
   
   # Invalid Test Credentials (for testing error handling)
   TEST_INVALID_EMAIL=invalid@test.com
   TEST_INVALID_PASSWORD=invalid-password
   
   # Fallback Credentials (optional)
   INITIAL_ADMIN_EMAIL=admin@example.com
   INITIAL_ADMIN_PASSWORD=admin-password
   TEST_ADMIN_EMAIL=test@example.com
   TEST_ADMIN_PASSWORD=test-password
   ```
3. **Verify** `.env.local` file exists
4. **Verify** `ADMIN_EMAIL` is set
5. **Verify** `ADMIN_PASSWORD` is set
6. **Verify** `TEST_INVALID_EMAIL` is set (for error testing)
7. **Verify** `TEST_INVALID_PASSWORD` is set (for error testing)
8. **Never use hardcoded credentials** - always use environment variables

### Step 2: Start Development Server

1. **Open Terminal 1**
2. **Navigate to project root**: `cd /path/to/Elzatona-web`
3. **Start dev server**: `npm run dev`
4. **Wait for server to start** (should show "Ready" message)
5. **Verify server running** at `http://localhost:3000`
6. **Keep this terminal open**

### Step 3: Open Browser

1. **Open browser** (Chrome recommended)
2. **Open DevTools** (F12 or Cmd+Option+I)
3. **Open Network tab** (to monitor API calls)
4. **Open Console tab** (to check for errors)
5. **Open Application tab** (to check localStorage/sessionStorage)
6. **Navigate to**: `http://localhost:3000`

---

## 📝 Task 1: Admin Bulk Question Addition

### Pre-Testing Setup

1. **Verify Environment Variables**:
   - [ ] Check `.env.local` file exists
   - [ ] Verify `ADMIN_EMAIL` is set (or `INITIAL_ADMIN_EMAIL` / `TEST_ADMIN_EMAIL` as fallback)
   - [ ] Verify `ADMIN_PASSWORD` is set (or `INITIAL_ADMIN_PASSWORD` / `TEST_ADMIN_PASSWORD` as fallback)
   - [ ] **Never use hardcoded credentials** - always use environment variables

### Login Flow

1. **Open browser**: Navigate to `http://localhost:3000/admin/login`
2. **Enter email**: Use value from `ADMIN_EMAIL` environment variable (check `.env.local`)
3. **Enter password**: Use value from `ADMIN_PASSWORD` environment variable (check `.env.local`)
4. **Click "Sign In"**
5. **Wait for redirect** to `/admin/dashboard`
6. **Verify dashboard loads completely**

### Page Load & Initial State

1. **Navigate to Questions Page**: Go to `/admin/content/questions`
2. **Wait for page to fully load**: Check Network tab - all requests complete
3. **Verify page title**: "Question Management" is visible

### Verify Stats Cards Display

1. **Total Questions Card**: 
   - [ ] Card is visible
   - [ ] Shows correct count (matches actual questions in database)
   - [ ] Number is displayed correctly
2. **Categories Card**: 
   - [ ] Card is visible
   - [ ] Shows number of unique categories
   - [ ] Number is displayed correctly
3. **Active Questions Card**: 
   - [ ] Card is visible
   - [ ] Shows count of active questions (`is_active: true`)
   - [ ] Number is displayed correctly
4. **Filtered Results Card**: 
   - [ ] Card is visible
   - [ ] Shows count of currently displayed questions
   - [ ] Number is displayed correctly
5. **Verify all stats cards**: 
   - [ ] All cards are visible
   - [ ] All cards are styled correctly
   - [ ] Stats update after CRUD operations

### Verify Loading State

1. **If questions are loading**: 
   - [ ] Spinner should appear
   - [ ] Loading message "Loading questions..." should be visible
2. **After loading**: 
   - [ ] Questions list should appear
   - [ ] Loading spinner disappears

### Verify Error State (if applicable)

1. **If API fails**: 
   - [ ] Error message should display
   - [ ] "Retry" button should be visible and functional
   - [ ] Error message is clear and helpful

### Search Functionality - Basic Search

1. **Find search input**: Look for field with placeholder "Search questions by title, content, tags..."
2. **Verify search input is visible**
3. **Type a search term**: Enter "HTML"
4. **Verify results filter**: Results should filter in real-time (or after Enter key)
5. **Verify filtered results count**: Stats card should update
6. **Clear search**: Delete text from search input
7. **Verify all questions reappear**: All questions should be visible again

### Search Functionality - Edge Cases

1. **Search for non-existent term**: 
   - [ ] Type "NONEXISTENTSEARCHTERM12345"
   - [ ] Verify "No questions found" message appears
2. **Search with special characters**: 
   - [ ] Type "test@#$%"
   - [ ] Verify no errors occur
3. **Search with very long string**: 
   - [ ] Type a very long string (100+ characters)
   - [ ] Verify no performance issues
4. **Search is case-insensitive**: 
   - [ ] Search for "html" (lowercase)
   - [ ] Verify results match "HTML" (uppercase)
   - [ ] Search for "HTML" (uppercase)
   - [ ] Verify results match "html" (lowercase)

### Create New Question (CRUD - Create)

#### Open Create Modal

1. **Find "Add New Question" button**: Look for button with Plus icon
2. **Click "Add New Question" button**
3. **Verify modal opens**: Modal should appear
4. **Verify modal title**: "Create New Question" should be visible

#### Fill Question Form

1. **Title Field**: 
   - [ ] Enter question title (e.g., "What is HTML?")
   - [ ] Verify field accepts input
   - [ ] Try leaving empty → Verify validation error (if required)
2. **Content Field**: 
   - [ ] Enter question content/description
   - [ ] Verify textarea accepts multi-line text
   - [ ] Try leaving empty → Verify validation error (if required)
3. **Answer Field**: 
   - [ ] Enter answer/explanation
   - [ ] Verify field accepts input
4. **Category Selection**: 
   - [ ] Find category dropdown
   - [ ] Verify dropdown shows available categories
   - [ ] Select a category (e.g., "HTML")
   - [ ] Verify selection is saved
5. **Difficulty Selection**: 
   - [ ] Find difficulty dropdown
   - [ ] Options should be: beginner, intermediate, advanced
   - [ ] Select a difficulty level
   - [ ] Verify selection works
6. **Type Selection**: 
   - [ ] Find type dropdown
   - [ ] Verify dropdown shows available types
   - [ ] Select a type
   - [ ] Verify selection works
7. **Learning Card Selection**: 
   - [ ] Find learning card dropdown (if available)
   - [ ] Verify dropdown shows available cards
   - [ ] Select a card (optional)
   - [ ] Verify selection works
8. **Tags/Topics**: 
   - [ ] Find tag input field (if available)
   - [ ] Verify tag input works
   - [ ] Add multiple tags
   - [ ] Remove tags
   - [ ] Verify tags are displayed

#### Submit Question

1. **Click "Create Question" button**
2. **Verify loading state**: If applicable, loading indicator should appear
3. **Verify success message**: "Question created successfully" should appear
4. **Verify modal closes**: Modal should close automatically
5. **Verify page reloads**: Page should reload (or question appears in list without reload)
6. **Verify new question appears**: New question should appear in the list
7. **Verify stats cards update**: Total Questions count should increase

#### Form Validation

1. **Try submitting empty form**: 
   - [ ] Click "Create Question" without filling any fields
   - [ ] Verify validation errors appear
2. **Try submitting with only title**: 
   - [ ] Fill only title field
   - [ ] Click "Create Question"
   - [ ] Verify content required error appears
3. **Try submitting with invalid data**: 
   - [ ] Fill form with invalid data
   - [ ] Click "Create Question"
   - [ ] Verify appropriate error messages appear
4. **Verify all required fields**: 
   - [ ] Check if required fields are marked (visual indicators)
   - [ ] Verify required field indicators are visible

### View Question (CRUD - Read)

#### Open View Modal

1. **Find a question in the list**: Look for any question
2. **Find "View" button**: Look for button with Eye icon
3. **Click "View" button**
4. **Verify modal opens**: Modal should appear

#### Verify Question Details Display

1. **Title**: Question title is displayed correctly
2. **Content**: Full question content is visible
3. **Answer**: Answer/explanation is displayed (or "No answer provided" if empty)
4. **Badges**: Category, difficulty, type badges are displayed
5. **Metadata**: All question metadata is visible

#### Close Modal

1. **Find "Close" button**: Look for close button in modal
2. **Click "Close" button**
3. **Verify modal closes**: Modal should close
4. **Verify page state unchanged**: Page should remain the same

### Edit Question (CRUD - Update)

#### Open Edit Modal

1. **Find a question in the list**: Look for any question
2. **Find "Edit" button**: Look for button with Edit icon
3. **Click "Edit" button**
4. **Verify modal opens**: Modal should appear
5. **Verify modal title**: "Edit Question" should be visible

#### Verify Form Pre-filled

1. **Title field**: Contains existing title
2. **Content field**: Contains existing content
3. **Answer field**: Contains existing answer
4. **Category dropdown**: Shows current category
5. **Difficulty dropdown**: Shows current difficulty
6. **All fields**: All fields are pre-populated correctly

#### Modify Question

1. **Change title**: Enter new title value
2. **Change content**: Enter new content value
3. **Change category**: Select different category
4. **Change difficulty**: Select different difficulty level
5. **Modify other fields**: Change any other fields as needed

#### Save Changes

1. **Click "Save Changes" button**
2. **Verify loading state**: If applicable, loading indicator should appear
3. **Verify success message**: "Question updated successfully" should appear
4. **Verify modal closes**: Modal should close
5. **Verify page reloads**: Page should reload (or question updates in list)
6. **Verify updated question appears**: Updated question should appear in list with new values
7. **Verify changes persist**: Refresh page (F5) → Verify changes still there

### Delete Question (CRUD - Delete)

#### Delete Single Question

1. **Find a question in the list**: Look for any question
2. **Find "Delete" button**: Look for button with Trash icon
3. **Click "Delete" button**
4. **Verify confirmation dialog appears**: "Are you sure you want to delete this question?" should appear
5. **Click "Cancel"**: 
   - [ ] Verify question NOT deleted
   - [ ] Verify question still in list
6. **Click "Delete" again**: 
   - [ ] Click "Delete" button again
   - [ ] Click "OK" in confirmation dialog
7. **Verify success message**: "Question deleted successfully" should appear
8. **Verify page reloads**: Page should reload (or question disappears from list)
9. **Verify question no longer appears**: Question should be removed from list
10. **Verify stats cards update**: Total Questions count should decrease

#### Delete Edge Cases

1. **Try deleting last question**: 
   - [ ] If only one question exists, try deleting it
   - [ ] Verify appropriate handling
2. **Try deleting question that's in use**: 
   - [ ] If question is referenced elsewhere, try deleting
   - [ ] Verify appropriate error (if applicable)

### Pagination

#### Pagination Controls

1. **Check if pagination appears**: If more than 10 questions exist, pagination should appear
2. **Verify "Showing X to Y of Z questions" text**: Text should be correct
3. **Verify "Page X of Y" indicator**: Page indicator should be visible

#### Page Size Selection

1. **Find "Show:" dropdown**: Look for dropdown with page size options
2. **Verify options available**: Options should be: 5, 10, 20, 50, 100
3. **Select "20"**: 
   - [ ] Select 20 from dropdown
   - [ ] Verify 20 questions per page displayed
4. **Select "50"**: 
   - [ ] Select 50 from dropdown
   - [ ] Verify 50 questions per page displayed
5. **Verify page count updates**: Page count should update correctly

#### Navigation

1. **Click "Previous" button (←)**: 
   - [ ] Click previous button
   - [ ] Verify goes to previous page
2. **Verify "Previous" button disabled on page 1**: 
   - [ ] Navigate to page 1
   - [ ] Verify previous button is disabled
3. **Click "Next" button (→)**: 
   - [ ] Click next button
   - [ ] Verify goes to next page
4. **Verify "Next" button disabled on last page**: 
   - [ ] Navigate to last page
   - [ ] Verify next button is disabled
5. **Navigate to middle page**: 
   - [ ] Navigate to a middle page (e.g., page 3)
   - [ ] Verify correct questions displayed
6. **Verify URL updates**: If applicable, URL should update with page number

#### Pagination Edge Cases

1. **Test with exactly 10 questions**: 
   - [ ] If exactly 10 questions exist
   - [ ] Verify pagination appears correctly
2. **Test with 0 questions**: 
   - [ ] If no questions exist
   - [ ] Verify "No questions found" message appears
3. **Test pagination after creating question**: 
   - [ ] Create a new question
   - [ ] Verify pagination updates correctly
4. **Test pagination after deleting question**: 
   - [ ] Delete a question
   - [ ] Verify pagination updates correctly

### Question Display & Badges

#### Question List Items

1. **Each question displays**: 
   - [ ] Title (large, bold)
   - [ ] Content preview (truncated with "line-clamp-2")
   - [ ] Action buttons (View, Edit, Delete)

#### Badges Display

1. **Topic Badges**: 
   - [ ] Display topic names
   - [ ] Show "⭐" for primary topic
   - [ ] Verify badges are visible
2. **Category Badges**: 
   - [ ] Display category names
   - [ ] Show "⭐" for primary category
   - [ ] Verify badges are visible
3. **Card Badge**: 
   - [ ] Display learning card title (if associated)
   - [ ] Verify badge is visible
4. **Difficulty Badge**: 
   - [ ] Display difficulty level (beginner/intermediate/advanced)
   - [ ] Verify badge is visible
5. **Type Badge**: 
   - [ ] Display question type
   - [ ] Verify badge is visible
6. **"No Topic" badge**: 
   - [ ] If no topic assigned, verify "No Topic" badge appears
7. **"No Category" badge**: 
   - [ ] If no category assigned, verify "No Category" badge appears
8. **"No Card" badge**: 
   - [ ] If no card assigned, verify "No Card" badge appears

#### Visual States

1. **Hover over question item**: 
   - [ ] Hover over a question
   - [ ] Verify background color changes
2. **Verify badge colors**: 
   - [ ] Primary topic: Purple background
   - [ ] Primary category: Green background
   - [ ] Card: Blue background
   - [ ] Difficulty: Color-coded (beginner=default, intermediate=outline, advanced=destructive)

### Theme Testing

1. **Toggle theme**: Use navbar theme toggle button
2. **Verify all elements adapt**: 
   - [ ] Background colors change
   - [ ] Text colors change
   - [ ] Cards adapt to theme
   - [ ] Badges adapt to theme
   - [ ] Modals adapt to theme
3. **Verify theme persists**: 
   - [ ] Reload page (F5)
   - [ ] Verify theme persists after page reload

### Network & API Testing

#### API Calls Verification (Check Network Tab)

1. **GET `/api/questions/unified?page=X&pageSize=Y`**: 
   - [ ] Called on page load
   - [ ] Verify request succeeds (200 status)
   - [ ] Verify response contains `data` array
   - [ ] Verify response contains `pagination` object with `totalCount`
2. **GET `/api/cards`**: 
   - [ ] Called to fetch learning cards
   - [ ] Verify request succeeds
3. **POST `/api/questions/unified`**: 
   - [ ] Called when creating question
   - [ ] Verify request body contains question data
   - [ ] Verify response is successful
4. **PUT `/api/questions/unified/{id}`**: 
   - [ ] Called when updating question
   - [ ] Verify request body contains updated data
   - [ ] Verify response is successful
5. **DELETE `/api/questions/unified/{id}`**: 
   - [ ] Called when deleting question
   - [ ] Verify request succeeds
   - [ ] Verify question is removed from database

#### Error Handling

1. **Simulate network error**: 
   - [ ] Disable network in DevTools (Network tab → Offline)
   - [ ] Try to create question
   - [ ] Verify error message displays
2. **Try to update question**: 
   - [ ] With network disabled, try to update question
   - [ ] Verify error message displays
3. **Try to delete question**: 
   - [ ] With network disabled, try to delete question
   - [ ] Verify error message displays
4. **Re-enable network**: 
   - [ ] Re-enable network
   - [ ] Verify operations work again

### Console & Error Checking

#### Browser Console

1. **Open DevTools Console tab**
2. **Verify no JavaScript errors**: No red text should appear
3. **Verify no React warnings**: No yellow text should appear
4. **Check for helpful console logs**: If any logs exist, verify they're helpful
5. **Verify no 404 errors**: No 404 errors for assets

#### Application Tab

1. **Check localStorage**: 
   - [ ] Open Application tab → Local Storage
   - [ ] Check if theme preference stored
   - [ ] Verify no unexpected data stored
2. **Check sessionStorage**: 
   - [ ] Open Application tab → Session Storage
   - [ ] Check if any session data stored
   - [ ] Verify no unexpected data stored

### Bulk Operations Testing (If Implemented)

#### Bulk Upload

1. **Look for "Bulk Upload" or "Import Questions" button**
2. **Click button**: Verify upload interface appears
3. **Test CSV file upload**: 
   - [ ] Prepare valid CSV file with questions
   - [ ] Upload CSV file
   - [ ] Verify file parsing
   - [ ] Verify questions imported successfully
4. **Test JSON file upload**: 
   - [ ] Prepare valid JSON file with questions
   - [ ] Upload JSON file
   - [ ] Verify questions imported successfully
5. **Test invalid file**: 
   - [ ] Upload invalid file format
   - [ ] Verify error message displays
6. **Test file with missing required fields**: 
   - [ ] Upload file with incomplete data
   - [ ] Verify validation errors

#### Bulk Delete (if feature exists)

1. **Select multiple questions**: Use checkboxes to select multiple questions
2. **Click "Delete Selected" button**
3. **Verify confirmation dialog**: Dialog should appear
4. **Confirm deletion**: Click confirm
5. **Verify all selected questions deleted**: All selected questions should be removed

### Refresh & State Management

1. **Make changes**: Create/edit/delete a question
2. **Refresh page**: Press F5 or Cmd+R
3. **Verify changes persist**: Changes should still be there
4. **Verify current page maintained**: If on page 2, should stay on page 2

### Navigation Away and Back

1. **Navigate to dashboard**: Go to `/admin/dashboard`
2. **Navigate back to questions page**: Go back to `/admin/content/questions`
3. **Verify questions load correctly**: Questions should load
4. **Verify state is maintained**: Any filters/search should be maintained

### Responsive Design

#### Mobile Viewport

1. **Resize browser**: Set to mobile size (375px width)
2. **Verify layout adapts**: Layout should change for mobile
3. **Verify buttons are clickable**: All buttons should work
4. **Verify text is readable**: Text should be readable
5. **Verify modals work**: Modals should work on mobile

#### Tablet Viewport

1. **Resize to tablet size**: Set to 768px width
2. **Verify layout adapts**: Layout should adapt for tablet
3. **Verify all features accessible**: All features should be accessible

### Final Verification Checklist

- [ ] All CRUD operations work correctly
- [ ] Search functionality works
- [ ] Pagination works correctly
- [ ] Stats cards display accurate data
- [ ] All modals open/close correctly
- [ ] Form validation works
- [ ] Error handling works
- [ ] Theme toggle works
- [ ] Responsive design works
- [ ] No console errors
- [ ] All API calls succeed
- [ ] Performance is acceptable (no lag)

---

## 🔐 Task 2: Admin Login

### Pre-Testing Setup

1. **Open Browser**: Navigate to `http://localhost:3000/admin/login`
2. **Get credentials from `.env.local`**:
   - [ ] Email: Check `ADMIN_EMAIL` variable (or `INITIAL_ADMIN_EMAIL` / `TEST_ADMIN_EMAIL` as fallback)
   - [ ] Password: Check `ADMIN_PASSWORD` variable (or `INITIAL_ADMIN_PASSWORD` / `TEST_ADMIN_PASSWORD` as fallback)
   - [ ] **Never use hardcoded credentials** - always use environment variables

### Test Navbar on Login Page

1. **Verify navbar is visible**: Navbar should be at the top
2. **Verify navbar has red background**: `bg-red-600` in light mode, `bg-red-700` in dark mode
3. **Verify "Admin Access Portal" heading**: Should be visible (on tablet+ screens)
4. **Verify "Secure Authentication Required" subtitle**: Should be visible (on tablet+ screens)
5. **Verify logo is visible**: Logo should be visible and clickable (links to home)
6. **Verify theme toggle button works**: Click theme toggle → Verify theme switches
7. **Verify "Back to Site" button**: Should be visible and clickable
8. **Verify navbar text is readable**: White text with proper contrast
9. **Verify navbar is responsive**: Center title hidden on mobile

### Test Valid Login

1. **Enter email**: Use value from `ADMIN_EMAIL` environment variable (check `.env.local`)
2. **Enter password**: Use value from `ADMIN_PASSWORD` environment variable (check `.env.local`)
3. **Click "Sign In"**
4. **Verify redirect**: Should redirect to `/admin/dashboard`
5. **Verify dashboard loads**: Dashboard should load completely

### Test Invalid Login

1. **Enter wrong credentials**: Use `TEST_INVALID_EMAIL` and `TEST_INVALID_PASSWORD` from `.env.local`
2. **Click "Sign In"**
3. **Verify error message**: Error message should appear
4. **Verify error message is clear**: Error message should be helpful

### Test Form Validation

1. **Leave email empty**: 
   - [ ] Clear email field
   - [ ] Click "Sign In"
   - [ ] Verify validation error appears
2. **Enter invalid email format**: 
   - [ ] Enter "invalid-email" (no @ symbol)
   - [ ] Click "Sign In"
   - [ ] Verify validation error appears
3. **Leave password empty**: 
   - [ ] Clear password field
   - [ ] Click "Sign In"
   - [ ] Verify validation error appears
4. **Verify validation errors are clear**: Error messages should be helpful

### Check Network Tab

1. **Open Network tab** in DevTools
2. **Login API call succeeds**: 
   - [ ] With valid credentials, API call should succeed
   - [ ] Status should be 200
3. **Login API call fails**: 
   - [ ] With invalid credentials, API call should fail
   - [ ] Status should be 401 or 400
4. **Error responses handled**: Error responses should be handled correctly

### Check Console

1. **Open Console tab** in DevTools
2. **Verify no JavaScript errors**: No red text should appear
3. **Verify no React warnings**: No yellow text should appear
4. **Verify no console errors**: No errors should appear

---

## 📊 Task 3: Admin Dashboard

### Pre-Testing Setup

1. **Go to login page**: Navigate to `http://localhost:3000/admin/login`
2. **Get credentials from `.env.local`**:
   - [ ] Email: Check `ADMIN_EMAIL` variable
   - [ ] Password: Check `ADMIN_PASSWORD` variable
3. **Enter credentials**: Fill in email and password
4. **Click "Sign In"**: Submit login form
5. **Wait for redirect**: Should redirect to `/admin/dashboard`
6. **Wait for dashboard to fully load**: 
   - [ ] Look for "Admin Dashboard" heading
   - [ ] Wait for all menu cards to appear
   - [ ] Wait for stats to load (may show "..." initially)
   - [ ] Check Network tab - all API calls should complete

### Test Navbar

1. **Verify navbar is visible**: Navbar should be at the top
2. **Verify navbar has red background**: `bg-red-600` in light mode, `bg-red-700` in dark mode
3. **Verify logo is visible**: Logo should be visible and clickable (links to home)
4. **Verify "Admin Menu" button**: Should be visible (on desktop screens)
5. **Click "Admin Menu" button**: Dropdown should appear
6. **Verify dropdown contains all menu items**: Dashboard, Questions, Content Management, etc.
7. **Click a menu item**: Should navigate correctly
8. **Test mobile menu**: On mobile viewport, hamburger menu should work
9. **Verify navbar text is readable**: Text should be readable in both light and dark modes
10. **Verify navbar is responsive**: Menu button hidden on mobile, visible on desktop

### Test Theme Toggle (Comprehensive)

#### Theme Toggle Button Visibility

1. **Navigate to dashboard**: Should be on `/admin/dashboard`
2. **Find theme toggle button**: Look for button with aria-label "Toggle theme"
3. **Verify button is visible**: Button should be in navbar
4. **Verify button has correct title**: Should be "Toggle theme" or "Switch to light/dark mode"

#### Theme Toggle Icon Display

1. **Check current theme state**: Inspect `<html>` element for `dark` class
2. **If dark mode**: Verify Sun icon is displayed (to switch to light)
3. **If light mode**: Verify Moon icon is displayed (to switch to dark)
4. **Verify SVG icon is visible**: Icon should be visible inside the button

#### Theme Switching Functionality

1. **Get initial theme state**: Check `dark` class on `<html>`
2. **Click theme toggle button**
3. **Wait for theme change**: Check `dark` class changes
4. **Verify theme has changed**: Light ↔ Dark
5. **Verify icon has updated**: Sun ↔ Moon
6. **Click again to switch back**: Click toggle button again
7. **Verify theme returns to original state**: Should return to original theme
8. **Verify icon returns to original state**: Should return to original icon

#### Theme Persistence

1. **Change theme**: Toggle from light → dark or dark → light
2. **Reload the page**: Press F5 or Cmd+R
3. **Verify theme persisted**: Check `dark` class on `<html>` - should match previous theme
4. **Verify theme toggle button still works**: Click toggle → Should still work
5. **Toggle theme again**: Click toggle → Verify it changes
6. **Check localStorage**: `localStorage.getItem('theme')` should match current theme

#### Theme Visual Verification

1. **In light mode**: 
   - [ ] Verify light colors
   - [ ] Verify white backgrounds
   - [ ] Verify text is readable
2. **In dark mode**: 
   - [ ] Verify dark colors
   - [ ] Verify dark backgrounds
   - [ ] Verify text is readable
3. **Verify all UI elements adapt**: 
   - [ ] Navbar colors change appropriately
   - [ ] Dashboard cards adapt to theme
   - [ ] All text is readable in both modes

### Test Dashboard Features

1. **Dashboard loads completely**: All content should be visible
2. **Statistics display correctly**: Total Questions, Categories, Topics, etc.
3. **Menu cards are visible**: All menu cards should be visible
4. **Menu cards are clickable**: All menu cards should be clickable
5. **Quick actions work**: 
   - [ ] "Add New Question" quick action
   - [ ] "Manage Learning Cards" quick action
   - [ ] All quick action buttons work
6. **Refresh button works**: 
   - [ ] Click refresh button
   - [ ] Verify stats reload
7. **All navigation links work**: All links should navigate correctly

### Test Stats Cards

1. **Verify Total Questions count**: Should display correct number
2. **Verify Categories count**: Should display correct number
3. **Verify Topics count**: Should display correct number
4. **Verify Active Questions count**: Should display correct number
5. **Verify stats update**: After operations, stats should update

### Test Admin Menu Dropdown

1. **Click "Admin Menu" button**: Dropdown should open
2. **Verify all menu items visible**: 
   - [ ] Dashboard
   - [ ] Questions
   - [ ] Content Management
   - [ ] Frontend Tasks
   - [ ] Problem Solving
   - [ ] User Management
3. **Click each menu item**: Should navigate correctly
4. **Verify dropdown closes**: After navigation, dropdown should close

### Test Refresh Button

1. **Click refresh button**: Should trigger refresh
2. **Verify loading state**: If applicable, loading indicator should appear
3. **Verify stats reload**: Stats should reload after refresh
4. **Verify no errors**: No errors should occur

### After Testing

1. **Check browser console**: Verify no errors
2. **Check Network tab**: Verify no failed API calls
3. **Verify all expected functionality works**: All features should work as expected

---

## 📚 Task 4: Content Management

### Pre-Testing Setup

1. **Login as admin**: Follow login steps from Task 2
2. **Navigate to Content Management**: Go to `/admin/content-management`

### Cards Management CRUD

#### Create Card

1. **Find "Add New Card" button**: Look for button to create new card
2. **Click button**: Modal should open
3. **Fill form**: 
   - [ ] Enter card title
   - [ ] Enter card description
   - [ ] Select category
   - [ ] Fill all required fields
4. **Submit form**: Click "Create Card"
5. **Verify card created**: Card should appear in list
6. **Verify success message**: "Card created successfully" should appear

#### View Card

1. **Find a card in list**: Look for any card
2. **Click "View" button**: Modal should open
3. **Verify card details displayed**: All card details should be visible
4. **Close modal**: Click close button

#### Edit Card

1. **Find a card in list**: Look for any card
2. **Click "Edit" button**: Modal should open
3. **Verify form pre-filled**: Form should contain existing card data
4. **Modify fields**: Change title, description, etc.
5. **Save changes**: Click "Save Changes"
6. **Verify card updated**: Card should update in list
7. **Verify changes persist**: Refresh page → Changes should still be there

#### Delete Card

1. **Find a card in list**: Look for any card
2. **Click "Delete" button**: Confirmation dialog should appear
3. **Cancel deletion**: Click "Cancel" → Card should NOT be deleted
4. **Delete card**: Click "Delete" → Click "OK" in confirmation
5. **Verify card deleted**: Card should be removed from list

#### Card Validation

1. **Try submitting empty form**: Verify validation errors
2. **Try submitting with invalid data**: Verify appropriate error messages
3. **Test required fields**: Verify all required fields are validated

### Plans Management CRUD

1. **Follow same steps as Cards CRUD**: But for Plans instead
2. **Create Plan**: Fill form, submit, verify created
3. **View Plan**: Click view, verify details
4. **Edit Plan**: Modify plan, save, verify updated
5. **Delete Plan**: Delete with confirmation, verify removed
6. **Plan Validation**: Test required fields, relationships

### Categories Management CRUD

1. **Follow same steps as Cards CRUD**: But for Categories instead
2. **Create Category**: Add category, verify created
3. **View Category**: View category details
4. **Edit Category**: Modify category, verify updated
5. **Delete Category**: Delete category, verify removed
6. **Category Validation**: Test unique names, required fields

### Topics Management CRUD

1. **Follow same steps as Cards CRUD**: But for Topics instead
2. **Create Topic**: Add topic under category, verify created
3. **View Topic**: View topic details
4. **Edit Topic**: Modify topic, verify updated
5. **Delete Topic**: Delete topic, verify removed
6. **Topic Validation**: Test category relationship, required fields

### Questions Management (within content management)

1. **Follow same steps as Task 1**: But within content management page
2. **Create Question**: Add question, verify created
3. **View Question**: View question details
4. **Edit Question**: Modify question, verify updated
5. **Delete Question**: Delete question, verify removed

### Bulk Operations (if implemented)

1. **Test bulk delete**: Select multiple items, delete, verify all deleted
2. **Test bulk update**: If available, test bulk update
3. **Test bulk export**: If available, test export
4. **Test bulk import**: If available, test import

### Stats Display

1. **Verify total cards count**: Should display correct number
2. **Verify total plans count**: Should display correct number
3. **Verify total categories count**: Should display correct number
4. **Verify total topics count**: Should display correct number
5. **Verify total questions count**: Should display correct number
6. **Verify stats update**: After CRUD operations, stats should update

### Navigation Between Sections

1. **Test switching between tabs**: Cards/Plans/Categories/Topics tabs
2. **Test navigation maintains state**: State should be maintained
3. **Test breadcrumb navigation**: If exists, test breadcrumbs

### Search & Filter

1. **Test search within each entity type**: Search should work for each type
2. **Test filtering by category/topic**: Filters should work
3. **Test sorting options**: Sorting should work

---

## 💻 Task 5: Frontend Tasks Management

### Pre-Testing Setup

1. **Login as admin**: Follow login steps from Task 2
2. **Navigate to Frontend Tasks**: Go to `/admin/frontend-tasks`

### Complete CRUD Flow

#### Create Task

1. **Click "Add New Task" button**: Modal should open
2. **Fill all fields**: 
   - [ ] Title
   - [ ] Description
   - [ ] Difficulty
   - [ ] Instructions
   - [ ] Starter code
   - [ ] Test cases
   - [ ] Solution
3. **Submit form**: Click "Create Task"
4. **Verify task created**: Task should appear in list

#### View Task

1. **Click "View" button**: Modal should open
2. **Verify all task details displayed**: All fields should be visible
3. **Verify code blocks formatted**: Code should be formatted correctly
4. **Verify test cases displayed**: Test cases should be visible
5. **Verify solution code displayed**: Solution should be visible (if visible to admin)

#### Edit Task

1. **Click "Edit" button**: Modal should open
2. **Verify form pre-filled**: Form should contain existing task data
3. **Modify all fields**: Change title, description, etc.
4. **Save changes**: Click "Save Changes"
5. **Verify task updated**: Task should update in list
6. **Verify changes persist**: Refresh page → Changes should still be there

#### Delete Task

1. **Click "Delete" button**: Confirmation dialog should appear
2. **Cancel deletion**: Click "Cancel" → Task should NOT be deleted
3. **Delete task**: Click "Delete" → Click "OK" in confirmation
4. **Verify task deleted**: Task should be removed from list

### Task Validation

1. **Test required fields**: Title, description should be required
2. **Test difficulty selection required**: Difficulty should be required
3. **Test instructions field validation**: Instructions should be validated
4. **Test starter code format validation**: Code format should be validated
5. **Test test cases format validation**: Test cases format should be validated
6. **Test solution code format validation**: Solution format should be validated

### Search/Filter Functionality

1. **Test search by title**: Search should filter by title
2. **Test search by description**: Search should filter by description
3. **Test filter by difficulty level**: Filter should work for beginner/intermediate/advanced
4. **Test filter by status**: If exists, filter by status
5. **Test combined search and filter**: Both should work together
6. **Test clearing filters**: Clearing filters should restore all tasks

### Difficulty Level Filtering

1. **Test filter by "beginner"**: Only beginner tasks should show
2. **Test filter by "intermediate"**: Only intermediate tasks should show
3. **Test filter by "advanced"**: Only advanced tasks should show
4. **Test "all difficulties" option**: All tasks should show

### Status Filtering (if implemented)

1. **Test filter by active/inactive**: Filter should work
2. **Test filter by published/draft**: Filter should work
3. **Test status indicators display**: Status should be visible

### Pagination (if applicable)

1. **Test pagination controls**: Pagination should work
2. **Test page size selection**: Page size should be changeable
3. **Test navigation between pages**: Navigation should work

### Bulk Operations (if implemented)

1. **Test bulk delete**: Select multiple, delete, verify all deleted
2. **Test bulk status change**: If available, test status change
3. **Test bulk difficulty update**: If available, test difficulty update

---

## 🧩 Task 6: Problem Solving Management

### Pre-Testing Setup

1. **Login as admin**: Follow login steps from Task 2
2. **Navigate to Problem Solving**: Go to `/admin/problem-solving`

### Testing Steps

1. **Follow same steps as Task 5**: But for Problem Solving tasks instead
2. **Complete CRUD flow**: Create, Read, Update, Delete
3. **Task details view**: Verify all details displayed
4. **Task validation**: Test all fields validation
5. **Search/filter functionality**: Test search and filters
6. **Difficulty level filtering**: Test difficulty filters
7. **Category/topic filtering**: Test category/topic filters
8. **Pagination**: Test pagination if applicable
9. **Bulk operations**: Test bulk operations if implemented

---

## 👥 Task 7: User Management

### Pre-Testing Setup

1. **Login as admin**: Follow login steps from Task 2
2. **Navigate to User Management**: Go to `/admin/users`

### User List Display

1. **Verify user list loads**: Users should load
2. **Verify user details displayed**: Email, name, role, status should be visible
3. **Verify pagination**: If applicable, pagination should work
4. **Verify search functionality**: Search should work

### User CRUD Operations

#### Create User

1. **Click "Add New User" button**: Modal should open
2. **Fill form**: 
   - [ ] Email
   - [ ] Name
   - [ ] Password
   - [ ] Role
   - [ ] Status
3. **Submit form**: Click "Create User"
4. **Verify user created**: User should appear in list

#### View User

1. **Click "View" button**: Modal should open
2. **Verify user details**: All user details should be visible

#### Edit User

1. **Click "Edit" button**: Modal should open
2. **Verify form pre-filled**: Form should contain existing user data
3. **Modify user details**: Change email, name, role, etc.
4. **Save changes**: Click "Save Changes"
5. **Verify user updated**: User should update in list
6. **Verify changes persist**: Refresh page → Changes should still be there

#### Delete User

1. **Click "Delete" button**: Confirmation dialog should appear
2. **Cancel deletion**: Click "Cancel" → User should NOT be deleted
3. **Delete user**: Click "Delete" → Click "OK" in confirmation
4. **Verify user deleted**: User should be removed from list

### User Role Management

1. **Test changing user role**: Change role from user to admin or vice versa
2. **Test role dropdown works**: Dropdown should work correctly
3. **Test role changes persist**: Role changes should persist after reload

### User Status Management

1. **Test activating/deactivating users**: Toggle user status
2. **Test status indicators display**: Status should be visible
3. **Test status changes persist**: Status changes should persist after reload

### Search & Filter

1. **Test search by email**: Search should filter by email
2. **Test search by name**: Search should filter by name
3. **Test filter by role**: Filter should work for admin/user
4. **Test filter by status**: Filter should work for active/inactive

### User Validation

1. **Test email format validation**: Invalid emails should be rejected
2. **Test required fields**: Required fields should be validated
3. **Test duplicate email prevention**: Duplicate emails should be prevented

---

## 🗺️ Task 8: Custom Roadmap Creation

### Pre-Testing Setup

1. **Navigate to Custom Roadmap**: Go to `http://localhost:3000/custom-roadmap`

### Roadmap Creation Flow

1. **Navigate to custom roadmap page**: Should be at `/custom-roadmap`
2. **Fill plan name**: Enter a plan name
3. **Fill description**: Enter a description
4. **Select cards**: Select one or more cards
5. **Select categories**: Select one or more categories
6. **Select topics**: Select one or more topics
7. **Select questions**: Select one or more questions
8. **Click "Save Plan"**: Submit the form
9. **Verify plan saved**: Plan should be saved
10. **Verify redirect to `/my-plans`**: Should redirect to my plans page

### Form Validation

1. **Test required fields**: Name should be required
2. **Test name length limits**: Name should have length limits
3. **Test description length limits**: Description should have length limits
4. **Test at least one selection required**: Cards/categories/topics/questions should require at least one selection

### Selection Functionality

1. **Test card selection**: Single/multiple card selection should work
2. **Test category selection**: Category selection should work
3. **Test topic selection**: Topic selection should work
4. **Test question selection**: Question selection should work
5. **Test clearing selections**: Clearing selections should work
6. **Test selection counts update**: Counts should update when selections change

### Plan Persistence

1. **Verify plan saved to localStorage**: Check localStorage for plan data
2. **Verify plan appears in `/my-plans`**: Plan should appear in my plans page
3. **Verify plan persists after page reload**: Reload page → Plan should still be there

### Error Handling

1. **Test saving with no selections**: Should show error
2. **Test network error**: Should show error message
3. **Test validation errors display**: Validation errors should be visible

---

## 📋 Task 9: My Plans

### Pre-Testing Setup

1. **Navigate to My Plans**: Go to `http://localhost:3000/my-plans`

### Plans List Display

1. **Verify plans load from localStorage**: Plans should load
2. **Verify plan cards display correctly**: Plan cards should be visible
3. **Verify plan details shown**: Name, description, item counts should be visible
4. **Verify empty state**: If no plans, empty state should be shown

### Plan Actions

#### View Plan

1. **Click plan**: Plan details should be displayed
2. **Verify all plan items displayed**: Cards, categories, topics, questions should be listed

#### Edit Plan

1. **Click "Edit" button**: Edit modal should open
2. **Modify plan**: Change name, description, selections
3. **Save changes**: Click "Save"
4. **Verify plan updated**: Plan should update in list

#### Delete Plan

1. **Click "Delete" button**: Confirmation dialog should appear
2. **Confirm deletion**: Click "OK"
3. **Verify plan removed**: Plan should be removed from list

#### Start Plan

1. **Click "Start Plan" button**: Should navigate to practice
2. **Verify navigation**: Should navigate to practice page

### Plan Details View

1. **Verify all plan items displayed**: All items should be visible
2. **Verify cards listed**: Cards should be listed
3. **Verify categories listed**: Categories should be listed
4. **Verify topics listed**: Topics should be listed
5. **Verify questions listed**: Questions should be listed

### Plan Management

1. **Test creating new plan**: Create plan from this page
2. **Test editing existing plan**: Edit plan from this page
3. **Test deleting plan**: Delete plan with confirmation
4. **Test plan persistence**: Plans should persist after reload

---

## ❓ Task 10: Browse Practice Questions

### Pre-Testing Setup

1. **Navigate to Browse Practice Questions**: Go to `http://localhost:3000/browse-practice-questions`

### Questions Display

1. **Verify questions load**: Questions should load
2. **Verify question cards display correctly**: Question cards should be visible
3. **Verify question details shown**: Title, content, badges should be visible
4. **Verify pagination**: If applicable, pagination should work

### Filtering

1. **Test filter by category**: Filter should work for categories
2. **Test filter by difficulty**: Filter should work for difficulty levels
3. **Test filter by topic**: Filter should work for topics
4. **Test combined filters**: Multiple filters should work together
5. **Test clearing filters**: Clearing filters should restore all questions

### Search

1. **Test search by question title**: Search should filter by title
2. **Test search by content**: Search should filter by content
3. **Test search results update**: Results should update as you type
4. **Test clearing search**: Clearing search should restore all questions

### Question Interaction

1. **Click question**: Question details should be displayed
2. **Test answer reveal**: Answer should be revealable
3. **Test question navigation**: Next/previous buttons should work
4. **Test marking question as complete**: Marking should work

### Progress Tracking

1. **Verify progress updates**: Progress should update when questions are completed
2. **Verify completed questions marked**: Completed questions should be marked
3. **Verify progress persists**: Progress should persist after reload

---

## 🎓 Task 11: Learning Paths

### Pre-Testing Setup

1. **Navigate to Learning Paths**: Go to `http://localhost:3000/learning-paths`

### Learning Paths Display

1. **Verify learning paths load**: Paths should load
2. **Verify path cards display**: Path cards should be visible
3. **Verify path details shown**: Name, description, duration should be visible

### Path Selection

1. **Click path**: Path details should be displayed
2. **Test starting a path**: Starting a path should work
3. **Test path navigation**: Navigation between path steps should work

### Path Progress

1. **Verify progress tracking**: Progress should be tracked
2. **Verify completed steps marked**: Completed steps should be marked
3. **Verify progress persists**: Progress should persist after reload

### Path Content

1. **Verify path steps displayed**: All steps should be visible
2. **Verify step completion**: Completing steps should work
3. **Verify navigation between steps**: Navigation should work

---

## 💻 Task 12: Frontend Tasks (User-Facing)

### Pre-Testing Setup

1. **Navigate to Frontend Tasks**: Go to `http://localhost:3000/frontend-tasks`

### Tasks Display

1. **Verify tasks load**: Tasks should load
2. **Verify task cards display**: Task cards should be visible
3. **Verify task details shown**: Title, description, difficulty should be visible

### Task Practice

1. **Select task**: Click on a task
2. **Verify task details**: All task details should be visible
3. **Test code editor**: If exists, code editor should work
4. **Test submitting solution**: Submitting solution should work
5. **Test viewing solution**: Viewing solution should work
6. **Test test case execution**: Running test cases should work

### Task Filtering

1. **Test filter by difficulty**: Filter should work for difficulty levels
2. **Test filter by category**: Filter should work for categories
3. **Test search functionality**: Search should work

### Progress Tracking

1. **Verify completed tasks marked**: Completed tasks should be marked
2. **Verify progress updates**: Progress should update
3. **Verify progress persists**: Progress should persist after reload

---

## 🧩 Task 13: Problem Solving (User-Facing)

### Pre-Testing Setup

1. **Navigate to Problem Solving**: Go to `http://localhost:3000/problem-solving`

### Testing Steps

1. **Follow same steps as Task 12**: But for Problem Solving tasks instead
2. **Tasks display**: Verify tasks load and display
3. **Task practice flow**: Test practice flow
4. **Solution submission**: Test solution submission
5. **Test case execution**: Test test case execution
6. **Filtering and search**: Test filters and search
7. **Progress tracking**: Test progress tracking

---

## 🃏 Task 14-16: Flashcards

### Pre-Testing Setup

1. **Navigate to Flashcards**: Go to `http://localhost:3000/flashcards`

### Flashcards Display

1. **Verify flashcards load**: Flashcards should load
2. **Verify flashcard cards display**: Flashcard cards should be visible
3. **Verify flashcard content shown**: Front and back content should be visible

### Theme Filter

1. **Test filter by theme**: Select "HTML" → Only HTML flashcards should show
2. **Test filter updates display**: Display should update when filter changes
3. **Test clearing filter**: Clearing filter should restore all flashcards

### Difficulty Filter

1. **Test filter by difficulty**: Select "Easy" → Only easy flashcards should show
2. **Test filter updates display**: Display should update when filter changes
3. **Test combined theme + difficulty filter**: Both filters should work together

### Practice Modes

#### List Mode

1. **Select List Mode**: All flashcards should be visible
2. **Verify all flashcards displayed**: All flashcards should be visible

#### Flip Mode

1. **Select Flip Mode**: Flip mode should be active
2. **Click card**: Card should flip
3. **Verify flip animation**: Flip animation should work
4. **Verify back side shown**: Back side should be visible after flip

#### Quiz Mode

1. **Select Quiz Mode**: Quiz mode should be active
2. **Answer questions**: Answer flashcards
3. **Verify scoring**: Score should be calculated
4. **Verify results**: Results should be displayed

### CRUD Operations

#### Create Flashcard

1. **Click "Add New Flashcard" button**: Modal should open
2. **Fill form**: Enter front and back content
3. **Submit form**: Click "Create Flashcard"
4. **Verify flashcard created**: Flashcard should appear in list

#### Read Flashcard

1. **Click flashcard**: Flashcard details should be displayed

#### Update Flashcard

1. **Click "Edit" button**: Edit modal should open
2. **Modify flashcard**: Change front/back content
3. **Save changes**: Click "Save Changes"
4. **Verify flashcard updated**: Flashcard should update in list

#### Delete Flashcard

1. **Click "Delete" button**: Confirmation dialog should appear
2. **Confirm deletion**: Click "OK"
3. **Verify flashcard removed**: Flashcard should be removed from list

### Flashcard Interaction

1. **Test flipping cards**: Flipping should work
2. **Test marking as learned**: Marking as learned should work
3. **Test navigation between cards**: Navigation should work
4. **Test shuffle functionality**: If exists, shuffle should work

---

## 🏠 Task 17: Homepage

### Pre-Testing Setup

1. **Navigate to Homepage**: Go to `http://localhost:3000`

### Homepage Display

1. **Verify homepage loads**: Page should load without errors
2. **Verify "Get Started" button visible**: Button should be visible
3. **Verify navigation links work**: All navigation links should work
4. **Verify hero section displays correctly**: Hero section should be visible
5. **Verify content sections are visible**: All content sections should be visible
6. **Verify theme toggle works**: Theme toggle should work

### Navigation

1. **Click "Get Started" button**: Should redirect to `/get-started`
2. **Test other navigation links**: All links should work correctly

### User Type Persistence

1. **Navigate to homepage**: Should be on homepage
2. **Check if personalized content appears**: If user type is set, personalized content should appear
3. **Verify content changes based on user type**: Content should change based on user type

---

## 🚀 Task 18: Get Started

### Pre-Testing Setup

1. **Navigate to Get Started**: Go to `http://localhost:3000/get-started`

### Page Display

1. **Verify page loads**: Page should load without errors
2. **Verify "Choose Your Learning Style" heading visible**: Heading should be visible
3. **Verify description text is visible**: Description should be visible
4. **Verify both options are displayed**: Both options should be visible

### Test "I need guidance" Option

1. **Option card is visible**: Card should be visible
2. **Card shows correct title and description**: Title and description should be correct
3. **Click the card**: Card should be clickable
4. **Verify loading transition appears**: "Loading your learning experience..." should appear
5. **Verify "Great choice!" feedback appears**: Feedback message should appear
6. **Wait for navigation**: Wait 1500ms delay
7. **Verify redirects to `/features/guided-learning`**: Should redirect to guided learning page

### Test "I'm self-directed" Option

1. **Option card is visible**: Card should be visible
2. **Card shows correct title and description**: Title and description should be correct
3. **Click the card**: Card should be clickable
4. **Verify loading transition appears**: Loading transition should appear
5. **Verify feedback appears**: Feedback message should appear
6. **Wait for navigation**: Wait for navigation delay
7. **Verify redirects to `/browse-practice-questions`**: Should redirect to practice questions page

### Visual Feedback

1. **Click an option**: Click one of the options
2. **Verify card gets selected state**: Card should have `border-indigo-500` class
3. **Verify checkmark icon appears**: Checkmark icon should appear
4. **Verify "Great choice!" message appears**: Message should appear

### Theme Toggle

1. **Theme toggle button is visible**: Button should be visible
2. **Click to toggle theme**: Click theme toggle
3. **Verify theme changes**: Theme should change
4. **Verify page content adapts to theme**: All content should adapt

### Responsive Design

1. **Test on mobile viewport**: Resize to mobile size
2. **Verify cards stack vertically**: Cards should stack
3. **Verify text is readable**: Text should be readable
4. **Verify buttons are clickable**: Buttons should be clickable

---

## 🎯 Task 18b: Guided Learning Page

### Pre-Testing Setup

1. **Navigate to Guided Learning**: Go to `http://localhost:3000/features/guided-learning`

### Page Display

1. **Verify page loads**: Page should load without errors
2. **Verify "Choose Your Learning Journey" heading visible**: Heading should be visible
3. **Verify description text is visible**: Description should be visible
4. **Verify quick stats section displayed**: Stats section should be visible
5. **Verify learning plans load**: Plans should load (may show loading state initially)

### Quick Stats

1. **Verify "Questions per Plan" stat displayed**: Stat should be visible
2. **Verify "Days Available" stat displayed**: Stat should be visible
3. **Verify "Success Rate" stat displayed**: Stat should be visible
4. **Verify stats show correct values**: Values should be correct

### Sign-in CTA (for unauthenticated users)

1. **Verify sign-in banner visible**: If not authenticated, banner should be visible
2. **Verify benefits listed**: Benefits should be listed (Save progress, Track accuracy, Sync flashcards)
3. **Verify "Create free account" button clickable**: Button should be clickable
4. **Test button navigation**: Clicking button should navigate

### Learning Plans Display

1. **Verify plans load**: Plans should load (may show loading state initially)
2. **Verify plan cards displayed**: Plan cards should be visible
3. **Verify each plan shows**: Name, duration, difficulty, questions count should be visible
4. **Verify plans are clickable**: Plans should be clickable

### Plan Selection

1. **Click on a plan card**: Click a plan
2. **Verify navigation to plan detail page**: Should navigate (if implemented)
3. **Or verify plan details modal appears**: Modal should appear (if implemented)

### Theme Toggle

1. **Theme toggle button is visible**: Button should be visible
2. **Click to toggle theme**: Click theme toggle
3. **Verify theme changes**: Theme should change
4. **Verify all content adapts to theme**: All content should adapt

### Responsive Design

1. **Test on mobile viewport**: Resize to mobile size
2. **Verify stats stack vertically**: Stats should stack
3. **Verify plan cards stack properly**: Cards should stack
4. **Verify text is readable**: Text should be readable

---

## 🧭 Task 19: Navigation Component

### Pre-Testing Setup

1. **Navigate to any page**: Go to any page (e.g., homepage)

### Navigation Rendering

1. **Verify navbar renders on all pages**: Navbar should be visible on all pages
2. **Verify logo visible and clickable**: Logo should be visible and clickable
3. **Verify navigation links displayed**: All navigation links should be visible
4. **Verify theme toggle button visible**: Theme toggle should be visible

### Navigation Links

1. **Test each link navigates correctly**: Click each link → Should navigate
2. **Test active link highlighting**: Active link should be highlighted
3. **Test mobile menu**: Hamburger menu should work on mobile

### Theme Toggle

1. **Test theme toggle in navigation**: Theme toggle should work
2. **Verify theme persists**: Theme should persist after reload

### Responsive Behavior

1. **Test mobile menu opens/closes**: Mobile menu should work
2. **Test desktop menu displays**: Desktop menu should be visible on desktop
3. **Test navigation adapts to viewport**: Navigation should adapt to screen size

---

## 🎴 Task 20: Question Card Component

### Pre-Testing Setup

1. **Navigate to a page with question cards**: Go to a page that displays question cards

### Question Card Display

1. **Verify question card renders**: Card should be visible
2. **Verify question title displayed**: Title should be visible
3. **Verify question content displayed**: Content should be visible
4. **Verify badges displayed**: Category, difficulty, type badges should be visible

### Question Interaction

1. **Click card**: Question details should be displayed
2. **Test answer reveal**: Answer should be revealable
3. **Test question actions**: If any actions exist, test them

### Badges Display

1. **Verify category badge displays**: Category badge should be visible
2. **Verify difficulty badge displays**: Difficulty badge should be visible
3. **Verify type badge displays**: Type badge should be visible
4. **Verify badge colors correct**: Badge colors should be correct

### Theme Adaptation

1. **Test card adapts to theme**: Card should adapt to light/dark theme
2. **Verify text readable in both themes**: Text should be readable in both themes

---

## 📊 Task 21: Progress Tracker Component

### Pre-Testing Setup

1. **Navigate to a page with progress tracker**: Go to a page that displays progress tracker

### Progress Display

1. **Verify progress tracker renders**: Tracker should be visible
2. **Verify progress bar displays**: Progress bar should be visible
3. **Verify percentage displayed correctly**: Percentage should be displayed correctly
4. **Verify progress updates**: Progress should update when actions occur

### Progress Updates

1. **Test progress increases**: Complete an action → Progress should increase
2. **Test progress decreases**: If applicable, progress should decrease
3. **Test progress reaches 100%**: When all items complete, progress should be 100%
4. **Test progress animation**: If exists, animation should work

### Visual States

1. **Verify progress bar color changes**: Color should change based on progress
2. **Verify progress bar fills correctly**: Bar should fill correctly
3. **Verify text updates**: Text should update with progress

### Theme Adaptation

1. **Test progress tracker adapts to theme**: Tracker should adapt to theme
2. **Verify colors readable in both themes**: Colors should be readable in both themes

---

## ✅ Final Verification Checklist

### For All Tasks

- [ ] All features work correctly
- [ ] No console errors
- [ ] All API calls succeed
- [ ] UI is responsive
- [ ] Edge cases handled
- [ ] Error handling works
- [ ] Theme toggle works
- [ ] Navigation works
- [ ] Forms validate correctly
- [ ] CRUD operations work
- [ ] Search/filter works
- [ ] Pagination works (if applicable)
- [ ] Stats display correctly (if applicable)

---

## 📝 Testing Notes

### Common Issues to Watch For

1. **Environment Variables**: Always use environment variables, never hardcoded values
2. **Network Errors**: Check Network tab for failed API calls
3. **Console Errors**: Check Console tab for JavaScript errors
4. **Theme Persistence**: Verify theme persists after reload
5. **Responsive Design**: Test on multiple viewport sizes
6. **Form Validation**: Test all required fields
7. **Error Handling**: Test error scenarios
8. **Loading States**: Verify loading indicators appear
9. **Empty States**: Test with no data
10. **Edge Cases**: Test boundary conditions

### Quick Reference Commands

```bash
# Start dev server
npm run dev

# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e:headed
```

---

**Last Updated**: 2025-01-27  
**Status**: Complete step-by-step testing guide  
**Total Steps**: 500+ individual testing steps across 21 tasks






