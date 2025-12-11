import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const {
      title,
      content,
      type,
      difficulty,
      points,
      options,
      correct_answer,
      explanation,
      test_cases,
      hints,
      tags,
      stats,
      metadata,
      category_id,
      topic_id,
      learning_card_id,
      isActive = true,
    } = body;

    const { data, error } = await supabase
      .from("questions")
      .update({
        title,
        content,
        type,
        difficulty,
        points,
        options,
        correct_answer,
        explanation,
        test_cases,
        hints,
        tags,
        stats,
        metadata,
        category_id,
        topic_id,
        learning_card_id,
        is_active: isActive,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to update question";
    console.error("Error updating question:", errorMessage);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { error } = await supabase.from("questions").delete().eq("id", id);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to delete question";
    console.error("Error deleting question:", errorMessage);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}
