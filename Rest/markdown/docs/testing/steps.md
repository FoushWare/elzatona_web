Manual testing resources
Documentation

1.Manual Testing Workflow (Rest/markdown/docs/testing/MANUAL_TESTING_WORKFLOW.md)

- Step-by-step manual testing process
- Terminal setup for parallel testing
- Integration with automated tests

  2.Test Execution Guide (Rest/markdown/docs/testing/TEST_EXECUTION_GUIDE.md)

- How to run unit, integration, and E2E tests
- Task-specific commands
- Troubleshooting tips

  3.Quick Reference (Rest/markdown/docs/testing/QUICK_REFERENCE.md)

- Quick command lookup
- All test commands in one place

  4.Test Tasks (Rest/markdown/docs/testing/tasks/)

- 23 test tasks with manual steps
- Each task includes manual testing instructions

## Quick commands

```
# Start dev server
npm run dev

# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e

# Run E2E tests in headed mode (watch browser)
npm run test:e2e:headed

# Update snapshots (when UI changes)
npm run test:unit -- --updateSnapshot

# Admin Dashboard Tests (includes theme toggle tests)
npm run test:e2e:headed -- tests/e2e/admin/admin-dashboard.spec.ts

# Admin Login Tests
npm run test:e2e:headed -- tests/e2e/admin/admin-login.spec.ts

# Theme Toggle Tests (included in admin-dashboard.spec.ts)
# Tests cover:
# - Theme toggle button visibility
# - Icon display (Sun/Moon)
# - Theme switching (light ↔ dark)
# - Theme persistence after reload

# Shared Components Testing
# Run tests for shared components library
nx test shared-components

# Run tests in watch mode
nx test shared-components --watch

# Run tests with coverage
nx test shared-components --coverage

# Run specific component tests
nx test shared-components -- button.test.tsx
nx test shared-components -- input.test.tsx
nx test shared-components -- select.test.tsx

# Storybook for Shared Components
# Start Storybook development server
nx storybook shared-components

# Build Storybook for production
nx build-storybook shared-components
```

### When you find issues

1- Note what's not working or what needs adjustment
2- Tell me which test/task needs updating
3- I'll update the tests accordingly

## Test Coverage Summary

### Admin Dashboard Tests (Complete Coverage)

- ✅ Dashboard page load
- ✅ Dashboard statistics display
- ✅ Admin menu dropdown functionality
- ✅ Menu items visibility (Questions, Content Management, etc.)
- ✅ Navigation from menu to pages
- ✅ Refresh button functionality
- ✅ **Theme toggle button visibility**
- ✅ **Theme toggle icon display (Sun/Moon)**
- ✅ **Theme switching (light ↔ dark)**
- ✅ **Theme persistence after reload**

### Shared Components Library Tests (New)

- ✅ **Button Component** - Variants, sizes, interactions, disabled states
- ✅ **Input Component** - Types, validation, events, disabled states
- ✅ **Select Component** - Dropdown behavior, selection, disabled states
- ⏳ Dialog Component (to be added)
- ⏳ Checkbox Component (to be added)
- ⏳ Label Component (to be added)
- ⏳ Textarea Component (to be added)
- ⏳ Card Component (to be added)
- ⏳ Badge Component (to be added)
- ⏳ And more UI components...

### Storybook Coverage (New)

- ✅ **Button Stories** - All variants, sizes, with icons, disabled states
- ✅ **Input Stories** - Different types, with labels, validation states
- ✅ **Select Stories** - Basic, with labels, disabled, many options
- ⏳ Dialog Stories (to be added)
- ⏳ Checkbox Stories (to be added)
- ⏳ And more component stories...

### Theme Testing Checklist

When manually testing theme toggle:

1. **Button Visibility**: Check navbar for theme toggle button
2. **Icon Display**: Verify Sun icon in dark mode, Moon icon in light mode
3. **Theme Switching**: Click button and verify theme changes
4. **Visual Verification**: Check all UI elements adapt to theme
5. **Persistence**: Reload page and verify theme persists
6. **localStorage**: Check `localStorage.getItem('theme')` matches current theme

### Complete Test Flow Coverage

All E2E tests follow this pattern:

1. **beforeEach**: Login and navigate to page
2. **Test Actions**: Perform specific test actions
3. **Verification**: Verify expected behavior
4. **Cleanup**: Tests are isolated (no cleanup needed)

## Test task index

Check `Rest/markdown/docs/testing/tasks/TASK_INDEX.md` for all 23 tasks and their status.

## Shared Components Testing & Storybook

### Testing Shared Components

The shared components library (`libs/shared-components`) now has comprehensive testing setup:

**Test Files:**

- `libs/shared-components/src/lib/ui/button.test.tsx` - Button component tests
- `libs/shared-components/src/lib/ui/input.test.tsx` - Input component tests
- `libs/shared-components/src/lib/ui/select.test.tsx` - Select component tests

**Running Tests:**

```bash
# Run all shared components tests
nx test shared-components

# Run in watch mode
nx test shared-components --watch

# Run with coverage
nx test shared-components --coverage
```

### Storybook for Shared Components

Storybook is set up to visualize and interact with shared components:

**Stories:**

- `libs/shared-components/src/lib/ui/button.stories.tsx` - Button stories
- `libs/shared-components/src/lib/ui/input.stories.tsx` - Input stories
- `libs/shared-components/src/lib/ui/select.stories.tsx` - Select stories

**Running Storybook:**

```bash
# Start Storybook (port 4400)
nx storybook shared-components

# Build Storybook
nx build-storybook shared-components
```

**Documentation:**

- Setup guide: `libs/shared-components/SETUP.md`
- Testing summary: `libs/shared-components/TESTING_AND_STORYBOOK_SUMMARY.md`
- Library README: `libs/shared-components/README.md`

Ready to help update tests when needed. Share what you find during manual testing.
