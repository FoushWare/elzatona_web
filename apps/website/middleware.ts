import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Helper to dynamically determine the Admin URL based on the incoming request host
function getAdminTargetUrl(request: NextRequest): string | null {
  // Always prioritize the environment variable, but ONLY if it is NOT configured
  // to loop back to the same website domain.
  if (
    process.env["ADMIN_URL"] &&
    !process.env["ADMIN_URL"].includes("elzatona-web.com")
  ) {
    return process.env["ADMIN_URL"].replace(/\/+$/, ""); // Trim trailing slashes
  }

  const host = request.headers.get("host") || "";

  // Local development fallback
  if (host.includes("localhost") || host.includes("127.0.0.1")) {
    return "http://localhost:3001";
  }

  // In production, we MUST have ADMIN_URL set.
  // Returning null here will trigger an error response instead of a private DNS leak.
  return null;
}

export function middleware(request: NextRequest): NextResponse | Response {
  const { pathname, search } = request.nextUrl;

  // Handle /admin proxying with loop detection
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const adminUrl = getAdminTargetUrl(request);

    if (!adminUrl) {
      const hasAdminUrl = !!process.env["ADMIN_URL"];
      const hasAdminUrlDot = !!process.env.ADMIN_URL;
      const envKeys = Object.keys(process.env).join(", ");

      console.error(
        `❌ [Middleware] ADMIN_URL is missing or invalid. hasAdminUrl: ${hasAdminUrl}, hasAdminUrlDot: ${hasAdminUrlDot}, host: ${request.headers.get("host")}`,
      );

      const adminRelatedKeys = Object.keys(process.env)
        .filter((k) => k.toLowerCase().includes("admin"))
        .join(", ");

      return new Response(
        `Admin configuration error: ADMIN_URL is not set or is invalid in Vercel environment variables.\n\n` +
          `Debug Info:\n` +
          `- hasAdminUrl (bracket): ${hasAdminUrl}\n` +
          `- hasAdminUrl (dot): ${hasAdminUrlDot}\n` +
          `- ADMIN_URL_VALUE: ${process.env["ADMIN_URL"] || "UNDEFINED"}\n` +
          `- ADMIN_URL_HIDDEN_CHAR_CHECK: ${process.env["ADMIN_URL"]?.length || 0} chars\n` +
          `- Current Host: ${request.headers.get("host")}\n` +
          `- Env Keys (count): ${Object.keys(process.env).length}\n` +
          `- ADMIN_URL_IN_KEYS: ${Object.keys(process.env).includes("ADMIN_URL")}\n` +
          `- Keys containing 'admin': ${adminRelatedKeys || "none"}`,
        {
          status: 502,
          headers: {
            "x-mw-debug-has-admin-url": String(hasAdminUrl),
            "x-mw-debug-host": request.headers.get("host") || "unknown",
          },
        },
      );
    }

    // Check for loop-detection header
    if (request.headers.get("x-elzatona-proxied") === "true") {
      return NextResponse.next();
    }

    try {
      // Prepare the proxy URL
      const url = new URL(pathname + search, adminUrl);

      // Prepare headers for propagation
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-elzatona-proxied", "true");

      // CRITICAL: Set Host header to the target host for Vercel routing
      requestHeaders.set("host", url.host);

      // Remove headers that might cause the target to reject the request
      requestHeaders.delete("x-forwarded-host");
      requestHeaders.delete("x-vercel-forwarded-for");

      // Clean up the debug headers so they don't pollute the proxied request
      requestHeaders.delete("x-mw-debug-pathname");
      requestHeaders.delete("x-mw-debug-host");
      requestHeaders.delete("x-mw-debug-admin-url");

      // Create the rewrite response with propagated headers
      return NextResponse.rewrite(url, {
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      console.error("Middleware rewrite error:", error);
      const fallback = NextResponse.next();
      fallback.headers.set("x-mw-debug-error", String(error));
      return fallback;
    }
  }

  const response = NextResponse.next();

  // Check if the request is for an API route
  if (request.nextUrl.pathname.startsWith("/api/")) {
    // Add security headers for API routes
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-XSS-Protection", "1; mode=block");
    return response;
  }

  // Check for auth token cookie
  const authToken = request.cookies.get("auth-token");
  const userData = request.cookies.get("user-data");

  // If user is authenticated, add user data to headers for client-side access
  if (authToken && userData) {
    response.headers.set("x-user-data", userData.value);
  }

  // Add Content Security Policy headers
  const cspHeader = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://cdn.jsdelivr.net",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
    "font-src 'self' https://fonts.gstatic.com data: https://cdn.jsdelivr.net",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://*.supabase.co https://*.vercel.app wss://*.supabase.co https://cdn.jsdelivr.net",
    "worker-src 'self' blob:",
    "frame-src 'self' https://vercel.live",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

  response.headers.set("Content-Security-Policy", cspHeader);
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=()",
  );

  response.headers.set("x-mw-debug-pathname", pathname);
  response.headers.set(
    "x-mw-debug-host",
    request.headers.get("host") || "not-set",
  );
  response.headers.set(
    "x-mw-debug-admin-url",
    process.env.ADMIN_URL || "not-set",
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
