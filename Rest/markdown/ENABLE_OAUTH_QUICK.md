# Quick OAuth Enable Guide

Your OAuth credentials are already in `.env.local`. Now you just need to enable them in Supabase.

## 🚀 Quick Setup (Choose One Method)

### Method 1: Manual Dashboard Setup (Recommended - 2 minutes)

1. **Open Supabase Dashboard:**
   - Direct link: https://supabase.com/dashboard/project/hpnewqkvpnthpohvxcmq/auth/providers

2. **Enable Google OAuth:**
   - Find "Google" in the provider list
   - Click "Enable"
   - Enter:
     - **Client ID:** `655799372296-vd44sjnvf427est82dsa9nj029iis4b7.apps.googleusercontent.com`
     - **Client Secret:** `YOUR_GOOGLE_OAUTH_SECRET_HERE
   - Click "Save"

3. **Enable GitHub OAuth:**
   - Find "GitHub" in the provider list
   - Click "Enable"
   - Enter:
     - **Client ID:** `Ov23li2b8JZF3a68Ev9p`
     - **Client Secret:** `1762899826ca336bbb347693457d6e9bc386f8d5`
   - Click "Save"

4. **Test:**
   - Go to http://localhost:3000/auth
   - Click Google or GitHub button
   - Should work now! ✅

### Method 2: Automated Script Setup

If you prefer automation:

1. **Get Supabase Access Token:**
   - Go to: https://supabase.com/dashboard/account/tokens
   - Click "Generate new token"
   - Copy the token

2. **Add to .env.local:**

   ```bash
   echo "SUPABASE_ACCESS_TOKEN=your_token_here" >> .env.local
   ```

3. **Run the setup script:**
   ```bash
   ./enable-oauth.sh
   ```

That's it! OAuth should work after either method.
