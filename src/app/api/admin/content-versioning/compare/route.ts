import { NextRequest, NextResponse } from 'next/server';
import { ContentVersioningService } from '@/lib/content-versioning-service';

/**
 * @swagger
 * /api/admin/content-versioning/compare:
 *   get:
 *     summary: Compare two content versions
 *     tags: [Admin, Content Versioning]
 *     parameters:
 *       - in: query
 *         name: versionId1
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the first version
 *       - in: query
 *         name: versionId2
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the second version
 *     responses:
 *       200:
 *         description: Version comparison result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 comparison:
 *                   type: object
 *                   properties:
 *                     version1:
 *                       $ref: '#/components/schemas/ContentVersion'
 *                     version2:
 *                       $ref: '#/components/schemas/ContentVersion'
 *                     differences:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           field:
 *                             type: string
 *                           version1Value:
 *                             type: any
 *                           version2Value:
 *                             type: any
 *                           changeType:
 *                             type: string
 *                             enum: [added, removed, modified]
 *       400:
 *         description: Invalid request parameters
 *       404:
 *         description: One or both versions not found
 *       500:
 *         description: Internal server error
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const versionId1 = searchParams.get('versionId1');
    const versionId2 = searchParams.get('versionId2');

    if (!versionId1 || !versionId2) {
      return NextResponse.json(
        { success: false, error: 'versionId1 and versionId2 are required' },
        { status: 400 }
      );
    }

    const comparison = await ContentVersioningService.compareVersions(
      versionId1,
      versionId2
    );

    if (!comparison) {
      return NextResponse.json(
        { success: false, error: 'One or both versions not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      comparison,
    });
  } catch (error) {
    console.error('Error comparing versions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to compare versions' },
      { status: 500 }
    );
  }
}
