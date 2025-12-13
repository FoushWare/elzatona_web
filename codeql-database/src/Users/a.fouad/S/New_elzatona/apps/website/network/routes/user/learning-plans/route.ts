import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import { cookies } from "next/headers";
import { verifySupabaseToken } from "../../../../lib/server-auth";
import { LearningPlanProgress } from "../../../../types/firestore";

export async function GET(request: NextRequest) {
  try {
    // Get the Firebase token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("firebase-token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    // Verify the Firebase token
    const decodedToken = await verifySupabaseToken(token);
    if (!decodedToken) {
      return NextResponse.json(
        { error: "Invalid authentication token" },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);
    const planId = searchParams.get("planId");

    if (planId) {
      // Get specific learning plan
      const { data: plan, error } = await supabase
        .from("learning_plans")
        .select("*")
        .eq("id", planId)
        .single();

      if (error || !plan) {
        return NextResponse.json(
          { error: "Learning plan not found" },
          { status: 404 },
        );
      }

      return NextResponse.json({
        success: true,
        plan,
      });
    } else {
      // Get all learning plans for user
      const { data: userData, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", decodedToken.id)
        .single();

      if (error || !userData) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        plans: userData.learning_plans || [],
      });
    }
  } catch (error) {
    console.error("Error fetching learning plans:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get the Firebase token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("firebase-token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    // Verify the Firebase token
    const decodedToken = await verifySupabaseToken(token);
    if (!decodedToken) {
      return NextResponse.json(
        { error: "Invalid authentication token" },
        { status: 401 },
      );
    }

    const planData: LearningPlanProgress = await request.json();

    // Validate plan data
    if (!planData.plan_id || !planData.planName) {
      return NextResponse.json(
        { error: "Plan ID and name are required" },
        { status: 400 },
      );
    }

    // Start new learning plan
    const { error } = await supabase.from("user_learning_plans").insert({
      user_id: decodedToken.id,
      plan_id: planData.plan_id,
      plan_name: planData.planName,
      started_at: new Date().toISOString(),
      progress: 0,
      questions_completed: 0,
      status: "active",
    });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "Learning plan started successfully",
      plan_id: planData.plan_id,
    });
  } catch (error) {
    console.error("Error starting learning plan:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Get the Firebase token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("firebase-token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    // Verify the Firebase token
    const decodedToken = await verifySupabaseToken(token);
    if (!decodedToken) {
      return NextResponse.json(
        { error: "Invalid authentication token" },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);
    const planId = searchParams.get("planId");

    if (!planId) {
      return NextResponse.json(
        { error: "Plan ID is required" },
        { status: 400 },
      );
    }

    const updates: Partial<LearningPlanProgress> = await request.json();

    // Update learning plan
    const { error } = await supabase
      .from("user_learning_plans")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", decodedToken.id)
      .eq("plan_id", planId);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "Learning plan updated successfully",
    });
  } catch (error) {
    console.error("Error updating learning plan:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
