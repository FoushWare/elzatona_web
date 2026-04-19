// v1.1 - Refactored Learning Plans Route
import { NextRequest, NextResponse } from "next/server";
import {
  getSupabaseClient,
  getSupabaseClientWithAnonKey,
} from "../../../../get-supabase-client";
import { AutoLinkingService } from "../../../../auto-linking-service";

// -----------------------------------------------------------------------------
// Helper Functions (Extracted for Cognitive Complexity Reduction)
// -----------------------------------------------------------------------------

/**
 * Handles requests for sections data used in plan creation.
 */
async function handleSectionsRequest(searchParams: URLSearchParams) {
  const category = searchParams.get("category");
  const learningPath = searchParams.get("learningPath");
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

/**
 * Fetches and merges hardcoded plans with those from the database.
 */
async function fetchCombinedPlans() {
  let supabase;
  try {
    supabase = getSupabaseClient();
  } catch {
    supabase = getSupabaseClientWithAnonKey();
  }

  const { studyPlans: hardcodedPlans } = await import("@elzatona/utilities");
  let plans = [...hardcodedPlans];

  try {
    const { data: dbPlans, error } = await supabase
      .from("learning_plans")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && dbPlans?.length) {
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
  return plans;
}

/**
 * Standardized error handler for the plans route.
 */
function handleRouteError(error: unknown) {
  const msg =
    error instanceof Error ? error.message : "Failed to fetch learning plans";
  console.error("❌ Plans Route Error:", msg);

  const response: any = {
    success: false,
    error: "Failed to fetch learning plans",
  };
  if (process.env.NODE_ENV === "development") {
    response.details = msg;
    if (error && typeof error === "object") {
      response.code = (error as any).code;
      response.hint = (error as any).hint;
    }
  }
  return NextResponse.json(response, { status: 500 });
}

// -----------------------------------------------------------------------------
// API Handlers
// -----------------------------------------------------------------------------

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    if (searchParams.get("getSections") === "true") {
      return await handleSectionsRequest(searchParams);
    }

    if (searchParams.get("getQuestions") === "true") {
      return NextResponse.json({ success: true, data: [], count: 0 });
    }

    const plans = await fetchCombinedPlans();
    return NextResponse.json({ success: true, data: plans || [] });
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const planData = await request.json();
    if (!planData.name || !planData.duration) {
      return NextResponse.json(
        { success: false, error: "Name and duration are required" },
        { status: 400 },
      );
    }

    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("learning_plans")
      .insert({
        ...planData,
        created_at: new Date(),
        updated_at: new Date(),
        is_active: planData.isActive ?? true,
        completionRate: planData.completionRate || 0,
        enrolledUsers: planData.enrolledUsers || 0,
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({
      success: true,
      message: "Plan created successfully",
      plan: data,
    });
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = Object.fromEntries(new URL(request.url).searchParams);
    if (!id)
      return NextResponse.json(
        { success: false, error: "Plan ID is required" },
        { status: 400 },
      );

    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from("learning_plans")
      .delete()
      .eq("id", id);
    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "Plan deleted successfully",
    });
  } catch (error) {
    return handleRouteError(error);
  }
}
