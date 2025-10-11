import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-server';
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { LearningCard } from '@/types/learning-cards';

// GET /api/admin/learning-cards - Get all learning cards
export async function GET() {
  try {
    const cardsRef = collection(db, 'learningCards');
    const snapshot = await getDocs(cardsRef);

    const cards: LearningCard[] = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      cards.push({
        id: doc.id,
        title: data.title,
        type: data.type,
        description: data.description,
        color: data.color,
        icon: data.icon,
        order: data.order,
        sections: data.sections || [],
        topics: data.topics || [],
        questionCount: data.questionCount || 0,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      });
    });

    // Sort by order
    cards.sort((a, b) => a.order - b.order);

    return NextResponse.json({
      success: true,
      data: cards,
    });
  } catch (error) {
    console.error('Error fetching learning cards:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch learning cards',
      },
      { status: 500 }
    );
  }
}

// POST /api/admin/learning-cards - Create a new learning card
export async function POST(request: NextRequest) {
  try {
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

    const cardsRef = collection(db, 'learningCards');
    const newCard = await addDoc(cardsRef, {
      title,
      type,
      description,
      color,
      icon,
      order: order || 0,
      sections: sections || [],
      topics: topics || [],
      questionCount: questionCount || 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      data: {
        id: newCard.id,
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
    console.error('Error creating learning card:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create learning card',
      },
      { status: 500 }
    );
  }
}
