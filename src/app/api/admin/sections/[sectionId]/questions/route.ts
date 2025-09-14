import { NextRequest, NextResponse } from 'next/server';
import { SectionService, BulkQuestionData } from '@/lib/section-service';

// GET - Get questions for a section
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sectionId: string }> }
) {
  try {
    const { sectionId } = await params;

    const result = await SectionService.getSectionQuestions(sectionId);

    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Section questions API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve section questions' },
      { status: 500 }
    );
  }
}

// POST - Add question to section
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ sectionId: string }> }
) {
  try {
    const { sectionId } = await params;
    const questionData = await request.json();

    const result = await SectionService.addQuestion(sectionId, questionData);

    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Section questions API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add question' },
      { status: 500 }
    );
  }
}

// PUT - Add bulk questions to section
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ sectionId: string }> }
) {
  try {
    const { sectionId } = await params;
    const { questions } = await request.json();

    if (!questions || !Array.isArray(questions)) {
      return NextResponse.json(
        { success: false, error: 'Questions array is required' },
        { status: 400 }
      );
    }

    const result = await SectionService.addBulkQuestions(sectionId, questions);

    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Section questions API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add bulk questions' },
      { status: 500 }
    );
  }
}
