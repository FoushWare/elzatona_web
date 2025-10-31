import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Helper function to create Supabase client
function createSupabaseClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://hpnewqkvpnthpohvxcmq.supabase.co';
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    'YOUR_SUPABASE_KEY_HERE.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbmV3cWt2cG50aHBvaHZ4Y21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2NjA0MTgsImV4cCI6MjA3NjIzNjQxOH0.UMmriJb5HRr9W_56GilNNDWksvlFEb1V9c_PuBK-H3s';

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase credentials are missing');
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

// GET /api/plans - Get all learning plans
export async function GET(request: NextRequest) {
  try {
    console.log('🔍 API Debug: Starting GET /api/plans');

    const supabase = createSupabaseClient();
    console.log('🔍 API Debug: Supabase client created');

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
    console.error('❌ Error in GET /api/plans:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    const isFetchError =
      errorMessage.includes('fetch') || errorMessage.includes('network');

    return NextResponse.json(
      {
        success: false,
        error: isFetchError
          ? 'Failed to connect to database. Please check your network connection and Supabase configuration.'
          : 'Failed to fetch plans from database',
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}

// POST /api/plans - Create a new learning plan
export async function POST(request: NextRequest) {
  try {
    const planData = await request.json();

    const supabase = createSupabaseClient();

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
      console.error('❌ Error creating plan:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to create plan in database',
          details: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: newPlan,
      message: 'Plan created successfully',
    });
  } catch (error) {
    console.error('❌ Error in POST /api/plans:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create plan',
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
