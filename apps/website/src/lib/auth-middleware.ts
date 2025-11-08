import { NextRequest, NextResponse } from 'next/server';
import { UserAuthService } from '../../../lib/user-auth';

export interface AuthMiddlewareOptions {
  requiredRole?: 'user' | 'premium_user' | 'admin' | 'super_admin';
  allowGuests?: boolean;
}

export function createAuthMiddleware(options: AuthMiddlewareOptions = {}) {
  return async function authMiddleware(request: NextRequest) {
    const { requiredRole = 'user', allowGuests = false } = options;

    try {
      // Get token from Authorization header or cookies
      const authHeader = request.headers.get('authorization');
      const token =
        authHeader?.replace('Bearer ', '') ||
        request.cookies.get('auth-token')?.value;

      if (!token) {
        if (allowGuests) {
          return NextResponse.next();
        }
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        );
      }

      // Validate token and get user info
      // In a real implementation, you would validate the JWT token here
      // For now, we'll extract user info from the token (simplified)
      const userInfo = extractUserFromToken(token);

      if (!userInfo) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }

      // Check if user has required role
      if (!UserAuthService.hasPermission(userInfo.role, requiredRole)) {
        return NextResponse.json(
          { error: 'Insufficient permissions' },
          { status: 403 }
        );
      }

      // Add user info to request headers for use in API routes
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', userInfo.id);
      requestHeaders.set('x-user-role', userInfo.role);
      requestHeaders.set('x-user-email', userInfo.email);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      console.error('Auth middleware error:', error);
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: 500 }
      );
    }
  };
}

// Helper function to extract user info from token (simplified)
function extractUserFromToken(token: string): {
  id: string;
  role: 'user' | 'premium_user' | 'admin' | 'super_admin';
  email: string;
} | null {
  try {
    // In a real implementation, you would decode and validate a JWT token here
    // For now, we'll use a simplified approach
    if (token.startsWith('token_')) {
      // Extract user info from a mock token format
      // In production, this would be a proper JWT decode
      return {
        id: 'user_123',
        role: 'user' as const,
        email: 'user@example.com',
      };
    }
    return null;
  } catch (error) {
    console.error('Token extraction error:', error);
    return null;
  }
}

// Predefined middleware functions for common use cases
export const requireAuth = createAuthMiddleware({ requiredRole: 'user' });
export const requirePremium = createAuthMiddleware({
  requiredRole: 'premium_user',
});
export const requireAdmin = createAuthMiddleware({ requiredRole: 'admin' });
export const requireSuperAdmin = createAuthMiddleware({
  requiredRole: 'super_admin',
});
export const allowGuests = createAuthMiddleware({ allowGuests: true });
