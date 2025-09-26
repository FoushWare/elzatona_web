/**
 * @jest-environment jsdom
 */

import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useLearningPaths } from '@/hooks/useLearningPaths';
import { useSectors } from '@/hooks/useSectors';
import { useSectorProgress } from '@/hooks/useSectorProgress';

// Mock fetch globally
global.fetch = jest.fn();

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('API Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Clear localStorage
    localStorage.clear();
  });

  describe('useLearningPaths API Integration', () => {
    test('should fetch learning paths from API successfully', async () => {
      const mockLearningPaths = [
        {
          id: 'path1',
          name: 'JavaScript Fundamentals',
          description: 'Learn the basics of JavaScript',
          questionCount: 50,
          difficulty: 'beginner',
        },
        {
          id: 'path2',
          name: 'React Advanced',
          description: 'Advanced React concepts',
          questionCount: 75,
          difficulty: 'advanced',
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: mockLearningPaths,
        }),
      } as Response);

      const { result } = renderHook(() => useLearningPaths());

      expect(result.current.isLoading).toBe(true);
      expect(result.current.learningPaths).toEqual([]);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.learningPaths).toEqual(mockLearningPaths);
      expect(result.current.error).toBeNull();
    });

    test('should handle API errors gracefully', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const { result } = renderHook(() => useLearningPaths());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.learningPaths).toEqual([]);
      expect(result.current.error).toBe('Network error');
    });

    test('should handle API response errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: false,
          error: 'Database connection failed',
        }),
      } as Response);

      const { result } = renderHook(() => useLearningPaths());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.learningPaths).toEqual([]);
      expect(result.current.error).toBe('Database connection failed');
    });
  });

  describe('useSectors API Integration', () => {
    test('should fetch sectors for valid path ID', async () => {
      const pathId = 'javascript-fundamentals';
      const mockSectors = [
        {
          id: 'sector1',
          name: 'Variables and Data Types',
          description: 'Learn about JavaScript variables',
          questionCount: 10,
          difficulty: 'easy',
          order: 1,
          isActive: true,
        },
        {
          id: 'sector2',
          name: 'Functions',
          description: 'Understanding JavaScript functions',
          questionCount: 15,
          difficulty: 'medium',
          order: 2,
          isActive: true,
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: mockSectors,
        }),
      } as Response);

      const { result } = renderHook(() => useSectors(pathId));

      expect(result.current.isLoading).toBe(true);
      expect(result.current.sectors).toEqual([]);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.sectors).toEqual(mockSectors);
      expect(result.current.error).toBeNull();
    });

    test('should not fetch when pathId is null', async () => {
      const { result } = renderHook(() => useSectors(null));

      expect(result.current.isLoading).toBe(false);
      expect(result.current.sectors).toEqual([]);
      expect(mockFetch).not.toHaveBeenCalled();
    });

    test('should handle sector fetch errors', async () => {
      const pathId = 'invalid-path';

      mockFetch.mockRejectedValueOnce(new Error('Sector fetch failed'));

      const { result } = renderHook(() => useSectors(pathId));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.sectors).toEqual([]);
      expect(result.current.error).toBe('Sector fetch failed');
    });
  });

  describe('useSectorProgress Local Storage Integration', () => {
    test('should save and retrieve progress from localStorage', async () => {
      const { result } = renderHook(() => useSectorProgress());

      const mockProgress = {
        sectorId: 'sector1',
        pathId: 'javascript-fundamentals',
        score: 85,
        completedAt: '2024-01-15T10:30:00Z',
        timeSpent: 1200,
      };

      result.current.saveProgress(mockProgress);

      await waitFor(() => {
        expect(result.current.getSectorProgress('sector1')).toEqual(
          mockProgress
        );
      });

      expect(result.current.getPathProgress('javascript-fundamentals')).toEqual(
        [mockProgress]
      );
    });

    test('should handle multiple progress entries', async () => {
      const { result } = renderHook(() => useSectorProgress());

      const progress1 = {
        sectorId: 'sector1',
        pathId: 'javascript-fundamentals',
        score: 85,
        completedAt: '2024-01-15T10:30:00Z',
        timeSpent: 1200,
      };

      const progress2 = {
        sectorId: 'sector2',
        pathId: 'javascript-fundamentals',
        score: 92,
        completedAt: '2024-01-15T11:00:00Z',
        timeSpent: 900,
      };

      result.current.saveProgress(progress1);
      result.current.saveProgress(progress2);

      await waitFor(() => {
        expect(
          result.current.getPathProgress('javascript-fundamentals')
        ).toHaveLength(2);
      });

      expect(result.current.getSectorProgress('sector1')).toEqual(progress1);
      expect(result.current.getSectorProgress('sector2')).toEqual(progress2);
    });

    test('should clear all progress', async () => {
      const { result } = renderHook(() => useSectorProgress());

      const mockProgress = {
        sectorId: 'sector1',
        pathId: 'javascript-fundamentals',
        score: 85,
        completedAt: '2024-01-15T10:30:00Z',
        timeSpent: 1200,
      };

      result.current.saveProgress(mockProgress);
      result.current.clearProgress();

      await waitFor(() => {
        expect(result.current.getSectorProgress('sector1')).toBeNull();
      });

      expect(result.current.getPathProgress('javascript-fundamentals')).toEqual(
        []
      );
    });

    test('should handle localStorage errors gracefully', async () => {
      // Mock localStorage to throw an error on getItem
      const originalLocalStorage = global.localStorage;
      global.localStorage = {
        ...originalLocalStorage,
        getItem: jest.fn(() => {
          throw new Error('localStorage access denied');
        }),
      } as any;

      const { result } = renderHook(() => useSectorProgress());

      // The hook should still work even with localStorage errors
      expect(result.current.progress).toEqual({});
      expect(result.current.getSectorProgress('test')).toBeNull();
      expect(result.current.getPathProgress('test')).toEqual([]);

      // Restore original localStorage
      global.localStorage = originalLocalStorage;
    });
  });

  describe('End-to-End API Flow', () => {
    test('should complete full learning path flow', async () => {
      // Mock learning paths API
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: [
            {
              id: 'javascript-fundamentals',
              name: 'JavaScript Fundamentals',
              description: 'Learn the basics of JavaScript',
              questionCount: 50,
              difficulty: 'beginner',
            },
          ],
        }),
      } as Response);

      // Mock sectors API
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: [
            {
              id: 'sector1',
              name: 'Variables and Data Types',
              description: 'Learn about JavaScript variables',
              questionCount: 10,
              difficulty: 'easy',
              order: 1,
              isActive: true,
            },
          ],
        }),
      } as Response);

      const { result: learningPathsResult } = renderHook(() =>
        useLearningPaths()
      );
      const { result: sectorsResult } = renderHook(() =>
        useSectors('javascript-fundamentals')
      );
      const { result: progressResult } = renderHook(() => useSectorProgress());

      // Wait for learning paths to load
      await waitFor(() => {
        expect(learningPathsResult.current.isLoading).toBe(false);
      });

      // Wait for sectors to load
      await waitFor(() => {
        expect(sectorsResult.current.isLoading).toBe(false);
      });

      // Verify data is loaded
      expect(learningPathsResult.current.learningPaths).toHaveLength(1);
      expect(sectorsResult.current.sectors).toHaveLength(1);

      // Simulate completing a sector
      const mockProgress = {
        sectorId: 'sector1',
        pathId: 'javascript-fundamentals',
        score: 85,
        completedAt: new Date().toISOString(),
        timeSpent: 1200,
      };

      progressResult.current.saveProgress(mockProgress);

      await waitFor(() => {
        expect(progressResult.current.getSectorProgress('sector1')).toEqual(
          mockProgress
        );
      });
    });
  });
});
