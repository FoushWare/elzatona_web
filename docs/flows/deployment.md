# Deployment Flow

## Overview

The project is deployed to **Vercel** with automatic deployments from the main branch.

## Deployment Platforms

### Vercel (Production)

- **Website:** Automatically deployed from `main` branch
- **Admin:** Can be deployed separately if needed
- **Preview Deployments:** Created for each PR

## Deployment Process

### Automatic Deployment

1. **Push to main branch**
   - Triggers GitHub Actions workflows
   - Runs tests and quality checks
   - Builds application
   - Deploys to Vercel

2. **Pull Request**
   - Creates preview deployment
   - Runs CI checks
   - Does not deploy to production

### Manual Deployment

```bash
# Build locally
bun run build

# Deploy via Vercel CLI (if installed)
vercel --prod
```

## Environment Variables

### Vercel Configuration

Set environment variables in Vercel dashboard:

1. Go to Project Settings → Environment Variables
2. Add variables for each environment:
   - Production
   - Preview
   - Development

### Required Variables

```bash
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
APP_ENV
NEXT_PUBLIC_APP_ENV
ADMIN_EMAIL
ADMIN_PASSWORD
```

### Optional Variables

```bash
NEXT_PUBLIC_SENTRY_DSN
SENTRY_AUTH_TOKEN
SENTRY_ORG
SENTRY_PROJECT
```

## Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Build successful locally
- [ ] Environment variables configured in Vercel
- [ ] Security scans passed
- [ ] Code review completed
- [ ] Documentation updated

## Post-Deployment

1. **Verify Deployment**
   - Check Vercel deployment logs
   - Test critical paths
   - Verify environment variables

2. **Monitor**
   - Check Sentry for errors
   - Monitor performance
   - Review analytics

## Rollback

If deployment fails:

1. Go to Vercel dashboard
2. Find previous successful deployment
3. Click "Promote to Production"

## Troubleshooting

### Build Failures

1. Check Vercel build logs
2. Verify environment variables
3. Test build locally: `bun run build:check`
4. Check for TypeScript errors: `bun run type-check`

### Runtime Errors

1. Check Sentry for error reports
2. Review Vercel function logs
3. Verify environment variables are set correctly
4. Check Supabase connection

## Best Practices

1. **Always test locally** before pushing
2. **Use preview deployments** for testing
3. **Monitor deployments** after release
4. **Keep environment variables** in sync
5. **Document breaking changes** before deployment
