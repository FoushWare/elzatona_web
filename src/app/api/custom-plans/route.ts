import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-server';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

export interface CustomPlan {
  id: string;
  userId: string;
  name: string;
  description: string;
  duration: number; // in days
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  categories: string[];
  topics: string[];
  learningPaths: string[];
  questionCount: number;
  isPublic: boolean;
  isTemplate: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  tags: string[];
  estimatedTime: number; // in minutes
  prerequisites: string[];
  learningObjectives: string[];
}

// Create a new custom plan
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      name,
      description,
      duration,
      difficulty,
      categories,
      topics,
      learningPaths,
      isPublic = false,
      isTemplate = false,
      tags = [],
      prerequisites = [],
      learningObjectives = [],
    } = body;

    if (!userId || !name || !description || !duration || !difficulty) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate estimated time based on duration and difficulty
    const baseTimePerDay = 60; // 60 minutes base
    const difficultyMultiplier = {
      beginner: 0.8,
      intermediate: 1.0,
      advanced: 1.2,
    };
    const estimatedTime = Math.round(
      duration *
        baseTimePerDay *
        difficultyMultiplier[difficulty as keyof typeof difficultyMultiplier]
    );

    const customPlan: Omit<CustomPlan, 'id'> = {
      userId,
      name,
      description,
      duration,
      difficulty,
      categories: categories || [],
      topics: topics || [],
      learningPaths: learningPaths || [],
      questionCount: 0, // Will be calculated when questions are added
      isPublic,
      isTemplate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: userId,
      tags,
      estimatedTime,
      prerequisites,
      learningObjectives,
    };

    if (!db) {
      return NextResponse.json(
        { error: 'Database not initialized' },
        { status: 500 }
      );
    }

    const docRef = await addDoc(collection(db, 'customPlans'), customPlan);

    return NextResponse.json({
      success: true,
      data: {
        id: docRef.id,
        ...customPlan,
      },
    });
  } catch (error) {
    console.error('Error creating custom plan:', error);
    return NextResponse.json(
      { error: 'Failed to create custom plan' },
      { status: 500 }
    );
  }
}

// Get custom plans
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const isPublic = searchParams.get('isPublic') === 'true';
    const isTemplate = searchParams.get('isTemplate') === 'true';
    const category = searchParams.get('category');
    const difficulty = searchParams.get('difficulty');

    if (!db) {
      return NextResponse.json(
        { error: 'Database not initialized' },
        { status: 500 }
      );
    }

    let q = query(collection(db, 'customPlans'));

    if (userId) {
      q = query(q, where('userId', '==', userId));
    }

    if (isPublic) {
      q = query(q, where('isPublic', '==', true));
    }

    if (isTemplate) {
      q = query(q, where('isTemplate', '==', true));
    }

    if (category) {
      q = query(q, where('categories', 'array-contains', category));
    }

    if (difficulty) {
      q = query(q, where('difficulty', '==', difficulty));
    }

    q = query(q, orderBy('createdAt', 'desc'));

    const snapshot = await getDocs(q);
    const customPlans = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({
      success: true,
      data: customPlans,
    });
  } catch (error) {
    console.error('Error fetching custom plans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch custom plans' },
      { status: 500 }
    );
  }
}
