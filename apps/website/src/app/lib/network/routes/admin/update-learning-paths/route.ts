import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "../../../../get-supabase-client";

// Learning paths that should have questions and their correct counts
const learningPathUpdates = [
  { id: "frontend-basics", question_count: 5 },
  { id: "javascript-deep-dive", question_count: 5 },
  { id: "react-mastery", question_count: 5 },
  { id: "css-mastery", question_count: 2 },
  { id: "typescript-essentials", question_count: 2 },
  { id: "performance-optimization", question_count: 2 },
  { id: "security-essentials", question_count: 2 },
  { id: "testing-strategies", question_count: 2 },
];

export async function POST(_request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    console.log("🔄 Updating learning paths via API...");

    const results = [];

    for (const update of learningPathUpdates) {
      try {
        const { error } = await supabase
          .from("learning_cards")
          .update({
            question_count: update.question_count,
            updated_at: new Date().toISOString(),
          })
          .eq("id", update.id);

        if (error) {
          throw error;
        }

        console.log(
          `✅ Updated ${update.id}: ${update.question_count} questions`,
        );
        results.push({
          id: update.id,
          question_count: update.question_count,
          success: true,
        });
      } catch (error) {
        console.error(`❌ Failed to update ${update.id}:`, error);
        results.push({
          id: update.id,
          question_count: update.question_count,
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Learning paths updated successfully",
      results,
    });
  } catch (error) {
    console.error("Error updating learning paths:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update learning paths",
      },
      { status: 500 },
    );
  }
}
