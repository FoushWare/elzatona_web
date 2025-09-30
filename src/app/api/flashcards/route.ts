import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-server';
import { collection, addDoc, getDocs, query, where, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export interface Flashcard {
  id: string;
  userId: string;
  questionId: string;
  question: string;
  answer: string;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'new' | 'learning' | 'review' | 'mastered';
  interval: number; // days until next review
  repetitions: number;
  easeFactor: number; // SM-2 algorithm
  lastReviewed: string | null;
  nextReview: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  source: 'wrong_answer' | 'manual' | 'bookmark';
}

// Create a new flashcard
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      questionId,
      question,
      answer,
      explanation,
      category,
      difficulty = 'medium',
      source = 'manual',
      tags = []
    } = body;

    if (!userId || !questionId || !question || !answer) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const now = new Date();
    const nextReview = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 1 day from now

    const flashcard: Omit<Flashcard, 'id'> = {
      userId,
      questionId,
      question,
      answer,
      explanation: explanation || '',
      category: category || 'General',
      difficulty,
      status: 'new',
      interval: 1, // Start with 1 day
      repetitions: 0,
      easeFactor: 2.5, // SM-2 algorithm default
      lastReviewed: null,
      nextReview: nextReview.toISOString(),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      tags,
      source
    };

    const docRef = await addDoc(collection(db, 'flashcards'), flashcard);

    return NextResponse.json({
      success: true,
      data: {
        id: docRef.id,
        ...flashcard
      }
    });

  } catch (error) {
    console.error('Error creating flashcard:', error);
    return NextResponse.json(
      { error: 'Failed to create flashcard' },
      { status: 500 }
    );
  }
}

// Get flashcards for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const due = searchParams.get('due') === 'true';

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    let q = query(collection(db, 'flashcards'), where('userId', '==', userId));

    if (status) {
      q = query(q, where('status', '==', status));
    }

    if (category) {
      q = query(q, where('category', '==', category));
    }

    if (due) {
      const now = new Date().toISOString();
      q = query(q, where('nextReview', '<=', now));
    }

    q = query(q, orderBy('nextReview', 'asc'));

    const snapshot = await getDocs(q);
    const flashcards = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({
      success: true,
      data: flashcards
    });

  } catch (error) {
    console.error('Error fetching flashcards:', error);
    return NextResponse.json(
      { error: 'Failed to fetch flashcards' },
      { status: 500 }
    );
  }
}
