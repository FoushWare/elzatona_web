# Sentry Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### 1. Get Your Sentry DSN

1. Go to [sentry.io](https://sentry.io) and sign in
2. Create a new project → Select **Next.js**
3. Copy the DSN (looks like: `https://xxx@xxx.ingest.sentry.io/xxx`)

### 2. Add Environment Variables

Add to your `.env.local`:

```bash
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/your-project-id
SENTRY_ORG=your-org-slug
SENTRY_PROJECT=your-project-slug
```

### 3. That's It! 🎉

Sentry is now automatically tracking:

- ✅ Client-side errors (React components, browser errors)
- ✅ Server-side errors (API routes, SSR)
- ✅ Edge runtime errors (middleware)

## 📝 Using Sentry in API Routes

### Option 1: Automatic Error Handling (Recommended)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { withSentryErrorHandling } from '@/lib/utils/sentry-api-wrapper';

export const GET = withSentryErrorHandling(
  async (request: NextRequest) => {
    // Your code here - errors are automatically captured!
    const data = await fetchData();
    return NextResponse.json({ success: true, data });
  },
  'GET /api/my-route' // Optional: helps identify the route in Sentry
);
```

### Option 2: Manual Error Tracking

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { withSentryErrorTracking } from '@/lib/utils/sentry-api-wrapper';

export const GET = withSentryErrorTracking(async (request: NextRequest) => {
  try {
    const data = await fetchData();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    // Error is automatically sent to Sentry
    // You handle the response
    return NextResponse.json(
      { error: 'Custom error message' },
      { status: 500 }
    );
  }
}, 'GET /api/my-route');
```

## 🎯 Common Use Cases

### Track User Actions

```typescript
import * as Sentry from '@sentry/nextjs';

// Set user context when they log in
Sentry.setUser({
  id: user.id,
  username: user.username,
});

// Add custom context
Sentry.setContext('checkout', {
  cartId: cart.id,
  total: cart.total,
});
```

### Manual Error Reporting

```typescript
import * as Sentry from '@sentry/nextjs';

try {
  // Risky operation
} catch (error) {
  Sentry.captureException(error, {
    tags: {
      feature: 'payment',
      severity: 'high',
    },
  });
}
```

## 🔍 Viewing Errors

1. Go to [sentry.io](https://sentry.io)
2. Select your project
3. Navigate to **Issues** to see all errors
4. Click on an error to see:
   - Stack trace
   - User context
   - Request details
   - Session replay (if enabled)

## ⚙️ Configuration

All configuration is in:

- `apps/website/sentry.client.config.ts` - Client-side
- `apps/website/sentry.server.config.ts` - Server-side
- `apps/website/sentry.edge.config.ts` - Edge runtime

## 📚 Full Documentation

See [SENTRY_SETUP.md](./SENTRY_SETUP.md) for complete documentation.
