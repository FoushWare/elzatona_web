import { NextRequest, NextResponse } from 'next/server';
import { userAnalyticsService } from '@/lib/user-analytics-service';

/**
 * GET /api/analytics/user/[userId]
 * Get user analytics
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const url = new URL(request.url);
    const regenerate = url.searchParams.get('regenerate') === 'true';

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    let analytics;

    if (regenerate) {
      analytics = await userAnalyticsService.generateUserAnalytics(userId);
    } else {
      analytics = await userAnalyticsService.getUserAnalytics(userId);
      if (!analytics) {
        analytics = await userAnalyticsService.generateUserAnalytics(userId);
      }
    }

    return NextResponse.json({
      success: true,
      analytics,
    });
  } catch (error) {
    console.error('Get user analytics error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
