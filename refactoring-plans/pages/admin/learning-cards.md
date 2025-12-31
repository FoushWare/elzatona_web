# Learning Cards Admin Page Refactoring Plan

## Page Information

- **Route**: `/admin/learning-cards`
- **File**: `apps/website/page-components/admin/learning-cards/page.tsx`
- **Current Lines**: ~554
- **Complexity**: Medium
- **Priority**: Medium

## Current State Analysis

### File Location

- **Source**: `apps/website/page-components/admin/learning-cards/page.tsx`
- **Wrapper**: `apps/website/src/app/admin/learning-cards/page.tsx`

### Current Implementation

- Learning card management (CRUD)
- Card editor
- Search and filtering

## Refactoring Strategy

### Component Breakdown (Target: 4 components)

#### Molecules (0/3)

- [ ] `LearningCardForm` - Card creation/editing form
- [ ] `CardEditor` - Card content editor
- [ ] `CardFilters` - Filter controls

#### Organisms (0/1)

- [ ] `LearningCardList` - Cards list with CRUD

## Security Considerations

- [ ] Validate card content
- [ ] Sanitize card data
- [ ] Secure card operations

## Database Abstraction

- [ ] Create `LearningCardRepository` interface
- [ ] Implement PostgreSQL adapter

## Testing Strategy

- [ ] Unit tests: 90% coverage
- [ ] Integration tests: 80% coverage
- [ ] E2E tests for card management flow

## Success Metrics

- **Line Count**: 554 → <250 lines
- **Components**: 0 → 4 components
- **Test Coverage**: ≥80%
- **SonarQube**: PASS

