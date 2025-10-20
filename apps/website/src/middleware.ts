import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for an API route
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Check for auth token cookie
  const authToken = request.cookies.get('auth-token');
  const userData = request.cookies.get('user-data');

  // If user is authenticated, add user data to headers for client-side access
  if (authToken && userData) {
    const response = NextResponse.next();
    response.headers.set('x-user-data', userData.value);
    return response;
  }

  return NextResponse.next();
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
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
