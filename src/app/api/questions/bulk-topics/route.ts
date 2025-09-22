import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc, updateDoc, writeBatch } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// POST /api/questions/bulk-topics
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { questionIds, topics } = body;

    if (!Array.isArray(questionIds) || questionIds.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Question IDs array is required' },
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

    console.log(`Bulk updating topics for ${questionIds.length} questions:`, topics);

    const batch = writeBatch(db);
    const results = [];
    const errors = [];

    // Process each question
    for (const questionId of questionIds) {
      try {
        const questionRef = doc(db, 'questions', questionId);
        const questionSnap = await getDoc(questionRef);

        if (!questionSnap.exists()) {
          errors.push(`Question ${questionId} not found`);
          continue;
        }

        // Add to batch update
        batch.update(questionRef, {
          topics: topics,
          updatedAt: new Date().toISOString(),
        });

        results.push({
          questionId,
          status: 'success',
          message: 'Topics updated',
        });
      } catch (error) {
        console.error(`Error processing question ${questionId}:`, error);
        errors.push(`Failed to update question ${questionId}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    // Commit the batch
    if (results.length > 0) {
      await batch.commit();
      console.log(`Successfully updated topics for ${results.length} questions`);
    }

    return NextResponse.json({
      success: true,
      data: {
        message: `Successfully updated topics for ${results.length} questions`,
        results,
        errors,
        totalProcessed: questionIds.length,
        successCount: results.length,
        errorCount: errors.length,
      },
    });
  } catch (error) {
    console.error('Error in bulk topics update:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update topics in bulk',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}