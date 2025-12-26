import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySupabaseToken } from "../../../../../server-auth";
import { getSupabaseClient } from "../../../../../get-supabase-client";

export async function GET(request: NextRequest) {
  try {
    // Get the Firebase token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("firebase_token")?.value;

    if (!token) {
      // Security: Removed authentication token logging
      return NextResponse.json({
        success: true,
        progress: null,
        message: "No progress found (not authenticated)",
      });
    }

    // Verify the token
    const decodedToken = await verifySupabaseToken(token);
    if (!decodedToken) {
      return NextResponse.json({
        success: true,
        progress: null,
        message: "Token verification failed",
      });
    }

    const { searchParams } = new URL(request.url);
    const planId = searchParams.get("planId");

    if (!planId) {
      return NextResponse.json(
        { error: "planId is required" },
        { status: 400 },
      );
    }

    // Security: Removed user data from logs to prevent log injection
    console.log("📥 Loading guided learning progress for plan");

    // Fetch user progress from database
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", decodedToken.id)
      .eq("plan_id", planId)
      .single();

    if (error || !data) {
      console.log("📭 No existing progress found in database");
      return NextResponse.json({
        success: true,
        progress: null,
        message: "No existing progress found",
      });
    }

    // Extract progress data from JSONB field
    const progressData = data.progress_data as any;

    console.log("✅ Loaded progress from database");

    return NextResponse.json({
      success: true,
      progress: {
        planId: data.plan_id,
        completedQuestions: progressData?.completedQuestions || [],
        completedTopics: progressData?.completedTopics || [],
        completedCategories: progressData?.completedCategories || [],
        completedCards: progressData?.completedCards || [],
        currentPosition: progressData?.currentPosition || {
          cardIndex: 0,
          categoryIndex: 0,
          topicIndex: 0,
          questionIndex: 0,
        },
        lastUpdated: data.last_updated || data.updated_at,
      },
    });
  } catch (error) {
    console.error("❌ Error loading progress:", error);

    return NextResponse.json({
      success: true,
      progress: null,
      message: "Error loading progress",
    });
  }
}
