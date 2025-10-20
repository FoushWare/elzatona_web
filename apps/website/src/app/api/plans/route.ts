import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// GET /api/plans - Get all learning plans
export async function GET(request: NextRequest) {
  try {
    const { data: plans, error } = await supabase
      .from('learning_plans')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: plans,
      count: plans?.length || 0,
    });
  } catch (error) {
    console.error('Error fetching plans:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch plans' },
      { status: 500 }
    );
  }
}

// POST /api/plans - Create a new learning plan
export async function POST(request: NextRequest) {
  try {
    const planData = await request.json();

    const planWithTimestamps = {
      ...planData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: 'admin',
      updated_by: 'admin',
      is_active: true,
    };

    const { data: newPlan, error } = await supabase
      .from('learning_plans')
      .insert(planWithTimestamps)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: newPlan,
      message: 'Plan created successfully',
    });
  } catch (error) {
    console.error('Error creating plan:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create plan' },
      { status: 500 }
    );
  }
}
