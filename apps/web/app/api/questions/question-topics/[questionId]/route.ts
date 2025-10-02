import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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

    if (!db) {
      return NextResponse.json(
        {
          success: false,
          error: 'Firestore not available',
        },
        { status: 500 }
      );
    }

    console.log(`Updating topics for question: ${questionId}`, topics);

    const questionRef = doc(db, 'questions', questionId);
    const questionSnap = await getDoc(questionRef);

    if (!questionSnap.exists()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Question not found',
        },
        { status: 404 }
      );
    }

    // Update the question with new topics
    await updateDoc(questionRef, {
      topics: topics,
      updatedAt: new Date().toISOString(),
    });

    // Fetch updated question
    const updatedSnap = await getDoc(questionRef);
    const updatedQuestion = {
      id: updatedSnap.id,
      ...updatedSnap.data(),
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
