import { NextRequest, NextResponse } from 'next/server';
import {
  BulkOperationsService,
  BulkOperation,
} from '@/lib/bulk-operations-service';

/**
 * @swagger
 * /api/admin/bulk-operations:
 *   post:
 *     summary: Create a new bulk operation
 *     tags: [Admin, Bulk Operations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [type, targetType, targetIds]
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [delete, edit, activate, deactivate]
 *                 description: Type of bulk operation
 *               targetType:
 *                 type: string
 *                 enum: [questions, categories, topics, cards, plans]
 *                 description: Type of items to operate on
 *               targetIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of item IDs to operate on
 *               operationData:
 *                 type: object
 *                 description: Data for edit operations
 *               createdBy:
 *                 type: string
 *                 description: User who created the operation
 *     responses:
 *       200:
 *         description: Bulk operation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 operation:
 *                   $ref: '#/components/schemas/BulkOperation'
 *       400:
 *         description: Invalid request parameters
 *       500:
 *         description: Internal server error
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, targetType, targetIds, operationData, createdBy } = body;

    // Validate required fields
    if (!type || !targetType || !targetIds) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: type, targetType, targetIds',
        },
        { status: 400 }
      );
    }

    // Validate operation parameters
    const validation = BulkOperationsService.validateBulkOperation(
      type,
      targetType,
      targetIds,
      operationData
    );
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: validation.errors,
        },
        { status: 400 }
      );
    }

    // Create bulk operation
    const operation = await BulkOperationsService.createBulkOperation(
      type,
      targetType,
      targetIds,
      operationData,
      createdBy || 'admin'
    );

    return NextResponse.json({
      success: true,
      operation,
    });
  } catch (error) {
    console.error('Error creating bulk operation:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create bulk operation' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/admin/bulk-operations:
 *   get:
 *     summary: Get all bulk operations
 *     tags: [Admin, Bulk Operations]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *         description: Maximum number of operations to return
 *     responses:
 *       200:
 *         description: List of bulk operations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 operations:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/BulkOperation'
 *       500:
 *         description: Internal server error
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');

    const operations = await BulkOperationsService.getAllBulkOperations(limit);

    return NextResponse.json({
      success: true,
      operations,
    });
  } catch (error) {
    console.error('Error fetching bulk operations:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bulk operations' },
      { status: 500 }
    );
  }
}
