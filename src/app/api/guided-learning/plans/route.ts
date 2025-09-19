import { NextRequest, NextResponse } from 'next/server';
import { guidedLearningService } from '@/lib/guided-learning-service';

// GET /api/guided-learning/plans - Get all learning plans
export async function GET(request: NextRequest) {
  try {
    const plans = await guidedLearningService.getAllPlans();
    return NextResponse.json({ success: true, plans });
  } catch (error) {
    console.error('Error fetching learning plans:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch learning plans' },
      { status: 500 }
    );
  }
}

// POST /api/guided-learning/plans - Create a new learning plan
export async function POST(request: NextRequest) {
  try {
    const planData = await request.json();
    
    // Validate required fields
    if (!planData.name || !planData.duration || !planData.sections) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const planId = await guidedLearningService.createPlan(planData);
    return NextResponse.json({ success: true, planId });
  } catch (error) {
    console.error('Error creating learning plan:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create learning plan' },
      { status: 500 }
    );
  }
}
