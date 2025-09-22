import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { QuestionTopic } from '../route';

// GET /api/admin/topics/[topicId]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ topicId: string }> }
) {
  try {
    const { topicId } = await params;

    if (!db) {
      return NextResponse.json(
        {
          success: false,
          error: 'Firestore not available',
        },
        { status: 500 }
      );
    }

    const topicRef = doc(db, 'topics', topicId);
    const topicSnap = await getDoc(topicRef);

    if (!topicSnap.exists()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Topic not found',
        },
        { status: 404 }
      );
    }

    const topic: QuestionTopic = {
      id: topicSnap.id,
      ...topicSnap.data(),
    } as QuestionTopic;

    return NextResponse.json({
      success: true,
      data: topic,
    });
  } catch (error) {
    console.error('Error fetching topic:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch topic',
      },
      { status: 500 }
    );
  }
}

// PUT /api/admin/topics/[topicId]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ topicId: string }> }
) {
  try {
    const { topicId } = await params;
    const body = await request.json();
    const { name, description, category, color } = body;

    if (!db) {
      return NextResponse.json(
        {
          success: false,
          error: 'Firestore not available',
        },
        { status: 500 }
      );
    }

    const topicRef = doc(db, 'topics', topicId);
    const topicSnap = await getDoc(topicRef);

    if (!topicSnap.exists()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Topic not found',
        },
        { status: 404 }
      );
    }

    const updateData: Partial<QuestionTopic> = {
      updatedAt: new Date().toISOString(),
    };

    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (category !== undefined) updateData.category = category;
    if (color !== undefined) updateData.color = color;

    await updateDoc(topicRef, updateData);

    // Fetch updated topic
    const updatedSnap = await getDoc(topicRef);
    const updatedTopic: QuestionTopic = {
      id: updatedSnap.id,
      ...updatedSnap.data(),
    } as QuestionTopic;

    return NextResponse.json({
      success: true,
      data: updatedTopic,
    });
  } catch (error) {
    console.error('Error updating topic:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update topic',
      },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/topics/[topicId]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ topicId: string }> }
) {
  try {
    const { topicId } = await params;

    if (!db) {
      return NextResponse.json(
        {
          success: false,
          error: 'Firestore not available',
        },
        { status: 500 }
      );
    }

    const topicRef = doc(db, 'topics', topicId);
    const topicSnap = await getDoc(topicRef);

    if (!topicSnap.exists()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Topic not found',
        },
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
      {
        success: false,
        error: 'Failed to delete topic',
      },
      { status: 500 }
    );
  }
}