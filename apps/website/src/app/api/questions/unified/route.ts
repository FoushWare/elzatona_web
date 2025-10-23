// v1.0 - Unified Questions API Route (Supabase Only)
// Single endpoint for all question operations

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Simple in-memory cache for questions (resets on server restart)
let questionsCache: Array<{
  id: string;
  [key: string]: unknown;
}> | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 30000; // 30 seconds

// GET /api/questions/unified - Get questions with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Pagination parameters
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const offset = (page - 1) * pageSize;

    const filters = {
      category: searchParams.get('category') || undefined,
      subcategory: searchParams.get('subcategory') || undefined,
      difficulty: searchParams.get('difficulty') || undefined,
      learningPath: searchParams.get('learningPath') || undefined,
      sectionId: searchParams.get('sectionId') || undefined,
      is_active:
        searchParams.get('isActive') === 'true'
          ? true
          : searchParams.get('isActive') === 'false'
            ? false
            : undefined,
      isComplete:
        searchParams.get('isComplete') === 'true'
          ? true
          : searchParams.get('isComplete') === 'false'
            ? false
            : undefined,
      limit: pageSize,
      orderBy:
        (searchParams.get('orderBy') as
          | 'created_at'
          | 'updated_at'
          | 'order_index'
          | 'title') || undefined,
      orderDirection:
        (searchParams.get('orderDirection') as 'asc' | 'desc') || undefined,
    };

    // Remove undefined values
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([, value]) => value !== undefined)
    );

    // Build query with learning cards
    let query = supabase.from('questions').select(`
      *,
      learning_cards (
        id,
        title,
        type,
        color,
        icon
      )
    `);

    // Apply filters
    if (cleanFilters.category) {
      query = query.eq('category_id', cleanFilters.category);
    }
    if (cleanFilters.difficulty) {
      query = query.eq('difficulty', cleanFilters.difficulty);
    }
    if (cleanFilters.learningPath) {
      query = query.eq('learning_card_id', cleanFilters.learningPath);
    }
    if (cleanFilters.isActive !== undefined) {
      query = query.eq('is_active', cleanFilters.isActive);
    }

    // Get total count with same filters
    let countQuery = supabase
      .from('questions')
      .select('*', { count: 'exact', head: true });
    if (cleanFilters.category) {
      countQuery = countQuery.eq('category_id', cleanFilters.category);
    }
    if (cleanFilters.difficulty) {
      countQuery = countQuery.eq('difficulty', cleanFilters.difficulty);
    }
    if (cleanFilters.learningPath) {
      countQuery = countQuery.eq('learning_card_id', cleanFilters.learningPath);
    }
    if (cleanFilters.isActive !== undefined) {
      countQuery = countQuery.eq('is_active', cleanFilters.isActive);
    }

    const { count, error: countError } = await countQuery;
    if (countError) throw countError;

    // Apply pagination
    query = query.range(offset, offset + pageSize - 1);
    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;
    if (error) throw error;

    const questions = data || [];
    const totalCount = count || 0;

    const totalPages = Math.ceil(totalCount / pageSize);

    // Include pagination by default, but allow disabling for performance
    const includePagination = searchParams.get('includePagination') !== 'false';

    return NextResponse.json({
      success: true,
      data: questions,
      ...(includePagination && {
        pagination: {
          page,
          pageSize,
          totalCount,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      }),
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}

// POST /api/questions/unified - Create questions (bulk import or single)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { questions, isBulkImport = false } = body;

    if (!questions || !Array.isArray(questions)) {
      return NextResponse.json(
        { success: false, error: 'Questions array is required' },
        { status: 400 }
      );
    }

    const results = [];
    const errors = [];

    for (const questionData of questions) {
      try {
        const questionWithTimestamps = {
          ...questionData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        const { data, error } = await supabase
          .from('questions')
          .insert(questionWithTimestamps)
          .select()
          .single();

        if (error) throw error;

        results.push({ id: data.id, ...questionData });
      } catch (error) {
        console.error('Error creating question:', error);
        errors.push({
          question: questionData,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    // Invalidate cache after creating questions
    questionsCache = null;

    return NextResponse.json({
      success: true,
      data: {
        success: results.length,
        failed: errors.length,
        errors: errors.map(e => e.error),
        results: results,
      },
      message: `Successfully ${isBulkImport ? 'imported' : 'created'} ${results.length} questions`,
    });
  } catch (error) {
    console.error('Error creating questions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create questions' },
      { status: 500 }
    );
  }
}

// PUT /api/questions/unified - Update a question
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Question ID is required' },
        { status: 400 }
      );
    }

    const updateWithTimestamps = {
      ...updateData,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('questions')
      .update(updateWithTimestamps)
      .eq('id', id);

    if (error) throw error;

    // Invalidate cache after updating question
    questionsCache = null;

    return NextResponse.json({
      success: true,
      message: 'Question updated successfully',
    });
  } catch (error) {
    console.error('Error updating question:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update question' },
      { status: 500 }
    );
  }
}

// DELETE /api/questions/unified - Delete a question
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Question ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabase.from('questions').delete().eq('id', id);

    if (error) throw error;

    // Invalidate cache after deleting question
    questionsCache = null;

    return NextResponse.json({
      success: true,
      message: 'Question deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting question:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete question' },
      { status: 500 }
    );
  }
}
