# Test Design: Admin Authentication

## Testing Strategy

Focus on verifying secure login and persistent sessions to eliminate the "flicker" and "failed login" issues reported by users.

## Automated Tests

### Unit Tests (Vitest)

- **`AdminAuthContext.test.tsx`**: Verify `isLoading` state transitions and redirect logic triggers.
- **`auth/route.test.ts`**: Mock `PostgreSQLUserRepository.findAdminByEmail` to test success/failure response codes.

### E2E Tests (Playwright)

- **`admin-login.spec.ts`**:
  - Test login with valid admin credentials.
  - Test login with invalid credentials.
  - Test redirect from `/admin/dashboard` to `/admin/login` when unauthenticated.
  - Test page refresh on `/admin/dashboard` keeps user on the page (no flicker).

## Manual Verification

1.  **Login Verification**: Open `/admin/login`, enter credentials, and confirm redirect to `/admin/dashboard`.
2.  **Search Bar/Stats Verification**: Ensure dashboard stats load correctly (related to `admin-dashboard` feature).
3.  **Refresh Test**: While on `/admin/dashboard`, press CMD+R and verify the page doesn't show the login screen briefly.
4.  **Logout Test**: Click logout and verify redirect to `/admin/login`.
