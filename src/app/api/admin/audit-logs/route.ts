import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/admin/audit-logs:
 *   get:
 *     summary: Get audit logs
 *     tags: [Admin, Audit Logs]
 *     parameters:
 *       - in: query
 *         name: contentId
 *         schema:
 *           type: string
 *         description: ID of the content item
 *       - in: query
 *         name: contentType
 *         schema:
 *           type: string
 *           enum: [question, category, topic, card, plan]
 *         description: Type of content
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 100
 *         description: Maximum number of logs to return
 *     responses:
 *       200:
 *         description: List of audit logs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 logs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/AuditLog'
 *       500:
 *         description: Internal server error
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contentId = searchParams.get('contentId');
    const contentType = searchParams.get('contentType');
    const limit = parseInt(searchParams.get('limit') || '100');

    const logs = await ContentVersioningService.getAuditLogs(
      contentId || undefined,
      contentType || undefined,
      limit
    );

    return NextResponse.json({
      success: true,
      logs,
    });
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch audit logs' },
      { status: 500 }
    );
  }
}
