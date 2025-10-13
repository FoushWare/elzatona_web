import { NextRequest, NextResponse } from 'next/server';
import { UnifiedQuestionService } from '@/lib/unified-question-schema';
import { db } from '@/lib/firebase-server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!db) {
      return NextResponse.json(
        { error: 'Database not initialized' },
        { status: 500 }
      );
    }

    const service = new UnifiedQuestionService(db);
    const question = await service.getQuestion(id);

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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updatedQuestion = await request.json();

    console.log('🔄 Updating question:', id, updatedQuestion);

    if (!db) {
      return NextResponse.json(
        { error: 'Database not initialized' },
        { status: 500 }
      );
    }

    const service = new UnifiedQuestionService(db);
    await service.updateQuestion(id, updatedQuestion);

    // Get the updated question to return
    const updatedQuestionData = await service.getQuestion(id);

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
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    console.log('🗑️ Deleting question:', id);

    if (!db) {
      return NextResponse.json(
        { error: 'Database not initialized' },
        { status: 500 }
      );
    }

    const service = new UnifiedQuestionService(db);
    await service.deleteQuestion(id);

    return NextResponse.json({
      success: true,
      message: 'Question deleted successfully',
    });
  } catch (error) {
    console.error('❌ Error deleting question:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
