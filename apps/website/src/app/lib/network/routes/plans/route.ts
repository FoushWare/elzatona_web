import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "../../utils/api-config";

// Helper function to create Supabase client using centralized config
// This ensures correct environment (test/production) is used
function createSupabaseClient() {
  const config = getSupabaseConfig();
  return createClient(config.url, config.anonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// GET /api/plans - Get all learning plans
export async function GET(_request: NextRequest) {
  try {
    // Security: Removed debug logging to prevent information disclosure
    const supabase = createSupabaseClient();

    const { data: plans, error } = await supabase
      .from("learning_plans")
      .select("*")
      .order("created_at", { ascending: true });

    // Security: Removed debug logging to prevent information disclosure

    if (error) {
      // Security: Removed detailed error logging to prevent information disclosure
      return NextResponse.json(
        {
          success: false,
          error: "Failed to fetch plans from database",
          details: error.message,
        },
        { status: 500 },
      );
    }

    // Security: Removed debug logging to prevent information disclosure

    return NextResponse.json({
      success: true,
      data: plans || [],
      count: plans?.length || 0,
    });
  } catch (_error) {
    // Security: Removed detailed error logging to prevent information disclosure
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch plans from database",
      },
      { status: 500 },
    );
  }
}

// POST /api/plans - Create a new learning plan
export async function POST(request: NextRequest) {
  try {
    const planData = await request.json();

    const supabase = createSupabaseClient();

    const planWithTimestamps = {
      ...planData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: "admin",
      updated_by: "admin",
      is_active: true,
    };

    const { data: newPlan, error } = await supabase
      .from("learning_plans")
      .insert(planWithTimestamps)
      .select()
      .single();

    if (error) {
      // Security: Removed detailed error logging to prevent information disclosure
      return NextResponse.json(
        {
          success: false,
          error: "Failed to create plan in database",
          details: error.message,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      data: newPlan,
      message: "Plan created successfully",
    });
  } catch (_error) {
    // Security: Removed detailed error logging to prevent information disclosure
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create plan in database",
      },
      { status: 500 },
    );
  }
}
