# Test Implementation Guide

## Overview

This guide explains how to implement tests using the Task Master tasks created from the test task specifications in `Rest/markdown/docs/testing/tasks/`.

## Getting Started

### 1. Switch to Testing Tag

All test implementation tasks are in the `testing` tag. Switch to this tag:

```bash
npx task-master-ai use-tag testing
```

Or in Cursor AI chat:
```
Switch to the testing tag
```

### 2. View All Test Tasks

List all test implementation tasks:

```bash
npx task-master-ai list --tag testing
```

Or in Cursor AI chat:
```
Show me all testing tasks
```

### 3. Find Next Task to Work On

Get the next task to implement:

```bash
npx task-master-ai next --tag testing
```

Or in Cursor AI chat:
```
What's the next testing task I should work on?
```

### 4. View Specific Task Details

View details of a specific task:

```bash
npx task-master-ai show <task-id> --tag testing
```

Or in Cursor AI chat:
```
Show me task 1 from the testing tag
```

## Implementation Workflow

### For Each Test Task:

1. **View the Task**
   - Use `task-master show <id>` to see full details
   - Review the test task file referenced in the details
   - Understand what needs to be tested

2. **Perform Manual Testing**
   - Follow the manual testing steps in the test task file
   - Document any issues or edge cases found
   - Verify the feature works as expected

3. **Implement Automated Tests**
   - Create unit tests as specified
   - Create integration tests as specified
   - Create E2E tests as specified
   - Ensure all tests pass

4. **Update Task Status**
   - Mark subtask as in-progress when starting
   - Update subtask with findings during implementation
   - Mark task as done when all tests are implemented and passing

5. **Update Test Task File**
   - Update test status in the test task file (e.g., `Rest/markdown/docs/testing/tasks/guided-flow/G-001-homepage-rendering.md`)
   - Change test status from "⏳ Pending" to "✅ Implemented"
   - Update TASK_INDEX.md if needed

## Task Organization

Tasks are organized by flow type:

- **Guided Flow** (2 tasks): G-001, G-002
- **Freestyle Flow** (9 tasks): F-001 through F-009
- **Admin** (7 tasks): A-001 through A-007
- **Shared Components** (3 tasks): S-001 through S-003

**Total: 21 tasks** (9 more pending tasks will be added when their test task files are created)

## Recommended Order

Start with simpler tasks and work your way up:

1. **Start with Guided Flow** (simplest)
   - G-001: Homepage Rendering (low priority)
   - G-002: Get Started Page (medium priority)

2. **Then Shared Components** (reusable components)
   - S-001: Navigation Component (medium priority)
   - S-002: Question Card Component (medium priority)
   - S-003: Progress Tracker Component (medium priority)

3. **Then Freestyle Flow** (user-facing features)
   - F-001 through F-009 (various priorities)

4. **Finally Admin** (most complex)
   - A-001 through A-007 (mostly high priority)

## Task Details

Each task includes:

- **Title**: What test to implement
- **Description**: Brief overview
- **Details**: Full test specifications from the test task file
  - Time estimations
  - Manual testing steps
  - Test execution commands
- **Test Strategy**: Automated test specifications
  - Unit test requirements
  - Integration test requirements
  - E2E test requirements

## Commands Reference

### View Tasks
```bash
# List all tasks
npx task-master-ai list --tag testing

# Show next task
npx task-master-ai next --tag testing

# Show specific task
npx task-master-ai show <id> --tag testing
```

### Update Tasks
```bash
# Mark task as in-progress
npx task-master-ai set-status --id=<id> --status=in-progress --tag testing

# Mark task as done
npx task-master-ai set-status --id=<id> --status=done --tag testing

# Update task with findings
npx task-master-ai update-subtask --id=<id> --prompt="<findings>" --tag testing
```

### Expand Tasks
```bash
# Break down complex task into subtasks
npx task-master-ai expand --id=<id> --tag testing
```

## Test File Locations

When implementing tests, create them in:

- **Unit Tests**: 
  - `apps/website/src/**/*.test.tsx`
  - `libs/**/*.test.tsx`

- **Integration Tests**: 
  - `apps/website/src/**/*.integration.test.tsx`
  - `libs/**/*.integration.test.tsx`

- **E2E Tests**: 
  - `tests/e2e/**/*.spec.ts`

## Running Tests

```bash
# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e

# Run specific test file
npm run test:unit -- path/to/test.file
```

## Progress Tracking

- Update task status in Task Master as you complete work
- Update test task files with implementation status
- Update TASK_INDEX.md when tasks are complete
- All tests should pass before marking task as done

## Next Steps

1. Switch to testing tag: `npx task-master-ai use-tag testing`
2. View next task: `npx task-master-ai next --tag testing`
3. Start implementing tests following the task details
4. Update task status as you progress

Good luck with your test implementation! 🚀

