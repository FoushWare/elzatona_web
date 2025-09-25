import { NextRequest, NextResponse } from 'next/server';
import { SectionService } from '@/lib/section-service';
import { autoLinkingService } from '@/lib/auto-linking-service';

// GET - Get all sections or questions for a specific section
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sectionId = searchParams.get('sectionId');
    const getQuestions = searchParams.get('getQuestions') === 'true';

    // If requesting questions for a specific section
    if (sectionId && getQuestions) {
      const questions = await autoLinkingService.getQuestionsForSection(sectionId);
      return NextResponse.json({
        success: true,
        data: questions,
        count: questions.length
      });
    }

    // Otherwise, get all sections
    const result = await SectionService.getSections();

    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Sections API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve sections' },
      { status: 500 }
    );
  }
}

// POST - Add new section
export async function POST(request: NextRequest) {
  try {
    const { name, description } = await request.json();

    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Section name is required' },
        { status: 400 }
      );
    }

    const result = await SectionService.addSection(
      name.trim(),
      description?.trim()
    );

    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Sections API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add section' },
      { status: 500 }
    );
  }
}

// PUT - Update section
export async function PUT(request: NextRequest) {
  try {
    const { sectionId, updates } = await request.json();

    if (!sectionId) {
      return NextResponse.json(
        { success: false, error: 'Section ID is required' },
        { status: 400 }
      );
    }

    const result = await SectionService.updateSection(sectionId, updates);

    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Sections API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update section' },
      { status: 500 }
    );
  }
}

// DELETE - Delete section
export async function DELETE(request: NextRequest) {
  try {
    const { sectionId } = await request.json();

    if (!sectionId) {
      return NextResponse.json(
        { success: false, error: 'Section ID is required' },
        { status: 400 }
      );
    }

    const result = await SectionService.deleteSection(sectionId);

    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Sections API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete section' },
      { status: 500 }
    );
  }
}
