# Update Service Role Key for Test Environment

## Problem

The `.env.test.local` file has been updated to use the **zatona-web-testing** project (`kiycimlsatwfqxtfprlr`) where the admin user exists, but the `SUPABASE_SERVICE_ROLE_KEY` still points to a different project.

## Solution

### Step 1: Get the Service Role Key

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select the project: **zatona-web-testing** (or project ID: `kiycimlsatwfqxtfprlr`)
3. Navigate to: **Settings** → **API**
4. Scroll down to **"Project API keys"** section
5. Find the **"service_role"** key (it's the secret one, not the anon key)
6. Click the **👁️ eye icon** next to it to reveal the key
7. **Copy the entire key** (it's a long JWT token)

### Step 2: Update .env.test.local

Open `.env.test.local` in your project root and update:

```bash
# Update this line with the service role key from Step 1
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_KEY_HERE
```

**Important**: The service role key should start with `YOUR_SUPABASE_KEY_HERE` and contain `"ref":"kiycimlsatwfqxtfprlr"` when decoded.

### Step 3: Verify Setup

Run the verification script:

```bash
node Rest/scripts/verify-test-admin.js
```

This will verify:
- ✅ Environment variables are loaded
- ✅ Admin user exists in the database
- ✅ Password hash is correct (bcrypt)
- ✅ Password matches

### Step 4: Test E2E Login

Run the E2E login test:

```bash
npm run test:e2e -- tests/e2e/admin/admin-login.spec.ts
```

## Current Configuration

- **Test Project**: zatona-web-testing (`kiycimlsatwfqxtfprlr`)
- **Project URL**: `https://kiycimlsatwfqxtfprlr.supabase.co`
- **Admin Email**: `elzatonafoushware@gmail.com`
- **Admin Password**: `ZatonaFoushware$12`
- **Password Hash**: ✅ Verified (bcrypt format)

## Quick Links

- **Supabase Dashboard**: https://supabase.com/dashboard
- **Project Settings**: https://supabase.com/dashboard/project/kiycimlsatwfqxtfprlr/settings/api
- **SQL Editor**: https://supabase.com/dashboard/project/kiycimlsatwfqxtfprlr/sql/new

## Security Note

⚠️ **Never commit the service role key to Git!** It has full database access. The `.env.test.local` file is already in `.gitignore`.


