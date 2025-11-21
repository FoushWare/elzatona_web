# Simple Environment Switching Guide

**Change ONE variable, everything switches automatically!**

## 🎯 The Simple Way

### Step 1: Set ONE Environment Variable

In your `.env.test.local` or `.env.local` file, add:

```bash
# For TEST environment
APP_ENV=test

# For PRODUCTION environment  
APP_ENV=production
```

**That's it!** The utility automatically detects this and switches everything.

### Step 2: Use the Centralized Config in APIs

In any API route, import the config utility:

```typescript
import { getApiConfig, getSupabaseConfig } from '@/lib/utils/api-config';

// Get all environment-specific configuration
const config = getApiConfig();
// Returns: { environment, supabaseUrl, headers, adminEmail, ... }

// Or get just Supabase config
const supabaseConfig = getSupabaseConfig();
```

## 📋 How It Works

### Detection Priority

The system checks in this order:

1. **`APP_ENV`** (NEW - Simplest!) ← **Use this!**
   - `test` → TEST environment
   - `production` → PRODUCTION environment

2. **`NEXT_PUBLIC_APP_ENV`** (Alternative)
   - `test` → TEST environment
   - `production` → PRODUCTION environment

3. **`NODE_ENV`** (Fallback)
   - `test` → TEST environment
   - `production` → PRODUCTION environment

4. **Supabase URL** (Last resort)
   - `vopfdukvdhnmzzjkxpnj` → TEST
   - `hpnewqkvpnthpohvxcmq` → PRODUCTION

## 💻 Usage in API Routes

### Example 1: Basic API Route

```typescript
// apps/website/src/app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getApiConfig, getSupabaseConfig, logApiConfig } from '@/lib/utils/api-config';
import { createClient } from '@supabase/supabase-js';

// Log config on module load (optional, for debugging)
logApiConfig('Example API');

export async function GET(request: NextRequest) {
  // Get all environment-specific config
  const config = getApiConfig();
  
  // Use config values
  if (config.isTest) {
    console.log('🧪 Running in TEST mode');
  }
  
  // Get Supabase client
  const supabaseConfig = getSupabaseConfig();
  const supabase = createClient(
    supabaseConfig.url,
    supabaseConfig.serviceRoleKey,
    {
      global: { headers: supabaseConfig.headers },
    }
  );
  
  // Your API logic here...
  
  return NextResponse.json({ 
    success: true,
    environment: config.environment,
  });
}
```

### Example 2: Using Headers

```typescript
import { getFetchConfig } from '@/lib/utils/api-config';

export async function POST(request: NextRequest) {
  const config = getApiConfig();
  
  // Make external API call with environment headers
  const fetchConfig = getFetchConfig({
    'Authorization': `Bearer ${config.supabaseServiceRoleKey}`,
  });
  
  const response = await fetch('https://api.example.com/data', {
    method: 'POST',
    headers: fetchConfig.headers,
    // ... other options
  });
  
  // ...
}
```

### Example 3: Environment-Specific Logic

```typescript
import { getApiConfig } from '@/lib/utils/api-config';

export async function GET() {
  const config = getApiConfig();
  
  // Environment-specific behavior
  if (config.enableTestData) {
    // Add test metadata
    return NextResponse.json({ 
      data: mockData,
      testMode: true,
    });
  }
  
  // Production behavior
  return NextResponse.json({ data: realData });
}
```

## 🔄 Switching Environments

### Method 1: Change APP_ENV (Recommended)

**In `.env.test.local`:**
```bash
APP_ENV=test
```

**In `.env.local`:**
```bash
APP_ENV=production
```

### Method 2: Set at Runtime

```bash
# Run with TEST environment
APP_ENV=test npm run dev

# Run with PRODUCTION environment
APP_ENV=production npm run dev
```

### Method 3: Use npm Scripts

```bash
# Already configured in package.json
npm run dev:test    # Sets APP_ENV=test
npm run dev:prod    # Sets APP_ENV=production
```

## 📊 What Gets Switched Automatically

When you change `APP_ENV`, the utility automatically provides:

✅ **Database Configuration**
- Correct Supabase URL
- Correct API keys
- Correct project reference

✅ **Headers**
- `X-Environment`: test/production
- `X-Project-Ref`: project identifier
- `X-Test-Mode`: true (if test)

✅ **Feature Flags**
- `enableDebugLogging`: true in test/dev
- `enableTestData`: true in test
- `enableCaching`: true in production

✅ **Timeouts & Limits**
- Longer timeouts in test (30s vs 10s)
- More retries in test (3 vs 2)

✅ **Admin Credentials**
- Test: Uses `ADMIN_EMAIL` / `ADMIN_PASSWORD`
- Production: Uses `INITIAL_ADMIN_EMAIL` / `INITIAL_ADMIN_PASSWORD`

## 🎯 Single Place to Change

All APIs import from **ONE place**:

```typescript
import { getApiConfig } from '@/lib/utils/api-config';
```

Change `APP_ENV` in your `.env` file, and **all APIs automatically switch**.

## 📝 Setup Checklist

- [ ] Add `APP_ENV=test` to `.env.test.local`
- [ ] Add `APP_ENV=production` to `.env.local`
- [ ] Import `getApiConfig()` in your API routes
- [ ] Use `getSupabaseConfig()` for Supabase clients
- [ ] Use `getFetchConfig()` for fetch calls

## 🔍 Verify It's Working

```bash
# Check current environment
node scripts/check-env.js

# Or in code
import { getApiConfig } from '@/lib/utils/api-config';
const config = getApiConfig();
console.log(config.environment); // 'test' | 'production'
```

## ⚠️ Important Notes

1. **One Variable**: Just set `APP_ENV` - everything else is automatic
2. **One Import**: Use `getApiConfig()` in all APIs - single source of truth
3. **Automatic Headers**: Headers are set automatically based on environment
4. **No Manual Switching**: No need to change multiple files or variables

## 📚 Files

- **API Config Utility**: `apps/website/src/lib/utils/api-config.ts`
- **Environment Utility**: `apps/website/src/lib/utils/environment.ts`
- **Check Script**: `scripts/check-env.js`


