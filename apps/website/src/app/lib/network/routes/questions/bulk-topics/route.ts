import { NextRequest, NextResponse } from "next/server";

import { getSupabaseClient } from "../../../../get-supabase-client";

// POST /api/questions/bulk-topics
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { questionIds, topics } = body;

    if (!Array.isArray(questionIds) || questionIds.length === 0) {
      return NextResponse.json(
        { success: false, error: "Question IDs array is required" },
        { status: 400 },
      );
    }

    if (!Array.isArray(topics)) {
      return NextResponse.json(
        { success: false, error: "Topics must be an array" },
        { status: 400 },
      );
    }

    // Security: Removed user data from logs to prevent log injection
    console.log("Bulk updating topics for questions");

    const results = [];
    const errors = [];

    // Process each question
    const supabase = getSupabaseClient();
    for (const questionId of questionIds) {
      try {
        const { data: existingQuestion, error: fetchError } = await supabase
          .from("questions")
          .select("*")
          .eq("id", questionId)
          .single();

        if (fetchError || !existingQuestion) {
          errors.push(`Question ${questionId} not found`);
          continue;
        }

        // Update the question
        const { error: updateError } = await supabase
          .from("questions")
          .update({
            topics: topics,
            updated_at: new Date().toISOString(),
          })
          .eq("id", questionId);

        if (updateError) {
          throw updateError;
        }

        results.push({
          questionId,
          status: "success",
          message: "Topics updated",
        });
      } catch (error) {
        // Security: Removed user data from logs to prevent log injection
        console.error("Error processing question");

        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        errors.push(`Failed to update question ${questionId}: ${errorMessage}`);
      }
    }

    // Security: Removed user data from logs to prevent log injection
    console.log("Successfully updated topics for questions");

    return NextResponse.json({
      success: true,
      data: {
        message: `Successfully updated topics for ${results.length} questions`,
        results,
        errors,
        totalProcessed: questionIds.length,
        successCount: results.length,
        errorCount: errors.length,
      },
    });
  } catch (error) {
    console.error("Error in bulk topics update:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update topics in bulk",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
