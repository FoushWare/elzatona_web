// Topics API Route
// v2.0 - Enhanced topic management

import { NextRequest, NextResponse } from 'next/server';
import { EnhancedQuestionService, Topic } from '@/lib/enhanced-question-schema';

// GET /api/topics - Get all topics
export async function GET() {
  try {
    const topics = await EnhancedQuestionService.getTopics();

    return NextResponse.json({
      success: true,
      data: topics,
      count: topics.length
    });
  } catch (error) {
    console.error('Error fetching topics:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch topics'
      },
      { status: 500 }
    );
  }
}

// POST /api/topics - Create a new topic
export async function POST(request: NextRequest) {
  try {
    const topicData = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'description', 'category', 'difficulty'];
    for (const field of requiredFields) {
      if (!topicData[field]) {
        return NextResponse.json(
          {
            success: false,
            error: `Missing required field: ${field}`
          },
          { status: 400 }
        );
      }
    }

    const topicId = await EnhancedQuestionService.createTopic(topicData);

    return NextResponse.json({
      success: true,
      data: { id: topicId },
      message: 'Topic created successfully'
    });
  } catch (error) {
    console.error('Error creating topic:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create topic'
      },
      { status: 500 }
    );
  }
}
