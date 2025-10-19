# 🚀 Supabase Schema Creation Guide

Since the MCP server is having region configuration issues, we'll create the schema manually through the Supabase dashboard.

## 📋 Steps to Create the Schema

### 1. Access Supabase Dashboard

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Sign in to your account
3. Select your project: `hpnewqkvpnthpohvxcmq`

### 2. Navigate to SQL Editor

1. In the left sidebar, click on **"SQL Editor"**
2. Click **"New query"** to create a new SQL query

### 3. Execute the Schema

1. Copy the entire contents of `supabase-schema.sql`
2. Paste it into the SQL editor
3. Click **"Run"** to execute the schema

### 4. Verify Schema Creation

After executing the schema, you should see these tables created:

- `learning_cards`
- `categories`
- `topics`
- `questions`
- `learning_plans`
- `plan_cards`
- `user_progress`
- `question_attempts`
- `question_stats`

## 🔧 Alternative: Use Supabase CLI

If you have the Supabase CLI installed, you can also run:

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref hpnewqkvpnthpohvxcmq

# Execute the schema
supabase db reset --db-url "postgresql://postgres:[YOUR_PASSWORD]@db.hpnewqkvpnthpohvxcmq.supabase.co:5432/postgres" --file supabase-schema.sql
```

## 📊 Expected Results

After successful execution, you should see:

- ✅ 8 core tables created
- ✅ Proper foreign key relationships established
- ✅ Indexes created for performance
- ✅ Row-Level Security (RLS) policies enabled
- ✅ Triggers for automatic timestamp updates
- ✅ Helper functions for question counting

## 🚨 Troubleshooting

If you encounter any errors:

1. **Permission errors**: Make sure you're using the correct database password
2. **Syntax errors**: Check that all SQL statements end with semicolons
3. **Extension errors**: The `uuid-ossp` extension should be available by default

## 📝 Next Steps

Once the schema is created successfully:

1. Run the migration script: `node scripts/migrate-firebase-to-supabase.js`
2. Verify data migration in the Supabase dashboard
3. Update API endpoints to use Supabase instead of Firebase
4. Test the new relational structure

## 🔗 Useful Links

- [Supabase Dashboard](https://supabase.com/dashboard)
- [Supabase SQL Editor Documentation](https://supabase.com/docs/guides/database/sql-editor)
- [Supabase CLI Documentation](https://supabase.com/docs/guides/cli)
