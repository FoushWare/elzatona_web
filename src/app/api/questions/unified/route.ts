// v1.0 - Unified Questions API Route
// Single endpoint for all question operations

import { NextRequest, NextResponse } from 'next/server';
import UnifiedQuestionService, {
  BulkQuestionData,
} from '@/lib/unified-question-schema';
import { db } from '@/lib/firebase-server';

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
      isActive:
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
          | 'createdAt'
          | 'updatedAt'
          | 'order'
          | 'title') || undefined,
      orderDirection:
        (searchParams.get('orderDirection') as 'asc' | 'desc') || undefined,
    };

    // Remove undefined values
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== undefined)
    );

    const questions = await UnifiedQuestionService.getQuestions(cleanFilters);
    
    // Get total count for pagination (without limit)
    const totalCountFilters = { ...cleanFilters };
    delete totalCountFilters.limit;
    const allQuestions = await UnifiedQuestionService.getQuestions(totalCountFilters);
    const totalCount = allQuestions.length;
    
    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / pageSize);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      success: true,
      data: questions,
      pagination: {
        page,
        pageSize,
        totalCount,
        totalPages,
        hasNextPage,
        hasPrevPage,
        offset,
      },
      count: questions.length,
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}

// POST /api/questions/unified - Create new question or bulk import
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if it's a bulk import
    if (body.bulk && Array.isArray(body.questions)) {
      const results = await UnifiedQuestionService.bulkImportQuestions(
        body.questions
      );

      return NextResponse.json({
        success: true,
        message: `Bulk import completed: ${results.success} successful, ${results.failed} failed`,
        data: results,
      });
    }

    // Single question creation
    const questionId = await UnifiedQuestionService.createQuestion(body);

    // Auto-assign to section if learningPath is provided and no sectionId is specified
    if (body.learningPath && !body.sectionId) {
      try {
        const autoAssignResponse = await fetch(`${request.nextUrl.origin}/api/sections/auto-assign`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            questionId,
            learningPathId: body.learningPath,
            sectionSize: 15 // Default section size
          })
        });
        
        if (autoAssignResponse.ok) {
          const autoAssignData = await autoAssignResponse.json();
          console.log('Auto-assigned question to section:', autoAssignData.data);
        }
      } catch (autoAssignError) {
        console.warn('Failed to auto-assign question to section:', autoAssignError);
        // Don't fail the question creation if auto-assignment fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Question created successfully',
      data: { id: questionId },
    });
  } catch (error) {
    console.error('Error creating question:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create question' },
      { status: 500 }
    );
  }
}

// PUT /api/questions/unified - Update question
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Question ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    await UnifiedQuestionService.updateQuestion(id, body);

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

// DELETE /api/questions/unified - Delete question
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

    await UnifiedQuestionService.deleteQuestion(id);

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