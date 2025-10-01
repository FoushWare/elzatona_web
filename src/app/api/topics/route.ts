// Topics API Route
// v2.0 - Enhanced topic management

import { NextRequest, NextResponse } from 'next/server';
import { db, collection, getDocs, addDoc } from '@/lib/firebase-server';

// GET /api/topics - Get all topics
export async function GET() {
  try {
    console.log('🔄 API: Fetching topics...');
    const snapshot = await getDocs(collection(db, 'topics'));
    const topics = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log('📊 API: Topics fetched:', topics.length, 'topics');
    console.log('📊 API: Topics data:', topics);

    return NextResponse.json({
      success: true,
      data: topics,
      count: topics.length,
    });
  } catch (error) {
    console.error('❌ API: Error fetching topics:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch topics',
      },
      { status: 500 }
    );
  }
}

// POST /api/topics - Create a new topic
export async function POST(request: NextRequest) {
  try {
    const topicData = await request.json();
    console.log('🔄 API: Creating topic with data:', topicData);

    // Validate required fields
    const requiredFields = ['name', 'description', 'category', 'difficulty'];
    for (const field of requiredFields) {
      if (!topicData[field]) {
        console.error('❌ API: Missing required field:', field);
        return NextResponse.json(
          {
            success: false,
            error: `Missing required field: ${field}`,
          },
          { status: 400 }
        );
      }
    }

    console.log('✅ API: All required fields present, creating topic...');
    const topicWithTimestamps = {
      ...topicData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const docRef = await addDoc(collection(db, 'topics'), topicWithTimestamps);
    const topicId = docRef.id;
    console.log('✅ API: Topic created with ID:', topicId);

    return NextResponse.json({
      success: true,
      data: { id: topicId },
      message: 'Topic created successfully',
    });
  } catch (error) {
    console.error('❌ API: Error creating topic:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : 'Failed to create topic',
      },
      { status: 500 }
    );
  }
}
