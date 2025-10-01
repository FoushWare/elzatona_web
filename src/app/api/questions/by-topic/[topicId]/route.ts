import { NextRequest, NextResponse } from 'next/server';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// GET /api/questions/by-topic/[topicId]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ topicId: string }> }
) {
  try {
    const { topicId } = await params;

    if (!topicId) {
      return NextResponse.json(
        { success: false, error: 'Topic ID is required' },
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

    console.log(`Fetching questions for topic: ${topicId}`);

    // Query questions from Firebase that have this topic
    const questionsRef = collection(db, 'questions');
    const q = query(questionsRef, where('topics', 'array-contains', topicId));

    const querySnapshot = await getDocs(q);
    const questions = [];

    querySnapshot.forEach(doc => {
      questions.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    // Sort questions by order field if available
    questions.sort((a, b) => (a.order || 0) - (b.order || 0));

    console.log(`Found ${questions.length} questions for topic ${topicId}`);

    return NextResponse.json({
      success: true,
      topicId,
      questions,
      count: questions.length,
    });
  } catch (error) {
    console.error('Error fetching questions by topic:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch questions from Firebase',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
