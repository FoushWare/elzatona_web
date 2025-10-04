// v1.0 - Learning Path Stats Hook
// React hook for fetching dynamic question counts for learning paths

import { useState, useEffect, useCallback } from 'react';

interface LearningPathStats {
  id: string;
  questionCount: number;
  isLoading: boolean;
  error: string | null;
}

interface UseLearningPathStatsReturn {
  stats: Record<string, LearningPathStats>;
  isLoading: boolean;
  error: string | null;
  refreshStats: () => Promise<void>;
  getQuestionCount: (pathId: string) => number | undefined;
}

export function useLearningPathStats(): UseLearningPathStatsReturn {
  const [stats, setStats] = useState<Record<string, LearningPathStats>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch question count for a specific learning path
  const fetchQuestionCount = useCallback(
    async (pathId: string): Promise<number> => {
      try {
        // Try the unified questions API first
        const response = await fetch(
          `/api/questions/unified?learningPath=${pathId}&isActive=true`
        );

        if (response.ok) {
          const data = await response.json();
          if (data.success && Array.isArray(data.data)) {
            return data.data.length;
          }
        }

        // Fallback to the legacy questions API
        const legacyResponse = await fetch(`/api/questions/${pathId}`);
        if (legacyResponse.ok) {
          const legacyData = await legacyResponse.json();
          if (legacyData.success && legacyData.count) {
            return legacyData.count;
          }
        }

        return 0;
      } catch (err) {
        console.warn(`Failed to fetch question count for ${pathId}:`, err);
        return 0;
      }
    },
    []
  );

  // Fetch all learning path stats
  const fetchAllStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Get all learning paths from the resources
      const { learningPaths } = await import('@elzatona/data/firebase');

      const statsPromises = learningPaths.map(async path => {
        const questionCount = await fetchQuestionCount(path.id);
        return {
          id: path.id,
          questionCount,
          isLoading: false,
          error: null,
        };
      });

      const results = await Promise.all(statsPromises);

      const statsMap: Record<string, LearningPathStats> = {};
      results.forEach(stat => {
        statsMap[stat.id] = stat;
      });

      setStats(statsMap);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Failed to fetch learning path stats';
      setError(errorMessage);
      console.error('Error fetching learning path stats:', err);
    } finally {
      setIsLoading(false);
    }
  }, [fetchQuestionCount]);

  // Refresh stats
  const refreshStats = useCallback(async () => {
    await fetchAllStats();
  }, [fetchAllStats]);

  // Get question count for a specific path
  const getQuestionCount = useCallback(
    (pathId: string): number | undefined => {
      // Return undefined if we haven't loaded stats yet (to show loading state)
      // Return the actual count if we have loaded stats
      if (isLoading || !stats[pathId]) {
        return undefined;
      }
      return stats[pathId].questionCount;
    },
    [stats, isLoading]
  );

  // Load stats on mount
  useEffect(() => {
    fetchAllStats();
  }, [fetchAllStats]);

  return {
    stats,
    isLoading,
    error,
    refreshStats,
    getQuestionCount,
  };
}

export default useLearningPathStats;
