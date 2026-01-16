import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "../../../../../lib/supabase-client";
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
    const supabase = getSupabaseClient();
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
      .from("problem_solving_tasks")
      .select()
      .eq("id", id)
      .single();

    if (error || !taskDoc) {
      return NextResponse.json(
        { success: false, error: "Task not found" },
        { status: 404 },
      );
    }

    const t = taskDoc;
    const taskData: ProblemSolvingTask = {
      id: t.id,
      title: t.title,
      description: t.description,
      difficulty: t.difficulty,
      category: t.category,
      functionName: t.function_name || t.functionName,
      starterCode: t.starter_code || t.starterCode,
      solution: t.solution,
      testCases: t.test_cases || t.testCases || [],
      constraints: t.constraints || [],
      examples: t.examples || [],
      tags: t.tags || [],
      created_at: t.created_at,
      updated_at: t.updated_at,
      is_active: t.is_active,
    };

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
    const supabase = getSupabaseClient();
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
      .from("problem_solving_tasks")
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
    const updateData: any = {
      ...body,
      updated_at: new Date().toISOString(),
    };

    // Map specific fields back to snake_case if they exist in body
    if (body.functionName) updateData.function_name = body.functionName;
    if (body.starterCode) updateData.starter_code = body.starterCode;
    if (body.testCases) updateData.test_cases = body.testCases;

    // Cleanup camelCase fields before sending to DB (optional but cleaner)
    delete updateData.functionName;
    delete updateData.starterCode;
    delete updateData.testCases;

    const { error: updateError } = await supabase
      .from("problem_solving_tasks")
      .update(updateData)
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

// DELETE /api/admin/problem-solving/[id] - Delete problem solving task
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const supabase = getSupabaseClient();
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
      .from("problem_solving_tasks")
      .select()
      .eq("id", id)
      .single();

    if (error || !taskDoc) {
      return NextResponse.json(
        { success: false, error: "Task not found" },
        { status: 404 },
      );
    }

    // Hard delete for now, or soft delete if preferred
    const { error: deleteError } = await supabase
      .from("problem_solving_tasks")
      .delete()
      .eq("id", id);

    if (deleteError) {
      throw deleteError;
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
