// Topics API Route
// v2.0 - Enhanced topic management

import { NextRequest, NextResponse } from 'next/server';
import { supabaseOperations } from '../../lib/supabase-server';

// GET /api/topics - Get all topics
export async function GET() {
  try {
    console.log('🔄 API: Fetching topics...');

    const { data: topics, error } = await supabaseOperations.getTopics({
      isActive: true,
      orderBy: 'order_index',
      orderDirection: 'asc',
    });

    if (error) {
      throw new Error(error.message);
    }

    // Transform data to match expected format
    const transformedTopics =
      (topics as any[])?.map(topic => ({
        id: topic.id,
        name: topic.name,
        slug: topic.slug,
        description: topic.description,
        category: topic.category_id,
        categoryId: topic.category_id,
        orderIndex: topic.order_index,
        is_active: topic.is_active,
        created_at: new Date(topic.created_at),
        updated_at: new Date(topic.updated_at),
      })) || [];

    console.log('📊 API: Topics fetched:', transformedTopics.length, 'topics');
    console.log('📊 API: Topics data:', transformedTopics);

    return NextResponse.json({
      success: true,
      data: transformedTopics,
      count: transformedTopics.length,
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
    const requiredFields = ['name', 'description'];
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

    // Transform data to match Supabase schema
    const supabaseTopicData = {
      name: topicData.name,
      description: topicData.description,
      category_id: topicData.category || topicData.categoryId || null,
      order_index: topicData.orderIndex || 0,
      is_active: topicData.isActive !== false,
    };

    const { data: newTopic, error } =
      await supabaseOperations.createTopic(supabaseTopicData);

    if (error) {
      throw new Error(error.message);
    }

    console.log('✅ API: Topic created with ID:', (newTopic as any).id);

    // Transform response to match expected format
    const transformedTopic = {
      id: (newTopic as any).id,
      name: (newTopic as any).name,
      description: (newTopic as any).description,
      category: (newTopic as any).category_id,
      categoryId: (newTopic as any).category_id,
      orderIndex: (newTopic as any).order_index,
      is_active: (newTopic as any).is_active,
      created_at: new Date((newTopic as any).created_at),
      updated_at: new Date((newTopic as any).updated_at),
    };

    return NextResponse.json({
      success: true,
      data: transformedTopic,
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
