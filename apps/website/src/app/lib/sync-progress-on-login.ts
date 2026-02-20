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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  answeredQuestionsData?: Record<string, any>;
  lastUpdated: number;
}

function getGuidedProgressKeys(): string[] {
  const guidedKeys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith("guided-practice-progress-")) {
      guidedKeys.push(key);
    }
  }
  return guidedKeys;
}

function parseGuidedProgressEntry(key: string): {
  planId: string;
  progress: GuidedProgressData;
} {
  const progressData = localStorage.getItem(key);
  if (!progressData) {
    throw new Error("Missing progress data");
  }

  return {
    planId: key.replace("guided-practice-progress-", ""),
    progress: JSON.parse(progressData) as GuidedProgressData,
  };
}

function buildGuidedSyncPayload(
  planId: string,
  progress: GuidedProgressData,
  userId?: string,
) {
  return {
    planId,
    completedQuestions: progress.completedQuestions || [],
    completedTopics: progress.completedTopics || [],
    completedCategories: progress.completedCategories || [],
    completedCards: progress.completedCards || [],
    correctAnswers: progress.correctAnswers || [],
    currentPosition: progress.currentPosition,
    lastUpdated: progress.lastUpdated || new Date().toISOString(),
    ...(userId && { userId }),
  };
}

async function removeGuidedProgressKey(key: string): Promise<void> {
  try {
    localStorage.removeItem(key);
  } catch (removeError) {
    console.warn(
      `Failed to remove guided progress key from localStorage: ${key}`,
      removeError,
    );
  }
}

async function syncSingleGuidedProgress(
  key: string,
  authToken: string,
  userId?: string,
): Promise<{ planId: string; error?: string }> {
  const planId = key.replace("guided-practice-progress-", "");

  try {
    const { progress } = parseGuidedProgressEntry(key);

    const response = await fetch("/api/progress/guided-learning/sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(buildGuidedSyncPayload(planId, progress, userId)),
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: "Unknown error" }));
      return { planId, error: errorData.error ?? "Sync failed" };
    }

    await removeGuidedProgressKey(key);
    return { planId };
  } catch (error) {
    return {
      planId,
      error: error instanceof Error ? error.message : "Parse error",
    };
  }
}

/**
 * Sync all guided learning progress from localStorage to database
 * @param authToken - The authentication token (for Authorization header)
 * @param userId - The user ID (to pass in request body for custom auth)
 */
export async function syncAllGuidedProgress(
  authToken: string,
  userId?: string,
): Promise<{ success: boolean; synced: number; errors: string[] }> {
  let syncedCount = 0;
  const errors: string[] = [];
  const guidedKeys = getGuidedProgressKeys();

  for (const key of guidedKeys) {
    const result = await syncSingleGuidedProgress(key, authToken, userId);
    if (result.error) {
      errors.push(`Plan ${result.planId}: ${result.error}`);
      continue;
    }

    syncedCount += 1;
  }

  return {
    success: errors.length === 0,
    synced: syncedCount,
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
  userId?: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const progressData = localStorage.getItem("free-style-practice-progress");
    if (!progressData) {
      return { success: true };
    }

    const progress: FreeStyleProgressData = JSON.parse(progressData);

    const response = await fetch("/api/progress/free-style/sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
      // Remove from localStorage after successful sync
      try {
        localStorage.removeItem("free-style-practice-progress");
      } catch (removeError) {
        console.warn(
          "Failed to remove free-style progress key from localStorage",
          removeError,
        );
      }

      return { success: true };
    } else {
      const errorData = await response
        .json()
        .catch(() => ({ error: "Unknown error" }));
      return { success: false, error: errorData.error || "Sync failed" };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
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
  userId?: string,
): Promise<{
  success: boolean;
  guided: { synced: number; errors: string[] };
  freeStyle: { success: boolean; error?: string };
}> {
  const [guidedResult, freeStyleResult] = await Promise.allSettled([
    syncAllGuidedProgress(authToken, userId),
    syncFreeStyleProgress(authToken, userId),
  ]);

  const guided =
    guidedResult.status === "fulfilled"
      ? guidedResult.value
      : {
          success: false,
          synced: 0,
          errors: [guidedResult.reason?.message ?? "Unknown error"],
        };

  const freeStyle =
    freeStyleResult.status === "fulfilled"
      ? freeStyleResult.value
      : {
          success: false,
          error: freeStyleResult.reason?.message ?? "Unknown error",
        };

  const overallSuccess = guided.success && freeStyle.success;

  console.log("📊 Progress sync summary:", {
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
