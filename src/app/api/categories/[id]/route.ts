// Individual Category API Route
// v1.0 - Handle individual category operations (GET, PUT, DELETE)

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-server';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

// GET /api/categories/[id] - Get a specific category
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    const { id: categoryId } = await params;
    const categoryRef = doc(db, 'categories', categoryId);
    const categorySnap = await getDoc(categoryRef);

    if (!categorySnap.exists()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Category not found'
        },
        { status: 404 }
      );
    }

    const categoryData = categorySnap.data();
    const category = {
      id: categorySnap.id,
      ...categoryData,
      createdAt: categoryData.createdAt?.toDate() || new Date(),
      updatedAt: categoryData.updatedAt?.toDate() || new Date(),
    };

    return NextResponse.json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch category'
      },
      { status: 500 }
    );
  }
}

// PUT /api/categories/[id] - Update a category
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    const { id: categoryId } = await params;
    const updateData = await request.json();

    // Validate required fields
    if (!updateData.name) {
      return NextResponse.json(
        {
          success: false,
          error: 'Category name is required'
        },
        { status: 400 }
      );
    }

    const categoryRef = doc(db, 'categories', categoryId);
    const categorySnap = await getDoc(categoryRef);

    if (!categorySnap.exists()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Category not found'
        },
        { status: 404 }
      );
    }

    // Update the category
    await updateDoc(categoryRef, {
      ...updateData,
      updatedAt: new Date(),
    });

    // Fetch the updated category
    const updatedSnap = await getDoc(categoryRef);
    const updatedData = updatedSnap.data();
    const updatedCategory = {
      id: updatedSnap.id,
      ...updatedData,
      createdAt: updatedData.createdAt?.toDate() || new Date(),
      updatedAt: updatedData.updatedAt?.toDate() || new Date(),
    };

    return NextResponse.json({
      success: true,
      data: updatedCategory,
      message: 'Category updated successfully'
    });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update category'
      },
      { status: 500 }
    );
  }
}

// DELETE /api/categories/[id] - Delete a category
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    const { id: categoryId } = await params;
    const categoryRef = doc(db, 'categories', categoryId);
    const categorySnap = await getDoc(categoryRef);

    if (!categorySnap.exists()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Category not found'
        },
        { status: 404 }
      );
    }

    // Delete the category
    await deleteDoc(categoryRef);

    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete category'
      },
      { status: 500 }
    );
  }
}
