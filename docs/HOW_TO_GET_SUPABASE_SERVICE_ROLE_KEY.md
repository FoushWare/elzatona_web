# How to Get Supabase Service Role Key

## 📋 Your Project Details

- **Project Name**: zatona-web
- **Project ID**: hpnewqkvpnthpohvxcmq
- **Project URL**: https://hpnewqkvpnthpohvxcmq.supabase.co

## 🔑 Steps to Get Service Role Key

### Method 1: From Supabase Dashboard (Recommended)

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Login to your account

2. **Select Your Project**
   - Click on the project: **zatona-web**
   - Or go directly to: https://supabase.com/dashboard/project/hpnewqkvpnthpohvxcmq

3. **Navigate to API Settings**
   - In the left sidebar, click **Settings** (gear icon)
   - Click **API** in the settings menu

4. **Find Service Role Key**
   - Scroll down to the **Project API keys** section
   - Look for **`service_role`** key (NOT the `anon` key)
   - Click the **eye icon** or **"Reveal"** button to show the key
   - ⚠️ **WARNING**: This key has full access to your database. Keep it secret!

5. **Copy the Key**
   - Click the copy button next to the service role key
   - The key will look like: `YOUR_SUPABASE_KEY_HERE (very long string)

### Method 2: From Project Settings URL

Direct link to API settings:

```
https://supabase.com/dashboard/project/hpnewqkvpnthpohvxcmq/settings/api
```

## 📝 What to Do With the Key

### Option 1: Update .env.local (Recommended for Local Development)

Add or update in `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://hpnewqkvpnthpohvxcmq.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<paste-your-service-role-key-here>
ADMIN_EMAIL=<your-admin-email-here>
ADMIN_PASSWORD=<your-admin-password-here>
```

Then run:

```bash
node scripts/update-admin-password-hash.js
```

### Option 2: Use Direct Credentials (Temporary)

Run the script with credentials directly (no need to edit .env.local):

```bash
SUPABASE_URL=https://hpnewqkvpnthpohvxcmq.supabase.co \
SUPABASE_KEY=<paste-your-service-role-key-here> \
node scripts/update-admin-password-direct.js
```

## ⚠️ Security Notes

1. **Never commit the service role key to Git**
   - It's already in `.gitignore` (`.env.local` should be ignored)
   - Never share it publicly

2. **Service Role Key vs Anon Key**
   - **Service Role Key**: Full database access (use for server-side operations)
   - **Anon Key**: Limited access (use for client-side operations)
   - For admin operations, you need the **Service Role Key**

3. **Key Format**
   - Service role keys are JWT tokens
   - They start with `eyJ` (base64 encoded JSON)
   - They are very long (hundreds of characters)

## 🔍 Verify You Have the Right Key

After getting the key, you can verify it works:

```bash
SUPABASE_URL=https://hpnewqkvpnthpohvxcmq.supabase.co \
SUPABASE_KEY=<your-key> \
node scripts/check-admin-user.js
```

If it works, you'll see the admin user details. If not, you'll get an "Invalid API key" error.

## 📚 Additional Resources

- Supabase Dashboard: https://supabase.com/dashboard/project/hpnewqkvpnthpohvxcmq
- API Documentation: https://supabase.com/docs/reference/javascript/initializing
- Security Best Practices: https://supabase.com/docs/guides/api/security
