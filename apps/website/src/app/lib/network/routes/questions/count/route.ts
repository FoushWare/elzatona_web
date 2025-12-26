// v1.0 - Questions Count API Route
// Fast endpoint to get just the total count of questions

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "../../../../get-supabase-client";

// GET /api/questions/count - Get total count of questions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    // Build query
    const supabase = getSupabaseClient();
    let query = supabase
      .from("questions")
      .select("*", { count: "exact", head: true });

    if (category && category !== "all") {
      query = query.eq("category", category);
    }

    // Get count efficiently
    const { count, error } = await query;

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: {
        totalCount: count || 0,
        category: category || "all",
      },
    });
  } catch (error) {
    console.error("Error fetching question count:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch question count" },
      { status: 500 },
    );
  }
}
