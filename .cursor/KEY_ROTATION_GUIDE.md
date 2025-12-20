# Key Rotation Guide - Step by Step

## ⚠️ CRITICAL: Rotate These Keys Immediately

### 1. Supabase Service Role Key (CRITICAL)

**Exposed Key:** `process.env.SUPABASE_SERVICE_ROLE_KEY`

**Steps:**

1. Go to: https://supabase.com/dashboard
2. Select your project: `hpnewqkvpnthpohvxcmq`
3. Click **Settings** in the left sidebar
4. Click **API** in the settings menu
5. Scroll down to **Project API keys**
6. Find the **service_role** key (it's the long one, not the anon key)
7. Click **Regenerate** next to service_role key
8. **⚠️ WARNING:** This will temporarily break existing connections
9. Copy the new key
10. Update all `.env` files:
    ```bash
    SUPABASE_SERVICE_ROLE_KEY=<new-key-here>
    ```
11. Restart your application

**Files to Update:**

- `.env.local`
- `.env.production` (if exists)
- Any deployment environment variables (Vercel, etc.)

### 2. Supabase Anon Key

<<<<<<< HEAD
<<<<<<< HEAD
**Exposed Key:** `YOUR_SUPABASE_KEY_HERE.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2NjA0MTgsImV4cCI6MjA3NjIzNjQxOH0.UMmriJb5HRr9W_56GilNNDWksvlFEb1V9c_PuBK-H3s`
=======
**Exposed Key:** `YOUR_SUPABASE_KEY_HERE

> > > > > > > origin/security/fix-gitleaks-config

=======
**Exposed Key:** `YOUR_SUPABASE_KEY_HERE

>>>>>>> origin/main
**Steps:**

1. Same dashboard as above
2. Find the **anon** key
3. Click **Regenerate**
4. Copy the new key
5. Update all `.env` files:
   ```bash
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<new-key-here>
   ```
6. Restart your application

### 3. Firebase API Key

**Exposed Key:** `AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y`

**Steps:**

1. Go to: https://console.firebase.google.com/
2. Select your project: `fir-demo-project-adffb`
3. Click the gear icon ⚙️ → **Project Settings**
4. Go to **General** tab
5. Scroll down to **Your apps** section
6. Find your web app
7. Click **Regenerate** for the API key
8. Copy the new key
9. Update all `.env` files:
   ```bash
   NEXT_PUBLIC_FIREBASE_API_KEY=<new-key-here>
   ```
10. Restart your application

**Note:** You may need to update other Firebase config values too:

- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

### 4. JWT Secrets

**Exposed Secrets:**

- `elzatona-super-secret-jwt-key-2024-production-ready`
- `elzatona-nextauth-secret-2024-production-ready`

**Steps:**

1. Generate new secure secrets:

   ```bash
   # Generate a secure JWT secret (32+ characters)
   openssl rand -base64 32

   # Or use Node.js
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

2. Update all `.env` files:

   ```bash
   JWT_SECRET=<new-secret-here>
   NEXTAUTH_SECRET=<new-secret-here>
   ```

3. Restart your application

## ✅ Verification Checklist

After rotating keys:

- [ ] Supabase service_role key regenerated
- [ ] Supabase anon key regenerated
- [ ] Firebase API key regenerated
- [ ] JWT secrets regenerated
- [ ] All `.env` files updated
- [ ] Production environment variables updated (Vercel, etc.)
- [ ] Application restarted
- [ ] Authentication tested
- [ ] API calls tested
- [ ] No errors in logs

## 🔄 After Rotation

1. **Test Everything:**
   - Test user authentication
   - Test admin authentication
   - Test API endpoints
   - Test database connections

2. **Monitor:**
   - Check application logs
   - Monitor for authentication errors
   - Verify all services are working

3. **Proceed with Git History Cleanup:**
   - Once keys are rotated, proceed to remove from git history
   - See: `.cursor/scripts/remove-secrets-from-git-history.md`

## 📝 Notes

- **Rotate keys FIRST** - Don't remove from git history until keys are rotated
- **Update all environments** - Development, staging, production
- **Test thoroughly** - Make sure everything still works
- **Keep old keys temporarily** - Until you verify new keys work
- **Document new keys** - Store securely (password manager, secret manager)

## 🚨 If Something Breaks

1. **Revert to old keys temporarily** (if you saved them)
2. **Check environment variables** - Make sure they're set correctly
3. **Check application logs** - Look for authentication errors
4. **Verify key format** - Make sure no extra spaces or quotes
5. **Restart services** - Sometimes a restart is needed
