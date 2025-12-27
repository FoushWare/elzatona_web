# Admin Dashboard Refactoring Plan

## Page Information

- **Route**: `/admin/dashboard`
- **File**: `apps/website/src/app/admin/dashboard/page.tsx`
- **Current Lines**: 172 (refactored from 380)
- **Complexity**: Medium
- **Priority**: High

## Current State Analysis

### File Location

- **Page**: `apps/website/src/app/admin/dashboard/page.tsx`
- **Test**: `apps/website/src/app/admin/dashboard/page.test.tsx`

### Current Implementation

- Uses `useAdminAuth` hook
- Uses `useAdminStats` hook (TanStack Query)
- Displays stats cards
- Quick actions section
- System health section

### Current Issues

- Monolithic component
- Mixed concerns (data fetching + UI)
- No component extraction
- Limited error handling

### Dependencies

- `@elzatona/contexts` - AdminAuthProvider, useAdminAuth
- `@elzatona/hooks` - useAdminStats
- `@elzatona/components` - Various UI components
- `lucide-react` - Icons

## Refactoring Strategy

### Component Breakdown (Target: 5 components)

#### Atoms (0/2)

- [ ] `MetricBadge` - Display metric with icon and value
- [ ] `RefreshButton` - Refresh button with loading state

#### Molecules (0/2)

- [ ] `MetricCard` - Card displaying a single metric
- [ ] `QuickActionButton` - Button for quick actions

#### Organisms (0/3)

- [ ] `StatsGrid` - Grid of metric cards
- [ ] `QuickActionsSection` - Section with quick action buttons
- [ ] `SystemHealthSection` - System health display

#### Templates (0/1)

- [ ] `AdminDashboardTemplate` - Page layout template

### Target Structure

```
AdminDashboard (page, <200 lines)
├── AdminDashboardTemplate
│   ├── WelcomeHeader (molecule)
│   ├── StatsGrid (organism)
│   │   └── MetricCard[] (molecule)
│   ├── QuickActionsSection (organism)
│   │   └── QuickActionButton[] (molecule)
│   └── SystemHealthSection (organism)
```

## Security Considerations

### Authentication

- [ ] Verify admin auth on all data fetches
- [ ] Ensure proper session management
- [ ] Add auth error handling

### Authorization

- [ ] Verify admin role checks
- [ ] Ensure stats are admin-only
- [ ] Add rate limiting for stats refresh

### Data Security

- [ ] Sanitize stats display
- [ ] No sensitive data exposure
- [ ] Secure API calls

## Database Abstraction

### Current Database Usage

- Uses `useAdminStats` hook
- Fetches from API routes
- No direct database calls

### Database Abstraction Points

- Create `AdminStatsRepository` interface
- Implement PostgreSQL adapter
- Support MongoDB adapter
- Support MySQL adapter

### Repository Interface

```typescript
interface AdminStatsRepository {
  getDashboardStats(): Promise<DashboardStats>;
  refreshStats(): Promise<DashboardStats>;
}
```

## Testing Strategy

### Unit Tests (Target: 90% coverage)

- [ ] `MetricCard` component
- [ ] `QuickActionButton` component
- [ ] `StatsGrid` component
- [ ] `QuickActionsSection` component
- [ ] `SystemHealthSection` component
- [ ] `AdminDashboardTemplate` component

### Integration Tests (Target: 80% coverage)

- [ ] Stats fetching
- [ ] Refresh functionality
- [ ] Error handling
- [ ] Loading states

### E2E Tests

- [ ] Dashboard load
- [ ] Stats display
- [ ] Quick actions navigation
- [ ] Refresh functionality
- [ ] Error scenarios

## Implementation Steps

### Step 1: Analysis Phase

- [ ] Run SonarQube analysis
- [ ] Run GitHub SAST scan
- [ ] Document current issues
- [ ] Identify security hotspots

### Step 2: Component Extraction

- [ ] Extract `MetricBadge` atom
- [ ] Extract `RefreshButton` atom
- [ ] Extract `MetricCard` molecule
- [ ] Extract `QuickActionButton` molecule
- [ ] Extract `StatsGrid` organism
- [ ] Extract `QuickActionsSection` organism
- [ ] Extract `SystemHealthSection` organism
- [ ] Create `AdminDashboardTemplate` template

### Step 3: Security Hardening

- [ ] Add input validation
- [ ] Add output sanitization
- [ ] Implement rate limiting
- [ ] Add auth checks
- [ ] Secure error handling

### Step 4: Database Abstraction

- [ ] Create `AdminStatsRepository` interface
- [ ] Implement PostgreSQL adapter
- [ ] Update hooks to use repository
- [ ] Test with multiple databases

### Step 5: Testing Implementation

- [ ] Write unit tests (90% coverage)
- [ ] Write integration tests (80% coverage)
- [ ] Write E2E tests
- [ ] Write security tests

### Step 6: Quality Gates

- [ ] SonarQube quality gate: PASS
- [ ] GitHub SAST: 0 critical issues
- [ ] Test coverage: ≥80%
- [ ] Performance benchmarks met

## Success Metrics

- **Line Count Reduction**: ✅ Achieved 55% (380 → 172 lines)
- **Component Count**: ✅ Created 4 components (AdminMetricCard, AdminStatsGrid, AdminQuickActionsSection, AdminDashboardTemplate)
- **SonarQube Score**: Improve to A rating
- **Security Vulnerabilities**: 0 critical, 0 high
- **Test Coverage**: ≥80% (target: 90%)
- **Performance**: Load time <2s

## Manual Testing Checklist

### Functional Testing

- [ ] Dashboard loads correctly
- [ ] Stats display correctly
- [ ] Quick actions work
- [ ] Refresh button works
- [ ] System health displays
- [ ] Error states display correctly
- [ ] Loading states display correctly

### Security Testing

- [ ] Admin auth required
- [ ] Non-admin users redirected
- [ ] Stats are admin-only
- [ ] No sensitive data exposed
- [ ] Rate limiting works

### Performance Testing

- [ ] Page loads <2s
- [ ] Stats fetch <500ms
- [ ] No memory leaks
- [ ] Smooth interactions

## Automated Testing

### Test Files Created ✅

- `@elzatona/components` → `components/molecules/AdminMetricCard.test.tsx` ✅
- `@elzatona/components` → `components/organisms/AdminStatsGrid.test.tsx` ✅
- `@elzatona/components` → `components/organisms/AdminQuickActionsSection.test.tsx` ✅
- `@elzatona/components` → `components/templates/AdminDashboardTemplate.test.tsx` ✅
- `apps/website/src/app/admin/dashboard/page.test.tsx` ✅ (updated for refactored version)

**Note:** File paths use package aliases for clarity. See [FILE_PATH_CONVENTIONS.md](../FILE_PATH_CONVENTIONS.md) for the mapping. The `lib/` folder in the physical structure is an implementation detail.

## Documentation Updates

- [ ] Update component library docs
- [ ] Update API documentation
- [ ] Update security documentation
- [ ] Update testing documentation

## Related Files

- `apps/website/src/app/admin/dashboard/page.tsx` - Main page component (172 lines)
- `apps/website/src/app/admin/dashboard/page.test.tsx` - Page unit tests
- `@elzatona/components` → `components/molecules/AdminMetricCard.tsx` - Metric card molecule
- `@elzatona/components` → `components/organisms/AdminStatsGrid.tsx` - Stats grid organism
- `@elzatona/components` → `components/organisms/AdminQuickActionsSection.tsx` - Quick actions organism
- `@elzatona/components` → `components/templates/AdminDashboardTemplate.tsx` - Dashboard template
- `@elzatona/hooks` → `useAdminStats.ts` - Stats hook
- `@elzatona/contexts` → `AdminAuthProvider.tsx` - Auth provider

**Note:** See [FILE_PATH_CONVENTIONS.md](../FILE_PATH_CONVENTIONS.md) for path format explanation. The `lib/` folder in the physical structure is an implementation detail.

## Notes

- ✅ Already uses TanStack Query (good)
- ✅ Already uses hooks (good)
- ✅ Component extraction completed (4 new components created)
- ✅ Page refactored from 380 to 172 lines (55% reduction)
- ✅ Comprehensive unit tests added
- ⏳ Security hardening (admin auth already handled by AdminLayout)
- ⏳ Database abstraction (using hooks, no direct DB calls)
