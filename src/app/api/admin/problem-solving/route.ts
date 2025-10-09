// v1.0 - API routes for problem solving tasks CRUD operations

import { NextRequest, NextResponse } from 'next/server';
import { AdminFirestoreHelper, COLLECTIONS } from '@/lib/firebase-admin';
import {
  ProblemSolvingTask,
  ProblemSolvingTaskFormData,
  ApiResponse,
  PaginatedResponse,
} from '@/types/admin';

// GET /api/admin/problem-solving - List all problem solving tasks
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const difficulty = searchParams.get('difficulty') || '';

    let whereClauses: { field: string; operator: any; value: any }[] = [];

    if (category) {
      whereClauses.push({ field: 'category', operator: '==', value: category });
    }

    if (difficulty) {
      whereClauses.push({
        field: 'difficulty',
        operator: '==',
        value: difficulty,
      });
    }

    whereClauses.push({ field: 'isActive', operator: '==', value: true });

    let data: ProblemSolvingTask[];
    let total: number;

    if (search) {
      data = await AdminFirestoreHelper.searchDocuments<ProblemSolvingTask>(
        COLLECTIONS.PROBLEM_SOLVING_TASKS,
        search,
        ['title', 'description', 'category', 'tags'],
        { limit: 100, orderBy: 'createdAt', orderDirection: 'desc' }
      );
      total = data.length;
    } else {
      const result =
        await AdminFirestoreHelper.listDocuments<ProblemSolvingTask>(
          COLLECTIONS.PROBLEM_SOLVING_TASKS,
          {
            limit: limit * 10, // Get more to filter client-side
            orderBy: 'createdAt',
            orderDirection: 'desc',
            where: whereClauses,
          }
        );
      data = result.data;
      total = result.total;
    }

    // Client-side pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = data.slice(startIndex, endIndex);

    const response: PaginatedResponse<ProblemSolvingTask> = {
      success: true,
      data: paginatedData,
      total,
      page,
      limit,
      hasMore: endIndex < data.length,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching problem solving tasks:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch problem solving tasks' },
      { status: 500 }
    );
  }
}

// POST /api/admin/problem-solving - Create new problem solving task
export async function POST(request: NextRequest) {
  try {
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

    // Create the task
    const taskId =
      await AdminFirestoreHelper.createDocument<ProblemSolvingTask>(
        COLLECTIONS.PROBLEM_SOLVING_TASKS,
        {
          ...body,
          isActive: true,
        }
      );

    const response: ApiResponse<{ id: string }> = {
      success: true,
      data: { id: taskId },
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating problem solving task:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create problem solving task' },
      { status: 500 }
    );
  }
}
