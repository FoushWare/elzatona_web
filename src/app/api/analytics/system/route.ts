import { NextRequest, NextResponse } from 'next/server';
import { UserAnalyticsService } from '@/lib/user-analytics-service';

/**
 * GET /api/analytics/system
 * Get system-wide analytics
 */
export async function GET(request: NextRequest) {
  try {
    const analytics = await UserAnalyticsService.getSystemAnalytics();

    return NextResponse.json({
      success: true,
      analytics,
    });
  } catch (error) {
    console.error('Get system analytics error:', error);
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
