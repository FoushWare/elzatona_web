/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LearningPathCard } from '@/components/LearningPathCard';
import { SectorCard } from '@/components/SectorCard';
import { LoadingTransition } from '@/components/LoadingTransition';

// Mock Next.js router
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => '/learning-paths',
  useSearchParams: () => new URLSearchParams(),
}));

describe('Navigation Flow Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Learning Path to Sectors Navigation', () => {
    test('should navigate to sectors when learning path is selected', async () => {
      const mockLearningPath = {
        id: 'javascript-fundamentals',
        name: 'JavaScript Fundamentals',
        description: 'Learn the basics of JavaScript',
        questionCount: 50,
        difficulty: 'beginner' as const,
        sectors: [
          { id: 'sector1', name: 'Variables', questionCount: 10 },
          { id: 'sector2', name: 'Functions', questionCount: 15 },
        ],
      };

      const mockOnSelect = jest.fn();

      render(
        <LearningPathCard
          learningPath={mockLearningPath}
          onSelect={mockOnSelect}
        />
      );

      const startButton = screen.getByText('Start Learning Path');
      fireEvent.click(startButton);

      expect(mockOnSelect).toHaveBeenCalledWith('javascript-fundamentals');
    });

    test('should display loading transition during navigation', async () => {
      const { rerender } = render(
        <LoadingTransition
          isVisible={true}
          message="Loading learning paths..."
        />
      );

      expect(screen.getByText('Loading learning paths...')).toBeInTheDocument();
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

      // Simulate loading completion
      rerender(
        <LoadingTransition
          isVisible={false}
          message="Loading learning paths..."
        />
      );

      await waitFor(() => {
        expect(
          screen.queryByText('Loading learning paths...')
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('Sector Selection and Progress', () => {
    test('should handle sector selection with progress tracking', async () => {
      const mockSector = {
        id: 'sector1',
        name: 'Variables and Data Types',
        description: 'Learn about JavaScript variables',
        questionCount: 10,
        difficulty: 'easy' as const,
        order: 1,
        isActive: true,
      };

      const mockOnStart = jest.fn();

      render(<SectorCard sector={mockSector} onStart={mockOnStart} />);

      const startButton = screen.getByText('Start Sector');
      fireEvent.click(startButton);

      expect(mockOnStart).toHaveBeenCalledWith('sector1');
    });

    test('should display completed sector with score', async () => {
      const mockSector = {
        id: 'sector1',
        name: 'Variables and Data Types',
        description: 'Learn about JavaScript variables',
        questionCount: 10,
        difficulty: 'easy' as const,
        order: 1,
        isActive: true,
      };

      const mockOnStart = jest.fn();

      render(
        <SectorCard
          sector={mockSector}
          onStart={mockOnStart}
          isCompleted={true}
          score={85}
        />
      );

      expect(screen.getByText('85%')).toBeInTheDocument();
      expect(screen.getByText('Review Again')).toBeInTheDocument();
    });

    test('should show different button text for completed sectors', async () => {
      const mockSector = {
        id: 'sector1',
        name: 'Variables and Data Types',
        description: 'Learn about JavaScript variables',
        questionCount: 10,
        difficulty: 'easy' as const,
        order: 1,
        isActive: true,
      };

      const mockOnStart = jest.fn();

      const { rerender } = render(
        <SectorCard
          sector={mockSector}
          onStart={mockOnStart}
          isCompleted={false}
        />
      );

      expect(screen.getByText('Start Sector')).toBeInTheDocument();

      rerender(
        <SectorCard
          sector={mockSector}
          onStart={mockOnStart}
          isCompleted={true}
          score={75}
        />
      );

      expect(screen.getByText('Review Again')).toBeInTheDocument();
    });
  });

  describe('Error Handling in Navigation', () => {
    test('should handle navigation errors gracefully', async () => {
      const mockLearningPath = {
        id: 'invalid-path',
        name: 'Invalid Path',
        description: 'This path has issues',
        questionCount: 0,
        difficulty: 'beginner' as const,
      };

      const mockOnSelect = jest.fn();

      render(
        <LearningPathCard
          learningPath={mockLearningPath}
          onSelect={mockOnSelect}
        />
      );

      const startButton = screen.getByText('Start Learning Path');

      // Should call the onSelect function without throwing
      fireEvent.click(startButton);
      expect(mockOnSelect).toHaveBeenCalledWith('invalid-path');
    });
  });
});
