// v1.0 - Unified Questions API Route
// Single endpoint for all question operations

import { NextRequest, NextResponse } from 'next/server';
import { db, collection, getDocs, query, where, orderBy, limit, startAfter, addDoc, updateDoc, deleteDoc, doc } from '@/lib/firebase-server';

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

    // Get questions from Firestore
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
    
    // Get total count
    const totalSnapshot = await getDocs(q);
    const totalCount = totalSnapshot.size;
    
    // Apply pagination
    if (offset > 0) {
      const offsetSnapshot = await getDocs(query(q, limit(offset)));
      const lastDoc = offsetSnapshot.docs[offsetSnapshot.docs.length - 1];
      q = query(q, startAfter(lastDoc));
    }
    
    q = query(q, limit(pageSize));
    
    const snapshot = await getDocs(q);
    const questions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    const totalPages = Math.ceil(totalCount / pageSize);

    return NextResponse.json({
      success: true,
      data: questions,
      pagination: {
        page,
        pageSize,
        totalCount,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
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
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const docRef = await addDoc(collection(db, 'unifiedQuestions'), questionWithTimestamps);
        results.push({ id: docRef.id, ...questionData });
      } catch (error) {
        console.error('Error creating question:', error);
        errors.push({ question: questionData, error: error.message });
      }
    }

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

    await deleteDoc(doc(db, 'unifiedQuestions', id));

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