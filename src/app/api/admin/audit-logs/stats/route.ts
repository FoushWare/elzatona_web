import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/admin/audit-logs/stats:
 *   get:
 *     summary: Get audit logs statistics
 *     tags: [Admin, Audit Logs]
 *     responses:
 *       200:
 *         description: Audit logs statistics
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
 *                     totalLogs:
 *                       type: integer
 *                       description: Total number of audit logs
 *                     logsByAction:
 *                       type: object
 *                       description: Number of logs by action type
 *                     logsByContentType:
 *                       type: object
 *                       description: Number of logs by content type
 *                     recentActivity:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/AuditLog'
 *       500:
 *         description: Internal server error
 */
export async function GET(request: NextRequest) {
  try {
    const stats = await ContentVersioningService.getAuditLogStats();

    return NextResponse.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error('Error fetching audit logs stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch audit logs statistics' },
      { status: 500 }
    );
  }
}
