import { NextRequest, NextResponse } from "next/server";

import {
  getSupabaseClient,
  getSupabaseClientWithAnonKey,
} from "../../../../get-supabase-client";

import { AutoLinkingService } from "../../../../auto-linking-service";

// GET /api/guided-learning/plans - Get all learning plans or filtered content
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const getSections = searchParams.get("getSections") === "true";
    const getQuestions = searchParams.get("getQuestions") === "true";
    const category = searchParams.get("category");
    const learningPath = searchParams.get("learningPath");

    // If requesting sections for plan creation
    if (getSections) {
      const autoLinkingService = new AutoLinkingService();
      const sections = await autoLinkingService.getSectionsForPlan(
        category || undefined,
        learningPath || undefined,
      );
      return NextResponse.json({
        success: true,
        data: sections,
        count: sections.length,
      });
    }

    // If requesting questions for plan creation
    if (getQuestions) {
      // This would need to be implemented based on your requirements
      // For now, return empty array
      return NextResponse.json({
        success: true,
        data: [],
        count: 0,
      });
    }

    // Otherwise, get all learning plans
    // Use anon key for public read access (this is a public endpoint)
    let supabase;
    try {
      supabase = getSupabaseClient(); // Try service role first
    } catch (clientError) {
      supabase = getSupabaseClientWithAnonKey();
    }

    // Import hardcoded featured plans
    const { studyPlans: hardcodedPlans } = await import("@elzatona/utilities");

    // Convert hardcoded plans to match the expected API structure if needed
    // The new structure is already what we want
    let plans = [...hardcodedPlans];

    try {
      // Try to fetch additional plans from Supabase if available
      const { data: dbPlans, error } = await supabase
        .from("learning_plans")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && dbPlans && dbPlans.length > 0) {
        // Merge DB plans with hardcoded plans, avoiding duplicates by ID
        const hardcodedIds = new Set(plans.map((p) => p.id));
        const filteredDbPlans = dbPlans.filter((p) => !hardcodedIds.has(p.id));
        plans = [...plans, ...filteredDbPlans];
      }
    } catch (dbError) {
      console.warn(
        "⚠️ Database fetch failed for learning plans, using hardcoded only:",
        dbError,
      );
    }

    return NextResponse.json({ success: true, data: plans || [] });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorDetails = error instanceof Error ? error.stack : undefined;
    const errorCode =
      error && typeof error === "object" && "code" in error
        ? String(error.code)
        : undefined;
    const errorHint =
      error && typeof error === "object" && "hint" in error
        ? String(error.hint)
        : undefined;

    console.error("❌ Error fetching learning plans:", {
      message: errorMessage,
      code: errorCode,
      hint: errorHint,
      details: errorDetails,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL
        ? "✅ Set"
        : "❌ Missing",
      supabaseKey:
        process.env.SUPABASE_SERVICE_ROLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
          ? "✅ Set"
          : "❌ Missing",
    });

    // Return detailed error in development, generic in production
    const responseError: {
      success: false;
      error: string;
      details?: string;
      code?: string;
      hint?: string;
    } = {
      success: false,
      error: "Failed to fetch learning plans",
    };

    if (process.env.NODE_ENV === "development") {
      responseError.details = errorMessage;
      if (errorCode) responseError.code = errorCode;
      if (errorHint) responseError.hint = errorHint;
    }

    return NextResponse.json(responseError, { status: 500 });
  }
}

// POST /api/guided-learning/plans - Create a new learning plan
export async function POST(request: NextRequest) {
  try {
    const planData = await request.json();

    // Validate required fields
    if (!planData.name || !planData.duration) {
      return NextResponse.json(
        { success: false, error: "Name and duration are required" },
        { status: 400 },
      );
    }

    // Add timestamps and defaults
    const newPlan = {
      ...planData,
      created_at: new Date(),
      updated_at: new Date(),
      is_active: planData.isActive === undefined ? true : planData.isActive,
      completionRate: planData.completionRate || 0,
      enrolledUsers: planData.enrolledUsers || 0,
    };

    // Save to Supabase
    const supabase = getSupabaseClient();
    const { data: createdPlan, error } = await supabase
      .from("learning_plans")
      .insert(newPlan)
      .select()
      .single();
    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "Plan created successfully",
      plan: createdPlan,
    });
  } catch (error) {
    console.error("Error creating learning plan:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create learning plan" },
      { status: 500 },
    );
  }
}

// DELETE /api/guided-learning/plans - Delete a learning plan
export async function DELETE(request: NextRequest) {
  try {
    console.log("DELETE request received");
    const { searchParams } = new URL(request.url);
    const planId = searchParams.get("id");
    // Security: Removed user data from logs to prevent log injection
    console.log("Plan ID to delete");

    if (!planId) {
      console.log("No plan ID provided");
      return NextResponse.json(
        { success: false, error: "Plan ID is required" },
        { status: 400 },
      );
    }

    // Delete from Supabase
    console.log("Attempting to delete from Supabase...");
    const supabase = getSupabaseClient();
    await supabase.from("learningplantemplates").delete().eq("id", planId);
    console.log("Successfully deleted from Firestore");

    return NextResponse.json({
      success: true,
      message: "Plan deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting learning plan:", error);
    return NextResponse.json(
      {
        success: false,
        error: `Failed to delete learning plan: ${error instanceof Error ? error.message : "Unknown error"}`,
      },
      { status: 500 },
    );
  }
}
