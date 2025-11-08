import { NextRequest, NextResponse } from 'next/server';
import { UserAuthService } from '../../../lib/user-auth';

export async function GET(request: NextRequest) {
  try {
    // TODO: Add admin authentication check
    // const adminToken = request.headers.get('authorization');
    // if (!adminToken || !isValidAdminToken(adminToken)) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const users = await UserAuthService.getAllUsers();

    return NextResponse.json({
      success: true,
      users,
      count: users.length,
    });
  } catch (error) {
    console.error('Get users API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId, preferences, progress } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    let success = false;

    if (preferences) {
      success = await UserAuthService.updateUserPreferences(
        userId,
        preferences
      );
    }

    if (progress) {
      success = await UserAuthService.updateUserProgress(userId, progress);
    }

    if (success) {
      return NextResponse.json({
        success: true,
        message: 'User updated successfully',
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to update user' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Update user API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
