import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '@/components/Navbar';

// Mock the contexts
const mockUseFirebaseAuth = jest.fn();
const mockUseTheme = jest.fn();

jest.mock('@/contexts/FirebaseAuthContext', () => ({
  useFirebaseAuth: () => mockUseFirebaseAuth(),
}));

jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => mockUseTheme(),
}));

// Mock Next.js router
const mockPush = jest.fn();
const mockReplace = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

describe('Navbar', () => {
  beforeEach(() => {
    mockUseFirebaseAuth.mockReturnValue({
      isAuthenticated: false,
      user: null,
      signOut: jest.fn(),
      isLoading: false,
    });

    mockUseTheme.mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: jest.fn(),
    });

    mockPush.mockClear();
    mockReplace.mockClear();
  });

  it('renders the navbar with logo and navigation items', () => {
    render(<Navbar />);

    expect(screen.getByText('Elzatona Web')).toBeInTheDocument();
    expect(screen.getByText('Learning')).toBeInTheDocument();
    expect(screen.getByText('Practice')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
  });

  it('shows sign in button for unauthenticated users', () => {
    render(<Navbar />);

    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('shows user menu for authenticated users', () => {
    mockUseFirebaseAuth.mockReturnValue({
      isAuthenticated: true,
      user: {
        uid: 'test-user-id',
        email: 'test@example.com',
        displayName: 'Test User',
        photoURL: 'https://via.placeholder.com/40',
      },
      signOut: jest.fn(),
      isLoading: false,
    });

    render(<Navbar />);

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
  });

  it('opens and closes mobile menu', () => {
    render(<Navbar />);

    const menuButton = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(menuButton);

    expect(screen.getByText('Learning')).toBeInTheDocument();

    fireEvent.click(menuButton);

    // Menu should be closed
    expect(screen.queryByText('Learning')).not.toBeInTheDocument();
  });

  it('opens dropdown menus on hover', async () => {
    render(<Navbar />);

    const learningButton = screen.getByText('Learning');
    fireEvent.mouseEnter(learningButton);

    await waitFor(() => {
      expect(screen.getByText('Learning Paths')).toBeInTheDocument();
    });
  });

  it('closes dropdown menus when clicking outside', async () => {
    render(<Navbar />);

    const learningButton = screen.getByText('Learning');
    fireEvent.mouseEnter(learningButton);

    await waitFor(() => {
      expect(screen.getByText('Learning Paths')).toBeInTheDocument();
    });

    // Click outside
    fireEvent.click(document.body);

    await waitFor(() => {
      expect(screen.queryByText('Learning Paths')).not.toBeInTheDocument();
    });
  });

  it('handles theme toggle', () => {
    const mockToggleDarkMode = jest.fn();
    mockUseTheme.mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: mockToggleDarkMode,
    });

    render(<Navbar />);

    const themeButton = screen.getByRole('button', { name: /toggle theme/i });
    fireEvent.click(themeButton);

    expect(mockToggleDarkMode).toHaveBeenCalled();
  });

  it('shows loading state', () => {
    mockUseFirebaseAuth.mockReturnValue({
      isAuthenticated: false,
      user: null,
      signOut: jest.fn(),
      isLoading: true,
    });

    render(<Navbar />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('handles user sign out', () => {
    const mockSignOut = jest.fn();
    mockUseFirebaseAuth.mockReturnValue({
      isAuthenticated: true,
      user: {
        uid: 'test-user-id',
        email: 'test@example.com',
        displayName: 'Test User',
      },
      signOut: mockSignOut,
      isLoading: false,
    });

    render(<Navbar />);

    const userButton = screen.getByText('Test User');
    fireEvent.click(userButton);

    const signOutButton = screen.getByText('Sign Out');
    fireEvent.click(signOutButton);

    expect(mockSignOut).toHaveBeenCalled();
  });

  it('navigates to different sections', () => {
    render(<Navbar />);

    const learningButton = screen.getByText('Learning');
    fireEvent.click(learningButton);

    const learningPathsLink = screen.getByText('Learning Paths');
    fireEvent.click(learningPathsLink);

    expect(mockPush).toHaveBeenCalledWith('/learning-paths');
  });

  it('handles responsive design', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });

    render(<Navbar />);

    // Check that the mobile menu button is visible
    expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument();
  });

  it('shows scrolled state when scrolling', () => {
    render(<Navbar />);

    // Simulate scroll
    window.scrollY = 100;
    window.dispatchEvent(new Event('scroll'));

    // Check that the navbar has the scrolled class
    const navbar = screen.getByRole('navigation');
    expect(navbar).toHaveClass('backdrop-blur-md');
  });

  it('handles keyboard navigation', () => {
    render(<Navbar />);

    const learningButton = screen.getByText('Learning');
    learningButton.focus();

    fireEvent.keyDown(learningButton, { key: 'Enter' });

    // Should open dropdown
    expect(screen.getByText('Learning Paths')).toBeInTheDocument();
  });

  it('closes mobile menu when clicking on a link', () => {
    render(<Navbar />);

    const menuButton = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(menuButton);

    const learningButton = screen.getByText('Learning');
    fireEvent.click(learningButton);

    // Mobile menu should be closed
    expect(screen.queryByText('Learning Paths')).not.toBeInTheDocument();
  });
});
