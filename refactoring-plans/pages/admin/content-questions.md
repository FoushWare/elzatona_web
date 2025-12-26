# Content Questions Page Refactoring Plan

## Page Information

- **Route**: `/admin/content/questions`
- **File**: `apps/website/page-components/admin/content/questions/page.tsx`
- **Current Lines**: **1496** - VERY LARGE
- **Complexity**: High
- **Priority**: **CRITICAL** - Second largest page

## Current State Analysis

### File Location

- **Source**: `apps/website/page-components/admin/content/questions/page.tsx`
- **Wrapper**: `apps/website/src/app/admin/content/questions/page.tsx`

### Current Implementation

- Large monolithic component (1496 lines)
- Question management (CRUD)
- Bulk upload functionality
- Search and filtering
- Pagination
- Question viewing/editing

### Current Issues

- **CRITICAL**: Very large file (1496 lines)
- Complex state management
- Mixed concerns
- Hard to maintain
- Performance issues likely

### Dependencies

- `@elzatona/components` - UI components
- `@elzatona/hooks` - Data fetching hooks
- React hooks (useState, useEffect, useMemo)
- Form handling
- File upload handling

### Existing Components (Partial)

- `QuestionForm` - Already exists, needs enhancement
- `ViewQuestionModal` - Already exists, needs enhancement
- `StatsCards` - Already exists
- `CategoriesOverview` - Already exists
- `FiltersCard` - Already exists
- `QuestionsList` - Already exists
- `PaginationControls` - Already exists

## Refactoring Strategy

### Component Breakdown (Target: 8+ components)

#### Atoms (0/2)

- [ ] `QuestionTypeBadge` - Badge for question type
- [ ] `DifficultyBadge` - Badge for difficulty level

#### Molecules (0/5)

- [ ] `QuestionForm` - Question creation/editing form (enhance existing)
- [ ] `QuestionFilters` - Filter controls
- [ ] `QuestionPagination` - Pagination controls (enhance existing)
- [ ] `QuestionStats` - Statistics display (enhance existing)
- [ ] `BulkUploadForm` - Bulk question upload form
- [ ] `ViewQuestionModal` - Question view modal (enhance existing)

#### Organisms (0/2)

- [ ] `QuestionList` - Questions list with CRUD (enhance existing)
- [ ] `QuestionManagementLayout` - Page layout

### Target Structure

```
QuestionManagementPage (page, <300 lines)
├── QuestionManagementLayout
│   ├── QuestionStats (molecule)
│   ├── QuestionFilters (molecule)
│   ├── BulkUploadForm (molecule)
│   ├── QuestionList (organism)
│   │   └── QuestionItem[] (molecule)
│   └── QuestionPagination (molecule)
```

## Security Considerations

### Input Validation

- [ ] Validate question content
- [ ] Validate question metadata
- [ ] Validate file uploads
- [ ] Sanitize question data

### Output Encoding

- [ ] Sanitize question display
- [ ] Prevent XSS in question content
- [ ] Secure modal content
- [ ] Encode question data

### Authorization

- [ ] Verify admin role
- [ ] Check permissions
- [ ] Audit log changes
- [ ] Rate limit bulk operations

### File Upload Security

- [ ] Validate file types
- [ ] Validate file sizes
- [ ] Scan for malware
- [ ] Secure file storage

## Database Abstraction

### Current Database Usage

- Question CRUD operations
- Bulk operations
- Search operations
- Filter operations

### Database Abstraction Points

- Create `QuestionRepository` interface
- Support multiple question types
- Support bulk operations
- Support search and filtering

### Repository Interface

```typescript
interface QuestionRepository extends Repository<Question> {
  findByCategory(categoryId: string): Promise<readonly Question[]>;
  findByTopic(topicId: string): Promise<readonly Question[]>;
  findByDifficulty(difficulty: Difficulty): Promise<readonly Question[]>;
  search(query: string): Promise<readonly Question[]>;
  bulkCreate(
    questions: readonly CreateQuestionInput[],
  ): Promise<readonly Question[]>;
  bulkUpdate(
    updates: readonly UpdateQuestionInput[],
  ): Promise<readonly Question[]>;
  bulkDelete(ids: readonly string[]): Promise<void>;
}
```

## Testing Strategy

### Unit Tests (Target: 90% coverage)

- [ ] `QuestionForm` component
- [ ] `QuestionFilters` component
- [ ] `QuestionPagination` component
- [ ] `QuestionStats` component
- [ ] `BulkUploadForm` component
- [ ] `ViewQuestionModal` component
- [ ] `QuestionList` component

### Integration Tests (Target: 80% coverage)

- [ ] Question CRUD operations
- [ ] Bulk upload
- [ ] Search functionality
- [ ] Filter functionality
- [ ] Pagination

### E2E Tests

- [ ] Complete question management flow
- [ ] Create question
- [ ] Edit question
- [ ] Delete question
- [ ] Bulk upload
- [ ] Search and filter

### Performance Tests

- [ ] Large question lists (1000+)
- [ ] Search performance
- [ ] Filter performance
- [ ] Bulk operation performance

## Implementation Steps

### Step 1: Analysis Phase

- [ ] Run SonarQube analysis
- [ ] Run GitHub SAST scan
- [ ] Document current issues
- [ ] Identify security hotspots

### Step 2: Component Extraction

- [ ] Enhance `QuestionForm` (target: <150 lines)
- [ ] Extract `QuestionFilters` (target: <150 lines)
- [ ] Enhance `QuestionPagination` (target: <100 lines)
- [ ] Enhance `QuestionStats` (target: <100 lines)
- [ ] Extract `BulkUploadForm` (target: <200 lines)
- [ ] Enhance `ViewQuestionModal` (target: <200 lines)
- [ ] Enhance `QuestionList` (target: <200 lines)
- [ ] Create `QuestionManagementLayout` (target: <300 lines)

### Step 3: Security Hardening

- [ ] Sanitize question content
- [ ] Validate question data
- [ ] Secure file uploads
- [ ] Rate limit bulk operations
- [ ] Add authorization checks

### Step 4: Database Abstraction

- [ ] Create `QuestionRepository` interface
- [ ] Implement PostgreSQL adapter
- [ ] Update components to use repository
- [ ] Test with multiple databases

### Step 5: Testing Implementation

- [ ] Write unit tests (90% coverage)
- [ ] Write integration tests (80% coverage)
- [ ] Write E2E tests
- [ ] Write performance tests

### Step 6: Quality Gates

- [ ] SonarQube quality gate: PASS
- [ ] GitHub SAST: 0 critical issues
- [ ] Test coverage: ≥80%
- [ ] Performance benchmarks met

## Success Metrics

- **Line Count Reduction**: Target 80%+ (1496 → <300)
- **Component Count**: 0 → 8 components
- **SonarQube Score**: Improve to A rating
- **Security Vulnerabilities**: 0 critical, 0 high
- **Test Coverage**: ≥80% (target: 90%)
- **Performance**: Load time <2s, smooth interactions

## Manual Testing Checklist

### Functional Testing

- [ ] Question form works
- [ ] Question list displays
- [ ] Search works
- [ ] Filters work
- [ ] Pagination works
- [ ] Bulk upload works
- [ ] View modal works
- [ ] CRUD operations work

### Security Testing

- [ ] Input validation works
- [ ] Output sanitization works
- [ ] File upload security works
- [ ] Authorization checks work
- [ ] Rate limiting works

### Performance Testing

- [ ] Page loads <2s
- [ ] Large lists render smoothly
- [ ] Search is responsive
- [ ] Bulk operations are fast

## Automated Testing

### Test Files to Create

- `QuestionForm.test.tsx`
- `QuestionFilters.test.tsx`
- `QuestionPagination.test.tsx`
- `QuestionStats.test.tsx`
- `BulkUploadForm.test.tsx`
- `ViewQuestionModal.test.tsx`
- `QuestionList.test.tsx`
- `QuestionManagement.test.tsx`
- `QuestionManagement.integration.test.tsx`
- `QuestionManagement.e2e.spec.tsx`

## Documentation Updates

- [ ] Update component library docs
- [ ] Update API documentation
- [ ] Update security documentation
- [ ] Update testing documentation

## Related Files

- `apps/website/page-components/admin/content/questions/page.tsx` - Main component
- `apps/website/page-components/admin/content/questions/components/` - Existing components
- `libs/hooks/src/lib/` - Data fetching hooks
- `apps/website/network/routes/admin/content/questions/` - API routes

## Notes

- **CRITICAL PRIORITY**: Second largest page
- Many components already exist (good starting point)
- Focus on enhancing existing components
- Pay special attention to bulk operations
- Test thoroughly with large datasets
