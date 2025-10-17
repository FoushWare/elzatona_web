import { NextRequest, NextResponse } from 'next/server';
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase-server';

const PLAN_QUESTIONS_COLLECTION = 'planQuestions';

export async function GET(request: NextRequest) {
  try {
    if (!db) {
      throw new Error('Firebase not initialized');
    }
    const { searchParams } = new URL(request.url);
    const planId = searchParams.get('planId');
    const cardId = searchParams.get('cardId');

    if (!planId) {
      return NextResponse.json(
        { success: false, error: 'Plan ID is required' },
        { status: 400 }
      );
    }

    let q = query(
      collection(db, PLAN_QUESTIONS_COLLECTION),
      where('planId', '==', planId)
    );

    if (cardId) {
      q = query(q, where('cardId', '==', cardId));
    }

    q = query(q, orderBy('order', 'asc'));

    const snapshot = await getDocs(q);
    const planQuestions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    }));

    return NextResponse.json({
      success: true,
      data: planQuestions,
    });
  } catch (error) {
    console.error('Error fetching plan questions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch plan questions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!db) {
      throw new Error('Firebase not initialized');
    }
    const body = await request.json();
    const { planId, questionId, cardId, sectionId, topicId, order } = body;

    if (!planId || !questionId || !cardId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Plan ID, Question ID, and Card ID are required',
        },
        { status: 400 }
      );
    }

    // Check if question is already assigned to this plan
    const existingQuery = query(
      collection(db, PLAN_QUESTIONS_COLLECTION),
      where('planId', '==', planId),
      where('questionId', '==', questionId)
    );
    const existingSnapshot = await getDocs(existingQuery);

    if (!existingSnapshot.empty) {
      return NextResponse.json(
        { success: false, error: 'Question is already assigned to this plan' },
        { status: 400 }
      );
    }

    const planQuestionData = {
      planId,
      questionId,
      cardId,
      sectionId: sectionId || null,
      topicId: topicId || null,
      order: order || 1,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(
      collection(db, PLAN_QUESTIONS_COLLECTION),
      planQuestionData
    );

    return NextResponse.json({
      success: true,
      data: {
        id: docRef.id,
        ...planQuestionData,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error('Error creating plan question:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create plan question' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    if (!db) {
      throw new Error('Firebase not initialized');
    }
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Plan question ID is required' },
        { status: 400 }
      );
    }

    const planQuestionRef = doc(db, PLAN_QUESTIONS_COLLECTION, id);
    await updateDoc(planQuestionRef, {
      ...updateData,
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      message: 'Plan question updated successfully',
    });
  } catch (error) {
    console.error('Error updating plan question:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update plan question' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (!db) {
      throw new Error('Firebase not initialized');
    }
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Plan question ID is required' },
        { status: 400 }
      );
    }

    const planQuestionRef = doc(db, PLAN_QUESTIONS_COLLECTION, id);
    await deleteDoc(planQuestionRef);

    return NextResponse.json({
      success: true,
      message: 'Plan question deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting plan question:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete plan question' },
      { status: 500 }
    );
  }
}
