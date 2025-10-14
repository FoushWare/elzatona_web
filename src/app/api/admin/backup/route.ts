import { NextResponse } from 'next/server';
import { BackupService } from '@/lib/backup-service';
import { authMiddleware } from '@/lib/auth-middleware';

export async function GET(request: Request) {
  const authResult = await authMiddleware(request, ['admin', 'super_admin']);
  if (!authResult.authorized) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    switch (action) {
      case 'list':
        const backups = await BackupService.listBackups();
        return NextResponse.json({ success: true, backups });

      case 'stats':
        const stats = await BackupService.getBackupStats();
        return NextResponse.json({ success: true, ...stats });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action parameter' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Backup API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const authResult = await authMiddleware(request, ['admin', 'super_admin']);
  if (!authResult.authorized) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    const { action, name, description, backupId, options } =
      await request.json();

    switch (action) {
      case 'create':
        if (!name || !description) {
          return NextResponse.json(
            { success: false, error: 'Name and description are required' },
            { status: 400 }
          );
        }

        const result = await BackupService.createBackup(
          name,
          description,
          authResult.user?.id || 'unknown'
        );

        if (result.success) {
          return NextResponse.json({
            success: true,
            message: 'Backup created successfully',
            backupId: result.backupId,
          });
        } else {
          return NextResponse.json(
            { success: false, error: result.error },
            { status: 500 }
          );
        }

      case 'restore':
        if (!backupId) {
          return NextResponse.json(
            { success: false, error: 'Backup ID is required' },
            { status: 400 }
          );
        }

        const restoreResult = await BackupService.restoreBackup(
          backupId,
          options
        );

        if (restoreResult.success) {
          return NextResponse.json({
            success: true,
            message: 'Backup restored successfully',
            summary: restoreResult.summary,
          });
        } else {
          return NextResponse.json(
            { success: false, error: restoreResult.error },
            { status: 500 }
          );
        }

      case 'schedule':
        const { schedule } = await request.json();
        if (!schedule || !['daily', 'weekly', 'monthly'].includes(schedule)) {
          return NextResponse.json(
            { success: false, error: 'Valid schedule is required' },
            { status: 400 }
          );
        }

        const scheduleResult = await BackupService.scheduleBackup(
          schedule,
          authResult.user?.id || 'unknown'
        );

        if (scheduleResult.success) {
          return NextResponse.json({
            success: true,
            message: 'Backup schedule created successfully',
          });
        } else {
          return NextResponse.json(
            { success: false, error: scheduleResult.error },
            { status: 500 }
          );
        }

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Backup API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const authResult = await authMiddleware(request, ['admin', 'super_admin']);
  if (!authResult.authorized) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const backupId = searchParams.get('backupId');

    if (!backupId) {
      return NextResponse.json(
        { success: false, error: 'Backup ID is required' },
        { status: 400 }
      );
    }

    const result = await BackupService.deleteBackup(backupId);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Backup deleted successfully',
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Backup API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
