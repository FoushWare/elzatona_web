# How to Check Active Environment

Quick guide on how to determine which environment (TEST or PRODUCTION) is currently active.

## 🚀 Quick Methods

### Method 1: Run the Check Script

```bash
node scripts/check-env.js
```

This will show you:
- Current environment (TEST/PRODUCTION)
- Which project is being used
- Which environment files are loaded
- Summary of configuration

### Method 2: Check Environment Files

The environment is determined by which `.env` file is loaded (priority order):

1. **`.env.test.local`** (Highest Priority) → TEST
2. **`.env.test`** → TEST  
3. **`.env.local`** → PRODUCTION
4. **`.env`** → Default

Check which files exist:
```bash
ls -la .env*
```

### Method 3: Check Supabase URL

Look at `NEXT_PUBLIC_SUPABASE_URL`:

- `vopfdukvdhnmzzjkxpnj.supabase.co` → **TEST**
- `hpnewqkvpnthpohvxcmq.supabase.co` → **PRODUCTION**

```bash
grep "NEXT_PUBLIC_SUPABASE_URL" .env.test.local
# or
grep "NEXT_PUBLIC_SUPABASE_URL" .env.local
```

## 💻 In Code (TypeScript/JavaScript)

### Basic Check

```typescript
import { isTestEnvironment, getEnvironment } from '@/lib/utils/environment';

// Get current environment
const env = getEnvironment(); // 'test' | 'production' | 'development'

// Check if test
if (isTestEnvironment()) {
  console.log('🧪 Running in TEST mode');
}

// Check if production
if (isProductionEnvironment()) {
  console.log('🚀 Running in PRODUCTION mode');
}
```

### Get Full Environment Info

```typescript
import { getEnvironmentInfo, logEnvironment } from '@/lib/utils/environment';

// Log environment (for debugging)
logEnvironment('My API Route');

// Get detailed info
const info = getEnvironmentInfo();
console.log(info);
// {
//   environment: 'test',
//   isTest: true,
//   isProduction: false,
//   projectRef: 'vopfdukvdhnmzzjkxpnj',
//   supabaseUrl: 'https://vopfdukvdhnmzzjkxpnj.supabase.co...',
//   ...
// }
```

### Get Environment Config

```typescript
import { getEnvironmentConfig } from '@/lib/utils/environment';

const config = getEnvironmentConfig();
console.log(config.environment); // 'test' | 'production' | 'development'
console.log(config.isTest); // true | false
console.log(config.supabaseUrl); // Current Supabase URL
```

## 🔍 In API Routes

### Example: Log Environment in API

```typescript
// apps/website/src/app/api/example/route.ts
import { logEnvironment, isTestEnvironment } from '@/lib/utils/environment';

// Log on module load
logEnvironment('Example API');

export async function GET() {
  if (isTestEnvironment()) {
    console.log('🧪 Using test database');
  } else {
    console.log('🚀 Using production database');
  }
  
  // ... your code
}
```

## 📋 Environment Detection Priority

The utility checks in this order:

1. **`NEXT_PUBLIC_APP_ENV`** (explicit setting)
   - `test` → TEST
   - `production` → PRODUCTION

2. **`NODE_ENV`** (Node.js environment)
   - `test` → TEST
   - `production` → PRODUCTION

3. **Supabase URL** (project reference)
   - `vopfdukvdhnmzzjkxpnj` → TEST
   - `hpnewqkvpnthpohvxcmq` → PRODUCTION

4. **Default** → DEVELOPMENT

## 🧪 For Tests

When running tests, the environment is automatically set:

- **Unit/Integration tests**: Use `.env.test.local` → TEST
- **E2E tests**: Use `.env.test.local` → TEST
- **Development server**: Uses `.env.local` → PRODUCTION

## ⚠️ Important Notes

1. **Priority**: `.env.test.local` takes precedence over `.env.local`
2. **Tests always use test environment**: Jest and Playwright load `.env.test.local` first
3. **Development server uses production**: Unless you explicitly set `NEXT_PUBLIC_APP_ENV=test`
4. **Check before operations**: Always verify environment before destructive operations

## 🔧 Troubleshooting

### Problem: Wrong environment detected

**Solution**: Check which `.env` file is being loaded:
```bash
node scripts/check-env.js
```

### Problem: Tests using production database

**Solution**: Ensure `.env.test.local` exists and has test project URL:
```bash
grep "NEXT_PUBLIC_SUPABASE_URL" .env.test.local
# Should show: vopfdukvdhnmzzjkxpnj
```

### Problem: Development server using test database

**Solution**: Check if `.env.test.local` is being loaded first. The development server should use `.env.local` (production).

## 📚 Related Files

- **Utility**: `apps/website/src/lib/utils/environment.ts`
- **Check Script**: `scripts/check-env.js`
- **Documentation**: `apps/website/src/lib/utils/ENVIRONMENT_USAGE.md`


