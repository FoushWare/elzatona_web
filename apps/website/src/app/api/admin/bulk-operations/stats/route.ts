import { NextRequest, NextResponse } from 'next/server';
import { BulkOperationsService } from '@/lib/bulk-operations-service';

/**
 * @swagger
 * /api/admin/bulk-operations/stats:
 *   get:
 *     summary: Get bulk operations statistics
 *     tags: [Admin, Bulk Operations]
 *     responses:
 *       200:
 *         description: Bulk operations statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 stats:
 *                   type: object
 *                   properties:
 *                     totalOperations:
 *                       type: integer
 *                       description: Total number of bulk operations
 *                     completedOperations:
 *                       type: integer
 *                       description: Number of completed operations
 *                     failedOperations:
 *                       type: integer
 *                       description: Number of failed operations
 *                     runningOperations:
 *                       type: integer
 *                       description: Number of currently running operations
 *                     averageProcessingTime:
 *                       type: number
 *                       description: Average processing time in milliseconds
 *       500:
 *         description: Internal server error
 */
export async function GET(request: NextRequest) {
  try {
    const stats = await BulkOperationsService.getBulkOperationStats();

    return NextResponse.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error('Error fetching bulk operations stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bulk operations statistics' },
      { status: 500 }
    );
  }
}
