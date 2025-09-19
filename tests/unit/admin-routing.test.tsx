import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminPage from '@/app/admin/page';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock the useAdminAuth hook
jest.mock('@/hooks/useAdminAuth', () => ({
  useAdminAuth: jest.fn(),
}));

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Loader2: ({ className }: { className: string }) => (
    <div data-testid="loader" className={className}>
      Loading...
    </div>
  ),
}));

const mockPush = jest.fn();
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUseAdminAuth = useAdminAuth as jest.MockedFunction<
  typeof useAdminAuth
>;

describe('Admin Routing Logic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({
      push: mockPush,
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    } as unknown);
  });

  it('should redirect to dashboard when user is authenticated', async () => {
    // Mock authenticated user
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: { id: '1', email: 'admin@test.com', name: 'Admin', role: 'admin' },
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    render(<AdminPage />);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/admin/dashboard');
    });
  });

  it('should redirect to login when user is not authenticated', async () => {
    // Mock unauthenticated user
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    render(<AdminPage />);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/admin/login');
    });
  });

  it('should show loading state while checking authentication', async () => {
    // Mock loading state
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    render(<AdminPage />);

    // Should show loading spinner
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.getByText('Checking authentication...')).toBeInTheDocument();

    // Should not redirect while loading
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should not redirect when still loading', async () => {
    // Mock loading state
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: true,
      user: { id: '1', email: 'admin@test.com', name: 'Admin', role: 'admin' },
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    render(<AdminPage />);

    // Should show loading spinner
    expect(screen.getByTestId('loader')).toBeInTheDocument();

    // Should not redirect while loading
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should handle authentication state changes', async () => {
    // Start with loading state
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    const { rerender } = render(<AdminPage />);

    // Should show loading
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();

    // Update to authenticated state
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: { id: '1', email: 'admin@test.com', name: 'Admin', role: 'admin' },
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    rerender(<AdminPage />);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/admin/dashboard');
    });
  });

  it('should handle unauthenticated state changes', async () => {
    // Start with loading state
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    const { rerender } = render(<AdminPage />);

    // Should show loading
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();

    // Update to unauthenticated state
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    rerender(<AdminPage />);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/admin/login');
    });
  });
});
