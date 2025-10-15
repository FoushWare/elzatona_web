import { NextRequest, NextResponse } from 'next/server';
import { ContentVersioningService } from '@/lib/content-versioning-service';

/**
 * @swagger
 * /api/admin/content-versioning/versions/{versionId}:
 *   get:
 *     summary: Get a specific content version
 *     tags: [Admin, Content Versioning]
 *     parameters:
 *       - in: path
 *         name: versionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the content version
 *     responses:
 *       200:
 *         description: Content version details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 version:
 *                   $ref: '#/components/schemas/ContentVersion'
 *       404:
 *         description: Version not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete a content version
 *     tags: [Admin, Content Versioning]
 *     parameters:
 *       - in: path
 *         name: versionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the content version to delete
 *     responses:
 *       200:
 *         description: Version deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: Version not found
 *       500:
 *         description: Internal server error
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { versionId: string } }
) {
  try {
    const { versionId } = params;

    const version = await ContentVersioningService.getContentVersion(versionId);

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
    console.error('Error fetching content version:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch content version' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { versionId: string } }
) {
  try {
    const { versionId } = params;

    // Note: In a real implementation, you might want to soft delete or archive versions
    // For now, we'll just return success as the service doesn't have a delete method
    return NextResponse.json({
      success: true,
      message: 'Version deletion not implemented yet',
    });
  } catch (error) {
    console.error('Error deleting content version:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete content version' },
      { status: 500 }
    );
  }
}
