import { NextRequest, NextResponse } from 'next/server';
import {
  db,
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from '@/lib/firebase-server';

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
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    const q = query(collection(db, 'learningCards'), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);

    const cards = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.name || data.title, // Handle both name and title for backward compatibility
        ...data,
      };
    });

    return NextResponse.json({
      success: true,
      data: cards,
      count: cards.length,
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
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    const cardData = await request.json();

    const cardWithTimestamps = {
      ...cardData,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'admin',
      updatedBy: 'admin',
      isActive: true,
    };

    const docRef = await addDoc(
      collection(db, 'learningCards'),
      cardWithTimestamps
    );

    return NextResponse.json({
      success: true,
      data: { id: docRef.id, ...cardWithTimestamps },
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
