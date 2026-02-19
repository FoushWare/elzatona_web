# Environment Setup Guide

## Overview

The project supports multiple environments:

- **Production** - Production Supabase database
- **Test** - Test Supabase database
- **Development** - Development Supabase database

## Environment Files

### Required Files

1. `.env.local` - Production environment (default)
2. `.env.test.local` - Test environment
3. `.env.dev.local` - Development environment

### Setup Steps

1. **Copy example files**

   ```bash
   cp .env.example .env.local
   cp .env.test.local.example .env.test.local
   cp .env.dev.local.example .env.dev.local
   ```

2. **Get Supabase Credentials**

   For each environment, you need:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

   See [docs/SECURITY.md](../SECURITY.md#how-to-get-supabase-keys) for details.

3. **Fill in Environment Variables**

   Edit each `.env.*.local` file with your credentials:

   ```bash
   # .env.local (Production)
   NEXT_PUBLIC_SUPABASE_URL=https://your-prod-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-prod-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-prod-service-role-key
   APP_ENV=production
   NEXT_PUBLIC_APP_ENV=production
   ```

## Environment Variables Reference

### Supabase Variables

| Variable                        | Description               | Required |
| ------------------------------- | ------------------------- | -------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL      | Yes      |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key    | Yes      |
| `SUPABASE_SERVICE_ROLE_KEY`     | Supabase service role key | Yes      |

### Application Variables

| Variable              | Description                                                                | Options                             | Required              |
| --------------------- | -------------------------------------------------------------------------- | ----------------------------------- | --------------------- |
| `APP_ENV`             | Application environment                                                    | `production`, `test`, `development` | Yes                   |
| `NEXT_PUBLIC_APP_ENV` | Public app environment                                                     | `production`, `test`, `development` | Yes                   |
| `NODE_ENV`            | Node environment                                                           | `development`, `production`         | Yes                   |
| `ADMIN_URL`           | Admin application URL for redirects (e.g., https://admin.elzatona-web.com) | URL string                          | No (required in prod) |

### Admin Variables

| Variable         | Description         | Required |
| ---------------- | ------------------- | -------- |
| `ADMIN_EMAIL`    | Admin user email    | Yes      |
| `ADMIN_PASSWORD` | Admin user password | Yes      |

### Optional Variables

| Variable                 | Description                   |
| ------------------------ | ----------------------------- |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry DSN for error tracking |
| `SENTRY_AUTH_TOKEN`      | Sentry auth token             |
| `SENTRY_ORG`             | Sentry organization           |
| `SENTRY_PROJECT`         | Sentry project name           |
| `VERCEL_URL`             | Vercel deployment URL         |
| `VERCEL_ENV`             | Vercel environment            |

## Switching Environments

### Using Different Environments

```bash
# Production (default)
bun run dev

# Test environment
bun run dev:test

# Development environment
bun run dev:dev
```

### Environment-Specific Scripts

All dev scripts support environment switching:

```bash
# Production
bun run dev
bun run dev:prod

# Test
bun run dev:test

# Development
bun run dev:dev

# Light mode (reduced memory)
bun run dev:light
bun run dev:light:test
bun run dev:light:dev
bun run dev:light:prod
```

## Security Notes

⚠️ **Important:**

- Never commit `.env.local`, `.env.test.local`, or `.env.dev.local` files
- These files are in `.gitignore`
- Use `.env.example` files for documentation only
- Rotate keys if they are exposed

See [docs/SECURITY.md](../SECURITY.md) for security best practices.

## For Contributors: Environment Setup

### Local Development

1. **Copy environment files:**

   ```bash
   cp .env.example .env.local
   cp .env.test.local.example .env.test.local
   cp .env.dev.local.example .env.dev.local
   ```

2. **Configure Supabase credentials** in each `.env.*.local` file.

3. **Set application variables:**
   ```bash
   # .env.local
   APP_ENV=production
   NEXT_PUBLIC_APP_ENV=production
   NODE_ENV=development
   ADMIN_URL=http://localhost:3001  # For local admin app
   ```

### Cloud Deployment (Vercel, Netlify, etc.)

When deploying to cloud platforms, set these environment variables in your provider's dashboard:

#### Required Variables

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `APP_ENV` (set to `production`)
- `NEXT_PUBLIC_APP_ENV` (set to `production`)
- `ADMIN_URL` (your production admin URL, e.g., `https://admin.yourdomain.com`)

#### Optional Variables

- `NEXT_PUBLIC_SENTRY_DSN`
- `SENTRY_AUTH_TOKEN`
- `SENTRY_ORG`
- `SENTRY_PROJECT`

### Admin App Configuration

If deploying the admin app separately:

1. Set `ADMIN_URL` to the admin app's production URL
2. Ensure the admin app has its own environment variables configured
3. Test the `/admin` redirect works correctly

### Testing Environment Variables

Run these commands to verify your setup:

```bash
# Check if variables are loaded
bun run verify:env

# Test admin redirect (if admin app is running)
curl -I http://localhost:3000/admin
```
