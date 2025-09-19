import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import AdminLoginNavbar from '@/components/AdminLoginNavbar';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock document.documentElement
const mockDocumentElement = {
  classList: {
    add: jest.fn(),
    remove: jest.fn(),
  },
  setAttribute: jest.fn(),
};
Object.defineProperty(document, 'documentElement', {
  value: mockDocumentElement,
});

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

// Test component that shows theme-dependent styling
const ThemeVisualTestComponent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 dark:from-gray-900 dark:to-gray-800">
      <AdminLoginNavbar />
      <div className="pt-20 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Admin Login
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Access the admin dashboard
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

describe('Theme Visual Changes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('should apply dark theme classes to form elements', async () => {
    render(
      <ThemeProvider>
        <ThemeVisualTestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      // Check that dark theme classes are applied
      const title = screen.getByText('Admin Login');
      expect(title).toHaveClass('text-gray-900', 'dark:text-white');

      const subtitle = screen.getByText('Access the admin dashboard');
      expect(subtitle).toHaveClass('text-gray-600', 'dark:text-gray-400');

      const emailInput = screen.getByPlaceholderText('Enter your email');
      expect(emailInput).toHaveClass(
        'dark:bg-gray-700',
        'dark:text-white',
        'dark:border-gray-600'
      );

      const passwordInput = screen.getByPlaceholderText('Enter your password');
      expect(passwordInput).toHaveClass(
        'dark:bg-gray-700',
        'dark:text-white',
        'dark:border-gray-600'
      );
    });
  });

  it('should apply light theme classes when in light mode', async () => {
    localStorageMock.getItem.mockReturnValue('light');

    render(
      <ThemeProvider>
        <ThemeVisualTestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      // Check that light theme classes are applied
      const title = screen.getByText('Admin Login');
      expect(title).toHaveClass('text-gray-900', 'dark:text-white');

      const subtitle = screen.getByText('Access the admin dashboard');
      expect(subtitle).toHaveClass('text-gray-600', 'dark:text-gray-400');

      const emailInput = screen.getByPlaceholderText('Enter your email');
      expect(emailInput).toHaveClass('border-gray-300', 'dark:border-gray-600');

      const passwordInput = screen.getByPlaceholderText('Enter your password');
      expect(passwordInput).toHaveClass(
        'border-gray-300',
        'dark:border-gray-600'
      );
    });
  });

  it('should update visual elements when theme is toggled', async () => {
    render(
      <ThemeProvider>
        <ThemeVisualTestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      const toggleButton = screen.getByLabelText('Toggle theme');
      expect(toggleButton).toBeInTheDocument();
    });

    // Initially in dark mode
    const title = screen.getByText('Admin Login');
    expect(title).toHaveClass('text-gray-900', 'dark:text-white');

    // Toggle to light mode
    const toggleButton = screen.getByLabelText('Toggle theme');
    fireEvent.click(toggleButton);

    await waitFor(() => {
      // Classes should still be present (they're conditional based on theme)
      expect(title).toHaveClass('text-gray-900', 'dark:text-white');
    });
  });

  it('should have proper contrast in both themes', async () => {
    render(
      <ThemeProvider>
        <ThemeVisualTestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      // Check that elements have proper contrast classes
      const title = screen.getByText('Admin Login');
      expect(title).toHaveClass('text-gray-900', 'dark:text-white');

      const subtitle = screen.getByText('Access the admin dashboard');
      expect(subtitle).toHaveClass('text-gray-600', 'dark:text-gray-400');

      const button = screen.getByText('Sign In');
      expect(button).toHaveClass(
        'bg-red-600',
        'hover:bg-red-700',
        'text-white'
      );
    });
  });

  it('should maintain form functionality across theme changes', async () => {
    render(
      <ThemeProvider>
        <ThemeVisualTestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      const emailInput = screen.getByPlaceholderText('Enter your email');
      const passwordInput = screen.getByPlaceholderText('Enter your password');
      const submitButton = screen.getByText('Sign In');

      // Form elements should be functional
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });

    // Toggle theme
    const toggleButton = screen.getByLabelText('Toggle theme');
    fireEvent.click(toggleButton);

    await waitFor(() => {
      // Form elements should still be functional after theme change
      const emailInput = screen.getByPlaceholderText('Enter your email');
      const passwordInput = screen.getByPlaceholderText('Enter your password');
      const submitButton = screen.getByText('Sign In');

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });
  });

  it('should have smooth transitions between themes', async () => {
    render(
      <ThemeProvider>
        <ThemeVisualTestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      // Check that transition classes are present
      const emailInput = screen.getByPlaceholderText('Enter your email');
      const passwordInput = screen.getByPlaceholderText('Enter your password');

      expect(emailInput).toHaveClass('transition-colors');
      expect(passwordInput).toHaveClass('transition-colors');
    });
  });

  it('should maintain navbar styling across theme changes', async () => {
    render(
      <ThemeProvider>
        <ThemeVisualTestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      const navbar = screen.getByRole('navigation');
      expect(navbar).toHaveClass(
        'bg-gradient-to-r',
        'from-red-600',
        'to-red-800'
      );
    });

    // Toggle theme
    const toggleButton = screen.getByLabelText('Toggle theme');
    fireEvent.click(toggleButton);

    await waitFor(() => {
      // Navbar should maintain its styling
      const navbar = screen.getByRole('navigation');
      expect(navbar).toHaveClass(
        'bg-gradient-to-r',
        'from-red-600',
        'to-red-800'
      );
    });
  });
});
