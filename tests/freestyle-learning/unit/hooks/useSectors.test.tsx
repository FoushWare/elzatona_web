/**
 * @jest-environment jsdom
 */

import { renderHook, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSectors } from '@/hooks/useSectors';

global.fetch = jest.fn();

describe('useSectors Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should not fetch when pathId is empty', () => {
    renderHook(() => useSectors(''));

    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('should not fetch when pathId is null', () => {
    renderHook(() => useSectors(null as any));

    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('should not fetch when pathId is undefined', () => {
    renderHook(() => useSectors(undefined as any));

    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('should initialize with loading state when pathId is provided', () => {
    const { result } = renderHook(() => useSectors('javascript-deep-dive'));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.sectors).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  test('should fetch sectors for given pathId', async () => {
    const mockSectors = [
      {
        id: 'fundamentals',
        name: 'Fundamentals',
        questionCount: 8,
        difficulty: 'easy',
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, data: mockSectors }),
    });

    const { result } = renderHook(() => useSectors('javascript-deep-dive'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.sectors).toEqual(mockSectors);
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/sectors/by-path/javascript-deep-dive'
    );
  });

  test('should handle API error response', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: false, error: 'Failed to fetch sectors' }),
    });

    const { result } = renderHook(() => useSectors('javascript-deep-dive'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.sectors).toEqual([]);
    expect(result.current.error).toBe('Failed to fetch sectors');
  });

  test('should handle fetch error', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error('Network error')
    );

    const { result } = renderHook(() => useSectors('javascript-deep-dive'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.sectors).toEqual([]);
    expect(result.current.error).toBe('Network error');
  });

  test('should refetch data when refetch is called', async () => {
    const mockSectors = [
      { id: 'test-sector', name: 'Test Sector', questionCount: 5 },
    ];

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: mockSectors }),
    });

    const { result } = renderHook(() => useSectors('javascript-deep-dive'));

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
      status: 404,
      statusText: 'Not Found',
    });

    const { result } = renderHook(() => useSectors('javascript-deep-dive'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.sectors).toEqual([]);
    expect(result.current.error).toBe('Failed to fetch sectors');
  });

  test('should handle malformed JSON response', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => {
        throw new Error('Invalid JSON');
      },
    });

    const { result } = renderHook(() => useSectors('javascript-deep-dive'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.sectors).toEqual([]);
    expect(result.current.error).toBe('Invalid JSON');
  });

  test('should handle empty response data', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, data: [] }),
    });

    const { result } = renderHook(() => useSectors('javascript-deep-dive'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.sectors).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  test('should handle missing data property in response', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    const { result } = renderHook(() => useSectors('javascript-deep-dive'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.sectors).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  test('should refetch when pathId changes', async () => {
    const mockSectors1 = [
      { id: 'sector1', name: 'Sector 1', questionCount: 5 },
    ];
    const mockSectors2 = [
      { id: 'sector2', name: 'Sector 2', questionCount: 10 },
    ];

    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: mockSectors1 }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: mockSectors2 }),
      });

    const { result, rerender } = renderHook(
      ({ pathId }) => useSectors(pathId),
      { initialProps: { pathId: 'path1' } }
    );

    await waitFor(() => {
      expect(result.current.sectors).toEqual(mockSectors1);
    });

    // Change pathId
    rerender({ pathId: 'path2' });

    await waitFor(() => {
      expect(result.current.sectors).toEqual(mockSectors2);
    });

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenNthCalledWith(
      1,
      '/api/sectors/by-path/path1'
    );
    expect(global.fetch).toHaveBeenNthCalledWith(
      2,
      '/api/sectors/by-path/path2'
    );
  });

  test('should not fetch when pathId changes to empty string', async () => {
    const mockSectors = [{ id: 'sector1', name: 'Sector 1', questionCount: 5 }];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, data: mockSectors }),
    });

    const { result, rerender } = renderHook(
      ({ pathId }) => useSectors(pathId),
      { initialProps: { pathId: 'path1' } }
    );

    await waitFor(() => {
      expect(result.current.sectors).toEqual(mockSectors);
    });

    // Change pathId to empty string
    rerender({ pathId: '' });

    // Should not make another fetch call
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
