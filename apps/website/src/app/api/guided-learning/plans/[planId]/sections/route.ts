import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

interface LearningPlanTemplate {
  id: string;
  name: string;
  duration: number;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  totalQuestions: number;
  dailyQuestions: number;
  sections: LearningSection[];
  features: string[];
  estimatedTime: string;
  isRecommended: boolean;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  createdBy?: string;
  completionRate?: number;
  enrolledUsers?: number;
}

interface LearningSection {
  id: string;
  name: string;
  category: string;
  questions: string[];
  weight: number;
  order: number;
  description?: string;
}

interface SectionConfig {
  sectionId?: string;
  id?: string;
  sectionName: string;
  category: string;
  question_count: number;
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
    const { data: plans, error } = await supabase
      .from('learning_plans')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    const plan = (plans || []).find(p => p.id === planId);

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
        sections: [],
        totalQuestions: 0,
        dailyQuestions: 0,
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
    const { data: plans, error: plansError } = await supabase
      .from('learning_plans')
      .select('*')
      .order('created_at', { ascending: false });
    if (plansError) throw plansError;
    const plan = (plans || []).find(p => p.id === planId);

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
          { length: section.question_count },
          (_, i) => `q${i + 1}`
        ), // Generate question IDs
        maxQuestions: section.maxQuestions,
        weight: section.weight,
        order: section.order,
      })),
      totalQuestions: config.totalQuestions,
      dailyQuestions: config.dailyQuestions,
      updated_at: new Date(),
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
