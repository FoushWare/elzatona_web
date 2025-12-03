# Sentry Setup Guide

## Overview

Sentry has been integrated into the Next.js application for comprehensive error tracking and monitoring across:
- **Client-side** (browser errors, React component errors)
- **Server-side** (API routes, SSR errors)
- **Edge runtime** (middleware, edge API routes)

## Environment Variables

Add these environment variables to your `.env.local` file:

```bash
# Sentry Configuration
# Get your DSN from: https://sentry.io/settings/[your-org]/projects/[your-project]/keys/

# Public DSN (for client-side)
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/your-project-id

# Server DSN (optional, falls back to NEXT_PUBLIC_SENTRY_DSN)
SENTRY_DSN=https://your-dsn@sentry.io/your-project-id

# Organization and Project (for source maps upload)
SENTRY_ORG=your-org-slug
SENTRY_PROJECT=your-project-slug

# Release tracking (optional, useful for versioning)
NEXT_PUBLIC_SENTRY_RELEASE=1.0.0

# Debug mode (optional, for troubleshooting)
SENTRY_DEBUG=false
```

### Getting Your Sentry DSN

1. Go to [Sentry.io](https://sentry.io) and sign in
2. Create a new project or select an existing one
3. Select **Next.js** as your platform
4. Copy the DSN from the project settings
5. Add it to your `.env.local` file

## Configuration Files

### Client Configuration (`sentry.client.config.ts`)
- Tracks browser errors, React component errors
- Includes Session Replay for better error context
- Filters sensitive data (cookies, tokens, etc.)

### Server Configuration (`sentry.server.config.ts`)
- Tracks API route errors, SSR errors
- Includes Node.js profiling
- Filters sensitive data from requests

### Edge Configuration (`sentry.edge.config.ts`)
- Tracks middleware and edge API route errors
- Lightweight configuration for edge runtime

## Usage

### 1. API Routes

Wrap your API route handlers with Sentry error tracking:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { withSentryErrorHandling } from '@/lib/utils/sentry-api-wrapper';

export const GET = withSentryErrorHandling(
  async (request: NextRequest) => {
    // Your API logic here
    const data = await fetchData();
    return NextResponse.json({ success: true, data });
  },
  'GET /api/example' // Optional route name for better context
);
```

**Benefits:**
- Automatic error capture
- Request/response context included
- Performance monitoring
- Automatic error response handling

### 2. React Components

The `SentryErrorBoundary` is already added to the root layout. For additional error boundaries in specific components:

```typescript
import { SentryErrorBoundary } from '@/components/SentryErrorBoundary';

export default function MyComponent() {
  return (
    <SentryErrorBoundary
      fallback={<div>Something went wrong in this section</div>}
      onError={(error, errorInfo) => {
        // Custom error handling
        console.error('Component error:', error);
      }}
    >
      {/* Your component content */}
    </SentryErrorBoundary>
  );
}
```

### 3. Manual Error Reporting

For custom error reporting:

```typescript
import * as Sentry from '@sentry/nextjs';

try {
  // Your code
} catch (error) {
  Sentry.captureException(error, {
    tags: {
      feature: 'user-authentication',
      severity: 'high',
    },
    contexts: {
      custom: {
        userId: user.id,
        action: 'login',
      },
    },
  });
  
  // Re-throw or handle error
  throw error;
}
```

### 4. User Context

Set user context for better error tracking:

```typescript
import * as Sentry from '@sentry/nextjs';

// Set user when they log in
Sentry.setUser({
  id: user.id,
  email: user.email, // Will be filtered automatically
  username: user.username,
});

// Clear user when they log out
Sentry.setUser(null);
```

## Features

### ✅ Automatic Error Tracking
- All unhandled errors are automatically captured
- React component errors via error boundaries
- API route errors via wrapper functions

### ✅ Performance Monitoring
- Automatic transaction tracking for API routes
- Performance metrics for page loads
- Database query performance (if configured)

### ✅ Session Replay
- Automatic session replay for errors
- Helps debug user interactions leading to errors
- Configurable sampling rate

### ✅ Source Maps
- Automatic source map upload during build
- Better stack traces in production
- Hidden from client bundles for security

### ✅ Sensitive Data Filtering
- Automatic filtering of:
  - Authorization headers
  - Cookies
  - API keys
  - Passwords
  - Tokens

### ✅ Environment Detection
- Automatically detects and tags errors by environment
- Test environment errors are filtered out
- Production vs development error handling

## Testing

### Test Error Tracking

1. **Client-side error:**
```typescript
// In a React component
<button onClick={() => {
  throw new Error('Test error from client');
}}>
  Trigger Error
</button>
```

2. **API route error:**
```typescript
// In an API route
export const GET = withSentryErrorHandling(async () => {
  throw new Error('Test error from API');
}, 'GET /api/test');
```

3. **Check Sentry Dashboard:**
- Go to your Sentry project dashboard
- Navigate to "Issues"
- You should see the test errors appear

## Best Practices

1. **Use descriptive route names** when wrapping API routes
2. **Set user context** when users log in
3. **Add custom tags** for better error categorization
4. **Filter test environment** errors (already configured)
5. **Review error frequency** regularly in Sentry dashboard
6. **Set up alerts** for critical errors in Sentry

## Troubleshooting

### Errors not appearing in Sentry

1. Check that `NEXT_PUBLIC_SENTRY_DSN` is set correctly
2. Verify the DSN is valid (should start with `https://`)
3. Check browser console for Sentry initialization errors
4. Ensure you're not in test environment (errors are filtered)

### Source maps not working

1. Check that `SENTRY_ORG` and `SENTRY_PROJECT` are set
2. Verify you have a Sentry auth token (for source map upload)
3. Check build logs for source map upload errors

### Too many errors in development

- This is normal - development errors are captured for debugging
- Errors in test environment are automatically filtered
- Adjust `tracesSampleRate` if needed

## Resources

- [Sentry Next.js Documentation](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Sentry Dashboard](https://sentry.io)
- [Session Replay Documentation](https://docs.sentry.io/platforms/javascript/session-replay/)

