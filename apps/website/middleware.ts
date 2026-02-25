import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest): NextResponse | Response {
  const { pathname, search } = request.nextUrl;

  // Handle /admin proxying with loop detection
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const adminUrl = process.env.ADMIN_URL || "http://localhost:3001";

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
      // Without this, the target project will receive the "elzatona-web.com" host
      // and reject the request with a 404.
      requestHeaders.set("host", url.host);

      // Remove headers that might cause the target to reject the request
      requestHeaders.delete("x-forwarded-host");

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
      fallback.headers.set("x-mw-debug-admin-url", adminUrl || "not-set");
      fallback.headers.set("x-mw-debug-pathname", pathname);
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
