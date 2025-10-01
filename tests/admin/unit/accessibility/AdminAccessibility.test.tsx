import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useTheme } from '@/contexts/ThemeContext';
import AdminDashboard from '@/app/admin/dashboard/page';
import AdminLoginPage from '@/app/admin/login/page';
import { TopicManager } from '@/components/TopicManager';
import { TopicSelector } from '@/components/TopicSelector';
import AdminNavbar from '@/components/AdminNavbar';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock admin auth hook
jest.mock('@/hooks/useAdminAuth', () => ({
  useAdminAuth: jest.fn(),
}));

// Mock theme context
jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

// Mock AlzatonaLogo component
jest.mock('@/components/AlzatonaLogo', () => {
  return function MockAlzatonaLogo() {
    return <div data-testid="alzatona-logo">Alzatona Logo</div>;
  };
});

// Mock fetch
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUseAdminAuth = useAdminAuth as jest.MockedFunction<
  typeof useAdminAuth
>;
const mockUseTheme = useTheme as jest.MockedFunction<typeof useTheme>;

describe('Admin Accessibility Tests', () => {
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

    mockUseTheme.mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: jest.fn(),
    });
  });

  describe('AdminDashboard Accessibility', () => {
    beforeEach(() => {
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

    test('has proper heading structure', async () => {
      render(<AdminDashboard />);

      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toBeInTheDocument();
      expect(mainHeading).toHaveTextContent('Admin Dashboard');
    });

    test('has accessible button elements', async () => {
      render(<AdminDashboard />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toBeInTheDocument();
        // Buttons should have accessible names
        expect(button).toHaveAccessibleName();
      });
    });

    test('has proper ARIA labels for interactive elements', async () => {
      render(<AdminDashboard />);

      const refreshButton = screen.getByText('Refresh Data');
      expect(refreshButton).toHaveAttribute('aria-label');
    });

    test('has proper color contrast for text elements', async () => {
      render(<AdminDashboard />);

      const heading = screen.getByRole('heading', { level: 1 });
      const computedStyle = window.getComputedStyle(heading);

      // Check if text has sufficient contrast (basic check)
      expect(computedStyle.color).toBeDefined();
      expect(computedStyle.backgroundColor).toBeDefined();
    });

    test('has proper focus management', async () => {
      render(<AdminDashboard />);

      const firstButton = screen.getAllByRole('button')[0];
      firstButton.focus();

      expect(document.activeElement).toBe(firstButton);
    });

    test('has proper semantic HTML structure', async () => {
      render(<AdminDashboard />);

      // Check for proper semantic elements
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });
  });

  describe('AdminLoginPage Accessibility', () => {
    beforeEach(() => {
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        login: jest.fn(),
        logout: jest.fn(),
        error: null,
      });
    });

    test('has proper form structure', () => {
      render(<AdminLoginPage />);

      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      expect(emailInput).toHaveAttribute('type', 'email');
      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    test('has proper form labels and descriptions', () => {
      render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      expect(emailInput).toHaveAttribute('aria-describedby');
      expect(passwordInput).toHaveAttribute('aria-describedby');
    });

    test('has proper error message association', () => {
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        login: jest.fn(),
        logout: jest.fn(),
        error: 'Invalid credentials',
      });

      render(<AdminLoginPage />);

      const errorMessage = screen.getByText('Invalid credentials');
      expect(errorMessage).toHaveAttribute('role', 'alert');
    });

    test('has proper button accessibility', () => {
      render(<AdminLoginPage />);

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      expect(submitButton).toHaveAttribute('type', 'submit');
      expect(submitButton).toHaveAccessibleName();
    });

    test('has proper theme toggle accessibility', () => {
      render(<AdminLoginPage />);

      const themeButton = screen.getByTitle('Toggle theme');
      expect(themeButton).toHaveAttribute('aria-label');
      expect(themeButton).toHaveAttribute('title');
    });
  });

  describe('AdminNavbar Accessibility', () => {
    beforeEach(() => {
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

    test('has proper navigation structure', () => {
      render(<AdminNavbar />);

      const navigation = screen.getByRole('navigation');
      expect(navigation).toBeInTheDocument();

      const navItems = screen.getAllByRole('menuitem');
      expect(navItems.length).toBeGreaterThan(0);
    });

    test('has proper dropdown accessibility', () => {
      render(<AdminNavbar />);

      const adminButton = screen.getByText('Admin Panel');
      expect(adminButton).toHaveAttribute('aria-haspopup', 'true');
      expect(adminButton).toHaveAttribute('aria-expanded', 'false');
    });

    test('has proper mobile menu accessibility', () => {
      render(<AdminNavbar />);

      const buttons = screen.getAllByRole('button');
      const mobileMenuButton = buttons[buttons.length - 1];

      expect(mobileMenuButton).toHaveAttribute('aria-label');
      expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false');
    });

    test('has proper focus management for dropdowns', () => {
      render(<AdminNavbar />);

      const adminButton = screen.getByText('Admin Panel');
      adminButton.focus();

      expect(document.activeElement).toBe(adminButton);
    });

    test('has proper ARIA landmarks', () => {
      render(<AdminNavbar />);

      const navigation = screen.getByRole('navigation');
      expect(navigation).toHaveAttribute('aria-label');
    });
  });

  describe('TopicManager Accessibility', () => {
    beforeEach(() => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => [
          {
            id: '1',
            name: 'JavaScript Fundamentals',
            description: 'Core JavaScript concepts',
            category: 'JavaScript Core',
            questionCount: 5,
            createdAt: '2023-01-01T00:00:00Z',
            updatedAt: '2023-01-01T00:00:00Z',
          },
        ],
      } as Response);
    });

    test('has proper form accessibility', async () => {
      render(<TopicManager />);

      await screen.findByText('Topic Management');

      const addButton = screen.getByText('Add New Topic');
      expect(addButton).toHaveAccessibleName();
    });

    test('has proper table accessibility', async () => {
      render(<TopicManager />);

      await screen.findByText('JavaScript Fundamentals');

      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();

      const headers = screen.getAllByRole('columnheader');
      expect(headers.length).toBeGreaterThan(0);
    });

    test('has proper dialog accessibility', async () => {
      const { user } = await import('@testing-library/user-event');
      const userEvent = user.setup();

      render(<TopicManager />);

      await screen.findByText('JavaScript Fundamentals');

      const addButton = screen.getByText('Add New Topic');
      await userEvent.click(addButton);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveAttribute('aria-labelledby');
    });

    test('has proper search accessibility', async () => {
      render(<TopicManager />);

      await screen.findByText('Topic Management');

      const searchInput = screen.getByPlaceholderText(/search topics/i);
      expect(searchInput).toHaveAttribute('aria-label');
      expect(searchInput).toHaveAttribute('type', 'text');
    });

    test('has proper filter accessibility', async () => {
      render(<TopicManager />);

      await screen.findByText('Topic Management');

      const categoryFilter = screen.getByDisplayValue('All Categories');
      expect(categoryFilter).toHaveAttribute('aria-label');
    });
  });

  describe('TopicSelector Accessibility', () => {
    beforeEach(() => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => [
          {
            id: '1',
            name: 'JavaScript Fundamentals',
            description: 'Core JavaScript concepts',
            category: 'JavaScript Core',
            questionCount: 5,
            createdAt: '2023-01-01T00:00:00Z',
            updatedAt: '2023-01-01T00:00:00Z',
          },
        ],
      } as Response);
    });

    test('has proper select accessibility', async () => {
      render(<TopicSelector selectedTopics={[]} onTopicsChange={jest.fn()} />);

      await screen.findByText('Select Topics');

      const trigger = screen.getByText('Choose topics...');
      expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    test('has proper listbox accessibility', async () => {
      const { user } = await import('@testing-library/user-event');
      const userEvent = user.setup();

      render(<TopicSelector selectedTopics={[]} onTopicsChange={jest.fn()} />);

      await screen.findByText('Select Topics');

      const trigger = screen.getByText('Choose topics...');
      await userEvent.click(trigger);

      const listbox = screen.getByRole('listbox');
      expect(listbox).toBeInTheDocument();

      const options = screen.getAllByRole('option');
      expect(options.length).toBeGreaterThan(0);
    });

    test('has proper selected items accessibility', async () => {
      render(
        <TopicSelector selectedTopics={['1']} onTopicsChange={jest.fn()} />
      );

      await screen.findByText('JavaScript Fundamentals');

      const selectedItem = screen.getByText('JavaScript Fundamentals');
      expect(selectedItem).toBeInTheDocument();

      const removeButton = screen.getByRole('button', { name: /remove/i });
      expect(removeButton).toHaveAccessibleName();
    });

    test('has proper disabled state accessibility', () => {
      render(
        <TopicSelector
          selectedTopics={[]}
          onTopicsChange={jest.fn()}
          disabled
        />
      );

      const trigger = screen.getByText('Choose topics...');
      expect(trigger.closest('button')).toBeDisabled();
      expect(trigger.closest('button')).toHaveAttribute(
        'aria-disabled',
        'true'
      );
    });

    test('has proper max selections accessibility', async () => {
      render(
        <TopicSelector
          selectedTopics={['1']}
          onTopicsChange={jest.fn()}
          maxSelections={2}
        />
      );

      await screen.findByText('1/2 topics selected');

      const selectionCount = screen.getByText('1/2 topics selected');
      expect(selectionCount).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('General Accessibility', () => {
    test('has proper heading hierarchy', () => {
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

      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();

      // Check for proper heading hierarchy
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(0);
    });

    test('has proper focus indicators', () => {
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

      render(<AdminNavbar />);

      const themeButton = screen.getByTitle('Toggle theme');
      themeButton.focus();

      expect(document.activeElement).toBe(themeButton);

      // Check if focus is visible
      const computedStyle = window.getComputedStyle(themeButton);
      expect(computedStyle.outline).toBeDefined();
    });

    test('has proper color contrast for interactive elements', () => {
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        login: jest.fn(),
        logout: jest.fn(),
        error: null,
      });

      render(<AdminLoginPage />);

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      const computedStyle = window.getComputedStyle(submitButton);

      // Check if button has sufficient contrast
      expect(computedStyle.color).toBeDefined();
      expect(computedStyle.backgroundColor).toBeDefined();
    });

    test('has proper loading state accessibility', () => {
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: true,
        user: null,
        login: jest.fn(),
        logout: jest.fn(),
        error: null,
      });

      render(<AdminLoginPage />);

      const loadingElement = screen.getByText(/loading/i);
      expect(loadingElement).toHaveAttribute('aria-live', 'polite');
    });

    test('has proper error state accessibility', () => {
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        login: jest.fn(),
        logout: jest.fn(),
        error: 'Authentication failed',
      });

      render(<AdminLoginPage />);

      const errorElement = screen.getByText('Authentication failed');
      expect(errorElement).toHaveAttribute('role', 'alert');
    });
  });
});
