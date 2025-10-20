import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// Get a specific custom plan
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data: planSnap, error } = await supabase
      .from('custom_plans')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !planSnap) {
      return NextResponse.json(
        { error: 'Custom plan not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: planSnap.id,
        ...planSnap,
      },
    });
  } catch (error) {
    console.error('Error fetching custom plan:', error);
    return NextResponse.json(
      { error: 'Failed to fetch custom plan' },
      { status: 500 }
    );
  }
}

// Update a custom plan
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updates = await request.json();

    // Check if plan exists
    const { data: planSnap, error: fetchError } = await supabase
      .from('custom_plans')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !planSnap) {
      return NextResponse.json(
        { error: 'Custom plan not found' },
        { status: 404 }
      );
    }

    // Add updatedAt timestamp
    const updatedData = {
      ...updates,
      updated_at: new Date().toISOString(),
    };

    const { error: updateError } = await supabase
      .from('custom_plans')
      .update(updatedData)
      .eq('id', id);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json({
      success: true,
      message: 'Custom plan updated successfully',
    });
  } catch (error) {
    console.error('Error updating custom plan:', error);
    return NextResponse.json(
      { error: 'Failed to update custom plan' },
      { status: 500 }
    );
  }
}

// Delete a custom plan
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if plan exists
    const { data: planSnap, error: fetchError } = await supabase
      .from('custom_plans')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !planSnap) {
      return NextResponse.json(
        { error: 'Custom plan not found' },
        { status: 404 }
      );
    }

    // Delete the plan
    const { error: deleteError } = await supabase
      .from('custom_plans')
      .delete()
      .eq('id', id);

    if (deleteError) {
      throw deleteError;
    }

    return NextResponse.json({
      success: true,
      message: 'Custom plan deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting custom plan:', error);
    return NextResponse.json(
      { error: 'Failed to delete custom plan' },
      { status: 500 }
    );
  }
}
