# Admin App Migration - Quickstart Guide

## Overview

This guide provides step-by-step instructions for completing the admin/website app separation migration.

---

## Prerequisites

- Node.js 18+
- pnpm (package manager)
- Access to the repository
- Understanding of Next.js App Router

---

## Quick Start

### 1. Setup Environment

```bash
# Clone and checkout branch
git checkout 004-frontend-task-detail

# Install dependencies
pnpm install

# Verify both apps build
pnpm nx run admin:build
pnpm nx run website:build
```

### 2. Start Development Servers

```bash
# Terminal 1: Website (port 3000)
pnpm nx run website:dev

# Terminal 2: Admin (port 3001)
pnpm nx run admin:dev
```

### 3. Verify Current State

Check which routes exist in each app:

```bash
# List admin routes in website app
ls apps/website/src/app/admin/

# List admin routes in admin app
ls apps/admin/src/app/admin/
```

---

## Migration Checklist

### Phase 2: Route Migration

#### Task 2.1: Migrate `/admin/learning-cards/`

```bash
# Copy entire directory
cp -r apps/website/src/app/admin/learning-cards/ apps/admin/src/app/admin/

# Verify imports work
pnpm nx run admin:build
```

**Checklist:**

- [ ] Copy directory structure
- [ ] Verify all imports resolve
- [ ] Test page renders at localhost:3001/admin/learning-cards
- [ ] Build passes

#### Task 2.2: Migrate `/admin/logs/`

```bash
# Copy directory
cp -r apps/website/src/app/admin/logs/ apps/admin/src/app/admin/

# Build and test
pnpm nx run admin:build
```

**Checklist:**

- [ ] Copy directory
- [ ] Verify imports
- [ ] Test page renders
- [ ] Build passes

#### Task 2.3: Migrate `/admin/users/`

```bash
# Copy directory
cp -r apps/website/src/app/admin/users/ apps/admin/src/app/admin/

# Build and test
pnpm nx run admin:build
```

**Checklist:**

- [ ] Copy directory
- [ ] Verify imports
- [ ] Test page renders
- [ ] Check user management features work

#### Task 2.4: Handle `/admin/questions/`

**Option A**: Redirect to content/questions

```typescript
// apps/admin/src/app/admin/questions/page.tsx
import { redirect } from "next/navigation";
export default function QuestionsPage() {
  redirect("/admin/content/questions");
}
```

**Option B**: Delete if redundant

#### Task 2.5: Migrate API Routes

```bash
# Copy API routes needed by admin
cp -r apps/website/src/app/api/admin/* apps/admin/src/app/api/admin/
```

---

### Phase 3: Cleanup

#### Task 3.1: Verify Admin Routes in Admin App

For each duplicate route, verify the admin app version works correctly:

```bash
# Test each route manually
curl http://localhost:3001/admin/content
curl http://localhost:3001/admin/content-management
curl http://localhost:3001/admin/frontend-tasks
curl http://localhost:3001/admin/login
curl http://localhost:3001/admin/problem-solving
```

#### Task 3.2: Delete Routes from Website App

**⚠️ WARNING: Only delete after verification!**

```bash
# Remove admin routes from website (after verification)
rm -rf apps/website/src/app/admin/content/
rm -rf apps/website/src/app/admin/content-management/
rm -rf apps/website/src/app/admin/frontend-tasks/
rm -rf apps/website/src/app/admin/login/
rm -rf apps/website/src/app/admin/problem-solving/
rm -rf apps/website/src/app/admin/learning-cards/
rm -rf apps/website/src/app/admin/logs/
rm -rf apps/website/src/app/admin/questions/
rm -rf apps/website/src/app/admin/users/
```

#### Task 3.3: Add Redirects

If users might access old URLs, add redirects:

```typescript
// apps/website/next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: "/admin/:path*",
        destination: "http://localhost:3001/admin/:path*", // Update for prod
        permanent: true,
      },
    ];
  },
};
```

---

### Phase 4: Testing

#### Task 4.1: Manual Testing Checklist

Test each admin feature in the admin app:

| Feature         | URL                          | Expected Behavior | Status |
| --------------- | ---------------------------- | ----------------- | ------ |
| Dashboard       | /admin/dashboard             | Stats display     | ⬜     |
| Login           | /admin/login                 | Can login         | ⬜     |
| Content         | /admin/content               | List content      | ⬜     |
| Questions       | /admin/content/questions     | List questions    | ⬜     |
| Create Question | /admin/content/questions/new | Form works        | ⬜     |
| Learning Cards  | /admin/learning-cards        | List cards        | ⬜     |
| Users           | /admin/users                 | List users        | ⬜     |
| Logs            | /admin/logs                  | View logs         | ⬜     |

#### Task 4.2: E2E Tests

```bash
# Run existing e2e tests
pnpm nx run e2e:test

# Or run specific admin tests
pnpm nx run e2e:test --spec="admin/**"
```

#### Task 4.3: Build Verification

```bash
# Build both apps
pnpm nx run-many --target=build --all

# Check for TypeScript errors
pnpm nx run-many --target=typecheck --all
```

---

## Troubleshooting

### Import Errors

**Problem**: Module not found errors after migration.

**Solution**: Check that all imports use shared library paths:

```typescript
// ✅ Correct
import { Button } from "@elzatona/common-ui";

// ❌ Wrong
import { Button } from "../../../components/Button";
```

### Build Failures

**Problem**: Build fails after migration.

**Solution**:

1. Check for local component dependencies
2. Ensure all components are in shared libs or copied
3. Run `pnpm install` to update dependencies

### API Route Errors

**Problem**: API routes return 404.

**Solution**:

1. Verify API routes are copied to admin app
2. Check route file naming (route.ts vs route.tsx)
3. Verify HTTP methods are exported

### Auth Issues

**Problem**: Login doesn't work in admin app.

**Solution**:

1. Check JWT_SECRET matches between apps
2. Verify cookie domain settings
3. Check CORS configuration

---

## Verification Checklist

Before merging:

- [ ] All admin routes accessible in admin app
- [ ] All admin routes removed from website app
- [ ] Builds pass for both apps
- [ ] E2E tests pass
- [ ] Manual testing complete
- [ ] Documentation updated
- [ ] Code reviewed

---

## Next Steps After Migration

1. **Update CI/CD**: Configure separate deployments
2. **Update DNS**: Point admin subdomain to admin app
3. **Update Docs**: Update all documentation referencing admin routes
4. **Monitor**: Watch for any user-reported issues

---

## Support

If you encounter issues:

1. Check this guide's troubleshooting section
2. Review the impl-plan.md for detailed task descriptions
3. Check research.md for architectural decisions

---

**Quick Start Version**: 1.0.0  
**Last Updated**: January 30, 2026
