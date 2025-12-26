import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "../../../../../get-supabase-client";
import { QuestionTopic } from "../route";

// GET /api/admin/topics/[topicId]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ topicId: string }> },
) {
  try {
    const supabase = getSupabaseClient();
    const { topicId } = await params;

    const { data: topicSnap, error } = await supabase
      .from("topics")
      .select("*")
      .eq("id", topicId)
      .single();

    if (error || !topicSnap) {
      return NextResponse.json(
        {
          success: false,
          error: "Topic not found",
        },
        { status: 404 },
      );
    }

    const topic: QuestionTopic = {
      id: topicSnap.id,
      ...topicSnap,
    } as QuestionTopic;

    return NextResponse.json({
      success: true,
      data: topic,
    });
  } catch (error) {
    console.error("Error fetching topic:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch topic",
      },
      { status: 500 },
    );
  }
}

// PUT /api/admin/topics/[topicId]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ topicId: string }> },
) {
  try {
    const supabase = getSupabaseClient();
    const { topicId } = await params;
    const body = await request.json();
    const { name, description, category, color } = body;

    const { data: topicSnap, error: fetchError } = await supabase
      .from("topics")
      .select("*")
      .eq("id", topicId)
      .single();

    if (fetchError || !topicSnap) {
      return NextResponse.json(
        {
          success: false,
          error: "Topic not found",
        },
        { status: 404 },
      );
    }

    const updateData: Partial<QuestionTopic> = {
      updated_at: new Date().toISOString(),
    };

    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (category !== undefined) updateData.category = category;
    if (color !== undefined) updateData.color = color;

    const { error: updateError } = await supabase
      .from("topics")
      .update(updateData)
      .eq("id", topicId);

    if (updateError) {
      throw updateError;
    }

    // Fetch updated topic
    const { data: updatedSnap, error: fetchUpdatedError } = await supabase
      .from("topics")
      .select("*")
      .eq("id", topicId)
      .single();

    if (fetchUpdatedError || !updatedSnap) {
      throw fetchUpdatedError;
    }

    const updatedTopic: QuestionTopic = {
      id: updatedSnap.id,
      ...updatedSnap,
    } as QuestionTopic;

    return NextResponse.json({
      success: true,
      data: updatedTopic,
    });
  } catch (error) {
    console.error("Error updating topic:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update topic",
      },
      { status: 500 },
    );
  }
}

// DELETE /api/admin/topics/[topicId]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ topicId: string }> },
) {
  try {
    const supabase = getSupabaseClient();
    const { topicId } = await params;

    const { data: topicSnap, error: fetchError } = await supabase
      .from("topics")
      .select("*")
      .eq("id", topicId)
      .single();

    if (fetchError || !topicSnap) {
      return NextResponse.json(
        {
          success: false,
          error: "Topic not found",
        },
        { status: 404 },
      );
    }

    const { error: deleteError } = await supabase
      .from("topics")
      .delete()
      .eq("id", topicId);

    if (deleteError) {
      throw deleteError;
    }

    return NextResponse.json({
      success: true,
      message: "Topic deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting topic:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete topic",
      },
      { status: 500 },
    );
  }
}
