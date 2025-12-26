import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "../../../../get-supabase-client";

// GET /api/topics/[id] - Get a specific topic
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: topicId } = await params;

    if (!topicId) {
      return NextResponse.json(
        { success: false, error: "Topic ID is required" },
        { status: 400 },
      );
    }

    const supabase = getSupabaseClient();
    const { data: topic, error } = await supabase
      .from("topics")
      .select("*")
      .eq("id", topicId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { success: false, error: "Topic not found" },
          { status: 404 },
        );
      }
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: topic,
    });
  } catch (error) {
    console.error("Error fetching topic:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch topic" },
      { status: 500 },
    );
  }
}

// PUT /api/topics/[id] - Update a specific topic
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: topicId } = await params;
    const body = await request.json();

    if (!topicId) {
      return NextResponse.json(
        { success: false, error: "Topic ID is required" },
        { status: 400 },
      );
    }

    // Validate required fields
    if (!body.name) {
      return NextResponse.json(
        { success: false, error: "Topic name is required" },
        { status: 400 },
      );
    }

    // Map camelCase fields to snake_case database fields
    const updateData: any = {
      name: body.name,
      description: body.description || null,
      difficulty: body.difficulty || null,
      slug: body.slug || null,
      updated_at: new Date().toISOString(),
    };

    // Map categoryId to category_id
    if (body.categoryId !== undefined) {
      updateData.category_id = body.categoryId;
    } else if (body.category_id !== undefined) {
      updateData.category_id = body.category_id;
    }

    // Map estimatedQuestions to estimated_questions
    if (body.estimatedQuestions !== undefined) {
      updateData.estimated_questions = body.estimatedQuestions;
    } else if (body.estimated_questions !== undefined) {
      updateData.estimated_questions = body.estimated_questions;
    }

    // Map order to order_index
    if (body.order !== undefined) {
      updateData.order_index = body.order;
    } else if (body.order_index !== undefined) {
      updateData.order_index = body.order_index;
    }

    // Handle is_active if provided
    if (body.is_active !== undefined) {
      updateData.is_active = body.is_active;
    } else if (body.isActive !== undefined) {
      updateData.is_active = body.isActive;
    }

    console.log("📝 Updating topic:", topicId, "with data:", updateData);

    const supabase = getSupabaseClient();
    const { data: updatedTopic, error } = await supabase
      .from("topics")
      .update(updateData)
      .eq("id", topicId)
      .select()
      .single();

    if (error) {
      console.error("❌ Database error updating topic:", error);
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { success: false, error: "Topic not found" },
          { status: 404 },
        );
      }
      return NextResponse.json(
        {
          success: false,
          error: "Failed to update topic",
          details: error.message,
          code: error.code,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Topic updated successfully",
      data: updatedTopic,
    });
  } catch (error) {
    console.error("❌ Error updating topic:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update topic",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// DELETE /api/topics/[id] - Delete a specific topic
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: topicId } = await params;

    if (!topicId) {
      return NextResponse.json(
        { success: false, error: "Topic ID is required" },
        { status: 400 },
      );
    }

    const supabase = getSupabaseClient();
    const { error } = await supabase.from("topics").delete().eq("id", topicId);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: "Topic deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting topic:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete topic" },
      { status: 500 },
    );
  }
}
