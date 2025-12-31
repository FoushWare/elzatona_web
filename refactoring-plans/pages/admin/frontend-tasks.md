# Frontend Tasks Admin Page Refactoring Plan

## Page Information

- **Route**: `/admin/frontend-tasks`
- **File**: `apps/website/page-components/admin/frontend-tasks/page.tsx`
- **Current Lines**: ~940
- **Complexity**: Medium-High
- **Priority**: High

## Current State Analysis

### File Location

- **Source**: `apps/website/page-components/admin/frontend-tasks/page.tsx`
- **Wrapper**: `apps/website/src/app/admin/frontend-tasks/page.tsx`

### Current Implementation

- Frontend task management (CRUD)
- Task editor integration
- Search and filtering
- Task list display

### Current Issues

- Large file (940 lines)
- Complex state management
- Mixed concerns

### Dependencies

- `@elzatona/common-ui` - UI components, FrontendTaskEditor
- `@elzatona/hooks` - Data fetching hooks
- React hooks

## Refactoring Strategy

### Component Breakdown (Target: 5 components)

#### Molecules (0/3)

- [ ] `FrontendTaskForm` - Task creation/editing form
- [ ] `TaskFilters` - Filter controls
- [ ] `TaskStats` - Statistics display

#### Organisms (0/2)

- [ ] `FrontendTaskList` - Tasks list with CRUD
- [ ] `FrontendTaskEditor` - Task editor (enhance existing)

## Security Considerations

- [ ] Sanitize code editor content
- [ ] Validate task requirements
- [ ] Secure code execution (sandbox)
- [ ] Rate limiting

## Database Abstraction

- [ ] Create `FrontendTaskRepository` interface
- [ ] Implement PostgreSQL adapter
- [ ] Support multiple databases

## Testing Strategy

- [ ] Unit tests: 90% coverage
- [ ] Integration tests: 80% coverage
- [ ] E2E tests for task management flow

## Success Metrics

- **Line Count**: 940 → <300 lines
- **Components**: 0 → 5 components
- **Test Coverage**: ≥80%
- **SonarQube**: PASS

