import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-server';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

// Get a specific custom plan
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!db) {
      return NextResponse.json(
        { error: 'Database not initialized' },
        { status: 500 }
      );
    }

    const planRef = doc(db, 'customPlans', id);
    const planSnap = await getDoc(planRef);

    if (!planSnap.exists()) {
      return NextResponse.json(
        { error: 'Custom plan not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: planSnap.id,
        ...planSnap.data(),
      },
    });
  } catch (error) {
    console.error('Error fetching custom plan:', error);
    return NextResponse.json(
      { error: 'Failed to fetch custom plan' },
      { status: 500 }
    );
  }
}

// Update a custom plan
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updates = await request.json();

    if (!db) {
      return NextResponse.json(
        { error: 'Database not initialized' },
        { status: 500 }
      );
    }

    const planRef = doc(db, 'customPlans', id);

    // Add updatedAt timestamp
    const updatedData = {
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await updateDoc(planRef, updatedData);

    return NextResponse.json({
      success: true,
      message: 'Custom plan updated successfully',
    });
  } catch (error) {
    console.error('Error updating custom plan:', error);
    return NextResponse.json(
      { error: 'Failed to update custom plan' },
      { status: 500 }
    );
  }
}

// Delete a custom plan
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!db) {
      return NextResponse.json(
        { error: 'Database not initialized' },
        { status: 500 }
      );
    }

    const planRef = doc(db, 'customPlans', id);
    await deleteDoc(planRef);

    return NextResponse.json({
      success: true,
      message: 'Custom plan deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting custom plan:', error);
    return NextResponse.json(
      { error: 'Failed to delete custom plan' },
      { status: 500 }
    );
  }
}
