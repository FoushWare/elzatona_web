# 🚀 Seed Database - Quick Steps

## ⚠️ IMPORTANT: Run SQL Schema First!

The MCP tools don't have access to your project, so you need to run the SQL manually.

## Step 1: Run SQL Schema (2 minutes)

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

4. **Wait for success** - Should see: "Success. No rows returned"

## Step 2: Create Admin Account (30 seconds)

After tables are created, run:

```bash
ADMIN_EMAIL=elzatonafoushware@gmail.com ADMIN_PASSWORD='ZatonaFoushware$12' node Rest/scripts/create-test-admin.js
```

This will create:

- Email: `elzatonafoushware@gmail.com`
- Password: `ZatonaFoushware$12`
- Role: `super_admin`

## Step 3: Update .env.test.local

Add these lines to `.env.test.local`:

```bash
ADMIN_EMAIL=elzatonafoushware@gmail.com
ADMIN_PASSWORD=ZatonaFoushware$12
INITIAL_ADMIN_EMAIL=elzatonafoushware@gmail.com
INITIAL_ADMIN_PASSWORD=ZatonaFoushware$12
```

## ✅ Verify

1. **Check Tables:**
   - Go to: https://supabase.com/dashboard/project/vopfdukvdhnmzzjkxpnj/editor
   - You should see 9 tables:
     - `learning_cards`
     - `categories`
     - `topics`
     - `questions`
     - `learning_plans`
     - `plan_cards`
     - `user_progress`
     - `question_attempts`
     - `admin_users`

2. **Check Admin User:**
   - Go to: Table Editor → `admin_users`
   - You should see: `elzatonafoushware@gmail.com`

3. **Test Login:**
   ```bash
   npm run dev:test
   # Then: http://localhost:3000/admin/login
   # Login with: elzatonafoushware@gmail.com / ZatonaFoushware$12
   ```

## 🔗 Direct Links

- **SQL Editor**: https://supabase.com/dashboard/project/vopfdukvdhnmzzjkxpnj/sql/new
- **Table Editor**: https://supabase.com/dashboard/project/vopfdukvdhnmzzjkxpnj/editor
- **API Settings**: https://supabase.com/dashboard/project/vopfdukvdhnmzzjkxpnj/settings/api

## 📝 Schema File

Location: `Rest/scripts/test-database-schema.sql` (457 lines)
