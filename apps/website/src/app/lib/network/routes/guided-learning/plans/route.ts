import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

import { AutoLinkingService } from "../../../../auto-linking-service";

// Lazy Supabase client creation - only create when route is called, not during build
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // For service role operations, use anon key as fallback if service role key is not available
  // ⚠️ WARNING: Never hardcode API keys. Always use environment variables.
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Missing required Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and (SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY) must be set",
    );
  }

  return createClient(supabaseUrl, supabaseKey);
}

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
    const supabase = getSupabaseClient();
    // Try learningplantemplates first (old table name), then learning_plans
    let { data: plans, error } = await supabase
      .from("learningplantemplates")
      .select("*")
      .order("created_at", { ascending: false });

    // If learningplantemplates doesn't exist or is empty, try learning_plans
    if (error || !plans || plans.length === 0) {
      const { data: plansAlt, error: errorAlt } = await supabase
        .from("learning_plans")
        .select("*")
        .order("created_at", { ascending: false });
      if (!errorAlt && plansAlt) {
        plans = plansAlt;
        error = null;
      }
    }

    if (error) throw error;
    return NextResponse.json({ success: true, data: plans || [] });
  } catch (error) {
    console.error("Error fetching learning plans:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch learning plans" },
      { status: 500 },
    );
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

    // Delete from Firestore
    console.log("Attempting to delete from Firestore...");
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
