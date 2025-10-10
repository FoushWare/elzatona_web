// v1.0 - API routes for problem solving tasks CRUD operations

import { NextRequest, NextResponse } from 'next/server';
import {
  db,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
} from '@/lib/firebase-server';
import {
  ProblemSolvingTask,
  ProblemSolvingTaskFormData,
  ApiResponse,
  PaginatedResponse,
} from '@/types/admin';

// GET /api/admin/problem-solving - List all problem solving tasks
export async function GET(request: NextRequest) {
  try {
    console.log('🔄 API: Fetching problem solving tasks...');

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
    const tasksRef = collection(db, 'problemSolvingTasks');
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
    let data: ProblemSolvingTask[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as ProblemSolvingTask[];

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
      `📊 API: Problem solving tasks fetched: ${data.length} total, ${paginatedData.length} returned`
    );

    const response: PaginatedResponse<ProblemSolvingTask> = {
      success: true,
      data: paginatedData,
      total: data.length,
      page,
      limit,
      hasMore: endIndex < data.length,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('❌ API: Error fetching problem solving tasks:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch problem solving tasks' },
      { status: 500 }
    );
  }
}

// POST /api/admin/problem-solving - Create new problem solving task
export async function POST(request: NextRequest) {
  try {
    console.log('🔄 API: Creating new problem solving task...');

    if (!db) {
      console.error('❌ API: Database not initialized');
      return NextResponse.json(
        { success: false, error: 'Database not initialized' },
        { status: 500 }
      );
    }

    const body: ProblemSolvingTaskFormData = await request.json();

    // Validate required fields
    if (
      !body.title ||
      !body.description ||
      !body.category ||
      !body.functionName
    ) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate test cases
    if (!body.testCases || body.testCases.length === 0) {
      return NextResponse.json(
        { success: false, error: 'At least one test case is required' },
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
    const docRef = await addDoc(
      collection(db, 'problemSolvingTasks'),
      taskData
    );

    console.log(`✅ API: Problem solving task created with ID: ${docRef.id}`);

    const response: ApiResponse<{ id: string }> = {
      success: true,
      data: { id: docRef.id },
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('❌ API: Error creating problem solving task:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create problem solving task' },
      { status: 500 }
    );
  }
}
