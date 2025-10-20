import { NextRequest, NextResponse } from 'next/server';
import { BulkOperationsService } from '@/lib/bulk-operations-service';

/**
 * @swagger
 * /api/admin/bulk-operations/{operationId}:
 *   get:
 *     summary: Get a specific bulk operation
 *     tags: [Admin, Bulk Operations]
 *     parameters:
 *       - in: path
 *         name: operationId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the bulk operation
 *     responses:
 *       200:
 *         description: Bulk operation details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 operation:
 *                   $ref: '#/components/schemas/BulkOperation'
 *       404:
 *         description: Operation not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Cancel a bulk operation
 *     tags: [Admin, Bulk Operations]
 *     parameters:
 *       - in: path
 *         name: operationId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the bulk operation to cancel
 *     responses:
 *       200:
 *         description: Operation cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: Operation not found
 *       500:
 *         description: Internal server error
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ operationId: string }> }
) {
  try {
    const { operationId } = await params;

    const operation = await BulkOperationsService.getBulkOperation(operationId);

    if (!operation) {
      return NextResponse.json(
        { success: false, error: 'Operation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      operation,
    });
  } catch (error) {
    console.error('Error fetching bulk operation:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bulk operation' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ operationId: string }> }
) {
  try {
    const { operationId } = await params;

    const success =
      await BulkOperationsService.cancelBulkOperation(operationId);

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Failed to cancel operation' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Operation cancelled successfully',
    });
  } catch (error) {
    console.error('Error cancelling bulk operation:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to cancel bulk operation' },
      { status: 500 }
    );
  }
}
