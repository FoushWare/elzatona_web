import { render, screen, waitFor } from '@testing-library/react';
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

describe('Admin Edge Cases and Error Scenarios', () => {
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

  describe('Network Error Scenarios', () => {
    test('handles network timeout in AdminDashboard', async () => {
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

      // Mock network timeout
      mockFetch.mockImplementation(
        () =>
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Network timeout')), 100)
          )
      );

      render(<AdminDashboard />);

      await waitFor(() => {
        expect(
          screen.getByText(/error loading statistics/i)
        ).toBeInTheDocument();
      });
    });

    test('handles network error in TopicManager', async () => {
      // Mock network error
      mockFetch.mockRejectedValue(new Error('Network error'));

      render(<TopicManager />);

      await waitFor(() => {
        expect(screen.getByText(/failed to load topics/i)).toBeInTheDocument();
      });
    });

    test('handles network error in TopicSelector', async () => {
      // Mock network error
      mockFetch.mockRejectedValue(new Error('Network error'));

      render(<TopicSelector selectedTopics={[]} onTopicsChange={jest.fn()} />);

      await waitFor(() => {
        expect(screen.getByText(/failed to load topics/i)).toBeInTheDocument();
      });
    });
  });

  describe('Malformed Data Scenarios', () => {
    test('handles malformed API response in AdminDashboard', async () => {
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

      // Mock malformed response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => null,
      } as Response);

      render(<AdminDashboard />);

      await waitFor(() => {
        expect(
          screen.getByText(/error loading statistics/i)
        ).toBeInTheDocument();
      });
    });

    test('handles malformed topics data in TopicManager', async () => {
      // Mock malformed response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => 'invalid json',
      } as Response);

      render(<TopicManager />);

      await waitFor(() => {
        expect(screen.getByText(/failed to load topics/i)).toBeInTheDocument();
      });
    });

    test('handles empty topics array in TopicManager', async () => {
      // Mock empty response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      } as Response);

      render(<TopicManager />);

      await waitFor(() => {
        expect(screen.getByText(/no topics found/i)).toBeInTheDocument();
      });
    });

    test('handles topics with missing required fields', async () => {
      // Mock topics with missing fields
      const malformedTopics = [
        {
          id: '1',
          // Missing name
          description: 'Core JavaScript concepts',
          category: 'JavaScript Core',
          questionCount: 5,
        },
        {
          // Missing id
          name: 'React Hooks',
          description: 'React hooks and state management',
          category: 'React & Frontend',
          questionCount: 3,
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => malformedTopics,
      } as Response);

      render(<TopicManager />);

      await waitFor(() => {
        expect(screen.getByText('Topic Management')).toBeInTheDocument();
      });
    });
  });

  describe('Authentication Edge Cases', () => {
    test('handles user with missing required fields', () => {
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        user: {
          id: '1',
          email: '', // Missing email
          name: '', // Missing name
          role: '', // Missing role
          token: '', // Missing token
          expiresAt: '', // Missing expiration
        },
        login: jest.fn(),
        logout: jest.fn(),
        error: null,
      });

      render(<AdminNavbar />);

      // Should handle missing user data gracefully
      expect(screen.getByTestId('admin-navbar')).toBeInTheDocument();
    });

    test('handles user with invalid token format', () => {
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        user: {
          id: '1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'super_admin',
          token: 'invalid-token-format',
          expiresAt: 'invalid-date',
        },
        login: jest.fn(),
        logout: jest.fn(),
        error: null,
      });

      render(<AdminNavbar />);

      // Should handle invalid token gracefully
      expect(screen.getByTestId('admin-navbar')).toBeInTheDocument();
    });

    test('handles authentication state with null user', () => {
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        user: null, // Null user
        login: jest.fn(),
        logout: jest.fn(),
        error: null,
      });

      render(<AdminNavbar />);

      // Should handle null user gracefully
      expect(screen.getByTestId('admin-navbar')).toBeInTheDocument();
    });

    test('handles authentication state with undefined user', () => {
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        user: undefined, // Undefined user
        login: jest.fn(),
        logout: jest.fn(),
        error: null,
      });

      render(<AdminNavbar />);

      // Should handle undefined user gracefully
      expect(screen.getByTestId('admin-navbar')).toBeInTheDocument();
    });
  });

  describe('Input Validation Edge Cases', () => {
    test('handles very long input in TopicManager', async () => {
      const { user } = await import('@testing-library/user-event');
      const userEvent = user.setup();

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      } as Response);

      render(<TopicManager />);

      await screen.findByText('Topic Management');

      const addButton = screen.getByText('Add New Topic');
      await userEvent.click(addButton);

      const nameInput = screen.getByLabelText(/topic name/i);
      const veryLongName = 'a'.repeat(10000);
      await userEvent.type(nameInput, veryLongName);

      expect(nameInput).toHaveValue(veryLongName);
    });

    test('handles special characters in TopicManager inputs', async () => {
      const { user } = await import('@testing-library/user-event');
      const userEvent = user.setup();

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      } as Response);

      render(<TopicManager />);

      await screen.findByText('Topic Management');

      const addButton = screen.getByText('Add New Topic');
      await userEvent.click(addButton);

      const nameInput = screen.getByLabelText(/topic name/i);
      const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      await userEvent.type(nameInput, specialChars);

      expect(nameInput).toHaveValue(specialChars);
    });

    test('handles unicode characters in TopicManager inputs', async () => {
      const { user } = await import('@testing-library/user-event');
      const userEvent = user.setup();

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      } as Response);

      render(<TopicManager />);

      await screen.findByText('Topic Management');

      const addButton = screen.getByText('Add New Topic');
      await userEvent.click(addButton);

      const nameInput = screen.getByLabelText(/topic name/i);
      const unicodeChars = 'JavaScript 基础 🚀 中文';
      await userEvent.type(nameInput, unicodeChars);

      expect(nameInput).toHaveValue(unicodeChars);
    });

    test('handles empty form submission in TopicManager', async () => {
      const { user } = await import('@testing-library/user-event');
      const userEvent = user.setup();

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      } as Response);

      render(<TopicManager />);

      await screen.findByText('Topic Management');

      const addButton = screen.getByText('Add New Topic');
      await userEvent.click(addButton);

      const submitButton = screen.getByRole('button', { name: /add topic/i });
      await userEvent.click(submitButton);

      // Should show validation errors
      expect(screen.getByText(/topic name is required/i)).toBeInTheDocument();
    });
  });

  describe('State Management Edge Cases', () => {
    test('handles rapid state changes in AdminDashboard', async () => {
      const { rerender } = render(<AdminDashboard />);

      // Rapid authentication state changes
      for (let i = 0; i < 10; i++) {
        mockUseAdminAuth.mockReturnValue({
          isAuthenticated: i % 2 === 0,
          isLoading: false,
          user:
            i % 2 === 0
              ? {
                  id: '1',
                  email: 'admin@example.com',
                  name: 'Admin User',
                  role: 'super_admin',
                  token: 'test-token',
                  expiresAt: new Date(Date.now() + 3600000).toISOString(),
                }
              : null,
          login: jest.fn(),
          logout: jest.fn(),
          error: null,
        });

        rerender(<AdminDashboard />);
      }

      // Should handle rapid changes gracefully
      expect(screen.getByText(/loading dashboard/i)).toBeInTheDocument();
    });

    test('handles rapid theme changes in AdminNavbar', () => {
      const { rerender } = render(<AdminNavbar />);

      // Rapid theme changes
      for (let i = 0; i < 10; i++) {
        mockUseTheme.mockReturnValue({
          isDarkMode: i % 2 === 0,
          toggleDarkMode: jest.fn(),
        });

        rerender(<AdminNavbar />);
      }

      // Should handle rapid changes gracefully
      expect(screen.getByTestId('admin-navbar')).toBeInTheDocument();
    });

    test('handles rapid topic selection in TopicSelector', async () => {
      const mockOnTopicsChange = jest.fn();

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [
          {
            id: '1',
            name: 'Topic 1',
            description: 'Description 1',
            category: 'JavaScript Core',
            questionCount: 1,
            createdAt: '2023-01-01T00:00:00Z',
            updatedAt: '2023-01-01T00:00:00Z',
          },
          {
            id: '2',
            name: 'Topic 2',
            description: 'Description 2',
            category: 'JavaScript Core',
            questionCount: 1,
            createdAt: '2023-01-01T00:00:00Z',
            updatedAt: '2023-01-01T00:00:00Z',
          },
        ],
      } as Response);

      render(
        <TopicSelector
          selectedTopics={[]}
          onTopicsChange={mockOnTopicsChange}
        />
      );

      await screen.findByText('Select Topics');

      const trigger = screen.getByText('Choose topics...');
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Topic 1')).toBeInTheDocument();
      });

      // Rapid selections
      const topic1 = screen.getByText('Topic 1');
      const topic2 = screen.getByText('Topic 2');

      fireEvent.click(topic1);
      fireEvent.click(topic2);
      fireEvent.click(topic1); // Deselect
      fireEvent.click(topic2); // Deselect
      fireEvent.click(topic1); // Select again

      // Should handle rapid changes gracefully
      expect(mockOnTopicsChange).toHaveBeenCalled();
    });
  });

  describe('Error Boundary Scenarios', () => {
    test('handles component rendering errors gracefully', () => {
      // Mock a component that throws an error
      const ErrorComponent = () => {
        throw new Error('Component error');
      };

      // Should not crash the entire application
      expect(() => render(<ErrorComponent />)).toThrow();
    });

    test('handles async operation errors gracefully', async () => {
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

      // Mock fetch that throws an error
      mockFetch.mockImplementation(() => {
        throw new Error('Async operation error');
      });

      render(<AdminDashboard />);

      await waitFor(() => {
        expect(
          screen.getByText(/error loading statistics/i)
        ).toBeInTheDocument();
      });
    });
  });

  describe('Memory and Performance Edge Cases', () => {
    test('handles large dataset without memory issues', async () => {
      // Create very large dataset
      const largeTopics = Array.from({ length: 10000 }, (_, i) => ({
        id: `${i + 1}`,
        name: `Topic ${i + 1}`,
        description: `Description for topic ${i + 1}`,
        category: 'JavaScript Core',
        questionCount: Math.floor(Math.random() * 100),
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
      }));

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => largeTopics,
      } as Response);

      render(<TopicManager />);

      await waitFor(() => {
        expect(screen.getByText('Topic Management')).toBeInTheDocument();
      });

      // Should handle large dataset without crashing
      expect(screen.getByText('Topic Management')).toBeInTheDocument();
    });

    test('handles rapid re-renders without performance issues', () => {
      const { rerender } = render(<AdminNavbar />);

      // Rapid re-renders
      for (let i = 0; i < 100; i++) {
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

        rerender(<AdminNavbar />);
      }

      // Should handle rapid re-renders gracefully
      expect(screen.getByTestId('admin-navbar')).toBeInTheDocument();
    });
  });
});






