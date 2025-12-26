import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "../../../../get-supabase-client";

// GET /api/categories/[id] - Get a specific category
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: categoryId } = await params;

    if (!categoryId) {
      return NextResponse.json(
        { success: false, error: "Category ID is required" },
        { status: 400 },
      );
    }

    const supabase = getSupabaseClient();
    const { data: categorySnap, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", categoryId)
      .single();

    if (error || !categorySnap) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 },
      );
    }

    const categoryData = {
      id: categorySnap.id,
      ...categorySnap,
    };

    return NextResponse.json({
      success: true,
      data: categoryData,
    });
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch category" },
      { status: 500 },
    );
  }
}

// PUT /api/categories/[id] - Update a specific category
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: categoryId } = await params;
    const body = await request.json();

    if (!categoryId) {
      return NextResponse.json(
        { success: false, error: "Category ID is required" },
        { status: 400 },
      );
    }

    // Validate required fields
    if (!body.name) {
      return NextResponse.json(
        { success: false, error: "Category name is required" },
        { status: 400 },
      );
    }

    // Check if category exists
    const supabase = getSupabaseClient();
    const { data: categorySnap, error: fetchError } = await supabase
      .from("categories")
      .select("*")
      .eq("id", categoryId)
      .single();

    if (fetchError || !categorySnap) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 },
      );
    }

    // Prepare update data
    const updateData = {
      ...body,
      updated_at: new Date().toISOString(),
    };

    const { error: updateError } = await supabase
      .from("categories")
      .update(updateData)
      .eq("id", categoryId);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json({
      success: true,
      message: "Category updated successfully",
      data: { id: categoryId, ...updateData },
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update category" },
      { status: 500 },
    );
  }
}

// DELETE /api/categories/[id] - Delete a specific category
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: categoryId } = await params;

    if (!categoryId) {
      return NextResponse.json(
        { success: false, error: "Category ID is required" },
        { status: 400 },
      );
    }

    // Check if category exists
    const supabase = getSupabaseClient();
    const { data: categorySnap, error: fetchError } = await supabase
      .from("categories")
      .select("*")
      .eq("id", categoryId)
      .single();

    if (fetchError || !categorySnap) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 },
      );
    }

    // Delete the category
    const { error: deleteError } = await supabase
      .from("categories")
      .delete()
      .eq("id", categoryId);

    if (deleteError) {
      throw deleteError;
    }

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete category" },
      { status: 500 },
    );
  }
}
