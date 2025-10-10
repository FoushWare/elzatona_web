// v1.0 - API routes for individual frontend task CRUD operations

import { NextRequest, NextResponse } from 'next/server';
import { FrontendTask, FrontendTaskFormData, ApiResponse } from '@/types/admin';
import {
  db,
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from '@/lib/firebase-server';

// GET /api/admin/frontend-tasks/[id] - Get a specific frontend task
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    console.log('🔄 API: Fetching frontend task by ID...');

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
    const taskDoc = await getDoc(doc(db, 'frontendTasks', id));

    if (!taskDoc.exists()) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    const taskData = {
      id: taskDoc.id,
      ...taskDoc.data(),
    } as FrontendTask;

    console.log(`✅ API: Frontend task fetched: ${taskData.title}`);

    const response: ApiResponse<FrontendTask> = {
      success: true,
      data: taskData,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('❌ API: Error fetching frontend task:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch frontend task' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/frontend-tasks/[id] - Update a specific frontend task
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    console.log('🔄 API: Updating frontend task...');

    if (!db) {
      console.error('❌ API: Database not initialized');
      return NextResponse.json(
        { success: false, error: 'Database not initialized' },
        { status: 500 }
      );
    }

    const { id } = await params;
    const body: FrontendTaskFormData = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Task ID is required' },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!body.title || !body.description || !body.category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if task exists
    const taskDoc = await getDoc(doc(db, 'frontendTasks', id));

    if (!taskDoc.exists()) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    // Update task in Firebase
    await updateDoc(doc(db, 'frontendTasks', id), {
      ...body,
      updatedAt: new Date(),
    });

    console.log(`✅ API: Frontend task updated: ${id}`);

    const response: ApiResponse<{ id: string }> = {
      success: true,
      data: { id },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('❌ API: Error updating frontend task:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update frontend task' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/frontend-tasks/[id] - Delete a specific frontend task
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    console.log('🔄 API: Deleting frontend task...');

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
    const taskDoc = await getDoc(doc(db, 'frontendTasks', id));

    if (!taskDoc.exists()) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    // Delete task from Firebase
    await deleteDoc(doc(db, 'frontendTasks', id));

    console.log(`✅ API: Frontend task deleted: ${id}`);

    const response: ApiResponse<{ id: string }> = {
      success: true,
      data: { id },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('❌ API: Error deleting frontend task:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete frontend task' },
      { status: 500 }
    );
  }
}
