import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// POST /api/plans/[id]/categories - Add a category to a plan
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: planId } = await params;
    const { category_id, order_index, is_primary } = await request.json();

    if (!category_id) {
      return NextResponse.json(
        { success: false, error: "Category ID is required" },
        { status: 400 },
      );
    }

    // Check if category is already in plan
    const { data: existing } = await supabase
      .from("plan_categories")
      .select("id")
      .eq("plan_id", planId)
      .eq("category_id", category_id)
      .single();

    if (existing) {
      return NextResponse.json(
        { success: false, error: "Category is already in this plan" },
        { status: 400 },
      );
    }

    // Get max order_index
    const { data: maxOrder } = await supabase
      .from("plan_categories")
      .select("order_index")
      .eq("plan_id", planId)
      .order("order_index", { ascending: false })
      .limit(1)
      .single();

    const nextOrder = order_index ?? (maxOrder?.order_index ?? -1) + 1;

    const { data, error } = await supabase
      .from("plan_categories")
      .insert({
        plan_id: planId,
        category_id,
        order_index: nextOrder,
        is_primary: is_primary ?? false,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
      message: "Category added to plan successfully",
    });
  } catch (error: any) {
    console.error("Error adding category to plan:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to add category to plan",
      },
      { status: 500 },
    );
  }
}

// GET /api/plans/[id]/categories - Get all categories in a plan
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: planId } = await params;

    const { data, error } = await supabase
      .from("plan_categories")
      .select("*, categories(*)")
      .eq("plan_id", planId)
      .order("order_index", { ascending: true });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    console.error("Error fetching plan categories:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch plan categories",
      },
      { status: 500 },
    );
  }
}

// DELETE /api/plans/[id]/categories - Remove a category from a plan
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: planId } = await params;
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("category_id");

    if (!categoryId) {
      return NextResponse.json(
        { success: false, error: "Category ID is required" },
        { status: 400 },
      );
    }

    const { error } = await supabase
      .from("plan_categories")
      .delete()
      .eq("plan_id", planId)
      .eq("category_id", categoryId);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "Category removed from plan successfully",
    });
  } catch (error: any) {
    console.error("Error removing category from plan:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to remove category from plan",
      },
      { status: 500 },
    );
  }
}
