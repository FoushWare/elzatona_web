import { NextRequest, NextResponse } from 'next/server';
import { firestoreService } from '@/lib/firestore-service';
import { autoLinkingService } from '@/lib/auto-linking-service';

// GET /api/guided-learning/plans - Get all learning plans or filtered content
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const getSections = searchParams.get('getSections') === 'true';
    const getQuestions = searchParams.get('getQuestions') === 'true';
    const category = searchParams.get('category');
    const learningPath = searchParams.get('learningPath');

    // If requesting sections for plan creation
    if (getSections) {
      const sections = await autoLinkingService.getSectionsForPlan(category || undefined, learningPath || undefined);
      return NextResponse.json({
        success: true,
        data: sections,
        count: sections.length
      });
    }

    // If requesting questions for plan creation
    if (getQuestions) {
      // This would need to be implemented based on your requirements
      // For now, return empty array
      return NextResponse.json({
        success: true,
        data: [],
        count: 0
      });
    }

    // Otherwise, get all learning plans
    const plans = await firestoreService.getLearningPlanTemplates();
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
    if (!planData.name || !planData.duration) {
      return NextResponse.json(
        { success: false, error: 'Name and duration are required' },
        { status: 400 }
      );
    }

    // Add timestamps and defaults
    const newPlan = {
      ...planData,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: planData.isActive !== undefined ? planData.isActive : true,
      completionRate: planData.completionRate || 0,
      enrolledUsers: planData.enrolledUsers || 0,
    };

    // For now, just return success since we're using mock data
    // In a real implementation, you would save to Firestore here
    console.log('Creating new plan:', newPlan);
    
    return NextResponse.json({
      success: true,
      message: 'Plan created successfully',
      plan: newPlan
    });
  } catch (error) {
    console.error('Error creating learning plan:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create learning plan' },
      { status: 500 }
    );
  }
}
