# Deployment Setup - Vercel + GitHub Actions

## ✅ Current Configuration

**Deployment Method:** Both Vercel Auto-Deployments and GitHub Actions

### Active Deployments

- ✅ Vercel auto-deployment (on push to `main`)
- ✅ GitHub Actions deployment workflow (`.github/workflows/deploy-main.yml`)
  - Deploys on push to `main` branch
  - Can be manually triggered via `workflow_dispatch`

### Active (Testing Only - No Deployments)

- ✅ `ci.yml` - Runs CI tests (lint, type check, unit tests, E2E tests)
- ✅ `admin-login-tests.yml` - Runs admin authentication tests

## 🚀 How Deployments Work Now

### Production Deployments

- **Trigger:** Push to `main` branch
- **Methods:**
  - Vercel auto-deployment (automatic)
  - GitHub Actions deployment (automatic via workflow)
- **Result:** Two deployments per push (Vercel + GitHub Actions)

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

1. **Dual deployments** - Both Vercel and GitHub Actions deploy on push to `main`
2. **CI still runs** - Tests continue on every push (separate from deployments)
3. **Preview deployments** - Automatic for all PRs (Vercel only)
4. **Production deployments** - Automatic on push to `main` (both Vercel and GitHub Actions)

## 🔄 Disabling GitHub Actions Deployment

If you want to use only Vercel auto-deployments:

```bash
mv .github/workflows/deploy-main.yml .github/workflows/deploy-main.yml.disabled
```

This will stop GitHub Actions deployments while keeping Vercel auto-deployments active.
