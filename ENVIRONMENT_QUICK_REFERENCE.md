# Environment Switching - Quick Reference

**Two Simple Rules:**
1. ✅ **All tests automatically use TEST** (no action needed)
2. 🔄 **Switch dev server with one command**

## 🧪 Tests (Always TEST - Automatic)

```bash
npm run test:unit          # ✅ Always TEST
npm run test:integration   # ✅ Always TEST
npm run test:e2e           # ✅ Always TEST
```

**No configuration needed** - tests are automatically forced to use TEST environment.

## 🚀 Development Server (Manual Switch)

### Quick Commands

```bash
# TEST environment
npm run dev:test

# PRODUCTION environment (default)
npm run dev:prod
# or
npm run dev

# DEVELOPMENT environment
npm run dev:dev
```

### Or Use Set Script

```bash
# Switch to TEST
node scripts/set-env.js test

# Switch to PRODUCTION
node scripts/set-env.js production

# Switch to DEVELOPMENT
node scripts/set-env.js dev

# Check current
node scripts/set-env.js
```

## 📊 What Gets Switched

When you switch environments, **everything** changes automatically:

- ✅ Database URLs (test/production)
- ✅ API Keys
- ✅ Headers (X-Environment, X-Project-Ref)
- ✅ Feature Flags
- ✅ Timeouts
- ✅ Admin Credentials

## 💻 In APIs (One Import)

```typescript
import { getApiConfig } from '@/lib/utils/api-config';

const config = getApiConfig();
// Everything is environment-specific automatically
```

## 🎯 Summary Table

| Task | Command | Environment | Automatic? |
|------|---------|-------------|------------|
| **Tests** | `npm run test:*` | TEST | ✅ Yes |
| **Dev (Test)** | `npm run dev:test` | TEST | Manual |
| **Dev (Prod)** | `npm run dev:prod` | PRODUCTION | Manual |
| **Dev (Dev)** | `npm run dev:dev` | DEVELOPMENT | Manual |
| **Switch** | `node scripts/set-env.js <env>` | Any | Manual |

## ⚠️ Important

- **Tests are protected**: Always use TEST, even if you set `APP_ENV=production`
- **Dev server is flexible**: You can switch between TEST, PRODUCTION, and DEVELOPMENT
- **One variable**: `APP_ENV` controls everything
- **One import**: `getApiConfig()` provides all config

## 📚 Full Documentation

- **Complete Guide**: `apps/website/src/lib/utils/ENVIRONMENT_SWITCHING_COMPLETE.md`
- **Quick Start**: `apps/website/src/lib/utils/QUICK_START.md`
- **Switch Guide**: `apps/website/src/lib/utils/ENV_SWITCH_GUIDE.md`


