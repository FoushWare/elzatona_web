import { NextRequest, NextResponse } from 'next/server';
import { firestoreService } from '@/lib/firestore-service';

export async function GET() {
  try {
    const sections = await firestoreService.getAllSections();

    return NextResponse.json({
      success: true,
      data: sections
    });
  } catch (error) {
    console.error('Error fetching sections:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch sections'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, category, difficulty, estimatedTime, order, isActive } = body;

    if (!name || !category) {
      return NextResponse.json(
        {
          success: false,
          error: 'Name and category are required'
        },
        { status: 400 }
      );
    }

    const sectionData = {
      name,
      description: description || '',
      category,
      difficulty: difficulty || 'beginner',
      estimatedTime: estimatedTime || '',
      order: order || 1,
      isActive: isActive !== false,
      questionCount: 0,
    };

    const section = await firestoreService.createSection(sectionData);

    return NextResponse.json({
      success: true,
      data: section
    });
  } catch (error) {
    console.error('Error creating section:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create section'
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { sectionId, updates } = body;

    if (!sectionId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Section ID is required'
        },
        { status: 400 }
      );
    }

    const section = await firestoreService.updateSection(sectionId, updates);

    return NextResponse.json({
      success: true,
      data: section
    });
  } catch (error) {
    console.error('Error updating section:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update section'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { sectionId } = body;

    if (!sectionId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Section ID is required'
        },
        { status: 400 }
      );
    }

    await firestoreService.deleteSection(sectionId);

    return NextResponse.json({
      success: true,
      message: 'Section deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting section:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete section'
      },
      { status: 500 }
    );
  }
}