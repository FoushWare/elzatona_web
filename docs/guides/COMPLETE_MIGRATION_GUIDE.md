# 🚀 Complete Migration Guide

## Step 1: Get Your Supabase Service Role Key

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard
2. **Select your project**: `hpnewqkvpnthpohvxcmq`
3. **Click "Settings"** in the left sidebar
4. **Click "API"** in the settings menu
5. **Scroll down to "Project API keys"**
6. **Copy the "service_role" key** (it's the long one, not the anon key)

## Step 2: Add Service Role Key to .env.local

Add this line to your `.env.local` file:

```bash
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

Your `.env.local` should look like this:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://hpnewqkvpnthpohvxcmq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_KEY_HERE.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2NjA0MTgsImV4cCI6MjA3NjIzNjQxOH0.UMmriJb5HRr9W_56GilNNDWksvlFEb1V9c_PuBK-H3s
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Existing Firebase Configuration (keep for migration period)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=fir-demo-project-adffb.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=fir-demo-project-adffb
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=fir-demo-project-adffb.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=76366138630
NEXT_PUBLIC_FIREBASE_APP_ID=1:76366138630:web:0f3381c2f5a62e0401e287
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XZ5VKFGG4Y

# Admin Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h
INITIAL_ADMIN_EMAIL=admin@example.com
INITIAL_ADMIN_PASSWORD=your-secure-admin-password
INITIAL_ADMIN_NAME=Super Admin
INITIAL_ADMIN_ROLE=super_admin

# Test Credentials
TEST_ADMIN_EMAIL=test@example.com
TEST_ADMIN_PASSWORD=test-password

# Security Configuration
BCRYPT_SALT_ROUNDS=12
ADMIN_SESSION_TIMEOUT=86400000
MAX_LOGIN_ATTEMPTS=5
LOCKOUT_DURATION=900000
```

## Step 3: Run the Migration

After adding the service role key, run:

```bash
node migrate-with-service-role.js
```

## What This Will Do

✅ **Bypass RLS policies** - Service role key has admin access
✅ **Migrate all data** - Learning cards, categories, topics, plans
✅ **Preserve relationships** - Maintain data integrity
✅ **Handle errors gracefully** - Continue even if some data fails

## Expected Results

```
🚀 Supabase Migration with Service Role
=======================================

📋 Migrating Learning Cards...
📊 Found 5 learning cards
✅ Successfully inserted 5 learning cards

📋 Migrating Categories...
📊 Found 21 categories
✅ Successfully inserted 21 categories

📋 Migrating Topics...
📊 Found 265 topics
✅ Successfully inserted 265 topics

📋 Migrating Learning Plans...
📊 Found 7 learning plans
✅ Successfully inserted 7 learning plans

🎉 Migration completed successfully!
```

## After Migration

1. **Test the data**: Run `node test-supabase-comprehensive.js`
2. **Update API endpoints**: Replace Firebase calls with Supabase
3. **Re-enable RLS**: Add proper security policies
4. **Deploy**: Push changes to production

**Ready to proceed? Add the service role key and run the migration!**
