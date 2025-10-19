import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// PUT /api/questions/question-topics/[questionId]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ questionId: string }> }
) {
  try {
    const { questionId } = await params;
    const body = await request.json();
    const { topics } = body;

    if (!questionId) {
      return NextResponse.json(
        { success: false, error: 'Question ID is required' },
        { status: 400 }
      );
    }

    if (!Array.isArray(topics)) {
      return NextResponse.json(
        { success: false, error: 'Topics must be an array' },
        { status: 400 }
      );
    }

    console.log(`Updating topics for question: ${questionId}`, topics);

    const { data: questionData, error: questionError } = await supabase
      .from('questions')
      .select('*')
      .eq('id', questionId)
      .single();

    if (questionError || !questionData) {
      return NextResponse.json(
        {
          success: false,
          error: 'Question not found',
        },
        { status: 404 }
      );
    }

    // Update the question with new topics
    const { data: updatedData, error: updateError } = await supabase
      .from('questions')
      .update({
        topics: topics,
        updated_at: new Date().toISOString(),
      })
      .eq('id', questionId)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    const updatedQuestion = {
      id: updatedData.id,
      ...updatedData,
    };

    console.log(`Successfully updated topics for question: ${questionId}`);

    return NextResponse.json({
      success: true,
      data: updatedQuestion,
      message: 'Question topics updated successfully',
    });
  } catch (error) {
    console.error('Error updating question topics:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update question topics',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
