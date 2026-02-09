import { NextRequest, NextResponse } from "next/server";
import { getRepositoryFactory } from "@elzatona/database";

export async function GET() {
  try {
    const factory = getRepositoryFactory();
    const topicRepo = factory.getTopicRepository();
    const topics = await topicRepo.getAllTopics();
    return NextResponse.json({
      success: true,
      data: topics,
      count: topics.length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch topics",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const topicData = await request.json();
    // Basic validation
    if (!topicData.name || !topicData.categoryId) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: name or categoryId",
        },
        { status: 400 },
      );
    }
    const factory = getRepositoryFactory();
    const topicRepo = factory.getTopicRepository();
    const newTopic = await topicRepo.createTopic({
      name: topicData.name,
      categoryId: topicData.categoryId,
      description: topicData.description || "",
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
