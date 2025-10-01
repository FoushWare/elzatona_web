// v1.0 - Unified Section Questions API
// Get questions for a specific section using the unified questions system

import { NextRequest, NextResponse } from 'next/server';
import UnifiedQuestionService from '@/lib/unified-question-schema';

// GET - Get questions for a section using unified system
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sectionId: string }> }
) {
  try {
    const { sectionId } = await params;

    if (!sectionId) {
      return NextResponse.json(
        { success: false, error: 'Section ID is required' },
        { status: 400 }
      );
    }

    // Get questions from unified system filtered by learning path
    const questions = await UnifiedQuestionService.getQuestions({
      learningPath: sectionId,
      isActive: true,
    });

    return NextResponse.json({
      success: true,
      data: questions,
      count: questions.length,
      message: `Retrieved ${questions.length} questions for section ${sectionId}`,
    });
  } catch (error) {
    console.error('Unified section questions API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve section questions',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// POST - Add question to section using unified system
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ sectionId: string }> }
) {
  try {
    const { sectionId } = await params;
    const questionData = await request.json();

    if (!sectionId || !questionData) {
      return NextResponse.json(
        { success: false, error: 'Section ID and question data are required' },
        { status: 400 }
      );
    }

    // Add learning path to question data
    const questionWithLearningPath = {
      ...questionData,
      learningPath: sectionId,
      isActive: true,
    };

    const result = await UnifiedQuestionService.createQuestion(
      questionWithLearningPath
    );

    if (result.success) {
      return NextResponse.json({
        success: true,
        data: result.data,
        message: 'Question added to section successfully',
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Add question to unified section API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to add question to section',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete question from section using unified system
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ sectionId: string }> }
) {
  try {
    const { sectionId } = await params;
    const { searchParams } = new URL(request.url);
    const questionId = searchParams.get('questionId');

    if (!sectionId || !questionId) {
      return NextResponse.json(
        { success: false, error: 'Section ID and question ID are required' },
        { status: 400 }
      );
    }

    const result = await UnifiedQuestionService.deleteQuestion(questionId);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Question deleted from section successfully',
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Delete question from unified section API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete question from section',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
