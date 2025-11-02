/**
 * Utility function to sync all localStorage progress to database when user logs in
 * v1.0
 */

interface GuidedProgressData {
  planId: string;
  completedQuestions: string[];
  completedTopics: string[];
  completedCategories: string[];
  completedCards: string[];
  correctAnswers?: string[];
  currentPosition: {
    cardIndex: number;
    categoryIndex: number;
    topicIndex: number;
    questionIndex: number;
  };
  lastUpdated: string;
}

interface FreeStyleProgressData {
  lastQuestionIndex: number;
  lastQuestionId?: string;
  answeredQuestions: string[];
  answeredQuestionsData?: Record<string, any>;
  lastUpdated: number;
}

/**
 * Sync all guided learning progress from localStorage to database
 * @param authToken - The authentication token (for Authorization header)
 * @param userId - The user ID (to pass in request body for custom auth)
 */
export async function syncAllGuidedProgress(
  authToken: string,
  userId?: string
): Promise<{ success: boolean; synced: number; errors: string[] }> {
  const synced: string[] = [];
  const errors: string[] = [];

  try {
    // Find all guided-practice-progress-* keys
    const guidedKeys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('guided-practice-progress-')) {
        guidedKeys.push(key);
      }
    }

    console.log(
      `📦 Found ${guidedKeys.length} guided learning progress entries to sync`
    );

    // Sync each guided progress
    for (const key of guidedKeys) {
      try {
        const progressData = localStorage.getItem(key);
        if (!progressData) continue;

        const progress: GuidedProgressData = JSON.parse(progressData);
        const planId = key.replace('guided-practice-progress-', '');

        const response = await fetch('/api/progress/guided-learning/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`, // Pass auth token in header
          },
          body: JSON.stringify({
            planId,
            completedQuestions: progress.completedQuestions || [],
            completedTopics: progress.completedTopics || [],
            completedCategories: progress.completedCategories || [],
            completedCards: progress.completedCards || [],
            correctAnswers: progress.correctAnswers || [],
            currentPosition: progress.currentPosition,
            lastUpdated: progress.lastUpdated || new Date().toISOString(),
            ...(userId && { userId }), // Pass user ID if provided (for custom auth)
          }),
        });

        if (response.ok) {
          synced.push(planId);
          console.log(`✅ Synced guided progress for plan: ${planId}`);

          // Remove from localStorage after successful sync
          try {
            localStorage.removeItem(key);
            console.log(`🗑️ Removed guided progress from localStorage: ${key}`);
          } catch (removeError) {
            console.warn(
              `⚠️ Failed to remove ${key} from localStorage:`,
              removeError
            );
          }
        } else {
          const errorData = await response
            .json()
            .catch(() => ({ error: 'Unknown error' }));
          errors.push(`Plan ${planId}: ${errorData.error || 'Sync failed'}`);
          console.error(
            `❌ Failed to sync guided progress for plan ${planId}:`,
            errorData
          );
        }
      } catch (error) {
        const planId = key.replace('guided-practice-progress-', '');
        errors.push(
          `Plan ${planId}: ${error instanceof Error ? error.message : 'Parse error'}`
        );
        console.error(`❌ Error syncing guided progress for ${key}:`, error);
      }
    }
  } catch (error) {
    errors.push(
      `Guided progress scan: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
    console.error('❌ Error scanning guided progress:', error);
  }

  return {
    success: errors.length === 0,
    synced: synced.length,
    errors,
  };
}

/**
 * Sync free-style practice progress from localStorage to database
 * @param authToken - The authentication token (for Authorization header)
 * @param userId - The user ID (to pass in request body for custom auth)
 */
export async function syncFreeStyleProgress(
  authToken: string,
  userId?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const progressData = localStorage.getItem('free-style-practice-progress');
    if (!progressData) {
      console.log('📭 No free-style progress found in localStorage');
      return { success: true };
    }

    const progress: FreeStyleProgressData = JSON.parse(progressData);

    const response = await fetch('/api/progress/free-style/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        lastQuestionIndex: progress.lastQuestionIndex,
        lastQuestionId: progress.lastQuestionId,
        answeredQuestions: progress.answeredQuestions || [],
        answeredQuestionsData: progress.answeredQuestionsData || {},
        lastUpdated: progress.lastUpdated
          ? new Date(progress.lastUpdated).toISOString()
          : new Date().toISOString(),
        ...(userId && { userId }), // Pass user ID if provided (for custom auth)
      }),
    });

    if (response.ok) {
      console.log('✅ Synced free-style practice progress');

      // Remove from localStorage after successful sync
      try {
        localStorage.removeItem('free-style-practice-progress');
        console.log('🗑️ Removed free-style progress from localStorage');
      } catch (removeError) {
        console.warn(
          '⚠️ Failed to remove free-style progress from localStorage:',
          removeError
        );
      }

      return { success: true };
    } else {
      const errorData = await response
        .json()
        .catch(() => ({ error: 'Unknown error' }));
      console.error('❌ Failed to sync free-style progress:', errorData);
      return { success: false, error: errorData.error || 'Sync failed' };
    }
  } catch (error) {
    console.error('❌ Error syncing free-style progress:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Sync all progress from localStorage to database
 * This is the main function to call after user login
 * @param authToken - The authentication token (for Authorization header)
 * @param userId - The user ID (to pass in request body for custom auth)
 */
export async function syncAllProgressOnLogin(
  authToken: string,
  userId?: string
): Promise<{
  success: boolean;
  guided: { synced: number; errors: string[] };
  freeStyle: { success: boolean; error?: string };
}> {
  console.log('🔄 Starting progress sync on login...', { userId });

  const [guidedResult, freeStyleResult] = await Promise.allSettled([
    syncAllGuidedProgress(authToken, userId),
    syncFreeStyleProgress(authToken, userId),
  ]);

  const guided =
    guidedResult.status === 'fulfilled'
      ? guidedResult.value
      : {
          success: false,
          synced: 0,
          errors: [guidedResult.reason?.message || 'Unknown error'],
        };

  const freeStyle =
    freeStyleResult.status === 'fulfilled'
      ? freeStyleResult.value
      : {
          success: false,
          error: freeStyleResult.reason?.message || 'Unknown error',
        };

  const overallSuccess = guided.success && freeStyle.success;

  console.log('📊 Progress sync summary:', {
    guided: {
      synced: guided.synced,
      errors: guided.errors.length,
    },
    freeStyle: {
      success: freeStyle.success,
    },
    overallSuccess,
  });

  return {
    success: overallSuccess,
    guided,
    freeStyle,
  };
}
