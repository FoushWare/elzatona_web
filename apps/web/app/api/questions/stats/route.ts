// v1.0 - Question Statistics API Route

import { NextRequest, NextResponse } from 'next/server';
import { UnifiedQuestionService } from '@/lib/unified-question-schema';
import { db } from '@/lib/firebase-server';

// GET /api/questions/stats - Get question statistics
export async function GET(request: NextRequest) {
  try {
    console.log('🔄 API: Fetching question stats...');

    if (!db) {
      console.error('❌ Database not initialized');
      return NextResponse.json(
        { success: false, error: 'Database not initialized' },
        { status: 500 }
      );
    }

    const service = new UnifiedQuestionService(db);
    console.log('✅ Service created, calling getQuestionStats...');

    const stats = await service.getQuestionStats();
    console.log('✅ Stats retrieved:', stats);

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('❌ Error fetching question stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch question statistics' },
      { status: 500 }
    );
  }
}
