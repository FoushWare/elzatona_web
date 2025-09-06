import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddToFlashcard from '@/components/AddToFlashcard';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';
import { flashcardService } from '@/lib/firebase-flashcards';

// Mock the Firebase auth context
jest.mock('@/contexts/FirebaseAuthContext');
jest.mock('@/lib/firebase-flashcards');

const mockUseFirebaseAuth = useFirebaseAuth as jest.MockedFunction<
  typeof useFirebaseAuth
>;
const mockFlashcardService = flashcardService as jest.Mocked<
  typeof flashcardService
>;

describe('AddToFlashcard Component', () => {
  const mockUser = {
    uid: 'test-user-id',
    email: 'test@example.com',
    displayName: 'Test User',
  };

  const defaultProps = {
    question: 'What is React?',
    answer: 'A JavaScript library for building user interfaces',
    category: 'React',
    difficulty: 'beginner' as const,
    source: 'React Basics Quiz',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseFirebaseAuth.mockReturnValue({
      user: mockUser,
      loading: false,
      signIn: jest.fn(),
      signOut: jest.fn(),
      signUp: jest.fn(),
    });
  });

  it('renders add button when user is authenticated', () => {
    render(<AddToFlashcard {...defaultProps} />);

    const addButton = screen.getByRole('button', {
      name: /click to bookmark this question/i,
    });
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveAttribute(
      'title',
      'Click to bookmark this question'
    );
  });

  it('renders button even when user is not authenticated', () => {
    mockUseFirebaseAuth.mockReturnValue({
      user: null,
      loading: false,
      signIn: jest.fn(),
      signOut: jest.fn(),
      signUp: jest.fn(),
    });

    render(<AddToFlashcard {...defaultProps} />);

    const button = screen.getByRole('button', {
      name: /click to bookmark this question/i,
    });
    expect(button).toBeInTheDocument();
  });

  it('shows loading state when adding flashcard', async () => {
    mockFlashcardService.checkFlashcardExists.mockResolvedValue({
      exists: false,
    });
    mockFlashcardService.createFlashcardFromQuestion.mockResolvedValue(
      'new-flashcard-id'
    );

    render(<AddToFlashcard {...defaultProps} />);

    const addButton = screen.getByRole('button', {
      name: /click to bookmark this question/i,
    });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveAttribute(
        'title',
        'Processing...'
      );
    });
  });

  it('calls onStatusChange when flashcard is added successfully', async () => {
    const mockOnStatusChange = jest.fn();
    mockFlashcardService.checkFlashcardExists.mockResolvedValue({
      exists: false,
    });
    mockFlashcardService.createFlashcardFromQuestion.mockResolvedValue(
      'new-flashcard-id'
    );

    render(
      <AddToFlashcard {...defaultProps} onStatusChange={mockOnStatusChange} />
    );

    const addButton = screen.getByRole('button', {
      name: /click to bookmark this question/i,
    });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockOnStatusChange).toHaveBeenCalledWith('added');
    });
  });

  it('shows saved state when flashcard already exists', async () => {
    mockFlashcardService.checkFlashcardExists.mockResolvedValue({
      exists: true,
      flashcardId: 'existing-flashcard-id',
    });

    render(<AddToFlashcard {...defaultProps} />);

    await waitFor(() => {
      const savedButton = screen.getByRole('button', {
        name: /remove bookmark/i,
      });
      expect(savedButton).toBeInTheDocument();
      expect(savedButton).toHaveAttribute('title', 'Remove bookmark');
    });
  });

  it('handles error when flashcard creation fails', async () => {
    const mockOnStatusChange = jest.fn();
    mockFlashcardService.checkFlashcardExists.mockResolvedValue({
      exists: false,
    });
    mockFlashcardService.createFlashcardFromQuestion.mockResolvedValue(null);

    render(
      <AddToFlashcard {...defaultProps} onStatusChange={mockOnStatusChange} />
    );

    const addButton = screen.getByRole('button', {
      name: /click to bookmark this question/i,
    });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockOnStatusChange).toHaveBeenCalledWith('error');
    });
  });
});
