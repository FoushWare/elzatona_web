import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminDashboard from '@/app/admin/dashboard/page';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock admin auth hook
jest.mock('@/hooks/useAdminAuth', () => ({
  useAdminAuth: jest.fn(),
}));

// Mock fetch for API calls
global.fetch = jest.fn();

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUseAdminAuth = useAdminAuth as jest.MockedFunction<
  typeof useAdminAuth
>;
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('AdminDashboard Component', () => {
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

    // Mock successful API responses
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
  });

  test('renders dashboard with welcome message', async () => {
    render(<AdminDashboard />);

    expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
    expect(screen.getByText(/welcome back, admin user/i)).toBeInTheDocument();
  });

  test('displays statistics cards', async () => {
    render(<AdminDashboard />);

    await waitFor(() => {
      expect(screen.getByText('Total Questions')).toBeInTheDocument();
      expect(screen.getByText('150')).toBeInTheDocument();
      expect(screen.getByText('Active Questions')).toBeInTheDocument();
      expect(screen.getByText('120')).toBeInTheDocument();
    });
  });

  test('displays learning plans statistics', async () => {
    render(<AdminDashboard />);

    await waitFor(() => {
      expect(screen.getByText('Learning Plans')).toBeInTheDocument();
      expect(screen.getByText('25')).toBeInTheDocument();
      expect(screen.getByText('Published Plans')).toBeInTheDocument();
      expect(screen.getByText('20')).toBeInTheDocument();
    });
  });

  test('displays sections statistics', async () => {
    render(<AdminDashboard />);

    await waitFor(() => {
      expect(screen.getByText('Learning Sections')).toBeInTheDocument();
      expect(screen.getByText('8')).toBeInTheDocument();
      expect(screen.getByText('Active Sections')).toBeInTheDocument();
      expect(screen.getByText('6')).toBeInTheDocument();
    });
  });

  test('renders quick action buttons', () => {
    render(<AdminDashboard />);

    expect(screen.getByText('Quick Actions')).toBeInTheDocument();
    expect(screen.getByText('Add New Question')).toBeInTheDocument();
    expect(screen.getByText('Create Learning Plan')).toBeInTheDocument();
    expect(screen.getByText('Manage Sections')).toBeInTheDocument();
    expect(screen.getByText('View Reports')).toBeInTheDocument();
  });

  test('handles quick action button clicks', () => {
    const mockPush = jest.fn();
    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      prefetch: jest.fn(),
    });

    render(<AdminDashboard />);

    // Click on "Add New Question" button
    const addQuestionButton = screen.getByText('Add New Question');
    fireEvent.click(addQuestionButton);

    expect(mockPush).toHaveBeenCalledWith('/admin/content/questions');
  });

  test('handles API errors gracefully', async () => {
    // Mock API error
    mockFetch.mockRejectedValueOnce(new Error('API Error'));

    render(<AdminDashboard />);

    await waitFor(() => {
      expect(screen.getByText(/error loading statistics/i)).toBeInTheDocument();
    });
  });

  test('shows loading state initially', () => {
    render(<AdminDashboard />);

    expect(screen.getByText(/loading dashboard/i)).toBeInTheDocument();
  });

  test('handles unauthenticated state', () => {
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    render(<AdminDashboard />);

    // Should redirect or show access denied
    expect(screen.queryByText('Admin Dashboard')).not.toBeInTheDocument();
  });

  test('displays recent activity section', async () => {
    render(<AdminDashboard />);

    expect(screen.getByText('Recent Activity')).toBeInTheDocument();
    expect(screen.getByText('No recent activity')).toBeInTheDocument();
  });

  test('handles different user roles', () => {
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: {
        id: '1',
        email: 'moderator@example.com',
        name: 'Moderator User',
        role: 'moderator',
        token: 'test-token',
        expiresAt: new Date(Date.now() + 3600000).toISOString(),
      },
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    render(<AdminDashboard />);

    expect(
      screen.getByText(/welcome back, moderator user/i)
    ).toBeInTheDocument();
  });

  test('handles empty statistics data', async () => {
    // Mock empty API responses
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ total: 0, active: 0 }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ total: 0, published: 0 }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ total: 0, active: 0 }),
      } as Response);

    render(<AdminDashboard />);

    await waitFor(() => {
      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });

  test('handles network timeout', async () => {
    // Mock slow response
    mockFetch.mockImplementation(
      () =>
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Network timeout')), 100)
        )
    );

    render(<AdminDashboard />);

    await waitFor(() => {
      expect(screen.getByText(/error loading statistics/i)).toBeInTheDocument();
    });
  });

  test('handles malformed API response', async () => {
    // Mock malformed response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => null,
    } as Response);

    render(<AdminDashboard />);

    await waitFor(() => {
      expect(screen.getByText(/error loading statistics/i)).toBeInTheDocument();
    });
  });

  test('displays system status indicators', () => {
    render(<AdminDashboard />);

    expect(screen.getByText('System Status')).toBeInTheDocument();
    expect(screen.getByText('All systems operational')).toBeInTheDocument();
  });

  test('handles refresh button click', async () => {
    const mockRefresh = jest.fn();
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: mockRefresh,
      prefetch: jest.fn(),
    });

    render(<AdminDashboard />);

    const refreshButton = screen.getByText('Refresh Data');
    fireEvent.click(refreshButton);

    expect(mockRefresh).toHaveBeenCalled();
  });
});
