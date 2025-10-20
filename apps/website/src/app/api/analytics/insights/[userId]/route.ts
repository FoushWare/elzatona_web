import { NextRequest, NextResponse } from 'next/server';
import { UserAnalyticsService } from '@/lib/user-analytics-service';

/**
 * @swagger
 * /api/analytics/insights/{userId}:
 *   get:
 *     summary: Get user learning insights
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User learning insights
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 insights:
 *                   $ref: '#/components/schemas/LearningInsights'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    const insights = await UserAnalyticsService.getUserInsights(userId);

    return NextResponse.json({
      success: true,
      insights,
    });
  } catch (error) {
    console.error('Error fetching user insights:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user insights' },
      { status: 500 }
    );
  }
}
