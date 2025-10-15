import { NextRequest, NextResponse } from 'next/server';
import {
  ContentVersioningService,
  ContentVersion,
  VersionComparison,
} from '@/lib/content-versioning-service';

/**
 * @swagger
 * /api/admin/content-versioning/versions:
 *   post:
 *     summary: Create a new content version
 *     tags: [Admin, Content Versioning]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [contentId, contentType, data, changes, createdBy]
 *             properties:
 *               contentId:
 *                 type: string
 *                 description: ID of the content item
 *               contentType:
 *                 type: string
 *                 enum: [question, category, topic, card, plan]
 *                 description: Type of content
 *               data:
 *                 type: object
 *                 description: Content data
 *               changes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     field:
 *                       type: string
 *                     oldValue:
 *                       type: any
 *                     newValue:
 *                       type: any
 *               createdBy:
 *                 type: string
 *                 description: User who created the version
 *               description:
 *                 type: string
 *                 description: Optional description
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Content version created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 version:
 *                   $ref: '#/components/schemas/ContentVersion'
 *       400:
 *         description: Invalid request parameters
 *       500:
 *         description: Internal server error
 *   get:
 *     summary: Get content versions
 *     tags: [Admin, Content Versioning]
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
 *           default: 50
 *         description: Maximum number of versions to return
 *     responses:
 *       200:
 *         description: List of content versions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 versions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ContentVersion'
 *       500:
 *         description: Internal server error
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      contentId,
      contentType,
      data,
      changes,
      createdBy,
      description,
      tags,
    } = body;

    // Validate required fields
    if (!contentId || !contentType || !data || !changes || !createdBy) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Missing required fields: contentId, contentType, data, changes, createdBy',
        },
        { status: 400 }
      );
    }

    // Validate contentType
    const validContentTypes = ['question', 'category', 'topic', 'card', 'plan'];
    if (!validContentTypes.includes(contentType)) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Invalid contentType. Must be one of: question, category, topic, card, plan',
        },
        { status: 400 }
      );
    }

    // Create content version
    const version = await ContentVersioningService.createContentVersion(
      contentId,
      contentType,
      data,
      changes,
      createdBy,
      description,
      tags
    );

    return NextResponse.json({
      success: true,
      version,
    });
  } catch (error) {
    console.error('Error creating content version:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create content version' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contentId = searchParams.get('contentId');
    const contentType = searchParams.get(
      'contentType'
    ) as ContentVersion['contentType'];
    const limit = parseInt(searchParams.get('limit') || '50');

    if (!contentId || !contentType) {
      return NextResponse.json(
        { success: false, error: 'contentId and contentType are required' },
        { status: 400 }
      );
    }

    const versions = await ContentVersioningService.getContentVersions(
      contentId,
      contentType,
      limit
    );

    return NextResponse.json({
      success: true,
      versions,
    });
  } catch (error) {
    console.error('Error fetching content versions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch content versions' },
      { status: 500 }
    );
  }
}
