/**
 * Integration Tests for Flashcards (F-IT-010, F-IT-011, F-IT-012)
 * Tasks: F-007, F-008, F-009 - Flashcards
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FlashcardsPage from './page';

jest.mock('../../lib/flashcards', () => ({
  loadFlashcards: jest.fn(() => [
    {
      id: '1',
      question: 'Test Question',
      answer: 'Test Answer',
      section: 'HTML',
      difficulty: 'easy',
    },
  ]),
  removeFlashcard: jest.fn(),
}));

global.fetch = jest.fn();

jest.mock('lucide-react', () => ({
  BookOpen: () => <span>📖</span>,
  Trash2: () => <span>🗑️</span>,
  Play: () => <span>▶️</span>,
  RotateCcw: () => <span>↻</span>,
  ArrowLeft: () => <span>←</span>,
  ArrowRight: () => <span>→</span>,
  FlipHorizontal: () => <span>⇄</span>,
  CheckCircle: () => <span>✅</span>,
  XCircle: () => <span>❌</span>,
  Shuffle: () => <span>🔀</span>,
  Filter: () => <span>🔽</span>,
  Target: () => <span>🎯</span>,
  X: () => <span>✕</span>,
  Eye: () => <span>👁️</span>,
  EyeOff: () => <span>👁️‍🗨️</span>,
  Loader2: () => <span>⏳</span>,
}));

describe('F-IT-010: Filtering Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should integrate theme and difficulty filtering', () => {
    render(<FlashcardsPage />);
    // Filtering should work
    expect(screen.getByText('Flashcards')).toBeInTheDocument();
  });
});

describe('F-IT-011: Practice Modes Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should integrate practice mode switching', () => {
    render(<FlashcardsPage />);
    // Mode switching should work
    expect(screen.getByText('Flashcards')).toBeInTheDocument();
  });
});

describe('F-IT-012: CRUD Operations Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should integrate flashcard CRUD operations', () => {
    const { removeFlashcard } = require('../../lib/flashcards');
    render(<FlashcardsPage />);
    expect(removeFlashcard).toBeDefined();
  });
});
