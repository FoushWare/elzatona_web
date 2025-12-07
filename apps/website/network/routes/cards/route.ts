import { NextRequest, NextResponse } from 'next/server';
import { supabaseOperations } from '@/lib/supabase-server';
import { createClient } from '@supabase/supabase-js';
import { sanitizeObjectServer, sanitizeRichContent } from '@/lib/utils/sanitize-server';
import { validateAndSanitize, learningCardSchema } from '@/lib/utils/validation';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

/**
 * @swagger
 * /api/cards:
 *   get:
 *     summary: Get all learning cards
 *     description: Retrieve all learning cards ordered by their order field
 *     tags: [Learning Cards]
 *     responses:
 *       200:
 *         description: Successfully retrieved learning cards
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/LearningCard'
 *                 count:
 *                   type: number
 *                   example: 5
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// GET /api/cards - Get all learning cards
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const isActive = searchParams.get('isActive');
    const limit = searchParams.get('limit');

    const filters = {
      type: type || undefined,
      is_active: isActive ? isActive === 'true' : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
      orderBy: 'order_index',
      orderDirection: 'asc' as const,
    };

    const { data: cards, error } =
      await supabaseOperations.getLearningCards(filters);

    if (error) {
      throw new Error(error.message);
    }

    // Transform data to match expected format
    const transformedCards = (cards || []).map((card: any) => ({
      id: card.id,
      title: card.title,
      name: card.title, // For backward compatibility
      type: card.type,
      description: card.description,
      color: card.color,
      icon: card.icon,
      order: card.order_index,
      order_index: card.order_index,
      is_active: card.is_active,
      created_at: card.created_at,
      updated_at: card.updated_at,
    }));

    return NextResponse.json({
      success: true,
      data: transformedCards,
      count: transformedCards.length,
    });
  } catch (error) {
    console.error('Error fetching cards:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch cards' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/cards:
 *   post:
 *     summary: Create a new learning card
 *     description: Create a new learning card with the provided data
 *     tags: [Learning Cards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - type
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Core Technologies"
 *               description:
 *                 type: string
 *                 example: "Fundamental web technologies"
 *               type:
 *                 type: string
 *                 enum: [core-technologies, framework-questions, problem-solving, system-design, frontend-tasks]
 *                 example: "core-technologies"
 *               color:
 *                 type: string
 *                 example: "#3B82F6"
 *               icon:
 *                 type: string
 *                 example: "Code"
 *               order:
 *                 type: number
 *                 example: 1
 *     responses:
 *       200:
 *         description: Learning card created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/LearningCard'
 *                 message:
 *                   type: string
 *                   example: "Card created successfully"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// POST /api/cards - Create a new learning card
export async function POST(request: NextRequest) {
  try {
    const cardData = await request.json();

    // Validate and sanitize card data
    const validationResult = validateAndSanitize(learningCardSchema, {
      title: cardData.name || cardData.title,
      description: cardData.description,
      type: cardData.type,
    });

    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: validationResult.error },
        { status: 400 }
      );
    }

    // Sanitize the validated data
    const sanitizedData = sanitizeObjectServer(validationResult.data as any);

    // Sanitize description if present
    if (sanitizedData.description) {
      sanitizedData.description = sanitizeRichContent(sanitizedData.description);
    }

    // Transform data to match Supabase schema
    const supabaseCardData = {
      title: sanitizedData.title,
      type: sanitizedData.type,
      description: sanitizedData.description || '',
      color: cardData.color || '#3B82F6', // Color is validated by format
      icon: cardData.icon || 'code', // Icon is not sanitized as it's a symbol
      order_index: cardData.order || cardData.order_index || 0,
      is_active: cardData.isActive !== false,
    };

    const { data: newCard, error } = await supabase
      .from('learning_cards')
      .insert(supabaseCardData)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (!newCard) {
      throw new Error('No card was created');
    }

    // Transform response to match expected format
    const transformedCard = {
      id: newCard.id,
      title: newCard.title,
      name: newCard.title, // For backward compatibility
      type: newCard.type,
      description: newCard.description,
      color: newCard.color,
      icon: newCard.icon,
      order: newCard.order_index,
      order_index: newCard.order_index,
      is_active: newCard.is_active,
      created_at: newCard.created_at,
      updated_at: newCard.updated_at,
    };

    return NextResponse.json({
      success: true,
      data: transformedCard,
      message: 'Card created successfully',
    });
  } catch (error) {
    console.error('Error creating card:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create card' },
      { status: 500 }
    );
  }
}
