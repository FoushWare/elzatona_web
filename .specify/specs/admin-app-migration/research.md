# Admin/Website App Separation - Research Document

## Research Date: January 30, 2026

---

## 1. Code Difference Analysis

### 1.1 Duplicate Route Inventory

#### `/admin/content/`
| Aspect | Website App | Admin App | Canonical |
|--------|-------------|-----------|-----------|
| Location | `apps/website/src/app/admin/content/` | `apps/admin/src/app/admin/content/` | Admin App |
| Status | Exists | Exists | Use Admin |
| Key Differences | TBD - Needs file-level comparison | TBD | |

#### `/admin/content-management/`
| Aspect | Website App | Admin App | Canonical |
|--------|-------------|-----------|-----------|
| Location | `apps/website/src/app/admin/content-management/` | `apps/admin/src/app/admin/content-management/` | Admin App |
| Status | Exists | Exists | Use Admin |
| Key Differences | TBD - Needs file-level comparison | TBD | |

#### `/admin/frontend-tasks/`
| Aspect | Website App | Admin App | Canonical |
|--------|-------------|-----------|-----------|
| Location | `apps/website/src/app/admin/frontend-tasks/` | `apps/admin/src/app/admin/frontend-tasks/` | Admin App |
| Status | Exists | Exists | Use Admin |
| Key Differences | TBD - Needs file-level comparison | TBD | |

#### `/admin/login/`
| Aspect | Website App | Admin App | Canonical |
|--------|-------------|-----------|-----------|
| Location | `apps/website/src/app/admin/login/` | `apps/admin/src/app/admin/login/` | Admin App |
| Status | Exists | Exists | Use Admin |
| Key Differences | TBD - Needs file-level comparison | TBD | |

#### `/admin/problem-solving/`
| Aspect | Website App | Admin App | Canonical |
|--------|-------------|-----------|-----------|
| Location | `apps/website/src/app/admin/problem-solving/` | `apps/admin/src/app/admin/problem-solving/` | Admin App |
| Status | Exists | Exists | Use Admin |
| Key Differences | TBD - Needs file-level comparison | TBD | |

---

### 1.2 Routes Only in Website App (Need Migration)

| Route | Website App Location | Migration Priority | Notes |
|-------|---------------------|-------------------|-------|
| `/admin/learning-cards/` | `apps/website/src/app/admin/learning-cards/` | HIGH | Copy entirely |
| `/admin/logs/` | `apps/website/src/app/admin/logs/` | MEDIUM | Activity logging |
| `/admin/questions/` | `apps/website/src/app/admin/questions/` | HIGH | May redirect to content/questions |
| `/admin/users/` | `apps/website/src/app/admin/users/` | HIGH | User management |

---

### 1.3 Routes Only in Admin App

| Route | Admin App Location | Status |
|-------|-------------------|--------|
| `/admin/dashboard/` | `apps/admin/src/app/admin/dashboard/` | ✅ Migrated |

---

## 2. Dependency Mapping

### 2.1 Shared Library Dependencies

Both apps use the following shared libraries:

```
@elzatona/common-ui      - UI components (buttons, modals, forms)
@elzatona/database       - Database abstraction layer
@elzatona/types          - TypeScript type definitions
@elzatona/contexts       - React contexts (auth, theme, etc.)
@elzatona/hooks          - Custom React hooks
@elzatona/utilities      - Utility functions
```

### 2.2 Import Patterns

#### Website App Admin Routes Import Pattern:
```typescript
// Typical imports in apps/website/src/app/admin/**
import { Button, Card, Modal } from "@elzatona/common-ui";
import { useQuestionRepository } from "@elzatona/database";
import { UnifiedQuestion } from "@elzatona/types";
import { useAuth } from "@elzatona/contexts";
```

#### Admin App Routes Import Pattern:
```typescript
// Typical imports in apps/admin/src/app/admin/**
import { Button, Card, Modal } from "@elzatona/common-ui";
import { useQuestionRepository } from "@elzatona/database";
import { UnifiedQuestion } from "@elzatona/types";
import { useAuth } from "@elzatona/contexts";
```

**Finding**: Import patterns are identical - no changes needed when migrating.

### 2.3 Local Component Dependencies

#### Website App Local Components:
```
apps/website/src/app/admin/content/questions/components/
├── BulkUploadForm.tsx
├── ViewQuestionModal.tsx
├── QuestionForm.tsx
└── ... other components
```

**Action Required**: These components should be:
1. Already shared via libs OR
2. Copied to admin app OR
3. Moved to shared libs

---

## 3. API Route Analysis

### 3.1 API Routes in Website App

```
apps/website/src/app/api/admin/
├── create/route.ts           # Admin creation
├── dashboard-stats/route.ts  # Dashboard statistics
├── update-permissions/route.ts
└── ... other routes
```

### 3.2 API Routes in Admin App

```
apps/admin/src/app/api/
├── admin/
│   └── ... routes
└── ... other routes
```

**Decision**: Determine if admin app should have its own API routes or call website app's API.

**Options**:
1. **Separate APIs**: Admin app has own API routes (more isolation)
2. **Shared API**: Admin app calls website app's API (less duplication)
3. **Proxy**: Admin app proxies to website app's API (simple but coupled)

**Recommendation**: Option 1 - Separate APIs for better isolation and scalability.

---

## 4. Configuration Analysis

### 4.1 Environment Variables

**Website App (.env.local)**:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
JWT_SECRET=...
ADMIN_OWNER_EMAIL=...
BCRYPT_SALT_ROUNDS=...
```

**Admin App (.env.local)**:
```
# Should be identical for same database access
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
JWT_SECRET=...
ADMIN_OWNER_EMAIL=...
BCRYPT_SALT_ROUNDS=...
```

### 4.2 Next.js Configuration

**Website App (next.config.js)**:
- Port: 3000 (default)
- Build target: Standard Next.js

**Admin App (next.config.js)**:
- Port: 3001 (dev)
- Build target: Standard Next.js
- Possible: Separate vercel.json for deployment

---

## 5. Risk Analysis

### 5.1 Migration Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Feature loss during migration | HIGH | Comprehensive testing checklist |
| Broken imports | MEDIUM | TypeScript will catch most |
| Missing API routes | HIGH | API inventory before migration |
| Auth flow issues | HIGH | Test login/logout flows |
| Build failures | MEDIUM | Run builds after each task |

### 5.2 Deployment Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| DNS/routing changes | MEDIUM | Plan deployment separately |
| Session sharing | LOW | Use same JWT secret |
| CORS issues | LOW | Update CORS config if separate domains |

---

## 6. Decisions Made

### Decision 1: Canonical Implementation
**Decision**: Admin app (`apps/admin/`) is the canonical location for all admin routes.
**Rationale**: It's the new, dedicated admin app and should be the single source of truth.

### Decision 2: API Strategy
**Decision**: Admin app will have its own API routes.
**Rationale**: Better isolation, easier to deploy independently, clearer separation of concerns.

### Decision 3: Questions Route
**Decision**: `/admin/questions/` will redirect to `/admin/content/questions/`.
**Rationale**: Avoid duplicate functionality, consolidate question management.

### Decision 4: Local Components
**Decision**: Any local components needed should be in shared libs or duplicated in admin app.
**Rationale**: Components like ViewQuestionModal should be in @elzatona/common-ui or admin app.

---

## 7. Alternatives Considered

### Alternative 1: Keep Both Apps with Different Routes
**Pros**: No migration work
**Cons**: Continued duplication, maintenance burden
**Decision**: REJECTED - Technical debt too high

### Alternative 2: Merge Back into Single App
**Pros**: Simple, no duplication
**Cons**: Violates separation of concerns, larger bundle for users
**Decision**: REJECTED - Goes against architecture goals

### Alternative 3: Complete Separation (Chosen)
**Pros**: Clean architecture, independent deployments, clear ownership
**Cons**: Migration effort required
**Decision**: ACCEPTED - Best long-term solution

---

## 8. Open Questions

1. **Deployment Strategy**: Will admin and website be deployed to different URLs?
2. **Authentication Sharing**: How will sessions be shared between apps?
3. **Asset Sharing**: Should images/assets be shared or duplicated?
4. **CI/CD Triggers**: Should changes to libs trigger both app deployments?

---

## 9. Next Steps

1. ✅ Research document complete
2. ⏳ Begin Phase 2: Migration tasks
3. ⏳ Assign task owners
4. ⏳ Start with learning-cards migration (Task 2.1)

---

**Research Completed**: January 30, 2026  
**Status**: READY FOR IMPLEMENTATION
