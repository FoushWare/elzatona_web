import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-server';
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';

// GET /api/admin/learning-cards/[id] - Get a specific learning card
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!db) {
      throw new Error('Firebase not initialized');
    }
    const cardRef = doc(db, 'learningCards', params.id);
    const cardSnap = await getDoc(cardRef);

    if (!cardSnap.exists()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Learning card not found',
        },
        { status: 404 }
      );
    }

    const data = cardSnap.data();
    const card = {
      id: cardSnap.id,
      title: data.title,
      type: data.type,
      description: data.description,
      color: data.color,
      icon: data.icon,
      order: data.order,
      categories: data.categories || [],
      topics: data.topics || [],
      questionCount: data.questionCount || 0,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    };

    return NextResponse.json({
      success: true,
      data: card,
    });
  } catch (error) {
    console.error('Error fetching learning card:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch learning card',
      },
      { status: 500 }
    );
  }
}

// PUT /api/admin/learning-cards/[id] - Update a learning card
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!db) {
      throw new Error('Firebase not initialized');
    }
    const body = await request.json();
    const {
      title,
      type,
      description,
      color,
      icon,
      order,
      sections,
      topics,
      questionCount,
    } = body;

    if (!title || !type || !description) {
      return NextResponse.json(
        {
          success: false,
          error: 'Title, type, and description are required',
        },
        { status: 400 }
      );
    }

    const cardRef = doc(db, 'learningCards', params.id);
    await updateDoc(cardRef, {
      title,
      type,
      description,
      color,
      icon,
      order: order || 0,
      sections: sections || [],
      topics: topics || [],
      questionCount: questionCount || 0,
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      data: {
        id: params.id,
        title,
        type,
        description,
        color,
        icon,
        order: order || 0,
        sections: sections || [],
        topics: topics || [],
        questionCount: questionCount || 0,
      },
    });
  } catch (error) {
    console.error('Error updating learning card:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update learning card',
      },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/learning-cards/[id] - Delete a learning card
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!db) {
      throw new Error('Firebase not initialized');
    }
    const cardRef = doc(db, 'learningCards', params.id);
    await deleteDoc(cardRef);

    return NextResponse.json({
      success: true,
      message: 'Learning card deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting learning card:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete learning card',
      },
      { status: 500 }
    );
  }
}
