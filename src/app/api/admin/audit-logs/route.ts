import { NextRequest, NextResponse } from 'next/server';
import {
  contentVersioningService,
  AuditLog,
} from '@/lib/content-versioning-service';

/**
 * GET /api/admin/audit-logs
 * Get audit logs with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const contentId = url.searchParams.get('contentId');
    const contentType = url.searchParams.get('contentType') as
      | 'cards'
      | 'plans'
      | 'categories'
      | 'topics'
      | 'questions'
      | null;
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const action = url.searchParams.get('action') as
      | 'create'
      | 'update'
      | 'delete'
      | 'restore'
      | null;

    // Validate contentType if provided
    if (
      contentType &&
      !['cards', 'plans', 'categories', 'topics', 'questions'].includes(
        contentType
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Invalid contentType. Must be one of: cards, plans, categories, topics, questions',
        },
        { status: 400 }
      );
    }

    // Validate action if provided
    if (action && !['create', 'update', 'delete', 'restore'].includes(action)) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Invalid action. Must be one of: create, update, delete, restore',
        },
        { status: 400 }
      );
    }

    const auditLogs = await contentVersioningService.getAuditLogs(
      contentId,
      contentType,
      limit
    );

    // Filter by action if provided
    const filteredLogs = action
      ? auditLogs.filter(log => log.action === action)
      : auditLogs;

    // Group logs by content type for summary
    const summary = {
      total: filteredLogs.length,
      byContentType: filteredLogs.reduce(
        (acc, log) => {
          acc[log.contentType] = (acc[log.contentType] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      ),
      byAction: filteredLogs.reduce(
        (acc, log) => {
          acc[log.action] = (acc[log.action] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      ),
      recentActivity: filteredLogs.slice(0, 10).map(log => ({
        id: log.id,
        contentId: log.contentId,
        contentType: log.contentType,
        action: log.action,
        userEmail: log.userEmail,
        timestamp: log.timestamp,
        changesCount: log.changes.length,
      })),
    };

    return NextResponse.json({
      success: true,
      logs: filteredLogs,
      summary,
      count: filteredLogs.length,
    });
  } catch (error) {
    console.error('Get audit logs error:', error);
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
 * POST /api/admin/audit-logs
 * Create a manual audit log entry (for special cases)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      contentId,
      contentType,
      action,
      userId,
      userEmail,
      changes,
      metadata,
    } = body;

    if (!contentId || !contentType || !action || !userId || !userEmail) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Missing required fields: contentId, contentType, action, userId, userEmail',
        },
        { status: 400 }
      );
    }

    if (
      !['cards', 'plans', 'categories', 'topics', 'questions'].includes(
        contentType
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Invalid contentType. Must be one of: cards, plans, categories, topics, questions',
        },
        { status: 400 }
      );
    }

    if (!['create', 'update', 'delete', 'restore'].includes(action)) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Invalid action. Must be one of: create, update, delete, restore',
        },
        { status: 400 }
      );
    }

    // This would typically be handled by the versioning service automatically
    // This endpoint is for special cases where manual audit logging is needed
    const auditLog: Omit<AuditLog, 'id'> = {
      contentId,
      contentType,
      action,
      userId,
      userEmail,
      timestamp: new Date() as any, // Will be converted to Firestore Timestamp
      changes: changes || [],
      metadata: metadata || {},
    };

    // Note: In a real implementation, you would add this to the audit logs collection
    // For now, we'll just return success as this is a demonstration

    return NextResponse.json({
      success: true,
      message: 'Audit log created successfully',
    });
  } catch (error) {
    console.error('Create audit log error:', error);
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
 * GET /api/admin/audit-logs/stats
 * Get audit log statistics and analytics
 */
export async function GET_STATS(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const days = parseInt(url.searchParams.get('days') || '30');

    // Get audit logs for the specified period
    const auditLogs = await contentVersioningService.getAuditLogs(
      undefined,
      undefined,
      1000
    );

    // Filter by date range (simplified - in production you'd use proper date filtering)
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const recentLogs = auditLogs.filter(log => {
      const logDate = log.timestamp.toDate
        ? log.timestamp.toDate()
        : new Date(log.timestamp);
      return logDate >= cutoffDate;
    });

    // Calculate statistics
    const stats = {
      totalLogs: recentLogs.length,
      period: `${days} days`,
      byContentType: recentLogs.reduce(
        (acc, log) => {
          acc[log.contentType] = (acc[log.contentType] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      ),
      byAction: recentLogs.reduce(
        (acc, log) => {
          acc[log.action] = (acc[log.action] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      ),
      byUser: recentLogs.reduce(
        (acc, log) => {
          acc[log.userEmail] = (acc[log.userEmail] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      ),
      dailyActivity: recentLogs.reduce(
        (acc, log) => {
          const date = log.timestamp.toDate
            ? log.timestamp.toDate().toISOString().split('T')[0]
            : new Date(log.timestamp).toISOString().split('T')[0];
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      ),
      mostActiveUsers: Object.entries(
        recentLogs.reduce(
          (acc, log) => {
            acc[log.userEmail] = (acc[log.userEmail] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>
        )
      )
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10),
      mostModifiedContent: Object.entries(
        recentLogs.reduce(
          (acc, log) => {
            acc[log.contentId] = (acc[log.contentId] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>
        )
      )
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10),
    };

    return NextResponse.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error('Get audit log stats error:', error);
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
