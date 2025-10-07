import { NextRequest, NextResponse } from 'next/server';
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface QuestionTopic {
  id: string;
  name: string;
  description: string;
  category:
    | 'javascript-core'
    | 'data-structures-algorithms'
    | 'browser-dom'
    | 'css-styling'
    | 'react'
    | 'nextjs-frameworks'
    | 'typescript'
    | 'testing'
    | 'build-tools-workflow'
    | 'security'
    | 'software-engineering'
    | 'performance-monitoring'
    | 'advanced-future';
  color: string;
  createdAt: string;
  updatedAt: string;
  questionCount: number;
}

// Load topics from Firebase
async function loadTopics(): Promise<QuestionTopic[]> {
  try {
    if (!db) {
      console.warn('Firestore not available');
      return [];
    }

    const topicsRef = collection(db, 'topics');
    const q = query(topicsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const topics: QuestionTopic[] = [];
    querySnapshot.forEach(doc => {
      topics.push({
        id: doc.id,
        ...doc.data(),
      } as QuestionTopic);
    });

    return topics;
  } catch (error) {
    console.error('Error loading topics from Firebase:', error);
    return [];
  }
}

// Save topic to Firebase
async function saveTopic(topic: Omit<QuestionTopic, 'id'>): Promise<string> {
  if (!db) {
    throw new Error('Firestore not available');
  }

  const topicsRef = collection(db, 'topics');
  const docRef = await addDoc(topicsRef, topic);
  return docRef.id;
}

// Update topic in Firebase
async function updateTopic(
  topicId: string,
  topic: Partial<QuestionTopic>
): Promise<void> {
  if (!db) {
    throw new Error('Firestore not available');
  }

  const topicRef = doc(db, 'topics', topicId);
  await updateDoc(topicRef, topic);
}

// Delete topic from Firebase
async function deleteTopic(topicId: string): Promise<void> {
  if (!db) {
    throw new Error('Firestore not available');
  }

  const topicRef = doc(db, 'topics', topicId);
  await deleteDoc(topicRef);
}

// Check if topic exists by name
async function topicExistsByName(name: string): Promise<boolean> {
  if (!db) {
    return false;
  }

  try {
    const topicsRef = collection(db, 'topics');
    const q = query(topicsRef, where('name', '==', name));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking if topic exists:', error);
    return false;
  }
}

// GET /api/admin/topics
export async function GET() {
  try {
    const topics = await loadTopics();
    return NextResponse.json({
      success: true,
      data: topics,
    });
  } catch (error) {
    console.error('Error loading topics:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to load topics',
      },
      { status: 500 }
    );
  }
}

// POST /api/admin/topics
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, category, color } = body;

    if (!name || !category) {
      return NextResponse.json(
        {
          success: false,
          error: 'Name and category are required',
        },
        { status: 400 }
      );
    }

    // Check if topic with same name already exists
    const exists = await topicExistsByName(name);
    if (exists) {
      return NextResponse.json(
        {
          success: false,
          error: 'Topic with this name already exists',
        },
        { status: 400 }
      );
    }

    const newTopic: Omit<QuestionTopic, 'id'> = {
      name,
      description: description || '',
      category,
      color: color || '#3B82F6',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      questionCount: 0,
    };

    const topicId = await saveTopic(newTopic);
    const createdTopic: QuestionTopic = {
      id: topicId,
      ...newTopic,
    };

    return NextResponse.json({
      success: true,
      data: createdTopic,
    });
  } catch (error) {
    console.error('Error creating topic:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create topic',
      },
      { status: 500 }
    );
  }
}
