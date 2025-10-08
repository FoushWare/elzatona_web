import { NextRequest, NextResponse } from 'next/server';
import { SectorService } from '@/lib/sector-schema';

// GET /api/sectors - Get all sectors for a learning path
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const learningPathId = searchParams.get('learningPathId');

    if (!learningPathId) {
      return NextResponse.json(
        { success: false, error: 'Learning path ID is required' },
        { status: 400 }
      );
    }

    const result = await SectorService.getSectorsByLearningPath(learningPathId);

    if (result.success) {
      return NextResponse.json({
        success: true,
        data: result.sectors,
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error('Error in GET /api/sectors:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/sectors - Create a new sector
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      learningPathId,
      order,
      difficulty,
      estimatedTime,
      prerequisites = [],
    } = body;

    // Validate required fields
    if (!name || !description || !learningPathId || order === undefined) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Missing required fields: name, description, learningPathId, order',
        },
        { status: 400 }
      );
    }

    const sectorData = {
      name,
      description,
      learningPathId,
      order: parseInt(order),
      questionIds: [],
      totalQuestions: 0,
      difficulty: difficulty || 'intermediate',
      estimatedTime: estimatedTime || 30,
      prerequisites,
      isActive: true,
      isLocked: prerequisites.length > 0,
      createdBy: 'admin', // TODO: Get from auth context
      lastModifiedBy: 'admin', // TODO: Get from auth context
    };

    const result = await SectorService.createSector(sectorData);

    if (result.success) {
      return NextResponse.json({
        success: true,
        data: { sectorId: result.sectorId },
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error('Error in POST /api/sectors:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
