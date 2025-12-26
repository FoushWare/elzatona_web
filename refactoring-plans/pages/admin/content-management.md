# Content Management Page Refactoring Plan

## Page Information

- **Route**: `/admin/content-management`
- **File**: `apps/website/page-components/admin/content-management/page.tsx`
- **Current Lines**: **3367** - EXTREMELY LARGE
- **Complexity**: Very High
- **Priority**: **CRITICAL** - Largest page, needs immediate attention

## Current State Analysis

### File Location

- **Source**: `apps/website/page-components/admin/content-management/page.tsx`
- **Wrapper**: `apps/website/src/app/admin/content-management/page.tsx`

### Current Implementation

- Monolithic component (3367 lines)
- Manages: Cards, Plans, Categories, Topics, Questions
- Uses TanStack Query for data fetching
- Complex state management
- Multiple forms and modals
- Search and filter functionality

### Current Issues

- **CRITICAL**: Extremely large file (3367 lines)
- Monolithic structure
- Mixed concerns (data + UI + business logic)
- Hard to maintain
- Hard to test
- Performance issues likely
- Security vulnerabilities possible

### Dependencies

- `@elzatona/components` - UI components
- `@elzatona/hooks` - Data fetching hooks
- `@elzatona/contexts` - Auth context
- `lucide-react` - Icons
- `react` - React hooks
- `sonner` - Toast notifications

### Existing Components (Partial)

- `StatsSection` - Already exists, needs enhancement
- `SearchAndFilters` - Already exists, needs enhancement
- `CategoriesList` - Already exists, needs enhancement
- `TopicsList` - Already exists, needs enhancement
- `ActionButtons` - Already exists, needs enhancement

## Refactoring Strategy

### Component Breakdown (Target: 15+ components)

#### Atoms (0/3)

- [ ] `SearchInput` - Search input field
- [ ] `FilterBadge` - Filter badge display
- [ ] `ActionIcon` - Action icon button

#### Molecules (0/8)

- [ ] `CategoryForm` - Category creation/editing form (enhance existing)
- [ ] `TopicForm` - Topic creation/editing form (enhance existing)
- [ ] `QuestionForm` - Question creation/editing form (enhance existing)
- [ ] `CardForm` - Learning card creation/editing form
- [ ] `PlanForm` - Learning plan creation/editing form
- [ ] `SearchAndFilters` - Search and filter controls (enhance existing)
- [ ] `ActionButtons` - Action button group (enhance existing)
- [ ] `ConfirmDeleteDialog` - Delete confirmation dialog

#### Organisms (0/6)

- [ ] `CategoriesList` - Categories list with CRUD (enhance existing)
- [ ] `TopicsList` - Topics list with CRUD (enhance existing)
- [ ] `QuestionsList` - Questions list with CRUD
- [ ] `CardsList` - Learning cards list with CRUD
- [ ] `PlansList` - Learning plans list with CRUD
- [ ] `StatsSection` - Statistics display (enhance existing)

#### Templates (0/1)

- [ ] `ContentManagementTemplate` - Page layout template

### Target Structure

```
ContentManagementPage (page, <300 lines)
├── ContentManagementTemplate
│   ├── StatsSection (organism)
│   ├── SearchAndFilters (molecule)
│   ├── ActionButtons (molecule)
│   ├── CategoriesList (organism)
│   ├── TopicsList (organism)
│   ├── QuestionsList (organism)
│   ├── CardsList (organism)
│   └── PlansList (organism)
```

### Component Extraction Plan

1. **Phase 1: Forms** (Week 1)
   - Extract `CategoryForm`
   - Extract `TopicForm`
   - Extract `QuestionForm`
   - Extract `CardForm`
   - Extract `PlanForm`

2. **Phase 2: Lists** (Week 2)
   - Extract `CategoriesList`
   - Extract `TopicsList`
   - Extract `QuestionsList`
   - Extract `CardsList`
   - Extract `PlansList`

3. **Phase 3: UI Components** (Week 3)
   - Extract `SearchAndFilters`
   - Extract `ActionButtons`
   - Extract `StatsSection`
   - Create `ContentManagementTemplate`

4. **Phase 4: Integration** (Week 4)
   - Integrate all components
   - Test thoroughly
   - Performance optimization

## Security Considerations

### Input Validation

- [ ] Validate all form inputs
- [ ] Sanitize category/topic/question data
- [ ] Validate file uploads (if any)
- [ ] Prevent SQL injection

### Output Encoding

- [ ] Sanitize all displayed content
- [ ] Prevent XSS in lists
- [ ] Secure modal content
- [ ] Encode URLs and links

### Authorization

- [ ] Verify admin role on all operations
- [ ] Check permissions for each action
- [ ] Audit log all changes
- [ ] Rate limit bulk operations

### Data Security

- [ ] Secure API calls
- [ ] Encrypt sensitive data
- [ ] No PII exposure
- [ ] Secure error messages

## Database Abstraction

### Current Database Usage

- Direct Supabase calls (via hooks)
- Multiple entity types (Cards, Plans, Categories, Topics, Questions)
- Complex queries
- Bulk operations

### Database Abstraction Points

- Create `ContentRepository` interface
- Create `CategoryRepository` interface
- Create `TopicRepository` interface
- Create `QuestionRepository` interface
- Create `CardRepository` interface
- Create `PlanRepository` interface

### Repository Interfaces

```typescript
interface CategoryRepository extends Repository<Category> {
  findByName(name: string): Promise<Category | null>;
  findByParent(parentId: string): Promise<readonly Category[]>;
}

interface TopicRepository extends Repository<Topic> {
  findByCategory(categoryId: string): Promise<readonly Topic[]>;
  findByName(name: string): Promise<Topic | null>;
}

interface QuestionRepository extends Repository<Question> {
  findByTopic(topicId: string): Promise<readonly Question[]>;
  findByCategory(categoryId: string): Promise<readonly Question[]>;
  search(query: string): Promise<readonly Question[]>;
  bulkCreate(
    questions: readonly CreateQuestionInput[],
  ): Promise<readonly Question[]>;
}
```

## Testing Strategy

### Unit Tests (Target: 90% coverage)

- [ ] All form components
- [ ] All list components
- [ ] All UI components
- [ ] All utility functions
- [ ] All hooks

### Integration Tests (Target: 80% coverage)

- [ ] CRUD operations for each entity
- [ ] Search functionality
- [ ] Filter functionality
- [ ] Bulk operations
- [ ] Error handling

### E2E Tests

- [ ] Complete content management flow
- [ ] Create category → topic → question flow
- [ ] Edit operations
- [ ] Delete operations
- [ ] Search and filter
- [ ] Bulk operations

### Performance Tests

- [ ] Large dataset handling (1000+ items)
- [ ] Search performance
- [ ] Filter performance
- [ ] Bulk operation performance

## Implementation Steps

### Step 1: Analysis Phase

- [ ] Run SonarQube analysis
- [ ] Run GitHub SAST scan
- [ ] Document all current issues
- [ ] Identify security hotspots
- [ ] Analyze performance bottlenecks

### Step 2: Component Extraction - Forms

- [ ] Extract `CategoryForm` (target: <150 lines)
- [ ] Extract `TopicForm` (target: <150 lines)
- [ ] Extract `QuestionForm` (target: <150 lines)
- [ ] Extract `CardForm` (target: <150 lines)
- [ ] Extract `PlanForm` (target: <150 lines)
- [ ] Write tests for each form

### Step 3: Component Extraction - Lists

- [ ] Extract `CategoriesList` (target: <200 lines)
- [ ] Extract `TopicsList` (target: <200 lines)
- [ ] Extract `QuestionsList` (target: <200 lines)
- [ ] Extract `CardsList` (target: <200 lines)
- [ ] Extract `PlansList` (target: <200 lines)
- [ ] Write tests for each list

### Step 4: Component Extraction - UI

- [ ] Enhance `SearchAndFilters` (target: <150 lines)
- [ ] Enhance `ActionButtons` (target: <100 lines)
- [ ] Enhance `StatsSection` (target: <150 lines)
- [ ] Create `ContentManagementTemplate` (target: <300 lines)
- [ ] Write tests for each component

### Step 5: Security Hardening

- [ ] Add input validation to all forms
- [ ] Add output sanitization to all displays
- [ ] Implement authorization checks
- [ ] Add audit logging
- [ ] Implement rate limiting
- [ ] Secure error handling

### Step 6: Database Abstraction

- [ ] Create repository interfaces
- [ ] Implement PostgreSQL adapters
- [ ] Update components to use repositories
- [ ] Test with multiple databases

### Step 7: Testing Implementation

- [ ] Write unit tests (90% coverage)
- [ ] Write integration tests (80% coverage)
- [ ] Write E2E tests
- [ ] Write performance tests
- [ ] Write security tests

### Step 8: Quality Gates

- [ ] SonarQube quality gate: PASS
- [ ] GitHub SAST: 0 critical issues
- [ ] Test coverage: ≥80%
- [ ] Performance benchmarks met
- [ ] Code review approved

## Success Metrics

- **Line Count Reduction**: Target 80%+ (3367 → <500)
- **Component Count**: 0 → 15+ components
- **SonarQube Score**: Improve to A rating
- **Security Vulnerabilities**: 0 critical, 0 high
- **Test Coverage**: ≥80% (target: 90%)
- **Performance**: Load time <2s, smooth interactions

## Manual Testing Checklist

### Functional Testing

- [ ] All forms work correctly
- [ ] All lists display correctly
- [ ] CRUD operations work
- [ ] Search works
- [ ] Filters work
- [ ] Bulk operations work
- [ ] Error handling works
- [ ] Loading states display

### Security Testing

- [ ] Admin auth required
- [ ] Input validation works
- [ ] Output sanitization works
- [ ] Authorization checks work
- [ ] Audit logging works
- [ ] Rate limiting works

### Performance Testing

- [ ] Page loads <2s
- [ ] Large lists render smoothly
- [ ] Search is responsive
- [ ] Filters are fast
- [ ] No memory leaks

## Automated Testing

### Test Files to Create

- `CategoryForm.test.tsx`
- `TopicForm.test.tsx`
- `QuestionForm.test.tsx`
- `CardForm.test.tsx`
- `PlanForm.test.tsx`
- `CategoriesList.test.tsx`
- `TopicsList.test.tsx`
- `QuestionsList.test.tsx`
- `CardsList.test.tsx`
- `PlansList.test.tsx`
- `SearchAndFilters.test.tsx`
- `ActionButtons.test.tsx`
- `StatsSection.test.tsx`
- `ContentManagement.test.tsx`
- `ContentManagement.integration.test.tsx`
- `ContentManagement.e2e.spec.tsx`

## Documentation Updates

- [ ] Update component library docs
- [ ] Update API documentation
- [ ] Update security documentation
- [ ] Update testing documentation
- [ ] Document repository interfaces

## Related Files

- `apps/website/page-components/admin/content-management/page.tsx` - Main component
- `apps/website/page-components/admin/content-management/components/` - Existing components
- `libs/hooks/src/lib/` - Data fetching hooks
- `apps/website/network/routes/admin/` - API routes

## Notes

- **CRITICAL PRIORITY**: This is the largest page
- Will require significant time investment
- Break into phases for manageable work
- Focus on one entity type at a time
- Test thoroughly after each phase
