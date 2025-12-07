import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-config';

interface UserWithId {
  id?: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
}

// Get current session status
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (session?.user) {
      return NextResponse.json({
        isAuthenticated: true,
        user: {
          id: (session.user as UserWithId).id || session.user.email,
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
        },
      });
    }

    return NextResponse.json({
      isAuthenticated: false,
      user: null,
    });
  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json(
      { error: 'Failed to check session' },
      { status: 500 }
    );
  }
}

// Set authentication cookie
export async function POST(request: NextRequest) {
  try {
    const { token, user } = await request.json();

    if (!token || !user) {
      return NextResponse.json(
        { error: 'Token and user data required' },
        { status: 400 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: 'Authentication cookie set',
    });

    // Set HTTP-only cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env['NODE_ENV'] === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    // Set user data cookie (non-sensitive data only)
    response.cookies.set(
      'user-data',
      JSON.stringify({
        id: user.uid,
        email: user.email,
        name: user.displayName,
        image: user.photoURL,
      }),
      {
        httpOnly: false, // Allow client-side access for display
        secure: process.env['NODE_ENV'] === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      }
    );

    return response;
  } catch (error) {
    console.error('Set auth cookie error:', error);
    return NextResponse.json(
      { error: 'Failed to set authentication cookie' },
      { status: 500 }
    );
  }
}

// Clear authentication cookie
export async function DELETE(request: NextRequest) {
  try {
    const response = NextResponse.json({
      success: true,
      message: 'Authentication cookie cleared',
    });

    // Clear HTTP-only cookie
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env['NODE_ENV'] === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    });

    // Clear user data cookie
    response.cookies.set('user-data', '', {
      httpOnly: false,
      secure: process.env['NODE_ENV'] === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Clear auth cookie error:', error);
    return NextResponse.json(
      { error: 'Failed to clear authentication cookie' },
      { status: 500 }
    );
  }
}
