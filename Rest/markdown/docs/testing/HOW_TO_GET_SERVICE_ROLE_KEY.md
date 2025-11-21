# How to Get Supabase Service Role Key

## Quick Steps

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Sign in to your account

2. **Select Your Test Project**
   - Find and click on your test project: **vopfdukvdhnmzzjkxpnj**
   - Or use this direct link: https://supabase.com/dashboard/project/vopfdukvdhnmzzjkxpnj

3. **Navigate to API Settings**
   - In the left sidebar, click **Settings** (gear icon)
   - Click **API** in the settings menu

4. **Find the Service Role Key**
   - Scroll down to the **Project API keys** section
   - You'll see two keys:
     - **anon** `public` key (this is what you already have - the anon key)
     - **service_role** `secret` key (this is what you need!)

5. **Copy the Service Role Key**
   - Click the **eye icon** 👁️ next to "service_role" to reveal it
   - Click **Copy** to copy the key
   - ⚠️ **WARNING**: This key has full database access - keep it secret!

6. **Add to `.env.test.local`**
   ```bash
   SUPABASE_SERVICE_ROLE_KEY=your_copied_service_role_key_here
   ```

## Visual Guide

```
Supabase Dashboard
├── Projects
│   └── vopfdukvdhnmzzjkxpnj (Test Project) ← Click this
│       ├── Table Editor
│       ├── SQL Editor
│       ├── Authentication
│       └── Settings ← Click this
│           ├── General
│           ├── API ← Click this
│           │   └── Project API keys
│           │       ├── anon public (you have this)
│           │       └── service_role secret ← Copy this one!
│           ├── Database
│           └── ...
```

## Important Notes

### ⚠️ Security Warnings

- **Never commit** the service_role key to git
- **Never share** the service_role key publicly
- **Never use** the service_role key in client-side code
- The service_role key **bypasses Row Level Security (RLS)** - use only in server-side code

### 🔑 Key Differences

| Key Type | Visibility | Use Case | Security |
|----------|-----------|----------|----------|
| **anon** (public) | Public, safe to expose | Client-side code, browser | Respects RLS policies |
| **service_role** (secret) | **SECRET** - never expose | Server-side only, admin operations | Bypasses RLS, full access |

### ✅ Where to Use Service Role Key

- ✅ Server-side API routes (`/api/*`)
- ✅ Database migrations
- ✅ Admin scripts (like `create-test-admin.js`)
- ✅ Backend services
- ✅ Test scripts that need full database access

### ❌ Where NOT to Use Service Role Key

- ❌ Client-side React components
- ❌ Browser JavaScript
- ❌ Public repositories
- ❌ Environment variables exposed to frontend
- ❌ `.env.local` files that might be committed

## Verification

After adding the service_role key to `.env.test.local`, verify it works:

```bash
# Test the connection
node Rest/scripts/create-test-admin.js
```

If you see "✅ Admin user created successfully!", the key is working correctly.

## Troubleshooting

### "Key not found" or "Invalid key"

- Make sure you copied the **entire** key (it's very long)
- Check for extra spaces or line breaks
- Verify you're using the **service_role** key, not the **anon** key
- Ensure the key is in `.env.test.local` (not `.env.local`)

### "Permission denied" errors

- Verify you're using the service_role key (not anon key)
- Check that the key hasn't been rotated/regenerated
- Ensure the key is from the correct project (vopfdukvdhnmzzjkxpnj)

### Key looks different than expected

The service_role key will be a long JWT token that looks like:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvcGZkdWt2ZGhubXp6amt4cG5qIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzIyOTM4OCwiZXhwIjoyMDc4ODA1Mzg4fQ.XXXXX...
```

It's similar to the anon key but will have `"role":"service_role"` in the payload (you can decode it at jwt.io to verify, but don't share the decoded content).

## Direct Link

If you want to go directly to the API settings:
https://supabase.com/dashboard/project/vopfdukvdhnmzzjkxpnj/settings/api

## Next Steps

Once you have the service_role key:

1. ✅ Add it to `.env.test.local`
2. ✅ Run the schema SQL: `Rest/scripts/test-database-schema.sql`
3. ✅ Create admin user: `node Rest/scripts/create-test-admin.js`
4. ✅ Run tests: `npm run test:unit`


