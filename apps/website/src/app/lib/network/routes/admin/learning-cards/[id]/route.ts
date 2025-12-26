import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "../../../../../get-supabase-client";

// GET /api/admin/learning-cards/[id] - Get a specific learning card
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const supabase = getSupabaseClient();
    const { id } = await params;
    const { data: cardSnap, error } = await supabase
      .from("learning_cards")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !cardSnap) {
      return NextResponse.json(
        {
          success: false,
          error: "Learning card not found",
        },
        { status: 404 },
      );
    }

    const card = {
      id: cardSnap.id,
      title: cardSnap.title,
      type: cardSnap.type,
      description: cardSnap.description,
      color: cardSnap.color,
      icon: cardSnap.icon,
      order: cardSnap.order,
      sections: cardSnap.sections || [],
      topics: cardSnap.topics || [],
      question_count: cardSnap.question_count || 0,
      created_at: cardSnap.created_at || new Date(),
      updated_at: cardSnap.updated_at || new Date(),
    };

    return NextResponse.json({
      success: true,
      data: card,
    });
  } catch (error) {
    console.error("Error fetching learning card:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch learning card",
      },
      { status: 500 },
    );
  }
}

// PUT /api/admin/learning-cards/[id] - Update a learning card
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const supabase = getSupabaseClient();
    const { id } = await params;
    const body = await request.json();
    const {
      title,
      type,
      description,
      color,
      icon,
      order,
      sections,
      topics,
      questionCount,
    } = body;

    if (!title || !type || !description) {
      return NextResponse.json(
        {
          success: false,
          error: "Title, type, and description are required",
        },
        { status: 400 },
      );
    }

    const { error } = await supabase
      .from("learning_cards")
      .update({
        title,
        type,
        description,
        color,
        icon,
        order: order || 0,
        sections: sections || [],
        topics: topics || [],
        question_count: questionCount || 0,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: {
        id: id,
        title,
        type,
        description,
        color,
        icon,
        order: order || 0,
        sections: sections || [],
        topics: topics || [],
        question_count: questionCount || 0,
      },
    });
  } catch (error) {
    console.error("Error updating learning card:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update learning card",
      },
      { status: 500 },
    );
  }
}

// DELETE /api/admin/learning-cards/[id] - Delete a learning card
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const supabase = getSupabaseClient();
    const { id } = await params;
    const { error } = await supabase
      .from("learning_cards")
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: "Learning card deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting learning card:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete learning card",
      },
      { status: 500 },
    );
  }
}
