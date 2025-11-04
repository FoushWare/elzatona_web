'use client';

import { useState, useEffect } from 'react';

interface LearningPath {
  id: string;
  title: string;
  question_count: number;
  difficulty: string;
}

interface UseLearningPathStatsSimpleReturn {
  learningPaths: LearningPath[];
  isLoading: boolean;
  error: string | null;
}

export function useLearningPathStatsSimple(): UseLearningPathStatsSimpleReturn {
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLearningPaths = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Mock data for simple debugging
        const mockPaths: LearningPath[] = [
          {
            id: '1',
            title: 'Basic JavaScript',
            question_count: 15,
            difficulty: 'Easy',
          },
          {
            id: '2',
            title: 'React Basics',
            question_count: 12,
            difficulty: 'Medium',
          },
        ];

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));

        setLearningPaths(mockPaths);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLearningPaths();
  }, []);

  return {
    learningPaths,
    isLoading,
    error,
  };
}
