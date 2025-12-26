# /admin/dashboard Refactoring Plan

## Current State Analysis

- Lines of code: 342
- Component complexity: High (8 components with 150+ LOC)
- Security vulnerabilities:
  - XSS risk in user input fields
  - Missing authZ checks
- Performance metrics:
  - Load time: 4.2s (needs improvement)
  - Largest Contentful Paint: 3.8s

## Refactoring Strategy

1. Component decomposition:
   - Split into atomic components:
     - Atoms: `DashboardCard`, `MetricBadge`, `DataTableHeader`
     - Molecules: `UserActivityCard`, `ResourceUtilizationChart`
     - Organisms: `RecentActivityFeed`, `SystemMetricsPanel`

2. Style normalization:
   - Create TW classes in `libs/shared-components`
   - Implement design tokens for:
     - Spacing: `@apply p-4 md:p-6`
     - Colors: `@apply bg-dashboard-card`
     - Typography: `@apply text-dashboard-heading`

3. Security hardening:
   - Implement DOMPurify for user content rendering
   - Add RBAC checks for sensitive data
   - Integrate GitHub SAST scans

4. Database abstraction:

   ```typescript
   interface DashboardRepository {
     getMetrics(): Promise&lt;DashboardMetrics>;
     getRecentActivity(): Promise&lt;ActivityItem[]>;
   }
   ```

5. SonarQube integration:
   - Add quality gates for:
     - Cognitive complexity < 15
     - Duplicated lines < 3%
     - Coverage > 80%

## Testing Requirements

```typescript
describe("AdminDashboard Refactoring", () => {
  test("Renders core functionality", async () => {
    // Test data fetching and rendering
  });

  test("Handles empty state", () => {
    // Test when no metrics data
  });

  test("Meets performance thresholds", () => {
    // Should load in < 2s
  });

  test("Enforces authZ rules", () => {
    // Verify non-admin access blocked
  });
});
```

## Success Metrics

| Metric                   | Target | Current | Status |
| ------------------------ | ------ | ------- | ------ |
| Component Complexity     | <15    | 22      | ❌     |
| Reusability Score        | >85%   | 60%     | ❌     |
| Security Vulnerabilities | 0      | 3       | ❌     |
| Test Coverage            | >80%   | 65%     | ❌     |
