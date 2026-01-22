import { NextRequest, NextResponse } from "next/server";
import { getRepositoryFactory } from "@elzatona/database";
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
    const factory = getRepositoryFactory();
    const questionRepo = factory.getQuestionRepository();
    const { id } = await params;
    const body: Partial<ProblemSolvingTaskFormData> = await request.json();
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Task ID is required" },
        { status: 400 },
      );
    }
    await questionRepo.update(id, { ...body, updatedAt: new Date() } as any);
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
    console.error("❌ API: Error deleting problem solving task:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete problem solving task" },
      { status: 500 },
    );
  }
}
