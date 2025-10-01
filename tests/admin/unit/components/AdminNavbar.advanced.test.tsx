import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminNavbar from '@/components/AdminNavbar';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock theme context
jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

// Mock admin auth hook
jest.mock('@/hooks/useAdminAuth', () => ({
  useAdminAuth: jest.fn(),
}));

// Mock AlzatonaLogo component
jest.mock('@/components/AlzatonaLogo', () => {
  return function MockAlzatonaLogo() {
    return <div data-testid="alzatona-logo">Alzatona Logo</div>;
  };
});

const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  prefetch: jest.fn(),
};

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUseTheme = useTheme as jest.MockedFunction<typeof useTheme>;
const mockUseAdminAuth = useAdminAuth as jest.MockedFunction<
  typeof useAdminAuth
>;

describe('AdminNavbar Component - Advanced Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseRouter.mockReturnValue(mockRouter);
    mockUseTheme.mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: jest.fn(),
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

  test('handles scroll effect correctly', () => {
    render(<AdminNavbar />);

    const navbar = screen.getByRole('navigation');

    // Initially should have gradient background
    expect(navbar).toHaveClass(
      'bg-gradient-to-r',
      'from-red-600',
      'to-red-800'
    );

    // Simulate scroll
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 50,
    });

    fireEvent.scroll(window);

    // Should change to scrolled state
    expect(navbar).toHaveClass(
      'bg-white/95',
      'dark:bg-gray-900/95',
      'backdrop-blur-md',
      'shadow-lg'
    );
  });

  test('closes dropdowns when clicking outside', async () => {
    render(<AdminNavbar />);

    // Open admin dropdown
    const adminPanelButton = screen.getByText('Admin Panel');
    fireEvent.click(adminPanelButton);

    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    // Click outside (on document)
    fireEvent.click(document);

    await waitFor(() => {
      expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    });
  });

  test('handles multiple dropdown interactions', async () => {
    render(<AdminNavbar />);

    // Open admin dropdown
    const adminPanelButton = screen.getByText('Admin Panel');
    fireEvent.click(adminPanelButton);

    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    // Open user dropdown (should close admin dropdown)
    const userButton = screen.getByText('Admin User');
    fireEvent.click(userButton);

    await waitFor(() => {
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    });
  });

  test('handles keyboard navigation', async () => {
    render(<AdminNavbar />);

    // Focus on admin panel button
    const adminPanelButton = screen.getByText('Admin Panel');
    adminPanelButton.focus();

    // Press Enter to open dropdown
    fireEvent.keyDown(adminPanelButton, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });
  });

  test('handles escape key to close dropdowns', async () => {
    render(<AdminNavbar />);

    // Open admin dropdown
    const adminPanelButton = screen.getByText('Admin Panel');
    fireEvent.click(adminPanelButton);

    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    // Press Escape
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    });
  });

  test('handles window resize for mobile menu', () => {
    render(<AdminNavbar />);

    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    });

    // Trigger resize event
    fireEvent.resize(window);

    // Mobile menu button should be visible
    const buttons = screen.getAllByRole('button');
    const mobileMenuButton = buttons[buttons.length - 1];
    expect(mobileMenuButton).toHaveClass('md:hidden');
  });

  test('handles user with no name (email fallback)', () => {
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: {
        id: '1',
        email: 'admin@example.com',
        name: '', // No name provided
        role: 'super_admin',
        token: 'test-token',
        expiresAt: new Date(Date.now() + 3600000).toISOString(),
      },
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    render(<AdminNavbar />);

    // Should show email instead of name
    expect(screen.getByText('admin@example.com')).toBeInTheDocument();
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

    render(<AdminNavbar />);

    // Open user dropdown to see role
    const userButton = screen.getByText('Moderator User');
    fireEvent.click(userButton);

    expect(screen.getByText('Role: moderator')).toBeInTheDocument();
  });

  test('handles theme toggle with different states', () => {
    const mockToggleTheme = jest.fn();

    // Test light mode
    mockUseTheme.mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: mockToggleTheme,
    });

    const { rerender } = render(<AdminNavbar />);

    const themeButton = screen.getByTitle('Toggle theme');
    expect(themeButton).toBeInTheDocument();

    // Test dark mode
    mockUseTheme.mockReturnValue({
      isDarkMode: true,
      toggleDarkMode: mockToggleTheme,
    });

    rerender(<AdminNavbar />);

    // Theme button should still be present
    expect(themeButton).toBeInTheDocument();
  });

  test('handles navigation link clicks', async () => {
    render(<AdminNavbar />);

    // Open admin dropdown
    const adminPanelButton = screen.getByText('Admin Panel');
    fireEvent.click(adminPanelButton);

    // Click on Questions link
    const questionsLink = screen.getByText('Questions');
    expect(questionsLink.closest('a')).toHaveAttribute(
      'href',
      '/admin/content/questions'
    );
  });

  test('handles mobile menu navigation', () => {
    render(<AdminNavbar />);

    // Open mobile menu
    const buttons = screen.getAllByRole('button');
    const mobileMenuButton = buttons[buttons.length - 1];
    fireEvent.click(mobileMenuButton);

    // Check mobile menu items
    expect(screen.getByText('Admin Panel')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  test('handles error state in authentication', () => {
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
      error: 'Authentication failed',
    });

    render(<AdminNavbar />);

    // Should not show user menu when there's an error
    expect(screen.queryByText('Admin User')).not.toBeInTheDocument();
  });

  test('handles expired token scenario', () => {
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'super_admin',
        token: 'expired-token',
        expiresAt: new Date(Date.now() - 3600000).toISOString(), // Expired
      },
      login: jest.fn(),
      logout: jest.fn(),
      error: 'Token expired',
    });

    render(<AdminNavbar />);

    // Should not show user menu when token is expired
    expect(screen.queryByText('Admin User')).not.toBeInTheDocument();
  });

  test('handles rapid theme toggles', () => {
    const mockToggleTheme = jest.fn();
    mockUseTheme.mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: mockToggleTheme,
    });

    render(<AdminNavbar />);

    const themeButton = screen.getByTitle('Toggle theme');

    // Rapid clicks
    fireEvent.click(themeButton);
    fireEvent.click(themeButton);
    fireEvent.click(themeButton);

    expect(mockToggleTheme).toHaveBeenCalledTimes(3);
  });

  test('handles dropdown menu item descriptions', async () => {
    render(<AdminNavbar />);

    // Open admin dropdown
    const adminPanelButton = screen.getByText('Admin Panel');
    fireEvent.click(adminPanelButton);

    await waitFor(() => {
      expect(
        screen.getByText('Admin overview and statistics')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Add, edit, and manage questions')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Create and manage learning plans')
      ).toBeInTheDocument();
    });
  });

  test('handles mobile menu close on navigation', () => {
    render(<AdminNavbar />);

    // Open mobile menu
    const buttons = screen.getAllByRole('button');
    const mobileMenuButton = buttons[buttons.length - 1];
    fireEvent.click(mobileMenuButton);

    // Click on a navigation item
    const dashboardLink = screen.getByText('Dashboard');
    fireEvent.click(dashboardLink);

    // Mobile menu should close
    expect(screen.queryByText('Admin Panel')).not.toBeInTheDocument();
  });
});
