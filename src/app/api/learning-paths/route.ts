import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-server';
import { collection, getDocs } from 'firebase/firestore';

export async function GET(request: NextRequest) {
  try {
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    // Fetch learning paths from Firebase
    const learningPathsRef = collection(db, 'learningPaths');
    const snapshot = await getDocs(learningPathsRef);
    
    const learningPaths = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Deduplicate learning paths by ID to prevent duplicate key errors
    const uniqueLearningPaths = learningPaths.reduce((acc, path) => {
      if (!acc.find(existingPath => existingPath.id === path.id)) {
        acc.push(path);
      }
      return acc;
    }, [] as typeof learningPaths);

    return NextResponse.json({
      success: true,
      data: uniqueLearningPaths
    });
  } catch (error) {
    console.error('Error fetching learning paths:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch learning paths'
      },
      { status: 500 }
    );
  }
}
