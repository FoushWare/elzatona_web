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

describe('Theme Toggle Button in AdminLoginNavbar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('should render theme toggle button', async () => {
    render(
      <ThemeProvider>
        <AdminLoginNavbar />
      </ThemeProvider>
    );

    await waitFor(() => {
      const toggleButton = screen.getByLabelText('Toggle theme');
      expect(toggleButton).toBeInTheDocument();
    });
  });

  it('should show sun icon in dark mode', async () => {
    render(
      <ThemeProvider>
        <AdminLoginNavbar />
      </ThemeProvider>
    );

    await waitFor(() => {
      const sunIcon = document.querySelector('.lucide-sun');
      expect(sunIcon).toBeInTheDocument();
    });
  });

  it('should show moon icon in light mode', async () => {
    localStorageMock.getItem.mockReturnValue('light');

    render(
      <ThemeProvider>
        <AdminLoginNavbar />
      </ThemeProvider>
    );

    await waitFor(() => {
      const moonIcon = document.querySelector('.lucide-moon');
      expect(moonIcon).toBeInTheDocument();
    });
  });

  it('should toggle theme when button is clicked', async () => {
    render(
      <ThemeProvider>
        <AdminLoginNavbar />
      </ThemeProvider>
    );

    await waitFor(() => {
      const toggleButton = screen.getByLabelText('Toggle theme');
      expect(toggleButton).toBeInTheDocument();
    });

    const toggleButton = screen.getByLabelText('Toggle theme');
    fireEvent.click(toggleButton);

    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
    });
  });

  it('should have proper accessibility attributes', async () => {
    render(
      <ThemeProvider>
        <AdminLoginNavbar />
      </ThemeProvider>
    );

    await waitFor(() => {
      const toggleButton = screen.getByLabelText('Toggle theme');
      expect(toggleButton).toHaveAttribute('aria-label', 'Toggle theme');
    });
  });

  it('should have proper styling classes', async () => {
    render(
      <ThemeProvider>
        <AdminLoginNavbar />
      </ThemeProvider>
    );

    await waitFor(() => {
      const toggleButton = screen.getByLabelText('Toggle theme');
      expect(toggleButton).toHaveClass(
        'p-2',
        'rounded-lg',
        'transition-colors',
        'duration-200'
      );
    });
  });

  it('should change icon when theme is toggled', async () => {
    render(
      <ThemeProvider>
        <AdminLoginNavbar />
      </ThemeProvider>
    );

    await waitFor(() => {
      // Initially should show sun icon (dark mode)
      const sunIcon = document.querySelector('.lucide-sun');
      expect(sunIcon).toBeInTheDocument();
    });

    const toggleButton = screen.getByLabelText('Toggle theme');
    fireEvent.click(toggleButton);

    await waitFor(() => {
      // After toggle should show moon icon (light mode)
      const moonIcon = document.querySelector('.lucide-moon');
      expect(moonIcon).toBeInTheDocument();
    });
  });

  it('should maintain button state across re-renders', async () => {
    const { rerender } = render(
      <ThemeProvider>
        <AdminLoginNavbar />
      </ThemeProvider>
    );

    await waitFor(() => {
      const toggleButton = screen.getByLabelText('Toggle theme');
      expect(toggleButton).toBeInTheDocument();
    });

    // Toggle theme
    const toggleButton = screen.getByLabelText('Toggle theme');
    fireEvent.click(toggleButton);

    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
    });

    // Re-render component
    rerender(
      <ThemeProvider>
        <AdminLoginNavbar />
      </ThemeProvider>
    );

    await waitFor(() => {
      // Should still be in light mode
      const moonIcon = document.querySelector('.lucide-moon');
      expect(moonIcon).toBeInTheDocument();
    });
  });
});
