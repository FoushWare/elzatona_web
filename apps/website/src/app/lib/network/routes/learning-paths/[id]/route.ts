import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "../../../../get-supabase-client";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: pathId } = await params;

    if (!pathId) {
      return NextResponse.json(
        { error: "Learning path ID is required" },
        { status: 400 },
      );
    }

    // Fetch learning path from Firebase
    const supabase = getSupabaseClient();
    const { data: learningPath, error } = await supabase
      .from("learningpaths")
      .select("*")
      .eq("id", pathId)
      .single();
    if (error) throw error;

    if (!learningPath) {
      return NextResponse.json(
        { error: "Learning path not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(learningPath);
  } catch (error) {
    console.error("Error fetching learning path:", error);
    return NextResponse.json(
      { error: "Failed to fetch learning path" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: pathId } = await params;
    const body = await request.json();

    if (!pathId) {
      return NextResponse.json(
        { error: "Learning path ID is required" },
        { status: 400 },
      );
    }

    // Update learning path in Firebase
    const supabase = getSupabaseClient();
    const { data: updatedPath, error } = await supabase
      .from("learningpaths")
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq("id", pathId);
    if (error) throw error;

    if (!updatedPath) {
      return NextResponse.json(
        { error: "Learning path not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedPath);
  } catch (error) {
    console.error("Error updating learning path:", error);
    return NextResponse.json(
      { error: "Failed to update learning path" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: pathId } = await params;

    if (!pathId) {
      return NextResponse.json(
        { error: "Learning path ID is required" },
        { status: 400 },
      );
    }

    // Delete learning path from Firebase
    const supabase = getSupabaseClient();
    const { data: success, error } = await supabase
      .from("learningpaths")
      .delete()
      .eq("id", pathId);
    if (error) throw error;

    if (!success) {
      return NextResponse.json(
        { error: "Learning path not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting learning path:", error);
    return NextResponse.json(
      { error: "Failed to delete learning path" },
      { status: 500 },
    );
  }
}
