import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';

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

// Test component that uses theme
const ThemeTestComponent = () => {
  const { isDarkMode, toggleDarkMode, isLoaded } = useTheme();

  return (
    <div>
      <div data-testid="theme-status">
        {isLoaded ? (isDarkMode ? 'dark' : 'light') : 'loading'}
      </div>
      <button data-testid="toggle-theme" onClick={toggleDarkMode}>
        Toggle Theme
      </button>
      <div
        data-testid="theme-background"
        className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
      >
        Theme Background
      </div>
    </div>
  );
};

describe('Theme Persistence Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should persist theme across page reloads', async () => {
    // Simulate initial load with no saved theme
    localStorageMock.getItem.mockReturnValue(null);

    const { unmount } = render(
      <ThemeProvider>
        <ThemeTestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
    });

    // Toggle to light mode
    fireEvent.click(screen.getByTestId('toggle-theme'));

    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
    });

    // Unmount component (simulate page reload)
    unmount();

    // Simulate page reload with saved theme
    localStorageMock.getItem.mockReturnValue('light');

    render(
      <ThemeProvider>
        <ThemeTestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
    });
  });

  it('should apply correct CSS classes based on theme', async () => {
    localStorageMock.getItem.mockReturnValue('dark');

    render(
      <ThemeProvider>
        <ThemeTestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('theme-background')).toHaveClass('bg-gray-900');
      expect(mockDocumentElement.classList.add).toHaveBeenCalledWith('dark');
      expect(mockDocumentElement.setAttribute).toHaveBeenCalledWith(
        'data-theme',
        'dark'
      );
    });
  });

  it('should update CSS classes when theme changes', async () => {
    localStorageMock.getItem.mockReturnValue('light');

    render(
      <ThemeProvider>
        <ThemeTestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('theme-background')).toHaveClass('bg-gray-50');
      expect(mockDocumentElement.classList.add).toHaveBeenCalledWith('light');
    });

    // Toggle to dark mode
    fireEvent.click(screen.getByTestId('toggle-theme'));

    await waitFor(() => {
      expect(screen.getByTestId('theme-background')).toHaveClass('bg-gray-900');
      expect(mockDocumentElement.classList.remove).toHaveBeenCalledWith(
        'light'
      );
      expect(mockDocumentElement.classList.add).toHaveBeenCalledWith('dark');
    });
  });

  it('should handle multiple theme changes correctly', async () => {
    localStorageMock.getItem.mockReturnValue('dark');

    render(
      <ThemeProvider>
        <ThemeTestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
    });

    // Toggle to light
    fireEvent.click(screen.getByTestId('toggle-theme'));

    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
    });

    // Toggle back to dark
    fireEvent.click(screen.getByTestId('toggle-theme'));

    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
    });
  });

  it('should handle invalid localStorage values gracefully', async () => {
    localStorageMock.getItem.mockReturnValue('invalid-theme');

    render(
      <ThemeProvider>
        <ThemeTestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      // Should default to dark mode when invalid value is provided
      expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
    });
  });

  it('should maintain theme state across component re-renders', async () => {
    localStorageMock.getItem.mockReturnValue('light');

    const { rerender } = render(
      <ThemeProvider>
        <ThemeTestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
    });

    // Re-render with same props
    rerender(
      <ThemeProvider>
        <ThemeTestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
    });
  });

  it('should handle rapid theme toggles without issues', async () => {
    localStorageMock.getItem.mockReturnValue('dark');

    render(
      <ThemeProvider>
        <ThemeTestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
    });

    const toggleButton = screen.getByTestId('toggle-theme');

    // Rapidly toggle theme multiple times
    fireEvent.click(toggleButton);
    fireEvent.click(toggleButton);
    fireEvent.click(toggleButton);
    fireEvent.click(toggleButton);

    await waitFor(() => {
      // Should end up in light mode (even number of toggles from dark)
      expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
    });
  });
});
