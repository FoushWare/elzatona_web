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

// Test component that uses the theme context
const TestComponent = () => {
  const { isDarkMode, toggleDarkMode, setDarkMode, isLoaded } = useTheme();

  return (
    <div>
      <div data-testid="theme-status">
        {isLoaded ? (isDarkMode ? 'dark' : 'light') : 'loading'}
      </div>
      <button data-testid="toggle-theme" onClick={toggleDarkMode}>
        Toggle Theme
      </button>
      <button data-testid="set-dark" onClick={() => setDarkMode(true)}>
        Set Dark
      </button>
      <button data-testid="set-light" onClick={() => setDarkMode(false)}>
        Set Light
      </button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('should provide default dark theme when no saved preference', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
    });

    expect(localStorageMock.getItem).toHaveBeenCalledWith('theme');
  });

  it('should load saved theme preference from localStorage', async () => {
    localStorageMock.getItem.mockReturnValue('light');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
    });
  });

  it('should toggle theme when toggleDarkMode is called', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
    });

    fireEvent.click(screen.getByTestId('toggle-theme'));

    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
  });

  it('should set dark mode when setDarkMode(true) is called', async () => {
    localStorageMock.getItem.mockReturnValue('light');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
    });

    fireEvent.click(screen.getByTestId('set-dark'));

    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  it('should set light mode when setDarkMode(false) is called', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
    });

    fireEvent.click(screen.getByTestId('set-light'));

    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
  });

  it('should apply dark theme classes to document root', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(mockDocumentElement.classList.add).toHaveBeenCalledWith('dark');
      expect(mockDocumentElement.classList.remove).toHaveBeenCalledWith(
        'light'
      );
      expect(mockDocumentElement.setAttribute).toHaveBeenCalledWith(
        'data-theme',
        'dark'
      );
    });
  });

  it('should apply light theme classes to document root', async () => {
    localStorageMock.getItem.mockReturnValue('light');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(mockDocumentElement.classList.add).toHaveBeenCalledWith('light');
      expect(mockDocumentElement.classList.remove).toHaveBeenCalledWith('dark');
      expect(mockDocumentElement.setAttribute).toHaveBeenCalledWith(
        'data-theme',
        'light'
      );
    });
  });

  it('should throw error when useTheme is used outside ThemeProvider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useTheme must be used within a ThemeProvider');

    consoleSpy.mockRestore();
  });

  it('should persist theme changes to localStorage', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
    });

    fireEvent.click(screen.getByTestId('toggle-theme'));

    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
    });
  });

  it('should handle multiple rapid theme toggles', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
    });

    // Toggle multiple times rapidly
    fireEvent.click(screen.getByTestId('toggle-theme'));
    fireEvent.click(screen.getByTestId('toggle-theme'));
    fireEvent.click(screen.getByTestId('toggle-theme'));

    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
    });
  });
});
