# Local Development Environment Guide

## 🔍 Current Setup

Your dev server (`npm run dev`) is configured to use **PRODUCTION** environment:

```json
"dev": "APP_ENV=production NEXT_PUBLIC_APP_ENV=production ..."
```

This means:

- ✅ Connects to **PRODUCTION** Supabase database
- ✅ Uses production credentials from `.env.local`
- ⚠️ **Important**: Admin user must exist in production database

## 🎯 Two Options for Local Development

### Option 1: Use Production Environment (Current Setup)

**When to use**: Testing against production database, using production data

**Requirements**:

1. Ensure `.env.local` has **production** Supabase credentials:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://hpnewqkvpnthpohvxcmq.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-production-service-role-key
   ```

2. Create admin user in **production** database:

   ```bash
   # Make sure ADMIN_EMAIL and ADMIN_PASSWORD are set in .env.local
   node scripts/setup-admin-user.js
   ```

3. Login with production admin credentials

### Option 2: Use Test Environment (Recommended for Development)

**When to use**: Safe testing, development, experimenting

**Steps**:

1. **Update package.json dev script** to use test environment:

   ```json
   "dev": "APP_ENV=test NEXT_PUBLIC_APP_ENV=test NODE_ENV=development ..."
   ```

2. **Use `.env.test.local`** for test credentials:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://kiycimlsatwfqxtfprlr.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=REDACTED_TEST_KEY
   ADMIN_EMAIL=your-test-email@example.com
   ADMIN_PASSWORD=your-test-password
   ```

3. **Create admin user in test database**:

   ```bash
   # Load test environment
   dotenv -e .env.test.local -- node scripts/setup-admin-user.js
   ```

4. **Restart dev server**:
   ```bash
   npm run dev
   ```

## 🚀 Quick Fix: Create Admin User

### For Production Environment (Current)

```bash
# 1. Ensure .env.local has production credentials
# 2. Set admin credentials:
#    ADMIN_EMAIL=<your-admin-email>
#    ADMIN_PASSWORD=<your-admin-password>

# 3. Run setup script
node scripts/setup-admin-user.js
```

### For Test Environment

```bash
# 1. Ensure .env.test.local has test credentials
# 2. Set admin credentials in .env.test.local
# 3. Run setup with test environment
dotenv -e .env.test.local -- node scripts/setup-admin-user.js
```

## 🔧 Troubleshooting

### Error: "Invalid API key"

- **Cause**: Wrong Supabase service role key for the project
- **Fix**: Check that `SUPABASE_SERVICE_ROLE_KEY` matches the project in `NEXT_PUBLIC_SUPABASE_URL`

### Error: "admin_users table does not exist"

- **Cause**: Table not created in Supabase database
- **Fix**: Run the SQL migration to create the table in Supabase SQL editor

### Error: "Invalid email or password" (after creating user)

- **Cause**: Password hash mismatch or user not active
- **Fix**:
  1. Re-run `node scripts/setup-admin-user.js` to update password
  2. Check that `is_active = true` in database

### Environment Mismatch

- **Symptom**: Using production credentials but connecting to test database (or vice versa)
- **Fix**:
  1. Check `APP_ENV` in package.json dev script
  2. Verify Supabase URL matches the environment
  3. Restart dev server after changes

## 📋 Environment Variables Reference

### Production (.env.local)

```bash
APP_ENV=production
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_SUPABASE_URL=https://hpnewqkvpnthpohvxcmq.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-production-key
ADMIN_EMAIL=your-production-email@example.com
ADMIN_PASSWORD=your-production-password
JWT_SECRET=your-jwt-secret
```

### Test (.env.test.local)

```bash
APP_ENV=test
NEXT_PUBLIC_APP_ENV=test
NEXT_PUBLIC_SUPABASE_URL=https://kiycimlsatwfqxtfprlr.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-test-key
ADMIN_EMAIL=your-test-email@example.com
ADMIN_PASSWORD=your-test-password
JWT_SECRET=your-test-jwt-secret
```

## ✅ Verification Checklist

Before logging in, verify:

- [ ] Correct Supabase URL for the environment (production vs test)
- [ ] Correct service role key for that Supabase project
- [ ] Admin user exists in `admin_users` table
- [ ] Admin user has `is_active = true`
- [ ] Password hash is correct (re-run setup script if needed)
- [ ] Dev server restarted after environment changes

## 🎯 Recommended Setup

For local development, I recommend **Option 2 (Test Environment)**:

1. **Safer**: Won't affect production data
2. **Flexible**: Can reset test database easily
3. **Isolated**: Separate from production

To switch:

1. Update `package.json` dev script to use `APP_ENV=test`
2. Use `.env.test.local` for test credentials
3. Create admin user in test database
4. Restart dev server
