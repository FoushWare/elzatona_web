import { NextRequest, NextResponse } from 'next/server';
import { UserAuthService } from @/lib/user-auth';
import { sanitizeObjectServer } from @/lib/utils/sanitize-server';

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
    const body = await request.json();
    const { userId, preferences, progress } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Sanitize user ID
    const sanitizedUserId = sanitizeObjectServer({ userId }).userId;

    let success = false;

    if (preferences) {
      // Sanitize preferences object
      const sanitizedPreferences = sanitizeObjectServer(preferences);
      success = await UserAuthService.updateUserPreferences(
        sanitizedUserId,
        sanitizedPreferences
      );
    }

    if (progress) {
      // Sanitize progress object
      const sanitizedProgress = sanitizeObjectServer(progress);
      success = await UserAuthService.updateUserProgress(sanitizedUserId, sanitizedProgress);
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
