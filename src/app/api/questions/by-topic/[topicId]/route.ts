// Questions by Topic API Route
// v1.0 - Get questions for a specific topic

import { NextRequest, NextResponse } from 'next/server';
import {
  db,
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from '@/lib/firebase-server';

// GET /api/questions/by-topic/[topicId] - Get questions for a specific topic
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ topicId: string }> }
) {
  try {
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    const { topicId } = await params;
    const { searchParams } = new URL(request.url);

    // Optional filters
    const difficulty = searchParams.get('difficulty');
    const type = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '50');

    // Build query constraints
    const constraints = [where('topicId', '==', topicId)];

    if (difficulty) {
      constraints.push(where('difficulty', '==', difficulty));
    }

    if (type) {
      constraints.push(where('type', '==', type));
    }

    // Create the query
    const q = query(collection(db, 'unifiedQuestions'), ...constraints);
    const snapshot = await getDocs(q);

    const questions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as any));

    // Sort by createdAt after fetching (to avoid Firestore index issues)
    questions.sort((a, b) => {
      const dateA = new Date(a.createdAt || new Date());
      const dateB = new Date(b.createdAt || new Date());
      return dateB.getTime() - dateA.getTime();
    });

    // Apply limit
    const limitedQuestions = questions.slice(0, limit);

    return NextResponse.json({
      success: true,
      data: limitedQuestions,
      count: limitedQuestions.length,
      total: questions.length,
    });
  } catch (error) {
    console.error('Error fetching questions by topic:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}
