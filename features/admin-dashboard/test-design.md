# Test Design: Admin Dashboard

## Testing Strategy

Confirm that the dashboard correctly aggregates data from various content repositories and handles missing or renamed tables gracefully.

## Automated Tests

### Unit Tests (Vitest)

- **`dashboard-stats/route.test.ts`**:
  - Verify that the API route correctly maps statistics to the expected keys.
  - Test error handling by mocking one repository to fail and checking the remaining statistics.
- **`PostgreSQLPlanRepository.test.ts`**: Verify that the `findAll` method uses the correct `plan_cards` table name.

### E2E Tests (Playwright)

- **`admin-dashboard.spec.ts`**:
  - Visit `/admin/dashboard` as an authenticated user.
  - Confirm all statistic cards are visible and contain non-negative numbers.
  - Verify that some specific data (e.g., if we previously added a test question) is reflected in the count.

## Manual Verification

1.  **Direct API Check**: Run `curl https://elzatona-admin.vercel.app/api/admin/dashboard-stats` and verify it returns `success: true` and the correct data structure.
2.  **Visual Verification**: Log into the admin panel and ensure no statistic card shows an error or NaN.
3.  **Cross-Check**: Compare the "Total Questions" on the dashboard with the result of a direct SQL count in the Supabase dashboard.
