// Questions by Topic API Route
// v1.0 - Get questions for a specific topic

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "../../../../../get-supabase-client";

// GET /api/questions/by-topic/[topicId] - Get questions for a specific topic
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ topicId: string }> },
) {
  try {
    const { topicId } = await params;
    const { searchParams } = new URL(request.url);

    // Optional filters
    const difficulty = searchParams.get("difficulty");
    const type = searchParams.get("type");
    const limit = parseInt(searchParams.get("limit") || "50");

    // Build query
    const supabase = getSupabaseClient();
    let query = supabase.from("questions").select("*").eq("topic_id", topicId);

    if (difficulty) {
      query = query.eq("difficulty", difficulty);
    }

    if (type) {
      query = query.eq("type", type);
    }

    // Execute query
    const { data: questionsData, error: questionsError } = await query
      .order("created_at", { ascending: false })
      .limit(limit);

    if (questionsError) {
      throw questionsError;
    }

    const questions = (questionsData || []).map((doc) => ({
      id: doc.id,
      ...doc,
    }));

    return NextResponse.json({
      success: true,
      data: questions,
      count: questions.length,
      total: questions.length,
    });
  } catch (error) {
    console.error("Error fetching questions by topic:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch questions" },
      { status: 500 },
    );
  }
}
