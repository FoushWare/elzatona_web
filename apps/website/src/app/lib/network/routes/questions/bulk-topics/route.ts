import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

function sanitizeForLog(value: unknown): string {
  let raw: string;

  if (typeof value === "string") {
    // Remove potentially dangerous characters from strings
    raw = value.replace(/[\r\n]/g, " ").slice(0, 500);
  } else {
    try {
      const jsonString = JSON.stringify(value);
      // Remove potentially dangerous characters from JSON
      raw = jsonString.replace(/[\r\n]/g, " ").slice(0, 500);
    } catch {
      raw = "[unserializable]";
    }
  }

  return raw;
}

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

    const questionCount = questionIds.length;
    const topicsStr = sanitizeForLog(topics);

    // Security: Removed user data from logs to prevent log injection
    console.log("Bulk updating topics for questions");

    const results = [];
    const errors = [];

    // Process each question
    for (const questionId of questionIds) {
      try {
        const { data: existingQuestion, error: fetchError } = await supabase
          .from("questions")
          .select("*")
          .eq("id", questionId)
          .single();

        if (fetchError || !existingQuestion) {
          errors.push(`Question ${sanitizeForLog(questionId)} not found`);
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
        const questionIdStr = sanitizeForLog(questionId);
        const errorStr = sanitizeForLog(error);

        // Security: Removed user data from logs to prevent log injection
        console.error("Error processing question");

        errors.push(
          `Failed to update question ${questionIdStr}: ${sanitizeForLog(
            error instanceof Error ? error.message : "Unknown error",
          )}`,
        );
      }
    }

    // Security: Removed user data from logs to prevent log injection
    console.log("Successfully updated topics for questions");

    return NextResponse.json({
      success: true,
      data: {
        message: `Successfully updated topics for ${sanitizeForLog(results.length)} questions`,
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
