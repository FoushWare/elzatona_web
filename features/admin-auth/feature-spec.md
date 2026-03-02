# Feature: Admin Authentication

## Overview

Secure authentication system for the Elzatona Admin app. It handles admin login, session management, and role-based access control (RBAC). The admin app is served under `/admin` and requires a separate authentication flow from the main website.

## User Flow

1. **Unauthenticated Access**: User attempts to visit `/admin` or any `/admin/*` route.
2. **Redirect to Login**: User is redirected to `/admin/login`.
3. **Login Attempt**: User enters credentials (email/password) specifically for an admin account.
4. **Authentication Check**:
   - System verifies credentials against the `admin_users` table.
   - System checks if the user has the `admin` or `super_admin` role.
5. **Success**:
   - A JWT is issued.
   - User is redirected to `/admin/dashboard`.
   - Session is persisted in `localStorage` for client-side state and cookies for API access.
6. **Failure**: Error message "Invalid email or password" is shown.
7. **Logout**: User clicks logout, session is cleared, and user is redirected to `/admin/login`.

## Key Files

- `apps/admin/src/app/api/admin/auth/route.ts`: Server-side authentication handler.
- `libs/contexts/src/lib/AdminAuthContext.tsx`: Client-side authentication provider and state management.
- `apps/admin/src/app/admin/login/page.tsx`: Admin login UI.
- `libs/database/src/adapters/postgresql/PostgreSQLUserRepository.ts`: Database interaction for admin lookups.

## API Endpoints

- `POST /api/admin/auth`: Authenticates admin user and returns session info.
- `POST /api/auth/logout`: (Shared or separate) Clears session.

## Test Scenarios

### Happy Path

1. **Successful Admin Login**: Valid `admin`/`super_admin` credentials redirect to `/admin/dashboard`.
2. **Session Persistence**: Refreshing `/admin/dashboard` does not redirect to login.
3. **Logout Flow**: Clicking logout clears session and redirects to `/admin/login`.

### Edge Cases

1. **Role Verification**: A regular user from the `users` table cannot log into the admin panel.
2. **Session Expiry**: User is prompted to log in again after session expires.
3. **Multi-Tab Session**: Logging out in one tab should eventually reflect in others (on refresh or action).

### Error States

1. **Invalid Credentials**: Incorrect email or password shows error.
2. **Inactive Account**: Admins with `isActive: false` cannot log in.
3. **Network Failure**: Graceful error handling if auth API is unreachable.
