# Storybook Deployment Guide

## 🚀 Deploying to Vercel

This project is configured to deploy Storybook to Vercel alongside the main application.

### Prerequisites

1. **Vercel Account**: Make sure you have a Vercel account
2. **Vercel CLI**: Install Vercel CLI globally
   ```bash
   npm install -g vercel
   ```

### Deployment Steps

#### Option 1: Deploy via Vercel CLI (Recommended)

1. **Login to Vercel**:
   ```bash
   vercel login
   ```

2. **Deploy Storybook**:
   ```bash
   vercel --prod
   ```

3. **Follow the prompts**:
   - Choose your Vercel account
   - Link to existing project or create new one
   - Vercel will automatically detect the Storybook configuration

#### Option 2: Deploy via Vercel Dashboard

1. **Connect your GitHub repository** to Vercel
2. **Configure build settings**:
   - Build Command: `npm run build-storybook`
   - Output Directory: `storybook-static`
   - Framework Preset: Other
3. **Deploy**

### Configuration Files

The following files are configured for Vercel deployment:

- `vercel.json` - Main Vercel configuration
- `.storybook/vercel.json` - Storybook-specific configuration
- `package.json` - Contains `vercel-build` script

### Environment Variables

If your Storybook uses environment variables, add them in:
1. Vercel Dashboard → Project Settings → Environment Variables
2. Or via CLI: `vercel env add VARIABLE_NAME`

### Automatic Deployment

The GitHub Actions workflow (`.github/workflows/storybook-deploy.yml`) is set up for automatic deployment on:
- Push to `main` or `develop` branches
- Pull requests to `main`

### Required Secrets

For automatic deployment, add these secrets to your GitHub repository:

1. `VERCEL_TOKEN` - Your Vercel API token
2. `VERCEL_ORG_ID` - Your Vercel organization ID  
3. `VERCEL_PROJECT_ID` - Your Vercel project ID

### Getting Vercel Credentials

1. **Vercel Token**: 
   - Go to Vercel Dashboard → Settings → Tokens
   - Create a new token

2. **Organization ID**:
   ```bash
   vercel teams list
   ```

3. **Project ID**:
   ```bash
   vercel projects list
   ```

### Local Development

Run Storybook locally:
```bash
npm run storybook
```

Build Storybook for production:
```bash
npm run build-storybook
```

### Troubleshooting

1. **Build fails**: Check that all dependencies are in `package.json`
2. **Static files not found**: Ensure `storybook-static` directory is generated
3. **Environment variables**: Make sure they're set in Vercel dashboard

### URLs

- **Local Development**: http://localhost:6006
- **Production**: https://your-project.vercel.app (after deployment)

## 🎯 Next Steps

1. Deploy to Vercel using one of the methods above
2. Share the Storybook URL with your team
3. Set up automatic deployments for continuous updates
4. Consider adding visual regression testing with Chromatic

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Storybook Deployment Guide](https://storybook.js.org/docs/react/sharing/publish-storybook)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
