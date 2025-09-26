'use client';

import { useState, useEffect, useCallback } from 'react';

export interface Sector {
  id: string;
  name: string;
  description: string;
  questionCount: number;
  difficulty: 'easy' | 'medium' | 'hard';
  order: number;
  isActive: boolean;
}

interface UseSectorsReturn {
  sectors: Sector[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useSectors(pathId: string | null | undefined): UseSectorsReturn {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSectors = useCallback(async () => {
    if (!pathId) {
      setSectors([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

           const response = await fetch(`/api/sectors/by-path/${pathId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch sectors');
      }

      const data = await response.json();

      if (data.success) {
        setSectors(data.data || []);
      } else {
        throw new Error(data.error || 'Failed to fetch sectors');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch sectors';
      setError(errorMessage);
      setSectors([]);
    } finally {
      setIsLoading(false);
    }
  }, [pathId]);

  const refetch = useCallback(() => {
    fetchSectors();
  }, [fetchSectors]);

  useEffect(() => {
    fetchSectors();
  }, [fetchSectors]);

  return {
    sectors,
    isLoading,
    error,
    refetch,
  };
}
