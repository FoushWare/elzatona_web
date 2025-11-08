import { NextRequest, NextResponse } from 'next/server';
import { UserAuthService } from '../../lib/user-auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, role } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // If name is provided, this is a registration request
    if (name) {
      const result = await UserAuthService.registerUser(
        email,
        password,
        name,
        role || 'user'
      );

      if (result.success) {
        return NextResponse.json({
          success: true,
          message: 'User registered successfully',
          userId: result.userId,
        });
      } else {
        return NextResponse.json(
          { success: false, error: result.error },
          { status: 400 }
        );
      }
    } else {
      // This is a login request
      const result = await UserAuthService.authenticateUser(email, password);

      if (result.success) {
        return NextResponse.json({
          success: true,
          user: result.user,
        });
      } else {
        return NextResponse.json(
          { success: false, error: result.error },
          { status: 401 }
        );
      }
    }
  } catch (error) {
    console.error('Auth API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
