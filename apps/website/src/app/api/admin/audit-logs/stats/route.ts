import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

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
    // Get total logs count
    const { count: totalLogs } = await supabase
      .from('audit_logs')
      .select('*', { count: 'exact', head: true });

    // Get logs by action type
    const { data: logsByAction } = await supabase
      .from('audit_logs')
      .select('action')
      .then(result => {
        const actionCounts: Record<string, number> = {};
        result.data?.forEach(log => {
          actionCounts[log.action] = (actionCounts[log.action] || 0) + 1;
        });
        return { data: actionCounts };
      });

    // Get logs by content type
    const { data: logsByContentType } = await supabase
      .from('audit_logs')
      .select('content_type')
      .then(result => {
        const typeCounts: Record<string, number> = {};
        result.data?.forEach(log => {
          typeCounts[log.content_type] =
            (typeCounts[log.content_type] || 0) + 1;
        });
        return { data: typeCounts };
      });

    // Get recent activity (last 10 logs)
    const { data: recentActivity } = await supabase
      .from('audit_logs')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(10);

    const stats = {
      totalLogs: totalLogs || 0,
      logsByAction: logsByAction || {},
      logsByContentType: logsByContentType || {},
      recentActivity: recentActivity || [],
    };

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
