// v1.0 - API routes for problem solving tasks CRUD operations

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
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

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const difficulty = searchParams.get('difficulty') || '';

    // Fetch tasks from Supabase
    let query = supabase
      .from('problem_solving')
      .select('*')
      .order('created_at', { ascending: false });

    // Apply filters
    if (category) {
      query = query.eq('category', category);
    }
    if (difficulty) {
      query = query.eq('difficulty', difficulty);
    }

    const { data: snapshot, error } = await query;

    if (error) {
      throw error;
    }

    let data: ProblemSolvingTask[] = snapshot.map(doc => ({
      id: doc.id,
      ...doc,
    })) as ProblemSolvingTask[];

    // Apply search filter (client-side since Supabase doesn't support full-text search)
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
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Add to Supabase
    const { data: newTask, error } = await supabase
      .from('problem_solving')
      .insert(taskData)
      .select()
      .single();

    if (error) {
      throw error;
    }

    console.log(`✅ API: Problem solving task created with ID: ${newTask.id}`);

    const response: ApiResponse<{ id: string }> = {
      success: true,
      data: { id: newTask.id },
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
