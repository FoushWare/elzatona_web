import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

// GET /api/topics/[id] - Get a specific topic
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const topicId = params.id;

    if (!topicId) {
      return NextResponse.json(
        { success: false, error: 'Topic ID is required' },
        { status: 400 }
      );
    }

    const topicRef = doc(db, 'topics', topicId);
    const topicSnap = await getDoc(topicRef);

    if (!topicSnap.exists()) {
      return NextResponse.json(
        { success: false, error: 'Topic not found' },
        { status: 404 }
      );
    }

    const topicData = {
      id: topicSnap.id,
      ...topicSnap.data(),
    };

    return NextResponse.json({
      success: true,
      data: topicData,
    });
  } catch (error) {
    console.error('Error fetching topic:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch topic' },
      { status: 500 }
    );
  }
}

// PUT /api/topics/[id] - Update a specific topic
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const topicId = params.id;
    const body = await request.json();

    if (!topicId) {
      return NextResponse.json(
        { success: false, error: 'Topic ID is required' },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!body.name) {
      return NextResponse.json(
        { success: false, error: 'Topic name is required' },
        { status: 400 }
      );
    }

    const topicRef = doc(db, 'topics', topicId);

    // Check if topic exists
    const topicSnap = await getDoc(topicRef);
    if (!topicSnap.exists()) {
      return NextResponse.json(
        { success: false, error: 'Topic not found' },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData = {
      ...body,
      updatedAt: new Date(),
    };

    await updateDoc(topicRef, updateData);

    return NextResponse.json({
      success: true,
      message: 'Topic updated successfully',
      data: { id: topicId, ...updateData },
    });
  } catch (error) {
    console.error('Error updating topic:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update topic' },
      { status: 500 }
    );
  }
}

// DELETE /api/topics/[id] - Delete a specific topic
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const topicId = params.id;

    if (!topicId) {
      return NextResponse.json(
        { success: false, error: 'Topic ID is required' },
        { status: 400 }
      );
    }

    const topicRef = doc(db, 'topics', topicId);

    // Check if topic exists
    const topicSnap = await getDoc(topicRef);
    if (!topicSnap.exists()) {
      return NextResponse.json(
        { success: false, error: 'Topic not found' },
        { status: 404 }
      );
    }

    await deleteDoc(topicRef);

    return NextResponse.json({
      success: true,
      message: 'Topic deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting topic:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete topic' },
      { status: 500 }
    );
  }
}
