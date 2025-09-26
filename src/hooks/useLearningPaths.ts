'use client';

import { useState, useEffect, useCallback } from 'react';

export interface LearningPath {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questionCount: number;
  estimatedTime?: number; // in minutes - optional
  category?: string; // optional
  sectors?: Array<{
    id: string;
    name: string;
    questionCount: number;
  }>;
}

interface UseLearningPathsReturn {
  learningPaths: LearningPath[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useLearningPaths(): UseLearningPathsReturn {
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLearningPaths = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/learning-paths');
      
      if (!response.ok) {
        throw new Error('Failed to fetch learning paths');
      }

      const data = await response.json();

      if (data.success) {
        setLearningPaths(data.data || []);
      } else {
        throw new Error(data.error || 'Failed to fetch learning paths');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch learning paths';
      setError(errorMessage);
      setLearningPaths([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    fetchLearningPaths();
  }, [fetchLearningPaths]);

  useEffect(() => {
    fetchLearningPaths();
  }, [fetchLearningPaths]);

  return {
    learningPaths,
    isLoading,
    error,
    refetch,
  };
}
