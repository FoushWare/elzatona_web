# Feature: Admin – User Management

## Overview

The User Management section of the Admin panel gives administrators visibility into all registered users. Admins can view user details, manage roles, and take administrative actions (e.g., deactivate or reset accounts).

---

## User Flow

1. Admin navigates to `/admin/users`.
2. A table of all users is shown: email, display name, role, join date, last active.
3. Admins can search by email or name.
4. Admin clicks on a user to view their profile detail.
5. Detail view shows: profile info, enrolled learning paths, activity history.
6. Admin can **change the user's role** (e.g., promote to admin, demote to user).
7. Admin can **deactivate** an account (user is prevented from logging in).
8. Admin can **reset an invitation** or trigger a password reset email.

---

## Key Files

| File                              | Purpose                       |
| --------------------------------- | ----------------------------- |
| `apps/admin/src/app/admin/users/` | User management admin pages   |
| `apps/website/src/app/api/users/` | Website-side user API         |
| `apps/admin/src/app/api/`         | Admin-side user API routes    |
| `libs/auth/`                      | Auth utilities, role checking |
| `libs/types/`                     | `User`, `UserRole` types      |

---

## API Endpoints (Admin)

| Method | Route                            | Description                   |
| ------ | -------------------------------- | ----------------------------- |
| `GET`  | `/api/users`                     | List all users (admin only)   |
| `GET`  | `/api/users/[id]`                | Get a specific user's profile |
| `PUT`  | `/api/users/[id]/role`           | Update user's role            |
| `POST` | `/api/users/[id]/deactivate`     | Deactivate user account       |
| `POST` | `/api/users/[id]/reset-password` | Trigger password reset email  |

Full Swagger docs: `http://localhost:3001/api-docs` → Users section.

---

## Test Scenarios

### Happy Path

1. **User list loads** — Table shows all users with correct columns and pagination.
2. **Search** — Searching by email returns matching users.
3. **User detail view** — Clicking a user opens their detail with profile, paths, and history.
4. **Role change** — Promoting a user to admin saves and reflects in the user table.
5. **Deactivate account** — Confirmation shown; user cannot log in after deactivation.
6. **Password reset** — Triggering reset sends email and shows success confirmation.

### Edge Cases

7. **Deactivate your own admin account** — Blocked with an error (cannot self-deactivate).
8. **Last admin deactivation** — Blocked to prevent a lockout state.
9. **Empty search** — Clearing search returns full user list.
10. **Pagination** — Large user base renders paginated correctly; page navigation works.

### Error States

11. **Role update fails** — Error toast shown; role value reverts in UI.
12. **User not found** — Invalid user ID shows 404 in admin panel.
13. **Non-admin access** — Returns 403 or redirects to admin login.
