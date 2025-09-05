# Deployment Guide

This project has **two separate deployments**:

## 🌐 Main Website

- **URL**: https://great-frontend-bv4f1wvjk-foushwares-projects.vercel.app
- **Purpose**: The main Next.js application with all features
- **Configuration**: `vercel-main.json`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

## 📚 Storybook

- **URL**: https://great-frontend-pfxobsemb-foushwares-projects.vercel.app
- **Purpose**: Component documentation and testing
- **Configuration**: `vercel-storybook.json`
- **Build Command**: `npm run build-storybook`
- **Output Directory**: `storybook-static`

## 🚀 Deployment Process

### Manual Deployment

#### Deploy Main Website:

```bash
# Copy main website config
cp vercel-main.json vercel.json

# Deploy to production
vercel --prod --yes
```

#### Deploy Storybook:

```bash
# Copy Storybook config
cp vercel-storybook.json vercel.json

# Deploy to production
vercel --prod --yes
```

### Automatic Deployment (GitHub Actions)

Both deployments are automatically triggered on:

- Push to `main` branch
- Push to `develop` branch
- Pull requests to `main`

#### Workflows:

- `.github/workflows/deploy-main.yml` - Deploys main website
- `.github/workflows/deploy-storybook.yml` - Deploys Storybook

## 🔧 Configuration Files

### Main Website (`vercel-main.json`)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
```

### Storybook (`vercel-storybook.json`)

```json
{
  "buildCommand": "npm run build-storybook",
  "outputDirectory": "storybook-static",
  "framework": null,
  "installCommand": "npm install",
  "devCommand": "npm run storybook"
}
```

## 🔑 Required Secrets

For GitHub Actions to work, add these secrets to your repository:

1. `VERCEL_TOKEN` - Your Vercel API token
2. `VERCEL_ORG_ID` - Your Vercel organization ID
3. `VERCEL_MAIN_PROJECT_ID` - Main website project ID
4. `VERCEL_STORYBOOK_PROJECT_ID` - Storybook project ID

## 📝 Development

### Local Development

```bash
# Run main website
npm run dev

# Run Storybook
npm run storybook
```

### Testing

```bash
# Run all tests
npm run test:all

# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e
```

## 🔄 Switching Between Deployments

To switch between main website and Storybook deployments:

1. **For Main Website**: `cp vercel-main.json vercel.json`
2. **For Storybook**: `cp vercel-storybook.json vercel.json`
3. **Deploy**: `vercel --prod --yes`

## 📊 Monitoring

- **Main Website**: Monitor at https://vercel.com/foushwares-projects/great-frontend-hub
- **Storybook**: Monitor at https://vercel.com/foushwares-projects/great-frontend-hub

Both deployments include:

- ✅ Automatic builds on git push
- ✅ Preview deployments for PRs
- ✅ Production deployments for main branch
- ✅ Built-in analytics and monitoring
