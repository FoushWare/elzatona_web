import { NextRequest, NextResponse } from 'next/server';
import { UnifiedQuestionService } from '@/lib/unified-question-schema';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const updatedQuestion = await request.json();

    console.log('🔄 Updating question:', id, updatedQuestion);

    await UnifiedQuestionService.updateQuestion(id, updatedQuestion);

    // Get the updated question to return
    const updatedQuestionData = await UnifiedQuestionService.getQuestion(id);

    return NextResponse.json({
      success: true,
      data: updatedQuestionData,
      message: 'Question updated successfully',
    });
  } catch (error) {
    console.error('❌ Error updating question:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    console.log('🗑️ Deleting question:', id);

    await UnifiedQuestionService.deleteQuestion(id);

    return NextResponse.json({
      success: true,
      message: 'Question deleted successfully',
    });
  } catch (error) {
    console.error('❌ Error deleting question:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}