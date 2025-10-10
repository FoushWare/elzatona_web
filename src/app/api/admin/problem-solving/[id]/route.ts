// v1.0 - API routes for individual problem solving task operations

import { NextRequest, NextResponse } from 'next/server';
import { db, doc, getDoc, updateDoc, deleteDoc } from '@/lib/firebase-server';
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
  try {
    console.log('🔄 API: Fetching problem solving task by ID...');

    if (!db) {
      console.error('❌ API: Database not initialized');
      return NextResponse.json(
        { success: false, error: 'Database not initialized' },
        { status: 500 }
      );
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Task ID is required' },
        { status: 400 }
      );
    }

    // Fetch task from Firebase
    const taskDoc = await getDoc(doc(db, 'problemSolvingTasks', id));

    if (!taskDoc.exists()) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    const taskData = {
      id: taskDoc.id,
      ...taskDoc.data(),
    } as ProblemSolvingTask;

    console.log(`✅ API: Problem solving task fetched: ${taskData.title}`);

    const response: ApiResponse<ProblemSolvingTask> = {
      success: true,
      data: taskData,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('❌ API: Error fetching problem solving task:', error);
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
  try {
    console.log('🔄 API: Updating problem solving task...');

    if (!db) {
      console.error('❌ API: Database not initialized');
      return NextResponse.json(
        { success: false, error: 'Database not initialized' },
        { status: 500 }
      );
    }

    const { id } = await params;
    const body: Partial<ProblemSolvingTaskFormData> = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Task ID is required' },
        { status: 400 }
      );
    }

    // Check if task exists
    const taskDoc = await getDoc(doc(db, 'problemSolvingTasks', id));

    if (!taskDoc.exists()) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    // Update task in Firebase
    await updateDoc(doc(db, 'problemSolvingTasks', id), {
      ...body,
      updatedAt: new Date(),
    });

    console.log(`✅ API: Problem solving task updated: ${id}`);

    const response: ApiResponse<{ id: string }> = {
      success: true,
      data: { id },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('❌ API: Error updating problem solving task:', error);
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
  try {
    console.log('🔄 API: Deleting problem solving task...');

    if (!db) {
      console.error('❌ API: Database not initialized');
      return NextResponse.json(
        { success: false, error: 'Database not initialized' },
        { status: 500 }
      );
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Task ID is required' },
        { status: 400 }
      );
    }

    // Check if task exists
    const taskDoc = await getDoc(doc(db, 'problemSolvingTasks', id));

    if (!taskDoc.exists()) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    // Soft delete by setting isActive to false
    await updateDoc(doc(db, 'problemSolvingTasks', id), {
      isActive: false,
      updatedAt: new Date(),
    });

    console.log(`✅ API: Problem solving task deleted: ${id}`);

    const response: ApiResponse<{ id: string }> = {
      success: true,
      data: { id },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('❌ API: Error deleting problem solving task:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete problem solving task' },
      { status: 500 }
    );
  }
}
