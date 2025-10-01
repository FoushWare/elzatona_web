// v1.0 - Question Statistics API Route

import { NextRequest, NextResponse } from 'next/server';
import { UnifiedQuestionService } from '@/lib/unified-question-schema';
import { db } from '@/lib/firebase-server';

// GET /api/questions/stats - Get question statistics
export async function GET(request: NextRequest) {
  try {
    const service = new UnifiedQuestionService(db);
    const stats = await service.getQuestionStats();

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Error fetching question stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch question statistics' },
      { status: 500 }
    );
  }
}
