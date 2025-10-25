import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const difficulty = searchParams.get('difficulty');
    const search = searchParams.get('search');

    let query = supabase
      .from('problem_solving_tasks')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    // Apply filters
    if (category) {
      query = query.eq('category', category);
    }
    if (difficulty) {
      query = query.eq('difficulty', difficulty);
    }
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Get total count for pagination
    const { count } = await query.select('*', { count: 'exact', head: true });

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data: tasks, error } = await query;

    if (error) {
      console.error('Error fetching problem solving tasks:', error);
      return NextResponse.json(
        { error: 'Failed to fetch problem solving tasks' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      tasks,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error('Error in problem-solving API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from('problem_solving_tasks')
      .insert([
        {
          title: body.title,
          description: body.description,
          difficulty: body.difficulty,
          category: body.category,
          function_name: body.function_name,
          starter_code: body.starter_code,
          solution: body.solution,
          test_cases: body.test_cases || [],
          constraints: body.constraints || [],
          examples: body.examples || [],
          tags: body.tags || [],
          is_active: true,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating problem solving task:', error);
      return NextResponse.json(
        { error: 'Failed to create problem solving task' },
        { status: 500 }
      );
    }

    return NextResponse.json({ task: data }, { status: 201 });
  } catch (error) {
    console.error('Error in problem-solving POST API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
