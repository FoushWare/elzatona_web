import { NextRequest, NextResponse } from 'next/server';
import {
  db,
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from '@/lib/firebase-server';

// GET /api/plans - Get all learning plans
export async function GET(request: NextRequest) {
  try {
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    const q = query(collection(db, 'learningPlans'), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);

    const plans = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({
      success: true,
      data: plans,
      count: plans.length,
    });
  } catch (error) {
    console.error('Error fetching plans:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch plans' },
      { status: 500 }
    );
  }
}

// POST /api/plans - Create a new learning plan
export async function POST(request: NextRequest) {
  try {
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    const planData = await request.json();

    const planWithTimestamps = {
      ...planData,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'admin',
      updatedBy: 'admin',
      isActive: true,
    };

    const docRef = await addDoc(
      collection(db, 'learningPlans'),
      planWithTimestamps
    );

    return NextResponse.json({
      success: true,
      data: { id: docRef.id, ...planWithTimestamps },
      message: 'Plan created successfully',
    });
  } catch (error) {
    console.error('Error creating plan:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create plan' },
      { status: 500 }
    );
  }
}
