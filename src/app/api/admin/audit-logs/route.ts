// Admin Audit Logs API Route
// v1.0 - Comprehensive audit logging system

import { NextRequest, NextResponse } from 'next/server';
import { AuditLogService } from '@/lib/audit-log-schema';

// GET /api/admin/audit-logs - Get audit logs with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const resource = searchParams.get('resource');
    const resourceId = searchParams.get('resourceId');
    const userId = searchParams.get('userId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const limit = parseInt(searchParams.get('limit') || '100');

    let logs;

    if (action) {
      logs = await AuditLogService.getLogsByAction(action);
    } else if (resource) {
      logs = await AuditLogService.getLogsForResource(resource, resourceId || undefined);
    } else if (userId) {
      logs = await AuditLogService.getLogsByUser(userId);
    } else if (startDate && endDate) {
      logs = await AuditLogService.getLogsByDateRange(startDate, endDate);
    } else {
      logs = await AuditLogService.getRecentLogs(limit);
    }

    return NextResponse.json({
      success: true,
      data: logs,
      count: logs.length
    });
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch audit logs'
      },
      { status: 500 }
    );
  }
}

// POST /api/admin/audit-logs - Create a new audit log entry
export async function POST(request: NextRequest) {
  try {
    const logData = await request.json();
    
    // Validate required fields
    if (!logData.action || !logData.resource || !logData.details) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: action, resource, details'
        },
        { status: 400 }
      );
    }

    const logId = await AuditLogService.logAction(logData);

    return NextResponse.json({
      success: true,
      data: { id: logId },
      message: 'Audit log created successfully'
    });
  } catch (error) {
    console.error('Error creating audit log:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create audit log'
      },
      { status: 500 }
    );
  }
}
