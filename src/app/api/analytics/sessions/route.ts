import { NextRequest, NextResponse } from 'next/server';
import { UserAnalyticsService } from '@/lib/user-analytics-service';

/**
 * @swagger
 * /api/analytics/sessions:
 *   post:
 *     summary: Start or end a learning session
 *     tags: [Analytics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [action, userId]
 *             properties:
 *               action:
 *                 type: string
 *                 enum: [start, end]
 *                 description: Session action
 *               userId:
 *                 type: string
 *                 description: User ID
 *               sessionId:
 *                 type: string
 *                 description: Session ID (required for end action)
 *               deviceInfo:
 *                 type: object
 *                 description: Device information
 *               location:
 *                 type: object
 *                 description: Location information
 *               activitiesCompleted:
 *                 type: integer
 *                 description: Number of activities completed (for end action)
 *               questionsAnswered:
 *                 type: integer
 *                 description: Number of questions answered (for end action)
 *               topicsCompleted:
 *                 type: integer
 *                 description: Number of topics completed (for end action)
 *               cardsCompleted:
 *                 type: integer
 *                 description: Number of cards completed (for end action)
 *               plansCompleted:
 *                 type: integer
 *                 description: Number of plans completed (for end action)
 *               totalScore:
 *                 type: number
 *                 description: Total score (for end action)
 *     responses:
 *       200:
 *         description: Session action completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 session:
 *                   type: object
 *                   description: Session data
 *       400:
 *         description: Invalid request parameters
 *       500:
 *         description: Internal server error
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      action,
      userId,
      sessionId,
      deviceInfo,
      location,
      activitiesCompleted,
      questionsAnswered,
      topicsCompleted,
      cardsCompleted,
      plansCompleted,
      totalScore,
    } = body;

    if (!action || !userId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: action, userId' },
        { status: 400 }
      );
    }

    if (action === 'start') {
      const session = await UserAnalyticsService.startSession(
        userId,
        deviceInfo,
        location
      );
      return NextResponse.json({
        success: true,
        session,
      });
    } else if (action === 'end') {
      if (!sessionId) {
        return NextResponse.json(
          { success: false, error: 'sessionId is required for end action' },
          { status: 400 }
        );
      }

      const success = await UserAnalyticsService.endSession(
        sessionId,
        activitiesCompleted || 0,
        questionsAnswered || 0,
        topicsCompleted || 0,
        cardsCompleted || 0,
        plansCompleted || 0,
        totalScore || 0
      );

      if (!success) {
        return NextResponse.json(
          { success: false, error: 'Failed to end session' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Session ended successfully',
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid action. Must be "start" or "end"' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error handling session:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to handle session' },
      { status: 500 }
    );
  }
}
