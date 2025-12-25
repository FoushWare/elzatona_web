// Topics API Route
// v2.1 - Enhanced topic management with input sanitization

import { NextRequest, NextResponse } from "next/server";
import { supabaseOperations } from "../../supabase-server";
import { sanitizeObjectServer } from "../../utils/sanitize-server";
import { validateAndSanitize, topicSchema } from "../../utils/validation";

// GET /api/topics - Get all topics
export async function GET() {
  try {
    // Security: Removed debug logging to prevent information disclosure
    const { data: topics, error } = await supabaseOperations.getTopics({
      isActive: true,
      orderBy: "order_index",
      orderDirection: "asc",
    });

    if (error) {
      throw new Error(error.message);
    }

    // Transform data to match expected format
    const transformedTopics =
      (topics as any[])?.map((topic) => ({
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

    // Security: Removed debug logging to prevent information disclosure

    return NextResponse.json({
      success: true,
      data: transformedTopics,
      count: transformedTopics.length,
    });
  } catch (_error) {
    // Security: Removed detailed error logging to prevent information disclosure
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch topics",
      },
      { status: 500 },
    );
  }
}

// POST /api/topics - Create a new topic
export async function POST(request: NextRequest) {
  try {
    const topicData = await request.json();
    // Security: Removed debug logging to prevent information disclosure

    // Validate and sanitize topic data
    const validationResult = validateAndSanitize(topicSchema, topicData);

    if (!validationResult.success) {
      console.error("❌ API: Validation failed:", validationResult.error);
      return NextResponse.json(
        {
          success: false,
          error: validationResult.error,
        },
        { status: 400 },
      );
    }

    // Sanitize the validated data
    const sanitizedData = sanitizeObjectServer(validationResult.data as any);

    console.log("✅ API: All required fields present, creating topic...");

    // Transform data to match Supabase schema
    const supabaseTopicData = {
      name: sanitizedData.name,
      description: sanitizedData.description || "",
      category_id: sanitizedData.categoryId,
      order_index: topicData.orderIndex || 0,
      is_active: topicData.isActive !== false,
    };

    const { data: newTopic, error } =
      await supabaseOperations.createTopic(supabaseTopicData);

    if (error) {
      throw new Error(error.message);
    }

    // Security: Removed debug logging to prevent information disclosure

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
      message: "Topic created successfully",
    });
  } catch (error) {
    console.error("❌ API: Error creating topic:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to create topic",
      },
      { status: 500 },
    );
  }
}
