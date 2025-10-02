import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LearnPage from '@/app/learn/page';

// Mock the contexts
jest.mock('@/contexts/FirebaseAuthContext', () => ({
  useFirebaseAuth: () => ({
    isAuthenticated: true,
    user: {
      uid: 'test-user-id',
      email: 'test@example.com',
      displayName: 'Test User',
    },
    signIn: jest.fn(),
    signOut: jest.fn(),
    isLoading: false,
  }),
}));

// Mock the API calls
global.fetch = jest.fn();

const mockLearningPaths = [
  {
    id: '1',
    title: 'React Fundamentals',
    description: 'Learn React from the ground up',
    difficulty: 'beginner',
    estimatedTime: '4 weeks',
    questionCount: 50,
    isActive: true,
    progress: 0,
  },
  {
    id: '2',
    title: 'Advanced JavaScript',
    description: 'Master advanced JavaScript concepts',
    difficulty: 'intermediate',
    estimatedTime: '6 weeks',
    questionCount: 75,
    isActive: true,
    progress: 30,
  },
];

describe('LearnPage', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders the learning paths page', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, data: mockLearningPaths }),
    });

    render(<LearnPage />);

    expect(screen.getByText('Learning Paths')).toBeInTheDocument();
    expect(
      screen.getByText('Choose your learning journey')
    ).toBeInTheDocument();
  });

  it('displays learning paths when loaded', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, data: mockLearningPaths }),
    });

    render(<LearnPage />);

    await waitFor(() => {
      expect(screen.getByText('React Fundamentals')).toBeInTheDocument();
      expect(screen.getByText('Advanced JavaScript')).toBeInTheDocument();
    });
  });

  it('shows loading state initially', () => {
    (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));

    render(<LearnPage />);

    expect(screen.getByText('Loading learning paths...')).toBeInTheDocument();
  });

  it('handles API errors', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    render(<LearnPage />);

    await waitFor(() => {
      expect(
        screen.getByText('Failed to load learning paths')
      ).toBeInTheDocument();
    });
  });

  it('filters learning paths by difficulty', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, data: mockLearningPaths }),
    });

    render(<LearnPage />);

    await waitFor(() => {
      expect(screen.getByText('React Fundamentals')).toBeInTheDocument();
    });

    const difficultyFilter = screen.getByLabelText('Difficulty');
    fireEvent.change(difficultyFilter, { target: { value: 'beginner' } });

    await waitFor(() => {
      expect(screen.getByText('React Fundamentals')).toBeInTheDocument();
      expect(screen.queryByText('Advanced JavaScript')).not.toBeInTheDocument();
    });
  });

  it('searches learning paths', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, data: mockLearningPaths }),
    });

    render(<LearnPage />);

    await waitFor(() => {
      expect(screen.getByText('React Fundamentals')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search learning paths...');
    fireEvent.change(searchInput, { target: { value: 'React' } });

    await waitFor(() => {
      expect(screen.getByText('React Fundamentals')).toBeInTheDocument();
      expect(screen.queryByText('Advanced JavaScript')).not.toBeInTheDocument();
    });
  });

  it('handles empty state', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, data: [] }),
    });

    render(<LearnPage />);

    await waitFor(() => {
      expect(screen.getByText('No learning paths found')).toBeInTheDocument();
    });
  });

  it('navigates to learning path details', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, data: mockLearningPaths }),
    });

    const mockPush = jest.fn();
    jest.doMock('next/navigation', () => ({
      useRouter: () => ({
        push: mockPush,
        replace: jest.fn(),
        prefetch: jest.fn(),
        back: jest.fn(),
        forward: jest.fn(),
        refresh: jest.fn(),
      }),
      usePathname: () => '/learn',
      useSearchParams: () => new URLSearchParams(),
    }));

    render(<LearnPage />);

    await waitFor(() => {
      expect(screen.getByText('React Fundamentals')).toBeInTheDocument();
    });

    const startButton = screen.getByText('Start Learning');
    fireEvent.click(startButton);

    expect(mockPush).toHaveBeenCalledWith('/learning-paths/1');
  });

  it('shows progress for started learning paths', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, data: mockLearningPaths }),
    });

    render(<LearnPage />);

    await waitFor(() => {
      expect(screen.getByText('30% Complete')).toBeInTheDocument();
    });
  });

  it('handles responsive design', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, data: mockLearningPaths }),
    });

    render(<LearnPage />);

    // Check that the page renders without errors on mobile
    expect(screen.getByText('Learning Paths')).toBeInTheDocument();
  });
});
