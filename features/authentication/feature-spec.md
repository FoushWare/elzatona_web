# Feature: Authentication

## Overview

Handles user login, logout, and session management for the Elzatona website. Authentication is powered by **Supabase Auth** (email/password). An authenticated session is required to access practice features, dashboards, and personalized data.

---

## User Flow

1. User navigates to `/auth/login` (or is redirected there from a protected route).
2. User enters email and password and submits the form.
3. On success, session cookie is set and user is redirected to `/dashboard`.
4. On failure, an inline error message is shown.
5. User can log out from any page via the navbar, which clears the session and redirects to `/`.
6. Unauthenticated users who attempt to access protected routes are redirected to `/auth/login`.

---

## Key Files

| File                             | Purpose                                            |
| -------------------------------- | -------------------------------------------------- |
| `apps/website/src/app/auth/`     | Auth pages (login, logout)                         |
| `apps/website/middleware.ts`     | Route protection – redirects unauthenticated users |
| `libs/auth/`                     | Supabase auth client helpers                       |
| `libs/contexts/`                 | `AuthProvider` – provides session state to the app |
| `apps/website/src/app/api/auth/` | Auth-related API routes (logout, session)          |

---

## API Endpoints

| Method | Route               | Description                  |
| ------ | ------------------- | ---------------------------- |
| `POST` | `/api/auth/logout`  | Clears session and signs out |
| `GET`  | `/api/auth/session` | Returns current session info |

Full Swagger docs: `http://localhost:3000/api-docs` → Authentication section.

---

## Test Scenarios

### Happy Path

1. **Successful login** — Valid email + password redirects to `/dashboard` and sets session cookie.
2. **Persistent session** — Refreshing the page after login keeps the user authenticated.
3. **Successful logout** — Clicking logout clears the session and redirects to `/`.
4. **Protected route redirect** — Visiting `/dashboard` while logged out redirects to `/auth/login`.
5. **Post-login redirect** — After logging in, user is sent to the originally requested protected URL.

### Edge Cases

6. **Empty form submission** — Form validation prevents submission and shows required-field errors.
7. **Very long email/password** — Input capped gracefully, no server crash.
8. **Session expiry** — Expired session mid-session redirects to login without crashing.

### Error States

9. **Wrong password** — Shows "Invalid credentials" error, does not leak which field is wrong.
10. **Non-existent email** — Shows same generic "Invalid credentials" error (security: no user enumeration).
11. **Network error during login** — Shows a user-friendly error toast, form remains interactive.
12. **Supabase service unavailable** — Graceful degradation with error message, no uncaught exceptions.
