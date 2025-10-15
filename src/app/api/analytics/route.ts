import { NextRequest, NextResponse } from 'next/server';
import { UserAnalyticsService } from '@/lib/user-analytics-service';

/**
 * @swagger
 * /api/analytics:
 *   get:
 *     summary: Get system-wide analytics
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: System analytics data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 analytics:
 *                   $ref: '#/components/schemas/SystemAnalytics'
 *       500:
 *         description: Internal server error
 */
export async function GET(request: NextRequest) {
  try {
    const analytics = await UserAnalyticsService.getSystemAnalytics();

    return NextResponse.json({
      success: true,
      analytics,
    });
  } catch (error) {
    console.error('Error fetching system analytics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch system analytics' },
      { status: 500 }
    );
  }
}
