// v1.0 - API routes for individual frontend task CRUD operations

import { NextRequest, NextResponse } from "next/server";
import {
  FrontendTask,
  FrontendTaskFormData,
  ApiResponse,
} from "@elzatona/types";
import { getSupabaseClient } from "../../../../../lib/supabase-client";

// GET /api/admin/frontend-tasks/[id] - Get a specific frontend task
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const supabase = getSupabaseClient();
    console.log("🔄 API: Fetching frontend task by ID...");

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Task ID is required" },
        { status: 400 },
      );
    }

    // Fetch task from Supabase
    const { data: taskDoc, error } = await supabase
      .from("frontend_tasks")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !taskDoc) {
      return NextResponse.json(
        { success: false, error: "Task not found" },
        { status: 404 },
      );
    }

    // Map snake_case to match FrontendTask interface
    const t = taskDoc;
    const taskData: FrontendTask = {
      id: t.id,
      title: t.title,
      description: t.description,
      difficulty: t.difficulty,
      category: t.category,
      timeLimit: t.time_limit,
      tags: t.tags || [],
      files: t.files || [],
      boilerplate: t.boilerplate,
      solution: t.solution,
      testCases: t.test_cases || [],
      created_at: t.created_at,
      updated_at: t.updated_at,
      is_active: t.is_active,
      order: t.order || 0,
      learningPathId: t.learning_path_id,
      moduleId: t.module_id || "default",
      metadata: t.metadata || {},
      // Default values for required fields
      estimatedTime: t.time_limit || 30,
      author: "System",
      company: "",
      requirements: "",
      hints: [],
      starterCode: t.boilerplate || "",
    };

    console.log(`✅ API: Frontend task fetched: ${taskData.title}`);

    const response: ApiResponse<FrontendTask> = {
      success: true,
      data: taskData,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("❌ API: Error fetching frontend task:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch frontend task" },
      { status: 500 },
    );
  }
}

// PUT /api/admin/frontend-tasks/[id] - Update a specific frontend task
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const supabase = getSupabaseClient();
    console.log("🔄 API: Updating frontend task...");

    const { id } = await params;
    const body: FrontendTaskFormData = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Task ID is required" },
        { status: 400 },
      );
    }

    // Validate required fields
    if (!body.title || !body.description || !body.category) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Check if task exists
    const { data: taskDoc, error: fetchError } = await supabase
      .from("frontend_tasks")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !taskDoc) {
      return NextResponse.json(
        { success: false, error: "Task not found" },
        { status: 404 },
      );
    }

    // Map camelCase to snake_case for update
    const updateData = {
      title: body.title,
      description: body.description,
      difficulty: body.difficulty,
      category: body.category,
      time_limit: body.timeLimit,
      tags: body.tags,
      files: body.files,
      boilerplate: body.boilerplate || null,
      solution: body.solution || null,
      test_cases: body.testCases,
      learning_path_id: body.learningPathId || null,
      module_id: body.moduleId || "default",
      metadata: body.metadata || {},
      updated_at: new Date().toISOString(),
    };

    // Update task in Supabase
    const { error: _updateError } = await supabase
      .from("frontend_tasks")
      .update(updateData)
      .eq("id", id);

    console.log(`✅ API: Frontend task updated: ${id}`);

    const response: ApiResponse<{ id: string }> = {
      success: true,
      data: { id },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("❌ API: Error updating frontend task:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update frontend task" },
      { status: 500 },
    );
  }
}

// DELETE /api/admin/frontend-tasks/[id] - Delete a specific frontend task
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const supabase = getSupabaseClient();
    console.log("🔄 API: Deleting frontend task...");

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Task ID is required" },
        { status: 400 },
      );
    }

    // Check if task exists
    const { data: taskDoc, error: fetchError } = await supabase
      .from("frontend_tasks")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !taskDoc) {
      return NextResponse.json(
        { success: false, error: "Task not found" },
        { status: 404 },
      );
    }

    // Delete task from Supabase
    const { error: deleteError } = await supabase
      .from("frontend_tasks")
      .delete()
      .eq("id", id);

    if (deleteError) {
      throw deleteError;
    }

    console.log(`✅ API: Frontend task deleted: ${id}`);

    const response: ApiResponse<{ id: string }> = {
      success: true,
      data: { id },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("❌ API: Error deleting frontend task:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete frontend task" },
      { status: 500 },
    );
  }
}
