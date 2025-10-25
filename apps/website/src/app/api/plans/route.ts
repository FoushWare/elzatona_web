import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// GET /api/plans - Get all learning plans
export async function GET(request: NextRequest) {
  try {
    // Use environment variables for Supabase credentials with fallback
    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      'https://hpnewqkvpnthpohvxcmq.supabase.co';
    const supabaseAnonKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2NjA0MTgsImV4cCI6MjA3NjIzNjQxOH0.UMmriJb5HRr9W_56GilNNDWksvlFEb1V9c_PuBK-H3s';

    console.log('🔍 API Debug: Using Supabase URL:', supabaseUrl);
    console.log('🔍 API Debug: Anon key exists:', !!supabaseAnonKey);

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data: plans, error } = await supabase
      .from('learning_plans')
      .select('*')
      .order('created_at', { ascending: true });

    console.log('🔍 API Debug: Plans query result:', {
      plansCount: plans?.length || 0,
      plans:
        plans?.map(p => ({ id: p.id, name: p.name, title: p.title })) || [],
      error: error?.message || null,
    });

    if (error) {
      console.error('❌ Error fetching plans:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to fetch plans from database',
          details: error.message,
        },
        { status: 500 }
      );
    }

    console.log(
      '✅ API Debug: Successfully returning',
      plans?.length || 0,
      'plans'
    );

    return NextResponse.json({
      success: true,
      data: plans || [],
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
