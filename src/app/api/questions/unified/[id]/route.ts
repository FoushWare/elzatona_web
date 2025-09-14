// v1.0 - Individual Question API Route

import { NextRequest, NextResponse } from 'next/server';
import UnifiedQuestionService from '@/lib/unified-question-schema';

// GET /api/questions/unified/[id] - Get single question
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const question = await UnifiedQuestionService.getQuestion(params.id);

    if (!question) {
      return NextResponse.json(
        { success: false, error: 'Question not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: question,
    });
  } catch (error) {
    console.error('Error fetching question:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch question' },
      { status: 500 }
    );
  }
}

// PUT /api/questions/unified/[id] - Update single question
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json();
    await UnifiedQuestionService.updateQuestion(params.id, updates);

    return NextResponse.json({
      success: true,
      message: 'Question updated successfully',
    });
  } catch (error) {
    console.error('Error updating question:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update question' },
      { status: 500 }
    );
  }
}

// DELETE /api/questions/unified/[id] - Delete single question
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await UnifiedQuestionService.deleteQuestion(params.id);

    return NextResponse.json({
      success: true,
      message: 'Question deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting question:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete question' },
      { status: 500 }
    );
  }
}
