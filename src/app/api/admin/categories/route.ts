import { NextRequest, NextResponse } from 'next/server';
import { firestoreService } from '@/lib/firestore-service';

export async function GET() {
  try {
    const categories = await firestoreService.getAllCategories();

    return NextResponse.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch categories'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, color } = body;

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          error: 'Name is required'
        },
        { status: 400 }
      );
    }

    const categoryData = {
      name,
      description: description || '',
      color: color || '#3B82F6',
    };

    const category = await firestoreService.createCategory(categoryData);

    return NextResponse.json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create category'
      },
      { status: 500 }
    );
  }
}

