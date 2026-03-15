# TDD: Admin Authentication

## Architecture

The Admin Authentication system uses a hybrid approach:

- **Server-side Auth**: `POST /api/admin/auth` handles credential verification, role-based filtering, and JWT generation (if used) or session creation.
- **Client-side State**: `AdminAuthProvider` manages the `isAuthenticated`, `user`, and `isLoading` states. It also handles persistsing the session in `localStorage` for quick recovery on refresh.

## Data Schema

### `admin_users` table:

| Column        | Type    | Description              |
| ------------- | ------- | ------------------------ |
| id            | uuid    | Primary Key              |
| email         | string  | Unique email             |
| password_hash | string  | Hashed password (bcrypt) |
| role          | string  | `admin` or `super_admin` |
| is_active     | boolean | Account status           |

## Logic Details

1. **Password Verification**: Uses `bcryptjs` to compare provided password with `password_hash`.
2. **Role Filtering**: In the `PostgreSQLUserRepository.findAdminByEmail` method, the query should specifically target the `admin_users` table and check for authorized roles.
3. **Session Hydration**: On client-side mount, `AdminAuthProvider` checks for a session in `localStorage` first, then validates it against the server if necessary.

## Edge Case Handling

- **Database Connection Failure**: Auth API returns a 500 status with a generic error message.
- **Unauthorized Bypass Attempt**: Middleware (on the website app proxying `/admin`) and client-side guards in the provider ensure protected routes remain inaccessible.
