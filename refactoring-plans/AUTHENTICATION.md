# Authentication Page Refactoring Plan

## Current State Analysis

### File Information

- **Location**: `/apps/website/src/app/auth/page.tsx`
- **Callback Page**: `/apps/website/src/app/auth/callback/page.tsx`
- **Size**: 10 lines each (placeholder)
- **Status**: Planned (stub only)

### Related Auth Infrastructure

- **API Routes**:
  - `/apps/website/src/app/api/auth/route.ts` → `/apps/website/src/app/lib/network/routes/auth/route.ts`
  - `/apps/website/src/app/api/auth/[...nextauth]/route.ts`
  - `/apps/website/src/app/api/auth/session/route.ts`
- **Auth Configuration**: `/apps/website/src/app/lib/auth-config.ts`
- **Auth Helpers**: `/apps/website/src/app/lib/auth-utils.ts`, `auth-session.ts`, `server-auth.ts`
- **Auth Library**: `/libs/auth/src/lib/auth.tsx`
- **Existing UI Components** (Auth):
  - `/libs/components/src/lib/auth/SignInPopup.tsx`
  - `/libs/components/src/lib/auth/SignInGuidance.tsx`
  - `/libs/components/src/lib/auth/ProtectedRoute.tsx`
  - `/libs/components/src/lib/auth/AdminLayout.tsx`
  - `/libs/components/src/lib/auth/AdminNavbar.tsx`

### Current Issues

1. **Auth page is a stub** with no UI or flow.
2. **Inconsistent auth mechanisms** (NextAuth config exists, Supabase popup exists, internal `/api/auth` exists).
3. **No clear user journey** for login/register or provider sign-in.
4. **No validation UX** (errors, loading, disabled states, feedback).
5. **No testing coverage** for auth page UI or flows.

## Refactoring Strategy

### Goals

- Deliver a functional `/auth` page aligned with existing APIs and auth configuration.
- Use atomic component structure and shared UI components.
- Keep the implementation clean, testable, and security-conscious.

### Integration Choice (Decision Needed)

We should align on **one** primary auth flow for `/auth`:

- **Option A: NextAuth-first**
  - Use `next-auth` client helpers (`signIn`, `signOut`) and configured providers.
  - Credentials provider can call internal validation logic.

- **Option B: Internal `/api/auth`**
  - Use fetch to `/api/auth` for login/register (UserAuthService).
  - Keep NextAuth as optional (or use only for social providers).

**Recommendation**: Use **NextAuth for social providers**, and **/api/auth** for credentials (login/register), to avoid duplicating logic while keeping provider sign-in consistent with config.

### Component Breakdown (Atomic Design)

#### Atoms

- `AuthTitle` – heading + subtitle
- `AuthInput` – standardized input with label + error state
- `AuthButton` – primary/secondary buttons
- `ProviderButton` – Google/GitHub buttons
- `AuthErrorAlert` – inline error banner

#### Molecules

- `AuthForm` – email/password form (login/register)
- `ProviderAuthButtons` – social sign-in row
- `AuthToggle` – switch between login/register

#### Organisms

- `AuthCard` – full auth card layout with providers + form
- `AuthLayout` – page layout with branding, footer, background

#### Templates

- `AuthPageTemplate` – page assembly (layout + card + optional side panel)

## Implementation Steps

### Step 1: Define Auth UX and Data Flow

- Decide final flow (NextAuth + /api/auth split).
- Define error/loading states and form validation requirements.
- Confirm callback behavior (`/auth/callback` routing and post-login redirect).

### Step 2: Create UI Components

- Build atoms and molecules under `libs/components/src/lib/components` or `libs/components/src/lib/auth` (preferred: `/libs/components/src/lib/auth`).
- Use shared UI primitives from `@elzatona/components` (Button, Input, Label, Card, Alert).

### Step 3: Build Auth Page Logic

- Implement `/apps/website/src/app/auth/page.tsx` as a client component that:
  - Renders `AuthPageTemplate`
  - Connects to auth service(s)
  - Handles errors and loading states
  - Uses `next-auth/react` where applicable

### Step 4: Implement Callback Page

- `/auth/callback` should:
  - Display a loading state
  - Read auth session
  - Redirect to dashboard (or intended destination)
  - Handle errors cleanly

### Step 5: Testing

- Unit tests for form validation and UI components.
- Integration tests for auth flows (login/register success + failure).
- Smoke test for provider buttons (ensuring handlers fire).

## Security Enhancements

- Validate and sanitize inputs client-side (basic) and server-side (authoritative).
- Ensure no secrets in client code (only `NEXT_PUBLIC_*` is allowed).
- CSRF protection handled by NextAuth (if used); otherwise add token-based protection.
- Use `httpOnly` cookies for sessions where applicable.

## Performance & Accessibility

- Ensure page loads quickly (minimal dependencies).
- Accessibility: input labels, button focus states, ARIA attributes, keyboard navigation.

## Success Metrics

- `/auth` is functional and aligned with auth backend.
- Components are reusable and stay within size limits.
- Tests cover login/register flows.
- Pass lint and type checks.

## Validation Checkpoints

- Lint + typecheck pass
- Auth flow works for credentials and providers
- UI meets design and accessibility standards

---

## Next Steps

1. Confirm which auth flow to prioritize (NextAuth + /api/auth split is recommended).
2. Begin Step 2 by creating the auth UI components.
3. Implement `/auth` and `/auth/callback` pages.
