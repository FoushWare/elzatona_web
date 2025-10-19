import { NextRequest, NextResponse } from 'next/server';
import { SectorService } from '@/lib/sector-schema';
import { UnifiedQuestionService } from '@/lib/unified-question-schema';

// GET /api/sectors/[id]/questions - Get questions for a sector
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Get the sector first
    const sector = await SectorService.getSectorById(id);
    if (!sector) {
      return NextResponse.json(
        { success: false, error: 'Sector not found' },
        { status: 404 }
      );
    }

    // If no questions in sector, return empty array
    if (!sector.questionIds || sector.questionIds.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    // Fetch questions by IDs
    const questionsResult = await UnifiedQuestionService.getQuestionsByIds(
      sector.questionIds
    );

    if (questionsResult.success) {
      return NextResponse.json({
        success: true,
        data: questionsResult.data || [],
      });
    } else {
      return NextResponse.json(
        { success: false, error: questionsResult.error },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error('Error in GET /api/sectors/[id]/questions:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/sectors/[id]/questions - Add questions to a sector
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { questionIds } = body;

    if (!questionIds || !Array.isArray(questionIds)) {
      return NextResponse.json(
        { success: false, error: 'questionIds array is required' },
        { status: 400 }
      );
    }

    try {
      await SectorService.addQuestionsToSector(id, questionIds);
      return NextResponse.json({
        success: true,
        message: 'Questions added to sector successfully',
      });
    } catch (error) {
      return NextResponse.json(
        { success: false, error: 'Failed to add questions to sector' },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error('Error in POST /api/sectors/[id]/questions:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/sectors/[id]/questions - Remove questions from a sector
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { questionIds } = body;

    if (!questionIds || !Array.isArray(questionIds)) {
      return NextResponse.json(
        { success: false, error: 'questionIds array is required' },
        { status: 400 }
      );
    }

    try {
      await SectorService.removeQuestionsFromSector(id, questionIds);
      return NextResponse.json({
        success: true,
        message: 'Questions removed from sector successfully',
      });
    } catch (error) {
      return NextResponse.json(
        { success: false, error: 'Failed to remove questions from sector' },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error('Error in DELETE /api/sectors/[id]/questions:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
