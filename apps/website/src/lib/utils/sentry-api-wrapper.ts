// Sentry API Route Wrapper
// v1.0 - Utility to wrap API routes with Sentry error tracking

import * as Sentry from '@sentry/nextjs';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Wraps an API route handler with Sentry error tracking
 * 
 * @param handler - The API route handler function
 * @param routeName - Optional name for the route (for better error context)
 * @returns Wrapped handler with Sentry error tracking
 * 
 * @example
 * ```typescript
 * export const GET = withSentryErrorTracking(async (request: NextRequest) => {
 *   // Your API logic here
 *   return NextResponse.json({ success: true });
 * }, 'GET /api/users');
 * ```
 */
export function withSentryErrorTracking<T extends NextRequest>(
  handler: (request: T, context?: any) => Promise<NextResponse>,
  routeName?: string
) {
  return async (request: T, context?: any): Promise<NextResponse> => {
    try {
      // Add request context to Sentry
      Sentry.setContext('request', {
        method: request.method,
        url: request.url,
        pathname: request.nextUrl.pathname,
        searchParams: Object.fromEntries(request.nextUrl.searchParams),
        headers: {
          'user-agent': request.headers.get('user-agent'),
          'referer': request.headers.get('referer'),
        },
      });

      // Execute the handler
      const response = await handler(request, context);

      // Add response context
      Sentry.setContext('response', {
        status: response.status,
        statusText: response.statusText,
      });

      return response;
    } catch (error) {
      // Capture exception in Sentry
      Sentry.captureException(error, {
        tags: {
          route: routeName || request.nextUrl.pathname,
          method: request.method,
        },
        contexts: {
          request: {
            method: request.method,
            url: request.url,
            pathname: request.nextUrl.pathname,
          },
        },
      });

      // Re-throw to let Next.js handle the error
      throw error;
    }
  };
}

/**
 * Wraps an API route handler with Sentry error tracking and automatic error response
 * 
 * @param handler - The API route handler function
 * @param routeName - Optional name for the route (for better error context)
 * @returns Wrapped handler with Sentry error tracking and automatic error handling
 * 
 * @example
 * ```typescript
 * export const GET = withSentryErrorHandling(async (request: NextRequest) => {
 *   // Your API logic here
 *   return NextResponse.json({ success: true });
 * }, 'GET /api/users');
 * ```
 */
export function withSentryErrorHandling<T extends NextRequest>(
  handler: (request: T, context?: any) => Promise<NextResponse>,
  routeName?: string
) {
  return async (request: T, context?: any): Promise<NextResponse> => {
    try {
      return await withSentryErrorTracking(handler, routeName)(request, context);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Internal server error';
      const errorStack = error instanceof Error ? error.stack : undefined;

      // Log error details (already captured by Sentry)
      console.error(`❌ API Error in ${routeName || request.nextUrl.pathname}:`, {
        message: errorMessage,
        stack: errorStack,
      });

      return NextResponse.json(
        {
          success: false,
          error: errorMessage,
          details: process.env.NODE_ENV === 'development' ? errorStack : undefined,
        },
        { status: 500 }
      );
    }
  };
}

