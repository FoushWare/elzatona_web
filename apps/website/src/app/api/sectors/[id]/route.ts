import { NextRequest, NextResponse } from 'next/server';
import { SectorService } from '@/lib/sector-schema';

// GET /api/sectors/[id] - Get a specific sector
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const sector = await SectorService.getSectorById(id);

    if (sector) {
      return NextResponse.json({
        success: true,
        data: sector,
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Sector not found' },
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

    try {
      await SectorService.updateSector(id, body);
      return NextResponse.json({
        success: true,
        message: 'Sector updated successfully',
      });
    } catch (error) {
      return NextResponse.json(
        { success: false, error: 'Failed to update sector' },
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

    try {
      await SectorService.deleteSector(id);
      return NextResponse.json({
        success: true,
        message: 'Sector deleted successfully',
      });
    } catch (error) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete sector' },
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
