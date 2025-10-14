import { NextRequest, NextResponse } from 'next/server';
import { userAnalyticsService } from '@/lib/user-analytics-service';

/**
 * GET /api/analytics/insights/[userId]
 * Get learning insights for user
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    const insights =
      await userAnalyticsService.generateLearningInsights(userId);

    return NextResponse.json({
      success: true,
      insights,
    });
  } catch (error) {
    console.error('Get insights error:', error);
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
