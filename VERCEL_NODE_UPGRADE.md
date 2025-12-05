# Vercel Node.js Upgrade Guide

## 🎯 Issue

Vercel shows warning: **"You have 7 projects using Node.js 18 or older. New builds will fail starting September 1, 2025. Upgrade to Node.js 24"**

Build failures are occurring because the project is using Node.js 18, which will be deprecated.

## ✅ Solution: Upgrade to Node.js 24

### Changes Made

1. **Updated `vercel.json`**
   - Added `functions` configuration with `nodejs24.x` runtime
   - This ensures all API routes use Node.js 24

2. **Updated `package.json`**
   - Added `engines` field specifying Node.js >=20.0.0
   - This helps Vercel and other platforms detect the required Node.js version

3. **Created `.nvmrc`**
   - Set to Node.js 20 (for local development consistency)
   - Use `nvm use` to switch to the correct version locally

## 📋 Verification Steps

### 1. Verify Vercel Configuration

After pushing these changes:

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select your project: `zatona_web`

2. **Check Project Settings**
   - Go to: Settings → General
   - Verify Node.js version shows **24.x** (or latest)

3. **Trigger a New Build**
   - Push a commit or manually trigger a deployment
   - The build should now use Node.js 24

### 2. Verify Local Development

```bash
# If using nvm, switch to Node.js 20
nvm use

# Verify Node.js version
node --version  # Should show v20.x.x or higher

# Install dependencies
npm install

# Test build
npm run build
```

## 🔧 Manual Vercel Configuration (If Needed)

If the automatic detection doesn't work:

1. **Go to Vercel Project Settings**
   - Visit: https://vercel.com/[your-project]/settings/general

2. **Set Node.js Version**
   - Find "Node.js Version" setting
   - Select **"24.x"** or **"Latest"**
   - Save changes

3. **Redeploy**
   - Go to Deployments tab
   - Click "Redeploy" on the latest deployment
   - Or push a new commit

## 📝 Files Changed

- ✅ `vercel.json` - Added Node.js 24 runtime for API functions
- ✅ `package.json` - Added engines field (Node.js >=20.0.0)
- ✅ `.nvmrc` - Created for local development (Node.js 20)

## ⚠️ Important Notes

1. **Node.js 24 vs 20**
   - Vercel recommends Node.js 24 for new projects
   - We're using Node.js 20 as minimum (compatible with 24)
   - `.nvmrc` uses 20 for local development consistency

2. **API Routes**
   - All API routes in `apps/website/src/app/api/**/*.ts` will use Node.js 24
   - This is specified in `vercel.json` functions configuration

3. **Build Process**
   - The build command (`npx nx build website`) will use Node.js 24
   - Vercel automatically uses the specified runtime version

## 🚀 Next Steps

1. ✅ Push these changes to GitHub
2. ✅ Vercel will automatically detect the new Node.js version
3. ✅ Next deployment will use Node.js 24
4. ✅ Build failures should be resolved

## 🔗 Resources

- **Vercel Node.js Documentation**: https://vercel.com/docs/functions/runtimes/node-js
- **Node.js 24 Release Notes**: https://nodejs.org/en/blog/release/v24.0.0
- **Vercel Dashboard**: https://vercel.com/dashboard

---

**Last Updated:** December 2024  
**Status:** Node.js upgrade configuration completed ✅

