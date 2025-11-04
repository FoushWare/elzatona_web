'use client';

import { useState, useEffect, useCallback } from 'react';

export interface LearningPath {
  id: string;
  name: string;
  description: string;
  question_count: number;
  icon: string;
  color: string;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced'; // optional
  estimatedTime?: number; // in minutes - optional
  category?: string; // optional
  sectors?: Array<{
    id: string;
    name: string;
    question_count: number;
  }>;
}

interface UseLearningPathsReturn {
  learningPaths: LearningPath[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useLearningPaths(): UseLearningPathsReturn {
  console.log('🚀 useLearningPaths hook called');
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLearningPaths = useCallback(async () => {
    try {
      console.log('🔄 Fetching learning paths...');
      setIsLoading(true);
      setError(null);

      // Fallback to existing plans endpoint since learning_paths table is not present
      const response = await fetch('/api/plans', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('📡 API response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('📊 API response data:', data);

      // Map plans to LearningPath shape minimally
      if (Array.isArray(data.plans)) {
        const mapped = data.plans.map((p: any) => ({
          id: p.id,
          name: p.name || 'Plan',
          description: p.title || '',
          question_count: 0,
          icon: 'Target',
          color: 'indigo',
          order: 0,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          sectors: [],
        }));
        console.log('✅ Learning plans mapped:', mapped.length);
        setLearningPaths(mapped);
      } else if (data.success && Array.isArray(data.data)) {
        // Support original learning-paths response shape if added later
        console.log('✅ Learning paths loaded:', data.data.length);
        setLearningPaths(data.data);
      } else {
        throw new Error(data.error || 'Invalid response format');
      }
    } catch (err) {
      console.error('❌ Error fetching learning paths:', err);
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch learning paths';
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
    // Only run on client side
    if (typeof window !== 'undefined') {
      fetchLearningPaths();
    }
  }, [fetchLearningPaths]);

  return {
    learningPaths,
    isLoading,
    error,
    refetch,
  };
}
