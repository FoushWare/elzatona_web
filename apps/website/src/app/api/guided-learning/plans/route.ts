import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import { AutoLinkingService } from '../../lib/auto-linking-service';

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
      const autoLinkingService = new AutoLinkingService();
      const sections = await autoLinkingService.getSectionsForPlan(
        category || undefined,
        learningPath || undefined
      );
      return NextResponse.json({
        success: true,
        data: sections,
        count: sections.length,
      });
    }

    // If requesting questions for plan creation
    if (getQuestions) {
      // This would need to be implemented based on your requirements
      // For now, return empty array
      return NextResponse.json({
        success: true,
        data: [],
        count: 0,
      });
    }

    // Otherwise, get all learning plans
    const { data: plans, error } = await supabase
      .from('learning_plans')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
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
      created_at: new Date(),
      updated_at: new Date(),
      is_active: planData.isActive !== undefined ? planData.isActive : true,
      completionRate: planData.completionRate || 0,
      enrolledUsers: planData.enrolledUsers || 0,
    };

    // Save to Supabase
    const { data: createdPlan, error } = await supabase
      .from('learning_plans')
      .insert(newPlan)
      .select()
      .single();
    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: 'Plan created successfully',
      plan: createdPlan,
    });
  } catch (error) {
    console.error('Error creating learning plan:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create learning plan' },
      { status: 500 }
    );
  }
}

// DELETE /api/guided-learning/plans - Delete a learning plan
export async function DELETE(request: NextRequest) {
  try {
    console.log('DELETE request received');
    const { searchParams } = new URL(request.url);
    const planId = searchParams.get('id');
    console.log('Plan ID to delete:', planId);

    if (!planId) {
      console.log('No plan ID provided');
      return NextResponse.json(
        { success: false, error: 'Plan ID is required' },
        { status: 400 }
      );
    }

    // Delete from Firestore
    console.log('Attempting to delete from Firestore...');
    await supabase.from('learningplantemplates').delete().eq('id', planId);
    console.log('Successfully deleted from Firestore');

    return NextResponse.json({
      success: true,
      message: 'Plan deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting learning plan:', error);
    return NextResponse.json(
      {
        success: false,
        error: `Failed to delete learning plan: ${error instanceof Error ? error.message : 'Unknown error'}`,
      },
      { status: 500 }
    );
  }
}
