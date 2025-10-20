import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// GET /api/topics/[id] - Get a specific topic
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: topicId } = await params;

    if (!topicId) {
      return NextResponse.json(
        { success: false, error: 'Topic ID is required' },
        { status: 400 }
      );
    }

    const { data: topic, error } = await supabase
      .from('topics')
      .select('*')
      .eq('id', topicId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: 'Topic not found' },
          { status: 404 }
        );
      }
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: topic,
    });
  } catch (error) {
    console.error('Error fetching topic:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch topic' },
      { status: 500 }
    );
  }
}

// PUT /api/topics/[id] - Update a specific topic
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: topicId } = await params;
    const body = await request.json();

    if (!topicId) {
      return NextResponse.json(
        { success: false, error: 'Topic ID is required' },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!body.name) {
      return NextResponse.json(
        { success: false, error: 'Topic name is required' },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData = {
      ...body,
      updated_at: new Date().toISOString(),
    };

    const { data: updatedTopic, error } = await supabase
      .from('topics')
      .update(updateData)
      .eq('id', topicId)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: 'Topic not found' },
          { status: 404 }
        );
      }
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: 'Topic updated successfully',
      data: updatedTopic,
    });
  } catch (error) {
    console.error('Error updating topic:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update topic' },
      { status: 500 }
    );
  }
}

// DELETE /api/topics/[id] - Delete a specific topic
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: topicId } = await params;

    if (!topicId) {
      return NextResponse.json(
        { success: false, error: 'Topic ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabase.from('topics').delete().eq('id', topicId);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: 'Topic deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting topic:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete topic' },
      { status: 500 }
    );
  }
}
