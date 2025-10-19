# 🚀 Supabase Schema Creation Guide

## Method 1: Supabase Dashboard (Recommended)

### Step 1: Access Supabase Dashboard

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Sign in to your account
3. Select your project: `hpnewqkvpnthpohvxcmq`

### Step 2: Open SQL Editor

1. Click **"SQL Editor"** in the left sidebar
2. Click **"New query"** button
3. You'll see a blank SQL editor

### Step 3: Execute Schema

1. Copy the entire contents of `supabase-schema.sql`
2. Paste it into the SQL editor
3. Click **"Run"** button (or press Ctrl/Cmd + Enter)

### Step 4: Verify Creation

1. Go to **"Table Editor"** in the left sidebar
2. You should see these tables:
   - `learning_cards`
   - `categories`
   - `topics`
   - `questions`
   - `learning_plans`
   - `plan_cards`
   - `user_progress`
   - `question_attempts`

---

## Method 2: Supabase CLI (Alternative)

### Step 1: Install Supabase CLI

```bash
npm install -g supabase
```

### Step 2: Login to Supabase

```bash
supabase login
```

### Step 3: Link Your Project

```bash
supabase link --project-ref hpnewqkvpnthpohvxcmq
```

### Step 4: Execute Schema

```bash
supabase db reset --db-url "postgresql://postgres:[YOUR-PASSWORD]@db.hpnewqkvpnthpohvxcmq.supabase.co:5432/postgres"
```

---

## Method 3: Direct PostgreSQL Connection

### Step 1: Get Connection Details

From your Supabase dashboard:

1. Go to **Settings** → **Database**
2. Copy the connection string
3. Use any PostgreSQL client (pgAdmin, DBeaver, etc.)

### Step 2: Execute Schema

1. Connect using the connection string
2. Execute the contents of `supabase-schema.sql`

---

## Expected Results

After successful execution, you should see:

### ✅ Tables Created (8 total):

- `learning_cards` - Main learning card definitions
- `categories` - Question categories under cards
- `topics` - Question topics under categories
- `questions` - Individual questions with full content
- `learning_plans` - Learning plan templates
- `plan_cards` - Junction table for plans ↔ cards
- `user_progress` - User progress tracking
- `question_attempts` - Individual question attempts

### ✅ Extensions Enabled:

- `uuid-ossp` - For UUID generation
- `pg_trgm` - For full-text search

### ✅ Indexes Created:

- Performance indexes on all major columns
- Composite indexes for common query patterns

### ✅ Security Policies:

- Row Level Security (RLS) enabled
- Public read access for active content
- Admin-only write access
- User-specific access for progress tracking

---

## Troubleshooting

### Common Issues:

1. **Permission Denied**: Make sure you're using the project owner account
2. **Syntax Errors**: Check for any copy-paste issues in the SQL
3. **Extension Errors**: Some extensions might already exist (this is fine)

### Success Indicators:

- All 8 tables appear in Table Editor
- No error messages in SQL Editor
- Can see table structures with proper columns
- Foreign key relationships are visible

---

## Next Steps After Schema Creation

Once the schema is successfully created:

1. **Run Data Migration**: `node scripts/migrate-firebase-to-supabase.js`
2. **Update API Endpoints**: Switch from Firebase to Supabase
3. **Test New Structure**: Verify all relationships work correctly
4. **Deploy Changes**: Update your application to use Supabase

---

## Need Help?

If you encounter any issues:

1. Check the Supabase dashboard logs
2. Verify your project permissions
3. Try the CLI method as an alternative
4. Contact Supabase support if needed

The schema is designed to be robust and handle all your current Firebase data structure while providing better performance and relationships.
