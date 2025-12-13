// Sentry Client Configuration
// v1.0 - Error tracking for Next.js client-side

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: process.env.NODE_ENV === "development",

  // Enable Replay for better error context
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 0.1,

  // Filter out sensitive data
  beforeSend(event, _hint) {
    // Filter out errors in development/test environments if needed
    if (process.env.NEXT_PUBLIC_APP_ENV === "test") {
      return null; // Don't send errors in test environment
    }

    // Remove sensitive data from event
    if (event.request) {
      // Remove sensitive headers
      if (event.request.headers) {
        delete event.request.headers["authorization"];
        delete event.request.headers["cookie"];
      }

      // Remove sensitive query params
      if (event.request.query_string) {
        const queryParams = new URLSearchParams(event.request.query_string);
        queryParams.delete("token");
        queryParams.delete("api_key");
        event.request.query_string = queryParams.toString();
      }
    }

    return event;
  },

  // Environment configuration
  environment:
    process.env.NEXT_PUBLIC_APP_ENV || process.env.NODE_ENV || "development",

  // Release tracking
  release: process.env.NEXT_PUBLIC_SENTRY_RELEASE || undefined,

  // Integrations
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
    Sentry.browserTracingIntegration(),
  ],

  // Ignore specific errors
  ignoreErrors: [
    // Browser extensions
    "top.GLOBALS",
    "originalCreateNotification",
    "canvas.contentDocument",
    "MyApp_RemoveAllHighlights",
    "atomicFindClose",
    "fb_xd_fragment",
    "bmi_SafeAddOnload",
    "EBCallBackMessageReceived",
    "conduitPage",
    // Network errors that are not actionable
    "NetworkError",
    "Network request failed",
    "Failed to fetch",
    // Chrome extensions
    "chrome-extension://",
    "moz-extension://",
  ],
});
