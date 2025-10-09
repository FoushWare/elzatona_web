// v1.0 - API routes for individual frontend task operations

import { NextRequest, NextResponse } from 'next/server';
import { AdminFirestoreHelper, COLLECTIONS } from '@/lib/firebase-admin';
import { FrontendTask, FrontendTaskFormData, ApiResponse } from '@/types/admin';

// GET /api/admin/frontend-tasks/[id] - Get specific frontend task
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const task = await AdminFirestoreHelper.getDocument<FrontendTask>(
      COLLECTIONS.FRONTEND_TASKS,
      id
    );

    if (!task) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    const response: ApiResponse<FrontendTask> = {
      success: true,
      data: task,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching frontend task:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch frontend task' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/frontend-tasks/[id] - Update frontend task
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body: Partial<FrontendTaskFormData> = await request.json();

    // Check if task exists
    const existingTask = await AdminFirestoreHelper.getDocument<FrontendTask>(
      COLLECTIONS.FRONTEND_TASKS,
      id
    );

    if (!existingTask) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    // Update the task
    await AdminFirestoreHelper.updateDocument<FrontendTask>(
      COLLECTIONS.FRONTEND_TASKS,
      id,
      body
    );

    const response: ApiResponse<{ id: string }> = {
      success: true,
      data: { id },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error updating frontend task:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update frontend task' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/frontend-tasks/[id] - Delete frontend task (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Check if task exists
    const existingTask = await AdminFirestoreHelper.getDocument<FrontendTask>(
      COLLECTIONS.FRONTEND_TASKS,
      id
    );

    if (!existingTask) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    // Soft delete by setting isActive to false
    await AdminFirestoreHelper.updateDocument<FrontendTask>(
      COLLECTIONS.FRONTEND_TASKS,
      id,
      { isActive: false }
    );

    const response: ApiResponse<{ id: string }> = {
      success: true,
      data: { id },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error deleting frontend task:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete frontend task' },
      { status: 500 }
    );
  }
}
