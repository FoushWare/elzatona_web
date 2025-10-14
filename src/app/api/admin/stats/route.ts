import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where,
} from 'firebase/firestore';

/**
 * @swagger
 * /api/admin/stats:
 *   get:
 *     summary: Get admin statistics
 *     description: Retrieve comprehensive statistics for the admin dashboard
 *     tags: [Admin]
 *     security:
 *       - AdminAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved admin statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 questions:
 *                   type: number
 *                   example: 150
 *                 categories:
 *                   type: number
 *                   example: 25
 *                 topics:
 *                   type: number
 *                   example: 75
 *                 learningCards:
 *                   type: number
 *                   example: 5
 *                 learningPlans:
 *                   type: number
 *                   example: 7
 *                 frontendTasks:
 *                   type: number
 *                   example: 30
 *                 problemSolvingTasks:
 *                   type: number
 *                   example: 20
 *                 totalContent:
 *                   type: number
 *                   example: 312
 *                 recentActivity:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       action:
 *                         type: string
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                       user:
 *                         type: string
 *                       details:
 *                         type: string
 *                 systemHealth:
 *                   type: object
 *                   properties:
 *                     databaseConnected:
 *                       type: boolean
 *                     lastUpdated:
 *                       type: string
 *                       format: date-time
 *                     apiResponseTime:
 *                       type: number
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 details:
 *                   type: string
 */
export async function GET(request: NextRequest) {
  try {
    console.log('📊 Fetching admin stats...');

    // Get all collections in parallel
    const [
      questionsSnapshot,
      categoriesSnapshot,
      topicsSnapshot,
      cardsSnapshot,
      plansSnapshot,
      frontendTasksSnapshot,
      problemSolvingSnapshot,
      auditLogsSnapshot,
    ] = await Promise.all([
      getDocs(collection(db, 'questions')),
      getDocs(collection(db, 'categories')),
      getDocs(collection(db, 'topics')),
      getDocs(collection(db, 'cards')),
      getDocs(collection(db, 'plans')),
      getDocs(collection(db, 'frontendTasks')),
      getDocs(collection(db, 'problemSolving')),
      getDocs(
        query(
          collection(db, 'auditLogs'),
          orderBy('timestamp', 'desc'),
          limit(10)
        )
      ),
    ]);

    // Calculate basic stats
    const stats = {
      // Content counts
      questions: questionsSnapshot.size,
      categories: categoriesSnapshot.size,
      topics: topicsSnapshot.size,
      learningCards: cardsSnapshot.size,
      learningPlans: plansSnapshot.size,
      frontendTasks: frontendTasksSnapshot.size,
      problemSolvingTasks: problemSolvingSnapshot.size,

      // Performance metrics
      totalContent:
        questionsSnapshot.size +
        categoriesSnapshot.size +
        topicsSnapshot.size +
        cardsSnapshot.size +
        plansSnapshot.size +
        frontendTasksSnapshot.size +
        problemSolvingSnapshot.size,

      // Recent activity (last 10 audit logs)
      recentActivity: auditLogsSnapshot.docs.map(doc => ({
        id: doc.id,
        action: doc.data().action,
        timestamp: doc.data().timestamp,
        user: doc.data().user,
        details: doc.data().details,
      })),

      // System health indicators
      systemHealth: {
        databaseConnected: true,
        lastUpdated: new Date().toISOString(),
        apiResponseTime: Date.now(),
      },
    };

    console.log('✅ Admin stats fetched successfully:', {
      questions: stats.questions,
      categories: stats.categories,
      topics: stats.topics,
      cards: stats.learningCards,
      plans: stats.learningPlans,
      frontendTasks: stats.frontendTasks,
      problemSolvingTasks: stats.problemSolvingTasks,
      totalContent: stats.totalContent,
    });

    return NextResponse.json(stats);
  } catch (error) {
    console.error('❌ Error fetching admin stats:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch admin stats',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
