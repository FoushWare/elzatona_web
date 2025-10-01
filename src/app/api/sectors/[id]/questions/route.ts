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
    const sectorResult = await SectorService.getSector(id);
    if (!sectorResult.success || !sectorResult.sector) {
      return NextResponse.json(
        { success: false, error: 'Sector not found' },
        { status: 404 }
      );
    }

    const sector = sectorResult.sector;

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
        data: questionsResult.questions || [],
      });
    } else {
      return NextResponse.json(
        { success: false, error: questionsResult.error },
        { status: 500 }
      );
    }
  } catch (error: any) {
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

    const result = await SectorService.addQuestionsToSector(id, questionIds);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Questions added to sector successfully',
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error: any) {
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

    const result = await SectorService.removeQuestionsFromSector(
      id,
      questionIds
    );

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Questions removed from sector successfully',
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error in DELETE /api/sectors/[id]/questions:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
