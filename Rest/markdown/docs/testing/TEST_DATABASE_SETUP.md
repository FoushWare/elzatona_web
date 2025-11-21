# Test Database Setup Guide

This guide explains how to set up your test Supabase database with all tables and a test admin user.

## Quick Start

### Step 0: Get Your Service Role Key

**Before you start**, you need to get the `SUPABASE_SERVICE_ROLE_KEY`:

1. Go to: https://supabase.com/dashboard/project/vopfdukvdhnmzzjkxpnj/settings/api
2. Scroll down to **"Project API keys"** section
3. Find the **service_role** key (it says "secret" next to it)
4. Click the **eye icon** 👁️ to reveal it
5. Click **Copy** to copy the key
6. Add it to `.env.test.local`:
   ```bash
   SUPABASE_SERVICE_ROLE_KEY=your_copied_key_here
   ```

**⚠️ Important**: 
- The service_role key is **different** from the anon key
- The service_role key has **full database access** - keep it secret!
- Never commit it to git or share it publicly

**See**: `Rest/markdown/docs/testing/HOW_TO_GET_SERVICE_ROLE_KEY.md` for detailed instructions.

### Step 1: Run the Schema SQL

1. Go to your test Supabase project: https://supabase.com/dashboard
2. Select your test project (vopfdukvdhnmzzjkxpnj)
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy the entire contents of `Rest/scripts/test-database-schema.sql`
6. Paste it into the SQL Editor
7. Click **Run** (or press `Cmd+Enter` / `Ctrl+Enter`)

This will create:
- All database tables (learning_cards, categories, topics, questions, etc.)
- All indexes for performance
- All triggers for updated_at timestamps
- Row Level Security (RLS) policies
- Helper functions
- Sample data (learning cards, categories, topics)

### Step 2: Create Test Admin User

After the schema is created, run:

```bash
node Rest/scripts/create-test-admin.js
```

This script will:
- Read credentials from `.env.test.local`
- Create a test admin user in the `admin_users` table
- Hash the password securely
- Set up admin permissions

**Note**: Make sure you have:
- `NEXT_PUBLIC_SUPABASE_URL` set to your test database URL
- `SUPABASE_SERVICE_ROLE_KEY` set to your test database service role key
- `ADMIN_EMAIL` and `ADMIN_PASSWORD` set in `.env.test.local`

## What Gets Created

### Tables Created

1. **learning_cards** - Learning card definitions
2. **categories** - Question categories
3. **topics** - Question topics
4. **questions** - Individual learning questions
5. **learning_plans** - Learning plan templates
6. **plan_cards** - Junction table for plans and cards
7. **user_progress** - User progress tracking
8. **question_attempts** - Individual question attempts
9. **admin_users** - Admin authentication table

### Sample Data

The schema includes sample data:
- 4 learning cards (Core Technologies, Framework Questions, Problem Solving, System Design)
- 4 categories (React, JavaScript, CSS, HTML)
- 3 topics (React Basics, React Hooks, JavaScript Fundamentals)

### Admin User

A test admin user is created with:
- Email: From `ADMIN_EMAIL` in `.env.test.local`
- Password: From `ADMIN_PASSWORD` in `.env.test.local`
- Role: `super_admin`
- Permissions: Full access (manage users, content, analytics, settings)

## Verification

After setup, verify everything works:

```bash
# Check that tables exist
# (You can do this in Supabase SQL Editor)
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

# Check admin user exists
SELECT email, role, is_active 
FROM admin_users 
WHERE email = 'your-test-admin@example.com';
```

## Troubleshooting

### "admin_users table does not exist"

**Solution**: Run the schema SQL first (Step 1). The `admin_users` table is created by the schema SQL.

### "Missing Supabase environment variables"

**Solution**: Make sure `.env.test.local` exists and contains:
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

### "Error creating admin user"

**Possible causes**:
1. Table doesn't exist - Run schema SQL first
2. Service role key is incorrect - Check `.env.test.local`
3. Database connection issue - Verify Supabase URL and key

### Schema SQL fails with errors

**Common issues**:
- "relation already exists" - This is OK, tables already exist
- "extension already exists" - This is OK, extensions are already installed
- Other errors - Check the error message and fix the SQL

**Solution**: The SQL uses `CREATE TABLE IF NOT EXISTS` and `DROP POLICY IF EXISTS`, so it's safe to run multiple times.

## Next Steps

After setup:
1. ✅ Verify admin login works: http://localhost:3000/admin/login
2. ✅ Run unit tests: `npm run test:unit`
3. ✅ Run integration tests: `npm run test:integration`
4. ✅ Run E2E tests: `npm run test:e2e`

## Manual Setup Alternative

If the automated script doesn't work, you can manually:

1. **Create admin user via SQL**:
   ```sql
   -- First, hash your password (use bcrypt with 10 rounds)
   -- You can use: node -e "const bcrypt=require('bcryptjs');bcrypt.hash('your-password',10).then(h=>console.log(h))"
   
   INSERT INTO admin_users (email, password_hash, name, role, is_active, permissions)
   VALUES (
     'test-admin@example.com',
     '$2a$10$YOUR_HASHED_PASSWORD_HERE',
     'Test Admin User',
     'super_admin',
     true,
     '{"can_manage_users":true,"can_manage_content":true,"can_view_analytics":true,"can_manage_settings":true}'::jsonb
   );
   ```

2. **Or use the Supabase Auth API** (if using Supabase Auth instead of admin_users table)

## Files Reference

- **Schema SQL**: `Rest/scripts/test-database-schema.sql`
- **Admin Creation Script**: `Rest/scripts/create-test-admin.js`
- **Environment Template**: `Rest/env.test.example`
- **Test Environment Config**: `.env.test.local` (create from template)

## Security Notes

- ✅ `.env.test.local` is in `.gitignore` - never commit it
- ✅ Test database is separate from production
- ✅ Test admin credentials are only for testing
- ⚠️  Never use test credentials in production
- ⚠️  Rotate test credentials periodically

