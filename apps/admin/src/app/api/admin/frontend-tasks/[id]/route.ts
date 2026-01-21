import { NextRequest, NextResponse } from "next/server";
import { getRepositoryFactory } from "@elzatona/database";
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
    const factory = getRepositoryFactory();
    const questionRepo = factory.getQuestionRepository();
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Task ID is required" },
        { status: 400 },
      );
    }
    const task = await questionRepo.findById(id);
    if (!task) {
      return NextResponse.json(
        { success: false, error: "Task not found" },
        { status: 404 },
      );
    }
    const response: ApiResponse<any> = {
      success: true,
      data: task,
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
    const factory = getRepositoryFactory();
    const questionRepo = factory.getQuestionRepository();
    const { id } = await params;
    const body: FrontendTaskFormData = await request.json();
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Task ID is required" },
        { status: 400 },
      );
    }
    if (!body.title || !body.description || !body.category) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }
    const updateData = {
      ...body,
      updatedAt: new Date(),
    };
    await questionRepo.update(id, updateData as any);
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
    const factory = getRepositoryFactory();
    const questionRepo = factory.getQuestionRepository();
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Task ID is required" },
        { status: 400 },
      );
    }
    await questionRepo.delete(id);
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
