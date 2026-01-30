# Feature Specification: Admin App Separation

**Feature Branch**: `005-admin-app-separation`  
**Created**: 2026-01-30  
**Status**: Draft  
**Input**: User description: "Separate admin routes from website app into dedicated admin app. Migrate all routes under apps/website/src/app/admin/ to apps/admin/, remove duplicates, and ensure clean architecture separation between public website and admin functionality."

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Admin Accesses All Features from Admin App (Priority: P1)

As an administrator, I want to access all admin functionality exclusively through the admin app (port 3001) so that I have a dedicated, secure environment for administrative tasks without mixing with public user content.

**Why this priority**: This is the core goal of the separation - ensuring admins have a single point of entry for all administrative work. Without this, the separation provides no value.

**Independent Test**: Can be fully tested by logging into the admin app and navigating to every admin feature (dashboard, content management, users, logs, learning cards, questions, frontend tasks, problem solving). Success is verified when all pages load correctly and function as expected.

**Acceptance Scenarios**:

1. **Given** the admin app is running on port 3001, **When** an admin navigates to `/admin/dashboard`, **Then** they see the admin dashboard with statistics
2. **Given** the admin app is running, **When** an admin navigates to `/admin/users`, **Then** they can view and manage user accounts
3. **Given** the admin app is running, **When** an admin navigates to `/admin/logs`, **Then** they can view activity logs
4. **Given** the admin app is running, **When** an admin navigates to `/admin/questions`, **Then** they can manage questions (or are redirected to `/admin/content/questions`)
5. **Given** the admin app is running, **When** an admin navigates to any admin route, **Then** authentication is required before accessing the page

---

### User Story 2 - Website App Has No Admin Routes (Priority: P1)

As a developer, I want the website app to have zero admin routes so that the codebase is clean, bundle sizes are reduced, and there's no risk of accidentally exposing admin functionality to public users.

**Why this priority**: Equally critical as US1 - the separation is only complete when admin routes are fully removed from the website app. This eliminates technical debt and security risks.

**Independent Test**: Can be tested by attempting to access any `/admin/*` route on the website app (port 3000) and verifying a 404 or redirect response.

**Acceptance Scenarios**:

1. **Given** the website app is running on port 3000, **When** a user navigates to `/admin/dashboard`, **Then** they receive a 404 error or redirect
2. **Given** the website app is running, **When** a user navigates to `/admin/login`, **Then** they receive a 404 error or redirect to the admin app
3. **Given** both apps are built, **When** checking the website app bundle, **Then** no admin-specific components are included
4. **Given** the `apps/website/src/app/admin/` directory, **When** checking its contents, **Then** the directory either doesn't exist or only contains a redirect

---

### User Story 3 - Builds Pass for Both Apps (Priority: P2)

As a developer, I want both the admin and website apps to build successfully after the migration so that CI/CD pipelines pass and deployments work correctly.

**Why this priority**: Without passing builds, no deployment is possible. This is a technical gate that must be cleared.

**Independent Test**: Run `pnpm nx run admin:build` and `pnpm nx run website:build` - both must complete without errors.

**Acceptance Scenarios**:

1. **Given** the migration is complete, **When** running `pnpm nx run admin:build`, **Then** the build completes successfully with no TypeScript or import errors
2. **Given** the migration is complete, **When** running `pnpm nx run website:build`, **Then** the build completes successfully with no TypeScript or import errors
3. **Given** the migration is complete, **When** running `pnpm nx run-many --target=build --all`, **Then** all projects build successfully

---

### User Story 4 - No Functionality Loss After Migration (Priority: P2)

As an administrator, I want all existing admin functionality to work exactly as before so that my daily workflows are not disrupted by the migration.

**Why this priority**: Feature parity ensures users don't lose capabilities. Lower than P1/P2 because it depends on them being complete first.

**Independent Test**: Execute the existing E2E test suite and verify all admin-related tests pass. Additionally, perform manual smoke testing of each admin feature.

**Acceptance Scenarios**:

1. **Given** the migration is complete, **When** an admin creates a new question, **Then** the question is saved successfully
2. **Given** the migration is complete, **When** an admin updates user permissions, **Then** the changes are persisted
3. **Given** the migration is complete, **When** an admin views activity logs, **Then** all logs are displayed correctly
4. **Given** the migration is complete, **When** an admin manages learning cards, **Then** CRUD operations work as expected

---

### Edge Cases

- **Broken Imports**: What happens when a migrated file has local imports that don't exist in the admin app? Must be detected by TypeScript and fixed before merge.
- **Missing API Routes**: What if an admin page depends on an API route that only exists in the website app? API routes must also be migrated or shared.
- **Authentication Session Sharing**: What happens when a user is logged into the website and tries to access admin? Sessions should be independent (same JWT secret but separate session management).
- **Redirect Loops**: What if website redirects to admin which redirects back? Must be tested to prevent infinite loops.
- **Large File Detection**: Files >100KB should be flagged for review before migration.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: Admin app MUST contain all admin routes currently in `apps/website/src/app/admin/`
- **FR-002**: Website app MUST NOT contain any admin routes after migration
- **FR-003**: Admin app MUST expose routes at `/admin/*` path (maintaining current URL structure)
- **FR-004**: All admin routes MUST require authentication before access
- **FR-005**: Admin app MUST run on port 3001 in development mode
- **FR-006**: Website app MAY provide redirects from old admin URLs to the admin app
- **FR-007**: All shared UI components MUST remain in `libs/common-ui` (not duplicated)
- **FR-008**: All shared types MUST remain in `libs/types` (not duplicated)
- **FR-009**: Database access MUST use the shared repository pattern from `libs/database`
- **FR-010**: Admin-only API routes MUST be migrated to or duplicated in the admin app

### Key Entities

- **Admin Route**: A Next.js page or API route that provides administrative functionality (user management, content management, logs, etc.)
- **Shared Component**: A React component in `libs/common-ui` used by both apps
- **Repository**: A database access pattern in `libs/database` that abstracts Supabase operations
- **Admin User**: A user with elevated permissions who can access the admin app

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: 100% of admin routes are accessible from the admin app
- **SC-002**: 0 admin routes remain in the website app (excluding optional redirects)
- **SC-003**: Both `pnpm nx run admin:build` and `pnpm nx run website:build` complete with exit code 0
- **SC-004**: All existing E2E tests pass after migration
- **SC-005**: No increase in total lines of code (LOC) greater than 5% (indicating no significant duplication)
- **SC-006**: TypeScript strict mode remains enabled with 0 errors
- **SC-007**: SonarQube quality gate passes with no new code smells or security issues
- **SC-008**: Website app bundle size decreases by at least 10KB (admin code removed)

## Assumptions

- JWT_SECRET environment variable is shared between both apps for session validation
- Supabase credentials are shared between both apps for database access
- Shared libraries (`libs/*`) can be imported by both apps without changes
- Current admin routes follow Next.js App Router conventions
- No admin-specific CSS or assets need special handling

## Out of Scope

- Deployment configuration changes (separate Vercel projects, DNS setup)
- Authentication system redesign (using existing JWT-based auth)
- Database schema changes
- New admin features (focus is migration only)
- Mobile responsiveness improvements
- Performance optimization beyond bundle size reduction

---

## Route Inventory

### Routes to Migrate (Website → Admin)

| Route               | Status          | Notes                                                |
| ------------------- | --------------- | ---------------------------------------------------- |
| `/admin/logs/`      | NEEDS MIGRATION | Not in admin app                                     |
| `/admin/questions/` | NEEDS MIGRATION | Not in admin app (may redirect to content/questions) |
| `/admin/users/`     | NEEDS MIGRATION | Not in admin app                                     |

### Duplicate Routes (Verify & Delete from Website)

| Route                        | Website | Admin | Action                            |
| ---------------------------- | ------- | ----- | --------------------------------- |
| `/admin/content/`            | ✓       | ✓     | Verify admin, delete from website |
| `/admin/content-management/` | ✓       | ✓     | Verify admin, delete from website |
| `/admin/frontend-tasks/`     | ✓       | ✓     | Verify admin, delete from website |
| `/admin/learning-cards/`     | ✓       | ✓     | Verify admin, delete from website |
| `/admin/login/`              | ✓       | ✓     | Verify admin, delete from website |
| `/admin/problem-solving/`    | ✓       | ✓     | Verify admin, delete from website |

### Routes Only in Admin (Already Migrated)

| Route               | Notes                            |
| ------------------- | -------------------------------- |
| `/admin/dashboard/` | Already exists only in admin app |

---

For any changes to the spec, update this file and rerun `/speckit.analyze` to validate coverage and constitution alignment.
