import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-server';
import { doc, updateDoc } from 'firebase/firestore';

// Learning paths that should have questions and their correct counts
const learningPathUpdates = [
  { id: 'frontend-basics', questionCount: 5 },
  { id: 'javascript-deep-dive', questionCount: 5 },
  { id: 'react-mastery', questionCount: 5 },
  { id: 'css-mastery', questionCount: 2 },
  { id: 'typescript-essentials', questionCount: 2 },
  { id: 'performance-optimization', questionCount: 2 },
  { id: 'security-essentials', questionCount: 2 },
  { id: 'testing-strategies', questionCount: 2 },
];

export async function POST(request: NextRequest) {
  try {
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    console.log('🔄 Updating learning paths via API...');

    const results = [];

    for (const update of learningPathUpdates) {
      try {
        const pathRef = doc(db, 'learningPaths', update.id);
        await updateDoc(pathRef, {
          questionCount: update.questionCount,
          updatedAt: new Date().toISOString(),
        });

        console.log(
          `✅ Updated ${update.id}: ${update.questionCount} questions`
        );
        results.push({
          id: update.id,
          questionCount: update.questionCount,
          success: true,
        });
      } catch (error) {
        console.error(`❌ Failed to update ${update.id}:`, error);
        results.push({
          id: update.id,
          questionCount: update.questionCount,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Learning paths updated successfully',
      results,
    });
  } catch (error) {
    console.error('Error updating learning paths:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update learning paths',
      },
      { status: 500 }
    );
  }
}
