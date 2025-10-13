import { NextRequest, NextResponse } from 'next/server';
import { db, doc, getDoc, updateDoc, deleteDoc } from '@/lib/firebase-server';

// GET /api/cards/[id] - Get a single card by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const cardRef = doc(db!, 'learningCards', id);
    const cardSnap = await getDoc(cardRef);

    if (!cardSnap.exists()) {
      return NextResponse.json(
        { success: false, error: 'Card not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { id: cardSnap.id, ...cardSnap.data() },
    });
  } catch (error) {
    console.error('Error fetching card:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch card' },
      { status: 500 }
    );
  }
}

// PUT /api/cards/[id] - Update a card
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const updateData = await request.json();

    if (!db) {
      throw new Error('Firebase not initialized');
    }

    const cardRef = doc(db, 'learningCards', id);
    await updateDoc(cardRef, { ...updateData, updatedAt: new Date() });

    return NextResponse.json({
      success: true,
      message: 'Card updated successfully',
    });
  } catch (error) {
    console.error('Error updating card:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update card' },
      { status: 500 }
    );
  }
}

// DELETE /api/cards/[id] - Delete a card
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!db) {
      throw new Error('Firebase not initialized');
    }

    const cardRef = doc(db, 'learningCards', id);
    await deleteDoc(cardRef);

    return NextResponse.json({
      success: true,
      message: 'Card deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting card:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete card' },
      { status: 500 }
    );
  }
}
