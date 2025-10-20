// v1.0 - Questions Count API Route
// Fast endpoint to get just the total count of questions

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// GET /api/questions/count - Get total count of questions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    // Build query
    let query = supabase
      .from('questions')
      .select('*', { count: 'exact', head: true });

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    // Get count efficiently
    const { count, error } = await query;

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: {
        totalCount: count || 0,
        category: category || 'all',
      },
    });
  } catch (error) {
    console.error('Error fetching question count:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch question count' },
      { status: 500 }
    );
  }
}
