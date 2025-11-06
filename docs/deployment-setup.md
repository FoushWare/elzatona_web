# Deployment Setup - Vercel Only

## ✅ Current Configuration

**Deployment Method:** Vercel Auto-Deployments Only

### Disabled

- ❌ GitHub Actions deployment workflow (`.github/workflows/deploy-main.yml.disabled`)
  - This was causing duplicate deployments

### Active (Testing Only - No Deployments)

- ✅ `ci.yml` - Runs CI tests (lint, type check, unit tests, E2E tests)
- ✅ `admin-login-tests.yml` - Runs admin authentication tests

## 🚀 How Deployments Work Now

### Production Deployments

- **Trigger:** Push to `main` branch
- **Method:** Vercel auto-deployment
- **Result:** Single deployment per push (no duplicates)

### Preview Deployments

- **Trigger:** Pull requests to `main` branch
- **Method:** Vercel automatic preview deployments
- **Result:** Unique preview URL for each PR

### Testing

- **Trigger:** Push to `main`, `develop`, `test/**` branches
- **Method:** GitHub Actions CI workflows
- **Result:** Automated testing without deployment

## 📋 Vercel Configuration

### Project Settings

- **Project:** `elzatona-web`
- **Production URL:** https://elzatona-web.com
- **Auto-Deployments:** Enabled
- **Preview Deployments:** Enabled

### Deployment Settings

1. Go to Vercel Dashboard → `elzatona-web` → Settings → Git
2. Ensure "Automatic deployments from Git" is **enabled**
3. Production branch: `main`
4. Preview deployments: **enabled** for all branches

## 🔧 Manual Deployment (If Needed)

If you need to deploy manually:

```bash
# Deploy to production
vercel --prod

# Deploy preview
vercel
```

## 📊 Deployment Flow

```
Push to main branch
    ↓
Vercel detects push
    ↓
Builds application
    ↓
Deploys to production
    ↓
Single deployment ✅
```

## ⚠️ Important Notes

1. **No duplicate deployments** - Only Vercel deploys now
2. **CI still runs** - Tests continue on every push (no deployment)
3. **Preview deployments** - Automatic for all PRs
4. **Production deployments** - Automatic on push to `main`

## 🔄 Re-enabling GitHub Actions Deployment

If you need to re-enable GitHub Actions deployment:

```bash
mv .github/workflows/deploy-main.yml.disabled .github/workflows/deploy-main.yml
```

Then disable Vercel auto-deployments in the Vercel dashboard.
