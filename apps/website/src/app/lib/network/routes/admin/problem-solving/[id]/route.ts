// v1.0 - API routes for individual problem solving task operations

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
import {
  ProblemSolvingTask,
  ProblemSolvingTaskFormData,
  ApiResponse,
} from "@elzatona/types";

// GET /api/admin/problem-solving/[id] - Get specific problem solving task
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    console.log("🔄 API: Fetching problem solving task by ID...");

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Task ID is required" },
        { status: 400 },
      );
    }

    // Fetch task from Supabase
    const { data: taskDoc, error } = await supabase
      .from("problem_solving")
      .select()
      .eq("id", id)
      .single();

    if (error || !taskDoc) {
      return NextResponse.json(
        { success: false, error: "Task not found" },
        { status: 404 },
      );
    }

    const taskData = {
      id: taskDoc.id,
      ...taskDoc,
    } as ProblemSolvingTask;

    console.log(`✅ API: Problem solving task fetched: ${taskData.title}`);

    const response: ApiResponse<ProblemSolvingTask> = {
      success: true,
      data: taskData,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("❌ API: Error fetching problem solving task:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch problem solving task" },
      { status: 500 },
    );
  }
}

// PUT /api/admin/problem-solving/[id] - Update problem solving task
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    console.log("🔄 API: Updating problem solving task...");

    const { id } = await params;
    const body: Partial<ProblemSolvingTaskFormData> = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Task ID is required" },
        { status: 400 },
      );
    }

    // Check if task exists
    const { data: taskDoc, error } = await supabase
      .from("problem_solving")
      .select()
      .eq("id", id)
      .single();

    if (error || !taskDoc) {
      return NextResponse.json(
        { success: false, error: "Task not found" },
        { status: 404 },
      );
    }

    // Update task in Supabase
    const { error: updateError } = await supabase
      .from("problem_solving")
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (updateError) {
      throw updateError;
    }

    console.log(`✅ API: Problem solving task updated: ${id}`);

    const response: ApiResponse<{ id: string }> = {
      success: true,
      data: { id },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("❌ API: Error updating problem solving task:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update problem solving task" },
      { status: 500 },
    );
  }
}

// DELETE /api/admin/problem-solving/[id] - Delete problem solving task (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    console.log("🔄 API: Deleting problem solving task...");

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Task ID is required" },
        { status: 400 },
      );
    }

    // Check if task exists
    const { data: taskDoc, error } = await supabase
      .from("problem_solving")
      .select()
      .eq("id", id)
      .single();

    if (error || !taskDoc) {
      return NextResponse.json(
        { success: false, error: "Task not found" },
        { status: 404 },
      );
    }

    // Soft delete by setting is_active to false
    const { error: updateError } = await supabase
      .from("problem_solving")
      .update({
        is_active: false,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (updateError) {
      throw updateError;
    }

    console.log(`✅ API: Problem solving task deleted: ${id}`);

    const response: ApiResponse<{ id: string }> = {
      success: true,
      data: { id },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("❌ API: Error deleting problem solving task:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete problem solving task" },
      { status: 500 },
    );
  }
}
