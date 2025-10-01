import { NextRequest, NextResponse } from 'next/server';
import { firestoreService } from '@/lib/firestore-service';

export async function GET() {
  try {
    const plans = await firestoreService.getLearningPlanTemplates();

    return NextResponse.json({
      success: true,
      data: plans,
    });
  } catch (error) {
    console.error('Error fetching learning plan templates:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch learning plan templates',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      name,
      description,
      duration,
      difficulty,
      totalQuestions,
      dailyQuestions,
      estimatedTime,
      features,
      sections,
      isRecommended,
      isActive,
    } = body;

    if (!name || !description) {
      return NextResponse.json(
        {
          success: false,
          error: 'Name and description are required',
        },
        { status: 400 }
      );
    }

    const planData = {
      id: id || `plan_${Date.now()}`,
      name,
      description,
      duration: duration || 7,
      difficulty: difficulty || 'beginner',
      totalQuestions: totalQuestions || 0,
      dailyQuestions: dailyQuestions || 5,
      estimatedTime: estimatedTime || '2-3 hours',
      features: features || [],
      sections: sections || [],
      isRecommended: isRecommended !== false,
      isActive: isActive !== false,
      createdBy: 'admin',
      usageCount: 0,
      averageRating: 0,
    };

    const plan = await firestoreService.saveLearningPlanTemplate(planData);

    return NextResponse.json({
      success: true,
      data: {
        ...planData,
        id: plan,
      },
    });
  } catch (error) {
    console.error('Error creating learning plan template:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create learning plan template',
      },
      { status: 500 }
    );
  }
}
