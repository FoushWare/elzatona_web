import { NextRequest, NextResponse } from 'next/server';
import { db, doc, getDoc, updateDoc, deleteDoc } from '@/lib/firebase-server';

// GET /api/plans/[id] - Get a single plan by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const planRef = doc(db!, 'learningPlans', id);
    const planSnap = await getDoc(planRef);

    if (!planSnap.exists()) {
      return NextResponse.json(
        { success: false, error: 'Plan not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { id: planSnap.id, ...planSnap.data() },
    });
  } catch (error) {
    console.error('Error fetching plan:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch plan' },
      { status: 500 }
    );
  }
}

// PUT /api/plans/[id] - Update a plan
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

    const planRef = doc(db, 'learningPlans', id);
    await updateDoc(planRef, { ...updateData, updatedAt: new Date() });

    return NextResponse.json({
      success: true,
      message: 'Plan updated successfully',
    });
  } catch (error) {
    console.error('Error updating plan:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update plan' },
      { status: 500 }
    );
  }
}

// DELETE /api/plans/[id] - Delete a plan
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!db) {
      throw new Error('Firebase not initialized');
    }

    const planRef = doc(db, 'learningPlans', id);
    await deleteDoc(planRef);

    return NextResponse.json({
      success: true,
      message: 'Plan deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting plan:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete plan' },
      { status: 500 }
    );
  }
}
