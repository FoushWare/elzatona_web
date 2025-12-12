// v1.0 - API routes for individual frontend task CRUD operations

import { NextRequest, NextResponse } from "next/server";
import {
  FrontendTask,
  FrontendTaskFormData,
  ApiResponse,
} from "../../../../../types/admin";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// GET /api/admin/frontend-tasks/[id] - Get a specific frontend task
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
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

    const taskData = {
      id: taskDoc.id,
      ...taskDoc,
    } as FrontendTask;

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

    // Update task in Supabase
    const { error: _updateError } = await supabase
      .from("frontend_tasks")
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
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
