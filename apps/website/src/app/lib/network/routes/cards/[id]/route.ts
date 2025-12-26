import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "../../../../get-supabase-client";

// GET /api/cards/[id] - Get a single card by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const supabase = getSupabaseClient();
    const { data: cardSnap, error } = await supabase
      .from("learning_cards")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !cardSnap) {
      return NextResponse.json(
        { success: false, error: "Card not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: { id: cardSnap.id, ...cardSnap },
    });
  } catch (error) {
    console.error("Error fetching card:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch card" },
      { status: 500 },
    );
  }
}

// PUT /api/cards/[id] - Update a card
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const updateData = await request.json();

    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from("learning_cards")
      .update({ ...updateData, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: "Card updated successfully",
    });
  } catch (error) {
    console.error("Error updating card:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update card" },
      { status: 500 },
    );
  }
}

// DELETE /api/cards/[id] - Delete a card
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from("learning_cards")
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: "Card deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting card:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete card" },
      { status: 500 },
    );
  }
}
