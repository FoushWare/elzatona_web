// Categories API Route
// v1.0 - Category management for topics and questions

import { NextRequest, NextResponse } from 'next/server';
import { firestoreService } from '@/lib/firestore-service';

export interface Category {
  id: string;
  name: string;
  description?: string;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}

// GET /api/categories - Get all categories
export async function GET() {
  try {
    const categories = await firestoreService.getAllCategories();

    return NextResponse.json({
      success: true,
      data: categories,
      count: categories.length,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch categories',
      },
      { status: 500 }
    );
  }
}

// POST /api/categories - Create a new category
export async function POST(request: NextRequest) {
  try {
    const categoryData = await request.json();

    // Validate required fields
    if (!categoryData.name || categoryData.name.trim() === '') {
      return NextResponse.json(
        {
          success: false,
          error: 'Category name is required',
        },
        { status: 400 }
      );
    }

    const category = await firestoreService.createCategory(categoryData);

    return NextResponse.json({
      success: true,
      data: category,
      message: 'Category created successfully',
    });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : 'Failed to create category',
      },
      { status: 500 }
    );
  }
}
