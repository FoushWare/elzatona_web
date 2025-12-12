"use client";

import { useState, useEffect, useCallback } from "react";

export interface SectorProgress {
  sectorId: string;
  pathId: string;
  isCompleted: boolean;
  score: number;
  completedAt: string;
  timeSpent: number; // in minutes
}

interface UseSectorProgressReturn {
  progress: Record<string, SectorProgress>;
  getSectorProgress: (sectorId: string) => SectorProgress | null;
  getPathProgress: (pathId: string) => SectorProgress[];
  saveProgress: (progress: SectorProgress) => void;
  clearProgress: () => void;
}

const STORAGE_KEY = "sector-progress";

export function useSectorProgress(): UseSectorProgressReturn {
  const [progress, setProgress] = useState<Record<string, SectorProgress>>({});

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedProgress = JSON.parse(stored);
        setProgress(parsedProgress);
      }
    } catch (error) {
      console.error("Failed to load sector progress from localStorage:", error);
      setProgress({});
    }
  }, []);

  const getSectorProgress = useCallback(
    (sectorId: string): SectorProgress | null => {
      return progress[sectorId] || null;
    },
    [progress],
  );

  const getPathProgress = useCallback(
    (pathId: string): SectorProgress[] => {
      return Object.values(progress).filter((p) => p.pathId === pathId);
    },
    [progress],
  );

  const saveProgress = useCallback((newProgress: SectorProgress) => {
    try {
      setProgress((prev) => {
        const updatedProgress = {
          ...prev,
          [newProgress.sectorId]: newProgress,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProgress));
        return updatedProgress;
      });
    } catch (error) {
      console.error("Failed to save sector progress to localStorage:", error);
    }
  }, []);

  const clearProgress = useCallback(() => {
    try {
      setProgress({});
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error(
        "Failed to clear sector progress from localStorage:",
        error,
      );
    }
  }, []);

  return {
    progress,
    getSectorProgress,
    getPathProgress,
    saveProgress,
    clearProgress,
  };
}
