// v1.0 - API routes for individual problem solving task operations

import { NextRequest, NextResponse } from 'next/server';
import { AdminFirestoreHelper, COLLECTIONS } from '@/lib/firebase-admin';
import {
  ProblemSolvingTask,
  ProblemSolvingTaskFormData,
  ApiResponse,
} from '@/types/admin';

// GET /api/admin/problem-solving/[id] - Get specific problem solving task
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const task = await AdminFirestoreHelper.getDocument<ProblemSolvingTask>(
      COLLECTIONS.PROBLEM_SOLVING_TASKS,
      id
    );

    if (!task) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    const response: ApiResponse<ProblemSolvingTask> = {
      success: true,
      data: task,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching problem solving task:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch problem solving task' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/problem-solving/[id] - Update problem solving task
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body: Partial<ProblemSolvingTaskFormData> = await request.json();

    // Check if task exists
    const existingTask =
      await AdminFirestoreHelper.getDocument<ProblemSolvingTask>(
        COLLECTIONS.PROBLEM_SOLVING_TASKS,
        id
      );

    if (!existingTask) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    // Update the task
    await AdminFirestoreHelper.updateDocument<ProblemSolvingTask>(
      COLLECTIONS.PROBLEM_SOLVING_TASKS,
      id,
      body
    );

    const response: ApiResponse<{ id: string }> = {
      success: true,
      data: { id },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error updating problem solving task:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update problem solving task' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/problem-solving/[id] - Delete problem solving task (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    // Check if task exists
    const existingTask =
      await AdminFirestoreHelper.getDocument<ProblemSolvingTask>(
        COLLECTIONS.PROBLEM_SOLVING_TASKS,
        id
      );

    if (!existingTask) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    // Soft delete by setting isActive to false
    await AdminFirestoreHelper.updateDocument<ProblemSolvingTask>(
      COLLECTIONS.PROBLEM_SOLVING_TASKS,
      id,
      { isActive: false }
    );

    const response: ApiResponse<{ id: string }> = {
      success: true,
      data: { id },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error deleting problem solving task:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete problem solving task' },
      { status: 500 }
    );
  }
}
