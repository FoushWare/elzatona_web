// v1.0 - Unified Questions API Route
// Single endpoint for all question operations

import { NextRequest, NextResponse } from 'next/server';
import {
  db,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from '@/lib/firebase-server';

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
    if (!db) {
      throw new Error('Firebase not initialized');
    }

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
      Object.entries(filters).filter(([, value]) => value !== undefined)
    );

    // Check cache first
    const now = Date.now();
    let allQuestions: Array<{
      id: string;
      [key: string]: unknown;
    }>;

    if (questionsCache && now - cacheTimestamp < CACHE_DURATION) {
      // Use cached data
      allQuestions = questionsCache;
      console.log('📦 Using cached questions:', allQuestions.length);
    } else {
      // Fetch from Firestore
      let q = query(collection(db, 'unifiedQuestions'));

      // Apply filters
      if (cleanFilters.category) {
        q = query(q, where('category', '==', cleanFilters.category));
      }
      if (cleanFilters.difficulty) {
        q = query(q, where('difficulty', '==', cleanFilters.difficulty));
      }

      // Order by createdAt descending
      q = query(q, orderBy('createdAt', 'desc'));

      // For small datasets, get all and paginate in memory (more efficient)
      const allSnapshot = await getDocs(q);
      allQuestions = allSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Update cache
      questionsCache = allQuestions;
      cacheTimestamp = now;
      console.log(
        '🔄 Fetched fresh questions from Firestore:',
        allQuestions.length
      );
    }

    const totalCount = allQuestions.length;

    // Apply pagination in memory
    const startIndex = offset;
    const endIndex = startIndex + pageSize;
    const questions = allQuestions.slice(startIndex, endIndex);

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
    if (!db) {
      throw new Error('Firebase not initialized');
    }

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
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const docRef = await addDoc(
          collection(db, 'unifiedQuestions'),
          questionWithTimestamps
        );
        results.push({ id: docRef.id, ...questionData });
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
      data: results,
      errors: errors.length > 0 ? errors : undefined,
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
    if (!db) {
      throw new Error('Firebase not initialized');
    }

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
      updatedAt: new Date(),
    };

    await updateDoc(doc(db, 'unifiedQuestions', id), updateWithTimestamps);

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
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Question ID is required' },
        { status: 400 }
      );
    }

    await deleteDoc(doc(db, 'unifiedQuestions', id));

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
