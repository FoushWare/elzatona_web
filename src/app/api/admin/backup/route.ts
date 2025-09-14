import { NextRequest, NextResponse } from 'next/server';
import { BackupService, BackupQuestion } from '@/lib/backup-service';

// POST - Backup a question
export async function POST(request: NextRequest) {
  try {
    const question: BackupQuestion = await request.json();

    // Validate required fields
    if (!question.id || !question.title || !question.section) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: id, title, section',
        },
        { status: 400 }
      );
    }

    const result = await BackupService.backupQuestion(question);

    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Backup API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to backup question' },
      { status: 500 }
    );
  }
}

// GET - Get backup information
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const section = searchParams.get('section');

    switch (action) {
      case 'stats':
        const stats = await BackupService.getBackupStats();
        return NextResponse.json({ success: true, data: stats });

      case 'files':
        const files = await BackupService.getBackupFiles();
        return NextResponse.json({ success: true, data: files });

      case 'section':
        if (!section) {
          return NextResponse.json(
            { success: false, error: 'Section parameter required' },
            { status: 400 }
          );
        }
        const questions = await BackupService.getSectionBackup(section);
        return NextResponse.json({ success: true, data: questions });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action parameter' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Backup API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get backup information' },
      { status: 500 }
    );
  }
}

// DELETE - Delete section backup
export async function DELETE(request: NextRequest) {
  try {
    const { section } = await request.json();

    if (!section) {
      return NextResponse.json(
        { success: false, error: 'Section parameter required' },
        { status: 400 }
      );
    }

    const result = await BackupService.deleteSectionBackup(section);

    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Backup API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete backup' },
      { status: 500 }
    );
  }
}
