import { NextRequest, NextResponse } from 'next/server';
import {
  userAnalyticsService,
  UserProgress,
  LearningSession,
  UserAnalytics,
  LearningInsights,
  SystemAnalytics,
} from '@/lib/user-analytics-service';

/**
 * POST /api/analytics/progress
 * Track user progress on content
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      userEmail,
      contentType,
      contentId,
      contentName,
      status,
      progress,
      timeSpent,
      score,
      metadata,
    } = body;

    if (
      !userId ||
      !userEmail ||
      !contentType ||
      !contentId ||
      !contentName ||
      !status
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Missing required fields: userId, userEmail, contentType, contentId, contentName, status',
        },
        { status: 400 }
      );
    }

    if (
      ![
        'cards',
        'plans',
        'categories',
        'topics',
        'questions',
        'frontend-tasks',
        'problem-solving',
      ].includes(contentType)
    ) {
      return NextResponse.json(
        { success: false, error: 'Invalid contentType' },
        { status: 400 }
      );
    }

    if (
      !['not-started', 'in-progress', 'completed', 'skipped'].includes(status)
    ) {
      return NextResponse.json(
        { success: false, error: 'Invalid status' },
        { status: 400 }
      );
    }

    const progressId = await userAnalyticsService.trackProgress(
      userId,
      userEmail,
      contentType,
      contentId,
      contentName,
      status,
      progress || 0,
      timeSpent || 0,
      score,
      metadata
    );

    return NextResponse.json({
      success: true,
      progressId,
      message: 'Progress tracked successfully',
    });
  } catch (error) {
    console.error('Track progress error:', error);
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
 * GET /api/analytics/progress
 * Get user progress data
 */
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const contentId = url.searchParams.get('contentId');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'userId is required' },
        { status: 400 }
      );
    }

    let progressData;

    if (contentId) {
      // Get specific content progress
      progressData = await userAnalyticsService.getUserProgress(
        userId,
        contentId
      );
    } else {
      // Get all user progress
      progressData = await userAnalyticsService.getAllUserProgress(userId);
    }

    return NextResponse.json({
      success: true,
      data: progressData,
      count: Array.isArray(progressData)
        ? progressData.length
        : progressData
          ? 1
          : 0,
    });
  } catch (error) {
    console.error('Get progress error:', error);
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
 * POST /api/analytics/sessions
 * Start a learning session
 */
export async function POST_SESSION(request: NextRequest) {
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
export async function PUT_SESSION(request: NextRequest) {
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

/**
 * GET /api/analytics/user/:userId
 * Get user analytics
 */
export async function GET_USER_ANALYTICS(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const userId = url.pathname.split('/').pop();
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

/**
 * GET /api/analytics/insights/:userId
 * Get learning insights for user
 */
export async function GET_INSIGHTS(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const userId = url.pathname.split('/').pop();

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

/**
 * GET /api/analytics/system
 * Get system-wide analytics
 */
export async function GET_SYSTEM_ANALYTICS(request: NextRequest) {
  try {
    const analytics = await userAnalyticsService.getSystemAnalytics();

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
