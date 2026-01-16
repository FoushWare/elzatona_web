import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "../../../../lib/supabase-client";
import {
  FrontendTask,
  FrontendTaskFormData,
  ApiResponse,
} from "@elzatona/types";

// GET /api/admin/frontend-tasks/[id] - Get a specific frontend task
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const supabase = getSupabaseClient();
    console.log("🔄 Admin API: Fetching frontend task by ID...");

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

    const taskData: FrontendTask = {
      ...taskDoc,
      // Map database fields to camelCase types if necessary
      estimatedTime: taskDoc.estimated_time,
      starterCode: taskDoc.starter_code,
      testCases: taskDoc.test_cases,
    };

    const response: ApiResponse<FrontendTask> = {
      success: true,
      data: taskData,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("❌ Admin API: Error fetching frontend task:", error);
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
    console.log("🔄 Admin API: Updating frontend task...");

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

    // Prepare update data
    const updateData = {
      title: body.title,
      description: body.description,
      requirements: body.requirements,
      solution: body.solution,
      starter_code: body.starterCode,
      category: body.category,
      difficulty: body.difficulty,
      estimated_time: body.estimatedTime,
      author: body.author,
      company: body.company,
      files: body.files,
      test_cases: body.testCases,
      tags: body.tags,
      is_active: body.is_active !== false,
      updated_at: new Date().toISOString(),
    };

    // Update task in Supabase
    const { error: updateError } = await supabase
      .from("frontend_tasks")
      .update(updateData)
      .eq("id", id);

    if (updateError) {
      throw updateError;
    }

    console.log(`✅ Admin API: Frontend task updated: ${id}`);

    const response: ApiResponse<{ id: string }> = {
      success: true,
      data: { id },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("❌ Admin API: Error updating frontend task:", error);
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
    console.log("🔄 Admin API: Deleting frontend task...");

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Task ID is required" },
        { status: 400 },
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

    console.log(`✅ Admin API: Frontend task deleted: ${id}`);

    const response: ApiResponse<{ id: string }> = {
      success: true,
      data: { id },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("❌ Admin API: Error deleting frontend task:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete frontend task" },
      { status: 500 },
    );
  }
}
