import { NextResponse } from "next/server";
import { getSupabaseClient } from "../../../../../get-supabase-client";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ planId: string }> },
) {
  try {
    const { planId } = await params;

    if (!planId) {
      return NextResponse.json(
        { success: false, error: "Plan ID is required" },
        { status: 400 },
      );
    }

    // Get the plan from Supabase
    const supabase = getSupabaseClient();
    const { data: plan, error } = await supabase
      .from("learning_plans")
      .select("*")
      .eq("id", planId)
      .single();

    if (error || !plan) {
      return NextResponse.json(
        { success: false, error: "Plan not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: plan });
  } catch (error: unknown) {
    console.error("Error fetching plan:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ planId: string }> },
) {
  try {
    const { planId } = await params;
    const updateData = await request.json();

    if (!planId) {
      return NextResponse.json(
        { success: false, error: "Plan ID is required" },
        { status: 400 },
      );
    }

    // Update the plan in Supabase
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from("learning_plans")
      .update({
        ...updateData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", planId);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: "Plan updated successfully",
    });
  } catch (error: unknown) {
    console.error("Error updating plan:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}
