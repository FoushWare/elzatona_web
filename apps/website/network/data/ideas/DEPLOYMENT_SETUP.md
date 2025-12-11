# Deployment Setup Guide

This guide explains how to set up automatic deployments to Vercel when pushing to GitHub.

## Required GitHub Secrets

To enable automatic deployments, you need to add the following secrets to your GitHub repository:

### 1. Go to GitHub Repository Settings

- Navigate to your repository: `https://github.com/FoushWare/GreatFrontendHub`
- Click on **Settings** tab
- In the left sidebar, click on **Secrets and variables** → **Actions**

### 2. Add the following secrets:

#### `VERCEL_TOKEN`

- Go to [Vercel Dashboard](https://vercel.com/account/tokens)
- Create a new token with appropriate permissions
- Copy the token and add it as `VERCEL_TOKEN` in GitHub secrets

#### `VERCEL_ORG_ID`

- This is already configured: `team_37TwfMgTsNtHQQjY8VhXPSkx`
- Add this as `VERCEL_ORG_ID` in GitHub secrets

## Deployment URLs

Once set up, your applications will be automatically deployed to:

- **Main Website**: https://zatona-web.vercel.app
- **Storybook**: https://zatona-web-storybook.vercel.app

## How it works

1. **Push to main branch** → Triggers both deployment workflows
2. **Main Website Workflow** → Builds and deploys the Next.js application
3. **Storybook Workflow** → Builds and deploys the Storybook component library

## Manual Deployment

If you need to deploy manually:

### Main Website:

```bash
npx vercel link --project zatona-web
npx vercel --prod
```

### Storybook:

```bash
npx vercel link --project zatona-web-storybook
npx vercel --prod
```

## Troubleshooting

- Check GitHub Actions logs if deployments fail
- Ensure all secrets are properly configured
- Verify Vercel project IDs are correct
- Make sure Vercel token has appropriate permissions
