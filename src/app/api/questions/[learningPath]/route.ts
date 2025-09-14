import { NextRequest, NextResponse } from 'next/server';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    'AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y',
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    'fir-demo-project-adffb.firebaseapp.com',
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'fir-demo-project-adffb',
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    'fir-demo-project-adffb.firebasestorage.app',
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '76366138630',
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    '1:76366138630:web:0f3381c2f5a62e0401e287',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
    const questionsRef = collection(db, 'questions');
    const q = query(questionsRef, where('learningPath', '==', learningPath));

    const querySnapshot = await getDocs(q);
    const questions = [];

    querySnapshot.forEach(doc => {
      questions.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    // Sort questions by order field in JavaScript
    questions.sort((a, b) => (a.order || 0) - (b.order || 0));

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
