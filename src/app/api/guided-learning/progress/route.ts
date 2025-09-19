import { NextRequest, NextResponse } from 'next/server';
import { guidedLearningService } from '@/lib/guided-learning-service';

// POST /api/guided-learning/progress - Start a learning plan or submit an answer
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { action, userId, planId, questionId, score, timeSpent, isCorrect } = data;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    switch (action) {
      case 'start_plan':
        if (!planId) {
          return NextResponse.json(
            { success: false, error: 'Plan ID is required' },
            { status: 400 }
          );
        }
        await guidedLearningService.startPlan(userId, planId);
        return NextResponse.json({ success: true, message: 'Plan started successfully' });

      case 'submit_answer':
        if (!planId || !questionId || score === undefined) {
          return NextResponse.json(
            { success: false, error: 'Plan ID, question ID, and score are required' },
            { status: 400 }
          );
        }
        await guidedLearningService.submitAnswer(
          userId, 
          planId, 
          questionId, 
          score, 
          timeSpent || 0, 
          isCorrect || false
        );
        return NextResponse.json({ success: true, message: 'Answer submitted successfully' });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error handling progress request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

// GET /api/guided-learning/progress - Get user progress for a plan
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const planId = searchParams.get('planId');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    if (planId) {
      // Get progress for specific plan
      const progress = await guidedLearningService.getUserProgress(userId, planId);
      return NextResponse.json({ success: true, progress });
    } else {
      // Get all user progress
      const allProgress = await guidedLearningService.getAllUserProgress(userId);
      return NextResponse.json({ success: true, progress: allProgress });
    }
  } catch (error) {
    console.error('Error fetching user progress:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user progress' },
      { status: 500 }
    );
  }
}
