// v1.0 - API routes for frontend tasks CRUD operations

import { NextRequest, NextResponse } from 'next/server';
import {
  FrontendTask,
  FrontendTaskFormData,
  ApiResponse,
  PaginatedResponse,
} from '@/types/admin';
import {
  db,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
} from '@/lib/firebase-server';

// GET /api/admin/frontend-tasks - List all frontend tasks
export async function GET(request: NextRequest) {
  try {
    console.log('🔄 API: Fetching frontend tasks...');

    if (!db) {
      console.error('❌ API: Database not initialized');
      return NextResponse.json(
        { success: false, error: 'Database not initialized' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const difficulty = searchParams.get('difficulty') || '';

    // Fetch tasks from Firebase
    const tasksRef = collection(db, 'frontendTasks');
    let q = query(tasksRef, orderBy('createdAt', 'desc'));

    // Apply filters
    if (category) {
      q = query(
        tasksRef,
        where('category', '==', category),
        orderBy('createdAt', 'desc')
      );
    }
    if (difficulty) {
      q = query(
        tasksRef,
        where('difficulty', '==', difficulty),
        orderBy('createdAt', 'desc')
      );
    }

    const snapshot = await getDocs(q);
    let data: FrontendTask[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as FrontendTask[];

    // Apply search filter (client-side since Firestore doesn't support full-text search)
    if (search) {
      const lowerSearch = search.toLowerCase();
      data = data.filter(
        task =>
          task.title.toLowerCase().includes(lowerSearch) ||
          task.description.toLowerCase().includes(lowerSearch) ||
          task.category.toLowerCase().includes(lowerSearch) ||
          task.tags.some(tag => tag.toLowerCase().includes(lowerSearch))
      );
    }

    // Client-side pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = data.slice(startIndex, endIndex);

    console.log(
      `📊 API: Frontend tasks fetched: ${data.length} total, ${paginatedData.length} returned`
    );

    const response: PaginatedResponse<FrontendTask> = {
      success: true,
      data: paginatedData,
      total: data.length,
      page,
      limit,
      hasMore: endIndex < data.length,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('❌ API: Error fetching frontend tasks:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch frontend tasks' },
      { status: 500 }
    );
  }
}

// POST /api/admin/frontend-tasks - Create new frontend task
export async function POST(request: NextRequest) {
  try {
    console.log('🔄 API: Creating new frontend task...');

    if (!db) {
      console.error('❌ API: Database not initialized');
      return NextResponse.json(
        { success: false, error: 'Database not initialized' },
        { status: 500 }
      );
    }

    const body: FrontendTaskFormData = await request.json();

    // Validate required fields
    if (!body.title || !body.description || !body.category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create the task data
    const taskData = {
      ...body,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Add to Firebase
    const docRef = await addDoc(collection(db, 'frontendTasks'), taskData);

    console.log(`✅ API: Frontend task created with ID: ${docRef.id}`);

    const response: ApiResponse<{ id: string }> = {
      success: true,
      data: { id: docRef.id },
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('❌ API: Error creating frontend task:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create frontend task' },
      { status: 500 }
    );
  }
}
