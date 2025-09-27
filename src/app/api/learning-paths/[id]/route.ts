import { NextRequest, NextResponse } from 'next/server';
import { firestoreService } from '@/lib/firestore-service';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: pathId } = params;

    if (!pathId) {
      return NextResponse.json(
        { error: 'Learning path ID is required' },
        { status: 400 }
      );
    }

    // Fetch learning path from Firebase
    const learningPath = await firestoreService.getLearningPath(pathId);

    if (!learningPath) {
      return NextResponse.json(
        { error: 'Learning path not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(learningPath);
  } catch (error) {
    console.error('Error fetching learning path:', error);
    return NextResponse.json(
      { error: 'Failed to fetch learning path' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: pathId } = params;
    const body = await request.json();

    if (!pathId) {
      return NextResponse.json(
        { error: 'Learning path ID is required' },
        { status: 400 }
      );
    }

    // Update learning path in Firebase
    const updatedPath = await firestoreService.updateLearningPath(pathId, body);

    if (!updatedPath) {
      return NextResponse.json(
        { error: 'Learning path not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedPath);
  } catch (error) {
    console.error('Error updating learning path:', error);
    return NextResponse.json(
      { error: 'Failed to update learning path' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: pathId } = params;

    if (!pathId) {
      return NextResponse.json(
        { error: 'Learning path ID is required' },
        { status: 400 }
      );
    }

    // Delete learning path from Firebase
    const success = await firestoreService.deleteLearningPath(pathId);

    if (!success) {
      return NextResponse.json(
        { error: 'Learning path not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting learning path:', error);
    return NextResponse.json(
      { error: 'Failed to delete learning path' },
      { status: 500 }
    );
  }
}
