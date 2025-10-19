import { NextRequest, NextResponse } from 'next/server';
import { UserAnalyticsService } from '@/lib/user-analytics-service';

/**
 * @swagger
 * /api/analytics/progress:
 *   post:
 *     summary: Track user progress
 *     tags: [Analytics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, contentId, contentType, status]
 *             properties:
 *               userId:
 *                 type: string
 *                 description: User ID
 *               contentId:
 *                 type: string
 *                 description: Content item ID
 *               contentType:
 *                 type: string
 *                 enum: [question, category, topic, card, plan]
 *                 description: Type of content
 *               status:
 *                 type: string
 *                 enum: [not_started, in_progress, completed, skipped]
 *                 description: Progress status
 *               progress:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 100
 *                 description: Progress percentage
 *               timeSpent:
 *                 type: number
 *                 description: Time spent in seconds
 *               score:
 *                 type: number
 *                 description: Score achieved
 *               metadata:
 *                 type: object
 *                 description: Additional metadata
 *     responses:
 *       200:
 *         description: Progress tracked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 progress:
 *                   $ref: '#/components/schemas/UserProgress'
 *       400:
 *         description: Invalid request parameters
 *       500:
 *         description: Internal server error
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      contentId,
      contentType,
      status,
      progress = 0,
      timeSpent = 0,
      score,
      metadata,
    } = body;

    // Validate required fields
    if (!userId || !contentId || !contentType || !status) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Missing required fields: userId, contentId, contentType, status',
        },
        { status: 400 }
      );
    }

    // Validate contentType
    const validContentTypes = ['question', 'category', 'topic', 'card', 'plan'];
    if (!validContentTypes.includes(contentType)) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Invalid contentType. Must be one of: question, category, topic, card, plan',
        },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = [
      'not_started',
      'in_progress',
      'completed',
      'skipped',
    ];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Invalid status. Must be one of: not_started, in_progress, completed, skipped',
        },
        { status: 400 }
      );
    }

    // Track progress
    await UserAnalyticsService.trackProgress(
      userId,
      contentId,
      contentType,
      progress,
      timeSpent
    );

    return NextResponse.json({
      success: true,
      message: 'Progress tracked successfully',
    });
  } catch (error) {
    console.error('Error tracking progress:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track progress' },
      { status: 500 }
    );
  }
}
