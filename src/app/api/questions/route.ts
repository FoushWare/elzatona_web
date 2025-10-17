import { NextRequest, NextResponse } from 'next/server';
import {
  db,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
} from '@/lib/firebase-server';

// GET /api/questions - Get all questions with optional filtering
export async function GET(request: NextRequest) {
  try {
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    const { searchParams } = new URL(request.url);
    const cardType = searchParams.get('cardType');
    const category = searchParams.get('category');
    const topic = searchParams.get('topic');
    const difficulty = searchParams.get('difficulty');
    const type = searchParams.get('type');
    const limit = searchParams.get('limit');

    let q = query(collection(db, 'unifiedQuestions'));

    // Apply filters
    if (cardType && cardType !== 'all') {
      q = query(q, where('cardType', '==', cardType));
    }
    if (category && category !== 'all') {
      q = query(q, where('category', '==', category));
    }
    if (topic && topic !== 'all') {
      q = query(q, where('topic', '==', topic));
    }
    if (difficulty && difficulty !== 'all') {
      q = query(q, where('difficulty', '==', difficulty));
    }
    if (type && type !== 'all') {
      q = query(q, where('type', '==', type));
    }

    // Order by creation date (newest first)
    q = query(q, orderBy('createdAt', 'desc'));

    const querySnapshot = await getDocs(q);
    let questions = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Apply limit if specified
    if (limit) {
      const limitNum = parseInt(limit, 10);
      if (!isNaN(limitNum)) {
        questions = questions.slice(0, limitNum);
      }
    }

    return NextResponse.json({
      success: true,
      data: questions,
      count: questions.length,
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}

// POST /api/questions - Create a new question
export async function POST(request: NextRequest) {
  try {
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    const questionData = await request.json();

    // Add timestamps
    const now = new Date();
    const questionWithTimestamps = {
      ...questionData,
      createdAt: now,
      updatedAt: now,
      createdBy: 'admin',
      updatedBy: 'admin',
      isActive: true,
    };

    const docRef = await addDoc(
      collection(db, 'unifiedQuestions'),
      questionWithTimestamps
    );

    return NextResponse.json({
      success: true,
      data: { id: docRef.id, ...questionWithTimestamps },
      message: 'Question created successfully',
    });
  } catch (error) {
    console.error('Error creating question:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create question' },
      { status: 500 }
    );
  }
}
