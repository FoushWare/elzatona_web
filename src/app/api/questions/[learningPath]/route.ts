import { NextRequest, NextResponse } from 'next/server';
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  getDocs,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'dummy-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'dummy-domain',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'dummy-project',
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'dummy-bucket',
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:123456789:web:dummy',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function GET(
  request: NextRequest,
  { params }: { params: { learningPath: string } }
) {
  try {
    const { learningPath } = params;

    if (!learningPath) {
      return NextResponse.json(
        { error: 'Learning path is required' },
        { status: 400 }
      );
    }

    console.log(`Fetching questions for learning path: ${learningPath}`);

    // Query questions from Firebase
    const questionsRef = collection(db, 'questions');
    const q = query(
      questionsRef,
      where('learningPath', '==', learningPath),
      orderBy('order', 'asc')
    );

    const querySnapshot = await getDocs(q);
    const questions = [];

    querySnapshot.forEach(doc => {
      questions.push({
        id: doc.id,
        ...doc.data(),
      });
    });

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
