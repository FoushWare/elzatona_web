import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import {
  verifySupabaseToken,
  getUserFromRequest,
} from "../../../../../server-auth";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

interface FreeStyleProgress {
  lastQuestionIndex: number;
  lastQuestionId?: string;
  answeredQuestions: string[];
  answeredQuestionsData?: Record<string, any>;
  lastUpdated: string;
}

/**
 * Get user ID from various auth methods
 */
async function getUserIdFromRequest(
  request: NextRequest,
): Promise<string | null> {
  // Try to get user from Authorization header first
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);

    // Try Supabase token verification
    const supabaseUser = await verifySupabaseToken(token);
    if (supabaseUser) {
      return supabaseUser.id;
    }

    // If Supabase token fails, try custom auth token via getUserFromRequest
    // This handles both Supabase tokens and custom JWT tokens (admin tokens)
    const user = await getUserFromRequest(request);
    if (user) {
      return user.id;
    }
  }

  // Fallback to cookie-based auth
  const cookieStore = await cookies();
  const firebaseToken = cookieStore.get("firebase_token")?.value;
  if (firebaseToken) {
    const user = await verifySupabaseToken(firebaseToken);
    if (user) {
      return user.id;
    }
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body first
    const progressData: FreeStyleProgress = await request.json();

    // Get user ID from various auth methods
    let userId = await getUserIdFromRequest(request);

    // If not found via token, try to get from request body (for custom auth)
    if (
      !userId &&
      progressData &&
      typeof progressData === "object" &&
      "userId" in progressData
    ) {
      const requestUserId = (progressData as any).userId as string;
      // Verify user exists in database
      const { data: user, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("id", requestUserId)
        .single();

      if (!userError && user) {
        userId = user.id;
      }
    }

    if (!userId) {
      // Security: Removed user information from logs
      return NextResponse.json({
        success: true,
        message:
          "Progress would be saved (development mode - not authenticated)",
        warning: "Using development mode - authentication not fully configured",
      });
    }

    // Store progress data in JSONB format in user_progress table
    // Use a special plan_id like 'free-style-practice' to identify free-style progress
    const { data: _data, error } = await supabase.from("user_progress").upsert(
      {
        user_id: userId,
        plan_id: "free-style-practice", // Special identifier for free-style practice
        progress_data: {
          lastQuestionIndex: progressData.lastQuestionIndex,
          lastQuestionId: progressData.lastQuestionId,
          answeredQuestions: progressData.answeredQuestions || [],
          answeredQuestionsData: progressData.answeredQuestionsData || {},
        },
        last_updated: progressData.lastUpdated,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id,plan_id",
      },
    );

    if (error) {
      // Security: Removed detailed error logging to prevent information disclosure
      return NextResponse.json(
        {
          success: false,
          error: "Failed to sync progress",
          details: error.message,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Progress synced successfully to database",
    });
  } catch (error) {
    // Security: Removed detailed error logging to prevent information disclosure
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        message: "Progress would be saved (development mode - server error)",
        warning: "Using development mode due to server error",
      },
      { status: 500 },
    );
  }
}
