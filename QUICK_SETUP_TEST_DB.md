# 🚀 Quick Setup: Test Database

## ⚠️ IMPORTANT: Run SQL Schema First!

The tables don't exist yet. You need to run the SQL schema in Supabase first.

## Step 1: Run SQL Schema (REQUIRED)

1. **Open Supabase SQL Editor:**
   ```
   https://supabase.com/dashboard/project/vopfdukvdhnmzzjkxpnj/sql/new
   ```

2. **Copy the entire SQL file:**
   ```bash
   cat Rest/scripts/test-database-schema.sql
   ```
   Or open: `Rest/scripts/test-database-schema.sql`

3. **Paste into SQL Editor and click "Run"**

4. **Wait for success** - You should see: "Success. No rows returned"

## Step 2: Create Admin Account

After tables are created, run:

```bash
ADMIN_EMAIL=elzatonafoushware@gmail.com ADMIN_PASSWORD='ZatonaFoushware$12' node Rest/scripts/create-test-admin.js
```

## Step 3: Update .env.test.local

Add these lines to `.env.test.local`:

```bash
ADMIN_EMAIL=elzatonafoushware@gmail.com
ADMIN_PASSWORD=ZatonaFoushware$12
INITIAL_ADMIN_EMAIL=elzatonafoushware@gmail.com
INITIAL_ADMIN_PASSWORD=ZatonaFoushware$12
```

## ✅ Verify

1. Check Supabase Dashboard → Table Editor → You should see 9 tables
2. Check `admin_users` table → You should see your admin user
3. Test login: `npm run dev:test` → http://localhost:3000/admin/login

## 🔗 Direct Links

- **SQL Editor**: https://supabase.com/dashboard/project/vopfdukvdhnmzzjkxpnj/sql/new
- **Table Editor**: https://supabase.com/dashboard/project/vopfdukvdhnmzzjkxpnj/editor


