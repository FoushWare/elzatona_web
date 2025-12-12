// Sentry Server Configuration
// v1.0 - Error tracking for Next.js server-side (API routes, SSR, etc.)

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
  beforeSend(event, _hint) {
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
        delete event.request.headers["x-api-key"];
        delete event.request.headers["x-service-role-key"];
      }

      // Remove sensitive query params
      if (event.request.query_string) {
        const queryParams = new URLSearchParams(event.request.query_string);
        queryParams.delete("token");
        queryParams.delete("api_key");
        queryParams.delete("password");
        event.request.query_string = queryParams.toString();
      }

      // Remove sensitive body data
      if (event.request.data) {
        const data = event.request.data as Record<string, unknown>;
        if (typeof data === "object" && data !== null) {
          delete data.password;
          delete data.token;
          delete data.apiKey;
          delete data.serviceRoleKey;
        }
      }
    }

    // Remove sensitive user data
    if (event.user) {
      delete event.user.email;
      delete event.user.ip_address;
    }

    return event;
  },

  // Integrations
  integrations: [
    // Node.js profiling is available but requires additional setup
    // For now, we'll use default integrations
  ],

  // Ignore specific errors
  ignoreErrors: [
    // Database connection errors that are expected in development
    "ECONNREFUSED",
    "ETIMEDOUT",
    // Validation errors that are handled gracefully
    "ValidationError",
    "ZodError",
  ],
});
