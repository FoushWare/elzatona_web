# Update .env.local File

## 📋 Required Updates

Update your `.env.local` file with the following production credentials:

```bash
# Supabase Production Configuration
NEXT_PUBLIC_SUPABASE_URL=https://hpnewqkvpnthpohvxcmq.supabase.co
SUPABASE_SERVICE_ROLE_KEY=SUPABASE_SERVICE_ROLE_KEY_REDACTED

# Admin Credentials
ADMIN_EMAIL=afouadsoftwareengineer@gmail.com
ADMIN_PASSWORD=ZatonaFoushware$12

# Fix the typo: Change ADMAIN_EMAIL to ADMIN_EMAIL
# (Remove the line with ADMAIN_EMAIL if it exists)
```

## 🔧 What to Change

1. **Update Supabase URL** (if it's currently pointing to test):

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://hpnewqkvpnthpohvxcmq.supabase.co
   ```

2. **Update Service Role Key**:

   ```bash
   SUPABASE_SERVICE_ROLE_KEY=SUPABASE_SERVICE_ROLE_KEY_REDACTED
   ```

3. **Fix the typo** - Change `ADMAIN_EMAIL` to `ADMIN_EMAIL`:

   ```bash
   # Remove this line (typo):
   ADMAIN_EMAIL=afouadsoftwareengineer@gmail.com

   # Add this line (correct):
   ADMIN_EMAIL=afouadsoftwareengineer@gmail.com
   ```

4. **Update Admin Password** (if different):
   ```bash
   ADMIN_PASSWORD=ZatonaFoushware$12
   ```

## ✅ After Updating

1. Save the `.env.local` file
2. Restart your dev server if it's running
3. Try logging in at: http://localhost:3000/admin/login

## 🔍 Verify Configuration

After updating, you can verify with:

```bash
node scripts/diagnose-admin-issue.js
```

This will show you if the configuration is correct.
