import { NextRequest, NextResponse } from 'next/server';
import {
  bulkOperationsService,
  BulkDeleteRequest,
  BulkEditRequest,
} from '@/lib/bulk-operations-service';

/**
 * POST /api/admin/bulk-operations
 * Handle bulk operations (delete and edit)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { operation, ...requestData } = body;

    if (!operation || !['delete', 'edit'].includes(operation)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid operation. Must be "delete" or "edit"',
        },
        { status: 400 }
      );
    }

    let result;

    if (operation === 'delete') {
      const deleteRequest: BulkDeleteRequest = requestData;
      result = await bulkOperationsService.bulkDelete(deleteRequest);
    } else if (operation === 'edit') {
      const editRequest: BulkEditRequest = requestData;
      result = await bulkOperationsService.bulkEdit(editRequest);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Bulk operation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/bulk-operations/progress/:operationId
 * Get progress of a bulk operation
 */
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const operationId = url.pathname.split('/').pop();

    if (!operationId) {
      return NextResponse.json(
        { success: false, error: 'Operation ID is required' },
        { status: 400 }
      );
    }

    const progress =
      await bulkOperationsService.getBulkOperationProgress(operationId);
    return NextResponse.json({ success: true, progress });
  } catch (error) {
    console.error('Get bulk operation progress error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/bulk-operations/:operationId
 * Cancel a bulk operation
 */
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const operationId = url.pathname.split('/').pop();

    if (!operationId) {
      return NextResponse.json(
        { success: false, error: 'Operation ID is required' },
        { status: 400 }
      );
    }

    const cancelled =
      await bulkOperationsService.cancelBulkOperation(operationId);
    return NextResponse.json({ success: cancelled });
  } catch (error) {
    console.error('Cancel bulk operation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
