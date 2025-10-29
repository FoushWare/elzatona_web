# Fix GitHub OAuth Redirect URI Error

## 🐛 Problem

GitHub OAuth is failing with: **"The redirect_uri is not associated with this application"**

## ✅ Solution

### Step 1: Go to GitHub OAuth App Settings

1. **Open**: https://github.com/settings/developers
2. **Click** on your OAuth app (Client ID: `Ov23li2b8JZF3a68Ev9p`)
3. **Scroll down** to "Authorization callback URL" section

### Step 2: Update Authorization Callback URL

In the **"Authorization callback URL"** field, you currently have:

```
http://localhost:3000/auth/callback
```

**Replace or ADD** the following URL:

```
https://hpnewqkvpnthpohvxcmq.supabase.co/auth/v1/callback
```

**Note**: GitHub allows multiple callback URLs, so you can have both:

- `http://localhost:3000/auth/callback` (for direct NextAuth)
- `https://hpnewqkvpnthpohvxcmq.supabase.co/auth/v1/callback` (for Supabase OAuth)

### Step 3: Save Changes

- Click **"Update application"** button
- Wait for GitHub to save (may take a few seconds)

### Step 4: Test

1. Go back to: http://localhost:3000/auth
2. Click **"Continue with GitHub"** button
3. Should work now! ✅

---

## 🔍 Why This Happens

When using Supabase for OAuth:

- Supabase acts as the OAuth handler
- It uses its own callback URL: `https://your-project.supabase.co/auth/v1/callback`
- This URL must be registered in GitHub as an authorized redirect URI

Your GitHub app currently only has `http://localhost:3000/auth/callback`, but Supabase needs `https://hpnewqkvpnthpohvxcmq.supabase.co/auth/v1/callback`.
