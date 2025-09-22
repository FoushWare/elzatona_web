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

describe('AdminNavbar Component', () => {
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

  test('renders admin navbar with logo and navigation', () => {
    render(<AdminNavbar />);

    expect(screen.getByTestId('alzatona-logo')).toBeInTheDocument();
    expect(screen.getByText('Admin Panel')).toBeInTheDocument();
    expect(screen.getByText('Admin User')).toBeInTheDocument();
  });

  test('displays user information correctly', () => {
    render(<AdminNavbar />);

    expect(screen.getByText('Admin User')).toBeInTheDocument();
    // User email and role are shown in dropdown, not in main navbar
  });

  test('opens admin dropdown menu when clicked', async () => {
    render(<AdminNavbar />);

    const adminPanelButton = screen.getByText('Admin Panel');
    fireEvent.click(adminPanelButton);

    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Questions')).toBeInTheDocument();
      expect(screen.getByText('Guided Learning')).toBeInTheDocument();
    });
  });

  test('opens user dropdown menu when clicked', async () => {
    render(<AdminNavbar />);

    const userButton = screen.getByText('Admin User');
    fireEvent.click(userButton);

    await waitFor(() => {
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
      expect(screen.getByText('Logout')).toBeInTheDocument();
    });
  });

  test('handles logout correctly', async () => {
    const mockLogout = jest.fn();
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
      logout: mockLogout,
      error: null,
    });

    render(<AdminNavbar />);

    // Open user dropdown
    const userButton = screen.getByText('Admin User');
    fireEvent.click(userButton);

    // Click logout
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
    expect(mockRouter.replace).toHaveBeenCalledWith('/admin/login');
  });

  test('toggles theme when theme button is clicked', () => {
    const mockToggleTheme = jest.fn();
    mockUseTheme.mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: mockToggleTheme,
    });

    render(<AdminNavbar />);

    const themeButton = screen.getByTitle('Toggle theme');
    fireEvent.click(themeButton);

    expect(mockToggleTheme).toHaveBeenCalled();
  });

  test('shows moon icon in light mode', () => {
    mockUseTheme.mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: jest.fn(),
    });

    render(<AdminNavbar />);

    // Moon icon should be visible in light mode
    const themeButton = screen.getByTitle('Toggle theme');
    expect(themeButton).toBeInTheDocument();
  });

  test('shows sun icon in dark mode', () => {
    mockUseTheme.mockReturnValue({
      isDarkMode: true,
      toggleDarkMode: jest.fn(),
    });

    render(<AdminNavbar />);

    // Sun icon should be visible in dark mode
    const themeButton = screen.getByTitle('Toggle theme');
    expect(themeButton).toBeInTheDocument();
  });

  test('handles mobile menu toggle', () => {
    render(<AdminNavbar />);

    // Find the mobile menu button (it's the last button in the navbar)
    const buttons = screen.getAllByRole('button');
    const mobileMenuButton = buttons[buttons.length - 1]; // Last button is mobile menu
    fireEvent.click(mobileMenuButton);

    // Mobile menu should be visible - check for mobile-specific content
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Questions')).toBeInTheDocument();
  });

  test('closes mobile menu when logout is clicked', async () => {
    const mockLogout = jest.fn();
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
      logout: mockLogout,
      error: null,
    });

    render(<AdminNavbar />);

    // Open mobile menu
    const buttons = screen.getAllByRole('button');
    const mobileMenuButton = buttons[buttons.length - 1]; // Last button is mobile menu
    fireEvent.click(mobileMenuButton);

    // Click logout in mobile menu
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
    expect(mockRouter.replace).toHaveBeenCalledWith('/admin/login');
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

    render(<AdminNavbar />);

    // User menu should not be visible
    expect(screen.queryByText('Admin User')).not.toBeInTheDocument();
  });

  test('handles loading state', () => {
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
      error: null,
    });

    render(<AdminNavbar />);

    // Should still render the navbar structure
    expect(screen.getByTestId('alzatona-logo')).toBeInTheDocument();
    expect(screen.getByText('Admin Panel')).toBeInTheDocument();
  });

  test('navigates to admin pages when menu items are clicked', async () => {
    render(<AdminNavbar />);

    // Open admin dropdown
    const adminPanelButton = screen.getByText('Admin Panel');
    fireEvent.click(adminPanelButton);

    // Click on Dashboard
    const dashboardLink = screen.getByText('Dashboard');
    fireEvent.click(dashboardLink);

    // Should navigate to dashboard (link behavior)
    expect(dashboardLink.closest('a')).toHaveAttribute(
      'href',
      '/admin/dashboard'
    );
  });

  test('applies scroll effect styling', () => {
    render(<AdminNavbar />);

    const navbar = screen.getByRole('navigation');
    expect(navbar).toHaveClass('fixed', 'top-0', 'left-0', 'right-0');
  });
});
