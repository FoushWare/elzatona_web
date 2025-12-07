// Sentry Edge Configuration
// v1.0 - Error tracking for Next.js Edge runtime (middleware, edge API routes)

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: process.env.NODE_ENV === "development",

  // Environment configuration
  environment:
    process.env.APP_ENV ||
    process.env.NEXT_PUBLIC_APP_ENV ||
    process.env.NODE_ENV ||
    "development",

  // Release tracking
  release:
    process.env.SENTRY_RELEASE ||
    process.env.NEXT_PUBLIC_SENTRY_RELEASE ||
    undefined,

  // Filter out sensitive data
  beforeSend(event, hint) {
    // Filter out errors in development/test environments if needed
    if (
      process.env.APP_ENV === "test" ||
      process.env.NEXT_PUBLIC_APP_ENV === "test"
    ) {
      return null; // Don't send errors in test environment
    }

    // Remove sensitive data from event
    if (event.request) {
      // Remove sensitive headers
      if (event.request.headers) {
        delete event.request.headers["authorization"];
        delete event.request.headers["cookie"];
      }
    }

    return event;
  },

  // Ignore specific errors
  ignoreErrors: [
    // Network errors that are not actionable
    "NetworkError",
    "Failed to fetch",
  ],
});
