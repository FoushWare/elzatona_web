# 🔑 How to Get Supabase Service Role Key

## Step-by-Step Instructions:

### 1. Go to Supabase Dashboard

- Open: https://supabase.com/dashboard/project/hpnewqkvpnthpohvxcmq
- Make sure you're logged in to your Supabase account

### 2. Navigate to API Settings

- Click on "Settings" in the left sidebar
- Click on "API" in the settings menu

### 3. Find the Service Role Key

- Look for "Project API keys" section
- You'll see two keys:
  - **anon/public** key (this is what you already have)
  - **service_role** key (this is what you need)

### 4. Copy the Service Role Key

- Click the "Copy" button next to the service_role key
- ⚠️ **IMPORTANT**: This key has full access to your database
- Keep it secure and never commit it to version control

### 5. Add to Your .env.local

Add this line to your `.env.local` file:

```
SUPABASE_SERVICE_ROLE_KEY=your-actual-service-role-key-here
```

## What the Service Role Key Does:

- Bypasses Row Level Security (RLS) policies
- Has full read/write access to your database
- Used for server-side operations and migrations
- Required for admin operations and data seeding

## Security Note:

- Never expose this key in client-side code
- Only use it in server-side operations
- Consider rotating it periodically in production
