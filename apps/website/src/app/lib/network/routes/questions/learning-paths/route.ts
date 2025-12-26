// v1.0 - Learning Paths API Route

import { NextRequest, NextResponse } from "next/server";
import UnifiedQuestionService from "../../../../unified-question-schema";

// GET /api/questions/learning-paths - Get all learning paths
export async function GET(_request: NextRequest) {
  try {
    const learningPaths = await UnifiedQuestionService.getLearningPaths();

    return NextResponse.json({
      success: true,
      data: learningPaths,
      count: learningPaths.length,
    });
  } catch (error) {
    console.error("Error fetching learning paths:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch learning paths" },
      { status: 500 },
    );
  }
}

// POST /api/questions/learning-paths - Initialize default learning paths
export async function POST(_request: NextRequest) {
  try {
    await UnifiedQuestionService.initializeDefaultLearningPaths();

    return NextResponse.json({
      success: true,
      message: "Default learning paths initialized successfully",
    });
  } catch (error) {
    console.error("Error initializing learning paths:", error);
    return NextResponse.json(
      { success: false, error: "Failed to initialize learning paths" },
      { status: 500 },
    );
  }
}
