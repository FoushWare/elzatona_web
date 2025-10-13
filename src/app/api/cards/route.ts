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

// GET /api/cards - Get all learning cards
export async function GET(request: NextRequest) {
  try {
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    const q = query(collection(db, 'learningCards'), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);

    const cards = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({
      success: true,
      data: cards,
      count: cards.length,
    });
  } catch (error) {
    console.error('Error fetching cards:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch cards' },
      { status: 500 }
    );
  }
}

// POST /api/cards - Create a new learning card
export async function POST(request: NextRequest) {
  try {
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    const cardData = await request.json();

    const cardWithTimestamps = {
      ...cardData,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'admin',
      updatedBy: 'admin',
      isActive: true,
    };

    const docRef = await addDoc(
      collection(db, 'learningCards'),
      cardWithTimestamps
    );

    return NextResponse.json({
      success: true,
      data: { id: docRef.id, ...cardWithTimestamps },
      message: 'Card created successfully',
    });
  } catch (error) {
    console.error('Error creating card:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create card' },
      { status: 500 }
    );
  }
}
