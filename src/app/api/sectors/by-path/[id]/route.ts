import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-server';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: pathId } = params;

    if (!pathId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Path ID is required',
        },
        { status: 400 }
      );
    }

    if (!db) {
      throw new Error('Firebase not initialized');
    }

    // Fetch sectors for the specific learning path
    const sectorsRef = collection(db, 'sectors');
    const q = query(
      sectorsRef,
      where('pathId', '==', pathId),
      orderBy('order')
    );
    const snapshot = await getDocs(q);

    const sectors = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({
      success: true,
      data: sectors,
    });
  } catch (error) {
    console.error('Error fetching sectors:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch sectors',
      },
      { status: 500 }
    );
  }
}
