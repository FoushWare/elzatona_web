import { NextRequest, NextResponse } from 'next/server';
import { guidedLearningService } from '@/lib/guided-learning-service';

// GET /api/guided-learning/plans - Get all learning plans
export async function GET() {
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

// POST /api/guided-learning/plans - Create or update a learning plan
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

    // If planId is provided, use createOrUpdatePlan, otherwise createPlan
    if (planData.id) {
      await guidedLearningService.createOrUpdatePlan(planData.id, planData);
      return NextResponse.json({ success: true, planId: planData.id });
    } else {
      const planId = await guidedLearningService.createPlan(planData);
      return NextResponse.json({ success: true, planId });
    }
  } catch (error) {
    console.error('Error creating/updating learning plan:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create/update learning plan' },
      { status: 500 }
    );
  }
}
