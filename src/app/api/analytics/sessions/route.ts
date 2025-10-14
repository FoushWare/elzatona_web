import { NextRequest, NextResponse } from 'next/server';
import { userAnalyticsService } from '@/lib/user-analytics-service';

/**
 * POST /api/analytics/sessions
 * Start a learning session
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, userEmail, sessionType, learningPath, metadata } = body;

    if (!userId || !userEmail || !sessionType) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: userId, userEmail, sessionType',
        },
        { status: 400 }
      );
    }

    if (
      !['guided', 'freestyle', 'interview', 'practice'].includes(sessionType)
    ) {
      return NextResponse.json(
        { success: false, error: 'Invalid sessionType' },
        { status: 400 }
      );
    }

    const sessionId = await userAnalyticsService.startSession(
      userId,
      userEmail,
      sessionType,
      learningPath,
      metadata
    );

    return NextResponse.json({
      success: true,
      sessionId,
      message: 'Session started successfully',
    });
  } catch (error) {
    console.error('Start session error:', error);
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

/**
 * PUT /api/analytics/sessions/:sessionId
 * End a learning session
 */
export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const sessionId = url.pathname.split('/').pop();
    const body = await request.json();
    const { contentCompleted, totalQuestions, correctAnswers, averageScore } =
      body;

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'Session ID is required' },
        { status: 400 }
      );
    }

    await userAnalyticsService.endSession(
      sessionId,
      contentCompleted || [],
      totalQuestions || 0,
      correctAnswers || 0,
      averageScore || 0
    );

    return NextResponse.json({
      success: true,
      message: 'Session ended successfully',
    });
  } catch (error) {
    console.error('End session error:', error);
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
