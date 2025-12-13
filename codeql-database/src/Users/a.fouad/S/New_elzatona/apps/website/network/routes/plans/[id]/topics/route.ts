import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// POST /api/plans/[id]/topics - Add a topic to a plan (through plan_categories)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: planId } = await params;
    const { topic_id, category_id } = await request.json();

    if (!topic_id) {
      return NextResponse.json(
        { success: false, error: "Topic ID is required" },
        { status: 400 },
      );
    }

    // If category_id is provided, ensure the category is in the plan first
    if (category_id) {
      const { data: planCategory } = await supabase
        .from("plan_categories")
        .select("id")
        .eq("plan_id", planId)
        .eq("category_id", category_id)
        .single();

      if (!planCategory) {
        return NextResponse.json(
          { success: false, error: "Category must be added to plan first" },
          { status: 400 },
        );
      }
    }

    // Note: Topics are typically added through categories
    // If you have a plan_topics table, add it here
    // For now, we'll return success but note that topics should be added via categories

    return NextResponse.json({
      success: true,
      message: "Topic can be accessed through plan categories",
      note: "Topics are associated with categories. Add the category to the plan to access its topics.",
    });
  } catch (error: any) {
    console.error("Error adding topic to plan:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to add topic to plan" },
      { status: 500 },
    );
  }
}

// GET /api/plans/[id]/topics - Get all topics in a plan (through categories)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: planId } = await params;

    // Get all categories in the plan
    const { data: planCategories, error: pcError } = await supabase
      .from("plan_categories")
      .select("category_id")
      .eq("plan_id", planId);

    if (pcError) throw pcError;

    if (!planCategories || planCategories.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    const categoryIds = planCategories.map((pc) => pc.category_id);

    // Get all topics for these categories
    const { data: topics, error } = await supabase
      .from("topics")
      .select("*")
      .in("category_id", categoryIds);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: topics || [],
    });
  } catch (error: any) {
    console.error("Error fetching plan topics:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch plan topics" },
      { status: 500 },
    );
  }
}
