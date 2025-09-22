import { NextRequest, NextResponse } from 'next/server';
import { guidedLearningService } from '@/lib/guided-learning-service';

// GET /api/guided-learning/plans/[planId] - Get a specific learning plan
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ planId: string }> }
) {
  try {
    const { planId } = await params;
    const plan = await guidedLearningService.getPlan(planId);
    
    if (!plan) {
      return NextResponse.json(
        { success: false, error: 'Plan not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, plan });
  } catch (error) {
    console.error('Error fetching learning plan:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch learning plan' },
      { status: 500 }
    );
  }
}

// PUT /api/guided-learning/plans/[planId] - Update a learning plan
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ planId: string }> }
) {
  try {
    const { planId } = await params;
    const updates = await request.json();
    await guidedLearningService.updatePlan(planId, updates);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating learning plan:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update learning plan' },
      { status: 500 }
    );
  }
}

// DELETE /api/guided-learning/plans/[planId] - Delete a learning plan
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ planId: string }> }
) {
  try {
    const { planId } = await params;
    // For now, we'll just deactivate the plan instead of deleting it
    await guidedLearningService.updatePlan(planId, { isActive: false });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting learning plan:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete learning plan' },
      { status: 500 }
    );
  }
}
