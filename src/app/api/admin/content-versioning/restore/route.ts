import { NextRequest, NextResponse } from 'next/server';
import { ContentVersioningService } from '@/lib/content-versioning-service';

/**
 * @swagger
 * /api/admin/content-versioning/restore:
 *   post:
 *     summary: Restore content to a specific version
 *     tags: [Admin, Content Versioning]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [versionId, restoredBy]
 *             properties:
 *               versionId:
 *                 type: string
 *                 description: ID of the version to restore
 *               restoredBy:
 *                 type: string
 *                 description: User who is restoring the version
 *     responses:
 *       200:
 *         description: Content restored successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid request parameters
 *       404:
 *         description: Version not found
 *       500:
 *         description: Internal server error
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { versionId, restoredBy } = body;

    if (!versionId || !restoredBy) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: versionId, restoredBy',
        },
        { status: 400 }
      );
    }

    const success = await ContentVersioningService.restoreContentVersion(
      versionId,
      restoredBy
    );

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Failed to restore content version' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Content restored successfully',
    });
  } catch (error) {
    console.error('Error restoring content version:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to restore content version' },
      { status: 500 }
    );
  }
}
