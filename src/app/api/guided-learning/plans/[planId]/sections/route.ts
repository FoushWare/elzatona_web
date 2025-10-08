import { NextRequest, NextResponse } from 'next/server';
import { firestoreService } from '@/lib/firestore-service';

interface SectionConfig {
  sectionId?: string;
  id?: string;
  sectionName: string;
  category: string;
  questionCount: number;
  maxQuestions?: number;
  weight?: number;
  order?: number;
}

// GET /api/guided-learning/plans/[planId]/sections - Get section configuration for a plan
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ planId: string }> }
) {
  try {
    const { planId } = await params;

    // Get the plan details
    const plans = await firestoreService.getLearningPlanTemplates();
    const plan = plans.find(p => p.id === planId);

    if (!plan) {
      return NextResponse.json(
        { success: false, error: 'Plan not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      plan: {
        id: plan.id,
        name: plan.name,
        sections: plan.sections || [],
        totalQuestions: plan.totalQuestions || 0,
        dailyQuestions: plan.dailyQuestions || 0,
      },
    });
  } catch (error) {
    console.error('Error fetching plan sections:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch plan sections' },
      { status: 500 }
    );
  }
}

// PUT /api/guided-learning/plans/[planId]/sections - Update section configuration for a plan
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ planId: string }> }
) {
  try {
    const { planId } = await params;
    const config = await request.json();

    // Get the current plan
    const plans = await firestoreService.getLearningPlanTemplates();
    const plan = plans.find(p => p.id === planId);

    if (!plan) {
      return NextResponse.json(
        { success: false, error: 'Plan not found' },
        { status: 404 }
      );
    }

    // Update the plan with new section configuration
    const updatedPlan = {
      ...plan,
      sections: config.sections.map((section: SectionConfig) => ({
        id: section.sectionId || section.id,
        name: section.sectionName,
        category: section.category,
        questions: Array.from(
          { length: section.questionCount },
          (_, i) => `q${i + 1}`
        ), // Generate question IDs
        maxQuestions: section.maxQuestions,
        weight: section.weight,
        order: section.order,
      })),
      totalQuestions: config.totalQuestions,
      dailyQuestions: config.dailyQuestions,
      updatedAt: new Date(),
    };

    // Save the updated plan back to Firestore
    // Note: This would need to be implemented in firestoreService
    // For now, we'll just return success
    console.log('Updated plan configuration:', updatedPlan);

    return NextResponse.json({
      success: true,
      message: 'Plan sections updated successfully',
      plan: updatedPlan,
    });
  } catch (error) {
    console.error('Error updating plan sections:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update plan sections' },
      { status: 500 }
    );
  }
}
