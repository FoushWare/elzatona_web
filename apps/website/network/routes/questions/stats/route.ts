// v1.0 - Question Statistics API Route

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// GET /api/questions/stats - Get question statistics
export async function GET(request: NextRequest) {
  try {
    console.log("🔄 API: Fetching question stats...");

    // Get total count of questions
    const { count: totalQuestions, error: countError } = await supabase
      .from("questions")
      .select("*", { count: "exact", head: true });

    if (countError) {
      throw countError;
    }

    // Get questions by difficulty
    const { data: difficultyStats, error: difficultyError } = await supabase
      .from("questions")
      .select("difficulty")
      .not("difficulty", "is", null);

    if (difficultyError) {
      throw difficultyError;
    }

    // Get questions by type
    const { data: typeStats, error: typeError } = await supabase
      .from("questions")
      .select("question_type")
      .not("question_type", "is", null);

    if (typeError) {
      throw typeError;
    }

    // Process difficulty stats
    const difficultyCounts =
      difficultyStats?.reduce((acc: any, question: any) => {
        const difficulty = question.difficulty || "unknown";
        acc[difficulty] = (acc[difficulty] || 0) + 1;
        return acc;
      }, {}) || {};

    // Process type stats
    const typeCounts =
      typeStats?.reduce((acc: any, question: any) => {
        const type = question.question_type || "unknown";
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {}) || {};

    const stats = {
      totalQuestions: totalQuestions || 0,
      difficultyBreakdown: difficultyCounts,
      typeBreakdown: typeCounts,
      lastUpdated: new Date().toISOString(),
    };

    console.log("✅ Stats retrieved:", stats);

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("❌ Error fetching question stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch question statistics" },
      { status: 500 },
    );
  }
}
