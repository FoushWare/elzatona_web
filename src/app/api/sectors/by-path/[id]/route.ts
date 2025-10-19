import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: pathId } = await params;

    if (!pathId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Path ID is required',
        },
        { status: 400 }
      );
    }

    // Fetch sectors for the specific learning path
    const { data: sectorsData, error } = await supabase
      .from('sectors')
      .select('*')
      .eq('path_id', pathId)
      .order('order_index', { ascending: true });

    if (error) {
      throw error;
    }

    const sectors = sectorsData || [];

    return NextResponse.json({
      success: true,
      data: sectors,
    });
  } catch (error) {
    console.error('Error fetching sectors:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch sectors',
      },
      { status: 500 }
    );
  }
}
