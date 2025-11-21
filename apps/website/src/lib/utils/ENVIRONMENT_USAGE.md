# Environment Detection Utility

A centralized utility for all APIs to determine if they're running in **TEST** or **PRODUCTION** environment.

## 📍 Location

```
apps/website/src/lib/utils/environment.ts
```

## 🚀 Quick Start

### Basic Usage

```typescript
import { isTestEnvironment, isProductionEnvironment } from '@/lib/utils/environment';

// Check environment
if (isTestEnvironment()) {
  // Test-specific logic
  console.log('Using test database');
} else if (isProductionEnvironment()) {
  // Production-specific logic
  console.log('Using production database');
}
```

### Logging Environment (for debugging)

```typescript
import { logEnvironment } from '@/lib/utils/environment';

// At the top of your API route
export async function GET() {
  logEnvironment('My API Route');
  // ... rest of your code
}
```

### Get Environment Configuration

```typescript
import { getEnvironmentConfig } from '@/lib/utils/environment';

const config = getEnvironmentConfig();
// Returns:
// {
//   environment: 'test' | 'production' | 'development',
//   isTest: boolean,
//   isProduction: boolean,
//   supabaseUrl: string,
//   supabaseAnonKey: string,
//   supabaseServiceRoleKey: string,
//   adminEmail: string,
//   adminPassword: string,
//   enableDebugLogging: boolean,
//   enableTestData: boolean,
// }
```

## 🔍 How It Works

The utility detects the environment using multiple indicators (in priority order):

1. **`NEXT_PUBLIC_APP_ENV`** - Explicit environment setting
   - `test` → Test environment
   - `production` → Production environment

2. **`NODE_ENV`** - Node.js environment
   - `test` → Test environment
   - `production` → Production environment

3. **Supabase URL** - Project reference detection
   - `vopfdukvdhnmzzjkxpnj` → Test environment (from `.env.test.local`)
   - `hpnewqkvpnthpohvxcmq` → Production environment (from `.env.local`)

## 📋 API Reference

### Functions

#### `getEnvironment(): Environment`
Returns the current environment: `'test' | 'production' | 'development'`

#### `isTestEnvironment(): boolean`
Returns `true` if running in test environment.

#### `isProductionEnvironment(): boolean`
Returns `true` if running in production environment.

#### `isDevelopmentEnvironment(): boolean`
Returns `true` if running in development environment.

#### `getSupabaseProjectRef(): string | null`
Extracts the project reference from the Supabase URL (e.g., `'vopfdukvdhnmzzjkxpnj'`).

#### `getEnvironmentInfo()`
Returns detailed environment information for debugging:
```typescript
{
  environment: 'test' | 'production' | 'development',
  isTest: boolean,
  isProduction: boolean,
  isDevelopment: boolean,
  projectRef: string | null,
  supabaseUrl: string | null,
  nodeEnv: string | undefined,
  appEnv: string | undefined,
}
```

#### `logEnvironment(context?: string): void`
Logs environment information to console (useful for debugging).

#### `assertEnvironment(expected: Environment, errorMessage?: string): void`
Throws an error if the current environment doesn't match the expected one.

#### `getEnvironmentConfig()`
Returns environment-specific configuration including database credentials and feature flags.

## 💡 Usage Examples

### Example 1: API Route with Environment Detection

```typescript
// apps/website/src/app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { isTestEnvironment, logEnvironment, getEnvironmentConfig } from '@/lib/utils/environment';

// Log environment on module load
logEnvironment('Example API');

export async function GET(request: NextRequest) {
  try {
    const config = getEnvironmentConfig();
    
    // Use environment-specific logic
    if (isTestEnvironment()) {
      console.log('🧪 Running in TEST mode');
      // Test-specific behavior
    } else {
      console.log('🚀 Running in PRODUCTION mode');
      // Production-specific behavior
    }
    
    // Use config for database operations
    const supabaseUrl = config.supabaseUrl;
    const adminEmail = config.adminEmail;
    
    return NextResponse.json({ success: true, environment: config.environment });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
```

### Example 2: Supabase Client with Environment Detection

```typescript
// apps/website/src/lib/supabase-server.ts
import { createClient } from '@supabase/supabase-js';
import { getEnvironmentConfig, logEnvironment } from '@/lib/utils/environment';

logEnvironment('Supabase Client');

export function getSupabaseClient() {
  const config = getEnvironmentConfig();
  
  if (!config.supabaseUrl || !config.supabaseServiceRoleKey) {
    throw new Error(
      `Supabase configuration missing for ${config.environment} environment`
    );
  }
  
  return createClient(config.supabaseUrl, config.supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
```

### Example 3: Conditional Logic Based on Environment

```typescript
import { isTestEnvironment, getEnvironmentConfig } from '@/lib/utils/environment';

export async function createQuestion(data: QuestionData) {
  const config = getEnvironmentConfig();
  
  // Use test data in test environment
  if (isTestEnvironment() && config.enableTestData) {
    console.log('🧪 Using test data mode');
    // Add test-specific metadata
    data.metadata = { ...data.metadata, testMode: true };
  }
  
  // Enable debug logging in non-production
  if (config.enableDebugLogging) {
    console.log('📊 Creating question:', data);
  }
  
  // ... rest of your logic
}
```

### Example 4: Assert Environment (for safety)

```typescript
import { assertEnvironment } from '@/lib/utils/environment';

export async function dangerousOperation() {
  // Only allow in test environment
  assertEnvironment('test', 'This operation is only allowed in test environment');
  
  // ... dangerous operation
}
```

## 🔧 Integration Checklist

To integrate environment detection in your API routes:

- [ ] Import the utility: `import { isTestEnvironment, logEnvironment } from '@/lib/utils/environment';`
- [ ] Add `logEnvironment('Your API Name')` at the top of your route file
- [ ] Use `isTestEnvironment()` or `getEnvironmentConfig()` for environment-specific logic
- [ ] Update Supabase client creation to use `getEnvironmentConfig()`
- [ ] Test in both test and production environments

## 📝 Environment Files

- **Test Environment**: `.env.test.local`
  - Project: `vopfdukvdhnmzzjkxpnj.supabase.co`
  - Used by: Unit tests, Integration tests, E2E tests

- **Production Environment**: `.env.local`
  - Project: `hpnewqkvpnthpohvxcmq.supabase.co`
  - Used by: Main development server, Production builds

## ⚠️ Important Notes

1. **Never mix environments**: Test APIs should never access production database
2. **Always check environment**: Use `isTestEnvironment()` before test-specific operations
3. **Log for debugging**: Use `logEnvironment()` to verify which environment is active
4. **Use config helper**: `getEnvironmentConfig()` provides all environment-specific values

## 🧪 Testing

Unit tests are available at:
```
apps/website/src/lib/utils/environment.test.ts
```

Run tests with:
```bash
npm run test:unit -- environment.test.ts
```


