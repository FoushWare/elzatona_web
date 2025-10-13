import { NextRequest, NextResponse } from 'next/server';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Question {
  id: string;
  order?: number;
  [key: string]: unknown; // Allow additional properties from Firebase
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ learningPath: string }> }
) {
  try {
    const { learningPath } = await params;

    if (!learningPath) {
      return NextResponse.json(
        { error: 'Learning path is required' },
        { status: 400 }
      );
    }

    console.log(`Fetching questions for learning path: ${learningPath}`);

    // Query questions from Firebase
    if (!db) {
      return NextResponse.json(
        { error: 'Database not initialized' },
        { status: 500 }
      );
    }

    const questionsRef = collection(db, 'questions');
    const q = query(questionsRef, where('learningPath', '==', learningPath));

    const querySnapshot = await getDocs(q);
    const questions: Question[] = [];

    querySnapshot.forEach(doc => {
      questions.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    // Sort questions by order field in JavaScript
    questions.sort(
      (a: Question, b: Question) => (a.order || 0) - (b.order || 0)
    );

    console.log(`Found ${questions.length} questions for ${learningPath}`);

    return NextResponse.json({
      success: true,
      learningPath,
      questions,
      count: questions.length,
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
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
