// Topics API Route
// v2.1 - Enhanced topic management with input sanitization

import { NextRequest, NextResponse } from "next/server";
import { createRepositoryFactoryFromEnv } from "../../../../../../libs/database/src/repositories/RepositoryFactory";
import { sanitizeObjectServer } from "../../../sanitize-server";
import { validateAndSanitize, topicSchema } from "../../../validation";

export async function GET() {
  try {
    const factory = createRepositoryFactoryFromEnv();
    const topicRepo = factory.getTopicRepository();
    const topics = await topicRepo.getAllTopics();
    // Transform data to match expected format
    const transformedTopics = topics.map((topic) => ({
      id: topic.id,
      name: topic.name,
      description: topic.description,
      category: topic.categoryId,
      orderIndex: topic.orderIndex,
      is_active: topic.is_active,
      created_at: topic.created_at,
      updated_at: topic.updated_at,
    }));
    return NextResponse.json({
      success: true,
      data: transformedTopics,
      count: transformedTopics.length,
    });
  } catch (_error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch topics",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const topicData = await request.json();
    // Validate and sanitize topic data
    const validationResult = validateAndSanitize(topicSchema, topicData);
    if (!validationResult.success) {
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
    const factory = createRepositoryFactoryFromEnv();
    const topicRepo = factory.getTopicRepository();
    const newTopic = await topicRepo.createTopic({
      name: sanitizedData.name,
      categoryId: sanitizedData.categoryId,
      description: sanitizedData.description || "",
    });
    return NextResponse.json({
      success: true,
      data: newTopic,
      message: "Topic created successfully",
    });
  } catch (error) {
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
