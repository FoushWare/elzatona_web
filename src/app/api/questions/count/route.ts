// v1.0 - Questions Count API Route
// Fast endpoint to get just the total count of questions

import { NextRequest, NextResponse } from 'next/server';
import { db, collection, getDocs, query, where } from '@/lib/firebase-server';

// GET /api/questions/count - Get total count of questions
export async function GET(request: NextRequest) {
  try {
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    // Build query
    let q = query(collection(db, 'unifiedQuestions'));
    
    if (category && category !== 'all') {
      q = query(q, where('category', '==', category));
    }

    // Get count efficiently
    const snapshot = await getDocs(q);
    const totalCount = snapshot.size;

    return NextResponse.json({
      success: true,
      data: {
        totalCount,
        category: category || 'all'
      }
    });
  } catch (error) {
    console.error('Error fetching question count:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch question count' },
      { status: 500 }
    );
  }
}
