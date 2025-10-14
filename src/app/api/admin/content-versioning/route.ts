import { NextRequest, NextResponse } from 'next/server';
import {
  contentVersioningService,
  ContentVersion,
  AuditLog,
} from '@/lib/content-versioning-service';

/**
 * POST /api/admin/content-versioning/versions
 * Create a new version of content
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contentId, contentType, data, userId, reason } = body;

    if (!contentId || !contentType || !data || !userId) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Missing required fields: contentId, contentType, data, userId',
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

    const versionId = await contentVersioningService.createVersion(
      contentId,
      contentType,
      data,
      userId,
      reason
    );

    return NextResponse.json({
      success: true,
      versionId,
      message: 'Version created successfully',
    });
  } catch (error) {
    console.error('Create version error:', error);
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
 * GET /api/admin/content-versioning/versions
 * Get version history for content
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
    const limit = parseInt(url.searchParams.get('limit') || '10');

    if (!contentId || !contentType) {
      return NextResponse.json(
        { success: false, error: 'contentId and contentType are required' },
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

    const versions = await contentVersioningService.getVersionHistory(
      contentId,
      contentType,
      limit
    );

    return NextResponse.json({
      success: true,
      versions,
      count: versions.length,
    });
  } catch (error) {
    console.error('Get version history error:', error);
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
 * PUT /api/admin/content-versioning/versions/:versionId/restore
 * Restore content to a specific version
 */
export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const versionId = url.pathname.split('/').pop();
    const body = await request.json();
    const { contentId, contentType, userId } = body;

    if (!versionId) {
      return NextResponse.json(
        { success: false, error: 'Version ID is required' },
        { status: 400 }
      );
    }

    if (!contentId || !contentType || !userId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: contentId, contentType, userId',
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

    await contentVersioningService.restoreToVersion(
      contentId,
      contentType,
      versionId,
      userId
    );

    return NextResponse.json({
      success: true,
      message: 'Content restored successfully',
    });
  } catch (error) {
    console.error('Restore version error:', error);
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
 * GET /api/admin/content-versioning/versions/:versionId
 * Get a specific version
 */
export async function GET_VERSION(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const versionId = url.pathname.split('/').pop();

    if (!versionId) {
      return NextResponse.json(
        { success: false, error: 'Version ID is required' },
        { status: 400 }
      );
    }

    const version = await contentVersioningService.getVersion(versionId);

    if (!version) {
      return NextResponse.json(
        { success: false, error: 'Version not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      version,
    });
  } catch (error) {
    console.error('Get version error:', error);
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
 * GET /api/admin/content-versioning/versions/:versionId1/compare/:versionId2
 * Compare two versions
 */
export async function GET_COMPARE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');
    const versionId1 = pathParts[pathParts.length - 3];
    const versionId2 = pathParts[pathParts.length - 1];

    if (!versionId1 || !versionId2) {
      return NextResponse.json(
        { success: false, error: 'Both version IDs are required' },
        { status: 400 }
      );
    }

    const comparison = await contentVersioningService.compareVersions(
      versionId1,
      versionId2
    );

    return NextResponse.json({
      success: true,
      comparison,
      changesCount: comparison.filter(c => c.hasChanged).length,
    });
  } catch (error) {
    console.error('Compare versions error:', error);
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
