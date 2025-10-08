import { NextRequest, NextResponse } from 'next/server';
import { SectorService } from '@/lib/sector-schema';

// GET /api/sectors/[id] - Get a specific sector
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await SectorService.getSector(id);

    if (result.success) {
      return NextResponse.json({
        success: true,
        data: result.sector,
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 404 }
      );
    }
  } catch (error: unknown) {
    console.error('Error in GET /api/sectors/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/sectors/[id] - Update a sector
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const result = await SectorService.updateSector(id, body);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Sector updated successfully',
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error('Error in PUT /api/sectors/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/sectors/[id] - Delete a sector
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await SectorService.deleteSector(id);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Sector deleted successfully',
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error('Error in DELETE /api/sectors/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
