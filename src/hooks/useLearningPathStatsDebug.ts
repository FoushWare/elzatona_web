'use client';

import { useState, useEffect } from 'react';

interface LearningPath {
  id: string;
  title: string;
  questionCount: number;
  difficulty: string;
}

interface UseLearningPathStatsDebugReturn {
  learningPaths: LearningPath[];
  isLoading: boolean;
  error: string | null;
}

export function useLearningPathStatsDebug(): UseLearningPathStatsDebugReturn {
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLearningPaths = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Mock data for debugging purposes
        const mockPaths: LearningPath[] = [
          {
            id: '1',
            title: 'JavaScript Fundamentals',
            questionCount: 25,
            difficulty: 'Beginner'
          },
          {
            id: '2',
            title: 'React Advanced Patterns',
            questionCount: 18,
            difficulty: 'Advanced'
          },
          {
            id: '3',
            title: 'TypeScript Essentials',
            questionCount: 32,
            difficulty: 'Intermediate'
          }
        ];

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
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
    error
  };
}
