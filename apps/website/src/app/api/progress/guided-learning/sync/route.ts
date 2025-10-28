import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { verifySupabaseToken } from '@/lib/server-auth';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

interface GuidedProgress {
  planId: string;
  completedQuestions: string[];
  completedTopics: string[];
  completedCategories: string[];
  completedCards: string[];
  currentPosition: {
    cardIndex: number;
    categoryIndex: number;
    topicIndex: number;
    questionIndex: number;
  };
  lastUpdated: string;
}

export async function POST(request: NextRequest) {
  try {
    // Get the Firebase token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('firebase_token')?.value;

    if (!token) {
      console.log('⚠️ No authentication token found, using development mode');
      const progressData: GuidedProgress = await request.json();

      return NextResponse.json({
        success: true,
        message:
          'Progress would be saved (development mode - not authenticated)',
        warning: 'Using development mode - authentication not fully configured',
      });
    }

    // Verify the token
    const decodedToken = await verifySupabaseToken(token);
    if (!decodedToken) {
      const progressData: GuidedProgress = await request.json();

      return NextResponse.json({
        success: true,
        message: 'Progress would be saved (development mode - token invalid)',
        warning: 'Using development mode due to invalid token',
      });
    }

    const progressData: GuidedProgress = await request.json();
    console.log(
      '📄 Syncing guided learning progress for user:',
      decodedToken.id
    );

    // Store progress data in JSONB format
    const { data, error } = await supabase.from('user_progress').upsert(
      {
        user_id: decodedToken.id,
        plan_id: progressData.planId,
        progress_data: {
          completedQuestions: progressData.completedQuestions,
          completedTopics: progressData.completedTopics,
          completedCategories: progressData.completedCategories,
          completedCards: progressData.completedCards,
          currentPosition: progressData.currentPosition,
        },
        last_updated: progressData.lastUpdated,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'user_id,plan_id',
      }
    );

    if (error) {
      console.error('❌ Error syncing progress to database:', error);
      return NextResponse.json(
        { error: 'Failed to sync progress' },
        { status: 500 }
      );
    }

    console.log('✅ Guided learning progress synced successfully');

    return NextResponse.json({
      success: true,
      message: 'Progress synced successfully to database',
    });
  } catch (error) {
    console.error('❌ Error in sync endpoint:', error);

    return NextResponse.json({
      success: true,
      message: 'Progress would be saved (development mode - server error)',
      warning: 'Using development mode due to server error',
    });
  }
}
