// v1.0 - Cleanup Duplicate Learning Paths API Route

import { NextRequest, NextResponse } from "next/server";
import UnifiedQuestionService from "@/lib/unified-question-schema";

// POST /api/admin/learning-paths/cleanup-duplicates - Remove duplicate learning paths
export async function POST(request: NextRequest) {
  try {
    await UnifiedQuestionService.removeDuplicateLearningPaths();

    return NextResponse.json({
      success: true,
      message: "Duplicate learning paths cleaned up successfully",
    });
  } catch (error) {
    console.error("Error cleaning up duplicate learning paths:", error);
    return NextResponse.json(
      { success: false, error: "Failed to cleanup duplicate learning paths" },
      { status: 500 },
    );
  }
}
