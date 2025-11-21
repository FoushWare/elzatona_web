# ⚠️ URGENT: Fix Service Role Key for E2E Tests

## Problem

The E2E tests are failing because `SUPABASE_SERVICE_ROLE_KEY` in `.env.test.local` is for the **wrong Supabase project**.

**Current Status:**
- ✅ `.env.test.local` URL: `https://kiycimlsatwfqxtfprlr.supabase.co` (correct)
- ❌ `SUPABASE_SERVICE_ROLE_KEY`: Points to a different project (wrong)

## Quick Fix (5 minutes)

### Step 1: Get the Correct Service Role Key

1. Go to: **https://supabase.com/dashboard/project/kiycimlsatwfqxtfprlr/settings/api**
2. Scroll to **"Project API keys"** section
3. Find **"service_role"** key (it's the **secret** one, not the anon key)
4. Click the **👁️ eye icon** to reveal it
5. **Copy the entire key** (it's a long JWT token starting with `eyJ...`)

### Step 2: Update .env.test.local

Open `.env.test.local` in your project root and update this line:

```bash
# OLD (wrong project):
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_KEY_HERE.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsZnlsdHNtY2l2bXFmbG94cG1xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzIyODc1MywiZXhwIjoyMDc4ODA0NzUzfQ.xkENH2kmw3LaFHR9Xd0a3JIhbBWIPcd0HjVPwR-AnMw

# NEW (correct project - kiycimlsatwfqxtfprlr):
SUPABASE_SERVICE_ROLE_KEY=YOUR_NEW_KEY_FROM_STEP_1
```

**Important:** The new key should contain `"ref":"kiycimlsatwfqxtfprlr"` when decoded (you can check at https://jwt.io).

### Step 3: Verify the Fix

Run the verification script:

```bash
node Rest/scripts/verify-test-admin.js
```

You should see:
```
✅ Admin user found
✅ Password hash verified (bcrypt)
✅ Password matches
🎉 All checks passed!
```

### Step 4: Test E2E Login

Run the E2E test:

```bash
npm run test:e2e -- tests/e2e/admin/admin-login.spec.ts
```

## Why This Matters

- The API route uses `getSupabaseConfig()` which reads `SUPABASE_SERVICE_ROLE_KEY` from environment variables
- If the key is for the wrong project, the API can't query the `admin_users` table
- This causes "Invalid email or password" errors even though the admin user exists

## Current Configuration

- **Test Project**: zatona-web-testing (`kiycimlsatwfqxtfprlr`)
- **Project URL**: `https://kiycimlsatwfqxtfprlr.supabase.co`
- **Admin Email**: `elzatonafoushware@gmail.com`
- **Admin Password**: `ZatonaFoushware$12`
- **Admin Status**: ✅ Exists with correct bcrypt password hash

## Quick Links

- **Get Service Role Key**: https://supabase.com/dashboard/project/kiycimlsatwfqxtfprlr/settings/api
- **Verify Setup**: `node Rest/scripts/verify-test-admin.js`
- **Test Login**: `npm run test:e2e -- tests/e2e/admin/admin-login.spec.ts`


