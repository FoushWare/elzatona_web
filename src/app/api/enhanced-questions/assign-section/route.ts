// Assign Question to Section API Route
// v2.0 - Enhanced section assignment with limits

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-server';

// POST /api/enhanced-questions/assign-section - Assign question to section
export async function POST(request: NextRequest) {
  try {
    const { questionId, sectionId, order } = await request.json();

    if (!questionId || !sectionId) {
      return NextResponse.json(
        {
          success: false,
          error: 'questionId and sectionId are required',
        },
        { status: 400 }
      );
    }

    const success = await EnhancedQuestionService.assignQuestionToSection(
      questionId,
      sectionId,
      order
    );

    if (success) {
      return NextResponse.json({
        success: true,
        message: 'Question assigned to section successfully',
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to assign question to section',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error assigning question to section:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to assign question to section',
      },
      { status: 500 }
    );
  }
}

// DELETE /api/enhanced-questions/assign-section - Remove question from section
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const questionId = searchParams.get('questionId');

    if (!questionId) {
      return NextResponse.json(
        {
          success: false,
          error: 'questionId is required',
        },
        { status: 400 }
      );
    }

    await EnhancedQuestionService.removeQuestionFromSection(questionId);

    return NextResponse.json({
      success: true,
      message: 'Question removed from section successfully',
    });
  } catch (error) {
    console.error('Error removing question from section:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to remove question from section',
      },
      { status: 500 }
    );
  }
}
