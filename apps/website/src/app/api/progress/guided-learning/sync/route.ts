import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { verifySupabaseToken } from '../../../../../lib/server-auth';

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
    // Get the auth token from cookies or Authorization header
    const cookieStore = await cookies();
    let token = cookieStore.get('firebase_token')?.value;

    // Try Authorization header if cookie not found
    if (!token) {
      const authHeader = request.headers.get('authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

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

    // Parse request body first (can only be called once)
    const progressData: GuidedProgress = await request.json();

    // Verify the token
    let decodedToken = await verifySupabaseToken(token);

    // If Supabase token verification fails, try to get user ID from request body
    // (for custom auth systems that send userId)
    if (!decodedToken) {
      // If request body has userId and the token is from our custom auth system,
      // we can validate the user exists in the database
      if (
        progressData &&
        typeof progressData === 'object' &&
        'userId' in progressData
      ) {
        const userId = (progressData as any).userId as string;
        // Verify user exists in database
        const { data: user, error: userError } = await supabase
          .from('users')
          .select('id, email, role, name')
          .eq('id', userId)
          .single();

        if (!userError && user) {
          // User exists, we can proceed with sync
          decodedToken = {
            id: user.id,
            email: user.email || '',
            role: user.role || 'user',
            name: user.name,
          };
        }
      }

      if (!decodedToken) {
        return NextResponse.json({
          success: false,
          error: 'Invalid authentication token',
          message: 'Progress would be saved (development mode - token invalid)',
          warning: 'Using development mode due to invalid token',
        });
      }
    }
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
