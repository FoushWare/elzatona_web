# Get Supabase Service Role Key

## Step 1: Get Your Service Role Key

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project: `hpnewqkvpnthpohvxcmq`
3. Click **"Settings"** in the left sidebar
4. Click **"API"** in the settings menu
5. Scroll down to **"Project API keys"**
6. Copy the **"service_role"** key (it's the long one, not the anon key)

## Step 2: Add to .env.local

Add this line to your `.env.local` file:

```bash
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## Step 3: Run Migration

After adding the service role key, run:

```bash
node migrate-with-service-role.js
```

This will bypass all RLS policies and migrate your data successfully!
