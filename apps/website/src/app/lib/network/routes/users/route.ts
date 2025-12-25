import { NextRequest, NextResponse } from "next/server";
import { UserAuthService } from "../../user-auth";
import { sanitizeObjectServer } from "../../utils/sanitize-server";
import { getUserFromRequest, isAdmin } from "../../server-auth";

export async function GET(request: NextRequest) {
  try {
    // Security: Admin authentication check
    const user = await getUserFromRequest(request);
    if (!user || !isAdmin(user)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const users = await UserAuthService.getAllUsers();

    return NextResponse.json({
      success: true,
      users,
      count: users.length,
    });
  } catch (_error) {
    // Security: Removed detailed error logging to prevent information disclosure
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, preferences, progress } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User ID is required" },
        { status: 400 },
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
        sanitizedPreferences,
      );
    }

    if (progress) {
      // Sanitize progress object
      const sanitizedProgress = sanitizeObjectServer(progress);
      success = await UserAuthService.updateUserProgress(
        sanitizedUserId,
        sanitizedProgress,
      );
    }

    if (success) {
      return NextResponse.json({
        success: true,
        message: "User updated successfully",
      });
    } else {
      return NextResponse.json(
        { success: false, error: "Failed to update user" },
        { status: 500 },
      );
    }
  } catch (_error) {
    // Security: Removed detailed error logging to prevent information disclosure
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
