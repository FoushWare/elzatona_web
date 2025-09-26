/**
 * @jest-environment jsdom
 */

import { renderHook, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useLearningPaths } from '@/hooks/useLearningPaths';

// Mock fetch
global.fetch = jest.fn();

describe('useLearningPaths Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should initialize with loading state', () => {
    const { result } = renderHook(() => useLearningPaths());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.learningPaths).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  test('should fetch learning paths successfully', async () => {
    const mockLearningPaths = [
      {
        id: 'javascript-deep-dive',
        name: 'JavaScript Deep Dive',
        questionCount: 45,
        difficulty: 'intermediate',
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, data: mockLearningPaths }),
    });

    const { result } = renderHook(() => useLearningPaths());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.learningPaths).toEqual(mockLearningPaths);
    expect(result.current.error).toBeNull();
    expect(global.fetch).toHaveBeenCalledWith('/api/learning-paths');
  });

  test('should handle fetch error', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error('Network error')
    );

    const { result } = renderHook(() => useLearningPaths());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.learningPaths).toEqual([]);
    expect(result.current.error).toBe('Network error');
  });

  test('should handle API error response', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: false,
        error: 'Failed to fetch learning paths',
      }),
    });

    const { result } = renderHook(() => useLearningPaths());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.learningPaths).toEqual([]);
    expect(result.current.error).toBe('Failed to fetch learning paths');
  });

  test('should refetch data when refetch is called', async () => {
    const mockLearningPaths = [
      { id: 'test-path', name: 'Test Path', questionCount: 10 },
    ];

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: mockLearningPaths }),
    });

    const { result } = renderHook(() => useLearningPaths());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Call refetch
    result.current.refetch();

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
  });

  test('should handle non-ok response', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    const { result } = renderHook(() => useLearningPaths());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.learningPaths).toEqual([]);
    expect(result.current.error).toBe('Failed to fetch learning paths');
  });

  test('should handle malformed JSON response', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => {
        throw new Error('Invalid JSON');
      },
    });

    const { result } = renderHook(() => useLearningPaths());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.learningPaths).toEqual([]);
    expect(result.current.error).toBe('Invalid JSON');
  });

  test('should handle empty response data', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, data: [] }),
    });

    const { result } = renderHook(() => useLearningPaths());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.learningPaths).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  test('should handle missing data property in response', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    const { result } = renderHook(() => useLearningPaths());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.learningPaths).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  test('should set loading to false after successful fetch', async () => {
    const mockLearningPaths = [{ id: 'test', name: 'Test', questionCount: 5 }];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, data: mockLearningPaths }),
    });

    const { result } = renderHook(() => useLearningPaths());

    // Initially loading
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.learningPaths).toEqual(mockLearningPaths);
  });

  test('should set loading to false after error', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Test error'));

    const { result } = renderHook(() => useLearningPaths());

    // Initially loading
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe('Test error');
  });
});
