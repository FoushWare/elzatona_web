# Feature: Settings

## Overview

Settings allows users to manage their account preferences, update their profile information, change their password, and configure notification preferences. This ensures users have control over their experience on the platform.

---

## User Flow

1. User navigates to `/settings` (via navbar or profile menu).
2. Settings page is divided into sections: **Profile**, **Security**, **Preferences**.
3. **Profile**: Update display name, avatar, or bio. Click Save.
4. **Security**: Change password (requires current password + new password). Click Update.
5. **Preferences**: Toggle notification settings, choose default practice mode, set difficulty preference.
6. All saved changes are confirmed with a success toast.

---

## Key Files

| File                             | Purpose                                   |
| -------------------------------- | ----------------------------------------- |
| `apps/website/src/app/settings/` | Settings pages                            |
| `apps/website/src/app/api/`      | User-specific API routes (profile update) |
| `libs/auth/`                     | Password change utilities                 |
| `libs/contexts/`                 | Auth context (provides current user data) |
| `libs/types/`                    | `UserProfile`, `UserPreferences` types    |

---

## API Endpoints

| Method | Route                       | Description                |
| ------ | --------------------------- | -------------------------- |
| `GET`  | `/api/profile`              | Get current user profile   |
| `PUT`  | `/api/profile`              | Update user profile fields |
| `POST` | `/api/auth/change-password` | Change user's password     |

---

## Test Scenarios

### Happy Path

1. **Settings page loads** — All sections (Profile, Security, Preferences) render correctly.
2. **Profile update** — Changing display name and saving shows success toast.
3. **Password change** — Correct current password + valid new password updates successfully.
4. **Preference toggle** — Toggling notifications saves and persists across page reloads.
5. **Changes persist** — After saving, refreshing the page shows the updated values.

### Edge Cases

6. **No changes made** — Clicking Save without changing anything submits OK (idempotent).
7. **Empty display name** — Validation blocks saving an empty name.
8. **New password too short** — Password strength validation blocks weak passwords.
9. **Same new password as current** — Either blocked or accepted without error (depends on policy).

### Error States

10. **Wrong current password** — Shows "Current password is incorrect" error.
11. **Profile update API fails** — Error toast shown; displayed values revert to previous.
12. **Unauthenticated access** — Redirected to `/auth/login`.
