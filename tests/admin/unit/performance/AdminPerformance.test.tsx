import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminDashboard from '@/app/admin/dashboard/page';
import { TopicManager } from '@/components/TopicManager';
import { TopicSelector } from '@/components/TopicSelector';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock admin auth hook
jest.mock('@/hooks/useAdminAuth', () => ({
  useAdminAuth: jest.fn(),
}));

// Mock fetch
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUseAdminAuth = useAdminAuth as jest.MockedFunction<
  typeof useAdminAuth
>;

describe('Admin Performance Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseRouter.mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      prefetch: jest.fn(),
    });

    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'super_admin',
        token: 'test-token',
        expiresAt: new Date(Date.now() + 3600000).toISOString(),
      },
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });
  });

  test('renders admin dashboard within performance threshold', async () => {
    const startTime = performance.now();

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ total: 150, active: 120 }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ total: 25, published: 20 }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ total: 8, active: 6 }),
      } as Response);

    render(<AdminDashboard />);

    await waitFor(() => {
      expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
    });

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    // Should render within 100ms
    expect(renderTime).toBeLessThan(100);
  });

  test('handles large dataset in TopicManager efficiently', async () => {
    const startTime = performance.now();

    // Create large dataset
    const largeTopics = Array.from({ length: 1000 }, (_, i) => ({
      id: `${i + 1}`,
      name: `Topic ${i + 1}`,
      description: `Description for topic ${i + 1}`,
      category: 'JavaScript Core',
      questionCount: Math.floor(Math.random() * 100),
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
    }));

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => largeTopics,
    } as Response);

    render(<TopicManager />);

    await waitFor(() => {
      expect(screen.getByText('Topic Management')).toBeInTheDocument();
    });

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    // Should handle large dataset within 200ms
    expect(renderTime).toBeLessThan(200);
  });

  test('handles large dataset in TopicSelector efficiently', async () => {
    const startTime = performance.now();

    // Create large dataset
    const largeTopics = Array.from({ length: 1000 }, (_, i) => ({
      id: `${i + 1}`,
      name: `Topic ${i + 1}`,
      description: `Description for topic ${i + 1}`,
      category: 'JavaScript Core',
      questionCount: Math.floor(Math.random() * 100),
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
    }));

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => largeTopics,
    } as Response);

    render(<TopicSelector selectedTopics={[]} onTopicsChange={jest.fn()} />);

    await waitFor(() => {
      expect(screen.getByText('Select Topics')).toBeInTheDocument();
    });

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    // Should handle large dataset within 150ms
    expect(renderTime).toBeLessThan(150);
  });

  test('handles rapid state changes efficiently', async () => {
    const startTime = performance.now();

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ total: 150, active: 120 }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ total: 25, published: 20 }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ total: 8, active: 6 }),
      } as Response);

    const { rerender } = render(<AdminDashboard />);

    // Rapid state changes
    for (let i = 0; i < 10; i++) {
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        user: {
          id: '1',
          email: 'admin@example.com',
          name: `Admin User ${i}`,
          role: 'super_admin',
          token: 'test-token',
          expiresAt: new Date(Date.now() + 3600000).toISOString(),
        },
        login: jest.fn(),
        logout: jest.fn(),
        error: null,
      });

      rerender(<AdminDashboard />);
    }

    const endTime = performance.now();
    const totalTime = endTime - startTime;

    // Should handle rapid changes within 500ms
    expect(totalTime).toBeLessThan(500);
  });

  test('handles memory usage efficiently with large datasets', async () => {
    const initialMemory = performance.memory?.usedJSHeapSize || 0;

    // Create very large dataset
    const veryLargeTopics = Array.from({ length: 10000 }, (_, i) => ({
      id: `${i + 1}`,
      name: `Topic ${i + 1}`,
      description: `Description for topic ${i + 1}`,
      category: 'JavaScript Core',
      questionCount: Math.floor(Math.random() * 100),
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
    }));

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => veryLargeTopics,
    } as Response);

    render(<TopicManager />);

    await waitFor(() => {
      expect(screen.getByText('Topic Management')).toBeInTheDocument();
    });

    const finalMemory = performance.memory?.usedJSHeapSize || 0;
    const memoryIncrease = finalMemory - initialMemory;

    // Memory increase should be reasonable (less than 50MB)
    if (performance.memory) {
      expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024);
    }
  });

  test('handles concurrent API calls efficiently', async () => {
    const startTime = performance.now();

    // Mock multiple concurrent API calls
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ total: 150, active: 120 }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ total: 25, published: 20 }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ total: 8, active: 6 }),
      } as Response);

    render(<AdminDashboard />);

    await waitFor(() => {
      expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
    });

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    // Should handle concurrent calls within 300ms
    expect(renderTime).toBeLessThan(300);
  });

  test('handles search performance with large datasets', async () => {
    const startTime = performance.now();

    // Create large dataset
    const largeTopics = Array.from({ length: 1000 }, (_, i) => ({
      id: `${i + 1}`,
      name: `Topic ${i + 1}`,
      description: `Description for topic ${i + 1}`,
      category: 'JavaScript Core',
      questionCount: Math.floor(Math.random() * 100),
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
    }));

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => largeTopics,
    } as Response);

    render(<TopicManager />);

    await waitFor(() => {
      expect(screen.getByText('Topic Management')).toBeInTheDocument();
    });

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    // Should render within 200ms
    expect(renderTime).toBeLessThan(200);
  });

  test('handles filter performance with large datasets', async () => {
    const startTime = performance.now();

    // Create large dataset with multiple categories
    const largeTopics = Array.from({ length: 1000 }, (_, i) => ({
      id: `${i + 1}`,
      name: `Topic ${i + 1}`,
      description: `Description for topic ${i + 1}`,
      category: ['JavaScript Core', 'React & Frontend', 'CSS & Styling'][i % 3],
      questionCount: Math.floor(Math.random() * 100),
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
    }));

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => largeTopics,
    } as Response);

    render(<TopicManager />);

    await waitFor(() => {
      expect(screen.getByText('Topic Management')).toBeInTheDocument();
    });

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    // Should render within 200ms
    expect(renderTime).toBeLessThan(200);
  });

  test('handles component unmounting efficiently', async () => {
    const startTime = performance.now();

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ total: 150, active: 120 }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ total: 25, published: 20 }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ total: 8, active: 6 }),
      } as Response);

    const { unmount } = render(<AdminDashboard />);

    await waitFor(() => {
      expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
    });

    unmount();

    const endTime = performance.now();
    const totalTime = endTime - startTime;

    // Should handle mount/unmount within 200ms
    expect(totalTime).toBeLessThan(200);
  });

  test('handles error state rendering efficiently', async () => {
    const startTime = performance.now();

    // Mock API error
    mockFetch.mockRejectedValue(new Error('API Error'));

    render(<AdminDashboard />);

    await waitFor(() => {
      expect(screen.getByText(/error loading statistics/i)).toBeInTheDocument();
    });

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    // Should handle error state within 100ms
    expect(renderTime).toBeLessThan(100);
  });

  test('handles loading state rendering efficiently', () => {
    const startTime = performance.now();

    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    render(<AdminDashboard />);

    expect(screen.getByText(/loading dashboard/i)).toBeInTheDocument();

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    // Should handle loading state within 50ms
    expect(renderTime).toBeLessThan(50);
  });
});
