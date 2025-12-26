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
      console.log("✅ Using service role key for Supabase client");
    } catch (clientError) {
      // Fallback to anon key if service role is not available
      console.log(
        "⚠️ Service role key not available, using anon key:",
        clientError instanceof Error
          ? clientError.message
          : String(clientError),
      );
      supabase = getSupabaseClientWithAnonKey();
      console.log("✅ Using anon key for Supabase client");
    }

    // Try learning_plans first (standard table name), then learningplantemplates as fallback
    console.log("🔍 Querying learning_plans table...");
    let { data: plans, error } = await supabase
      .from("learning_plans")
      .select("*")
      .order("created_at", { ascending: false });

    // Log the error details if present
    if (error) {
      console.log("❌ learning_plans query error:", {
        message: error.message,
        code: error.code,
        hint: error.hint,
        details: error.details,
      });
    } else if (plans) {
      console.log(`✅ Found ${plans.length} plans in learning_plans table`);
    }

    // If learning_plans doesn't exist or is empty, try learningplantemplates (old table name)
    if (error || !plans || plans.length === 0) {
      console.log(
        "⚠️ learning_plans query failed or empty, trying learningplantemplates...",
      );
      const { data: plansAlt, error: errorAlt } = await supabase
        .from("learningplantemplates")
        .select("*")
        .order("created_at", { ascending: false });

      if (errorAlt) {
        console.log("❌ learningplantemplates query error:", {
          message: errorAlt.message,
          code: errorAlt.code,
          hint: errorAlt.hint,
          details: errorAlt.details,
        });
      }

      if (!errorAlt && plansAlt && plansAlt.length > 0) {
        plans = plansAlt;
        error = null;
        console.log(
          `✅ Found ${plansAlt.length} plans in learningplantemplates table`,
        );
      } else {
        // If both fail but we have an empty result (no error), return empty array
        if (!error && !errorAlt) {
          console.log("ℹ️ Both tables exist but are empty");
          return NextResponse.json({ success: true, data: [] });
        }
      }
    }

    if (error) {
      // Create a proper Error object from Supabase error
      const supabaseError = new Error(error.message || "Supabase query failed");
       
      const errorWithExtras = supabaseError as Error & {
        code?: string;
        hint?: string;
        details?: string;
      };
      if (error.code) errorWithExtras.code = error.code;
      if (error.hint) errorWithExtras.hint = error.hint;
      if (error.details) errorWithExtras.details = error.details;
      throw errorWithExtras;
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
