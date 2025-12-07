# Quick Start: Environment Switching

**Change ONE variable, use ONE import - that's it!**

## 🎯 The Simplest Way

### 1. Set ONE Variable

In your `.env.test.local`:

```bash
APP_ENV=test
```

In your `.env.local`:

```bash
APP_ENV=production
```

### 2. Use ONE Import in APIs

```typescript
import { getApiConfig, getSupabaseConfig } from "@/lib/utils/api-config";

// Get all config (database, headers, flags, etc.)
const config = getApiConfig();

// Get Supabase client config
const supabaseConfig = getSupabaseConfig();
```

### 3. Everything Switches Automatically! ✅

- ✅ Database URLs
- ✅ API Keys
- ✅ Headers (X-Environment, X-Project-Ref)
- ✅ Feature Flags
- ✅ Timeouts
- ✅ Admin Credentials

## 📝 Complete API Example

```typescript
// apps/website/src/app/api/example/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseConfig, logApiConfig } from "@/lib/utils/api-config";

// Log on module load (optional)
logApiConfig("Example API");

export async function GET(request: NextRequest) {
  // Get config - ONE import, everything you need
  const supabaseConfig = getSupabaseConfig();

  // Create Supabase client with automatic headers
  const supabase = createClient(
    supabaseConfig.url,
    supabaseConfig.serviceRoleKey,
    {
      global: { headers: supabaseConfig.headers },
    },
  );

  // Use supabase...
  const { data } = await supabase.from("questions").select("*");

  return NextResponse.json({ data });
}
```

## 🔄 Switching Environments

**Just change `APP_ENV` in your `.env` file:**

```bash
# Switch to TEST
APP_ENV=test

# Switch to PRODUCTION
APP_ENV=production
```

**Or at runtime:**

```bash
APP_ENV=test npm run dev
APP_ENV=production npm run dev
```

## 📊 What You Get

```typescript
const config = getApiConfig();

// Returns:
{
  environment: 'test' | 'production',
  isTest: boolean,
  supabaseUrl: string,
  supabaseAnonKey: string,
  supabaseServiceRoleKey: string,
  headers: {
    'Content-Type': 'application/json',
    'X-Environment': 'test',
    'X-Project-Ref': 'vopfdukvdhnmzzjkxpnj',
  },
  adminEmail: string,
  adminPassword: string,
  enableDebugLogging: boolean,
  enableTestData: boolean,
  requestTimeout: number,
  maxRetries: number,
}
```

## 🎯 Key Benefits

1. **ONE Variable**: Just `APP_ENV` - no complex setup
2. **ONE Import**: `getApiConfig()` - single source of truth
3. **Automatic Headers**: Headers set based on environment
4. **No Manual Changes**: Everything switches automatically
5. **Type Safe**: Full TypeScript support

## 📚 More Info

- **Full Guide**: `apps/website/src/lib/utils/ENV_SWITCH_GUIDE.md`
- **Examples**: `apps/website/src/lib/utils/api-config.example.ts`
- **API Reference**: `apps/website/src/lib/utils/api-config.ts`
