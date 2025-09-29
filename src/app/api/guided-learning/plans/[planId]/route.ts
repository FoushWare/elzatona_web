import { NextResponse } from 'next/server';
import { firestoreService } from '@/lib/firestore-service';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ planId: string }> }
) {
  try {
    const { planId } = await params;

    if (!planId) {
      return NextResponse.json({ success: false, error: 'Plan ID is required' }, { status: 400 });
    }

    // Get the plan from Firestore
    const plan = await firestoreService.getLearningPlanTemplate(planId);

    if (!plan) {
      return NextResponse.json({ success: false, error: 'Plan not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: plan });
  } catch (error: any) {
    console.error('Error fetching plan:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ planId: string }> }
) {
  try {
    const { planId } = await params;
    const updateData = await request.json();

    if (!planId) {
      return NextResponse.json({ success: false, error: 'Plan ID is required' }, { status: 400 });
    }

    // Update the plan in Firestore
    await firestoreService.updateLearningPlanTemplate(planId, updateData);

    return NextResponse.json({ success: true, message: 'Plan updated successfully' });
  } catch (error: any) {
    console.error('Error updating plan:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}