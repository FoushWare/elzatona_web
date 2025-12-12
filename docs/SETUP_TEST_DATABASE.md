# Setup Test Database - Quick Guide

## 🚀 Quick Setup Steps

### Step 1: Run the Schema SQL in Supabase

1. **Go to Supabase SQL Editor:**
   - Open: https://supabase.com/dashboard/project/vopfdukvdhnmzzjkxpnj/sql/new
   - Or: Dashboard → Your Project → SQL Editor → New Query

2. **Copy the Schema SQL:**

   ```bash
   cat Rest/scripts/test-database-schema.sql
   ```

   Or open the file: `Rest/scripts/test-database-schema.sql`

3. **Paste and Run:**
   - Paste the entire SQL into the SQL Editor
   - Click **"Run"** button (or press `Cmd+Enter` / `Ctrl+Enter`)
   - Wait for success message: "Success. No rows returned"

4. **Verify Tables Created:**
   - Go to: Table Editor in Supabase Dashboard
   - You should see these tables:
     - `learning_cards`
     - `categories`
     - `topics`
     - `questions`
     - `learning_plans`
     - `plan_cards`
     - `user_progress`
     - `question_attempts`
     - `admin_users`

### Step 2: Create Admin Account

After the schema is created, run:

```bash
ADMIN_EMAIL=<your-admin-email> ADMIN_PASSWORD='<your-admin-password>' node Rest/scripts/create-test-admin.js
```

This will:

- Create admin user: `<your-admin-email>`
- Set password: `<your-admin-password>`
- Grant super_admin role
- Set up all permissions

### Step 3: Update .env.test.local

Update your `.env.test.local` with the admin credentials:

```bash
ADMIN_EMAIL=<your-admin-email>
ADMIN_PASSWORD=<your-admin-password>
INITIAL_ADMIN_EMAIL=<your-admin-email>
INITIAL_ADMIN_PASSWORD=<your-admin-password>
```

## ✅ Verification

After setup, verify:

1. **Check Tables:**

   ```bash
   # Go to Supabase Dashboard → Table Editor
   # You should see all 9 tables listed above
   ```

2. **Check Admin User:**

   ```bash
   # Go to Supabase Dashboard → Table Editor → admin_users
   # You should see your admin user with email: <your-admin-email>
   ```

3. **Test Login:**
   ```bash
   npm run dev:test
   # Then go to: http://localhost:3000/admin/login
   # Login with: <your-admin-email> / <your-admin-password>
   ```

## 🔗 Direct Links

- **SQL Editor**: https://supabase.com/dashboard/project/vopfdukvdhnmzzjkxpnj/sql/new
- **Table Editor**: https://supabase.com/dashboard/project/vopfdukvdhnmzzjkxpnj/editor
- **API Settings**: https://supabase.com/dashboard/project/vopfdukvdhnmzzjkxpnj/settings/api

## 📝 Schema File Location

The schema SQL file is at: `Rest/scripts/test-database-schema.sql`
